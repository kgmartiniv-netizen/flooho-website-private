import { describe, it, expect } from "vitest";
import {
  isPubliclySyndicatable,
  filterAndSortTaggedPosts,
  normalizePostSummary,
  extractRssContentEncodedForSlug,
  TAG_SLUG,
} from "./substack.js";
import taggedFreePost from "./__fixtures__/tagged-free-post.json" with { type: "json" };
import untaggedPost from "./__fixtures__/untagged-post.json" with { type: "json" };
import paidPost from "./__fixtures__/paid-post.json" with { type: "json" };

// taggedFreePost is real data fetched live from
// https://kgmartin.substack.com/api/v1/archive during the 2026-09-24
// handoff's step 0. untaggedPost and paidPost are synthetic — no untagged
// or paid post exists in the publication yet to fetch a real one from.

describe("TAG_SLUG", () => {
  it("matches what step 0 confirmed live", () => {
    expect(TAG_SLUG).toBe("automation-watch");
  });
});

describe("isPubliclySyndicatable", () => {
  it("accepts a tagged, free post", () => {
    expect(isPubliclySyndicatable(taggedFreePost)).toBe(true);
  });

  it("rejects a post without the Automation Watch tag", () => {
    expect(isPubliclySyndicatable(untaggedPost)).toBe(false);
  });

  it("rejects a tagged post that isn't free", () => {
    expect(isPubliclySyndicatable(paidPost)).toBe(false);
  });

  it("rejects a post with no postTags field at all", () => {
    expect(isPubliclySyndicatable({ audience: "everyone" })).toBe(false);
  });
});

describe("filterAndSortTaggedPosts", () => {
  const mixed = [paidPost, untaggedPost, taggedFreePost];

  it("keeps only the tagged, free post out of a mixed batch", () => {
    const result = filterAndSortTaggedPosts(mixed);
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe(taggedFreePost.slug);
  });

  it("never lets an untagged or paid post through, regardless of input order", () => {
    const result = filterAndSortTaggedPosts([untaggedPost, paidPost]);
    expect(result).toHaveLength(0);
  });

  it("sorts newest first", () => {
    const older = { ...taggedFreePost, slug: "older-post", post_date: "2026-09-01T00:00:00.000Z" };
    const newer = { ...taggedFreePost, slug: "newer-post", post_date: "2026-09-20T00:00:00.000Z" };
    const result = filterAndSortTaggedPosts([older, newer]);
    expect(result.map((p) => p.slug)).toEqual(["newer-post", "older-post"]);
  });
});

describe("normalizePostSummary", () => {
  it("only exposes the fields the UI needs", () => {
    const summary = normalizePostSummary(taggedFreePost);
    expect(summary).toEqual({
      slug: taggedFreePost.slug,
      title: taggedFreePost.title,
      subtitle: taggedFreePost.subtitle,
      post_date: taggedFreePost.post_date,
      canonical_url: taggedFreePost.canonical_url,
      audience: taggedFreePost.audience,
      cover_image: taggedFreePost.cover_image,
    });
  });
});

describe("extractRssContentEncodedForSlug", () => {
  const xml = `<rss><channel>
    <item><title>Other post</title><link>https://kgmartin.substack.com/p/other-post</link>
    <content:encoded><![CDATA[<p>other</p>]]></content:encoded></item>
    <item><title>Target</title><link>https://kgmartin.substack.com/p/week-in-automation-new-models-rogue</link>
    <content:encoded><![CDATA[<p>real body</p>]]></content:encoded></item>
  </channel></rss>`;

  it("finds the matching item's content:encoded by slug", () => {
    const result = extractRssContentEncodedForSlug(xml, "week-in-automation-new-models-rogue");
    expect(result).toBe("<p>real body</p>");
  });

  it("returns null when the slug isn't in the feed", () => {
    expect(extractRssContentEncodedForSlug(xml, "does-not-exist")).toBeNull();
  });
});
