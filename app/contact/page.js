import Nav from "../../components/Nav";
import ContactDetails from "../../components/ContactDetails";
import ContactForm from "../../components/ContactForm";
import styles from "./page.module.css";

export const metadata = {
  title: "Flooho — Contact",
};

export default function ContactPage() {
  return (
    <>
      <Nav variant="contact" />

      <section className={styles.pageHeader}>
        <h1>Let&apos;s talk.</h1>
        <p>
          Tell us a bit about your business and what&apos;s on your mind.
          We&apos;ll follow up within one business day.
        </p>
      </section>

      <div className={styles.contactWrap}>
        <ContactDetails />
        <ContactForm />
      </div>
    </>
  );
}
