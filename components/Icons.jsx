/* All icon choices below are locked per flooho_project_context.md
   (Section 3 icon selection: magnifying glass, cost/report, compass). */

/* Logo 3c (via Claude Design) — the v2 red loop plus a thin blue-to-teal
   inner ring and a thin green-to-lemon outer ring. Uses masks, a clip path
   and three gradients with short ids (r, y, b, L, H…), which would collide
   if inlined more than once per page — LogoMark renders twice (Nav.jsx and
   Footer.jsx) — so it's served as a static file through an <img> instead
   and left to the browser's cache. Natural aspect ratio is 84 x 50
   (viewBox 3 5 84 50), wider than v2's 78 x 44 — height is still the
   sizing prop, width follows automatically. */
export function LogoMark({ height = 26 }) {
  const width = Math.round((height * 84) / 50);
  return (
    <img
      src="/brand/flooho-icon-v3c.svg"
      width={width}
      height={height}
      alt=""
      aria-hidden="true"
      style={{ display: "block" }}
    />
  );
}

export function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="6" />
      <line x1="14.5" y1="14.5" x2="20" y2="20" />
    </svg>
  );
}

export function ReportIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="7" y1="13" x2="11" y2="13" />
      <line x1="7" y1="16.5" x2="9" y2="16.5" />
    </svg>
  );
}

export function CompassIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <polygon
        points="14.5,9.5 10.5,10.5 9.5,14.5 13.5,13.5"
        style={{ fill: "currentColor" }}
        stroke="none"
      />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function EmailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 6c0-1.1-.9-2-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

export function MapPinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function DatabaseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </svg>
  );
}

export function TrendUpIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M17 6h4v4" />
    </svg>
  );
}

export function DocumentStackIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 4h10a2 2 0 0 1 2 2v13" />
      <path d="M16 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M8 9h4" />
      <path d="M8 13h4" />
    </svg>
  );
}

export function ChartAxisIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
    </svg>
  );
}

export function FunnelIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 4h18l-7 9v6l-4 2v-8z" />
    </svg>
  );
}

export function ClipboardCheckIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M9 3V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function BullseyeIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="var(--coral)" stroke="none" />
    </svg>
  );
}

export function FlagIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

export function HubSpokeIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="4" r="1.5" />
      <circle cx="20" cy="12" r="1.5" />
      <circle cx="12" cy="20" r="1.5" />
      <circle cx="4" cy="12" r="1.5" />
      <line x1="12" y1="9.5" x2="12" y2="5.5" />
      <line x1="14.5" y1="12" x2="18.5" y2="12" />
      <line x1="12" y1="14.5" x2="12" y2="18.5" />
      <line x1="9.5" y1="12" x2="5.5" y2="12" />
    </svg>
  );
}

/* Nav dropdown chevron — from nav-chevron-down.svg. Decorative only; the
   link text next to it carries the accessible name. Color and rotation
   are driven by the parent (see .caret in Nav.module.css), stroke reads
   currentColor so that works. */
export function ChevronDownIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* Mobile nav hamburger — from mobile-menu-icon.svg. Bar classes are
   intentionally plain/global (not CSS-module scoped) so Nav.module.css
   can target them with :global(.bar-top) etc. under
   .menuBtn[aria-expanded="true"] to drive the X morph. Decorative only —
   aria-label lives on the parent button. */
export function MobileMenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      {/* Each bar is transformed via its wrapping <g>, not the <path>
          itself — CSS transform on a bare SVG shape element is unreliable
          in some engines, while a <g> (a proper container, not a shape)
          transforms the same way any other element does. */}
      <g className="bar bar-top">
        <path d="M4 6h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="bar bar-mid">
        <path d="M4 12h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="bar bar-bottom">
        <path d="M4 18h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
