import { trustItems, statItems } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function TrustCredibility() {
  return (
    <section id="trust" className="relative bg-void py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <Reveal>
          <SectionEyebrow>Trust &amp; Credibility</SectionEyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-balance text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Why investors trust us with capital that originated on-chain
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <GlassCard className="group h-full px-7 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 transition-colors duration-300 group-hover:bg-gold/16">
                  <item.icon className="h-6 w-6 text-gold-bright" />
                </div>
                <h3 className="mt-6 font-display text-lg text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-20">
          <div className="overflow-hidden rounded-3xl border border-graphite-border bg-graphite/40">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {statItems.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center px-6 py-10 text-center ${
                    i !== 0 ? "border-l border-graphite-border" : ""
                  } ${i === 2 ? "border-t lg:border-t-0 border-graphite-border" : ""} ${
                    i === 3 ? "border-t lg:border-t-0 border-graphite-border" : ""
                  }`}
                >
                  <span className="font-display text-4xl text-gold-bright sm:text-5xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-2 font-body text-sm text-ink-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-widest2 text-ink-faint">
            Illustrative figures
          </p>
        </Reveal>
      </div>
    </section>
  );
}
