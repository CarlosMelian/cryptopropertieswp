"use client";

import { useState } from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import type { PropertyImage } from "@/types";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { format } from "@/i18n/config";
import { PropertyLightbox } from "./PropertyLightbox";

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

const MAX_TILES = 5;

function Tile({
  image,
  index,
  onOpen,
  className,
  priority,
  sizes,
  overlay,
  style,
}: {
  image: PropertyImage;
  index: number;
  onOpen: (i: number) => void;
  className?: string;
  priority?: boolean;
  sizes: string;
  overlay?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { properties } = useI18n();
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={format(properties.gallery.openPhoto, { n: index + 1, alt: image.alt })}
      className={cn("group relative overflow-hidden bg-graphite", className)}
      style={style}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.03]"
      />
      <span className="pointer-events-none absolute inset-0 bg-void/0 transition-colors duration-500 group-hover:bg-void/15" />
      {overlay}
    </button>
  );
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const { properties } = useI18n();
  const [main, ...rest] = images;
  const thumbs = rest.slice(0, MAX_TILES - 1);
  const hidden = images.length - 1 - thumbs.length;

  const allPhotosButton = (
    <button
      type="button"
      onClick={() => setActive(0)}
      className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-void/70 px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold-bright"
    >
      <Images className="h-3.5 w-3.5" aria-hidden />
      {format(properties.gallery.viewAll, { count: images.length })}
    </button>
  );

  return (
    <>
      {/* Mobile: single hero image */}
      <div className="relative overflow-hidden rounded-2xl md:hidden">
        <Tile image={main} index={0} onOpen={setActive} priority sizes="100vw" className="block aspect-[4/3] w-full" />
        {images.length > 1 && allPhotosButton}
      </div>

      {/* Tablet & desktop: mosaic */}
      <div
        className={cn(
          "relative hidden h-[28rem] gap-2 overflow-hidden rounded-3xl md:grid lg:h-[36rem]",
          thumbs.length >= 4 && "grid-cols-4 grid-rows-2",
          thumbs.length > 0 && thumbs.length < 4 && "grid-cols-3",
          thumbs.length === 0 && "grid-cols-1"
        )}
        style={
          thumbs.length > 0 && thumbs.length < 4
            ? { gridTemplateRows: `repeat(${thumbs.length}, minmax(0, 1fr))` }
            : undefined
        }
      >
        <Tile
          image={main}
          index={0}
          onOpen={setActive}
          priority
          sizes="(min-width: 1440px) 45rem, 60vw"
          className={cn(
            thumbs.length >= 4 && "col-span-2 row-span-2",
            thumbs.length > 0 && thumbs.length < 4 && "col-span-2",
          )}
          style={
            thumbs.length > 0 && thumbs.length < 4
              ? { gridRow: `span ${thumbs.length} / span ${thumbs.length}` }
              : undefined
          }
        />
        {thumbs.map((img, i) => {
          const isLast = i === thumbs.length - 1 && hidden > 0;
          return (
            <Tile
              key={img.src}
              image={img}
              index={i + 1}
              onOpen={setActive}
              sizes="(min-width: 1440px) 22rem, 30vw"
              overlay={
                isLast ? (
                  <span className="absolute inset-0 flex items-center justify-center bg-void/55 font-display text-2xl text-ink backdrop-blur-[2px]">
                    +{hidden}
                  </span>
                ) : undefined
              }
            />
          );
        })}
        {images.length > 1 && allPhotosButton}
      </div>

      <PropertyLightbox
        images={images}
        title={title}
        index={active}
        onIndexChange={setActive}
        onClose={() => setActive(null)}
      />
    </>
  );
}
