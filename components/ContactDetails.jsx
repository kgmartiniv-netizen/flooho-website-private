import styles from "./ContactDetails.module.css";
import { PhoneIcon, EmailIcon } from "./Icons";

// Live as of 2026-09-10: phone and email are real. No office address for
// now — removed rather than left as a placeholder.
const DETAILS = [
  {
    icon: <PhoneIcon />,
    label: "Phone",
    value: "(619) 333-0653",
  },
  {
    icon: <EmailIcon />,
    label: "Email",
    value: "hello@flooho.com",
  },
];

export default function ContactDetails() {
  return (
    <div className={`card card-panel ${styles.detailsPanel}`}>
      {DETAILS.map((detail) => (
        <div key={detail.label} className={styles.detailItem}>
          <div className="icon-badge icon-badge-sm">{detail.icon}</div>
          <div>
            <h3>{detail.label}</h3>
            <p>{detail.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
