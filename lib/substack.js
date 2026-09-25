/* Substack syndication data layer — "Syndicate to website" stage of the
   Automation Watch pipeline (see reference/website-syndication-brief.md in
   the 2026-09-24 handoff). Fetches Substack's public, unofficial JSON
   archive/post endpoints server-side only — never call this from a client
   component, both because Substack's CORS rules would block it and because
   these endpoints are undocumented and shouldn't be exposed to visitors.

   All config lives here in one place, per the build prompt. */

export const PUBLICATION_URL = "https://kgmartin.substack.com";
export const TAG_SLUG = "automation-watch";
export const POST_LIMIT = 20;
export const REQUEST_TIMEOUT_MS = 10_000;
// Next's fetch-level ISR: a new post shows up on the site within about an
// hour of publishing, no rebuild or manual step needed.
export const REVALIDATE_SECONDS = 3600;

const ARCHIVE_PAGE_SIZE = 12; // matches the page size used in the handoff's own step-0 verification call
const USER_AGENT =
  "Mozilla/5.0 (compatible; FloohoSiteBot/1.0; +https://www.flooho.io) AppleWebKit/537.36";

async function fetchWithTimeoutAndBackoff(url, options = {}, attempt = 0) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: { "User-Agent": USER_AGENT, ...options.headers },
    });
    if (response.status === 429 && attempt < 2) {
      const retryAfter = Number(response.headers.get("retry-after")) || 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      return fetchWithTimeoutAndBackoff(url, options, attempt + 1);
    }
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/** Pure — kept separate from fetching so it's directly unit-testable against fixtures. */
export function hasAutomationWatchTag(post) {
  return Array.isArray(post?.postTags) && post.postTags.some((tag) => tag.slug === TAG_SLUG);
}

/** Pure — the full "should this post ever be visible on the site" rule. */
export function isPubliclySyndicatable(post) {
  return hasAutomationWatchTag(post) && post?.audience === "everyone";
}

/** Pure — narrows a raw archive/post object down to what the UI needs. */
export function normalizePostSummary(raw) {
  return {
    slug: raw.slug,
    title: raw.title,
    subtitle: raw.subtitle || null,
    post_date: raw.post_date,
    canonical_url: raw.canonical_url,
    audience: raw.audience,
    cover_image: raw.cover_image || null,
  };
}

/** Pure — the list-level filter+sort, unit-tested with fixture JSON. */
export function filterAndSortTaggedPosts(rawPosts) {
  return rawPosts
    .filter(isPubliclySyndicatable)
    .map(normalizePostSummary)
    .sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
}

async function fetchArchivePage(offset) {
  const url = `${PUBLICATION_URL}/api/v1/archive?sort=new&limit=${ARCHIVE_PAGE_SIZE}&offset=${offset}`;
  const response = await fetchWithTimeoutAndBackoff(url, {
    next: { revalidate: REVALIDATE_SECONDS, tags: ["automation-watch-list"] },
  });
  if (!response.ok) throw new Error(`archive fetch failed: ${response.status}`);
  const page = await response.json();
  if (!Array.isArray(page)) throw new Error("archive response was not an array");
  return page;
}

/**
 * Lists published, free, Automation-Watch-tagged posts, newest first.
 * Returns `null` (not a thrown error, not an empty array) if the archive
 * couldn't be read at all, so callers can tell "genuinely no posts" apart
 * from "fetch failed" and fall back to Next's own stale cached response
 * instead of rendering an empty-state over real data.
 */
export async function listAutomationWatchPosts() {
  try {
    let all = [];
    let offset = 0;
    while (all.length < POST_LIMIT) {
      const page = await fetchArchivePage(offset);
      if (page.length === 0) break;
      all = all.concat(page);
      if (page.length < ARCHIVE_PAGE_SIZE) break;
      offset += ARCHIVE_PAGE_SIZE;
    }
    return filterAndSortTaggedPosts(all).slice(0, POST_LIMIT);
  } catch (err) {
    console.error("substack: listAutomationWatchPosts failed:", err.message);
    return null;
  }
}

async function fetchPostJson(slug) {
  const url = `${PUBLICATION_URL}/api/v1/posts/${slug}`;
  const response = await fetchWithTimeoutAndBackoff(url, {
    next: { revalidate: REVALIDATE_SECONDS, tags: [`automation-watch-post-${slug}`] },
  });
  if (!response.ok) throw new Error(`post fetch failed: ${response.status}`);
  return response.json();
}

/**
 * Fetches one post's full body. Returns `null` if the post doesn't exist,
 * isn't tagged Automation Watch, or isn't free — never returns a post that
 * fails that check, even if the raw fetch technically succeeded.
 */
export async function getAutomationWatchPost(slug) {
  try {
    const raw = await fetchPostJson(slug);
    if (!isPubliclySyndicatable(raw)) return null;
    return { ...normalizePostSummary(raw), body_html: raw.body_html || "" };
  } catch (err) {
    console.error(`substack: getAutomationWatchPost(${slug}) primary fetch failed:`, err.message);
    return getPostViaRssFallback(slug);
  }
}

/**
 * RSS fallback for a single post's body when the JSON post endpoint is
 * down. RSS carries no tag data, so this only serves a slug that the list
 * endpoint has *already* confirmed is tagged and free in this same
 * request — it never trusts an arbitrary slug on RSS content alone.
 */
async function getPostViaRssFallback(slug) {
  try {
    const knownGood = await listAutomationWatchPosts();
    const summary = knownGood?.find((post) => post.slug === slug);
    if (!summary) return null;

    const response = await fetchWithTimeoutAndBackoff(`${PUBLICATION_URL}/feed`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;
    const xml = await response.text();
    const bodyHtml = extractRssContentEncodedForSlug(xml, slug);
    if (!bodyHtml) return null;

    return { ...summary, body_html: bodyHtml };
  } catch (err) {
    console.error(`substack: RSS fallback for ${slug} failed:`, err.message);
    return null;
  }
}

/** Pure — string-matches an RSS <item> by its Substack post slug (from the <link>) and pulls its content:encoded block. */
export function extractRssContentEncodedForSlug(xml, slug) {
  const items = xml.split("<item>").slice(1);
  for (const item of items) {
    if (!item.includes(`/p/${slug}`)) continue;
    const match = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
    return match ? match[1] : null;
  }
  return null;
}
