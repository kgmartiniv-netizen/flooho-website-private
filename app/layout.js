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
      {/* strategy="beforeInteractive" is what actually gets this hoisted
          into <head> ahead of everything else and downloaded before page
          hydration — matching GTM's own "as high in <head> as possible"
          instruction. Placement in the JSX tree doesn't matter for this
          strategy; Next.js always injects it into the initial HTML head. */}
      <Script id="gtm-script" strategy="beforeInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <body>
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
