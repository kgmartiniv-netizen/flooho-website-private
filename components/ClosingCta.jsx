import Link from "next/link";
import styles from "./ClosingCta.module.css";

export default function ClosingCta() {
  return (
    <section className={styles.closingCta}>
      <p>
        Talk to us about where your business is headed — and how automation
        can help you get there faster.
      </p>
      <Link href="/contact" className="btn-primary btn-lg">
        Let&apos;s talk
      </Link>
    </section>
  );
}
