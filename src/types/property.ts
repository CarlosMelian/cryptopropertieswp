export type PropertyType =
  | "apartment"
  | "house"
  | "land"
  | "farm"
  | "commercial";

export type PropertyStatus = "available" | "under-offer" | "sold";

export interface PropertyLocation {
  neighborhood: string;
  city: string;
  /** Uruguayan department (e.g. Maldonado, Montevideo). Optional. */
  department?: string;
  country: string;
}

export interface PropertyImage {
  src: string;
  alt: string;
}

/**
 * A single listing. Optional fields are only rendered when present, so
 * never fill them with guesses: leave them out if the information is unknown.
 */
export interface Property {
  id: string;
  /** URL segment: /properties/[slug]. Must be unique. */
  slug: string;
  title: string;
  location: PropertyLocation;
  /** Asking price in USD. */
  price: number;
  mainImage: PropertyImage;
  /** Additional photographs, shown after the main image. */
  gallery: PropertyImage[];
  shortDescription: string;
  /** One string per paragraph. */
  fullDescription: string[];
  type: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  /** Built area in m². */
  builtArea?: number;
  /** Land / lot area in m². */
  landArea?: number;
  amenities: string[];
  status: PropertyStatus;
}

export type PriceSort = "featured" | "price-asc" | "price-desc";

export interface PropertyFilters {
  query: string;
  type: PropertyType | "all";
  minPrice: number | null;
  maxPrice: number | null;
  sort: PriceSort;
}

export type InquiryIntent = "information" | "crypto";

export type ContactMethod = "email" | "phone" | "whatsapp";
