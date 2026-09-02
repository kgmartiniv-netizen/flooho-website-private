import Link from "next/link";
import Nav from "../../components/Nav";
import styles from "./page.module.css";

export const metadata = {
  title: "Flooho — Solutions",
};

export default function SolutionsPage() {
  return (
    <>
      <Nav />

      <section className={styles.pageHeader}>
        <h1>[Solutions headline — TBD]</h1>
        <p>
          [Short intro framing: this page gets specific about the two ways we
          work with you, after the homepage kept things general.]
        </p>
      </section>

      <section className={styles.track}>
        <div className={styles.trackContent}>
          <h2>Process &amp; Automation</h2>
          <p>
            [Placeholder: who this is for, what it solves — pulling from the
            original &quot;buried in manual work / tribal knowledge&quot;
            framing.]
          </p>
          <div className={styles.trackPlaceholderList}>
            <span>— [signal/marker 1]</span>
            <span>— [signal/marker 2]</span>
            <span>— [signal/marker 3]</span>
          </div>
        </div>
        <div className={styles.trackVisual}>[visual/icon placeholder]</div>
      </section>

      <section className={styles.track}>
        <div className={styles.trackVisual}>[visual/icon placeholder]</div>
        <div className={styles.trackContent}>
          <h2>Strategy &amp; Go-to-Market</h2>
          <p>
            [Placeholder: who this is for, what it solves — pulling from the
            &quot;strong idea, unclear market/roadmap&quot; framing.]
          </p>
          <div className={styles.trackPlaceholderList}>
            <span>— [signal/marker 1]</span>
            <span>— [signal/marker 2]</span>
            <span>— [signal/marker 3]</span>
          </div>
        </div>
      </section>

      <section className={styles.closingCta}>
        <p>[Closing line — TBD, likely echoes homepage&apos;s &quot;Let&apos;s talk&quot; CTA]</p>
        <Link href="/contact" className="btn-primary">
          Let&apos;s talk
        </Link>
      </section>
    </>
  );
}
