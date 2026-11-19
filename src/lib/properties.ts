import type {
  Property,
  PropertyFilters,
  PropertyImage,
  PropertyStatus,
  PropertyType,
} from "@/types";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/** Royalty-free placeholder photography (Unsplash License). */
function unsplash(id: string, alt: string): PropertyImage {
  return {
    src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`,
    alt,
  };
}

export const propertyTypeLabels: Record<PropertyType, string> = {
  apartment: "Apartment",
  house: "House",
  land: "Land",
  farm: "Farm & Chacra",
  commercial: "Commercial",
};

export const propertyStatusLabels: Record<PropertyStatus, string> = {
  available: "Available",
  "under-offer": "Under Offer",
  sold: "Sold",
};

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
  return usd.format(value);
}

export function formatCompactPrice(value: number) {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `$${Number.isInteger(m) ? m : m.toFixed(1)}M`;
  }
  return `$${Math.round(value / 1_000)}K`;
}

export function formatArea(m2: number) {
  const base = `${m2.toLocaleString("en-US")} m²`;
  return m2 >= 10_000 ? `${base} (${(m2 / 10_000).toLocaleString("en-US", { maximumFractionDigits: 1 })} ha)` : base;
}

export function formatLocation(
  location: Property["location"],
  variant: "short" | "full" = "short"
) {
  const parts =
    variant === "full"
      ? [location.neighborhood, location.city, location.department, location.country]
      : [location.neighborhood, location.city, location.country];
  // Drop empties and consecutive duplicates (e.g. "Montevideo, Montevideo").
  return parts
    .filter((p): p is string => Boolean(p))
    .filter((p, i, arr) => p !== arr[i - 1])
    .join(", ");
}

/* -------------------------------------------------------------------------- */
/*  Listings                                                                  */
/*  To add, edit or remove a property, change this array only.                */
/*  Leave optional specs out when unknown; the UI hides missing fields.       */
/* -------------------------------------------------------------------------- */

const properties: Property[] = [
  {
    id: "cpu-001",
    slug: "contemporary-villa-la-barra",
    title: "Contemporary Villa with Pool in La Barra",
    location: {
      neighborhood: "La Barra",
      city: "Punta del Este",
      department: "Maldonado",
      country: "Uruguay",
    },
    price: 2_450_000,
    mainImage: unsplash("1613490493576-7fde63acd811", "Modern white villa with a long reflecting pool at dusk"),
    gallery: [
      unsplash("1613977257363-707ba9348227", "Villa façade and pool terrace in afternoon light"),
      unsplash("1600210491892-03d54c0aaf87", "Double-height living room with arched windows"),
      unsplash("1617806118233-18e1de247200", "Dining room with round table and garden views"),
      unsplash("1600607687644-c7171b42498f", "Primary bedroom opening onto a private terrace"),
      unsplash("1600566752355-35792bedcfea", "Primary bathroom with freestanding tub"),
    ],
    shortDescription:
      "A light-filled modern villa minutes from the beaches of La Barra, designed around a long pool and generous indoor–outdoor living.",
    fullDescription: [
      "Set on a quiet, landscaped lot a short drive from the beaches and restaurants of La Barra, this contemporary villa was designed for long summers and easy entertaining. Clean white volumes frame a long swimming pool that anchors the property and draws the eye toward the garden.",
      "The ground floor flows from a double-height living room into a formal dining area and an open kitchen, all opening through full-height glazing onto covered terraces. Upstairs, the primary suite enjoys a private terrace, a walk-in dressing room and a spa-style bathroom.",
      "The home is delivered fully finished and ready to occupy, with an outdoor kitchen and parrilla, integrated home automation and a two-car garage.",
    ],
    type: "house",
    bedrooms: 5,
    bathrooms: 5,
    builtArea: 520,
    landArea: 1_600,
    amenities: [
      "Heated swimming pool",
      "Outdoor kitchen & parrilla",
      "Home automation",
      "Two-car garage",
      "Walk-in dressing room",
      "Landscaped garden",
      "Covered terraces",
      "Minutes from the beach",
    ],
    status: "available",
  },
  {
    id: "cpu-002",
    slug: "ocean-view-residence-jose-ignacio",
    title: "Ocean-View Residence in José Ignacio",
    location: {
      neighborhood: "José Ignacio",
      city: "José Ignacio",
      department: "Maldonado",
      country: "Uruguay",
    },
    price: 3_850_000,
    mainImage: unsplash("1580587771525-78b9dba3b914", "Two-storey modern residence with infinity pool and open views"),
    gallery: [
      unsplash("1600596542815-ffad4c1539a9", "Pool deck with sun loungers and white façade"),
      unsplash("1600566753086-00f18fb6b3ea", "Living room with floating staircase and linen sofas"),
      unsplash("1600607687939-ce8a6c25118c", "Open-plan lounge and kitchen with timber feature wall"),
      unsplash("1595526114035-0d45ed16cfbf", "Bright guest bedroom with natural textures"),
      unsplash("1507525428034-b723cf961d3e", "Atlantic beach at sunrise near José Ignacio"),
    ],
    shortDescription:
      "An architect-designed residence with an infinity pool and wide Atlantic horizons in Uruguay's most coveted coastal village.",
    fullDescription: [
      "José Ignacio has evolved from a fishing village into one of South America's most discreet and sought-after coastal destinations. This residence sits on an elevated lot that captures wide views toward the Atlantic while preserving privacy from the street.",
      "Interiors are calm and natural: pale oak, linen and lime-washed walls, organized around a central open-plan living space that opens fully to the pool deck. A floating staircase leads to four bedroom suites, each with its own bathroom.",
      "The infinity pool, outdoor living areas and mature coastal planting make this a home designed to be enjoyed from December through March, and a strong candidate for high-season rental when not in use.",
    ],
    type: "house",
    bedrooms: 4,
    bathrooms: 5,
    builtArea: 460,
    landArea: 2_400,
    amenities: [
      "Infinity pool",
      "Ocean views",
      "En-suite bedrooms",
      "Outdoor living & dining",
      "Fireplace",
      "Laundry room",
      "Alarm & CCTV",
      "Rental potential",
    ],
    status: "available",
  },
  {
    id: "cpu-003",
    slug: "rambla-penthouse-pocitos",
    title: "Rambla Penthouse in Pocitos",
    location: {
      neighborhood: "Pocitos",
      city: "Montevideo",
      department: "Montevideo",
      country: "Uruguay",
    },
    price: 1_180_000,
    mainImage: unsplash("1560448204-e02f11c3d0e2", "Penthouse living room with floor-to-ceiling windows"),
    gallery: [
      unsplash("1600210492486-724fe5c67fb0", "Lounge area with leather sofa and gallery wall"),
      unsplash("1522708323590-d24dbb6b0267", "Open kitchen and dining area"),
      unsplash("1484154218962-a197022b5858", "White kitchen with island and pendant lights"),
      unsplash("1505693416388-ac5ce068fe85", "Primary bedroom with upholstered headboard"),
      unsplash("1552321554-5fefe8c9ef14", "Bright bathroom with natural light"),
    ],
    shortDescription:
      "A top-floor residence on Montevideo's Rambla with panoramic river views, a wraparound terrace and full-service building amenities.",
    fullDescription: [
      "Occupying the top floor of a well-maintained building on the Rambla de Pocitos, this penthouse offers some of the most open views in Montevideo, across the Río de la Plata and along the city's coastline.",
      "A generous living and dining room is wrapped by a terrace that runs the length of the apartment. The kitchen is fully equipped and connects to a service area. Three bedrooms, including a primary suite with a dressing room, are arranged away from the social spaces for privacy.",
      "Pocitos is one of the city's most walkable neighborhoods, with cafés, restaurants, schools and the beach all within a few blocks.",
    ],
    type: "apartment",
    bedrooms: 3,
    bathrooms: 3,
    builtArea: 245,
    amenities: [
      "Panoramic river views",
      "Wraparound terrace",
      "24-hour concierge",
      "Two parking spaces",
      "Storage unit",
      "Building gym",
      "Service area",
      "Walk to the beach",
    ],
    status: "available",
  },
  {
    id: "cpu-004",
    slug: "garden-residence-carrasco",
    title: "Garden Residence in Carrasco",
    location: {
      neighborhood: "Carrasco",
      city: "Montevideo",
      department: "Montevideo",
      country: "Uruguay",
    },
    price: 1_390_000,
    mainImage: unsplash("1600585154340-be6161a56a0c", "Contemporary family home opening onto a mature garden"),
    gallery: [
      unsplash("1600607688969-a5bfcd646154", "Rear façade and lawn beneath a large tree"),
      unsplash("1600585154526-990dced4db0d", "Entrance with timber cladding and dark façade"),
      unsplash("1501183638710-841dd1904471", "Living room with fireplace and clerestory windows"),
      unsplash("1540518614846-7eded433c457", "Bedroom with artwork and bench seating"),
      unsplash("1493809842364-78817add7ffb", "Family room with herringbone floors"),
    ],
    shortDescription:
      "A contemporary family home on a tree-lined street in Carrasco, with a mature garden and close access to the airport and international schools.",
    fullDescription: [
      "Carrasco is Montevideo's most established residential neighborhood: leafy, quiet and close to the international airport and several bilingual schools. This contemporary home sits on a generous lot shaded by a mature tree.",
      "Living spaces are arranged on the ground floor around a fireplace lounge and an open kitchen, both connecting directly to the garden. Four bedrooms are located upstairs, including a primary suite with its own bathroom.",
      "Dark timber and render give the house a quiet, modern presence from the street, while large openings at the rear make the garden part of everyday life.",
    ],
    type: "house",
    bedrooms: 4,
    bathrooms: 4,
    builtArea: 385,
    landArea: 1_050,
    amenities: [
      "Mature garden",
      "Fireplace",
      "Parrilla",
      "Garage for two cars",
      "Home office",
      "Near international schools",
      "15 minutes to the airport",
    ],
    status: "under-offer",
  },
  {
    id: "cpu-005",
    slug: "modern-apartment-punta-carretas",
    title: "Modern Apartment in Punta Carretas",
    location: {
      neighborhood: "Punta Carretas",
      city: "Montevideo",
      department: "Montevideo",
      country: "Uruguay",
    },
    price: 465_000,
    mainImage: unsplash("1545324418-cc1a3fa10c00", "Contemporary residential building with dark façade and balconies"),
    gallery: [
      unsplash("1502672260266-1c1ef2d93688", "Living room with reading corner and plants"),
      unsplash("1586023492125-27b2c045efd7", "Minimal living space with yellow armchair"),
      unsplash("1531835551805-16d864c8d311", "Bedroom with framed prints and natural light"),
    ],
    shortDescription:
      "A well-designed two-bedroom apartment in a recent building, steps from the Rambla, the golf club and the Punta Carretas shopping district.",
    fullDescription: [
      "Punta Carretas combines a residential atmosphere with easy access to the Rambla, the Montevideo Golf Club and one of the city's main shopping centers. This apartment occupies a high floor in a recently completed building.",
      "The layout is efficient and bright: an open living and dining space with balcony, a modern kitchen, two bedrooms and two bathrooms. Finishes are contemporary and low-maintenance, suitable both as a city residence and as a long-term rental.",
    ],
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    builtArea: 108,
    amenities: [
      "Balcony",
      "Garage space",
      "Rooftop amenities",
      "Building security",
      "Near the Rambla",
      "Rental potential",
    ],
    status: "available",
  },
  {
    id: "cpu-006",
    slug: "hillside-pool-house-punta-ballena",
    title: "Hillside Pool House in Punta Ballena",
    location: {
      neighborhood: "Punta Ballena",
      city: "Punta del Este",
      department: "Maldonado",
      country: "Uruguay",
    },
    price: 1_650_000,
    mainImage: unsplash("1512917774080-9991f1c4c750", "White modern house with pool and palm planting"),
    gallery: [
      unsplash("1600573472550-8090b5e0745e", "Glazed living space opening onto the pool"),
      unsplash("1599809275671-b5942cabc7a2", "Pool terrace and spa at sunset"),
      unsplash("1600566753190-17f0baa2a6c3", "Timber-clad façade with landscaped approach"),
    ],
    shortDescription:
      "A crisp modern home on the slopes of Punta Ballena, with a pool terrace oriented toward the sunset over the bay.",
    fullDescription: [
      "Punta Ballena is known for its dramatic headland and some of the best sunsets on the Uruguayan coast. This modern house is set into the hillside to make the most of that orientation.",
      "Glazed living spaces open directly onto the pool terrace, with a spa and outdoor lounge positioned for evening light. Four bedrooms are distributed across two levels, giving guests and family their own space.",
    ],
    type: "house",
    bedrooms: 4,
    bathrooms: 4,
    builtArea: 340,
    landArea: 2_000,
    amenities: [
      "Swimming pool",
      "Spa",
      "Sunset views",
      "Outdoor lounge",
      "Parrilla",
      "Covered parking",
    ],
    status: "available",
  },
  {
    id: "cpu-007",
    slug: "countryside-chacra-pueblo-garzon",
    title: "Countryside Chacra near Pueblo Garzón",
    location: {
      neighborhood: "Pueblo Garzón",
      city: "Garzón",
      department: "Maldonado",
      country: "Uruguay",
    },
    price: 1_250_000,
    mainImage: unsplash("1500076656116-558758c991c1", "Restored barn and silo at sunset in open countryside"),
    gallery: [
      unsplash("1558036117-15d82a90b9b1", "Main house set in rolling pasture"),
      unsplash("1500382017468-9049fed747ef", "Golden fields at sunset"),
      unsplash("1470071459604-3b5ec3a7fe05", "Rolling hills and sky over the countryside"),
    ],
    shortDescription:
      "Twelve hectares of rolling countryside near the gastronomic village of Garzón, with a main residence and a restored barn.",
    fullDescription: [
      "The hinterland of Maldonado, between José Ignacio and the vineyards around Pueblo Garzón, has become one of Uruguay's most desirable areas for country properties. This chacra offers twelve hectares of open pasture with long views and complete privacy.",
      "The main residence has three bedrooms and three bathrooms, with living spaces that open onto a covered gallery facing west. A restored barn offers potential for a studio, guest accommodation or equestrian use, subject to the applicable permits.",
      "The property is a short drive from Garzón's restaurants and wineries and approximately thirty minutes from the beaches of José Ignacio.",
    ],
    type: "farm",
    bedrooms: 3,
    bathrooms: 3,
    builtArea: 290,
    landArea: 120_000,
    amenities: [
      "Restored barn",
      "Covered gallery",
      "Open pasture",
      "Well water",
      "Fireplace",
      "Complete privacy",
      "Near Garzón vineyards",
    ],
    status: "available",
  },
  {
    id: "cpu-008",
    slug: "coastal-lot-laguna-garzon",
    title: "Coastal Building Lot near Laguna Garzón",
    location: {
      neighborhood: "Laguna Garzón",
      city: "José Ignacio",
      department: "Maldonado",
      country: "Uruguay",
    },
    price: 620_000,
    mainImage: unsplash("1507525428034-b723cf961d3e", "Wide sandy beach and calm Atlantic at sunrise"),
    gallery: [
      unsplash("1519046904884-53103b34b206", "Quiet beach with sun shelter and clear water"),
    ],
    shortDescription:
      "A 5,200 m² building lot within walking distance of the beach, in the quiet coastal stretch between José Ignacio and Laguna Garzón.",
    fullDescription: [
      "East of José Ignacio, the coast toward Laguna Garzón remains low-density and largely natural. This lot offers the opportunity to build a private residence in one of the area's most protected settings.",
      "The parcel totals 5,200 m², with a gentle slope toward the coast. Buyers should commission their own architectural and zoning review; our team can coordinate introductions to local architects and notaries.",
    ],
    type: "land",
    landArea: 5_200,
    amenities: [
      "Walking distance to the beach",
      "Low-density area",
      "Gentle slope",
      "Electricity at the lot line",
    ],
    status: "available",
  },
  {
    id: "cpu-009",
    slug: "corporate-office-floor-buceo",
    title: "Corporate Office Floor in Buceo",
    location: {
      neighborhood: "Buceo",
      city: "Montevideo",
      department: "Montevideo",
      country: "Uruguay",
    },
    price: 1_950_000,
    mainImage: unsplash("1486406146926-c627a92ad1ab", "Glass office towers seen from street level"),
    gallery: [
      unsplash("1497366811353-6870744d04b2", "Open-plan office floor with full-height glazing"),
      unsplash("1497366216548-37526070297c", "Office corridor with meeting rooms and kitchenette"),
    ],
    shortDescription:
      "A full office floor in a Class A tower in Buceo, Montevideo's main corporate district, suited to owner-occupiers or income investors.",
    fullDescription: [
      "Buceo concentrates many of Montevideo's corporate headquarters, international firms and financial services providers. This full floor is located in a Class A tower with professional management.",
      "The floor plate is open and column-efficient, with full-height glazing on all sides, existing meeting rooms and a kitchenette. It can be occupied as-is, reconfigured, or acquired as an income-producing asset.",
    ],
    type: "commercial",
    bathrooms: 4,
    builtArea: 640,
    amenities: [
      "Class A building",
      "Eight parking spaces",
      "Raised floors",
      "Central air conditioning",
      "Backup generator",
      "24/7 security",
      "Professional building management",
    ],
    status: "available",
  },
];

/* -------------------------------------------------------------------------- */
/*  Queries                                                                   */
/* -------------------------------------------------------------------------- */

export function getAllProperties(): Property[] {
  return properties;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getPropertyImages(property: Property): PropertyImage[] {
  return [property.mainImage, ...property.gallery];
}

export function getRelatedProperties(property: Property, count = 3): Property[] {
  const others = properties.filter((p) => p.id !== property.id && p.status !== "sold");
  const sameType = others.filter((p) => p.type === property.type);
  const rest = others.filter((p) => p.type !== property.type);
  return [...sameType, ...rest].slice(0, count);
}

/** Types that actually occur in the data, in label order. */
export function getAvailableTypes(list: Property[] = properties): PropertyType[] {
  const present = new Set(list.map((p) => p.type));
  return (Object.keys(propertyTypeLabels) as PropertyType[]).filter((t) => present.has(t));
}

export const priceSteps = [
  250_000, 500_000, 750_000, 1_000_000, 1_500_000, 2_000_000, 3_000_000, 5_000_000,
];

export const defaultFilters: PropertyFilters = {
  query: "",
  type: "all",
  minPrice: null,
  maxPrice: null,
  sort: "featured",
};

function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function filterProperties(list: Property[], filters: PropertyFilters): Property[] {
  const terms = normalize(filters.query.trim()).split(/\s+/).filter(Boolean);

  const result = list.filter((p) => {
    if (filters.type !== "all" && p.type !== filters.type) return false;
    if (filters.minPrice !== null && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && p.price > filters.maxPrice) return false;
    if (terms.length) {
      const haystack = normalize(
        [
          p.title,
          p.location.neighborhood,
          p.location.city,
          p.location.department ?? "",
          p.location.country,
          propertyTypeLabels[p.type],
        ].join(" ")
      );
      if (!terms.every((t) => haystack.includes(t))) return false;
    }
    return true;
  });

  if (filters.sort === "price-asc") return [...result].sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc") return [...result].sort((a, b) => b.price - a.price);
  return result;
}
