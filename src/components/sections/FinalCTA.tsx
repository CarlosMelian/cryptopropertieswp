import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BridgeMark } from "@/components/ui/BridgeMark";
import type { HomeDict } from "@/i18n/dictionaries";

export function FinalCTA({ t }: { t: HomeDict["finalCta"] }) {
  return (
    <section className="relative overflow-hidden bg-void py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-gold-radial opacity-80" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <BridgeMark className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.04]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-balance text-3xl leading-[1.15] text-ink sm:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-balance text-lg text-ink-muted">
            {t.text}
          </p>
          <div className="mt-10 flex justify-center">
            <Button size="lg">{t.cta}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
