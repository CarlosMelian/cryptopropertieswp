import { ArrowRight } from "lucide-react";
import { serviceIcons } from "@/lib/data";
import type { CommonDict, HomeDict } from "@/i18n/dictionaries";
import { format } from "@/i18n/config";
import { contactLink } from "@/lib/site";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

export function Services({ t, wa }: { t: HomeDict["services"]; wa: CommonDict["whatsapp"] }) {
  const serviceItems = t.items.map((item, i) => ({ ...item, icon: serviceIcons[i] }));
  const [featured, ...rest] = serviceItems;

  return (
    <section id="services" className="relative bg-void py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow align="center">{t.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 font-display text-balance text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <GlassCard gold className="flex flex-col gap-8 px-8 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="font-mono text-[0.65rem] uppercase tracking-widest2 text-gold-bright">
                {featured.tag}
              </span>
              <h3 className="mt-3 font-display text-2xl text-ink sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-4 font-body text-[0.95rem] leading-relaxed text-ink-muted">
                {featured.description}
              </p>
            </div>
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gold/10 sm:h-28 sm:w-28">
              <featured.icon className="h-10 w-10 text-gold-bright sm:h-12 sm:w-12" />
            </div>
          </GlassCard>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <a
                href={contactLink(format(wa.service, { service: service.title }))}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-2xl"
              >
              <GlassCard className="group flex h-full flex-col px-7 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 transition-colors duration-300 group-hover:bg-gold/16">
                    <service.icon className="h-6 w-6 text-gold-bright" />
                  </div>
                  <span className="font-mono text-[0.6rem] uppercase tracking-widest2 text-ink-faint">
                    {service.tag}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ink-muted">
                  {service.description}
                </p>
                <span className="mt-5 flex items-center gap-1.5 font-body text-sm text-gold-bright transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                  {t.learnMore}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </GlassCard>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
