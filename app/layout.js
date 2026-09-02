import { Archivo } from "next/font/google";
import Footer from "../components/Footer";
import "./globals.css";

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
        {children}
        <Footer />
      </body>
    </html>
  );
}
