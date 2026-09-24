import type { Metadata } from "next"
import type { Lang } from "@/lib/site"
import { LANGS, SITE_URL, absoluteUrl, ogLocale } from "@/lib/i18n"
import { contacts } from "@/lib/site"

type Page = "home" | "contact"

const copy: Record<Page, Record<Lang, { title: string; description: string }>> = {
  home: {
    sk: {
      title: "E&P Industry | Elektrikári, mechanici a mechatronici pre priemysel",
      description:
        "Skúsení elektrikári, mechanici a mechatronici pre priemyselné projekty na Slovensku aj v Európe. Montáž liniek, zapájanie rozvádzačov, oceľové konštrukcie.",
    },
    en: {
      title: "E&P Industry | Industrial electricians, mechanics & technicians",
      description:
        "Experienced electricians, mechanics and mechatronics technicians for industrial projects across Europe. Line assembly, cabinet wiring, steel structures.",
    },
    de: {
      title: "E&P Industry | Montageteams: Elektriker, Mechaniker, Mechatroniker",
      description:
        "Erfahrene Elektriker, Mechaniker und Mechatroniker für Industrieprojekte in ganz Europa. Linienmontage, Schaltschrankverdrahtung, Stahlbau und Regalsysteme.",
    },
  },
  contact: {
    sk: {
      title: "Kontakt a dopyt | E&P Industry",
      description:
        "Potrebujete elektrikárov, mechanikov alebo mechatronikov na projekt? Zavolajte nám alebo pošlite dopyt, odpovedáme do 24 hodín. Hľadáme aj nových kolegov.",
    },
    en: {
      title: "Contact & request | E&P Industry",
      description:
        "Need electricians, mechanics or mechatronics technicians for a project? Call us or send a request, we reply within 24 hours. We are also hiring.",
    },
    de: {
      title: "Kontakt & Anfrage | E&P Industry",
      description:
        "Sie brauchen Elektriker, Mechaniker oder Mechatroniker für ein Projekt? Rufen Sie an oder senden Sie eine Anfrage, Antwort innerhalb von 24 Stunden.",
    },
  },
}

const paths: Record<Page, string> = { home: "/", contact: "/contact" }

const OG_IMAGE =
  "https://res.cloudinary.com/djreoxyzu/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1754045378/1_fsn0ao.webp"

const ogAlt: Record<Lang, string> = {
  sk: "Technik E&P Industry pri zapájaní riadiaceho rozvádzača",
  en: "E&P Industry technician wiring a control cabinet",
  de: "E&P Industry Techniker bei der Verdrahtung eines Schaltschranks",
}

export function pageMetadata(lang: Lang, page: Page): Metadata {
  const { title, description } = copy[page][lang]
  const path = paths[page]
  const url = absoluteUrl(lang, path)
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [l, absoluteUrl(l, path)])),
        "x-default": absoluteUrl("en", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: "E&P Industry",
      url,
      title,
      description,
      locale: ogLocale[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => ogLocale[l]),
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: ogAlt[lang] }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  }
}

const serviceNames: Record<Lang, [string, string][]> = {
  sk: [
    ["Elektroinštalácie", "Zapájanie rozvádzačov, ťahanie káblov, montáž káblových trás a elektroinštalácie."],
    ["Priemyselné montáže", "Montáž, demontáž a údržba strojov, výrobných liniek a dopravníkov."],
    ["Mechatronika", "Pneumatika, automatizácia, riadiace systémy a nastavovanie technológií."],
    ["Oceľové konštrukcie a regálové systémy", "Montáž oceľových konštrukcií, regálových systémov a plošín."],
  ],
  en: [
    ["Electrical installations", "Control-cabinet wiring, cable pulling, cable-tray installation and electrical installations."],
    ["Industrial assembly", "Assembly, dismantling and maintenance of machines, production lines and conveyors."],
    ["Mechatronics", "Pneumatics, automation, control systems and machine setup."],
    ["Steel structures & racking systems", "Installation of steel structures, racking systems and platforms."],
  ],
  de: [
    ["Elektroinstallationen", "Schaltschrankverdrahtung, Kabelzug, Trassenmontage und Elektroinstallation."],
    ["Industriemontage", "Montage, Demontage und Wartung von Maschinen, Produktionslinien und Förderanlagen."],
    ["Mechatronik", "Pneumatik, Automatisierung, Steuerungstechnik und Einrichtung."],
    ["Stahlbau & Regalsysteme", "Montage von Stahlkonstruktionen, Regalsystemen und Arbeitsbühnen."],
  ],
}

const orgDescription: Record<Lang, string> = {
  sk: "Slovenská spoločnosť, ktorá dodáva kvalifikovaných elektrikárov, mechanikov, mechatronikov a montážnikov pre priemyselné projekty v Európe aj mimo nej.",
  en: "A Slovak company supplying qualified electricians, mechanics, mechatronics technicians and fitters for industrial projects in Europe and beyond.",
  de: "Ein slowakisches Unternehmen, das qualifizierte Elektriker, Mechaniker, Mechatroniker und Monteure für Industrieprojekte in Europa und darüber hinaus stellt.",
}

/** schema.org graph for the organisation, the website and its services. */
export function structuredData(lang: Lang) {
  const inLanguage = { sk: "sk-SK", en: "en", de: "de" }[lang]
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "E&P Industry s.r.o.",
        alternateName: "E&P Industry",
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo-icon.png`,
        image: OG_IMAGE,
        description: orgDescription[lang],
        email: contacts.email,
        telephone: contacts.people[0].tel,
        address: { "@type": "PostalAddress", addressCountry: "SK" },
        areaServed: [
          { "@type": "Country", name: "Slovakia" },
          { "@type": "Place", name: "Europe" },
        ],
        contactPoint: contacts.people.map((p) => ({
          "@type": "ContactPoint",
          contactType: "sales",
          name: p.name,
          telephone: p.tel,
          email: contacts.email,
        })),
        knowsAbout: serviceNames[lang].map(([name]) => name),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "E&P Industry",
          itemListElement: serviceNames[lang].map(([name, description]) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name, description, provider: { "@id": `${SITE_URL}/#organization` } },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "E&P Industry",
        inLanguage: ["sk-SK", "en", "de"],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(lang, "/")}#webpage`,
        url: absoluteUrl(lang, "/"),
        name: copy.home[lang].title,
        description: copy.home[lang].description,
        inLanguage,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  }
}
