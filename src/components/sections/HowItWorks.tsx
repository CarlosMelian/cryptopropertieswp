import type { HomeDict } from "@/i18n/dictionaries";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { BridgeLine } from "@/components/ui/BridgeLine";

export function HowItWorks({ t }: { t: HomeDict["process"] }) {
  const processSteps = t.steps.map((step, i) => ({ ...step, index: String(i + 1).padStart(2, "0") }));
  return (
    <section id="process" className="relative bg-void py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow align="center">{t.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 font-display text-balance text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
        </Reveal>

        {/* Desktop: horizontal bridge timeline */}
        <div className="relative mt-20 hidden lg:block">
          <div className="absolute left-[12.5%] right-[12.5%] top-[34px]">
            <BridgeLine />
          </div>
          <div className="grid grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <Reveal key={step.index} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-full bg-void ring-1 ring-graphite-border">
                    <span className="font-mono text-lg text-gold-bright">
                      {step.index}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-xs font-body text-sm leading-relaxed text-ink-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="relative mt-16 lg:hidden">
          <div className="absolute left-[34px] top-2 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gold/60 via-graphite-border to-transparent" />
          <div className="space-y-10">
            {processSteps.map((step, i) => (
              <Reveal key={step.index} delay={i * 0.08}>
                <div className="flex gap-6">
                  <div className="relative z-10 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full bg-void ring-1 ring-graphite-border">
                    <span className="font-mono text-lg text-gold-bright">
                      {step.index}
                    </span>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-display text-lg text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
