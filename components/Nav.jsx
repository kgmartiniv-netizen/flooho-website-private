"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "./Icons";
import { handleAnchorLinkClick } from "../lib/scrollToHash";
import styles from "./Nav.module.css";

const SOLUTIONS_DROPDOWN = [
  { href: "/solutions#process-automation", label: "Process & Workflow Automation" },
  { href: "/solutions#gtm-strategy", label: "GTM & Product Strategy" },
];

const RESOURCES_DROPDOWN = [
  { href: "/resources#blog", label: "Blog" },
  { href: "/resources#case-studies", label: "Case Studies" },
  { href: "/resources#press", label: "Press" },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions", dropdown: SOLUTIONS_DROPDOWN },
  { href: "/resources", label: "Resources", dropdown: RESOURCES_DROPDOWN },
  { href: "/contact", label: "Contact Us" },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  // Close the mobile panel whenever the route changes (link click, back/forward).
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname === href);

  const toggleSection = (href) => {
    setExpandedSections((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.logoRow}>
          <LogoMark height={24} />
          <span>flooho</span>
        </Link>

        <ul className={styles.navLinks}>
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <li key={link.href} className={styles.hasDropdown}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
                >
                  {link.label} <span className={styles.caret}>▾</span>
                </Link>
                <ul className={styles.dropdown}>
                  {link.dropdown.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={(e) => handleAnchorLinkClick(e, item.href, pathname)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label={mobileOpen ? "Close menu" : "Menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-nav-panel" className={styles.mobilePanel}>
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div key={link.href} className={styles.mobileSection}>
                <div className={styles.mobileSectionRow}>
                  <Link
                    href={link.href}
                    className={`${styles.mobileLink} ${isActive(link.href) ? styles.active : ""}`}
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    className={styles.mobileToggle}
                    aria-label={`${expandedSections[link.href] ? "Collapse" : "Expand"} ${link.label} submenu`}
                    aria-expanded={!!expandedSections[link.href]}
                    aria-controls={`mobile-sub-${link.href}`}
                    onClick={() => toggleSection(link.href)}
                  >
                    <span
                      className={`${styles.mobileToggleIcon} ${
                        expandedSections[link.href] ? styles.mobileToggleIconOpen : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                </div>
                {expandedSections[link.href] && (
                  <div id={`mobile-sub-${link.href}`} className={styles.mobileSubLinks}>
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={styles.mobileSubLink}
                        onClick={(e) => {
                          handleAnchorLinkClick(e, item.href, pathname);
                          setMobileOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${isActive(link.href) ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
