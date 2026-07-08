import type { Metadata } from "next";
import { Geist, Fraunces, Amiri } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import PageViewTracker from "@/components/PageViewTracker";
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

// ============================================================
// Google Analytics — ADD YOUR TRACKING ID HERE (via env var)
// ============================================================
// Put your GA4 Measurement ID in .env.local (and in Vercel's
// environment variables when you deploy):
//
//   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
//
// When it's set, the two <Script> tags below load gtag.js and every
// event from src/lib/analytics.ts is forwarded to GA automatically.
// When it's not set, no GA code is shipped at all.
//
// Vercel Analytics needs NO ID — the <Analytics /> component below
// activates by itself once the site is deployed on Vercel and you
// enable Analytics in the project dashboard.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${fraunces.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <PageViewTracker />
        <Analytics />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
