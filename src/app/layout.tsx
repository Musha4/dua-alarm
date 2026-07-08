import type { Metadata } from "next";
import { Geist, Fraunces, Amiri } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Dua Alarm — Wake up with remembrance",
  description:
    "An Islamic habit alarm that helps you start and end your day with dua. Recite your morning or bedtime dua to complete the alarm and build a lasting habit.",
  openGraph: {
    title: "Dua Alarm — Wake up with remembrance",
    description:
      "An Islamic habit alarm that helps you start and end your day with dua.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
