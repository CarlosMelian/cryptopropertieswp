export interface LegalSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDoc {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const legalDoc = (doc: LegalDoc) => doc;

export const en = {
  meta: {
    title: "CryptoProperties Uruguay | Crypto-Funded Real Estate Advisory",
    description:
      "CryptoProperties Uruguay is the bridge between crypto wealth and Uruguayan real estate. We help digital asset holders and international investors buy, sell, and invest in Uruguayan property — legally, securely, and compliantly.",
    ogDescription:
      "The bridge between crypto wealth and Uruguayan real estate. Legal, secure, and built for the modern investor.",
    twitterDescription: "The bridge between crypto wealth and Uruguayan real estate.",
    keywords: [
      "buy property in Uruguay with crypto",
      "crypto real estate Uruguay",
      "Bitcoin real estate Uruguay",
      "USDT property investment",
      "Uruguay tax residency",
      "Uruguay real estate for foreigners",
      "crypto wealth advisory",
    ],
    schemaDescription: "Advisory firm connecting cryptocurrency investors with Uruguayan real estate.",
  },

  common: {
    whatsapp: {
      consultation: "Hello CryptoProperties Uruguay, I would like to schedule a private consultation.",
      services: "Hello CryptoProperties Uruguay, I would like to learn more about your services.",
      service: "Hello CryptoProperties Uruguay, I would like more information about: {service}.",
      insights: "Hello CryptoProperties Uruguay, I would like to receive your educational content about investing in Uruguay with crypto.",
      article: "Hello CryptoProperties Uruguay, I am interested in this topic: {title}.",
    },
    nav: {
      services: "Services",
      whyUruguay: "Why Uruguay",
      process: "Process",
      insights: "Insights",
      properties: "Properties",
      consultation: "Private Consultation",
      toggleMenu: "Toggle menu",
      language: "Language",
    },
    footer: {
      tagline: "The bridge between crypto wealth and Uruguayan real estate. Legal, secure, and built for the modern investor.",
      location: "Montevideo, Uruguay",
      company: "Company",
      services: "Services",
      legal: "Legal",
      links: {
        about: "About Us",
        whyUruguay: "Why Uruguay",
        process: "Our Process",
        insights: "Insights",
        properties: "Properties",
        buyWithCrypto: "Buy With Crypto",
        sellToCrypto: "Sell To Crypto Investors",
        wealthAdvisory: "Crypto Wealth Advisory",
        residency: "Residency & Relocation",
        network: "Private Investor Network",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        compliance: "Compliance Disclosures",
        risk: "Risk Disclosure",
      },
      rights: "All rights reserved.",
      disclaimer:
        "CryptoProperties Uruguay is an advisory firm and does not provide investment, legal, or tax advice. All transactions are subject to independent legal, notarial, and tax review.",
    },
    notFound: {
      eyebrow: "404",
      title: "This page could not be found",
      text: "The page you are looking for may have moved or no longer exists.",
      home: "Back To Homepage",
      properties: "Browse Properties",
    },
  },

  home: {
    hero: {
      eyebrow: "Private Wealth Advisory · Montevideo",
      titleLead: "Transform Crypto Wealth Into",
      titleHighlight: "Real Estate Ownership",
      subtitle: "Buy, sell, and invest in premium Uruguayan real estate using capital generated through cryptocurrency.",
      credentials: ["Legal", "Secure", "Compliant", "Built for the modern investor"],
      cards: [
        { label: "Accepted Assets", value: "BTC · ETH · USDT · USDC" },
        { label: "Avg. Closing Timeline", value: "45–60 Days" },
        { label: "Every Transaction", value: "AML & Source-of-Funds Verified" },
      ],
      ctaPrimary: "Schedule a Private Consultation",
      ctaSecondary: "Discover Our Services",
    },
    trust: {
      eyebrow: "Trust & Credibility",
      title: "Why investors trust us with capital that originated on-chain",
      items: [
        {
          title: "Real Estate Expertise",
          description:
            "Deep knowledge of Uruguay's residential, coastal, and agricultural markets, built through direct relationships with developers, brokers, and title offices.",
        },
        {
          title: "Crypto Expertise",
          description:
            "Fluent in digital assets. We structure transactions for capital originating in Bitcoin, USDT, and other major cryptocurrencies, with full visibility into provenance.",
        },
        {
          title: "Legal Support",
          description:
            "Independent Uruguayan attorneys review every contract, title, and transfer, so your purchase stands on solid legal ground from day one.",
        },
        {
          title: "Notarial Support",
          description:
            "Property transfers in Uruguay require a public notary. We coordinate directly with notarial offices to keep your closing accurate and on schedule.",
        },
        {
          title: "Compliance First",
          description:
            "Every transaction is structured to meet Uruguayan AML and tax-reporting requirements, with documentation your bank or advisor can rely on.",
        },
        {
          title: "International Investors",
          description:
            "Built for buyers who aren't in Montevideo. Remote due diligence, digital coordination, and clear communication across time zones.",
        },
      ],
      stats: ["Capital Facilitated (USD)", "International Clients", "Transactions Structured", "Countries Served"],
      illustrative: "Illustrative figures",
    },
    services: {
      eyebrow: "Services",
      title: "A full advisory practice, built around one transaction type",
      learnMore: "Learn more",
      items: [
        {
          tag: "Acquisition",
          title: "Buy Real Estate Using Crypto",
          description:
            "We structure the path from digital asset to deeded property, coordinating fund conversion, source-of-funds documentation, and closing under Uruguayan law.",
        },
        {
          tag: "Disposition",
          title: "Sell Property To Crypto Investors",
          description:
            "List your property to a network of qualified, crypto-funded buyers, with our team managing valuation, buyer vetting, and settlement.",
        },
        {
          tag: "Advisory",
          title: "Crypto Wealth Advisory",
          description:
            "Strategic guidance on converting a portion of digital holdings into tangible, title-backed assets as part of a broader wealth plan.",
        },
        {
          tag: "Opportunities",
          title: "Investment Opportunities",
          description:
            "Access curated opportunities across residential, coastal, and income-producing property, vetted for title clarity and long-term value.",
        },
        {
          tag: "Relocation",
          title: "Residency & Relocation Support",
          description:
            "Guidance through Uruguay's tax residency pathways, paired with practical relocation support for you and your family.",
        },
        {
          tag: "Network",
          title: "Private Investor Network",
          description:
            "A by-introduction circle of crypto-native buyers, sellers, and family offices, where opportunities are shared before they reach the open market.",
        },
        {
          tag: "Horizon",
          title: "Future Tokenized Real Estate Solutions",
          description:
            "We're building the legal and technical groundwork for fractional, tokenized ownership of Uruguayan property, for investors who think in years.",
        },
      ],
    },
    whyUruguay: {
      eyebrow: "Why Uruguay",
      title: "A market built on stability, not speculation",
      items: [
        {
          title: "Political Stability",
          description:
            "Uruguay has held free, uninterrupted democratic elections for over four decades, with peaceful transfers of power across the political spectrum.",
        },
        {
          title: "Strong Property Rights",
          description:
            "Foreign nationals can own property with the same rights as Uruguayan citizens. No special permits, no restricted zones, no exceptions.",
        },
        {
          title: "Dollarized Real Estate Market",
          description:
            "Most property in Uruguay is priced, sold, and financed in U.S. dollars, removing local currency risk from your investment.",
        },
        {
          title: "Tax Advantages",
          description:
            "New tax residents benefit from temporary exemptions on foreign-source income, among the more competitive regimes in Latin America.",
        },
        {
          title: "International Accessibility",
          description:
            "A short flight from Buenos Aires and São Paulo, with growing direct connections from North America and Europe.",
        },
        {
          title: "Quality of Life",
          description:
            "Calm cities, low crime relative to the region, reliable infrastructure, and a culture that has long welcomed newcomers.",
        },
      ],
    },
    process: {
      eyebrow: "How It Works",
      title: "From private consultation to recorded title",
      steps: [
        {
          title: "Private Consultation",
          description:
            "A confidential conversation about your goals, your assets, and the kind of property that fits your plan.",
        },
        {
          title: "Compliance & Documentation",
          description:
            "Our legal team prepares the source-of-funds, AML, and tax documentation your purchase requires, before any offer is made.",
        },
        {
          title: "Property Selection & Structuring",
          description:
            "We identify the right property and structure the transaction, including how your crypto-funded capital will be converted and deployed.",
        },
        {
          title: "Closing & Ownership",
          description:
            "A Uruguayan notary executes the transfer. You receive title: documented, compliant, and fully yours.",
        },
      ],
    },
    philosophy: {
      eyebrow: "Investment Philosophy",
      title: "Beyond Real Estate. Building Long-Term Wealth.",
      intro:
        "We see real estate as one piece of a broader approach to wealth that began on-chain. Every recommendation is grounded in preservation and structure, not speculation.",
      items: [
        {
          title: "Capital Preservation",
          description:
            "Real property has stood as a store of value for centuries. For wealth that originated in a volatile asset class, it offers ballast.",
        },
        {
          title: "Diversification",
          description:
            "A single asset class, however it has performed, is a concentration. We help move a portion of digital wealth into a different risk profile entirely.",
        },
        {
          title: "Tangible Assets",
          description:
            "A blockchain entry and a deed are both forms of property. One you can also live in, rent out, or pass to your children.",
        },
        {
          title: "Strategic Opportunities",
          description:
            "Uruguay rewards patience: dollarized pricing, clear title, and a market that moves on fundamentals rather than speculation.",
        },
        {
          title: "Future Tokenization Vision",
          description:
            "We're preparing for a market where ownership itself moves on-chain. Today, that means rigorous legal structuring. Tomorrow, it may mean fractional title.",
        },
      ],
      disclaimer:
        "This section describes our investment approach, not a forecast or guarantee of performance. CryptoProperties Uruguay does not provide investment, legal, or tax advice.",
    },
    testimonials: {
      eyebrow: "Client Perspectives",
      title: "Trusted across four continents",
      items: [
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
      ],
    },
    insights: {
      eyebrow: "Insights",
      title: "Education for the modern investor",
      viewAll: "View All Insights",
      readArticle: "Read article",
      items: [
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
      ],
    },
    finalCta: {
      title: "Your Crypto Deserves Real-World Assets",
      text: "Connect with our team and discover how to safely transform digital wealth into real estate opportunities in Uruguay.",
      cta: "Book A Private Consultation",
    },
  },

  properties: {
    meta: {
      title: "Properties For Sale In Uruguay",
      description:
        "A curated portfolio of premium Uruguayan real estate: coastal villas in Punta del Este and José Ignacio, Montevideo residences, countryside chacras and commercial assets. Acquisitions with cryptocurrency guided case by case.",
      ogDescription: "Curated premium real estate across Punta del Este, José Ignacio and Montevideo.",
    },
    hero: {
      eyebrow: "Property Portfolio",
      titleLead: "Exceptional Properties",
      titleHighlight: "Across Uruguay",
      subtitle:
        "A curated selection of coastal villas, city residences, countryside estates and commercial assets, each reviewed by our team for title clarity and long-term value.",
    },
    offMarket: {
      badge: "Private Investor Network",
      title: "Looking for something not listed here?",
      text: "Many of the most interesting opportunities in Uruguay never reach the open market. Tell us what you are looking for and we will share relevant off-market properties following an initial consultation.",
      cta: "Request Off-Market Access",
      emailSubject: "Off-market property search",
    },
    types: {
      apartment: "Apartment",
      house: "House",
      land: "Land",
      farm: "Farm & Chacra",
      commercial: "Commercial",
    },
    status: {
      available: "Available",
      "under-offer": "Under Offer",
      sold: "Sold",
    },
    filters: {
      ariaLabel: "Filter properties",
      search: "Search",
      searchPlaceholder: "Location or property name",
      clearSearch: "Clear search",
      type: "Property type",
      allTypes: "All types",
      minPrice: "Min price",
      noMin: "No min",
      maxPrice: "Max price",
      noMax: "No max",
      sortBy: "Sort by",
      sortFeatured: "Featured",
      sortPriceAsc: "Lowest price",
      sortPriceDesc: "Highest price",
      clearAll: "Clear all filters",
    },
    results: {
      one: "property",
      other: "properties",
      match: "match your criteria",
      inPortfolio: "in our portfolio",
      pricesInUsd: "Prices in USD",
    },
    empty: {
      title: "No properties match these filters",
      text: "Try widening your price range or searching a different area. Our team also has access to off-market opportunities not listed here.",
    },
    card: {
      askingPrice: "Asking price",
      viewProperty: "View Property",
      bedroomsShort: "bd",
      bathroomsShort: "ba",
    },
    facts: {
      type: "Type",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      builtArea: "Built area",
      landArea: "Land area",
    },
    detail: {
      allProperties: "All Properties",
      breadcrumb: "Breadcrumb",
      keyFacts: "Key facts",
      about: "About the property",
      amenities: "Features & Amenities",
      metaSuffix: "{type} in {location}.",
      relatedEyebrow: "Continue exploring",
      relatedTitle: "You may also consider",
      viewAll: "View all properties",
    },
    gallery: {
      viewAll: "View all {count} photos",
      openPhoto: "Open photo {n}: {alt}",
      dialogLabel: "{title}: photo gallery",
      close: "Close gallery",
      previous: "Previous photo",
      next: "Next photo",
      showPhoto: "Show photo {n}",
    },
    contact: {
      ariaLabel: "Contact about this property",
      title: "Interested in this property?",
      text: "Request the full information pack, arrange a private viewing or a video walkthrough with one of our advisors.",
      requestInfo: "Request Information",
      whatsapp: "Contact via WhatsApp",
      note: "A CryptoProperties Uruguay advisor will contact you personally. Your inquiry is handled confidentially.",
      whatsappMessage: "Hello CryptoProperties Uruguay, I'm interested in \"{title}\" ({price}).\n{url}",
    },
    crypto: {
      eyebrow: "Crypto Acquisitions",
      title: "Interested in purchasing this property with cryptocurrency?",
      text: "Our team can guide you through the process of acquiring real estate in Uruguay using cryptocurrency, subject to applicable legal and compliance requirements.",
      steps: [
        {
          title: "Source-of-funds review",
          text: "We prepare the documentation that traces your digital assets, as required by Uruguayan AML regulations.",
        },
        {
          title: "Settlement path",
          text: "Where the seller does not accept crypto directly, we coordinate a compliant conversion and settlement.",
        },
        {
          title: "Legal & notarial closing",
          text: "Independent attorneys and a Uruguayan notary review the contract and execute the transfer.",
        },
      ],
      disclaimer:
        "Not every seller accepts cryptocurrency directly. Payment arrangements are coordinated on a case-by-case basis and are subject to the seller's agreement and regulatory review.",
      cta: "Discuss a Crypto Purchase",
    },
    inquiry: {
      information: {
        eyebrow: "Request Information",
        heading: "Interested in this property?",
        message: "",
        submit: "Send Request",
      },
      crypto: {
        eyebrow: "Crypto Purchase Inquiry",
        heading: "Discuss a crypto purchase",
        message: "I would like to understand how I could acquire this property using cryptocurrency.",
        submit: "Send Inquiry",
      },
      received: "Request received",
      close: "Close",
      fullName: "Full name",
      email: "Email",
      phone: "Phone / WhatsApp",
      phonePlaceholder: "+1 555 123 4567",
      phoneHint: "Include your country code, e.g. +1 555 123 4567",
      preferredMethod: "Preferred contact method",
      methods: { email: "Email", phone: "Phone call", whatsapp: "WhatsApp" },
      methodPhrases: { email: "by email", phone: "by phone", whatsapp: "on WhatsApp" },
      message: "Message",
      optional: "(optional)",
      messagePlaceholder: "Questions, preferred viewing dates, or anything we should know.",
      noticeBefore:
        "A member of the CryptoProperties Uruguay team will contact you personally to follow up on this inquiry. Your details are handled confidentially in line with our",
      privacyLink: "Privacy Policy",
      noticeAfter: ".",
      sending: "Sending…",
      thankYou: "Thank you",
      successText: "A CryptoProperties Uruguay advisor will contact you {method} regarding",
      emailUs: "Email us directly at {email}",
      errors: {
        generic: "We could not send your request.",
        invalid_request: "Invalid request.",
        invalid_name: "Please enter your full name.",
        invalid_email: "Please enter a valid email address.",
        invalid_phone: "Please enter a valid phone number, including country code.",
        invalid_method: "Please choose a preferred contact method.",
        invalid_intent: "Invalid inquiry type.",
        message_too_long: "Your message is too long (2,000 characters max).",
        property_not_found: "This property could not be found.",
        unavailable: "Our inquiry service is temporarily unavailable.",
        delivery_failed: "We could not send your request right now.",
      },
    },
    mobileBar: {
      askingPrice: "Asking price",
      cta: "Request Information",
    },
  },

  legal: {
    common: {
      eyebrow: "Legal",
      back: "Back To Homepage",
      lastUpdated: "Last updated: {date}",
      notice:
        "This page is placeholder template content prepared for design and structural purposes only. It does not constitute legal, tax, or investment advice and must be reviewed and finalized by a licensed Uruguayan attorney and compliance professional before this site is published or used to onboard real clients.",
      questions: "Questions about this policy? Contact us at",
    },
    privacy: legalDoc({
      title: "Privacy Policy",
      description: "How CryptoProperties Uruguay collects, uses, and protects client information.",
      lastUpdated: "June 2026",
      sections: [
        {
          paragraphs: [
            "CryptoProperties Uruguay (\"we,\" \"us,\" or \"the Company\") respects the privacy of every visitor, prospective client, and verified client who interacts with our website and advisory services. This policy outlines, at a high level, the categories of information we collect, how it is used, and the choices available to you.",
          ],
        },
        {
          heading: "Information We Collect",
          paragraphs: ["In the course of providing advisory services, we may collect:"],
          list: [
            "Contact details you provide directly, such as name, email address, and phone number.",
            "Information shared during private consultations, including investment objectives and general financial background.",
            "Identity verification and source-of-funds documentation required for compliance purposes.",
            "Technical information such as browser type and general usage analytics from our website.",
          ],
        },
        {
          heading: "How We Use Your Information",
          paragraphs: [
            "Information collected is used to provide and improve our advisory services, communicate with prospective and existing clients, fulfill anti-money-laundering and regulatory obligations, and coordinate with the independent legal, notarial, and tax professionals involved in a transaction.",
          ],
        },
        {
          heading: "Sharing of Information",
          paragraphs: [
            "We do not sell personal information. Information may be shared with independent attorneys, notaries, banks, or regulatory bodies strictly as necessary to facilitate a transaction or satisfy a legal obligation, and only with your knowledge as part of the engagement.",
          ],
        },
        {
          heading: "Data Security",
          paragraphs: [
            "We apply administrative and technical safeguards designed to protect client information, including restricted internal access to sensitive documentation and encrypted storage of identity verification records.",
          ],
        },
        {
          heading: "Your Rights",
          paragraphs: [
            "You may request access to, correction of, or deletion of your personal information, subject to our regulatory recordkeeping obligations, by contacting us using the details below.",
          ],
        },
      ],
    }),
    terms: legalDoc({
      title: "Terms of Service",
      description: "The terms governing your use of the CryptoProperties Uruguay website and advisory services.",
      lastUpdated: "June 2026",
      sections: [
        {
          paragraphs: [
            "These Terms of Service govern your access to and use of the CryptoProperties Uruguay website and the advisory services described on it. By using this website, you agree to the terms outlined below.",
          ],
        },
        {
          heading: "Nature of Our Services",
          paragraphs: [
            "CryptoProperties Uruguay acts as an advisory intermediary connecting digital asset holders with the Uruguayan real estate market. We are not a licensed real estate brokerage, law firm, notarial office, bank, or registered investment advisor. Property transactions, currency conversion, and legal title transfer are carried out by independent, appropriately licensed third parties.",
          ],
        },
        {
          heading: "No Investment, Legal, or Tax Advice",
          paragraphs: [
            "Nothing on this website or communicated during a consultation should be construed as investment, legal, financial, or tax advice. Clients are responsible for obtaining independent professional advice before entering into any transaction.",
          ],
        },
        {
          heading: "Eligibility and Verification",
          paragraphs: [
            "Use of our advisory services and access to our private property portfolio is conditioned on completion of an identity and source-of-funds verification process, consistent with applicable anti-money-laundering regulations in Uruguay.",
          ],
        },
        {
          heading: "Illustrative Information",
          paragraphs: [
            "Statistics, figures, and case examples presented on this website are illustrative in nature unless explicitly stated otherwise, and do not constitute a guarantee of any particular outcome, timeline, or result.",
          ],
        },
        {
          heading: "Limitation of Liability",
          paragraphs: [
            "To the maximum extent permitted by applicable law, CryptoProperties Uruguay shall not be liable for indirect, incidental, or consequential damages arising from use of this website or reliance on information presented here.",
          ],
        },
        {
          heading: "Governing Law",
          paragraphs: [
            "These terms shall be interpreted in accordance with the laws of the Oriental Republic of Uruguay, without regard to conflict-of-law principles.",
          ],
        },
      ],
    }),
    risk: legalDoc({
      title: "Risk Disclosure",
      description: "Key risks associated with converting digital assets into Uruguayan real estate.",
      lastUpdated: "June 2026",
      sections: [
        {
          paragraphs: [
            "Converting digital assets into real estate involves risks distinct from either asset class alone. This disclosure summarizes key considerations clients should understand and discuss with independent professional advisors before proceeding.",
          ],
        },
        {
          heading: "Market and Valuation Risk",
          paragraphs: [
            "The value of cryptocurrency can be highly volatile between the time a transaction is initiated and the time funds are converted and deployed. Real estate values in Uruguay, while historically stable, are also subject to market fluctuation and are not guaranteed to appreciate.",
          ],
        },
        {
          heading: "No Guarantee of Returns",
          paragraphs: [
            "CryptoProperties Uruguay does not promise, project, or guarantee any rate of return, rental yield, or appreciation on real estate acquired through our advisory services. References to investment philosophy on this website describe an approach, not a forecast.",
          ],
        },
        {
          heading: "Regulatory and Tax Risk",
          paragraphs: [
            "Cryptocurrency and cross-border real estate regulations are subject to change in Uruguay and in clients' home jurisdictions. Clients are responsible for understanding and complying with applicable tax reporting obligations in their country of residence and citizenship.",
          ],
        },
        {
          heading: "Liquidity Risk",
          paragraphs: [
            "Real estate is a comparatively illiquid asset. Clients should not treat property acquired through our services as readily convertible back into cash or digital assets on short notice.",
          ],
        },
        {
          heading: "Third-Party Dependencies",
          paragraphs: [
            "Transactions depend on the performance of independent banks, exchanges, attorneys, and notaries who are not employees of CryptoProperties Uruguay. We exercise care in selecting partners but cannot guarantee their performance or timelines.",
          ],
        },
        {
          paragraphs: [
            "Clients are strongly encouraged to consult independent legal, financial, and tax professionals in both Uruguay and their home jurisdiction before proceeding with any transaction.",
          ],
        },
      ],
    }),
    compliance: legalDoc({
      title: "Compliance Disclosures",
      description: "Our approach to anti-money-laundering, source-of-funds verification, and regulatory compliance.",
      lastUpdated: "June 2026",
      sections: [
        {
          paragraphs: [
            "Bridging digital assets and real-world property carries unique regulatory responsibility. CryptoProperties Uruguay structures every engagement around anti-money-laundering (AML) and know-your-customer (KYC) principles applicable under Uruguayan law.",
          ],
        },
        {
          heading: "Source-of-Funds Verification",
          paragraphs: [
            "Before any transaction is structured, clients are required to provide documentation establishing the legitimate origin of the digital assets involved, which may include exchange records, wallet history, and identity verification consistent with applicable regulation.",
          ],
        },
        {
          heading: "Currency Conversion",
          paragraphs: [
            "Digital assets are converted to fiat currency through licensed, regulated exchange and banking partners prior to use in a property transaction. CryptoProperties Uruguay does not itself custody client funds or digital assets at any point in the process.",
          ],
        },
        {
          heading: "Independent Legal and Notarial Review",
          paragraphs: [
            "All property transactions are reviewed and executed by independent Uruguayan attorneys and notaries, consistent with standard practice for real estate transfers in Uruguay, ensuring title, registry, and tax obligations are properly satisfied.",
          ],
        },
        {
          heading: "Ongoing Monitoring",
          paragraphs: [
            "Engagements are subject to ongoing review consistent with applicable AML obligations, and CryptoProperties Uruguay reserves the right to decline or terminate an engagement where source-of-funds documentation cannot be satisfactorily established.",
          ],
        },
        {
          heading: "Reporting Obligations",
          paragraphs: [
            "Where required by law, CryptoProperties Uruguay and its partner institutions comply with applicable reporting obligations to relevant Uruguayan regulatory and financial intelligence authorities.",
          ],
        },
      ],
    }),
  },
};

export type Dictionary = typeof en;
export type CommonDict = Dictionary["common"];
export type PropertiesDict = Dictionary["properties"];
export type HomeDict = Dictionary["home"];
