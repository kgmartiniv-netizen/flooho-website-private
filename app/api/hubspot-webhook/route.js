import { NextResponse } from "next/server";
import { verifyHubSpotSignature } from "../../../lib/hubspotWebhookSignature";
import { refreshAccessToken } from "../../../lib/hubspotOAuth";
import { getContact } from "../../../lib/hubspotCrm";
import { findChannelByName, createChannel, postMessage } from "../../../lib/slack";
import { findIssueByContactId, createIssue } from "../../../lib/jira";

/* FL-002 (HubSpot lead status change -> new Slack channel) and FL-003
   (-> new Jira ticket) — event-driven replacement for the two polling
   scheduled tasks (trig_017YGy99FJgyexZAUduc2vHF, trig_01TXGND1jwjFQk3rLxPNPyoW)
   described in the project's flooho_feature_ideas.md. Same business rules
   as the polling MVP: Slack channel created first, Jira ticket only after,
   same dedup logic for each — just triggered by HubSpot's webhook instead
   of checked three times a day.

   Next.js App Router route handlers don't auto-parse the body the way
   Pages Router API routes can — request.text() below already gives the
   raw, unparsed body, so no bodyParser config is needed to read it raw
   for signature verification. */

const HUBSPOT_PORTAL_ID = "247124590";

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildChannelName({ company, firstname, lastname, email }) {
  const fullName = [firstname, lastname].filter(Boolean).join(" ").trim();
  const base = company?.trim() || fullName || email?.split("@")[0] || "unknown";
  const prefix = "opportunity-";
  const slug = slugify(base)
    .slice(0, 80 - prefix.length)
    .replace(/-+$/, "");
  return prefix + slug;
}

async function processContact(objectId) {
  const accessToken = await refreshAccessToken();
  const { properties } = await getContact(accessToken, objectId, [
    "company",
    "firstname",
    "lastname",
    "email",
  ]);
  const { company, firstname, lastname, email } = properties || {};
  const fullName = [firstname, lastname].filter(Boolean).join(" ").trim() || "(no name)";
  const companyName = company?.trim() || fullName;

  // Step A — Slack, always first.
  const channelName = buildChannelName({ company, firstname, lastname, email });
  let channel = await findChannelByName(channelName);
  if (!channel) {
    channel = await createChannel(channelName);
    const contactUrl = `https://app-na2.hubspot.com/contacts/${HUBSPOT_PORTAL_ID}/record/0-1/${objectId}`;
    await postMessage(
      channel.id,
      `New opportunity: *${companyName}*\nContact: ${fullName}${
        email ? ` (${email})` : ""
      }\nHubSpot contact ID: ${objectId}\n${contactUrl}`
    );
  }

  // Step B — Jira, only after Slack has been handled for this contact.
  const alreadyTicketed = await findIssueByContactId(objectId);
  if (!alreadyTicketed) {
    await createIssue({ companyName, fullName, email, contactId: objectId });
  }
}

export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-hubspot-signature-v3");
  const timestamp = request.headers.get("x-hubspot-request-timestamp");

  const valid = verifyHubSpotSignature({
    method: request.method,
    rawBody,
    timestampHeader: timestamp,
    signatureHeader: signature,
  });
  if (!valid) {
    console.error("hubspot-webhook: signature verification failed");
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let events;
  try {
    events = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const matches = (Array.isArray(events) ? events : []).filter(
    (event) =>
      event.subscriptionType === "contact.propertyChange" &&
      event.propertyName === "lifecyclestage" &&
      event.propertyValue === "opportunity"
  );

  // Sequential, not parallel: two contacts resolving to the same Slack
  // channel slug at the same time could both pass the "doesn't exist yet"
  // check before either creates it. Sequential processing avoids that race.
  try {
    for (const event of matches) {
      await processContact(event.objectId);
    }
  } catch (err) {
    // 5xx here (rather than swallowing the error) tells HubSpot to retry
    // delivery. Safe to retry the whole batch: both Slack and Jira steps
    // dedup, so already-handled contacts just no-op on a retry.
    console.error("hubspot-webhook: processing failed", err);
    return NextResponse.json({ error: "Processing failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, processed: matches.length });
}
