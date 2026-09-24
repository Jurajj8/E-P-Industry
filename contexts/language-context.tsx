"use client"

import { createContext, useContext, useMemo, type ReactNode } from "react"
import type { Lang } from "@/lib/site"
import { localePath } from "@/lib/i18n"

type Language = Lang

interface LanguageContextType {
  language: Language
  t: (key: TranslationKey) => string
  /** Prefixes an internal link with the current language: lp("/contact") → "/en/contact" */
  lp: (href: string) => string
}

const year = new Date().getFullYear()

const sk = {
  // Navigation
  navAbout: "O nás",
  navServices: "Služby",
  navProjects: "Projekty",
  navProcess: "Postup",
  navContact: "Kontakt",
  navCta: "Poskladať partiu",
  menu: "Menu",
  close: "Zavrieť",
  skip: "Preskočiť na obsah",
  language: "Jazyk",

  // Hero
  heroKicker: "Kvalifikovaní ľudia pre priemyselné projekty",
  heroL1: "Elektrikári",
  heroL2: "Mechanici",
  heroL3: "Mechatronici",
  heroSub:
    "Dodávame skúsených jednotlivcov aj celé realizačné tímy — od montáže výrobných liniek po zapojenie rozvádzačov. Na Slovensku, v Európe aj mimo nej.",
  heroCta: "Poskladať partiu",
  heroCallLabel: "Rovno zavolať",
  heroPhotoTag: "Foto z terénu",
  heroPhotoCaption: "Zapojenie riadiaceho rozvádzača",

  // Disciplines
  disc_electro_title: "Elektroinštalácie",
  disc_electro_short: "Rozvádzače, kabeláž, káblové trasy",
  disc_electro_desc:
    "Kompletné elektroinštalácie, ťahanie káblov, montáž trás a zapájanie rozvodných skríň. Dodáme jednotlivých odborníkov aj celé realizačné tímy.",
  disc_electro_tags: "Zapájanie rozvádzačov · Ťahanie káblov · Montáž trás · Elektroinštalácie",
  disc_assembly_title: "Priemyselné montáže",
  disc_assembly_short: "Linky, stroje, dopravníky",
  disc_assembly_desc:
    "Montážnici na montáž, demontáž a údržbu strojov, výrobných liniek aj dopravníkových systémov.",
  disc_assembly_tags: "Výrobné linky · Stroje · Dopravníky · Demontáž a presuny",
  disc_mechatronics_title: "Mechatronika",
  disc_mechatronics_short: "Pneumatika, automatizácia, riadenie",
  disc_mechatronics_desc:
    "Odborníci na pneumatiku, automatizáciu a riadiace systémy. Nastavujú a montujú technologické celky, ktoré spájajú mechaniku a elektroniku do funkčného celku.",
  disc_mechatronics_tags: "Pneumatika · Automatizácia · Riadiace systémy · Nastavovanie technológií",
  disc_steel_title: "Oceľové konštrukcie a regály",
  disc_steel_short: "Konštrukcie, regály, plošiny",
  disc_steel_desc:
    "Skúsení montážnici na rýchlu a presnú realizáciu konštrukcií a regálových systémov podľa projektu — spoľahlivo, bezpečne, bez kompromisov.",
  disc_steel_tags: "Oceľové konštrukcie · Regálové systémy · Plošiny",

  // About
  aboutMarker: "O nás",
  aboutStatement1: "Keď sa stavia, sťahuje alebo modernizuje výroba, pošleme ľudí, ktorí vedia, čo robia.",
  aboutStatement2: "Jednotlivcov aj celé tímy — presne podľa toho, čo váš projekt potrebuje.",
  aboutText1:
    "E&P Industry je slovenská spoločnosť, ktorá poskytuje kvalifikovaných pracovníkov pre medzinárodné priemyselné projekty. Robíme mechanické a elektro práce v každej podobe — od montáže a demontáže výrobných liniek a stavby regálových systémov až po zapájanie rozvodných skríň, pneumatické systémy a technickú podporu výrobných prevádzok.",
  aboutText2:
    "Naše tímy pracujú precízne, efektívne a bez zbytočných komplikácií. Vždy kladieme dôraz na spoľahlivosť, kvalitu a súlad s platnou legislatívou.",
  fact1K: "Rozsah",
  fact1V: "Jednotlivci aj celé realizačné tímy",
  fact2K: "Nasadenie",
  fact2V: "Krátkodobé aj dlhodobé projekty",
  fact3K: "Pôsobnosť",
  fact3V: "Slovensko, Európa aj mimo nej",
  fact4K: "Štandard",
  fact4V: "Práca v súlade s platnou legislatívou",
  aboutPhotoCaption: "Robotické pracovisko — montáž a zapojenie",

  discMarker: "Služby",
  discTitle: "Štyri remeslá. Jedna partia.",
  discSub:
    "Ľudí skladáme podľa práce, nie podľa tabuľky. Profesie kombinujeme tak, aby tím na mieste zvládol celý rozsah.",

  // Crew builder
  crewMarker: "Dopyt",
  crewTitle: "Poskladajte si partiu.",
  crewSub:
    "Vyberte profesie, počty a termín. Z toho pripravíme konkrétnu ponuku — odpovedáme do 24 hodín.",
  role_electrician: "Elektrikár",
  role_electrician_d: "Rozvádzače, kabeláž, trasy",
  role_mechanic: "Mechanik / montážnik",
  role_mechanic_d: "Linky, stroje, dopravníky",
  role_mechatronic: "Mechatronik",
  role_mechatronic_d: "Pneumatika, automatizácia",
  role_structural: "Montážnik konštrukcií",
  role_structural_d: "Oceľ, regály, plošiny",
  crewRoles: "Profesie",
  crewDuration: "Dĺžka nasadenia",
  duration_short: "Do 1 mesiaca",
  duration_mid: "1–3 mesiace",
  duration_long: "Viac ako 3 mesiace",
  crewStart: "Nástup",
  start_asap: "Čo najskôr",
  start_month: "Do 30 dní",
  start_planned: "Plánujeme dopredu",
  crewLocation: "Miesto výkonu práce",
  crewLocationPh: "napr. Ingolstadt, Nemecko",
  ticketTitle: "Montážny list",
  ticketNo: "Č.",
  ticketDate: "Dátum",
  ticketCrew: "Zloženie partie",
  ticketTotal: "Spolu",
  ticketPeople: "os.",
  ticketEmpty: "Pridajte aspoň jednu profesiu.",
  ticketSend: "Odoslať dopyt",
  ticketNote: "Údaje sa prenesú do kontaktného formulára.",
  decrease: "Ubrať",
  increase: "Pridať",

  // Field archive
  fieldMarker: "Projekty",
  fieldTitle: "Z hál, kde sme pracovali.",
  fieldSub: "Skutočné fotky z našich nasadení. Žiadna fotobanka.",
  fieldOpen: "Zväčšiť fotku",
  fieldCtaTitle: "Ďalšia hala môže byť vaša.",
  fieldCta: "Poslať dopyt",
  lbClose: "Zavrieť",
  lbPrev: "Predchádzajúca",
  lbNext: "Ďalšia",

  // Process
  procMarker: "Postup",
  procTitle: "Od telefonátu po prvú zmenu.",
  proc1T: "Zadanie",
  proc1D: "Popíšete rozsah prác, profesie, počty ľudí a termín nástupu.",
  proc2T: "Výber ľudí",
  proc2D: "Zostavíme partiu z ľudí, ktorí majú skúsenosti presne s týmto typom práce.",
  proc3T: "Nástup",
  proc3D: "Tím dorazí na miesto v dohodnutom termíne a pustí sa do práce.",
  proc4T: "Jeden kontakt",
  proc4D: "Počas celého projektu riešite všetko s jedným človekom — s nami.",

  // Team
  teamMarker: "Kontakt",
  teamTitle: "E&P Industry.",
  teamTitleSub: "Priama linka. Žiadne call centrum.",
  lineLabel: "Linka",
  teamSub: "Keď zavoláte, dvíha to človek, ktorý o vašom projekte rozhoduje.",
  call: "Zavolať",
  writeEmail: "Napísať e-mail",

  // Careers
  careersKicker: "Kariéra",
  careersTitle: "Ste elektrikár, mechanik alebo mechatronik?",
  careersText:
    "Hľadáme skúsených ľudí, ktorí sú pripravení vycestovať za prácou na priemyselné projekty. Ozvite sa nám.",
  careersCta: "Chcem sa pridať",

  // Footer
  footerLine: "Máte projekt? Nájdeme preň ľudí.",
  footerAbout:
    "Slovenská spoločnosť, ktorá dodáva kvalifikovaných pracovníkov pre medzinárodné priemyselné projekty.",
  footerNav: "Navigácia",
  footerServices: "Služby",
  footerContact: "Kontakt",
  footerRights: `© ${year} E&P Industry s.r.o. Všetky práva vyhradené.`,
  backToTop: "Hore",

  // Contact page
  contactKicker: "Kontakt",
  contactTitle: "Povedzte nám, koho potrebujete.",
  contactSub: "Zavolajte priamo alebo vyplňte formulár. Odpovedáme do 24 hodín.",
  modeClient: "Hľadám ľudí",
  modeJob: "Hľadám prácu",
  modeClientHint: "Pre firmy a projekty",
  modeJobHint: "Pre elektrikárov, mechanikov a mechatronikov",
  fName: "Meno a priezvisko",
  fCompany: "Spoločnosť",
  fEmail: "E-mail",
  fPhone: "Telefón",
  fMessage: "Správa",
  fProfession: "Profesia",
  phName: "Vaše meno",
  phCompany: "Názov spoločnosti",
  phEmail: "vas@email.sk",
  phPhone: "+421 …",
  phMessageClient: "Rozsah prác, miesto, termín…",
  phMessageJob: "Vaša prax, certifikáty, odkedy môžete nastúpiť…",
  required: "povinné",
  optional: "nepovinné",
  send: "Odoslať",
  sending: "Odosiela sa…",
  sent: "Ďakujeme. Správu sme prijali a ozveme sa do 24 hodín.",
  sendError: "Správu sa nepodarilo odoslať. Skúste to znova alebo nám zavolajte.",
  crewAttached: "Pripojený montážny list",
  crewRemove: "Odstrániť",
  directLines: "Priame linky",
  emailLabel: "E-mail",
  responseTime: "Odpoveď do 24 hodín",
  profOther: "Iné",
}

