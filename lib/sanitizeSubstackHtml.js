import sanitizeHtml from "sanitize-html";

/* Allowlist sanitizer for Substack's body_html. Deliberately narrow: this
   only needs to render what a weekly roundup post actually uses (confirmed
   against the real first post in the 2026-09-24 handoff's step 0 — h2, p,
   strong, em, hr, a, and a wrapper div), plus headings/lists/images/
   blockquotes/figures the brief explicitly calls for, in case future posts
   use them. Nothing else survives. */

const ALLOWED_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "div",
  "span",
  "ul",
  "ol",
  "li",
  "a",
  "strong",
  "b",
  "em",
  "i",
  "blockquote",
  "hr",
  "br",
  "img",
  "figure",
  "figcaption",
];

const ALLOWED_ATTRIBUTES = {
  a: ["href", "target", "rel"],
  img: ["src", "alt", "width", "height", "loading"],
};

// Confirmed via the handoff's step 0: the author byline photo is served from
// substack-post-media.s3.amazonaws.com. substackcdn.com is Substack's other
// documented image host but wasn't exercised by the one live post available
// to test against (it has no in-body images) — flagged to KG in the build
// report, not silently assumed.
const ALLOWED_IMAGE_HOSTS = ["substackcdn.com", "substack-post-media.s3.amazonaws.com"];

// Substack's subscribe/paywall CTA blocks carry these class-name hints.
// Anything matching gets removed entirely, contents included — a plain
// exclusiveFilter (vs. "excludeTag") drops the whole subtree, not just the
// wrapper.
const SUBSCRIBE_WIDGET_CLASS_PATTERN = /subscribe|paywall|subscription-widget|button-wrapper/i;

function isAllowedImageHost(src) {
  try {
    return ALLOWED_IMAGE_HOSTS.includes(new URL(src).host);
  } catch {
    return false;
  }
}

export function sanitizeSubstackHtml(html) {
  if (!html) return "";
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ["https"],
    allowVulnerableTags: false,
    exclusiveFilter: (frame) => SUBSCRIBE_WIDGET_CLASS_PATTERN.test(frame.attribs?.class || ""),
    transformTags: {
      a: (tagName, attribs) => {
        const isExternal = /^https?:\/\//i.test(attribs.href || "") && !attribs.href.includes("flooho.io");
        return {
          tagName: "a",
          attribs: isExternal
            ? { ...attribs, target: "_blank", rel: "noopener noreferrer" }
            : attribs,
        };
      },
      img: (tagName, attribs) => {
        if (!attribs.src || !isAllowedImageHost(attribs.src)) {
          return { tagName: "span", attribs: {} };
        }
        return { tagName: "img", attribs: { ...attribs, loading: "lazy" } };
      },
    },
  });
}
