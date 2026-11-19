import { trustIcons, statValues } from "@/lib/data";
import type { HomeDict } from "@/i18n/dictionaries";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ArrowUpRight } from "lucide-react";

export function TrustCredibility({ t, parentUrl }: { t: HomeDict["trust"]; parentUrl: string }) {
  const trustItems = t.items.map((item, i) => ({ ...item, icon: trustIcons[i] }));
  const statItems = statValues.map((s, i) => ({ ...s, label: t.stats[i] }));
  return (
    <section id="trust" className="relative bg-void py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <Reveal>
          <SectionEyebrow>{t.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-balance text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            {t.title}
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
            {t.illustrative}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-col gap-6 rounded-3xl border border-gold/20 bg-gold/[0.04] px-7 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <div className="max-w-3xl">
              <p className="eyebrow">{t.parent.eyebrow}</p>
              <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-ink-muted">{t.parent.text}</p>
            </div>
            <a
              href={parentUrl}
              target="_blank"
              rel="noopener"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-gold/40 px-5 py-2.5 font-body text-sm text-gold-bright transition-colors hover:bg-gold/10 sm:self-auto"
            >
              {t.parent.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
