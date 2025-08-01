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
    heroTitle: "Profesionálne elektrické a montážne riešenia",
    heroSubtitle:
      "Sme špecialisti na elektrotechnické práce a priemyselné montáže s viac ako 15-ročnými skúsenosťami v celom regióne.",
    getQuote: "Získať ponuku",
    ourProjects: "Naše projekty",
    learnMore: "Zistiť viac",

    // About section
    aboutTitle: "O spoločnosti E&P Industry",
    aboutText1:
      "Sme etablovaná spoločnosť s bohatými skúsenosťami v oblasti elektrotechniky a priemyselných montáží. Naša firma pôsobí na trhu už viac ako 15 rokov a za ten čas sme si vybudovali povesť spoľahlivého partnera.",
    aboutText2:
      "Špecializujeme sa na komplexné riešenia pre priemyselné podniky, komerčné objekty a infraštruktúrne projekty. Naši certifikovaní technici a inžinieri zabezpečujú najvyššiu kvalitu práce.",

    // Services
    servicesTitle: "Naše služby",
    service1Title: "Elektrické inštalácie",
    service1Desc:
      "Komplexné elektrické inštalácie pre priemyselné objekty, komerčné budovy a infraštruktúrne projekty s certifikáciou a zárukou",
    service2Title: "Priemyselné montáže",
    service2Desc:
      "Odborné montážne práce strojov, zariadení a technologických celkov s presným dodržaním technických špecifikácií.",
    service3Title: "Údržba a servis",
    service3Desc:
      "Pravidelná preventívna údržba, servis a pohotovostné opravy elektrických systémov a priemyselných zariadení.",
    service4Title: "Projektovanie a poradenstvo",
    service4Desc:
      "Návrh a projektovanie elektrických systémov, konzultácie a technické poradenstvo pre optimálne riešenia.",

    // Why choose us
    whyChooseTitle: "Prečo si vybrať E&P Industry",
    reason1Title: "15+ rokov skúseností",
    reason1Desc: "Dlhoročné skúsenosti v elektrotechnike a priemyselných montážach",
    reason2Title: "Certifikovaní technici",
    reason2Desc: "Všetci naši technici majú potrebné certifikáty a pravidelné školenia",
    reason3Title: "Komplexné riešenia",
    reason3Desc: "Od návrhu cez realizáciu až po servis - všetko na jednom mieste",
    reason4Title: "Záruka kvality",
    reason4Desc: "Poskytujeme záruku na všetky naše práce a používame kvalitné materiály",

    // Projects page
    projectsTitle: "Naše realizované projekty",
    projectsSubtitle:
      "Pozrite si výber našich najvýznamnejších projektov v oblasti elektrotechniky a priemyselných montáží",
    viewProject: "Zobraziť projekt",
    projectDetails: "Detaily projektu",
    completedIn: "Dokončené v",
    projectType: "Typ projektu",
    client: "Klient",

    // Project details
    project1Title: "Výrobný závod AutoParts Bratislava",
    project1Desc:
      "Kompletná elektrická inštalácia moderného výrobného závodu automobilových súčiastok vrátane priemyselnej automatizácie.",
    project1Type: "Priemyselná elektroinštalácia",
    project1Client: "AutoParts Slovakia s.r.o.",

    project2Title: "Logistické centrum DHL Košice",
    project2Desc:
      "Montáž a inštalácia komplexných elektrických systémov pre najmodernejšie logistické centrum v regióne.",
    project2Type: "Komerčná elektroinštalácia",
    project2Client: "DHL Supply Chain Slovakia",

    project3Title: "Obchodné centrum Central Žilina",
    project3Desc: "Elektrické systémy, osvetlenie a bezpečnostné systémy pre veľké obchodné centrum.",
    project3Type: "Komerčná elektroinštalácia",
    project3Client: "Central Shopping Centers",

    project4Title: "Chemický závod Slovnaft Bratislava",
    project4Desc: "Špecializované elektrické inštalácie pre chemický priemysel s vysokými bezpečnostnými štandardmi.",
    project4Type: "Priemyselná špecializácia",
    project4Client: "Slovnaft a.s.",

    project5Title: "Nemocnica Nové Zámky",
    project5Desc: "Kritické elektrické systémy pre zdravotnícke zariadenie vrátane záložných zdrojov energie.",
    project5Type: "Zdravotníctvo",
    project5Client: "Nemocnica Nové Zámky",

    project6Title: "Datacentrum Telekom Trnava",
    project6Desc: "Vysoko spoľahlivé elektrické systémy pre kritickú IT infraštruktúru s redundanciou.",
    project6Type: "IT infraštruktúra",
    project6Client: "Slovak Telekom a.s.",

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

    // Footer
    footerText: "© 2024 E&P Industry s.r.o. Všetky práva vyhradené.",
    followUs: "Sledujte nás",
    quickLinks: "Rýchle odkazy",
    ourServices: "Naše služby",
    contactInfo: "Kontaktné informácie",

    // Certifications
    certificationsTitle: "Naše certifikácie a ocenenia",
    certificationsSubtitle: "Potvrdenie našej kvality a odbornosti",
    cert1Title: "ISO 9001:2015 Certifikácia",
    cert1Desc:
      "Certifikát systému manažérstva kvality, ktorý potvrdzuje náš záväzok k neustálemu zlepšovaniu a spokojnosti zákazníkov.",
    cert2Title: "Bezpečnosť práce (BOZP)",
    cert2Desc:
      "Pravidelné školenia a certifikácie v oblasti bezpečnosti a ochrany zdravia pri práci pre všetkých zamestnancov.",
    cert3Title: "Autorizácia pre elektroinštalácie",
    cert3Desc: "Licencia a oprávnenie na vykonávanie všetkých typov elektrických inštalácií podľa platných noriem.",
    cert4Title: "Členstvo v priemyselných asociáciách",
    cert4Desc: "Aktívna účasť v kľúčových priemyselných asociáciách, ktorá nám umožňuje byť v popredí inovácií.",
  },
  en: {
    // Navigation
    home: "Home",
    projects: "Projects",
    contact: "Contact",
    about: "About",
    services: "Services",

    // Home page
    heroTitle: "Professional Electrical and Assembly Solutions",
    heroSubtitle:
      "We are specialists in electrotechnical works and industrial assembly with over 15 years of experience throughout the region.",
    getQuote: "Get Quote",
    ourProjects: "Our Projects",
    learnMore: "Learn More",

    // About section
    aboutTitle: "About E&P Industry",
    aboutText1:
      "We are an established company with extensive experience in electrical engineering and industrial assembly. Our company has been operating in the market for over 15 years and has built a reputation as a reliable partner.",
    aboutText2:
      "We specialize in comprehensive solutions for industrial enterprises, commercial buildings and infrastructure projects. Our certified technicians and engineers ensure the highest quality of work.",

    // Services
    servicesTitle: "Our Services",
    service1Title: "Electrical Installations",
    service1Desc:
      "Complete electrical installations for industrial facilities, commercial buildings and infrastructure projects with certification and warranty.",
    service2Title: "Industrial Assembly",
    service2Desc:
      "Professional assembly work of machines, equipment and technological units with precise adherence to technical specifications.",
    service3Title: "Maintenance & Service",
    service3Desc:
      "Regular preventive maintenance, service and emergency repairs of electrical systems and industrial equipment.",
    service4Title: "Design & Consulting",
    service4Desc:
      "Design and engineering of electrical systems, consultations and technical advisory for optimal solutions.",

    // Why choose us
    whyChooseTitle: "Why Choose E&P Industry",
    reason1Title: "15+ Years Experience",
    reason1Desc: "Long-term experience in electrical engineering and industrial assembly",
    reason2Title: "Certified Technicians",
    reason2Desc: "All our technicians have necessary certificates and regular training",
    reason3Title: "Complete Solutions",
    reason3Desc: "From design through implementation to service - everything in one place",
    reason4Title: "Quality Guarantee",
    reason4Desc: "We provide warranty on all our work and use quality materials",

    // Projects page
    projectsTitle: "Our Completed Projects",
    projectsSubtitle:
      "View a selection of our most significant projects in electrical engineering and industrial assembly",
    viewProject: "View Project",
    projectDetails: "Project Details",
    completedIn: "Completed in",
    projectType: "Project Type",
    client: "Client",

    // Project details
    project1Title: "AutoParts Manufacturing Plant Bratislava",
    project1Desc:
      "Complete electrical installation of modern automotive parts manufacturing plant including industrial automation.",
    project1Type: "Industrial Electrical Installation",
    project1Client: "AutoParts Slovakia s.r.o.",

    project2Title: "DHL Logistics Center Košice",
    project2Desc:
      "Assembly and installation of complex electrical systems for the most modern logistics center in the region.",
    project2Type: "Commercial Electrical Installation",
    project2Client: "DHL Supply Chain Slovakia",

    project3Title: "Central Shopping Center Žilina",
    project3Desc: "Electrical systems, lighting and security systems for large shopping center.",
    project3Type: "Commercial Electrical Installation",
    project3Client: "Central Shopping Centers",

    project4Title: "Slovnaft Chemical Plant Bratislava",
    project4Desc: "Specialized electrical installations for chemical industry with high safety standards.",
    project4Type: "Industrial Specialization",
    project4Client: "Slovnaft a.s.",

    project5Title: "Hospital Nové Zámky",
    project5Desc: "Critical electrical systems for healthcare facility including backup power sources.",
    project5Type: "Healthcare",
    project5Client: "Hospital Nové Zámky",

    project6Title: "Telekom Datacenter Trnava",
    project6Desc: "Highly reliable electrical systems for critical IT infrastructure with redundancy.",
    project6Type: "IT Infrastructure",
    project6Client: "Slovak Telekom a.s.",

    // Contact page
    contactTitle: "Contact Us",
    contactSubtitle: "Have a project or question? We'd be happy to help you realize your plans.",
    getInTouch: "Get in Touch",
    contactForm: "Contact Form",
    name: "Full Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    message: "Message",
    sendMessage: "Send Message",

    // Contact info
    phoneLabel: "Phone",
    emailLabel: "Email",
    addressLabel: "Address",
    address: "Hlavná 123, 010 01 Žilina, Slovakia",

    // Footer
    footerText: "© 2024 E&P Industry s.r.o. All rights reserved.",
    followUs: "Follow Us",
    quickLinks: "Quick Links",
    ourServices: "Our Services",
    contactInfo: "Contact Information",

    // Certifications
    certificationsTitle: "Our Certifications & Awards",
    certificationsSubtitle: "Confirmation of our quality and expertise",
    cert1Title: "ISO 9001:2015 Certification",
    cert1Desc:
      "Quality management system certificate, confirming our commitment to continuous improvement and customer satisfaction.",
    cert2Title: "Occupational Health & Safety (OHS)",
    cert2Desc: "Regular training and certifications in occupational health and safety for all employees.",
    cert3Title: "Authorization for Electrical Installations",
    cert3Desc:
      "License and authorization to perform all types of electrical installations according to applicable standards.",
    cert4Title: "Membership in Industry Associations",
    cert4Desc: "Active participation in key industry associations, allowing us to be at the forefront of innovation.",
  },
  de: {
    // Navigation
    home: "Startseite",
    projects: "Projekte",
    contact: "Kontakt",
    about: "Über uns",
    services: "Dienstleistungen",

    // Home page
    heroTitle: "Professionelle Elektro- und Montagelösungen",
    heroSubtitle:
      "Wir sind Spezialisten für elektrotechnische Arbeiten und Industriemontage mit über 15 Jahren Erfahrung in der gesamten Region.",
    getQuote: "Angebot erhalten",
    ourProjects: "Unsere Projekte",
    learnMore: "Mehr erfahren",

    // About section
    aboutTitle: "Über E&P Industry",
    aboutText1:
      "Wir sind ein etabliertes Unternehmen mit umfangreicher Erfahrung in der Elektrotechnik und Industriemontage. Unser Unternehmen ist seit über 15 Jahren am Markt tätig und hat sich einen Ruf als zuverlässiger Partner aufgebaut.",
    aboutText2:
      "Wir spezialisieren uns auf umfassende Lösungen für Industrieunternehmen, Gewerbegebäude und Infrastrukturprojekte. Unsere zertifizierten Techniker und Ingenieure gewährleisten höchste Arbeitsqualität.",

    // Services
    servicesTitle: "Unsere Dienstleistungen",
    service1Title: "Elektrische Installationen",
    service1Desc:
      "Komplette Elektroinstallationen für Industrieanlagen, Gewerbegebäude und Infrastrukturprojekte mit Zertifizierung und Garantie.",
    service2Title: "Industrielle Montage",
    service2Desc:
      "Professionelle Montagearbeiten von Maschinen, Anlagen und technologischen Einheiten unter genauer Einhaltung technischer Spezifikationen.",
    service3Title: "Wartung & Service",
    service3Desc:
      "Regelmäßige vorbeugende Wartung, Service und Notfallreparaturen von elektrischen Systemen und Industrieanlagen.",
    service4Title: "Planung & Beratung",
    service4Desc:
      "Planung und Engineering von elektrischen Systemen, Beratung und technische Beratung für optimale Lösungen.",

    // Why choose us
    whyChooseTitle: "Warum E&P Industry wählen",
    reason1Title: "15+ Jahre Erfahrung",
    reason1Desc: "Langjährige Erfahrung in Elektrotechnik und Industriemontage",
    reason2Title: "Zertifizierte Techniker",
    reason2Desc: "Alle unsere Techniker haben notwendige Zertifikate und regelmäßige Schulungen",
    reason3Title: "Komplettlösungen",
    reason3Desc: "Von der Planung über die Umsetzung bis zum Service - alles aus einer Hand",
    reason4Title: "Qualitätsgarantie",
    reason4Desc: "Wir bieten Garantie auf alle unsere Arbeiten und verwenden Qualitätsmaterialien",

    // Projects page
    projectsTitle: "Unsere abgeschlossenen Projekte",
    projectsSubtitle: "Sehen Sie eine Auswahl unserer bedeutendsten Projekte in Elektrotechnik und Industriemontage",
    viewProject: "Projekt ansehen",
    projectDetails: "Projektdetails",
    completedIn: "Abgeschlossen in",
    projectType: "Projekttyp",
    client: "Kunde",

    // Project details
    project1Title: "AutoParts Produktionsanlage Bratislava",
    project1Desc:
      "Komplette Elektroinstallation einer modernen Automobilteile-Produktionsanlage einschließlich Industrieautomatisierung.",
    project1Type: "Industrielle Elektroinstallation",
    project1Client: "AutoParts Slovakia s.r.o.",

    project2Title: "DHL Logistikzentrum Košice",
    project2Desc:
      "Montage und Installation komplexer elektrischer Systeme für das modernste Logistikzentrum der Region.",
    project2Type: "Gewerbliche Elektroinstallation",
    project2Client: "DHL Supply Chain Slovakia",

    project3Title: "Einkaufszentrum Central Žilina",
    project3Desc: "Elektrische Systeme, Beleuchtung und Sicherheitssysteme für großes Einkaufszentrum.",
    project3Type: "Gewerbliche Elektroinstallation",
    project3Client: "Central Shopping Centers",

    project4Title: "Slovnaft Chemiewerk Bratislava",
    project4Desc: "Spezialisierte Elektroinstallationen für die chemische Industrie mit hohen Sicherheitsstandards.",
    project4Type: "Industrielle Spezialisierung",
    project4Client: "Slovnaft a.s.",

    project5Title: "Krankenhaus Nové Zámky",
    project5Desc: "Kritische elektrische Systeme für Gesundheitseinrichtung einschließlich Notstromquellen.",
    project5Type: "Gesundheitswesen",
    project5Client: "Krankenhaus Nové Zámky",

    project6Title: "Telekom Rechenzentrum Trnava",
    project6Desc: "Hochzuverlässige elektrische Systeme für kritische IT-Infrastruktur mit Redundanz.",
    project6Type: "IT-Infrastruktur",
    project6Client: "Slovak Telekom a.s.",

    // Contact page
    contactTitle: "Kontaktieren Sie uns",
    contactSubtitle: "Haben Sie ein Projekt oder eine Frage? Wir helfen Ihnen gerne bei der Umsetzung Ihrer Pläne.",
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
    address: "Hlavná 123, 010 01 Žilina, Slovakia",

    // Footer
    footerText: "© 2024 E&P Industry s.r.o. Alle Rechte vorbehalten.",
    followUs: "Folgen Sie uns",
    quickLinks: "Schnelle Links",
    ourServices: "Unsere Dienstleistungen",
    contactInfo: "Kontaktinformationen",

    // Certifications
    certificationsTitle: "Unsere Zertifizierungen & Auszeichnungen",
    certificationsSubtitle: "Bestätigung unserer Qualität und Expertise",
    cert1Title: "ISO 9001:2015 Zertifizierung",
    cert1Desc:
      "Zertifikat für Qualitätsmanagementsysteme, das unser Engagement für kontinuierliche Verbesserung und Kundenzufriedenheit bestätigt.",
    cert2Title: "Arbeitssicherheit (ASiG)",
    cert2Desc:
      "Regelmäßige Schulungen und Zertifizierungen im Bereich Arbeitssicherheit und Gesundheitsschutz für alle Mitarbeiter.",
    cert3Title: "Autorisierung für Elektroinstallationen",
    cert3Desc:
      "Lizenz und Berechtigung zur Durchführung aller Arten von Elektroinstallationen gemäß den geltenden Normen.",
    cert4Title: "Mitgliedschaft in Industrieverbänden",
    cert4Desc:
      "Aktive Teilnahme an wichtigen Industrieverbänden, die es uns ermöglicht, an der Spitze der Innovation zu stehen.",
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
