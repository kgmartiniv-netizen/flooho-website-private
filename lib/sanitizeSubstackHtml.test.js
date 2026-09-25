import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { sanitizeSubstackHtml } from "./sanitizeSubstackHtml.js";

const fixturesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "__fixtures__");
const widgetFixture = readFileSync(path.join(fixturesDir, "post-body-with-widgets.html"), "utf-8");

describe("sanitizeSubstackHtml", () => {
  const output = sanitizeSubstackHtml(widgetFixture);

  it("keeps real article content", () => {
    expect(output).toContain("A big week for developments in new models.");
    expect(output).toContain("<h2>Major Developments</h2>");
    expect(output).toContain("<strong>Alibaba:</strong>");
  });

  it("strips script tags entirely, contents included", () => {
    expect(output).not.toContain("<script");
    expect(output).not.toContain("alert('should be stripped')");
  });

  it("strips iframes", () => {
    expect(output).not.toContain("<iframe");
    expect(output).not.toContain("evil.example.com");
  });

  it("strips Substack subscribe widgets, contents included", () => {
    expect(output).not.toContain("subscribe-widget");
    expect(output).not.toContain("Subscribe to get posts in your inbox");
    expect(output).not.toContain("<button");
  });

  it("strips inline event handlers but keeps the surrounding text", () => {
    expect(output).not.toContain("onmouseover");
    expect(output).not.toContain("alert('xss')");
    expect(output).toContain("Inline handler should be stripped but text kept.");
  });

  it("keeps images from allowed Substack CDN hosts", () => {
    expect(output).toContain("substackcdn.com/image/fetch/real.png");
  });

  it("drops images from hosts other than Substack's CDN", () => {
    expect(output).not.toContain("evil-tracker.example.com");
  });

  it("adds target=_blank and rel=noopener to external links, real fixture", () => {
    const html = sanitizeSubstackHtml('<a href="https://www.axios.com/some-story">Axios</a>');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("passes through an empty/missing body without throwing", () => {
    expect(sanitizeSubstackHtml("")).toBe("");
    expect(sanitizeSubstackHtml(undefined)).toBe("");
  });
});
