import "./globals.css";

export const metadata = {
  title: "Flooho",
  description: "Build your business of the future.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
