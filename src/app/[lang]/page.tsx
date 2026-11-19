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
import { isLocale } from "@/i18n/config";
import { contactLink, parentCompany } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return pageMetadata({ lang, path: "", title: meta.homeTitle, description: meta.homeDescription, absoluteTitle: true });
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { home, common } = getDictionary(lang);
  const wa = common.whatsapp;
  const consultationHref = contactLink(wa.consultation);

  return (
    <>
      <Hero t={home.hero} consultationHref={consultationHref} servicesHref={contactLink(wa.services)} />
      <TrustCredibility t={home.trust} parentUrl={parentCompany.url} />
      <Services t={home.services} wa={wa} />
      <WhyUruguay t={home.whyUruguay} />
      <HowItWorks t={home.process} />
      <InvestmentPhilosophy t={home.philosophy} />
      <Testimonials t={home.testimonials} />
      <Education t={home.insights} wa={wa} />
      <FinalCTA t={home.finalCta} consultationHref={consultationHref} />
    </>
  );
}
