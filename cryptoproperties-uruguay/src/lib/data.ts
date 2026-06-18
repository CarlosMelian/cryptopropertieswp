import {
  Building2,
  Coins,
  Scale,
  Stamp,
  ShieldCheck,
  Globe2,
  Wallet,
  Home,
  LineChart,
  Building,
  Plane,
  Network,
  Link2,
  Landmark,
  ScrollText,
  CircleDollarSign,
  Banknote,
  Sun,
  Layers,
  Gem,
  Compass,
} from "lucide-react";
import type {
  TrustItem,
  StatItem,
  ServiceItem,
  AdvantageItem,
  ProcessStep,
  Testimonial,
  Article,
} from "@/types";

export const trustItems: TrustItem[] = [
  {
    icon: Building2,
    title: "Real Estate Expertise",
    description:
      "Deep knowledge of Uruguay's residential, coastal, and agricultural markets, built through direct relationships with developers, brokers, and title offices.",
  },
  {
    icon: Coins,
    title: "Crypto Expertise",
    description:
      "Fluent in digital assets. We structure transactions for capital originating in Bitcoin, USDT, and other major cryptocurrencies, with full visibility into provenance.",
  },
  {
    icon: Scale,
    title: "Legal Support",
    description:
      "Independent Uruguayan attorneys review every contract, title, and transfer, so your purchase stands on solid legal ground from day one.",
  },
  {
    icon: Stamp,
    title: "Notarial Support",
    description:
      "Property transfers in Uruguay require a public notary. We coordinate directly with notarial offices to keep your closing accurate and on schedule.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance First",
    description:
      "Every transaction is structured to meet Uruguayan AML and tax-reporting requirements, with documentation your bank or advisor can rely on.",
  },
  {
    icon: Globe2,
    title: "International Investors",
    description:
      "Built for buyers who aren't in Montevideo. Remote due diligence, digital coordination, and clear communication across time zones.",
  },
];

export const statItems: StatItem[] = [
  { value: "140", suffix: "M+", label: "Capital Facilitated (USD)" },
  { value: "380", suffix: "+", label: "International Clients" },
  { value: "210", suffix: "+", label: "Transactions Structured" },
  { value: "24", suffix: "", label: "Countries Served" },
];

export const serviceItems: (ServiceItem & { tag: string })[] = [
  {
    icon: Wallet,
    tag: "Acquisition",
    title: "Buy Real Estate Using Crypto",
    description:
      "We structure the path from digital asset to deeded property, coordinating fund conversion, source-of-funds documentation, and closing under Uruguayan law.",
  },
  {
    icon: Home,
    tag: "Disposition",
    title: "Sell Property To Crypto Investors",
    description:
      "List your property to a network of qualified, crypto-funded buyers, with our team managing valuation, buyer vetting, and settlement.",
  },
  {
    icon: LineChart,
    tag: "Advisory",
    title: "Crypto Wealth Advisory",
    description:
      "Strategic guidance on converting a portion of digital holdings into tangible, title-backed assets as part of a broader wealth plan.",
  },
  {
    icon: Building,
    tag: "Opportunities",
    title: "Investment Opportunities",
    description:
      "Access curated opportunities across residential, coastal, and income-producing property, vetted for title clarity and long-term value.",
  },
  {
    icon: Plane,
    tag: "Relocation",
    title: "Residency & Relocation Support",
    description:
      "Guidance through Uruguay's tax residency pathways, paired with practical relocation support for you and your family.",
  },
  {
    icon: Network,
    tag: "Network",
    title: "Private Investor Network",
    description:
      "A by-introduction circle of crypto-native buyers, sellers, and family offices, where opportunities are shared before they reach the open market.",
  },
  {
    icon: Link2,
    tag: "Horizon",
    title: "Future Tokenized Real Estate Solutions",
    description:
      "We're building the legal and technical groundwork for fractional, tokenized ownership of Uruguayan property, for investors who think in years.",
  },
];

