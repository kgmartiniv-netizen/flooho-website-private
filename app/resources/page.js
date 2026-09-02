import Nav from "../../components/Nav";
import HashLink from "../../components/HashLink";
import styles from "./page.module.css";

export const metadata = {
  title: "Flooho — Resources",
};

const CATEGORIES = [
  {
    anchor: "blog",
    title: "Blog",
    description: "[Placeholder: thoughts on automation, strategy, and growth.]",
  },
  {
    anchor: "case-studies",
    title: "Case Studies",
    description: "[Placeholder: real engagements, real results.]",
  },
  {
    anchor: "press",
    title: "Press",
    description: "[Placeholder: news and mentions.]",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Nav />

      <section className={styles.pageHeader}>
        <h1>Resources</h1>
        <p>
          [Placeholder intro — this page previews what&apos;s coming rather
          than shipping empty. Copy TBD.]
        </p>
      </section>

      <div className={styles.categories}>
        {CATEGORIES.map((cat) => (
          <HashLink
            key={cat.anchor}
            href={`/resources#${cat.anchor}`}
            className={`card card-link ${styles.categoryCard}`}
          >
            <h3>{cat.title}</h3>
            <p>{cat.description}</p>
            <span className="tag">Coming soon</span>
          </HashLink>
        ))}
      </div>

      <section id="blog" className={styles.contentSection}>
        <h2>Blog</h2>
        <p>
          [Placeholder — blog posts will appear here. Reachable directly via
          the Resources dropdown in the nav, or the card above.]
        </p>
      </section>

      <section id="case-studies" className={styles.contentSection}>
        <h2>Case Studies</h2>
        <p>[Placeholder — case studies will appear here.]</p>
      </section>

      <section id="press" className={styles.contentSection}>
        <h2>Press</h2>
        <p>[Placeholder — press mentions will appear here.]</p>
      </section>
    </>
  );
}
