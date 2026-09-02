import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className="type-display">Build your business of the future.</h1>
      <p>Keep your company ahead of the pace of modern business.</p>
      <div className={styles.heroBtns}>
        <Link href="/contact" className="btn-primary">
          Get started
        </Link>
        {/* "Learn more" had no destination in the static reference — pointed it
            at the problem section as the most reasonable default. Flag if you
            intended something else (e.g. a future About/Services page). */}
        <a href="#problem" className="btn-secondary">
          Learn more
        </a>
      </div>
    </section>
  );
}
