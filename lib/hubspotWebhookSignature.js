import crypto from "node:crypto";

/* HubSpot v3 webhook signature validation.
   https://developers.hubspot.com/docs/api/webhooks/validating-requests

   sourceString = requestMethod + requestUri + rawRequestBody + timestamp

   requestUri is the full absolute URL HubSpot actually called (protocol +
   host + path) — confirmed against HubSpot's own docs/example, not just
   the path. It must exactly match the target URL registered in the app's
   webhook subscription config below, which is why this is a hardcoded
   constant rather than reconstructed from the incoming request: Vercel
   sits behind a proxy, and request.url/host headers aren't guaranteed to
   losslessly reproduce the exact string HubSpot signed against. Update
   this if the registered webhook target URL ever changes.

   Note: flooho.io itself 308-redirects to www.flooho.io (confirmed live,
   2026-09) — webhook senders generally don't follow redirects on POST, so
   the registered target URL (and this constant) uses the www host that
   actually serves the site, not the bare apex domain. */
const WEBHOOK_TARGET_URL = "https://www.flooho.io/api/hubspot-webhook";

const MAX_TIMESTAMP_AGE_MS = 5 * 60 * 1000;

export function verifyHubSpotSignature({ method, rawBody, timestampHeader, signatureHeader }) {
  if (!timestampHeader || !signatureHeader) return false;

  const age = Date.now() - Number(timestampHeader);
  if (!Number.isFinite(age) || age > MAX_TIMESTAMP_AGE_MS) return false;

  const sourceString = `${method}${WEBHOOK_TARGET_URL}${rawBody}${timestampHeader}`;
  const expected = crypto
    .createHmac("sha256", process.env.HUBSPOT_CLIENT_SECRET)
    .update(sourceString, "utf8")
    .digest("base64");

  const expectedBuf = Buffer.from(expected);
  const actualBuf = Buffer.from(signatureHeader);
  if (expectedBuf.length !== actualBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}
