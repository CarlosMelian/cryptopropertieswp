import { philosophyItems } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function InvestmentPhilosophy() {
  return (
    <section className="relative bg-graphite/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionEyebrow align="center">Investment Philosophy</SectionEyebrow>
          <h2 className="mt-5 font-display text-balance text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Beyond Real Estate. Building Long-Term Wealth.
          </h2>
          <p className="mt-5 font-body text-balance text-[0.95rem] leading-relaxed text-ink-muted">
            We see real estate as one piece of a broader approach to wealth
            that began on-chain. Every recommendation is grounded in
            preservation and structure, not speculation.
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
          This section describes our investment approach, not a forecast or
          guarantee of performance. CryptoProperties Uruguay does not provide
          investment, legal, or tax advice.
        </p>
      </div>
    </section>
  );
}
