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

/** Royalty-free placeholder photography (Unsplash License). */
function unsplash(id: string, alt: Localized): PropertyImageRecord {
  return {
    src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`,
    alt,
  };
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
/* -------------------------------------------------------------------------- */

const records: PropertyRecord[] = [
  {
    id: "cpu-001",
    slug: "contemporary-villa-la-barra",
    title: {
      en: "Contemporary Villa with Pool in La Barra",
      es: "Villa contemporánea con piscina en La Barra",
      pt: "Casa contemporânea com piscina em La Barra",
    },
    location: { neighborhood: "La Barra", city: "Punta del Este", department: "Maldonado" },
    price: 2_450_000,
    mainImage: unsplash("1613490493576-7fde63acd811", {
      en: "Modern white villa with a long reflecting pool at dusk",
      es: "Villa moderna blanca con una larga piscina espejo al atardecer",
      pt: "Casa moderna branca com uma longa piscina espelhada ao entardecer",
    }),
    gallery: [
      unsplash("1613977257363-707ba9348227", {
        en: "Villa façade and pool terrace in afternoon light",
        es: "Fachada de la villa y terraza con piscina con luz de tarde",
        pt: "Fachada da casa e terraço da piscina com luz da tarde",
      }),
      unsplash("1600210491892-03d54c0aaf87", {
        en: "Double-height living room with arched windows",
        es: "Living de doble altura con ventanales en arco",
        pt: "Sala com pé-direito duplo e janelas em arco",
      }),
      unsplash("1617806118233-18e1de247200", {
        en: "Dining room with round table and garden views",
        es: "Comedor con mesa redonda y vista al jardín",
        pt: "Sala de jantar com mesa redonda e vista para o jardim",
      }),
      unsplash("1600607687644-c7171b42498f", {
        en: "Primary bedroom opening onto a private terrace",
        es: "Dormitorio principal con salida a una terraza privada",
        pt: "Suíte principal com acesso a um terraço privativo",
      }),
      unsplash("1600566752355-35792bedcfea", {
        en: "Primary bathroom with freestanding tub",
        es: "Baño principal con bañera exenta",
        pt: "Banheiro principal com banheira de imersão",
      }),
    ],
    shortDescription: {
      en: "A light-filled modern villa minutes from the beaches of La Barra, designed around a long pool and generous indoor–outdoor living.",
      es: "Una villa moderna y luminosa a minutos de las playas de La Barra, diseñada en torno a una larga piscina y a una generosa integración entre interior y exterior.",
      pt: "Uma casa moderna e luminosa a minutos das praias de La Barra, projetada em torno de uma longa piscina e de uma ampla integração entre interior e exterior.",
    },
    fullDescription: {
      en: [
        "Set on a quiet, landscaped lot a short drive from the beaches and restaurants of La Barra, this contemporary villa was designed for long summers and easy entertaining. Clean white volumes frame a long swimming pool that anchors the property and draws the eye toward the garden.",
        "The ground floor flows from a double-height living room into a formal dining area and an open kitchen, all opening through full-height glazing onto covered terraces. Upstairs, the primary suite enjoys a private terrace, a walk-in dressing room and a spa-style bathroom.",
        "The home is delivered fully finished and ready to occupy, with an outdoor kitchen and parrilla, integrated home automation and a two-car garage.",
      ],
      es: [
        "Ubicada en un terreno tranquilo y parquizado, a pocos minutos de las playas y restaurantes de La Barra, esta villa contemporánea fue pensada para veranos largos y para recibir con comodidad. Volúmenes blancos y limpios enmarcan una larga piscina que articula la propiedad y lleva la mirada hacia el jardín.",
        "La planta baja fluye desde un living de doble altura hacia el comedor y una cocina abierta, todos con ventanales de piso a techo que se abren a terrazas techadas. En la planta alta, la suite principal cuenta con terraza privada, vestidor y un baño estilo spa.",
        "La casa se entrega completamente terminada y lista para habitar, con cocina exterior y parrilla, domótica integrada y garaje para dos autos.",
      ],
      pt: [
        "Situada em um terreno tranquilo e paisagístico, a poucos minutos das praias e restaurantes de La Barra, esta casa contemporânea foi pensada para verões longos e para receber com facilidade. Volumes brancos e limpos emolduram uma longa piscina que organiza o imóvel e conduz o olhar ao jardim.",
        "O térreo flui de uma sala com pé-direito duplo para a sala de jantar e uma cozinha aberta, todas com envidraçamento do piso ao teto que se abre para terraços cobertos. No andar superior, a suíte principal tem terraço privativo, closet e banheiro estilo spa.",
        "A casa é entregue totalmente acabada e pronta para morar, com cozinha externa e churrasqueira (parrilla), automação residencial integrada e garagem para dois carros.",
      ],
    },
    type: "house",
    bedrooms: 5,
    bathrooms: 5,
    builtArea: 520,
    landArea: 1_600,
    amenities: {
      en: ["Heated swimming pool", "Outdoor kitchen & parrilla", "Home automation", "Two-car garage", "Walk-in dressing room", "Landscaped garden", "Covered terraces", "Minutes from the beach"],
      es: ["Piscina climatizada", "Cocina exterior y parrilla", "Domótica", "Garaje para dos autos", "Vestidor", "Jardín parquizado", "Terrazas techadas", "A minutos de la playa"],
      pt: ["Piscina aquecida", "Cozinha externa e churrasqueira", "Automação residencial", "Garagem para dois carros", "Closet", "Jardim paisagístico", "Terraços cobertos", "A minutos da praia"],
    },
    status: "available",
  },
  {
    id: "cpu-002",
    slug: "ocean-view-residence-jose-ignacio",
    title: {
      en: "Ocean-View Residence in José Ignacio",
      es: "Residencia con vista al mar en José Ignacio",
      pt: "Residência com vista para o mar em José Ignacio",
    },
    location: { neighborhood: "José Ignacio", city: "José Ignacio", department: "Maldonado" },
    price: 3_850_000,
    mainImage: unsplash("1580587771525-78b9dba3b914", {
      en: "Two-storey modern residence with infinity pool and open views",
      es: "Residencia moderna de dos plantas con piscina infinita y vistas abiertas",
      pt: "Residência moderna de dois andares com piscina de borda infinita e vista aberta",
    }),
    gallery: [
      unsplash("1600596542815-ffad4c1539a9", {
        en: "Pool deck with sun loungers and white façade",
        es: "Deck de la piscina con reposeras y fachada blanca",
        pt: "Deck da piscina com espreguiçadeiras e fachada branca",
      }),
      unsplash("1600566753086-00f18fb6b3ea", {
        en: "Living room with floating staircase and linen sofas",
        es: "Living con escalera flotante y sofás de lino",
        pt: "Sala com escada flutuante e sofás de linho",
      }),
      unsplash("1600607687939-ce8a6c25118c", {
        en: "Open-plan lounge and kitchen with timber feature wall",
        es: "Estar y cocina integrados con pared revestida en madera",
        pt: "Estar e cozinha integrados com parede revestida em madeira",
      }),
      unsplash("1595526114035-0d45ed16cfbf", {
        en: "Bright guest bedroom with natural textures",
        es: "Luminoso dormitorio de huéspedes con texturas naturales",
        pt: "Quarto de hóspedes luminoso com texturas naturais",
      }),
      unsplash("1507525428034-b723cf961d3e", {
        en: "Atlantic beach at sunrise near José Ignacio",
        es: "Playa sobre el Atlántico al amanecer, cerca de José Ignacio",
        pt: "Praia no Atlântico ao amanhecer, perto de José Ignacio",
      }),
    ],
    shortDescription: {
      en: "An architect-designed residence with an infinity pool and wide Atlantic horizons in Uruguay's most coveted coastal village.",
      es: "Una residencia de autor con piscina infinita y amplios horizontes sobre el Atlántico, en el pueblo costero más codiciado de Uruguay.",
      pt: "Uma residência de arquitetura assinada, com piscina de borda infinita e amplos horizontes sobre o Atlântico, no vilarejo litorâneo mais cobiçado do Uruguai.",
    },
    fullDescription: {
      en: [
        "José Ignacio has evolved from a fishing village into one of South America's most discreet and sought-after coastal destinations. This residence sits on an elevated lot that captures wide views toward the Atlantic while preserving privacy from the street.",
        "Interiors are calm and natural: pale oak, linen and lime-washed walls, organized around a central open-plan living space that opens fully to the pool deck. A floating staircase leads to four bedroom suites, each with its own bathroom.",
        "The infinity pool, outdoor living areas and mature coastal planting make this a home designed to be enjoyed from December through March, and a strong candidate for high-season rental when not in use.",
      ],
      es: [
        "José Ignacio pasó de ser un pueblo de pescadores a uno de los destinos costeros más discretos y buscados de Sudamérica. Esta residencia se ubica en un terreno elevado que capta amplias vistas hacia el Atlántico y preserva la privacidad respecto de la calle.",
        "Los interiores son serenos y naturales: roble claro, lino y paredes encaladas, organizados en torno a un gran espacio central integrado que se abre por completo al deck de la piscina. Una escalera flotante conduce a cuatro dormitorios en suite, cada uno con su propio baño.",
        "La piscina infinita, los espacios exteriores y la vegetación costera consolidada hacen de esta casa un lugar pensado para disfrutar de diciembre a marzo, y una excelente opción para alquiler en temporada alta cuando no se utiliza.",
      ],
      pt: [
        "José Ignacio deixou de ser uma vila de pescadores para se tornar um dos destinos litorâneos mais discretos e procurados da América do Sul. Esta residência fica em um terreno elevado, com ampla vista para o Atlântico e privacidade em relação à rua.",
        "Os interiores são serenos e naturais: carvalho claro, linho e paredes caiadas, organizados em torno de um grande espaço central integrado que se abre totalmente para o deck da piscina. Uma escada flutuante leva a quatro suítes, cada uma com seu próprio banheiro.",
        "A piscina de borda infinita, as áreas externas e o paisagismo litorâneo já consolidado fazem desta casa um lugar para aproveitar de dezembro a março, e uma ótima opção de locação na alta temporada quando não estiver em uso.",
      ],
    },
    type: "house",
    bedrooms: 4,
    bathrooms: 5,
    builtArea: 460,
    landArea: 2_400,
    amenities: {
      en: ["Infinity pool", "Ocean views", "En-suite bedrooms", "Outdoor living & dining", "Fireplace", "Laundry room", "Alarm & CCTV", "Rental potential"],
      es: ["Piscina infinita", "Vista al mar", "Dormitorios en suite", "Estar y comedor exteriores", "Hogar a leña", "Lavadero", "Alarma y cámaras", "Potencial de renta"],
      pt: ["Piscina de borda infinita", "Vista para o mar", "Quartos com suíte", "Estar e jantar externos", "Lareira", "Lavanderia", "Alarme e câmeras", "Potencial de locação"],
    },
    status: "available",
  },
  {
    id: "cpu-003",
    slug: "rambla-penthouse-pocitos",
    title: {
      en: "Rambla Penthouse in Pocitos",
      es: "Penthouse sobre la Rambla en Pocitos",
      pt: "Cobertura na Rambla em Pocitos",
    },
    location: { neighborhood: "Pocitos", city: "Montevideo", department: "Montevideo" },
    price: 1_180_000,
    mainImage: unsplash("1560448204-e02f11c3d0e2", {
      en: "Penthouse living room with floor-to-ceiling windows",
      es: "Living del penthouse con ventanales de piso a techo",
      pt: "Sala da cobertura com janelas do piso ao teto",
    }),
    gallery: [
      unsplash("1600210492486-724fe5c67fb0", {
        en: "Lounge area with leather sofa and gallery wall",
        es: "Sala de estar con sofá de cuero y pared de cuadros",
        pt: "Sala de estar com sofá de couro e parede de quadros",
      }),
      unsplash("1522708323590-d24dbb6b0267", {
        en: "Open kitchen and dining area",
        es: "Cocina abierta y comedor",
        pt: "Cozinha aberta e sala de jantar",
      }),
      unsplash("1484154218962-a197022b5858", {
        en: "White kitchen with island and pendant lights",
        es: "Cocina blanca con isla y lámparas colgantes",
        pt: "Cozinha branca com ilha e pendentes",
      }),
      unsplash("1505693416388-ac5ce068fe85", {
        en: "Primary bedroom with upholstered headboard",
        es: "Dormitorio principal con respaldo tapizado",
        pt: "Quarto principal com cabeceira estofada",
      }),
      unsplash("1552321554-5fefe8c9ef14", {
        en: "Bright bathroom with natural light",
        es: "Baño luminoso con luz natural",
        pt: "Banheiro iluminado com luz natural",
      }),
    ],
    shortDescription: {
      en: "A top-floor residence on Montevideo's Rambla with panoramic river views, a wraparound terrace and full-service building amenities.",
      es: "Un último piso sobre la Rambla de Montevideo con vista panorámica al río, terraza perimetral y un edificio con servicios completos.",
      pt: "Um último andar na Rambla de Montevidéu com vista panorâmica para o rio, terraço ao redor do apartamento e prédio com serviços completos.",
    },
    fullDescription: {
      en: [
        "Occupying the top floor of a well-maintained building on the Rambla de Pocitos, this penthouse offers some of the most open views in Montevideo, across the Río de la Plata and along the city's coastline.",
        "A generous living and dining room is wrapped by a terrace that runs the length of the apartment. The kitchen is fully equipped and connects to a service area. Three bedrooms, including a primary suite with a dressing room, are arranged away from the social spaces for privacy.",
        "Pocitos is one of the city's most walkable neighborhoods, with cafés, restaurants, schools and the beach all within a few blocks.",
      ],
      es: [
        "Ubicado en el último piso de un edificio muy bien mantenido sobre la Rambla de Pocitos, este penthouse ofrece algunas de las vistas más abiertas de Montevideo, sobre el Río de la Plata y a lo largo de la costa de la ciudad.",
        "Un amplio living comedor está rodeado por una terraza que recorre todo el apartamento. La cocina está completamente equipada y se conecta con un área de servicio. Tres dormitorios, entre ellos una suite principal con vestidor, se ubican separados de las áreas sociales para mayor privacidad.",
        "Pocitos es uno de los barrios más caminables de la ciudad, con cafés, restaurantes, colegios y la playa a pocas cuadras.",
      ],
      pt: [
        "Localizada no último andar de um prédio muito bem conservado na Rambla de Pocitos, esta cobertura oferece algumas das vistas mais abertas de Montevidéu, sobre o Rio da Prata e ao longo da orla da cidade.",
        "Uma ampla sala de estar e jantar é envolvida por um terraço que percorre todo o apartamento. A cozinha é totalmente equipada e se conecta a uma área de serviço. Três quartos, incluindo uma suíte principal com closet, ficam separados das áreas sociais para maior privacidade.",
        "Pocitos é um dos bairros mais caminháveis da cidade, com cafés, restaurantes, escolas e a praia a poucas quadras.",
      ],
    },
    type: "apartment",
    bedrooms: 3,
    bathrooms: 3,
    builtArea: 245,
    amenities: {
      en: ["Panoramic river views", "Wraparound terrace", "24-hour concierge", "Two parking spaces", "Storage unit", "Building gym", "Service area", "Walk to the beach"],
      es: ["Vista panorámica al río", "Terraza perimetral", "Portería 24 horas", "Dos cocheras", "Baulera", "Gimnasio en el edificio", "Área de servicio", "A pasos de la playa"],
      pt: ["Vista panorâmica para o rio", "Terraço ao redor", "Portaria 24 horas", "Duas vagas de garagem", "Depósito privativo", "Academia no prédio", "Área de serviço", "A poucos passos da praia"],
    },
    status: "available",
  },
  {
    id: "cpu-004",
    slug: "garden-residence-carrasco",
    title: {
      en: "Garden Residence in Carrasco",
      es: "Residencia con jardín en Carrasco",
      pt: "Residência com jardim em Carrasco",
    },
    location: { neighborhood: "Carrasco", city: "Montevideo", department: "Montevideo" },
    price: 1_390_000,
    mainImage: unsplash("1600585154340-be6161a56a0c", {
      en: "Contemporary family home opening onto a mature garden",
      es: "Casa familiar contemporánea abierta a un jardín consolidado",
      pt: "Casa familiar contemporânea aberta para um jardim maduro",
    }),
    gallery: [
      unsplash("1600607688969-a5bfcd646154", {
        en: "Rear façade and lawn beneath a large tree",
        es: "Fachada posterior y césped bajo un gran árbol",
        pt: "Fachada dos fundos e gramado sob uma grande árvore",
      }),
      unsplash("1600585154526-990dced4db0d", {
        en: "Entrance with timber cladding and dark façade",
        es: "Acceso con revestimiento de madera y fachada oscura",
        pt: "Entrada com revestimento de madeira e fachada escura",
      }),
      unsplash("1501183638710-841dd1904471", {
        en: "Living room with fireplace and clerestory windows",
        es: "Living con hogar y ventanas altas",
        pt: "Sala com lareira e janelas altas",
      }),
      unsplash("1540518614846-7eded433c457", {
        en: "Bedroom with artwork and bench seating",
        es: "Dormitorio con obra de arte y banqueta",
        pt: "Quarto com obra de arte e banqueta",
      }),
      unsplash("1493809842364-78817add7ffb", {
        en: "Family room with herringbone floors",
        es: "Sala familiar con piso de madera en espina de pez",
        pt: "Sala de família com piso de madeira em espinha de peixe",
      }),
    ],
    shortDescription: {
      en: "A contemporary family home on a tree-lined street in Carrasco, with a mature garden and close access to the airport and international schools.",
      es: "Una casa familiar contemporánea en una calle arbolada de Carrasco, con jardín consolidado y cerca del aeropuerto y de colegios internacionales.",
      pt: "Uma casa familiar contemporânea em uma rua arborizada de Carrasco, com jardim maduro e próxima ao aeroporto e a escolas internacionais.",
    },
    fullDescription: {
      en: [
        "Carrasco is Montevideo's most established residential neighborhood: leafy, quiet and close to the international airport and several bilingual schools. This contemporary home sits on a generous lot shaded by a mature tree.",
        "Living spaces are arranged on the ground floor around a fireplace lounge and an open kitchen, both connecting directly to the garden. Four bedrooms are located upstairs, including a primary suite with its own bathroom.",
        "Dark timber and render give the house a quiet, modern presence from the street, while large openings at the rear make the garden part of everyday life.",
      ],
      es: [
        "Carrasco es el barrio residencial más tradicional de Montevideo: arbolado, tranquilo y cerca del aeropuerto internacional y de varios colegios bilingües. Esta casa contemporánea se ubica en un amplio terreno a la sombra de un árbol añoso.",
        "Los espacios sociales se organizan en la planta baja en torno a un estar con hogar y una cocina abierta, ambos conectados directamente con el jardín. En la planta alta se ubican cuatro dormitorios, entre ellos una suite principal con baño propio.",
        "La madera oscura y el revoque le dan a la casa una presencia sobria y moderna desde la calle, mientras que las grandes aberturas hacia el fondo integran el jardín a la vida diaria.",
      ],
      pt: [
        "Carrasco é o bairro residencial mais tradicional de Montevidéu: arborizado, tranquilo e próximo ao aeroporto internacional e a várias escolas bilíngues. Esta casa contemporânea fica em um amplo terreno sombreado por uma árvore antiga.",
        "As áreas sociais ficam no térreo, em torno de um estar com lareira e de uma cozinha aberta, ambos ligados diretamente ao jardim. No andar superior estão quatro quartos, incluindo uma suíte principal com banheiro próprio.",
        "A madeira escura e o reboco dão à casa uma presença discreta e moderna vista da rua, enquanto as grandes aberturas nos fundos tornam o jardim parte do dia a dia.",
      ],
    },
    type: "house",
    bedrooms: 4,
    bathrooms: 4,
    builtArea: 385,
    landArea: 1_050,
    amenities: {
      en: ["Mature garden", "Fireplace", "Parrilla", "Garage for two cars", "Home office", "Near international schools", "15 minutes to the airport"],
      es: ["Jardín consolidado", "Hogar a leña", "Parrillero", "Garaje para dos autos", "Escritorio", "Cerca de colegios internacionales", "A 15 minutos del aeropuerto"],
      pt: ["Jardim maduro", "Lareira", "Churrasqueira", "Garagem para dois carros", "Escritório", "Perto de escolas internacionais", "A 15 minutos do aeroporto"],
    },
    status: "under-offer",
  },
  {
    id: "cpu-005",
    slug: "modern-apartment-punta-carretas",
    title: {
      en: "Modern Apartment in Punta Carretas",
      es: "Apartamento moderno en Punta Carretas",
      pt: "Apartamento moderno em Punta Carretas",
    },
    location: { neighborhood: "Punta Carretas", city: "Montevideo", department: "Montevideo" },
    price: 465_000,
    mainImage: unsplash("1545324418-cc1a3fa10c00", {
      en: "Contemporary residential building with dark façade and balconies",
      es: "Edificio residencial contemporáneo con fachada oscura y balcones",
      pt: "Prédio residencial contemporâneo com fachada escura e varandas",
    }),
    gallery: [
      unsplash("1502672260266-1c1ef2d93688", {
        en: "Living room with reading corner and plants",
        es: "Living con rincón de lectura y plantas",
        pt: "Sala com cantinho de leitura e plantas",
      }),
      unsplash("1586023492125-27b2c045efd7", {
        en: "Minimal living space with yellow armchair",
        es: "Estar minimalista con sillón amarillo",
        pt: "Estar minimalista com poltrona amarela",
      }),
      unsplash("1531835551805-16d864c8d311", {
        en: "Bedroom with framed prints and natural light",
        es: "Dormitorio con cuadros y luz natural",
        pt: "Quarto com quadros e luz natural",
      }),
    ],
    shortDescription: {
      en: "A well-designed two-bedroom apartment in a recent building, steps from the Rambla, the golf club and the Punta Carretas shopping district.",
      es: "Un apartamento de dos dormitorios bien diseñado, en un edificio reciente, a pasos de la Rambla, del club de golf y de la zona comercial de Punta Carretas.",
      pt: "Um apartamento de dois quartos bem projetado, em prédio recente, a poucos passos da Rambla, do clube de golfe e da região comercial de Punta Carretas.",
    },
    fullDescription: {
      en: [
        "Punta Carretas combines a residential atmosphere with easy access to the Rambla, the Montevideo Golf Club and one of the city's main shopping centers. This apartment occupies a high floor in a recently completed building.",
        "The layout is efficient and bright: an open living and dining space with balcony, a modern kitchen, two bedrooms and two bathrooms. Finishes are contemporary and low-maintenance, suitable both as a city residence and as a long-term rental.",
      ],
      es: [
        "Punta Carretas combina un ambiente residencial con fácil acceso a la Rambla, al Club de Golf de Montevideo y a uno de los principales centros comerciales de la ciudad. Este apartamento ocupa un piso alto en un edificio de construcción reciente.",
        "La distribución es eficiente y luminosa: living comedor integrado con balcón, cocina moderna, dos dormitorios y dos baños. Las terminaciones son contemporáneas y de bajo mantenimiento, ideales tanto para vivienda en la ciudad como para renta a largo plazo.",
      ],
      pt: [
        "Punta Carretas combina um ambiente residencial com fácil acesso à Rambla, ao Clube de Golfe de Montevidéu e a um dos principais shoppings da cidade. Este apartamento fica em um andar alto de um prédio recém-concluído.",
        "A planta é eficiente e iluminada: sala de estar e jantar integradas com varanda, cozinha moderna, dois quartos e dois banheiros. Os acabamentos são contemporâneos e de baixa manutenção, adequados tanto para moradia na cidade quanto para locação de longo prazo.",
      ],
    },
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    builtArea: 108,
    amenities: {
      en: ["Balcony", "Garage space", "Rooftop amenities", "Building security", "Near the Rambla", "Rental potential"],
      es: ["Balcón", "Cochera", "Amenities en azotea", "Seguridad en el edificio", "Cerca de la Rambla", "Potencial de renta"],
      pt: ["Varanda", "Vaga de garagem", "Área de lazer na cobertura", "Segurança no prédio", "Perto da Rambla", "Potencial de locação"],
    },
    status: "available",
  },
  {
    id: "cpu-006",
    slug: "hillside-pool-house-punta-ballena",
    title: {
      en: "Hillside Pool House in Punta Ballena",
      es: "Casa con piscina en la ladera de Punta Ballena",
      pt: "Casa com piscina na encosta de Punta Ballena",
    },
    location: { neighborhood: "Punta Ballena", city: "Punta del Este", department: "Maldonado" },
    price: 1_650_000,
    mainImage: unsplash("1512917774080-9991f1c4c750", {
      en: "White modern house with pool and palm planting",
      es: "Casa moderna blanca con piscina y palmeras",
      pt: "Casa moderna branca com piscina e palmeiras",
    }),
    gallery: [
      unsplash("1600573472550-8090b5e0745e", {
        en: "Glazed living space opening onto the pool",
        es: "Estar vidriado abierto hacia la piscina",
        pt: "Estar envidraçado aberto para a piscina",
      }),
      unsplash("1599809275671-b5942cabc7a2", {
        en: "Pool terrace and spa at sunset",
        es: "Terraza de la piscina y spa al atardecer",
        pt: "Terraço da piscina e spa ao pôr do sol",
      }),
      unsplash("1600566753190-17f0baa2a6c3", {
        en: "Timber-clad façade with landscaped approach",
        es: "Fachada revestida en madera con acceso parquizado",
        pt: "Fachada revestida em madeira com acesso paisagístico",
      }),
    ],
    shortDescription: {
      en: "A crisp modern home on the slopes of Punta Ballena, with a pool terrace oriented toward the sunset over the bay.",
      es: "Una casa moderna de líneas puras en las laderas de Punta Ballena, con una terraza con piscina orientada al atardecer sobre la bahía.",
      pt: "Uma casa moderna de linhas limpas nas encostas de Punta Ballena, com terraço e piscina voltados para o pôr do sol sobre a baía.",
    },
    fullDescription: {
      en: [
        "Punta Ballena is known for its dramatic headland and some of the best sunsets on the Uruguayan coast. This modern house is set into the hillside to make the most of that orientation.",
        "Glazed living spaces open directly onto the pool terrace, with a spa and outdoor lounge positioned for evening light. Four bedrooms are distributed across two levels, giving guests and family their own space.",
      ],
      es: [
        "Punta Ballena es conocida por su imponente punta rocosa y por algunos de los mejores atardeceres de la costa uruguaya. Esta casa moderna está implantada en la ladera para aprovechar al máximo esa orientación.",
        "Los espacios vidriados se abren directamente a la terraza de la piscina, con un spa y un estar exterior ubicados para disfrutar la luz de la tarde. Cuatro dormitorios se distribuyen en dos niveles, lo que da a huéspedes y familia su propio espacio.",
      ],
      pt: [
        "Punta Ballena é conhecida por seu imponente promontório e por alguns dos melhores pores do sol do litoral uruguaio. Esta casa moderna foi implantada na encosta para aproveitar ao máximo essa orientação.",
        "Os ambientes envidraçados se abrem diretamente para o terraço da piscina, com spa e estar externo posicionados para a luz do fim de tarde. Quatro quartos estão distribuídos em dois níveis, garantindo espaço próprio para hóspedes e família.",
      ],
    },
    type: "house",
    bedrooms: 4,
    bathrooms: 4,
    builtArea: 340,
    landArea: 2_000,
    amenities: {
      en: ["Swimming pool", "Spa", "Sunset views", "Outdoor lounge", "Parrilla", "Covered parking"],
      es: ["Piscina", "Spa", "Vista al atardecer", "Estar exterior", "Parrillero", "Estacionamiento techado"],
      pt: ["Piscina", "Spa", "Vista para o pôr do sol", "Estar externo", "Churrasqueira", "Garagem coberta"],
    },
    status: "available",
  },
  {
    id: "cpu-007",
    slug: "countryside-chacra-pueblo-garzon",
    title: {
      en: "Countryside Chacra near Pueblo Garzón",
      es: "Chacra de campo cerca de Pueblo Garzón",
      pt: "Chácara no campo perto de Pueblo Garzón",
    },
    location: { neighborhood: "Pueblo Garzón", city: "Garzón", department: "Maldonado" },
    price: 1_250_000,
    mainImage: unsplash("1500076656116-558758c991c1", {
      en: "Restored barn and silo at sunset in open countryside",
      es: "Galpón restaurado y silo al atardecer en pleno campo",
      pt: "Celeiro restaurado e silo ao pôr do sol em pleno campo",
    }),
    gallery: [
      unsplash("1558036117-15d82a90b9b1", {
        en: "Main house set in rolling pasture",
        es: "Casa principal rodeada de praderas onduladas",
        pt: "Casa principal cercada de pastagens onduladas",
      }),
      unsplash("1500382017468-9049fed747ef", {
        en: "Golden fields at sunset",
        es: "Campos dorados al atardecer",
        pt: "Campos dourados ao pôr do sol",
      }),
      unsplash("1470071459604-3b5ec3a7fe05", {
        en: "Rolling hills and sky over the countryside",
        es: "Lomadas y cielo abierto sobre el campo",
        pt: "Colinas e céu aberto sobre o campo",
      }),
    ],
    shortDescription: {
      en: "Twelve hectares of rolling countryside near the gastronomic village of Garzón, with a main residence and a restored barn.",
      es: "Doce hectáreas de campo ondulado cerca del pueblo gastronómico de Garzón, con casa principal y un galpón restaurado.",
      pt: "Doze hectares de campo ondulado perto do vilarejo gastronômico de Garzón, com casa principal e um celeiro restaurado.",
    },
    fullDescription: {
      en: [
        "The hinterland of Maldonado, between José Ignacio and the vineyards around Pueblo Garzón, has become one of Uruguay's most desirable areas for country properties. This chacra offers twelve hectares of open pasture with long views and complete privacy.",
        "The main residence has three bedrooms and three bathrooms, with living spaces that open onto a covered gallery facing west. A restored barn offers potential for a studio, guest accommodation or equestrian use, subject to the applicable permits.",
        "The property is a short drive from Garzón's restaurants and wineries and approximately thirty minutes from the beaches of José Ignacio.",
      ],
      es: [
        "El interior de Maldonado, entre José Ignacio y los viñedos que rodean Pueblo Garzón, se ha convertido en una de las zonas más buscadas de Uruguay para propiedades de campo. Esta chacra ofrece doce hectáreas de pradera abierta, con vistas lejanas y total privacidad.",
        "La casa principal tiene tres dormitorios y tres baños, con espacios sociales que se abren a una galería techada orientada al oeste. Un galpón restaurado ofrece potencial para taller, alojamiento de huéspedes o uso ecuestre, sujeto a los permisos correspondientes.",
        "La propiedad está a pocos minutos de los restaurantes y bodegas de Garzón y a unos treinta minutos de las playas de José Ignacio.",
      ],
      pt: [
        "O interior de Maldonado, entre José Ignacio e os vinhedos ao redor de Pueblo Garzón, tornou-se uma das regiões mais procuradas do Uruguai para propriedades rurais. Esta chácara oferece doze hectares de pastagem aberta, com vistas amplas e total privacidade.",
        "A casa principal tem três quartos e três banheiros, com áreas sociais que se abrem para uma varanda coberta voltada para o oeste. Um celeiro restaurado oferece potencial para ateliê, hospedagem de convidados ou uso equestre, sujeito às autorizações cabíveis.",
        "A propriedade fica a poucos minutos dos restaurantes e vinícolas de Garzón e a cerca de trinta minutos das praias de José Ignacio.",
      ],
    },
    type: "farm",
    bedrooms: 3,
    bathrooms: 3,
    builtArea: 290,
    landArea: 120_000,
    amenities: {
      en: ["Restored barn", "Covered gallery", "Open pasture", "Well water", "Fireplace", "Complete privacy", "Near Garzón vineyards"],
      es: ["Galpón restaurado", "Galería techada", "Pradera abierta", "Agua de pozo", "Hogar a leña", "Privacidad total", "Cerca de los viñedos de Garzón"],
      pt: ["Celeiro restaurado", "Varanda coberta", "Pastagem aberta", "Água de poço", "Lareira", "Privacidade total", "Perto dos vinhedos de Garzón"],
    },
    status: "available",
  },
  {
    id: "cpu-008",
    slug: "coastal-lot-laguna-garzon",
    title: {
      en: "Coastal Building Lot near Laguna Garzón",
      es: "Terreno costero cerca de Laguna Garzón",
      pt: "Terreno litorâneo perto da Laguna Garzón",
    },
    location: { neighborhood: "Laguna Garzón", city: "José Ignacio", department: "Maldonado" },
    price: 620_000,
    mainImage: unsplash("1507525428034-b723cf961d3e", {
      en: "Wide sandy beach and calm Atlantic at sunrise",
      es: "Amplia playa de arena y Atlántico en calma al amanecer",
      pt: "Ampla praia de areia e Atlântico calmo ao amanhecer",
    }),
    gallery: [
      unsplash("1519046904884-53103b34b206", {
        en: "Quiet beach with sun shelter and clear water",
        es: "Playa tranquila con sombrilla y agua clara",
        pt: "Praia tranquila com guarda-sol e água clara",
      }),
    ],
    shortDescription: {
      en: "A 5,200 m² building lot within walking distance of the beach, in the quiet coastal stretch between José Ignacio and Laguna Garzón.",
      es: "Un terreno de 5.200 m² para construir, a distancia caminable de la playa, en el tranquilo tramo costero entre José Ignacio y Laguna Garzón.",
      pt: "Um terreno de 5.200 m² para construir, a uma curta caminhada da praia, no tranquilo trecho litorâneo entre José Ignacio e a Laguna Garzón.",
    },
    fullDescription: {
      en: [
        "East of José Ignacio, the coast toward Laguna Garzón remains low-density and largely natural. This lot offers the opportunity to build a private residence in one of the area's most protected settings.",
        "The parcel totals 5,200 m², with a gentle slope toward the coast. Buyers should commission their own architectural and zoning review; our team can coordinate introductions to local architects and notaries.",
      ],
      es: [
        "Al este de José Ignacio, la costa hacia Laguna Garzón conserva baja densidad y un entorno mayormente natural. Este terreno ofrece la oportunidad de construir una residencia privada en uno de los entornos más protegidos de la zona.",
        "El predio tiene 5.200 m² en total, con una suave pendiente hacia la costa. Los compradores deberían encargar su propio estudio arquitectónico y normativo; nuestro equipo puede coordinar el contacto con arquitectos y escribanos locales.",
      ],
      pt: [
        "A leste de José Ignacio, o litoral em direção à Laguna Garzón mantém baixa densidade e um entorno em grande parte natural. Este terreno oferece a oportunidade de construir uma residência privada em um dos cenários mais preservados da região.",
        "O lote tem 5.200 m² no total, com leve declive em direção à costa. Os compradores devem contratar sua própria análise arquitetônica e urbanística; nossa equipe pode apresentar arquitetos e tabeliães locais.",
      ],
    },
    type: "land",
    landArea: 5_200,
    amenities: {
      en: ["Walking distance to the beach", "Low-density area", "Gentle slope", "Electricity at the lot line"],
      es: ["A distancia caminable de la playa", "Zona de baja densidad", "Pendiente suave", "Electricidad en el frente del terreno"],
      pt: ["A uma curta caminhada da praia", "Região de baixa densidade", "Declive suave", "Energia elétrica na divisa do terreno"],
    },
    status: "available",
  },
  {
    id: "cpu-009",
    slug: "corporate-office-floor-buceo",
    title: {
      en: "Corporate Office Floor in Buceo",
      es: "Planta de oficinas corporativas en Buceo",
      pt: "Andar corporativo em Buceo",
    },
    location: { neighborhood: "Buceo", city: "Montevideo", department: "Montevideo" },
    price: 1_950_000,
    mainImage: unsplash("1486406146926-c627a92ad1ab", {
      en: "Glass office towers seen from street level",
      es: "Torres de oficinas vidriadas vistas desde la calle",
      pt: "Torres de escritórios envidraçadas vistas da rua",
    }),
    gallery: [
      unsplash("1497366811353-6870744d04b2", {
        en: "Open-plan office floor with full-height glazing",
        es: "Planta de oficinas libre con vidriado de piso a techo",
        pt: "Andar de escritórios em planta livre com envidraçamento do piso ao teto",
      }),
      unsplash("1497366216548-37526070297c", {
        en: "Office corridor with meeting rooms and kitchenette",
        es: "Pasillo de oficinas con salas de reunión y kitchenette",
        pt: "Corredor de escritórios com salas de reunião e copa",
      }),
    ],
    shortDescription: {
      en: "A full office floor in a Class A tower in Buceo, Montevideo's main corporate district, suited to owner-occupiers or income investors.",
      es: "Una planta completa de oficinas en una torre clase A en Buceo, el principal distrito corporativo de Montevideo, ideal para uso propio o para inversión de renta.",
      pt: "Um andar inteiro de escritórios em uma torre classe A em Buceo, o principal distrito corporativo de Montevidéu, ideal para uso próprio ou investimento de renda.",
    },
    fullDescription: {
      en: [
        "Buceo concentrates many of Montevideo's corporate headquarters, international firms and financial services providers. This full floor is located in a Class A tower with professional management.",
        "The floor plate is open and column-efficient, with full-height glazing on all sides, existing meeting rooms and a kitchenette. It can be occupied as-is, reconfigured, or acquired as an income-producing asset.",
      ],
      es: [
        "Buceo concentra muchas de las sedes corporativas, firmas internacionales y empresas de servicios financieros de Montevideo. Esta planta completa se ubica en una torre clase A con administración profesional.",
        "La planta es libre y con pocas columnas, con vidriado de piso a techo en todos sus lados, salas de reunión existentes y una kitchenette. Puede ocuparse tal como está, reconfigurarse o adquirirse como activo de renta.",
      ],
      pt: [
        "Buceo concentra muitas das sedes corporativas, empresas internacionais e prestadores de serviços financeiros de Montevidéu. Este andar inteiro fica em uma torre classe A com administração profissional.",
        "A planta é livre e com poucos pilares, com envidraçamento do piso ao teto em todas as faces, salas de reunião existentes e copa. Pode ser ocupado como está, reconfigurado ou adquirido como ativo de renda.",
      ],
    },
    type: "commercial",
    bathrooms: 4,
    builtArea: 640,
    amenities: {
      en: ["Class A building", "Eight parking spaces", "Raised floors", "Central air conditioning", "Backup generator", "24/7 security", "Professional building management"],
      es: ["Edificio clase A", "Ocho cocheras", "Piso técnico", "Aire acondicionado central", "Generador de respaldo", "Seguridad 24/7", "Administración profesional"],
      pt: ["Edifício classe A", "Oito vagas de garagem", "Piso elevado", "Ar-condicionado central", "Gerador de emergência", "Segurança 24 horas", "Administração profissional"],
    },
    status: "available",
  },
];

/* -------------------------------------------------------------------------- */
/*  Queries                                                                   */
/* -------------------------------------------------------------------------- */

function localize(r: PropertyRecord, locale: Locale): Property {
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
