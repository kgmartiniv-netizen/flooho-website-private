"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleAnchorLinkClick } from "../lib/scrollToHash";

// A normal next/link that also scrolls correctly when the href points to a
// hash on the page you're already on (see lib/scrollToHash.js for why).
export default function HashLink({ href, children, ...rest }) {
  const pathname = usePathname();
  return (
    <Link href={href} onClick={(e) => handleAnchorLinkClick(e, href, pathname)} {...rest}>
      {children}
    </Link>
  );
}
