"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PropertyImage } from "@/types";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { cn } from "@/lib/utils";

interface PropertyLightboxProps {
  images: PropertyImage[];
  title: string;
  /** Index to show, or null when closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function PropertyLightbox({ images, title, index, onIndexChange, onClose }: PropertyLightboxProps) {
  const open = index !== null;
  const [direction, setDirection] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  useModalBehavior(open, onClose);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDirection(delta);
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  // Keep the active thumbnail in view.
  useEffect(() => {
    if (index === null) return;
    const el = thumbsRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title}: photo gallery`}
          className="fixed inset-0 z-[100] flex flex-col bg-void/[0.97] backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-5">
            <div className="min-w-0">
              <p className="font-mono text-xs tracking-widest2 text-gold">
                {pad(index + 1)} <span className="text-ink-faint">/ {pad(count)}</span>
              </p>
              <p className="mt-1 truncate font-display text-sm text-ink-muted sm:text-base">{title}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-ink transition-colors hover:border-gold/40 hover:text-gold-bright"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Stage */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={onDragEnd}
                className="absolute inset-0 mx-2 cursor-grab active:cursor-grabbing sm:mx-24"
              >
                <Image
                  src={images[index].src}
                  alt={images[index].alt}
                  fill
                  priority
                  sizes="100vw"
                  draggable={false}
                  className="select-none object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Preload neighbours for instant navigation */}
            {count > 1 && (
              <div className="hidden" aria-hidden>
                {[1, -1].map((d) => {
                  const img = images[(index + d + count) % count];
                  return <Image key={d} src={img.src} alt="" width={1920} height={1280} sizes="100vw" loading="eager" />;
                })}
              </div>
            )}

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-void/50 text-ink backdrop-blur-md transition-colors hover:border-gold/40 hover:text-gold-bright sm:flex lg:left-8"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-void/50 text-ink backdrop-blur-md transition-colors hover:border-gold/40 hover:text-gold-bright sm:flex lg:right-8"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Caption + thumbnails */}
          <div className="px-4 pb-5 pt-4 sm:px-8">
            <p className="mb-4 text-center font-body text-sm text-ink-muted">{images[index].alt}</p>
            {count > 1 && (
              <div
                ref={thumbsRef}
                className="mx-auto flex max-w-4xl gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    data-index={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      onIndexChange(i);
                    }}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === index}
                    className={cn(
                      "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 sm:h-16 sm:w-24",
                      i === index ? "border-gold opacity-100" : "border-transparent opacity-45 hover:opacity-80"
                    )}
                  >
                    <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
