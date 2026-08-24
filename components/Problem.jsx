import styles from "./Problem.module.css";

export default function Problem() {
  return (
    <section id="problem" className={styles.problem}>
      <div className={styles.problemInner}>
        <h2>In the modern world, standing still is falling behind.</h2>
        <p>
          Markets don&apos;t wait for you to catch up. What works today can
          quietly stop being enough tomorrow — not because it broke, but
          because everything around it changed.
        </p>
      </div>
    </section>
  );
}
