/* Ported from ../hubspot-contact-form/server.js — same upsert-with-409-fallback
   behavior against the HubSpot CRM API, using the same HUBSPOT_ACCESS_TOKEN
   private-app token. Kept server-side only; never import this from a
   client component. */

const HUBSPOT_API_BASE = "https://api.hubapi.com";

async function hubspotFetch(pathname, options) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  const response = await fetch(`${HUBSPOT_API_BASE}${pathname}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  const body = await response.json().catch(() => ({}));
  return { response, body };
}

function extractExistingContactId(errorBody) {
  const match = /Existing ID:\s*(\d+)/i.exec(errorBody.message || "");
  return match ? match[1] : null;
}

export async function upsertHubSpotContact(properties) {
  const { response, body } = await hubspotFetch("/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({ properties }),
  });

  if (response.ok) {
    return body;
  }

  // Contact with this email already exists: update it instead of failing.
  if (response.status === 409) {
    const existingId = extractExistingContactId(body);
    if (existingId) {
      const { response: patchResponse, body: patchBody } = await hubspotFetch(
        `/crm/v3/objects/contacts/${existingId}`,
        { method: "PATCH", body: JSON.stringify({ properties }) }
      );
      if (patchResponse.ok) return patchBody;
      throw new Error(patchBody.message || `HubSpot update failed (${patchResponse.status})`);
    }
  }

  throw new Error(body.message || `HubSpot create failed (${response.status})`);
}
