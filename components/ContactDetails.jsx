import styles from "./ContactDetails.module.css";
import { PhoneIcon, EmailIcon, MapPinIcon } from "./Icons";

/* PLACEHOLDER DATA — phone/email/office address below are all fake,
   carried over from the static reference file. Replace before launch. */
const DETAILS = [
  {
    icon: <PhoneIcon />,
    label: "Phone",
    value: "(555) 010-0100",
  },
  {
    icon: <EmailIcon />,
    label: "Email",
    value: "hello@flooho.com",
  },
  {
    icon: <MapPinIcon />,
    label: "Office",
    value: (
      <>
        123 Market Street, Suite 400
        <br />
        San Diego, CA 92101
      </>
    ),
  },
];

export default function ContactDetails() {
  return (
    <div className={`card card-panel ${styles.detailsPanel}`}>
      <p className={`type-label ${styles.placeholderFlag}`}>Placeholder — replace before launch</p>
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
