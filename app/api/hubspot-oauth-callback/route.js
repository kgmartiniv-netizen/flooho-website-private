import { exchangeAuthorizationCode } from "../../../lib/hubspotOAuth";

/* One-time-use route that completes the HubSpot app's OAuth install.
   Intentionally displays a secret (the refresh token) in the HTML
   response — this is only meant to be hit manually, once, by the account
   owner, immediately after authorizing the app in HubSpot's UI. It is not
   linked from anywhere on the site and has no ongoing purpose once the
   refresh token has been copied into Vercel. Must match the redirect_uri
   registered in the HubSpot app's Auth config exactly. */

const REDIRECT_URI = "https://www.flooho.io/api/hubspot-oauth-callback";

function page({ title, bodyHtml }) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>${title}</title>
<style>
  body { font-family: ui-monospace, "SF Mono", Menlo, monospace; background: #1a1a18; color: #f1efe8; padding: 40px 24px; max-width: 700px; margin: 0 auto; line-height: 1.6; }
  h1 { font-size: 20px; margin: 0 0 16px; }
  pre { background: #2c2c2a; padding: 16px; border-radius: 8px; overflow-x: auto; white-space: pre-wrap; word-break: break-all; }
  code { background: #2c2c2a; padding: 2px 6px; border-radius: 4px; }
</style>
</head>
<body>${bodyHtml}</body>
</html>`;
}

function htmlResponse(bodyHtml, { status = 200, title = "HubSpot OAuth" } = {}) {
  return new Response(page({ title, bodyHtml }), {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(request) {
  const code = new URL(request.url).searchParams.get("code");

  if (!code) {
    return htmlResponse(
      `<h1>Missing code</h1>
       <p>HubSpot should have redirected here with a <code>?code=</code> query
       param after clicking "Connect app". Start the install again from the
       HubSpot app's Auth tab.</p>`,
      { status: 400, title: "HubSpot OAuth — missing code" }
    );
  }

  const result = await exchangeAuthorizationCode({ code, redirectUri: REDIRECT_URI });

  if (!result.ok) {
    return htmlResponse(
      `<h1>Token exchange failed (${result.status})</h1>
       <pre>${JSON.stringify(result.data, null, 2)}</pre>`,
      { status: 502, title: "HubSpot OAuth — failed" }
    );
  }

  return htmlResponse(
    `<h1>Installation complete</h1>
     <p><strong>Copy this into the Vercel env var <code>HUBSPOT_REFRESH_TOKEN</code>
     now — it will not be shown again here.</strong></p>
     <pre>${result.data.refresh_token}</pre>
     <p>Once it's saved in Vercel (and deployed), this route has served its
     purpose. You shouldn't need to hit it again unless the app is fully
     reinstalled.</p>`,
    { title: "HubSpot OAuth — success" }
  );
}
