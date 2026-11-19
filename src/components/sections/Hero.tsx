"use client";

import { motion } from "framer-motion";
import { ArrowDown, Bitcoin, Building2, Coins, ShieldCheck, Clock3 } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassCard } from "@/components/ui/GlassCard";
import type { HomeDict } from "@/i18n/dictionaries";

const cardIcons = [Coins, Clock3, ShieldCheck];

export function Hero({
  t,
  consultationHref,
  servicesHref,
}: {
  t: HomeDict["hero"];
  consultationHref: string;
  servicesHref: string;
}) {
  const credentials = t.credentials;
  const floatingCards = t.cards.map((card, i) => ({ ...card, icon: cardIcons[i] }));
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-void pt-28 sm:pt-32">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-gold-radial" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,243,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,238,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.5]" />

      {/* Ambient gold blobs */}
      <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-gold/10 blur-[110px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 rounded-full border border-graphite-border bg-graphite/60 px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-slow" />
          <span className="eyebrow">{t.eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-8 font-display text-balance text-[2.6rem] leading-[1.08] text-ink sm:text-6xl lg:text-7xl"
        >
          {t.titleLead}{" "}
          <span className="bg-gradient-to-r from-gold-bright via-gold to-gold-deep bg-clip-text text-transparent">
            {t.titleHighlight}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22 }}
          className="mt-7 max-w-2xl font-body text-balance text-lg text-ink-muted sm:text-xl"
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
        >
          {credentials.map((c, i) => (
            <span key={c} className="flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest2 text-gold-bright/90">
                {c}
              </span>
              {i < credentials.length - 1 && (
                <span className="h-3 w-px bg-graphite-border" />
              )}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <ButtonLink href={consultationHref} size="lg">
            {t.ctaPrimary}
          </ButtonLink>
          <ButtonLink href={servicesHref} size="lg" variant="secondary" icon={false}>
            {t.ctaSecondary}
          </ButtonLink>
        </motion.div>

        {/* Bridge signature graphic */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative mt-16 w-full max-w-3xl sm:mt-20"
        >
          <HeroBridgeGraphic />
        </motion.div>
      </div>

      {/* Floating credibility cards */}
      <div className="relative z-10 mx-auto mb-10 grid w-full max-w-6xl grid-cols-1 gap-4 px-6 sm:grid-cols-3 sm:px-10">
        {floatingCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 + i * 0.12 }}
            style={{ animationDelay: `${i * 0.6}s` }}
            className="animate-float"
          >
            <GlassCard className="flex items-center gap-3.5 px-5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                <card.icon className="h-5 w-5 text-gold-bright" />
              </div>
              <div className="text-left">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest2 text-ink-faint">
                  {card.label}
                </p>
                <p className="mt-0.5 font-body text-sm text-ink">
                  {card.value}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex justify-center pb-8">
        <ArrowDown className="h-5 w-5 animate-pulse-slow text-ink-faint" />
      </div>

      <HeroSkyline />
    </section>
  );
}

function HeroBridgeGraphic() {
  return (
    <div className="relative w-full" style={{ aspectRatio: "800 / 200" }}>
      <svg
        viewBox="0 0 800 200"
        fill="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <circle cx="60" cy="150" r="28" className="fill-graphite-light" stroke="#C9A53B" strokeWidth="1" opacity="0.9" />
        <circle cx="740" cy="150" r="28" className="fill-graphite-light" stroke="#C9A53B" strokeWidth="1" opacity="0.9" />

        <path d="M88 150H712" stroke="#26282F" strokeWidth="1.5" />
        <path d="M250 150V40M550 150V40" stroke="#26282F" strokeWidth="1.5" />
        <path
          d="M250 40L88 150M250 40L420 150M250 40L320 150M550 40L712 150M550 40L380 150M550 40L480 150"
          stroke="#C9A53B"
          strokeWidth="0.75"
          opacity="0.45"
        />

        <motion.circle
          r="3.5"
          className="fill-gold-bright"
          initial={{ cx: 92, cy: 150 }}
          animate={{ cx: [92, 708], cy: [150, 150] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div
        className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-light sm:h-11 sm:w-11"
        style={{ left: "7.5%", top: "75%" }}
      >
        <Bitcoin className="h-4 w-4 text-gold-bright sm:h-5 sm:w-5" />
      </div>
      <div
        className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-light sm:h-11 sm:w-11"
        style={{ left: "92.5%", top: "75%" }}
      >
        <Building2 className="h-4 w-4 text-gold-bright sm:h-5 sm:w-5" />
      </div>
    </div>
  );
}

function HeroSkyline() {
  const widths = [22, 34, 18, 46, 26, 60, 30, 40, 24, 52, 20, 36, 28];
  let x = 0;
  const bars = widths.map((w, i) => {
    const h = 30 + ((i * 37) % 90);
    const rect = { x, w, h };
    x += w + 6;
    return rect;
  });
  const totalWidth = x;

  return (
    <div className="relative z-0 h-24 w-full overflow-hidden opacity-80 sm:h-32">
      <svg
        viewBox={`0 0 ${totalWidth} 100`}
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden="true"
      >
        {bars.map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={100 - b.h}
              width={b.w}
              height={b.h}
              className="fill-graphite-light"
            />
            <rect
              x={b.x + b.w * 0.3}
              y={100 - b.h + 8}
              width="2"
              height="2"
              className="fill-gold/70"
            />
            <rect
              x={b.x + b.w * 0.6}
              y={100 - b.h + 18}
              width="2"
              height="2"
              className="fill-gold/50"
            />
          </g>
        ))}
        <rect x="0" y="98" width={totalWidth} height="2" className="fill-gold/20" />
      </svg>
    </div>
  );
}
