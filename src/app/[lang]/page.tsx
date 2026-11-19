import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { TrustCredibility } from "@/components/sections/TrustCredibility";
import { Services } from "@/components/sections/Services";
import { WhyUruguay } from "@/components/sections/WhyUruguay";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { InvestmentPhilosophy } from "@/components/sections/InvestmentPhilosophy";
import { Testimonials } from "@/components/sections/Testimonials";
import { Education } from "@/components/sections/Education";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, languageAlternates } from "@/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return { alternates: { canonical: `/${lang}`, languages: languageAlternates() } };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { home } = getDictionary(lang);

  return (
    <>
      <Hero t={home.hero} />
      <TrustCredibility t={home.trust} />
      <Services t={home.services} />
      <WhyUruguay t={home.whyUruguay} />
      <HowItWorks t={home.process} />
      <InvestmentPhilosophy t={home.philosophy} />
      <Testimonials t={home.testimonials} />
      <Education t={home.insights} />
      <FinalCTA t={home.finalCta} />
    </>
  );
}
