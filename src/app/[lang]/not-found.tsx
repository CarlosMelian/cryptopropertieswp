"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/i18n/config";
import { buttonVariants } from "@/components/ui/buttonVariants";

export default function NotFound() {
  const { lang, common } = useI18n();
  const t = common.notFound;

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-void px-6 pb-24 pt-40">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" aria-hidden />
      <div className="relative max-w-xl text-center">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="mt-6 text-balance font-display text-4xl leading-tight text-ink sm:text-5xl">{t.title}</h1>
        <p className="mt-5 font-body text-base text-ink-muted">{t.text}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={localePath(lang, "/properties")} className={buttonVariants({ size: "lg" })}>
            {t.properties}
            <ArrowUpRight className="h-4 w-4 text-void" aria-hidden />
          </Link>
          <Link href={localePath(lang)} className={buttonVariants({ variant: "secondary", size: "lg" })}>
            {t.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
