import Link from "next/link";
import Nav from "../../components/Nav";
import { listAutomationWatchPosts } from "../../lib/substack";
import styles from "./page.module.css";

export const metadata = {
  title: "Flooho — Automation Watch",
  description:
    "Automation Watch: Flooho's weekly roundup of what's actually happening in automation, syndicated from Substack.",
};

// Static generation with revalidation (ISR) — the simplest fit for this
// stack. This page is a plain Server Component with no build hook wired up
// (Vercel auto-deploys on push to master, nothing else), so time-based
// revalidation is what gets a new tagged post onto the site automatically:
// Vercel keeps serving the last generated version of this page until the
// window below elapses, then regenerates it in the background on the next
// visit. A new post shows up within about an hour, no manual rebuild.
export const revalidate = 3600;

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await listAutomationWatchPosts();

  return (
    <>
      <Nav />

      <section className={styles.pageHeader}>
        <h1>Automation Watch</h1>
        <p>
          Our weekly roundup of what&apos;s actually happening in automation,
          syndicated from Substack.
        </p>
      </section>

      {!posts || posts.length === 0 ? (
        <section className={styles.empty}>
          <p>Nothing here yet. Check back soon, or read straight from Substack.</p>
          <a href="https://kgmartin.substack.com" target="_blank" rel="noopener noreferrer">
            kgmartin.substack.com →
          </a>
        </section>
      ) : (
        <div className={styles.postList}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`card card-link ${styles.postCard}`}
            >
              {post.cover_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.cover_image} alt="" className={styles.coverImage} />
              )}
              <span className={styles.postDate}>{formatDate(post.post_date)}</span>
              <h2>{post.title}</h2>
              {post.subtitle && <p>{post.subtitle}</p>}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
