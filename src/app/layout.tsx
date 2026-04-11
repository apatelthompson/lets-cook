import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "28 Days of AI",
  description:
    "A 28-day SMS program teaching you about artificial intelligence. One message each morning at 10am.",
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
