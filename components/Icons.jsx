/* All icon choices below are locked per flooho_project_context.md
   (Section 3 icon selection: magnifying glass, cost/report, compass). */

/* Finalized mark from flooho_icon_v2.svg (via Claude Design) — single
   continuous filled path with a smooth taper, red-to-coral radial gradient.
   Supersedes the earlier hand-coded segmented-stroke loop. Source file
   (with content-credential metadata intact) lives at
   public/brand/flooho-icon-v2.svg; this is the same path/gradient inlined
   without that metadata, to avoid shipping an ~11KB manifest blob on every
   page load. Natural aspect ratio (viewBox 6 8 78 44) is wide, not square —
   height is the sizing prop, width follows automatically. */
export function LogoMark({ height = 26 }) {
  const width = Math.round((height * 78) / 44);
  return (
    <svg
      width={width}
      height={height}
      viewBox="6 8 78 44"
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id="flooho-icon-gradient"
          gradientUnits="userSpaceOnUse"
          cx="45"
          cy="30"
          r="42"
        >
          <stop offset="0" stopColor="#E8432F" />
          <stop offset="0.35" stopColor="#E8432F" />
          <stop offset="1" stopColor="#F0997B" />
        </radialGradient>
      </defs>
      <path
        fill="url(#flooho-icon-gradient)"
        fillRule="nonzero"
        d="M74,30C74,31.48 73.77,33.09 73.41,34.44C73.05,35.8 72.45,37.09 71.83,38.12C71.21,39.16 70.44,39.98 69.7,40.63C68.96,41.28 68.17,41.7 67.38,42.02C66.59,42.33 65.79,42.47 64.95,42.51C64.12,42.55 63.25,42.44 62.39,42.23C61.52,42.02 60.62,41.68 59.75,41.25C58.88,40.82 58.01,40.27 57.17,39.67C56.32,39.07 55.5,38.37 54.7,37.63C53.9,36.9 53.12,36.1 52.37,35.27C51.62,34.45 50.89,33.57 50.17,32.68C49.45,31.79 48.76,30.87 48.06,29.94C47.36,29.01 46.68,28.05 45.98,27.1C45.29,26.14 44.6,25.17 43.88,24.2C43.16,23.24 42.43,22.26 41.66,21.31C40.89,20.35 40.1,19.39 39.25,18.47C38.39,17.54 37.5,16.62 36.52,15.77C35.54,14.92 34.5,14.08 33.36,13.36C32.21,12.65 30.98,11.96 29.63,11.49C28.28,11.02 26.8,10.61 25.27,10.53C23.74,10.45 22.04,10.54 20.44,11.01C18.84,11.48 17.13,12.26 15.66,13.36C14.19,14.45 12.75,15.93 11.63,17.6C10.51,19.27 9.55,21.3 8.94,23.37C8.34,25.43 8,27.79 8,30C8,32.21 8.34,34.57 8.94,36.63C9.55,38.7 10.51,40.73 11.63,42.4C12.75,44.07 14.19,45.55 15.66,46.64C17.13,47.74 18.84,48.52 20.44,48.99C22.04,49.46 23.74,49.55 25.27,49.47C26.8,49.39 28.28,48.98 29.63,48.51C30.98,48.04 32.21,47.35 33.36,46.64C34.5,45.92 35.54,45.08 36.52,44.23C37.5,43.38 38.39,42.46 39.25,41.53C40.1,40.61 40.89,39.65 41.66,38.69C42.43,37.74 43.16,36.76 43.88,35.8C44.6,34.83 45.29,33.86 45.98,32.9C46.68,31.95 47.36,30.99 48.06,30.06C48.76,29.13 49.45,28.21 50.17,27.32C50.89,26.43 51.62,25.55 52.37,24.73C53.12,23.9 53.9,23.1 54.7,22.37C55.5,21.63 56.32,20.93 57.17,20.33C58.01,19.73 58.88,19.18 59.75,18.75C60.62,18.32 61.52,17.98 62.39,17.77C63.25,17.56 64.12,17.45 64.95,17.49C65.79,17.53 66.59,17.67 67.38,17.98C68.17,18.3 68.96,18.72 69.7,19.37C70.44,20.02 71.21,20.84 71.83,21.88C72.45,22.91 73.05,24.2 73.41,25.56C73.77,26.91 74,28.52 74,30ZM81.06,23.37C80.45,21.3 79.49,19.27 78.37,17.6C77.25,15.93 75.81,14.45 74.34,13.36C72.87,12.26 71.16,11.48 69.56,11.01C67.96,10.54 66.26,10.45 64.73,10.53C63.2,10.61 61.72,11.02 60.37,11.49C59.02,11.96 57.79,12.65 56.64,13.36C55.5,14.08 54.46,14.92 53.48,15.77C52.5,16.62 51.61,17.54 50.75,18.47C49.9,19.39 49.11,20.35 48.34,21.31C47.57,22.26 46.84,23.24 46.12,24.2C45.4,25.17 44.71,26.14 44.02,27.1C43.32,28.05 42.64,29.01 41.94,29.94C41.24,30.87 40.55,31.79 39.83,32.68C39.11,33.57 38.38,34.45 37.63,35.27C36.88,36.1 36.1,36.9 35.3,37.63C34.5,38.37 33.68,39.07 32.83,39.67C31.99,40.27 31.12,40.82 30.25,41.25C29.38,41.68 28.48,42.02 27.61,42.23C26.75,42.44 25.88,42.55 25.05,42.51C24.21,42.47 23.41,42.33 22.62,42.02C21.83,41.7 21.04,41.28 20.3,40.63C19.56,39.98 18.79,39.16 18.17,38.12C17.55,37.09 16.95,35.8 16.59,34.44C16.23,33.09 16,31.48 16,30C16,28.52 16.23,26.91 16.59,25.56C16.95,24.2 17.55,22.91 18.17,21.88C18.79,20.84 19.56,20.02 20.3,19.37C21.04,18.72 21.83,18.3 22.62,17.98C23.41,17.67 24.21,17.53 25.05,17.49C25.88,17.45 26.75,17.56 27.61,17.77C28.48,17.98 29.38,18.32 30.25,18.75C31.12,19.18 31.99,19.73 32.83,20.33C33.68,20.93 34.5,21.63 35.3,22.37C36.1,23.1 36.88,23.9 37.63,24.73C38.38,25.55 39.11,26.43 39.83,27.32C40.55,28.21 41.24,29.13 41.94,30.06C42.64,30.99 43.32,31.95 44.02,32.9C44.71,33.86 45.4,34.83 46.12,35.8C46.84,36.76 47.57,37.74 48.34,38.69C49.11,39.65 49.9,40.61 50.75,41.53C51.61,42.46 52.5,43.38 53.48,44.23C54.46,45.08 55.5,45.92 56.64,46.64C57.79,47.35 59.02,48.04 60.37,48.51C61.72,48.98 63.2,49.39 64.73,49.47C66.26,49.55 67.96,49.46 69.56,48.99C71.16,48.52 72.87,47.74 74.34,46.64C75.81,45.55 77.25,44.07 78.37,42.4C79.49,40.73 80.45,38.7 81.06,36.63C81.66,34.57 82,32.21 82,30C82,27.79 81.66,25.43 81.06,23.37Z"
      />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <polygon
        points="14.5,9.5 10.5,10.5 9.5,14.5 13.5,13.5"
        style={{ fill: "var(--coral)" }}
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