export type TranslationKey = keyof typeof sk

const en: Record<TranslationKey, string> = {
  navAbout: "About",
  navServices: "Services",
  navProjects: "Projects",
  navProcess: "Process",
  navContact: "Contact",
  navCta: "Build your crew",
  menu: "Menu",
  close: "Close",
  skip: "Skip to content",
  language: "Language",

  heroKicker: "Skilled people for industrial projects",
  heroL1: "Electricians",
  heroL2: "Mechanics",
  heroL3: "Technicians",
  heroSub:
    "We supply experienced specialists and complete installation teams — from production-line assembly to control-cabinet wiring. In Slovakia, across Europe and beyond.",
  heroCta: "Build your crew",
  heroCallLabel: "Call us directly",
  heroPhotoTag: "Field photo",
  heroPhotoCaption: "Wiring a control cabinet",

  disc_electro_title: "Electrical installations",
  disc_electro_short: "Cabinets, cabling, cable routes",
  disc_electro_desc:
    "Complete electrical installations, cable pulling, tray installation and distribution-cabinet wiring. We supply individual specialists as well as complete installation teams.",
  disc_electro_tags: "Cabinet wiring · Cable pulling · Tray installation · Electrical installations",
  disc_assembly_title: "Industrial assembly",
  disc_assembly_short: "Lines, machines, conveyors",
  disc_assembly_desc:
    "Fitters for the assembly, dismantling and maintenance of machines, production lines and conveyor systems.",
  disc_assembly_tags: "Production lines · Machines · Conveyors · Dismantling & relocation",
  disc_mechatronics_title: "Mechatronics",
  disc_mechatronics_short: "Pneumatics, automation, controls",
  disc_mechatronics_desc:
    "Specialists in pneumatics, automation and control systems. They set up and assemble technological units that combine mechanics and electronics into one working system.",
  disc_mechatronics_tags: "Pneumatics · Automation · Control systems · Machine setup",
  disc_steel_title: "Steel structures & racking",
  disc_steel_short: "Structures, racking, platforms",
  disc_steel_desc:
    "Experienced fitters for fast and precise installation of structures and racking systems to project specification — reliably, safely and without compromise.",
  disc_steel_tags: "Steel structures · Racking systems · Platforms",

  aboutMarker: "About",
  aboutStatement1: "When production is being built, moved or modernised, we send people who know what they're doing.",
  aboutStatement2: "Individual specialists or entire teams — exactly what your project needs.",
  aboutText1:
    "E&P Industry is a Slovak company supplying qualified workers for international industrial projects. We handle mechanical and electrical work in every form — from assembling and dismantling production lines and building racking systems to wiring distribution cabinets, pneumatic systems and technical support for production sites.",
  aboutText2:
    "Our teams work precisely, efficiently and without unnecessary complications. We always put reliability, quality and compliance with current legislation first.",
  fact1K: "Scope",
  fact1V: "Individual specialists and complete teams",
  fact2K: "Deployment",
  fact2V: "Short-term and long-term projects",
  fact3K: "Coverage",
  fact3V: "Slovakia, Europe and beyond",
  fact4K: "Standard",
  fact4V: "Work in line with current legislation",
  aboutPhotoCaption: "Robotic cell — assembly and wiring",

  discMarker: "Services",
  discTitle: "Four trades. One crew.",
  discSub:
    "We build teams around the work, not a spreadsheet — combining trades so the crew on site can cover the full scope.",

  crewMarker: "Request",
  crewTitle: "Build your crew.",
  crewSub: "Pick the trades, headcount and timing. We'll turn it into a concrete offer — we reply within 24 hours.",
  role_electrician: "Electrician",
  role_electrician_d: "Cabinets, cabling, routes",
  role_mechanic: "Mechanic / fitter",
  role_mechanic_d: "Lines, machines, conveyors",
  role_mechatronic: "Mechatronics technician",
  role_mechatronic_d: "Pneumatics, automation",
  role_structural: "Structural fitter",
  role_structural_d: "Steel, racking, platforms",
  crewRoles: "Trades",
  crewDuration: "Duration",
  duration_short: "Under 1 month",
  duration_mid: "1–3 months",
  duration_long: "Over 3 months",
  crewStart: "Start",
  start_asap: "As soon as possible",
  start_month: "Within 30 days",
  start_planned: "Planning ahead",
  crewLocation: "Work location",
  crewLocationPh: "e.g. Ingolstadt, Germany",
  ticketTitle: "Crew request",
  ticketNo: "No.",
  ticketDate: "Date",
  ticketCrew: "Crew",
  ticketTotal: "Total",
  ticketPeople: "ppl",
  ticketEmpty: "Add at least one trade.",
  ticketSend: "Send request",
  ticketNote: "Details carry over to the contact form.",
  decrease: "Remove",
  increase: "Add",

  fieldMarker: "Projects",
  fieldTitle: "From the halls we've worked in.",
  fieldSub: "Real photos from our deployments. No stock images.",
  fieldOpen: "Enlarge photo",
  fieldCtaTitle: "The next hall could be yours.",
  fieldCta: "Send a request",
  lbClose: "Close",
  lbPrev: "Previous",
  lbNext: "Next",

  procMarker: "Process",
  procTitle: "From first call to first shift.",
  proc1T: "Brief",
  proc1D: "You describe the scope, trades, headcount and start date.",
  proc2T: "Selection",
  proc2D: "We put together a crew with experience in exactly this type of work.",
  proc3T: "Mobilisation",
  proc3D: "The team arrives on site on the agreed date and gets to work.",
  proc4T: "One contact",
  proc4D: "For the whole project you deal with one person — us.",

  teamMarker: "Contact",
  teamTitle: "E&P Industry.",
  teamTitleSub: "A direct line. No call centre.",
  lineLabel: "Line",
  teamSub: "When you call, the person who picks up is the one who makes decisions about your project.",
  call: "Call",
  writeEmail: "Send an email",

  careersKicker: "Careers",
  careersTitle: "Electrician, mechanic or mechatronics technician?",
  careersText:
    "We're looking for experienced people who are ready to travel for work on industrial projects. Get in touch.",
  careersCta: "I want to join",

  footerLine: "Got a project? We'll find the people.",
  footerAbout: "A Slovak company supplying qualified workers for international industrial projects.",
  footerNav: "Navigation",
  footerServices: "Services",
  footerContact: "Contact",
  footerRights: `© ${year} E&P Industry s.r.o. All rights reserved.`,
  backToTop: "Top",

  contactKicker: "Contact",
  contactTitle: "Tell us who you need.",
  contactSub: "Call us directly or fill in the form. We reply within 24 hours.",
  modeClient: "I need workers",
  modeJob: "I'm looking for work",
  modeClientHint: "For companies and projects",
  modeJobHint: "For electricians, mechanics and technicians",
  fName: "Full name",
  fCompany: "Company",
  fEmail: "Email",
  fPhone: "Phone",
  fMessage: "Message",
  fProfession: "Trade",
  phName: "Your name",
  phCompany: "Company name",
  phEmail: "you@company.com",
  phPhone: "+49 …",
  phMessageClient: "Scope of work, location, dates…",
  phMessageJob: "Your experience, certificates, when you can start…",
  required: "required",
  optional: "optional",
  send: "Send",
  sending: "Sending…",
  sent: "Thank you. We've received your message and will reply within 24 hours.",
  sendError: "The message couldn't be sent. Please try again or call us.",
  crewAttached: "Attached crew request",
  crewRemove: "Remove",
  directLines: "Direct lines",
  emailLabel: "Email",
  responseTime: "Reply within 24 hours",
  profOther: "Other",
}

