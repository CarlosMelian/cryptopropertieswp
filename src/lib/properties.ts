import type {
  Localized,
  Property,
  PropertyFilters,
  PropertyImageRecord,
  PropertyRecord,
  PropertyType,
} from "@/types";
import { localeTags, type Locale } from "@/i18n/config";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/** A listing photo stored in public/properties/<slug>/<file>. */
function photo(slug: string, file: string, alt: Localized): PropertyImageRecord {
  return { src: `/properties/${slug}/${file}`, alt };
}

const COUNTRY: Localized = { en: "Uruguay", es: "Uruguay", pt: "Uruguai" };

/** Display order for property types (labels live in the dictionaries). */
export const propertyTypes: PropertyType[] = ["apartment", "house", "land", "farm", "commercial"];

export function formatPrice(value: number, locale: Locale = "en") {
  return new Intl.NumberFormat(localeTags[locale].intl, {
    style: "currency",
    currency: "USD",
    // "US$" in es/pt: a bare "$" means Uruguayan pesos locally.
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactPrice(value: number, locale: Locale = "en") {
  return new Intl.NumberFormat(localeTags[locale].intl, {
    style: "currency",
    currency: "USD",
    // "US$" in es/pt: a bare "$" means Uruguayan pesos locally.
    currencyDisplay: "symbol",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatNumber(value: number, locale: Locale = "en") {
  return value.toLocaleString(localeTags[locale].intl);
}

export function formatArea(m2: number, locale: Locale = "en") {
  const base = `${formatNumber(m2, locale)} m²`;
  if (m2 < 10_000) return base;
  const ha = (m2 / 10_000).toLocaleString(localeTags[locale].intl, { maximumFractionDigits: 1 });
  return `${base} (${ha} ha)`;
}

export function formatLocation(location: Property["location"], variant: "short" | "full" = "short") {
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
/*  Every text field needs en / es / pt. Leave optional specs out when        */
/*  unknown: the UI hides missing fields.                                     */
/*  Photos live in public/properties/<slug>/. `source` records which partner  */
/*  agency holds each listing (internal only, never shown on the site).       */
/* -------------------------------------------------------------------------- */

const BRAGLIA = {
  agency: "Braglia Inmobiliaria",
  contact: "WhatsApp ventas +598 91 221 505",
  importedAt: "2026-11-19",
} as const;

const records: PropertyRecord[] = [
  {
    id: "uyre-001",
    slug: "residence-pinar-del-faro-jose-ignacio",
    title: {
      en: "Six-Bedroom Residence in Pinar del Faro, José Ignacio",
      es: "Residencia de seis dormitorios en Pinar del Faro, José Ignacio",
      pt: "Residência de seis dormitórios em Pinar del Faro, José Ignacio",
    },
    location: { neighborhood: "Pinar del Faro", city: "José Ignacio", department: "Maldonado" },
    price: 1_630_000,
    mainImage: photo("residence-pinar-del-faro-jose-ignacio", "01.jpg", {
      en: "Gabled white house lit up at dusk among pine trees",
      es: "Casa blanca de techos a dos aguas iluminada al atardecer entre pinos",
      pt: "Casa branca de telhado de duas águas iluminada ao entardecer entre pinheiros",
    }),
    gallery: [
      photo("residence-pinar-del-faro-jose-ignacio", "02.jpg", {
        en: "The house among the pines of Pinar del Faro",
        es: "La casa entre los pinos de Pinar del Faro",
        pt: "A casa entre os pinheiros de Pinar del Faro",
      }),
      photo("residence-pinar-del-faro-jose-ignacio", "03.jpg", {
        en: "Rear façade and lawn on a sunny day",
        es: "Fachada posterior y jardín en un día de sol",
        pt: "Fachada posterior e gramado em um dia de sol",
      }),
      photo("residence-pinar-del-faro-jose-ignacio", "04.jpg", {
        en: "Lit façade and pool at night",
        es: "Fachada iluminada y piscina de noche",
        pt: "Fachada iluminada e piscina à noite",
      }),
      photo("residence-pinar-del-faro-jose-ignacio", "05.jpg", {
        en: "Street-side entrance with timber door",
        es: "Acceso desde la calle con puerta de madera",
        pt: "Acesso pela rua com porta de madeira",
      }),
      photo("residence-pinar-del-faro-jose-ignacio", "06.jpg", {
        en: "Dining room with long table and garden views",
        es: "Comedor con mesa larga y vista al jardín",
        pt: "Sala de jantar com mesa longa e vista para o jardim",
      }),
      photo("residence-pinar-del-faro-jose-ignacio", "07.jpg", {
        en: "Twin bedroom opening onto the pool garden",
        es: "Dormitorio con dos camas con salida al jardín de la piscina",
        pt: "Quarto com duas camas com acesso ao jardim da piscina",
      }),
      photo("residence-pinar-del-faro-jose-ignacio", "08.jpg", {
        en: "Double bedroom with sliding doors to the garden",
        es: "Dormitorio doble con puertas corredizas al jardín",
        pt: "Quarto de casal com portas de correr para o jardim",
      }),
      photo("residence-pinar-del-faro-jose-ignacio", "09.jpg", {
        en: "Bathroom with double vanity and marble counter",
        es: "Baño con doble bacha y mesada de mármol",
        pt: "Banheiro com cuba dupla e bancada de mármore",
      }),
      photo("residence-pinar-del-faro-jose-ignacio", "10.jpg", {
        en: "Upstairs bedroom with timber screen",
        es: "Dormitorio de la planta alta con celosía de madera",
        pt: "Quarto do andar superior com treliça de madeira",
      }),
    ],
    shortDescription: {
      en: "A 410 m² residence on a 1,037 m² lot among the pines of Pinar del Faro, with six bedrooms, a pool and room for fourteen guests.",
      es: "Una residencia de 410 m² en un terreno de 1.037 m² entre los pinos de Pinar del Faro, con seis dormitorios, piscina y capacidad para catorce personas.",
      pt: "Uma residência de 410 m² em um terreno de 1.037 m² entre os pinheiros de Pinar del Faro, com seis dormitórios, piscina e capacidade para catorze pessoas.",
    },
    fullDescription: {
      en: [
        "Set among the pines of Pinar del Faro, one of the most sought-after enclaves of José Ignacio, this residence offers 410 m² built, terrace included, on a generous 1,037 m² lot.",
        "It sleeps fourteen across six bedrooms and six bathrooms, four of them en suite. The interior centres on a modern kitchen with a breakfast bar, a welcoming living room and a spacious dining room, with large windows onto the garden and pool.",
      ],
      es: [
        "Ubicada entre los pinos de Pinar del Faro, uno de los enclaves más buscados de José Ignacio, esta residencia ofrece 410 m² construidos, terraza incluida, sobre un amplio terreno de 1.037 m².",
        "Tiene capacidad para catorce personas, con seis dormitorios y seis baños, cuatro de ellos en suite. El interior se organiza en torno a una cocina moderna con barra, un living acogedor y un comedor espacioso, con grandes ventanales al jardín y la piscina.",
      ],
      pt: [
        "Situada entre os pinheiros de Pinar del Faro, um dos enclaves mais procurados de José Ignacio, esta residência oferece 410 m² construídos, terraço incluído, em um amplo terreno de 1.037 m².",
        "Acomoda catorze pessoas, com seis dormitórios e seis banheiros, quatro deles suítes. O interior se organiza em torno de uma cozinha moderna com bancada, uma sala de estar acolhedora e uma ampla sala de jantar, com grandes janelas para o jardim e a piscina.",
      ],
    },
    type: "house",
    bedrooms: 6,
    bathrooms: 6,
    builtArea: 410,
    landArea: 1_037,
    amenities: {
      en: ["Swimming pool", "Four en-suite bedrooms", "Sleeps 14", "Modern kitchen with breakfast bar", "Terrace", "Garden among pine trees"],
      es: ["Piscina", "Cuatro dormitorios en suite", "Capacidad para 14 personas", "Cocina moderna con barra", "Terraza", "Jardín entre pinos"],
      pt: ["Piscina", "Quatro suítes", "Capacidade para 14 pessoas", "Cozinha moderna com bancada", "Terraço", "Jardim entre pinheiros"],
    },
    status: "available",
    source: {
      ...BRAGLIA,
      url: "https://braglia.com.uy/propiedades/9384-casa-de-6-dormitorios-en-punta-del-este",
      reference: "2525",
    },
  },
  {
    id: "uyre-002",
    slug: "oceanfront-house-peninsula",
    title: {
      en: "Oceanfront House on the Peninsula, Punta del Este",
      es: "Casa frente al mar en la Península, Punta del Este",
      pt: "Casa de frente para o mar na Península, Punta del Este",
    },
    location: { neighborhood: "Península", city: "Punta del Este", department: "Maldonado" },
    price: 1_400_000,
    mainImage: photo("oceanfront-house-peninsula", "01.jpg", {
      en: "White two-storey house with a front garden under a blue sky",
      es: "Casa blanca de dos plantas con jardín al frente bajo un cielo azul",
      pt: "Casa branca de dois andares com jardim na frente sob um céu azul",
    }),
    gallery: [
      photo("oceanfront-house-peninsula", "02.jpg", {
        en: "Front terrace looking straight out to the sea",
        es: "Terraza al frente con vista directa al mar",
        pt: "Terraço da frente com vista direta para o mar",
      }),
      photo("oceanfront-house-peninsula", "03.jpg", {
        en: "Living room with floor-to-ceiling windows facing the ocean",
        es: "Living con ventanales de piso a techo frente al mar",
        pt: "Sala de estar com janelas do piso ao teto de frente para o mar",
      }),
      photo("oceanfront-house-peninsula", "04.jpg", {
        en: "Sitting area with sea views",
        es: "Sala de estar con vista al mar",
        pt: "Área de estar com vista para o mar",
      }),
      photo("oceanfront-house-peninsula", "05.jpg", {
        en: "Lounge with large sofas",
        es: "Living con amplios sillones",
        pt: "Sala com sofás amplos",
      }),
      photo("oceanfront-house-peninsula", "06.jpg", {
        en: "Bedroom opening onto a terrace by the sea",
        es: "Dormitorio con salida a una terraza frente al mar",
        pt: "Quarto com acesso a um terraço de frente para o mar",
      }),
      photo("oceanfront-house-peninsula", "07.jpg", {
        en: "Outdoor lounge on the front lawn",
        es: "Estar exterior en el jardín del frente",
        pt: "Área de estar externa no jardim da frente",
      }),
      photo("oceanfront-house-peninsula", "08.jpg", {
        en: "Dining room with table for ten",
        es: "Comedor con mesa para diez",
        pt: "Sala de jantar com mesa para dez",
      }),
      photo("oceanfront-house-peninsula", "09.jpg", {
        en: "Study with built-in shelving",
        es: "Escritorio con biblioteca empotrada",
        pt: "Escritório com estante embutida",
      }),
      photo("oceanfront-house-peninsula", "10.jpg", {
        en: "The house seen from the street",
        es: "La casa vista desde la calle",
        pt: "A casa vista da rua",
      }),
    ],
    shortDescription: {
      en: "A seafront house on the Punta del Este peninsula, steps from the beach, with six bedrooms, each with its own bathroom, and a living room facing the ocean.",
      es: "Una casa en primera línea en la Península de Punta del Este, a pasos de la playa, con seis dormitorios con baño propio y un living frente al mar.",
      pt: "Uma casa de frente para o mar na Península de Punta del Este, a passos da praia, com seis dormitórios com banheiro próprio e uma sala voltada para o oceano.",
    },
    fullDescription: {
      en: [
        "On the front line of one of Punta del Este's most exclusive areas, this house sits steps from the beach, with the ocean in view from its main rooms.",
        "Designed to make the most of light and space, it has six bedrooms, each with its own en-suite bathroom. A fully equipped kitchen and a large living room with exceptional sea views complete the main floor.",
        "The house offers 272 m² built on a 469 m² lot.",
      ],
      es: [
        "En primera línea de una de las zonas más exclusivas de Punta del Este, esta casa está a pasos de la playa, con el mar a la vista desde sus ambientes principales.",
        "Con un diseño que aprovecha la luz y el espacio, cuenta con seis dormitorios, cada uno con su baño en suite. Una cocina completamente equipada y un amplio living con una vista excepcional al mar completan la planta principal.",
        "La casa ofrece 272 m² construidos sobre un terreno de 469 m².",
      ],
      pt: [
        "Na primeira linha de uma das áreas mais exclusivas de Punta del Este, esta casa fica a passos da praia, com o mar à vista a partir dos ambientes principais.",
        "Com um projeto que aproveita a luz e o espaço, tem seis dormitórios, todos suítes. Uma cozinha totalmente equipada e uma ampla sala de estar com vista excepcional para o mar completam o piso principal.",
        "A casa oferece 272 m² construídos em um terreno de 469 m².",
      ],
    },
    type: "house",
    bedrooms: 6,
    bathrooms: 7,
    builtArea: 272,
    landArea: 469,
    amenities: {
      en: ["Oceanfront", "Steps from the beach", "Six en-suite bedrooms", "Sea-view living room", "Fully equipped kitchen", "Front terrace"],
      es: ["Frente al mar", "A pasos de la playa", "Seis dormitorios en suite", "Living con vista al mar", "Cocina equipada", "Terraza al frente"],
      pt: ["De frente para o mar", "A passos da praia", "Seis suítes", "Sala com vista para o mar", "Cozinha equipada", "Terraço na frente"],
    },
    status: "available",
    source: {
      ...BRAGLIA,
      url: "https://braglia.com.uy/propiedades/9592-casa-de-6-dormitorios-en-peninsula",
      reference: "2711",
    },
  },
  {
    id: "uyre-003",
    slug: "family-home-mansa",
    title: {
      en: "Five-Bedroom Home with Pool in La Mansa, Punta del Este",
      es: "Casa de cinco dormitorios con piscina en La Mansa, Punta del Este",
      pt: "Casa de cinco dormitórios com piscina em La Mansa, Punta del Este",
    },
    location: { neighborhood: "La Mansa", city: "Punta del Este", department: "Maldonado" },
    price: 1_100_000,
    mainImage: photo("family-home-mansa", "01.webp", {
      en: "Garden with pool in front of a single-storey house with a timber pergola",
      es: "Jardín con piscina frente a una casa de una planta con pérgola de madera",
      pt: "Jardim com piscina diante de uma casa térrea com pérgola de madeira",
    }),
    gallery: [
      photo("family-home-mansa", "02.webp", {
        en: "Path through the lawn to the front door",
        es: "Sendero entre el césped hacia la entrada",
        pt: "Caminho pelo gramado até a entrada",
      }),
      photo("family-home-mansa", "03.webp", {
        en: "Lawn and pool beside the house",
        es: "Césped y piscina junto a la casa",
        pt: "Gramado e piscina ao lado da casa",
      }),
      photo("family-home-mansa", "04.webp", {
        en: "Living and dining area with garden views",
        es: "Living comedor con vista al jardín",
        pt: "Sala de estar e jantar com vista para o jardim",
      }),
      photo("family-home-mansa", "05.webp", {
        en: "Living room with fireplace",
        es: "Living con hogar",
        pt: "Sala de estar com lareira",
      }),
      photo("family-home-mansa", "06.webp", {
        en: "Kitchen with breakfast bar",
        es: "Cocina con barra desayunadora",
        pt: "Cozinha com bancada de café da manhã",
      }),
      photo("family-home-mansa", "07.webp", {
        en: "Dining room",
        es: "Comedor",
        pt: "Sala de jantar",
      }),
      photo("family-home-mansa", "08.webp", {
        en: "Pool surrounded by hedges",
        es: "Piscina rodeada de cercos verdes",
        pt: "Piscina cercada por cercas vivas",
      }),
      photo("family-home-mansa", "09.webp", {
        en: "Pool lit at night",
        es: "Piscina iluminada de noche",
        pt: "Piscina iluminada à noite",
      }),
      photo("family-home-mansa", "10.webp", {
        en: "Bedroom with two beds",
        es: "Dormitorio con dos camas",
        pt: "Quarto com duas camas",
      }),
      photo("family-home-mansa", "11.webp", {
        en: "Bathroom with vessel sink",
        es: "Baño con bacha de apoyo",
        pt: "Banheiro com cuba de apoio",
      }),
    ],
    shortDescription: {
      en: "A five-bedroom home on a 1,500 m² lot in the Mansa area of Punta del Este, with three suites, a pool and minutes from the beach.",
      es: "Una casa de cinco dormitorios en un terreno de 1.500 m² en la zona de La Mansa, Punta del Este, con tres suites, piscina y a minutos de la playa.",
      pt: "Uma casa de cinco dormitórios em um terreno de 1.500 m² na região de La Mansa, Punta del Este, com três suítes, piscina e a minutos da praia.",
    },
    fullDescription: {
      en: [
        "In the sought-after Mansa area of Punta del Este, this house stands on a generous 1,500 m² lot with 400 m² built, a few minutes from some of the best beaches in the region.",
        "It has five large bedrooms, three of them suites. The kitchen opens onto a bright living and dining room, and the landscaped garden is organised around the swimming pool.",
      ],
      es: [
        "En la codiciada zona de La Mansa, en Punta del Este, esta casa se levanta sobre un generoso terreno de 1.500 m² con 400 m² construidos, a pocos minutos de algunas de las mejores playas de la región.",
        "Cuenta con cinco amplios dormitorios, tres de ellos en suite. La cocina se integra con un luminoso living comedor, y el jardín parquizado se organiza en torno a la piscina.",
      ],
      pt: [
        "Na disputada região de La Mansa, em Punta del Este, esta casa ocupa um generoso terreno de 1.500 m² com 400 m² construídos, a poucos minutos de algumas das melhores praias da região.",
        "Tem cinco amplos dormitórios, três deles suítes. A cozinha se integra a uma sala de estar e jantar iluminada, e o jardim paisagístico se organiza em torno da piscina.",
      ],
    },
    type: "house",
    bedrooms: 5,
    bathrooms: 3,
    builtArea: 400,
    landArea: 1_500,
    amenities: {
      en: ["Swimming pool", "Three suites", "Integrated kitchen and living-dining room", "Fireplace", "Landscaped garden", "Minutes from the beach"],
      es: ["Piscina", "Tres suites", "Cocina integrada al living comedor", "Hogar", "Jardín parquizado", "A minutos de la playa"],
      pt: ["Piscina", "Três suítes", "Cozinha integrada à sala de estar e jantar", "Lareira", "Jardim paisagístico", "A minutos da praia"],
    },
    status: "available",
    source: {
      ...BRAGLIA,
      url: "https://braglia.com.uy/propiedades/9353-casa-de-5-dormitorios-en-parada-mansa",
      reference: "1721",
    },
  },
  {
    id: "uyre-004",
    slug: "pool-house-el-chorro",
    title: {
      en: "Sea-View House with Heated Pool in El Chorro, Manantiales",
      es: "Casa con vista al mar y piscina climatizada en El Chorro, Manantiales",
      pt: "Casa com vista para o mar e piscina aquecida em El Chorro, Manantiales",
    },
    location: { neighborhood: "El Chorro", city: "Manantiales", department: "Maldonado" },
    price: 890_000,
    mainImage: photo("pool-house-el-chorro", "01.jpg", {
      en: "Sunset over the sea from a timber deck above the pool",
      es: "Atardecer sobre el mar desde un deck de madera sobre la piscina",
      pt: "Pôr do sol sobre o mar a partir de um deck de madeira acima da piscina",
    }),
    gallery: [
      photo("pool-house-el-chorro", "02.jpg", {
        en: "Covered terrace with sea views",
        es: "Terraza techada con vista al mar",
        pt: "Terraço coberto com vista para o mar",
      }),
      photo("pool-house-el-chorro", "03.jpg", {
        en: "Terrace lounge with the ocean in the distance",
        es: "Estar en la terraza con el mar a lo lejos",
        pt: "Área de estar no terraço com o mar ao fundo",
      }),
      photo("pool-house-el-chorro", "04.jpg", {
        en: "Pool with timber deck and lawn",
        es: "Piscina con deck de madera y césped",
        pt: "Piscina com deck de madeira e gramado",
      }),
      photo("pool-house-el-chorro", "05.jpg", {
        en: "Front of the house with landscaped garden",
        es: "Frente de la casa con jardín parquizado",
        pt: "Fachada da casa com jardim paisagístico",
      }),
      photo("pool-house-el-chorro", "06.jpg", {
        en: "Double bedroom with seaside décor",
        es: "Dormitorio doble con decoración marinera",
        pt: "Quarto de casal com decoração praiana",
      }),
      photo("pool-house-el-chorro", "07.jpg", {
        en: "Bedroom with large windows onto the garden",
        es: "Dormitorio con grandes ventanales al jardín",
        pt: "Quarto com grandes janelas para o jardim",
      }),
      photo("pool-house-el-chorro", "08.jpg", {
        en: "Bathroom with stone wall and double sink",
        es: "Baño con pared de piedra y doble bacha",
        pt: "Banheiro com parede de pedra e cuba dupla",
      }),
      photo("pool-house-el-chorro", "09.jpg", {
        en: "Bedroom with fireplace",
        es: "Dormitorio con hogar",
        pt: "Quarto com lareira",
      }),
      photo("pool-house-el-chorro", "10.jpg", {
        en: "Double bedroom",
        es: "Dormitorio doble",
        pt: "Quarto de casal",
      }),
    ],
    shortDescription: {
      en: "A six-bedroom house 380 m from the sea in El Chorro, with a heated outdoor pool, a terrace with sweeping views and parking for four cars.",
      es: "Una casa de seis dormitorios a 380 m del mar en El Chorro, con piscina exterior climatizada, terraza con gran vista y cochera para cuatro autos.",
      pt: "Uma casa de seis dormitórios a 380 m do mar em El Chorro, com piscina externa aquecida, terraço com ampla vista e garagem para quatro carros.",
    },
    fullDescription: {
      en: [
        "In El Chorro, Manantiales, just 380 metres from the sea, this house pairs space and comfort with a privileged natural setting and easy access to the area's best beaches.",
        "On a 619 m² lot with 431 m² built, it has six bedrooms, five bathrooms and three suites, sleeping thirteen. The integrated kitchen connects with the living and dining room.",
        "Outside, a heated outdoor pool, a large terrace with sweeping views, a barbecue area and a garage for four cars complete the property.",
      ],
      es: [
        "En El Chorro, Manantiales, a solo 380 metros del mar, esta casa combina espacio y comodidad con un entorno natural privilegiado y fácil acceso a las mejores playas de la zona.",
        "Sobre un terreno de 619 m² con 431 m² construidos, cuenta con seis dormitorios, cinco baños y tres suites, con capacidad para trece personas. La cocina integrada se conecta con el living comedor.",
        "En el exterior, una piscina climatizada, una gran terraza con amplia vista, parrillero y cochera para cuatro autos completan la propiedad.",
      ],
      pt: [
        "Em El Chorro, Manantiales, a apenas 380 metros do mar, esta casa combina espaço e conforto com um entorno natural privilegiado e fácil acesso às melhores praias da região.",
        "Em um terreno de 619 m² com 431 m² construídos, tem seis dormitórios, cinco banheiros e três suítes, com capacidade para treze pessoas. A cozinha integrada se conecta à sala de estar e jantar.",
        "Na área externa, uma piscina aquecida, um grande terraço com ampla vista, churrasqueira (parrillero) e garagem para quatro carros completam o imóvel.",
      ],
    },
    type: "house",
    bedrooms: 6,
    bathrooms: 5,
    builtArea: 431,
    landArea: 619,
    amenities: {
      en: ["Heated outdoor pool", "Terrace with sea views", "Barbecue area (parrillero)", "Garage for four cars", "Three suites", "Sleeps 13", "380 m from the sea"],
      es: ["Piscina exterior climatizada", "Terraza con vista al mar", "Parrillero", "Cochera para cuatro autos", "Tres suites", "Capacidad para 13 personas", "A 380 m del mar"],
      pt: ["Piscina externa aquecida", "Terraço com vista para o mar", "Churrasqueira (parrillero)", "Garagem para quatro carros", "Três suítes", "Capacidade para 13 pessoas", "A 380 m do mar"],
    },
    status: "available",
    source: {
      ...BRAGLIA,
      url: "https://braglia.com.uy/propiedades/9383-casa-de-6-dormitorios-en-punta-del-este",
      reference: "2524",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Queries                                                                   */
/* -------------------------------------------------------------------------- */

function localize(record: PropertyRecord, locale: Locale): Property {
  // `source` is internal (which agency holds the listing): never pass it to pages.
  const { source: _source, ...r } = record;
  return {
    ...r,
    title: r.title[locale],
    location: { ...r.location, country: COUNTRY[locale] },
    mainImage: { src: r.mainImage.src, alt: r.mainImage.alt[locale] },
    gallery: r.gallery.map((img) => ({ src: img.src, alt: img.alt[locale] })),
    shortDescription: r.shortDescription[locale],
    fullDescription: r.fullDescription[locale],
    amenities: r.amenities[locale],
  };
}

export function getAllProperties(locale: Locale): Property[] {
  return records.map((r) => localize(r, locale));
}

export function getPropertySlugs(): string[] {
  return records.map((r) => r.slug);
}

export function getPropertyBySlug(slug: string, locale: Locale): Property | undefined {
  const r = records.find((p) => p.slug === slug);
  return r ? localize(r, locale) : undefined;
}

export function getPropertyImages(property: Property) {
  return [property.mainImage, ...property.gallery];
}

export function getRelatedProperties(property: Property, locale: Locale, count = 3): Property[] {
  const others = records.filter((p) => p.id !== property.id && p.status !== "sold");
  const sameType = others.filter((p) => p.type === property.type);
  const rest = others.filter((p) => p.type !== property.type);
  return [...sameType, ...rest].slice(0, count).map((r) => localize(r, locale));
}

/** Types that actually occur in the data, in display order. */
export function getAvailableTypes(list: Property[]): PropertyType[] {
  const present = new Set(list.map((p) => p.type));
  return propertyTypes.filter((t) => present.has(t));
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

export function filterProperties(
  list: Property[],
  filters: PropertyFilters,
  typeLabels: Record<PropertyType, string>
): Property[] {
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
          typeLabels[p.type],
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
