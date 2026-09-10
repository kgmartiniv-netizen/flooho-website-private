/* Jira Cloud REST API v3 helpers for the FL-003 webhook. Basic auth per
   https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/

   One Epic per COMPANY, not per contact or per event — mirrors how the
   Slack step already dedupes by company (channel name is company-based).
   A second contact from a company that already has an Epic is a no-op
   here, same as it already is on the Slack side. */

const PROJECT_KEY = "KAN";
const ISSUE_TYPE = "Epic";
const FEATURE_FIELD = "customfield_10075";

function authHeader() {
  const token = Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString(
    "base64"
  );
  return `Basic ${token}`;
}

// Dedup key: the slugified company name in the Feature field (a labels-type
// custom field), not the triggering contact. cf[10075] is the JQL syntax
// for referencing a custom field by its numeric ID, which is more reliable
// than referencing it by display name ("Feature").
export async function findEpicByCompanyLabel(companySlug) {
  const jql = `project=${PROJECT_KEY} AND issuetype=Epic AND cf[10075] = "${companySlug}"`;
  const url = `${process.env.JIRA_BASE_URL}/rest/api/3/search?jql=${encodeURIComponent(jql)}`;

  const response = await fetch(url, {
    headers: { Authorization: authHeader(), Accept: "application/json" },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Jira search failed (${response.status}): ${JSON.stringify(data)}`);
  }
  return (data.issues?.length ?? 0) > 0;
}

function descriptionADF({ fullName, email, companyName, contactId }) {
  const line = (text) => ({ type: "paragraph", content: [{ type: "text", text }] });
  return {
    type: "doc",
    version: 1,
    content: [
      line(`Company: ${companyName}`),
      line(`Triggering contact: ${fullName}`),
      line(`Email: ${email || "(none)"}`),
      line("Lifecycle stage: opportunity"),
      line(`HubSpot contact ID: ${contactId}`),
    ],
  };
}

// NOTE: some Jira Software projects (typically older "company-managed"
// ones) require a separate "Epic Name" field distinct from summary. If
// creation fails with a "field is required" error mentioning an epic-name
// field, this project needs that added here — not discoverable without a
// real API call against this specific site, so flagging rather than
// guessing a field ID.
export async function createEpic({ companyName, companySlug, fullName, email, contactId }) {
  const payload = {
    fields: {
      project: { key: PROJECT_KEY },
      issuetype: { name: ISSUE_TYPE },
      summary: `Customer Implementation ${companyName}`,
      description: descriptionADF({ fullName, email, companyName, contactId }),
      [FEATURE_FIELD]: [companySlug],
    },
  };

  const response = await fetch(`${process.env.JIRA_BASE_URL}/rest/api/3/issue`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Jira Epic creation failed (${response.status}): ${JSON.stringify(data)}`);
  }
  return data;
}
