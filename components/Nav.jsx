import Link from "next/link";
import { LogoMark } from "./Icons";

export default function Nav({ variant = "landing" }) {
  return (
    <nav>
      <Link href="/" className="logo-row" style={{ textDecoration: "none" }}>
        <LogoMark />
        <span>flooho</span>
      </Link>
      {variant === "landing" ? (
        <Link href="/contact" className="cta-nav">
          Get started
        </Link>
      ) : (
        <Link href="/" className="cta-nav">
          Back to home
        </Link>
      )}
    </nav>
  );
}
