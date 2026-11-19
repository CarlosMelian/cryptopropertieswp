import { ArrowRight } from "lucide-react";
import type { HomeDict } from "@/i18n/dictionaries";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Education({ t }: { t: HomeDict["insights"] }) {
  const articles = t.items;
  return (
    <section id="insights" className="relative bg-graphite/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionEyebrow>{t.eyebrow}</SectionEyebrow>
            <h2 className="mt-5 max-w-xl font-display text-balance text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              {t.title}
            </h2>
          </div>
          <Button variant="secondary" size="md" className="shrink-0">
            {t.viewAll}
          </Button>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {articles.map((article, i) => (
            <Reveal key={article.title} delay={i * 0.07}>
              <GlassCard className="group flex h-full flex-col px-7 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
                <span className="font-mono text-[0.65rem] uppercase tracking-widest2 text-gold-bright">
                  {article.category}
                </span>
                <h3 className="mt-4 font-display text-xl leading-snug text-ink">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ink-muted">
                  {article.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-graphite-border pt-5">
                  <span className="font-body text-xs text-ink-faint">
                    {article.readTime}
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-sm text-gold-bright">
                    {t.readArticle}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
