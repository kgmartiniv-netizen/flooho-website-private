"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Google Calendar Appointment Scheduling — "Button with Popup".
// Real schedule URL from Calendar > appointment schedule > Share > "Button
// with Popup" (KAN-38). Google's own docs snippet renders its button using
// document.currentScript as the target, which only works because the
// snippet is a literal inline <script> sitting exactly where the button
// should appear. That doesn't translate cleanly into React — instead we
// give Google's loader a real ref'd DOM node as `target`, which its API
// accepts equally well, and click that (Google-rendered, visually hidden)
// button programmatically from our own styled button.
const SCHEDULE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zhMqssAJL5vJ76f1HfxMJb4-7op3BDtQnG1VW26Hr1NUiMX3lZwnDG7Zhkh8NZ0vocmglRtVN?gv=true";

export default function BookingButton({ label = "Book a time", className }) {
  const wrapperRef = useRef(null);
  const targetRef = useRef(null);
  const loadedRef = useRef(false);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!scriptReady || loadedRef.current) return;
    if (!targetRef.current || !window.calendar?.schedulingButton) return;

    window.calendar.schedulingButton.load({
      url: SCHEDULE_URL,
      color: "#039BE5", // irrelevant to us — Google's own button stays hidden
      label: "Book an appointment",
      target: targetRef.current,
    });
    loadedRef.current = true;
  }, [scriptReady]);

  function handleClick() {
    // Search the whole wrapper, not just targetRef itself — Google's loader
    // may insert the button as a sibling of the target node rather than a
    // child of it, and this covers both without guessing which.
    const googleButton = wrapperRef.current?.querySelector("button, a[role='button']");
    if (googleButton) {
      googleButton.click();
      return;
    }
    // Fallback per KAN-38: if Google's widget never rendered (script
    // failure, ad blocker, etc.), open the schedule directly instead of
    // leaving the button dead.
    window.open(SCHEDULE_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://calendar.google.com/calendar/scheduling-button-script.css"
      />
      <Script
        src="https://calendar.google.com/calendar/scheduling-button-script.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      {/* Not display:none — some Google widgets refuse to render into a
          display:none container. Kept out of the layout and out of the
          tab order instead. */}
      <div
        ref={wrapperRef}
        aria-hidden="true"
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", top: 0, left: 0 }}
      >
        <div ref={targetRef} />
      </div>
      <button type="button" className={className} onClick={handleClick}>
        {label}
      </button>
    </>
  );
}
