import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import PricingPoll from "@/components/PricingPoll";
import WaitlistForm from "@/components/WaitlistForm";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <PricingPoll />
        <WaitlistForm />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
