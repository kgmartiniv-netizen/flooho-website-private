/* Jira Cloud REST API v3 helpers for the FL-003 webhook. Basic auth per
   https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/ */

const PROJECT_KEY = "KAN";
const PARENT_KEY = "KAN-20";
const ISSUE_TYPE = "Task";
const FEATURE_FIELD = "customfield_10075";

function authHeader() {
  const token = Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString(
    "base64"
  );
  return `Basic ${token}`;
}

// Dedup key: Jira issue summaries aren't guaranteed unique like Slack
// channel names, so the HubSpot contact ID is embedded in the ticket text
// (summary or description) and searched for on future events.
export async function findIssueByContactId(contactId) {
  const jql = `project=${PROJECT_KEY} AND (summary ~ "${contactId}" OR description ~ "${contactId}")`;
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
      line(`Contact: ${fullName}`),
      line(`Email: ${email || "(none)"}`),
      line(`Company: ${companyName}`),
      line("Lifecycle stage: opportunity"),
      line(`HubSpot contact ID: ${contactId}`),
    ],
  };
}

export async function createIssue({ companyName, fullName, email, contactId }) {
  const payload = {
    fields: {
      project: { key: PROJECT_KEY },
      issuetype: { name: ISSUE_TYPE },
      parent: { key: PARENT_KEY },
      summary: `Opportunity: ${companyName}`,
      description: descriptionADF({ fullName, email, companyName, contactId }),
      [FEATURE_FIELD]: ["hubspot-connection"],
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
    throw new Error(`Jira issue creation failed (${response.status}): ${JSON.stringify(data)}`);
  }
  return data;
}
