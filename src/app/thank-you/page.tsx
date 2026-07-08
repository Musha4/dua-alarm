import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThankYouSurvey from "@/components/ThankYouSurvey";

export const metadata: Metadata = {
  title: "You're in! — Dua Alarm",
  description: "Three quick questions to help us build Dua Alarm right.",
  robots: { index: false }, // post-signup page, no need for search engines
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <ThankYouSurvey />
      </main>
      <Footer />
    </>
  );
}
