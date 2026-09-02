"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: null, message: "" });
    setSubmitting(true);

    const payload = Object.fromEntries(new FormData(event.target).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      event.target.reset();
      setStatus({ type: "success", message: "Thanks! Your message has been sent." });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card card-panel">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstname">First name</label>
            <input type="text" id="firstname" name="firstname" required />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last name</label>
            <input type="text" id="lastname" name="lastname" required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Work email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input type="text" id="company" name="company" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">What&apos;s on your mind?</label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Tell us a bit about where your business is headed and what's slowing you down."
          />
        </div>

        {/* Honeypot: bots tend to fill every field, humans never see this one. */}
        <div className="form-group-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <button type="submit" className="btn-primary btn-block" disabled={submitting}>
          {submitting ? "Sending..." : "Send message"}
        </button>

        {status.type && (
          <p
            className={`form-status ${
              status.type === "success" ? "form-status-success" : "form-status-error"
            }`}
            role="status"
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}
