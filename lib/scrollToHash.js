// Next.js <Link> auto-scrolls to a hash target on an actual route change,
// but not when only the hash changes on the current page (e.g. clicking
// Blog then Press while already on /resources) — the URL updates but the
// viewport doesn't move. This handles that case manually; cross-page hash
// navigation is left to Link/the browser, which already handles it.
export function handleAnchorLinkClick(event, href, pathname) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return;

  const path = href.slice(0, hashIndex) || "/";
  const hash = href.slice(hashIndex + 1);
  if (path !== pathname) return;

  const target = document.getElementById(hash);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ block: "start" });
  window.history.pushState(null, "", href);
}
