import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section className="relative bg-void py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow align="center">Client Perspectives</SectionEyebrow>
          <h2 className="mt-5 font-display text-balance text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Trusted across four continents
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <GlassCard className="flex h-full flex-col px-8 py-9">
                <Quote className="h-7 w-7 text-gold/50" />
                <p className="mt-5 flex-1 font-display text-[1.15rem] leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-7 flex items-center gap-3 border-t border-graphite-border pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 font-mono text-sm text-gold-bright">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-body text-sm text-ink">{t.name}</p>
                    <p className="font-body text-xs text-ink-faint">
                      {t.role} · {t.location}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
