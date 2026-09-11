import Link from "next/link";
import { LogoMark } from "./Icons";
import HashLink from "./HashLink";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandLogo}>
            <LogoMark height={24} />
            <span>flooho</span>
          </Link>
          <p className={styles.tagline}>
            Keep your company ahead of the pace of modern business.
          </p>
        </div>

        <div className={styles.column}>
          <span className={`type-label ${styles.columnLabel}`}>Solutions</span>
          <div className={styles.linkList}>
            <HashLink href="/solutions#process-automation" className={styles.footerLink}>
              Process &amp; Workflow Automation
            </HashLink>
            <HashLink href="/solutions#gtm-strategy" className={styles.footerLink}>
              GTM &amp; Product Strategy
            </HashLink>
          </div>
        </div>

        <div className={styles.column}>
          <span className={`type-label ${styles.columnLabel}`}>Resources</span>
          <div className={styles.linkList}>
            <HashLink href="/resources#blog" className={styles.footerLink}>
              Blog
            </HashLink>
            <HashLink href="/resources#case-studies" className={styles.footerLink}>
              Case Studies
            </HashLink>
            <HashLink href="/resources#press" className={styles.footerLink}>
              Press
            </HashLink>
          </div>
        </div>

        <div className={styles.column}>
          <span className={`type-label ${styles.columnLabel}`}>Company</span>
          <div className={styles.linkList}>
            <Link href="/contact" className={styles.footerLink}>
              Contact Us
            </Link>
            {/* Live as of 2026-09-10 — a real mailto link now, matching
                the contact page. */}
            <a href="mailto:hello@flooho.com" className={styles.emailLink}>
              hello@flooho.com
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span className={styles.copyright}>© 2026 Flooho. All rights reserved.</span>
        <div className={styles.legalLinks}>
          {/* No Privacy/Terms pages exist yet — real placeholders, not a
              content decision for this pass. */}
          <a href="#" className={styles.legalLink}>
            Privacy
          </a>
          <a href="#" className={styles.legalLink}>
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
