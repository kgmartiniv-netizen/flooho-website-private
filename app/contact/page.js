import Nav from "../../components/Nav";
import ContactDetails from "../../components/ContactDetails";
import ContactForm from "../../components/ContactForm";
import BookingButton from "../../components/BookingButton";
import styles from "./page.module.css";

export const metadata = {
  title: "Flooho — Contact",
};

export default function ContactPage() {
  return (
    <>
      <Nav />

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

      <section className={styles.booking}>
        <h2>Prefer to talk live?</h2>
        <p>Grab a time on the calendar — no form required.</p>
        <BookingButton className="btn-primary btn-lg" label="Book a time" />
      </section>
    </>
  );
}
