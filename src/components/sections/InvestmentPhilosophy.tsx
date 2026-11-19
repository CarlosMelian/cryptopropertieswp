import { philosophyIcons } from "@/lib/data";
import type { HomeDict } from "@/i18n/dictionaries";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function InvestmentPhilosophy({ t }: { t: HomeDict["philosophy"] }) {
  const philosophyItems = t.items.map((item, i) => ({ ...item, icon: philosophyIcons[i] }));
  return (
    <section className="relative bg-graphite/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionEyebrow align="center">{t.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 font-display text-balance text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mt-5 font-body text-balance text-[0.95rem] leading-relaxed text-ink-muted">
            {t.intro}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-graphite-border">
          {philosophyItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="flex flex-col items-start lg:px-6 lg:first:pl-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-graphite-border">
                  <item.icon className="h-5 w-5 text-gold-bright" />
                </div>
                <h3 className="mt-5 font-display text-base text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 font-body text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-2xl text-center font-mono text-[0.7rem] leading-relaxed text-ink-faint">
          {t.disclaimer}
        </p>
      </div>
    </section>
  );
}
