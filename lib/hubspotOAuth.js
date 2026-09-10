/* OAuth token exchange for the self-installed HubSpot app (FL-002/FL-003
   webhook). Separate from lib/hubspot.js, which uses a static private-app
   token (HUBSPOT_ACCESS_TOKEN) for the contact form — this app uses a
   short-lived OAuth access token refreshed from HUBSPOT_REFRESH_TOKEN on
   every invocation. */

const TOKEN_URL = "https://api.hubapi.com/oauth/v1/token";

async function requestToken(params) {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params).toString(),
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
}

// Called once, manually, from app/api/hubspot-oauth-callback.
export async function exchangeAuthorizationCode({ code, redirectUri }) {
  return requestToken({
    grant_type: "authorization_code",
    client_id: process.env.HUBSPOT_CLIENT_ID,
    client_secret: process.env.HUBSPOT_CLIENT_SECRET,
    redirect_uri: redirectUri,
    code,
  });
}

// Called on every webhook invocation — access tokens last ~30min and
// serverless invocations don't share memory, so there's nothing worth
// caching here; the refresh call itself is cheap.
export async function refreshAccessToken() {
  const result = await requestToken({
    grant_type: "refresh_token",
    client_id: process.env.HUBSPOT_CLIENT_ID,
    client_secret: process.env.HUBSPOT_CLIENT_SECRET,
    refresh_token: process.env.HUBSPOT_REFRESH_TOKEN,
  });
  if (!result.ok) {
    throw new Error(
      `HubSpot token refresh failed (${result.status}): ${JSON.stringify(result.data)}`
    );
  }
  return result.data.access_token;
}
