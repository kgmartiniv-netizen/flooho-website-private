/* CRM read access for the webhook app, using a per-invocation OAuth access
   token (see lib/hubspotOAuth.js) rather than the static private-app token
   in lib/hubspot.js. */

export async function getContact(accessToken, objectId, properties) {
  const url = new URL(`https://api.hubapi.com/crm/v3/objects/contacts/${objectId}`);
  url.searchParams.set("properties", properties.join(","));

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `HubSpot contact fetch failed (${response.status}): ${JSON.stringify(data)}`
    );
  }
  return data;
}