export const advantageItems: AdvantageItem[] = [
  {
    icon: Landmark,
    title: "Political Stability",
    description:
      "Uruguay has held free, uninterrupted democratic elections for over four decades, with peaceful transfers of power across the political spectrum.",
  },
  {
    icon: ScrollText,
    title: "Strong Property Rights",
    description:
      "Foreign nationals can own property with the same rights as Uruguayan citizens. No special permits, no restricted zones, no exceptions.",
  },
  {
    icon: CircleDollarSign,
    title: "Dollarized Real Estate Market",
    description:
      "Most property in Uruguay is priced, sold, and financed in U.S. dollars, removing local currency risk from your investment.",
  },
  {
    icon: Banknote,
    title: "Tax Advantages",
    description:
      "New tax residents benefit from temporary exemptions on foreign-source income, among the more competitive regimes in Latin America.",
  },
  {
    icon: Plane,
    title: "International Accessibility",
    description:
      "A short flight from Buenos Aires and São Paulo, with growing direct connections from North America and Europe.",
  },
  {
    icon: Sun,
    title: "Quality of Life",
    description:
      "Calm cities, low crime relative to the region, reliable infrastructure, and a culture that has long welcomed newcomers.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Private Consultation",
    description:
      "A confidential conversation about your goals, your assets, and the kind of property that fits your plan.",
  },
  {
    index: "02",
    title: "Compliance & Documentation",
    description:
      "Our legal team prepares the source-of-funds, AML, and tax documentation your purchase requires, before any offer is made.",
  },
  {
    index: "03",
    title: "Property Selection & Structuring",
    description:
      "We identify the right property and structure the transaction, including how your crypto-funded capital will be converted and deployed.",
  },
  {
    index: "04",
    title: "Closing & Ownership",
    description:
      "A Uruguayan notary executes the transfer. You receive title: documented, compliant, and fully yours.",
  },
];

export const philosophyItems = [
  {
    icon: ShieldCheck,
    title: "Capital Preservation",
    description:
      "Real property has stood as a store of value for centuries. For wealth that originated in a volatile asset class, it offers ballast.",
  },
  {
    icon: Layers,
    title: "Diversification",
    description:
      "A single asset class, however it has performed, is a concentration. We help move a portion of digital wealth into a different risk profile entirely.",
  },
  {
    icon: Gem,
    title: "Tangible Assets",
    description:
      "A blockchain entry and a deed are both forms of property. One you can also live in, rent out, or pass to your children.",
  },
  {
    icon: Compass,
    title: "Strategic Opportunities",
    description:
      "Uruguay rewards patience: dollarized pricing, clear title, and a market that moves on fundamentals rather than speculation.",
  },
  {
    icon: Link2,
    title: "Future Tokenization Vision",
    description:
      "We're preparing for a market where ownership itself moves on-chain. Today, that means rigorous legal structuring. Tomorrow, it may mean fractional title.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "I'd held Bitcoin since 2017 and never found a way to deploy it into something my family could actually live in. The team handled the conversion, the legal work, and the closing without a single surprise.",
    name: "Martín R.",
    role: "Private Investor",
    location: "Buenos Aires, Argentina",
  },
  {
    quote:
      "What impressed me was the paperwork, not the property. Every dollar of source-of-funds was documented before we even looked at listings. That's what I needed to sleep at night.",
    name: "Camila S.",
    role: "Founder, Logistics Company",
    location: "São Paulo, Brazil",
  },
  {
    quote:
      "I run my company from wherever I have decent WiFi. The entire process ran remotely, notarized signing included, while I never left my apartment.",
    name: "Daniel K.",
    role: "Remote Tech Founder",
    location: "Based between Lisbon & Montevideo",
  },
  {
    quote:
      "We allocate a portion of client portfolios to real assets sourced from digital wealth. This is the most fluent team we've found in Uruguay, equally fluent in legal structure and crypto.",
    name: "Family Office Principal",
    role: "Private Wealth Management",
    location: "Miami, United States",
  },
];

export const articles: Article[] = [
  {
    category: "Acquisition Guide",
    title: "How To Buy Property In Uruguay Using Crypto",
    excerpt:
      "A step-by-step look at converting digital assets into a documented Uruguayan property purchase, from source-of-funds to closing table.",
    readTime: "8 min read",
  },
  {
    category: "Market Insight",
    title: "Why International Investors Are Choosing Uruguay",
    excerpt:
      "Political stability, dollarized pricing, and equal property rights for foreigners are reshaping who buys real estate here, and why.",
    readTime: "6 min read",
  },
  {
    category: "Compliance",
    title: "Understanding Crypto Wealth Compliance",
    excerpt:
      "What AML reporting, source-of-funds documentation, and tax disclosure actually require when your capital originated on-chain.",
    readTime: "10 min read",
  },
  {
    category: "Outlook",
    title: "The Future Of Tokenized Real Estate",
    excerpt:
      "A practical look at how fractional, blockchain-based property ownership could change who gets to invest in real estate, and how.",
    readTime: "7 min read",
  },
];
