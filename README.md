# Flooho

Next.js (App Router, plain JS) rebuild of the Flooho landing + contact pages,
based on the locked brand identity and copy in the design handoff
(`flooho_project_context.md`, `flooho_design_system.css`, `flooho_landing.html`,
`flooho_contact.html`). This is a v1 meant to be iterated on with real
feedback and analytics — not a final build.

## Structure

- `app/globals.css` — design tokens (CSS custom properties) and shared
  component classes (nav, buttons, icon badges, cards, form fields), ported
  near-verbatim from `flooho_design_system.css`. Edit here first for anything
  visual that's shared across pages.
- `app/page.js` — landing page, assembled from `components/Hero.jsx`,
  `Problem.jsx`, `HowWeWork.jsx`, `ClosingCta.jsx`.
- `app/contact/page.js` — contact page, assembled from
  `components/ContactDetails.jsx` (static info panel) and
  `components/ContactForm.jsx` (client component, the actual form).
- `app/api/contact/route.js` + `lib/hubspot.js` — the HubSpot integration.
- `components/Icons.jsx` — all icons from the locked design (logo mark,
  magnifying glass / report / compass step icons, contact detail icons).

## HubSpot integration

Ported (not rebuilt) from `../hubspot-contact-form/server.js` — same
validation rules, same honeypot, same "create, or update on 409 duplicate
email" upsert logic, same `HUBSPOT_ACCESS_TOKEN` env var so you can reuse the
private-app token you already generated for that project.

**Why ported instead of proxied to the standalone app:** connecting this form
to `../hubspot-contact-form` as a live second server (two dev servers, two
deployments, CORS) would work too, but adds real friction to a v1 build. This
keeps everything as one deployable app while reusing that project's exact
validated behavior.

**Requires:** the custom `message` contact property to exist in your HubSpot
portal (Settings → Properties → Contact properties → internal name
`message`, type "Multi-line text") — same requirement as the standalone
project.

### Setup

```bash
cp .env.local.example .env.local
```

Paste your HubSpot private app token (scope `crm.objects.contacts.write`)
into `.env.local`. Then:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Flags for you

1. **Placeholder contact details are fake.** Phone, email, and office
   address on `/contact` are carried over from the static reference
   (`(555) 010-0100`, `hello@flooho.com`, a made-up San Diego address). They
   render with a visible "Placeholder — replace before launch" label so this
   doesn't slip through silently — remove that label once you swap in real
   values (`components/ContactDetails.jsx`).

2. **Field-name mismatch with the standalone HubSpot project, resolved.**
   `flooho_contact.html`'s fields (`firstname`, `lastname`, `email`,
   `company`, `message`) match HubSpot's *internal* property names.
   `../hubspot-contact-form/server.js` actually expects a different,
   camelCase request-body shape (`firstName`, `lastName`, ...) — it maps
   those to HubSpot's lowercase properties internally. If you'd pointed the
   original form straight at that server unmodified, every submission would
   have failed validation ("First name is required"). This project's own
   `app/api/contact/route.js` reads the lowercase field names directly (it's
   a fresh port, not the original server), so this isn't an issue here — but
   worth knowing if you ever wire another client at the same endpoint or at
   the standalone project.

3. **Nav "Get started" button now actually links somewhere.** In the static
   reference it was a non-interactive `<div>`. It now links to `/contact`,
   same destination as every other CTA on the page.

4. **"Learn more" destination was undefined in the locked copy** — only the
   button label was locked, not where it goes. I pointed it at the problem
   section (`#problem`) as a reasonable default. Flag if you had something
   else in mind (e.g. a future About/Services page).

5. **In-memory rate limiting is per-instance and resets on redeploy.** Fine
   for v1 traffic; if this goes on a multi-instance/serverless host and spam
   becomes real, swap `app/api/contact/route.js`'s `requestLog` Map for a
   shared store.

## Not done here (per the handoff doc's own open items)

- Formal trademark (USPTO TESS) and domain availability search on "Flooho."
- Analytics (Google Analytics or similar) — add once this is live.
