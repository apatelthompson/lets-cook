import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Let's Cook — 28 day program",
  description: "One message a day for 28 days, delivered to iMessage at 10am.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
