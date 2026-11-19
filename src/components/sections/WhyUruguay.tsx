import { advantageIcons } from "@/lib/data";
import type { HomeDict } from "@/i18n/dictionaries";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function WhyUruguay({ t }: { t: HomeDict["whyUruguay"] }) {
  const advantageItems = t.items.map((item, i) => ({ ...item, icon: advantageIcons[i] }));
  return (
    <section id="why-uruguay" className="relative bg-graphite/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <Reveal>
          <SectionEyebrow>{t.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-balance text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <Reveal delay={0.1}>
            <LocatorGraphic />
          </Reveal>

          <Reveal delay={0.18}>
            <div className="divide-y divide-graphite-border border-t border-graphite-border">
              {advantageItems.map((item) => (
                <div
                  key={item.title}
                  className="group flex gap-5 py-6 transition-colors duration-300 sm:gap-7"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-graphite-border transition-colors duration-300 group-hover:border-gold/40">
                    <item.icon className="h-5 w-5 text-gold-bright" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-ink sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LocatorGraphic() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        {[60, 110, 160].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="220"
            r={r}
            fill="none"
            stroke="#26282F"
            strokeWidth="1"
          />
        ))}
        <line x1="200" y1="40" x2="200" y2="400" stroke="#1C1E24" strokeWidth="1" />
        <line x1="20" y1="220" x2="380" y2="220" stroke="#1C1E24" strokeWidth="1" />

        {/* Buenos Aires node */}
        <line x1="200" y1="220" x2="120" y2="150" stroke="#C9A53B" strokeWidth="0.75" opacity="0.5" strokeDasharray="3 3" />
        <circle cx="120" cy="150" r="3" className="fill-ink-muted" />

        {/* São Paulo node */}
        <line x1="200" y1="220" x2="285" y2="115" stroke="#C9A53B" strokeWidth="0.75" opacity="0.5" strokeDasharray="3 3" />
        <circle cx="285" cy="115" r="3" className="fill-ink-muted" />

        {/* Montevideo center */}
        <circle cx="200" cy="220" r="7" className="fill-gold" />
        <circle cx="200" cy="220" r="14" fill="none" stroke="#C9A53B" strokeWidth="1" opacity="0.5">
          <animate attributeName="r" values="10;26;10" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="3.2s" repeatCount="indefinite" />
        </circle>
      </svg>

      <span className="absolute left-[71.25%] top-[28.75%] -translate-x-1/2 -translate-y-full whitespace-nowrap font-mono text-[0.65rem] text-ink-faint">
        São Paulo · 2h45
      </span>
      <span className="absolute left-[30%] top-[37.5%] -translate-x-1/2 -translate-y-full whitespace-nowrap font-mono text-[0.65rem] text-ink-faint">
        Buenos Aires · 1h10
      </span>
      <span className="absolute left-1/2 top-[55%] -translate-x-1/2 text-center">
        <span className="block font-display text-lg text-gold-bright">
          Montevideo
        </span>
        <span className="mt-0.5 block font-mono text-[0.6rem] text-ink-faint">
          34.9°S, 56.2°W
        </span>
      </span>
    </div>
  );
}
