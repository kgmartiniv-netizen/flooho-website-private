import { notFound } from "next/navigation";
import Nav from "../../../components/Nav";
import { getAutomationWatchPost, listAutomationWatchPosts } from "../../../lib/substack";
import { sanitizeSubstackHtml } from "../../../lib/sanitizeSubstackHtml";
import styles from "./page.module.css";

export const revalidate = 3600;

// Pre-renders every currently-known post at build time; a brand-new post
// that doesn't have a static path yet is still served correctly (Next
// falls through to a normal on-demand render), it just isn't pre-built
// until the next deploy. Combined with the revalidate above, this is what
// gets a new tagged post onto the site within about an hour without a
// rebuild: ISR regenerates /blog itself on that schedule, and the first
// visit to its new /blog/<slug> link renders and then caches on demand.
export async function generateStaticParams() {
  const posts = await listAutomationWatchPosts();
  return (posts || []).map((post) => ({ slug: post.slug }));
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getAutomationWatchPost(slug);
  if (!post) return { title: "Flooho — Automation Watch" };

  return {
    title: `Flooho — ${post.title}`,
    description: post.subtitle || undefined,
    alternates: { canonical: post.canonical_url },
    openGraph: {
      title: post.title,
      description: post.subtitle || undefined,
      url: post.canonical_url,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getAutomationWatchPost(slug);

  // Covers both "doesn't exist" and "exists but isn't tagged/isn't free" —
  // getAutomationWatchPost() already refuses to return either, so there's
  // no separate untagged-post branch to get wrong here.
  if (!post) notFound();

  const bodyHtml = sanitizeSubstackHtml(post.body_html);

  return (
    <>
      <Nav />
      <article className={styles.post}>
        <p className={styles.postDate}>{formatDate(post.post_date)}</p>
        <h1>{post.title}</h1>
        {post.subtitle && <p className={styles.subtitle}>{post.subtitle}</p>}

        <div className={styles.body} dangerouslySetInnerHTML={{ __html: bodyHtml }} />

        <a
          href={post.canonical_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.substackLink}
        >
          Read and subscribe on Substack →
        </a>
      </article>
    </>
  );
}
