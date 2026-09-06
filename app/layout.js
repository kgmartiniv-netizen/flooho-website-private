import { Archivo } from "next/font/google";
import Script from "next/script";
import Footer from "../components/Footer";
import "./globals.css";

const GTM_ID = "GTM-KF92ZZHN";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
});

export const metadata = {
  metadataBase: new URL("https://www.flooho.io"),
  title: "Flooho",
  description: "Build your business of the future.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        {/* strategy="afterInteractive" — Next's documented choice for
            analytics/tag-manager scripts (beforeInteractive is reserved for
            things that must block hydration, like consent gates, and in
            App Router it renders this as an invalid child of <html>,
            triggering a real hydration-mismatch warning). GTM's snippet is
            inherently async and doesn't need pre-hydration execution to
            work; this still loads it immediately after hydration, which is
            as early as is practical in a React app. */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* Immediately after the opening body tag, per GTM's install snippet. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Footer />
      </body>
    </html>
  );
}
