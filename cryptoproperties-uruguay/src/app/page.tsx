import { Hero } from "@/components/sections/Hero";
import { TrustCredibility } from "@/components/sections/TrustCredibility";
import { Services } from "@/components/sections/Services";
import { WhyUruguay } from "@/components/sections/WhyUruguay";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { InvestmentPhilosophy } from "@/components/sections/InvestmentPhilosophy";
import { Testimonials } from "@/components/sections/Testimonials";
import { Education } from "@/components/sections/Education";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustCredibility />
      <Services />
      <WhyUruguay />
      <HowItWorks />
      <InvestmentPhilosophy />
      <Testimonials />
      <Education />
      <FinalCTA />
    </>
  );
}
