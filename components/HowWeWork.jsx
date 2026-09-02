import styles from "./HowWeWork.module.css";
import { SearchIcon, ReportIcon, CompassIcon } from "./Icons";

const STEPS = [
  {
    icon: <SearchIcon />,
    title: "What's really happening?",
    body: "We look past the org chart to see how work actually gets done.",
  },
  {
    icon: <ReportIcon />,
    title: "What's it costing you?",
    body: "We turn what we find into real numbers — time, money, missed opportunity.",
  },
  {
    icon: <CompassIcon />,
    title: "What do you need next?",
    body: "We build the fix that matches the problem, not a one-size solution.",
  },
];

export default function HowWeWork() {
  return (
    <section className={styles.howItWorks}>
      <h2>How we work</h2>
      <div className={styles.stepsGrid}>
        {STEPS.map((step) => (
          <div key={step.title} className={`card ${styles.stepCard}`}>
            <div className="icon-badge">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
