import Link from "next/link";
import Nav from "../../components/Nav";
import styles from "./page.module.css";

export const metadata = {
  title: "Flooho — Solutions",
};

const VERTICALS = [
  {
    name: "GTM Automation",
    body: "Pipeline hygiene, call notes, and prospecting — automated for sales teams buried in admin work instead of selling.",
    href: "/solutions/gtm-automation",
    live: true,
  },
  {
    name: "Product Management",
    body: "Roadmap hygiene, spec-to-ticket handoff, and status reporting — automated for PM teams buried in updates instead of building.",
    href: "/solutions/product-management-automation",
    live: true,
  },
  {
    name: "Engineering",
    body: "[Placeholder — deploy pipelines, review triage, incident follow-up.]",
    live: false,
  },
  {
    name: "Marketing",
    body: "[Placeholder — content ops, campaign reporting, lead routing.]",
    live: false,
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Nav />

      <section className={styles.pageHeader}>
        <h1>Two ways we help you move faster.</h1>
        <p>
          Workflow automation for the work that&apos;s already happening.
          Strategy advisory for deciding what&apos;s next. Most engagements
          end up touching both.
        </p>
      </section>

      {/* ================= TRACK 1: WORKFLOW AUTOMATION ================= */}
      <section id="workflow-automation" className={styles.trackShell}>
        <div className={styles.trackInner}>
          <div className={styles.trackHeading}>
            <h2>Workflow Automation</h2>
            <p>
              We install automated workflows inside the tools your team
              already uses — so the admin work disappears without adding
              another tool to log into.
            </p>
          </div>

          <div className={styles.verticalGrid}>
            {VERTICALS.map((vertical) =>
              vertical.live ? (
                <div className={`${styles.verticalCard} ${styles.verticalCardLive}`} key={vertical.name}>
                  <h3>{vertical.name}</h3>
                  <p>{vertical.body}</p>
                  <Link href={vertical.href}>See how it works →</Link>
                </div>
              ) : (
                <div className={styles.verticalCard} key={vertical.name}>
                  <h3>{vertical.name}</h3>
                  <p>{vertical.body}</p>
                  <span className="tag">Coming soon</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================= TRACK 2: STRATEGY ADVISORY ================= */}
      <section id="strategy-advisory" className={styles.trackShell}>
        <div className={styles.trackInner}>
          <div className={styles.trackHeading}>
            <h2>Strategy Advisory</h2>
            <p>
              [Placeholder intro: for the strong idea with an unclear market
              or roadmap — positioning, go-to-market planning, and the
              strategic questions automation alone can&apos;t answer.]
            </p>
          </div>
          <div className={styles.track}>
            <div className="card-media">[visual/icon placeholder]</div>
            <div className={styles.trackContent}>
              <div className={styles.trackPlaceholderList}>
                <span>— [signal/marker 1]</span>
                <span>— [signal/marker 2]</span>
                <span>— [signal/marker 3]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.closingCta}>
        <p>Not sure which track fits? That&apos;s a strategy conversation in itself.</p>
        <Link href="/contact" className="btn-primary btn-lg">
          Let&apos;s talk
        </Link>
      </section>
    </>
  );
}