const de: Record<TranslationKey, string> = {
  navAbout: "Über uns",
  navServices: "Leistungen",
  navProjects: "Projekte",
  navProcess: "Ablauf",
  navContact: "Kontakt",
  navCta: "Team anfragen",
  menu: "Menü",
  close: "Schließen",
  skip: "Zum Inhalt springen",
  language: "Sprache",

  heroKicker: "Fachkräfte für Industrieprojekte",
  heroL1: "Elektriker",
  heroL2: "Mechaniker",
  heroL3: "Mechatroniker",
  heroSub:
    "Wir stellen erfahrene Fachkräfte und komplette Montageteams — von der Montage von Produktionslinien bis zur Verdrahtung von Schaltschränken. In der Slowakei, in ganz Europa und darüber hinaus.",
  heroCta: "Team zusammenstellen",
  heroCallLabel: "Direkt anrufen",
  heroPhotoTag: "Foto vom Einsatz",
  heroPhotoCaption: "Verdrahtung eines Schaltschranks",

  disc_electro_title: "Elektroinstallationen",
  disc_electro_short: "Schaltschränke, Verkabelung, Kabeltrassen",
  disc_electro_desc:
    "Komplette Elektroinstallationen, Kabelverlegung, Trassenmontage und Verdrahtung von Schaltschränken. Wir stellen einzelne Fachkräfte ebenso wie komplette Montageteams.",
  disc_electro_tags: "Schaltschrankverdrahtung · Kabelzug · Trassenmontage · Elektroinstallation",
  disc_assembly_title: "Industriemontage",
  disc_assembly_short: "Linien, Maschinen, Förderanlagen",
  disc_assembly_desc:
    "Monteure für Montage, Demontage und Wartung von Maschinen, Produktionslinien und Förderanlagen.",
  disc_assembly_tags: "Produktionslinien · Maschinen · Förderanlagen · Demontage & Verlagerung",
  disc_mechatronics_title: "Mechatronik",
  disc_mechatronics_short: "Pneumatik, Automatisierung, Steuerung",
  disc_mechatronics_desc:
    "Spezialisten für Pneumatik, Automatisierung und Steuerungstechnik. Sie montieren und richten technische Einheiten ein, die Mechanik und Elektronik zu einem funktionierenden Ganzen verbinden.",
  disc_mechatronics_tags: "Pneumatik · Automatisierung · Steuerungstechnik · Einrichtung",
  disc_steel_title: "Stahlbau & Regalsysteme",
  disc_steel_short: "Konstruktionen, Regale, Bühnen",
  disc_steel_desc:
    "Erfahrene Monteure für die schnelle und präzise Umsetzung von Konstruktionen und Regalsystemen nach Projekt — zuverlässig, sicher und ohne Kompromisse.",
  disc_steel_tags: "Stahlkonstruktionen · Regalsysteme · Arbeitsbühnen",

  aboutMarker: "Über uns",
  aboutStatement1:
    "Wenn eine Produktion aufgebaut, verlagert oder modernisiert wird, schicken wir Leute, die wissen, was sie tun.",
  aboutStatement2: "Einzelne Fachkräfte oder ganze Teams — genau so, wie Ihr Projekt es braucht.",
  aboutText1:
    "E&P Industry ist ein slowakisches Unternehmen, das qualifizierte Fachkräfte für internationale Industrieprojekte bereitstellt. Wir übernehmen mechanische und elektrotechnische Arbeiten in jeder Form — von Montage und Demontage von Produktionslinien und dem Aufbau von Regalsystemen bis zur Verdrahtung von Schaltschränken, Pneumatik und technischer Unterstützung von Produktionsbetrieben.",
  aboutText2:
    "Unsere Teams arbeiten präzise, effizient und ohne unnötige Komplikationen. Zuverlässigkeit, Qualität und die Einhaltung der geltenden Vorschriften stehen bei uns immer an erster Stelle.",
  fact1K: "Umfang",
  fact1V: "Einzelne Fachkräfte und komplette Teams",
  fact2K: "Einsatz",
  fact2V: "Kurz- und langfristige Projekte",
  fact3K: "Einsatzgebiet",
  fact3V: "Slowakei, Europa und darüber hinaus",
  fact4K: "Standard",
  fact4V: "Arbeit gemäß geltender Vorschriften",
  aboutPhotoCaption: "Roboterzelle — Montage und Verdrahtung",

  discMarker: "Leistungen",
  discTitle: "Vier Gewerke. Ein Team.",
  discSub:
    "Wir stellen Teams nach der Aufgabe zusammen, nicht nach Tabelle — und kombinieren Gewerke so, dass das Team vor Ort den ganzen Umfang abdeckt.",

  crewMarker: "Anfrage",
  crewTitle: "Stellen Sie Ihr Team zusammen.",
  crewSub:
    "Wählen Sie Gewerke, Anzahl und Zeitraum. Daraus erstellen wir ein konkretes Angebot — Antwort innerhalb von 24 Stunden.",
  role_electrician: "Elektriker",
  role_electrician_d: "Schaltschränke, Kabel, Trassen",
  role_mechanic: "Mechaniker / Monteur",
  role_mechanic_d: "Linien, Maschinen, Förderer",
  role_mechatronic: "Mechatroniker",
  role_mechatronic_d: "Pneumatik, Automatisierung",
  role_structural: "Stahlbaumonteur",
  role_structural_d: "Stahl, Regale, Bühnen",
  crewRoles: "Gewerke",
  crewDuration: "Einsatzdauer",
  duration_short: "Unter 1 Monat",
  duration_mid: "1–3 Monate",
  duration_long: "Über 3 Monate",
  crewStart: "Beginn",
  start_asap: "So bald wie möglich",
  start_month: "Innerhalb von 30 Tagen",
  start_planned: "Langfristig geplant",
  crewLocation: "Einsatzort",
  crewLocationPh: "z. B. Ingolstadt, Deutschland",
  ticketTitle: "Montageauftrag",
  ticketNo: "Nr.",
  ticketDate: "Datum",
  ticketCrew: "Team",
  ticketTotal: "Gesamt",
  ticketPeople: "Pers.",
  ticketEmpty: "Fügen Sie mindestens ein Gewerk hinzu.",
  ticketSend: "Anfrage senden",
  ticketNote: "Die Angaben werden ins Kontaktformular übernommen.",
  decrease: "Entfernen",
  increase: "Hinzufügen",

  fieldMarker: "Projekte",
  fieldTitle: "Aus den Hallen, in denen wir gearbeitet haben.",
  fieldSub: "Echte Fotos von unseren Einsätzen. Keine Stockfotos.",
  fieldOpen: "Foto vergrößern",
  fieldCtaTitle: "Die nächste Halle könnte Ihre sein.",
  fieldCta: "Anfrage senden",
  lbClose: "Schließen",
  lbPrev: "Vorheriges",
  lbNext: "Nächstes",

  procMarker: "Ablauf",
  procTitle: "Vom ersten Anruf bis zur ersten Schicht.",
  proc1T: "Anfrage",
  proc1D: "Sie beschreiben Arbeitsumfang, Gewerke, Anzahl der Personen und Starttermin.",
  proc2T: "Auswahl",
  proc2D: "Wir stellen ein Team mit Erfahrung in genau dieser Art von Arbeit zusammen.",
  proc3T: "Einsatz",
  proc3D: "Das Team ist zum vereinbarten Termin vor Ort und legt los.",
  proc4T: "Ein Ansprechpartner",
  proc4D: "Während des gesamten Projekts klären Sie alles mit einer Person — mit uns.",

  teamMarker: "Kontakt",
  teamTitle: "E&P Industry.",
  teamTitleSub: "Direkter Draht. Kein Callcenter.",
  lineLabel: "Leitung",
  teamSub: "Wenn Sie anrufen, nimmt jemand ab, der über Ihr Projekt entscheidet.",
  call: "Anrufen",
  writeEmail: "E-Mail schreiben",

  careersKicker: "Karriere",
  careersTitle: "Sie sind Elektriker, Mechaniker oder Mechatroniker?",
  careersText:
    "Wir suchen erfahrene Leute, die bereit sind, für Industrieprojekte zu reisen. Melden Sie sich bei uns.",
  careersCta: "Ich will dabei sein",

  footerLine: "Ein Projekt? Wir finden die Leute dafür.",
  footerAbout: "Ein slowakisches Unternehmen, das qualifizierte Fachkräfte für internationale Industrieprojekte stellt.",
  footerNav: "Navigation",
  footerServices: "Leistungen",
  footerContact: "Kontakt",
  footerRights: `© ${year} E&P Industry s.r.o. Alle Rechte vorbehalten.`,
  backToTop: "Nach oben",

  contactKicker: "Kontakt",
  contactTitle: "Sagen Sie uns, wen Sie brauchen.",
  contactSub: "Rufen Sie direkt an oder füllen Sie das Formular aus. Wir antworten innerhalb von 24 Stunden.",
  modeClient: "Ich suche Fachkräfte",
  modeJob: "Ich suche Arbeit",
  modeClientHint: "Für Unternehmen und Projekte",
  modeJobHint: "Für Elektriker, Mechaniker und Mechatroniker",
  fName: "Vor- und Nachname",
  fCompany: "Unternehmen",
  fEmail: "E-Mail",
  fPhone: "Telefon",
  fMessage: "Nachricht",
  fProfession: "Gewerk",
  phName: "Ihr Name",
  phCompany: "Firmenname",
  phEmail: "ihre@firma.de",
  phPhone: "+49 …",
  phMessageClient: "Arbeitsumfang, Ort, Termine…",
  phMessageJob: "Ihre Erfahrung, Zertifikate, frühester Beginn…",
  required: "Pflichtfeld",
  optional: "optional",
  send: "Senden",
  sending: "Wird gesendet…",
  sent: "Vielen Dank. Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden.",
  sendError: "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
  crewAttached: "Angehängter Montageauftrag",
  crewRemove: "Entfernen",
  directLines: "Direkte Durchwahl",
  emailLabel: "E-Mail",
  responseTime: "Antwort innerhalb von 24 Stunden",
  profOther: "Sonstiges",
}

const translations: Record<Language, Record<TranslationKey, string>> = { sk, en, de }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// The language comes from the URL (/, /en, /de), so the server renders the right one and Google indexes each
export function LanguageProvider({ lang, children }: { lang: Language; children: ReactNode }) {
  const value = useMemo<LanguageContextType>(
    () => ({
      language: lang,
      t: (key) => translations[lang][key] ?? key,
      lp: (href) => localePath(lang, href),
    }),
    [lang],
  )
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
