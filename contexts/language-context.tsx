"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "sk" | "en" | "de"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  sk: {
    // Navigation
    home: "Domov",
    projects: "Projekty",
    contact: "Kontakt",
    about: "O nás",
    services: "Služby",

    // Home page
    heroTi: "Profesionálne riešenia",
    heroTitle: "Profesionálne elektrické a montážne riešenia",
    heroSubtitle:
      "Dodávame presne takých odborníkov, akých váš projekt potrebuje – rýchlo, spoľahlivo a kdekoľvek v Európe aj mimo nej.",
    getQuote: "Kontaktujte nás",
    ourProjects: "Naše projekty",
    learnMore: "Zistiť viac",

    // About section
    aboutTitle: "O spoločnosti E&P Industry",
    aboutText1:
      "E&P Industry je slovenská spoločnosť, ktorá sa špecializuje na poskytovanie kvalifikovaných pracovníkov pre medzinárodné priemyselné projekty. Zameriavame sa na mechanické a elektro práce v každej podobe – od montáže a demontáže výrobných liniek, stavby regálových systémov, až po zapájanie rozvodných skríň, elektroinštalácie, pneumatické systémy a kompletnú technickú podporu výrobných prevádzok.",
    aboutText2:
      "Pôsobíme v Európe aj mimo nej, pričom naše tímy pracujú precízne, efektívne a bez zbytočných komplikácií. Vždy kladieme dôraz na spoľahlivosť, kvalitu a súlad s platnou legislatívou.",

    // Services
    servicesL: "Služby",
    komplex: "Poskytujeme komplexné riešenia v oblasti elektrotechniky a priemyselných montáží",
    servicesTitle: "Naše služby",
    service1Title: "Elektrické inštalácie",
    service1Desc:
      "Zabezpečujeme kompletné elektroinštalácie, ťahanie káblov, montáže trás a komplexné elektrotechnické práce. Poskytujeme kvalifikovaných odborníkov aj celé realizačné tímy.",
    service2Title: "Priemyselné montáže",
    service2Desc: "Dodávame pracovníkov na montáž a údržbu strojov, výrobných liniek aj dopravníkov",
    service3Title: "Mechatronika",
    service3Desc:
      "Dodávame odborníkov na pneumatiku, automatizáciu a riadiace systémy. Naši ľudia nastavujú a montujú technologické celky, ktoré spájajú mechaniku a elektroniku do funkčného celku.",
    service4Title: "Oceľové konštrukcie a regálové systémy",
    service4Desc:
      "Skúsení montážnici na rýchlu a presnú realizáciu konštrukcií a regálov podľa projektu – spoľahlivo, bezpečne, bez kompromisov.",

    // Why choose us
    why: "Prečo my",
    reason: "Dôvody, prečo si klienti vyberajú práve nás pre svoje projekty",
    portfolio: "Portfólio našich prác",
    whyChooseTitle: "Prečo si vybrať E&P Industry",
    reason1Title: "Skúsení pracovníci",
    reason1Desc: "Dodávame kvalifikovaných odborníkov s praxou v priemysle a overenými zručnosťami",
    reason2Title: "Certifikovaní technici",
    reason2Desc: "Všetci naši technici majú potrebné certifikáty a pravidelné školenia",
    reason3Title: "Komplexný servis",
    reason3Desc:
      "Ponúkame pracovníkov na rôzne technické oblasti – od elektroinštalácií po mechanické montáže a mechatroniku",
    reason4Title: "Flexibilita",
    reason4Desc: "Prispôsobíme sa vašim požiadavkám a termínom, či už ide o krátkodobé alebo dlhodobé projekty",

    // Projects page
    presentation: "Prezentujeme výber našich najvýznamnejších projektov v oblasti elektrotechniky a priemyselných montáží realizovaných pre významných klientov.",
    projectsTitle: "Naše realizované projekty",
    projectsSubtitle:
      "Pozrite si výber našich najvýznamnejších projektov v oblasti elektrotechniky a priemyselných montáží",
    viewProject: "Zobraziť projekt",
    projectDetails: "Detaily projektu",
    completedIn: "Dokončené v",
    projectType: "Typ projektu",
    client: "Klient",

    // Contact page
    contactTitle: "Kontaktujte nás",
    contactSubtitle: "Máte projekt alebo otázku? Radi vám pomôžeme s realizáciou vašich plánov.",
    getInTouch: "Spojte sa s nami",
    contactForm: "Kontaktný formulár",
    name: "Meno a priezvisko",
    email: "Email",
    phone: "Telefón",
    company: "Spoločnosť",
    message: "Správa",
    sendMessage: "Odoslať správu",

    // Contact info
    phoneLabel: "Telefón",
    emailLabel: "Email",
    addressLabel: "Adresa",
    address: "Hlavná 123, 010 01 Žilina, Slovakia",
    vas: "Sme tu pre vás",
    look: "Hľadáte skúsených pracovníkov? Alebo ste elektrikár či mechanik pripravený vycestovať? Ozvite sa nám – prepájame firmy s kvalitnými ľuďmi.",
    writeMessage: "Napísať správu",
    here: "Sme tu pre vás. Kontaktujte nás telefonicky alebo emailom. Radi prediskutujeme váš projekt a nájdeme najlepšie riešenie.",
    nonstop: "24/7 pohotovostná linka",
    answer: "Odpoveď do 24 hodín",
    nameGrey: "Vaše meno a priezvisko",
    emailGrey: "vas@email.sk",
    companyGrey: "Názov spoločnosti",
    projectGrey: "Opíšte váš projekt alebo požiadavky...",
    sending: "Odosiela sa...",

    // Footer
    footerText: `© ${new Date().getFullYear()} E&P Industry s.r.o. Všetky práva vyhradené.`,
    followUs: "Sledujte nás",
    quickLinks: "Rýchle odkazy",
    ourServices: "Naše služby",
    contactInfo: "Kontaktné informácie",
    footer: "E&P Industry je slovenská spoločnosť, ktorá sa špecializuje na poskytovanie kvalifikovaných pracovníkov pre medzinárodné priemyselné projekty.",
  },
  en: {
  // Navigation
  home: "Home",
  projects: "Projects",
  contact: "Contact",
  about: "About Us",
  services: "Services",

  // Home page
  heroTi: "Professional solutions",
  heroTitle: "Professional Electrical and Assembly Solutions",
  heroSubtitle:
    "We provide exactly the specialists your project needs – fast, reliable, and available across Europe and beyond.",
  getQuote: "Contact Us",
  ourProjects: "Our Projects",
  learnMore: "Learn More",

  // About section
  aboutTitle: "About E&P Industry",
  aboutText1:
    "E&P Industry is a Slovak company specializing in the provision of qualified professionals for international industrial projects. We focus on mechanical and electrical work in all forms – from the assembly and disassembly of production lines, building shelving systems, to wiring distribution cabinets, electrical installations, pneumatic systems, and providing full technical support for production facilities.",
  aboutText2:
    "We operate across Europe and beyond. Our teams work precisely, efficiently, and without unnecessary complications. We always prioritize reliability, quality, and compliance with current legislation.",

  // Services
  servicesL: "Services",
  komplex: "We provide comprehensive solutions in the field of electrical engineering and industrial assembly.",
  servicesTitle: "Our Services",
  service1Title: "Electrical Installations",
  service1Desc:
    "We provide complete electrical installations, cable routing, track assembly, and complex electrotechnical work. We offer both qualified specialists and full implementation teams.",
  service2Title: "Industrial Assemblies",
  service2Desc:
    "We supply skilled workers for the assembly and maintenance of machines, production lines, and conveyor systems.",
  service3Title: "Mechatronics",
  service3Desc:
    "We provide experts in pneumatics, automation, and control systems. Our staff configure and assemble technological units that combine mechanics and electronics into fully functional systems.",
  service4Title: "Steel Structures & Racking Systems",
  service4Desc:
    "Experienced assemblers for fast and precise installation of structures and shelving systems according to project specifications – reliably, safely, and without compromise.",

  // Why choose us
  why: "Why us",
  reason: "Reasons why clients choose us for their projects",
  portfolio: "Portfolio of our work",
  whyChooseTitle: "Why Choose E&P Industry",
  reason1Title: "Experienced Professionals",
  reason1Desc:
    "We supply qualified specialists with industry experience and proven skills.",
  reason2Title: "Certified Technicians",
  reason2Desc:
    "All our technicians hold the necessary certifications and undergo regular training.",
  reason3Title: "Comprehensive Service",
  reason3Desc:
    "We provide personnel across technical disciplines – from electrical installations to mechanical assemblies and mechatronics.",
  reason4Title: "Flexibility",
  reason4Desc:
    "We adapt to your requirements and deadlines, whether for short-term or long-term projects.",

  // Projects page
  presentation: "We present a selection of our most significant projects in the field of electrical engineering and industrial assembly implemented for major clients.",
  projectsTitle: "Our Completed Projects",
  projectsSubtitle:
    "Explore a selection of our most important projects in electrical engineering and industrial assembly.",
  viewProject: "View Project",
  projectDetails: "Project Details",
  completedIn: "Completed In",
  projectType: "Project Type",
  client: "Client",

  // Contact page
  contactTitle: "Contact Us",
  contactSubtitle:
    "Do you have a project or question? We’d be happy to help bring your plans to life.",
  getInTouch: "Get in Touch",
  contactForm: "Contact Form",
  name: "Full Name",
  email: "Email",
  phone: "Phone",
  company: "Company",
  message: "Message",
  sendMessage: "Send Message",
  vas: "We are here for you",
  look: "Looking for experienced workers? Or are you an electrician or mechanic ready to travel? Get in touch – we connect companies with skilled professionals.",
  writeMessage: "Write a message",
  here: "We are here for you. Contact us by phone or email. We’ll gladly discuss your project and find the best solution.",
  nonstop: "24/7 emergency line",
  answer: "Response within 24 hours",
  nameGrey: "Your full name",
  emailGrey: "your@email.com",
  companyGrey: "Company name",
  projectGrey: "Describe your project or requirements...",
  sending: "Sending...",

  // Contact info
  phoneLabel: "Phone",
  emailLabel: "Email",
  addressLabel: "Address",
  address: "Hlavná 123, 010 01 Žilina, Slovakia",

  // Footer
  footerText: `© ${new Date().getFullYear()} E&P Industry s.r.o. All rights reserved.`,
  followUs: "Follow Us",
  quickLinks: "Quick Links",
  ourServices: "Our Services",
  contactInfo: "Contact Information",
  footer: "E&P Industry is a Slovak company specializing in providing qualified workers for international industrial projects.",
},
  de: {
  // Navigation
  home: "Startseite",
  projects: "Projekte",
  contact: "Kontakt",
  about: "Über uns",
  services: "Dienstleistungen",

  // Home page
  heroTi: "Professionelle Lösungen",
  heroTitle: "Professionelle Elektro- und Montagelösungen",
  heroSubtitle:
    "Wir liefern genau die Fachkräfte, die Ihr Projekt benötigt – schnell, zuverlässig und überall in Europa und darüber hinaus.",
  getQuote: "Kontaktieren Sie uns",
  ourProjects: "Unsere Projekte",
  learnMore: "Mehr erfahren",

  // About section
  aboutTitle: "Über E&P Industry",
  aboutText1:
    "E&P Industry ist ein slowakisches Unternehmen, das sich auf die Bereitstellung qualifizierter Fachkräfte für internationale Industrieprojekte spezialisiert hat. Wir konzentrieren uns auf mechanische und elektrotechnische Arbeiten in jeder Form – von der Montage und Demontage von Produktionslinien, dem Aufbau von Regalsystemen, bis hin zum Anschluss von Schaltschränken, Elektroinstallationen, pneumatischen Systemen und umfassender technischer Unterstützung von Produktionsbetrieben.",
  aboutText2:
    "Wir sind in Europa und darüber hinaus tätig. Unsere Teams arbeiten präzise, effizient und ohne unnötige Komplikationen. Zuverlässigkeit, Qualität und die Einhaltung der geltenden Vorschriften stehen bei uns immer im Vordergrund.",

  // Services
  servicesL: "Leistungen",
  komplex: "Wir bieten umfassende Lösungen im Bereich der Elektrotechnik und Industriemontage.",
  servicesTitle: "Unsere Dienstleistungen",
  service1Title: "Elektroinstallationen",
  service1Desc:
    "Wir bieten komplette Elektroinstallationen, Kabelverlegung, Trassenmontage und umfassende elektrotechnische Arbeiten. Sowohl einzelne Fachkräfte als auch komplette Montageteams stehen zur Verfügung.",
  service2Title: "Industriemontagen",
  service2Desc:
    "Wir stellen Fachpersonal für die Montage und Wartung von Maschinen, Produktionslinien und Förderanlagen bereit.",
  service3Title: "Mechatronik",
  service3Desc:
    "Wir liefern Spezialisten für Pneumatik, Automatisierung und Steuerungstechnik. Unsere Fachkräfte montieren und konfigurieren technische Einheiten, die Mechanik und Elektronik zu einem funktionierenden Ganzen verbinden.",
  service4Title: "Stahlkonstruktionen & Regalsysteme",
  service4Desc:
    "Erfahrene Monteure für eine schnelle und präzise Umsetzung von Konstruktionen und Regalsystemen gemäß Projekt – zuverlässig, sicher und ohne Kompromisse.",

  // Why choose us
  why: "Warum wir",
  reason: "Gründe, warum Kunden uns für ihre Projekte auswählen",
  portfolio: "Portfolio unserer Arbeit",
  whyChooseTitle: "Warum E&P Industry wählen",
  reason1Title: "Erfahrene Fachkräfte",
  reason1Desc:
    "Wir stellen qualifizierte Fachkräfte mit Industrieerfahrung und geprüften Fähigkeiten zur Verfügung.",
  reason2Title: "Zertifizierte Techniker",
  reason2Desc:
    "Alle unsere Techniker verfügen über die erforderlichen Zertifikate und absolvieren regelmäßige Schulungen.",
  reason3Title: "Umfassender Service",
  reason3Desc:
    "Wir bieten Personal für verschiedene technische Bereiche – von Elektroinstallationen über mechanische Montage bis hin zur Mechatronik.",
  reason4Title: "Flexibilität",
  reason4Desc:
    "Wir passen uns Ihren Anforderungen und Terminen an – ob für kurzfristige oder langfristige Projekte.",

  // Projects page
  presentation: "Wir präsentieren eine Auswahl unserer bedeutendsten Projekte im Bereich Elektrotechnik und Industriemontage, die wir für Großkunden umgesetzt haben.",
  projectsTitle: "Unsere realisierten Projekte",
  projectsSubtitle:
    "Werfen Sie einen Blick auf eine Auswahl unserer bedeutendsten Projekte im Bereich Elektrotechnik und Industriemontage.",
  viewProject: "Projekt anzeigen",
  projectDetails: "Projektdetails",
  completedIn: "Abgeschlossen in",
  projectType: "Projekttyp",
  client: "Kunde",

  // Contact page
  contactTitle: "Kontaktieren Sie uns",
  contactSubtitle:
    "Haben Sie ein Projekt oder eine Frage? Wir helfen Ihnen gerne bei der Umsetzung Ihrer Pläne.",
  getInTouch: "Kontakt aufnehmen",
  contactForm: "Kontaktformular",
  name: "Vollständiger Name",
  email: "E-Mail",
  phone: "Telefon",
  company: "Unternehmen",
  message: "Nachricht",
  sendMessage: "Nachricht senden",

  // Contact info
  phoneLabel: "Telefon",
  emailLabel: "E-Mail",
  addressLabel: "Adresse",
  address: "Hlavná 123, 010 01 Žilina, Slowakei",
  vas: "Wir sind für Sie da",
  look: "Suchen Sie erfahrene Fachkräfte? Oder sind Sie Elektriker oder Mechaniker und bereit zu reisen? Kontaktieren Sie uns – wir verbinden Unternehmen mit qualifizierten Fachleuten.",
  writeMessage: "Nachricht schreiben",
  here: "Wir sind für Sie da. Kontaktieren Sie uns telefonisch oder per E-Mail. Gerne besprechen wir Ihr Projekt und finden die beste Lösung.",
  nonstop: "24/7 Notfall-Hotline",
  answer: "Antwort innerhalb von 24 Stunden",
  nameGrey: "Ihr vollständiger Name",
  emailGrey: "ihre@email.de",
  companyGrey: "Firmenname",
  projectGrey: "Beschreiben Sie Ihr Projekt oder Ihre Anforderungen...",
  sending: "Wird gesendet...",

  // Footer
  footerText: `© ${new Date().getFullYear()} E&P Industry s.r.o. Alle Rechte vorbehalten.`,
  followUs: "Folgen Sie uns",
  quickLinks: "Schnellzugriff",
  ourServices: "Unsere Dienstleistungen",
  contactInfo: "Kontaktinformationen",
  footer: "E&P Industry ist ein slowakisches Unternehmen, das auf die Bereitstellung qualifizierter Arbeitskräfte für internationale Industrieprojekte spezialisiert ist.",
},
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("sk")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
