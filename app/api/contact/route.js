import { NextResponse } from "next/server";
import { upsertHubSpotContact } from "../../../lib/hubspot";

/* Ported from ../hubspot-contact-form/server.js's POST /api/contact handler:
   same honeypot check, same validation rules, same upsert-with-409-fallback
   call into HubSpot. Field names here (firstname/lastname/email/company/message)
   match the locked contact form and HubSpot's internal contact property names
   directly, so no key-translation layer is needed between form and route.

   Field-name note: the original standalone server.js reads body.firstName /
   body.lastName (camelCase) — this route intentionally does NOT match that.
   It matches the locked form fields instead, since this route is the only
   consumer of this form and the field names were deliberately chosen to
   mirror HubSpot's own property names. If you later point some other client
   at this same route, keep this in mind. */

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

// In-memory rate limiting. Resets on redeploy/restart and is per-instance,
// so on a multi-instance/serverless deployment it under-counts rather than
// perfectly enforcing 10/15min globally. Fine for v1 volume; revisit with a
// shared store (e.g. Redis) if abuse becomes a real problem.
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(body) {
  const errors = [];
  const firstname = String(body.firstname || "").trim();
  const lastname = String(body.lastname || "").trim();
  const email = String(body.email || "").trim();
  const company = String(body.company || "").trim();
  const message = String(body.message || "").trim();

  if (!firstname) errors.push("First name is required.");
  if (!email) errors.push("Email is required.");
  else if (!EMAIL_RE.test(email)) errors.push("Email is not valid.");
  if (!message) errors.push("Message is required.");
  if (message.length > 5000) errors.push("Message is too long (5000 character max).");

  return { errors, data: { firstname, lastname, email, company, message } };
}

export async function POST(request) {
  if (!process.env.HUBSPOT_ACCESS_TOKEN) {
    console.error("Missing HUBSPOT_ACCESS_TOKEN. Copy .env.local.example to .env.local and set it.");
    return NextResponse.json({ error: "Server is not configured." }, { status: 500 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => ({}));

  // Honeypot: bots tend to fill every field, humans never see or fill this one.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const { errors, data } = validateContact(body);
  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const properties = {
    firstname: data.firstname,
    lastname: data.lastname || undefined,
    email: data.email,
    company: data.company || undefined,
    message: data.message,
  };
  Object.keys(properties).forEach((key) => properties[key] === undefined && delete properties[key]);

  try {
    const contact = await upsertHubSpotContact(properties);
    return NextResponse.json({ ok: true, id: contact.id });
  } catch (err) {
    console.error("HubSpot contact upsert failed:", err.message);
    return NextResponse.json(
      { error: "Could not save your submission. Please try again shortly." },
      { status: 502 }
    );
  }
}
