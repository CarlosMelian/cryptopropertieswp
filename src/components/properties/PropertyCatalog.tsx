"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import type { PriceSort, Property, PropertyFilters, PropertyType } from "@/types";
import {
  defaultFilters,
  filterProperties,
  getAvailableTypes,
  propertyTypeLabels,
} from "@/lib/properties";
import { PropertyCard } from "./PropertyCard";
import { PropertyFiltersBar } from "./PropertyFiltersBar";

/* ---------------------------- URL <-> filters ----------------------------- */

const sortValues: PriceSort[] = ["featured", "price-asc", "price-desc"];

function parsePrice(v: string | null) {
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function filtersFromParams(params: URLSearchParams): PropertyFilters {
  const type = params.get("type");
  const sort = params.get("sort");
  return {
    query: params.get("q") ?? "",
    type: type && type in propertyTypeLabels ? (type as PropertyType) : "all",
    minPrice: parsePrice(params.get("min")),
    maxPrice: parsePrice(params.get("max")),
    sort: sort && sortValues.includes(sort as PriceSort) ? (sort as PriceSort) : "featured",
  };
}

function filtersToQuery(f: PropertyFilters) {
  const params = new URLSearchParams();
  if (f.query.trim()) params.set("q", f.query.trim());
  if (f.type !== "all") params.set("type", f.type);
  if (f.minPrice !== null) params.set("min", String(f.minPrice));
  if (f.maxPrice !== null) params.set("max", String(f.maxPrice));
  if (f.sort !== "featured") params.set("sort", f.sort);
  const qs = params.toString();
  return qs ? `?${qs}` : window.location.pathname;
}

function isDefault(f: PropertyFilters) {
  return (
    !f.query.trim() &&
    f.type === defaultFilters.type &&
    f.minPrice === null &&
    f.maxPrice === null &&
    f.sort === defaultFilters.sort
  );
}

/* -------------------------------- Catalog -------------------------------- */

interface PropertyCatalogProps {
  properties: Property[];
  initialFilters?: PropertyFilters;
}

export function PropertyCatalog({ properties, initialFilters = defaultFilters }: PropertyCatalogProps) {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const types = useMemo(() => getAvailableTypes(properties), [properties]);
  const results = useMemo(() => filterProperties(properties, filters), [properties, filters]);

  const update = useCallback((next: PropertyFilters) => {
    setFilters(next);
    // Keep the URL shareable without triggering a navigation.
    window.history.replaceState(null, "", filtersToQuery(next));
  }, []);

  const dirty = !isDefault(filters);

  return (
    <div>
      <PropertyFiltersBar
        filters={filters}
        types={types}
        isDirty={dirty}
        onChange={(patch) => update({ ...filters, ...patch })}
        onReset={() => update(defaultFilters)}
      />

      <div className="mt-10 flex items-baseline justify-between gap-4 border-b border-graphite-border pb-5">
        <p className="font-body text-sm text-ink-muted" aria-live="polite">
          <span className="font-display text-lg text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "property" : "properties"}
          {dirty ? " match your criteria" : " in our portfolio"}
        </p>
        <span className="hidden font-mono text-[0.625rem] uppercase tracking-widest2 text-ink-faint sm:block">
          Prices in USD
        </span>
      </div>

      {results.length > 0 ? (
        <motion.ul layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((property, i) => (
              <motion.li
                key={property.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <PropertyCard property={property} priority={i < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-graphite-border px-6 py-20 text-center">
          <SearchX className="h-8 w-8 text-gold/70" aria-hidden />
          <h3 className="mt-5 font-display text-2xl text-ink">No properties match these filters</h3>
          <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-ink-muted">
            Try widening your price range or searching a different area. Our team also has access to
            off-market opportunities not listed here.
          </p>
          <button
            type="button"
            onClick={() => update(defaultFilters)}
            className="mt-7 rounded-full border border-gold/40 px-6 py-2.5 font-body text-sm text-gold-bright transition-colors hover:bg-gold/10"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

/** Reads the initial filters from the URL (?q=&type=&min=&max=&sort=). */
export function PropertyCatalogFromUrl({ properties }: { properties: Property[] }) {
  const searchParams = useSearchParams();
  const initialFilters = useMemo(
    () => filtersFromParams(new URLSearchParams(searchParams.toString())),
    // Only on mount: afterwards the catalog owns the state and writes back to the URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return <PropertyCatalog properties={properties} initialFilters={initialFilters} />;
}
