"use client";

import { ChevronDown, Search, X } from "lucide-react";
import type { PriceSort, PropertyFilters, PropertyType } from "@/types";
import { formatCompactPrice, priceSteps } from "@/lib/properties";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

interface PropertyFiltersBarProps {
  filters: PropertyFilters;
  types: PropertyType[];
  onChange: (patch: Partial<PropertyFilters>) => void;
  onReset: () => void;
  isDirty: boolean;
}

const fieldLabel = "mb-2 block font-mono text-[0.625rem] uppercase tracking-widest2 text-ink-faint";
const control =
  "h-12 w-full rounded-xl border border-graphite-border bg-void/60 font-body text-sm text-ink transition-colors placeholder:text-ink-faint hover:border-white/15 focus:border-gold/50 focus:outline-none focus-visible:outline-none";

function Select({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(control, "cursor-pointer appearance-none pl-4 pr-10 [&>option]:bg-graphite")}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" aria-hidden />
    </div>
  );
}

export function PropertyFiltersBar({ filters, types, onChange, onReset, isDirty }: PropertyFiltersBarProps) {
  const toNumber = (v: string) => (v === "" ? null : Number(v));
  const { lang, properties } = useI18n();
  const t = properties.filters;
  const sortOptions: { value: PriceSort; label: string }[] = [
    { value: "featured", label: t.sortFeatured },
    { value: "price-asc", label: t.sortPriceAsc },
    { value: "price-desc", label: t.sortPriceDesc },
  ];

  return (
    <form
      role="search"
      aria-label={t.ariaLabel}
      onSubmit={(e) => e.preventDefault()}
      className="glass-panel rounded-2xl p-4 shadow-glass sm:p-5"
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[minmax(0,2.2fr)_repeat(4,minmax(0,1fr))]">
        <div className="col-span-2 lg:col-span-1">
          <label htmlFor="filter-query" className={fieldLabel}>
            {t.search}
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" aria-hidden />
            <input
              id="filter-query"
              type="search"
              value={filters.query}
              onChange={(e) => onChange({ query: e.target.value })}
              placeholder={t.searchPlaceholder}
              autoComplete="off"
              className={cn(control, "pl-11 pr-4 [&::-webkit-search-cancel-button]:hidden")}
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => onChange({ query: "" })}
                aria-label={t.clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-faint transition-colors hover:text-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="filter-type" className={fieldLabel}>
            {t.type}
          </label>
          <Select
            id="filter-type"
            value={filters.type}
            onChange={(v) => onChange({ type: v as PropertyFilters["type"] })}
          >
            <option value="all">{t.allTypes}</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {properties.types[type]}
              </option>
            ))}
          </Select>
        </div>

        <div className="lg:order-last">
          <label htmlFor="filter-sort" className={fieldLabel}>
            {t.sortBy}
          </label>
          <Select id="filter-sort" value={filters.sort} onChange={(v) => onChange({ sort: v as PriceSort })}>
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="filter-min" className={fieldLabel}>
            {t.minPrice}
          </label>
          <Select id="filter-min" value={filters.minPrice?.toString() ?? ""} onChange={(v) => onChange({ minPrice: toNumber(v) })}>
            <option value="">{t.noMin}</option>
            {priceSteps.map((p) => (
              <option key={p} value={p} disabled={filters.maxPrice !== null && p > filters.maxPrice}>
                {formatCompactPrice(p, lang)}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="filter-max" className={fieldLabel}>
            {t.maxPrice}
          </label>
          <Select id="filter-max" value={filters.maxPrice?.toString() ?? ""} onChange={(v) => onChange({ maxPrice: toNumber(v) })}>
            <option value="">{t.noMax}</option>
            {priceSteps.map((p) => (
              <option key={p} value={p} disabled={filters.minPrice !== null && p < filters.minPrice}>
                {formatCompactPrice(p, lang)}
              </option>
            ))}
          </Select>
        </div>

      </div>

      {isDirty && (
        <div className="mt-4 flex justify-end border-t border-graphite-border pt-4">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-gold-bright"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            {t.clearAll}
          </button>
        </div>
      )}
    </form>
  );
}
