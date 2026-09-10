/* Slack Web API helpers for the FL-002 webhook — bot token needs
   channels:manage, chat:write, channels:read scopes. */

const SLACK_API_BASE = "https://slack.com/api";

async function slackFetch(endpoint, { method = "GET", params, body } = {}) {
  const url = new URL(`${SLACK_API_BASE}/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) url.searchParams.set(key, value);
    });
  }

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!data.ok) {
    throw new Error(`Slack API error (${endpoint}): ${data.error || `HTTP ${response.status}`}`);
  }
  return data;
}

export async function findChannelByName(name) {
  let cursor;
  do {
    // public_channel only: createChannel() below never sets is_private, so
    // every channel this creates is public. Listing private_channel too
    // would need the groups:read scope for no benefit, since none of the
    // channels being searched for would ever be private.
    const data = await slackFetch("conversations.list", {
      params: { types: "public_channel", limit: 200, cursor },
    });
    const match = data.channels.find((channel) => channel.name === name);
    if (match) return match;
    cursor = data.response_metadata?.next_cursor || undefined;
  } while (cursor);
  return null;
}

export async function createChannel(name) {
  const data = await slackFetch("conversations.create", { method: "POST", body: { name } });
  return data.channel;
}

export async function postMessage(channelId, text) {
  await slackFetch("chat.postMessage", { method: "POST", body: { channel: channelId, text } });
}
