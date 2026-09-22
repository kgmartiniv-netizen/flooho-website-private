import Link from "next/link";
import Nav from "../../components/Nav";
import {
  FunnelIcon,
  ClipboardCheckIcon,
  BullseyeIcon,
  FlagIcon,
  HubSpokeIcon,
} from "../../components/Icons";
import styles from "./page.module.css";

export const metadata = {
  title: "Flooho — Solutions",
  description:
    "AI workflow automation for GTM and product teams, plus fractional sales strategy & ops, product strategy & roadmap, and chief of staff support.",
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

// Track name stays "Strategy Advisory" — a final decision, not a
// placeholder. The fractional-role titles below carry the SEO/GEO weight
// instead (crawlable h3 text here + the page's meta description), so don't
// swap the section name for "Fractional Leadership/Strategy" or similar.
const ROLES = [
  {
    title: "Fractional Sales Strategy & Ops",
    icon: <BullseyeIcon />,
    body: "Pipeline structure, comp design, and forecasting cadence, built and owned by someone who's done it before.",
    chips: ["Pipeline & process", "Forecasting cadence", "Comp design"],
  },
  {
    title: "Fractional Product Strategy & Roadmap",
    icon: <FlagIcon />,
    body: "Roadmap prioritization, positioning calls, and the sequencing decisions that shape what gets built next, handled with senior product judgment on a part-time cadence.",
    chips: ["Roadmap prioritization", "Positioning", "Sequencing calls"],
  },
  {
    title: "Fractional Chief of Staff",
    icon: <HubSpokeIcon />,
    body: "The person who turns strategy into execution across teams, running the cadence, chasing follow-through, and keeping the org honest about what's actually getting done.",
    chips: ["Cross-team execution", "Meeting cadence", "Follow-through"],
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
            <p>Get strategic planning and senior ownership as you need it.</p>
          </div>

          <div className={styles.roleGrid}>
            {ROLES.map((role) => (
              <div className={styles.roleCard} key={role.title}>
                <div className={`icon-badge ${styles.roleIcon}`} role="img" aria-label={role.title}>
                  {role.icon}
                </div>
                <h3>{role.title}</h3>
                <p>{role.body}</p>
                <div className={styles.roleChips}>
                  {role.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closingCta}>
        <p>Not sure what you need? Let&apos;s figure it out together.</p>
        <Link href="/contact" className="btn-primary btn-lg">
          Let&apos;s talk
        </Link>
      </section>
    </>
  );
}
