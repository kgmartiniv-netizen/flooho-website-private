import Link from "next/link";
import Nav from "../../components/Nav";
import { FunnelIcon, ClipboardCheckIcon } from "../../components/Icons";
import styles from "./page.module.css";

export const metadata = {
  title: "Flooho — Solutions",
};

// Engineering and Marketing are deferred, not cancelled — they'll return as
// their own featured cards once each has a real methodology page built (the
// same way GTM and PM were), not before. No placeholder text anywhere on
// the site for launch, so they're held back entirely rather than shown as
// "coming soon" dashed tiles.
const VERTICALS = [
  {
    name: "GTM Automation",
    icon: <FunnelIcon />,
    body: "Pipeline hygiene, call notes, and prospecting — automated for sales teams buried in admin work instead of selling.",
    chips: ["Pipeline hygiene", "Call notes", "Prospect research"],
    href: "/solutions/gtm-automation",
  },
  {
    name: "Product Management",
    icon: <ClipboardCheckIcon />,
    body: "Roadmap hygiene, spec-to-ticket handoff, and status reporting — automated for PM teams buried in updates instead of building.",
    chips: ["Roadmap sync", "Spec-to-ticket", "Status digest"],
    href: "/solutions/product-management-automation",
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
            {VERTICALS.map((vertical) => (
              <div className={styles.verticalCard} key={vertical.name}>
                <div className={`icon-badge icon-badge-lg ${styles.verticalIcon}`}>
                  {vertical.icon}
                </div>
                <h3>{vertical.name}</h3>
                <p>{vertical.body}</p>
                <div className={styles.verticalChips}>
                  {vertical.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
                <Link href={vertical.href} className={styles.verticalLink}>
                  See how it works →
                </Link>
              </div>
            ))}
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
