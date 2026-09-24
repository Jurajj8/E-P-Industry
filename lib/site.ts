export type Lang = "sk" | "en" | "de"
export type Localized = Record<Lang, string>

const CLD = "https://res.cloudinary.com/djreoxyzu/image/upload"

export const photos = {
  heroCabinet: `${CLD}/v1754045378/1_fsn0ao.webp`,
  moduleWiring: `${CLD}/v1754045379/3_xuafga.webp`,
  cabinetConduit: `${CLD}/v1754045378/2_fv9fk2.webp`,
  robotCell: `${CLD}/v1754312364/backg_ms4s9m.webp`,
  kukaLine: `${CLD}/v1754308378/priem_pws6es.webp`,
  mechatronics: `${CLD}/v1754307654/mech_slxowi.webp`,
  conveyor: `${CLD}/v1754490705/IMG_2535_wdcajr.webp`,
  steelFrame: `${CLD}/v1754490705/IMG_6847_t3lfrw.webp`,
  overhead: `${CLD}/v1754490705/IMG_8850_grwcwq.webp`,
  lineAssembly: `${CLD}/v1754490706/IMG_1123_bkyw4l.webp`,
  pneumatics: `${CLD}/v1754490706/IMG_3558_ewqs2j.webp`,
  cabinet: `${CLD}/v1754490706/IMG_1144_wgofs7.webp`,
  cableTrays: `${CLD}/v1754490711/IMG_7074_u7dbmu.webp`,
  platform: `${CLD}/v1754490713/IMG_8610_gx2mji.webp`,
  piping: `${CLD}/v1754490714/IMG_0710_jkyrww.webp`,
  terminals: `${CLD}/v1754490716/IMG_1131_zhp1ew.webp`,
  hall: `${CLD}/v1754490716/IMG_5494_x4wqog.webp`,
  utilities: `${CLD}/v1754490716/IMG_2924_ptvsot.webp`,
}

export const contacts = {
  email: "ep@infoepindustry.com",
  people: [
    { name: "Erik Staškovan", phone: "+421 944 241 733", tel: "+421944241733" },
    { name: "Patrik Potočár", phone: "+421 948 001 420", tel: "+421948001420" },
  ],
}

export const disciplines = [
  { id: "electro", n: "01", image: photos.terminals },
  { id: "assembly", n: "02", image: photos.kukaLine },
  { id: "mechatronics", n: "03", image: photos.mechatronics },
  { id: "steel", n: "04", image: photos.steelFrame },
] as const

export const fieldPhotos: { src: string; caption: Localized }[] = [
  {
    src: photos.hall,
    caption: {
      sk: "Montáž technológie vo výrobnej hale",
      en: "Equipment installation in a production hall",
      de: "Anlagenmontage in einer Produktionshalle",
    },
  },
  {
    src: photos.cabinet,
    caption: {
      sk: "Rozvádzač — silová a riadiaca časť",
      en: "Control cabinet — power and control section",
      de: "Schaltschrank — Leistungs- und Steuerteil",
    },
  },
  {
    src: photos.conveyor,
    caption: { sk: "Montáž dopravníkovej linky", en: "Conveyor line assembly", de: "Montage einer Förderlinie" },
  },
  {
    src: photos.moduleWiring,
    caption: { sk: "Kabeláž technologického modulu", en: "Wiring a technology module", de: "Verkabelung eines Technikmoduls" },
  },
  {
    src: photos.pneumatics,
    caption: { sk: "Pneumatické rozvody a ventily", en: "Pneumatic lines and valves", de: "Pneumatikleitungen und Ventile" },
  },
  {
    src: photos.platform,
    caption: { sk: "Oceľová plošina so zábradlím", en: "Steel platform with railings", de: "Stahlbühne mit Geländer" },
  },
  {
    src: photos.lineAssembly,
    caption: {
      sk: "Mechanická montáž výrobnej linky",
      en: "Mechanical assembly of a production line",
      de: "Mechanische Montage einer Produktionslinie",
    },
  },
  {
    src: photos.cableTrays,
    caption: { sk: "Vertikálne káblové trasy", en: "Vertical cable routes", de: "Vertikale Kabeltrassen" },
  },
  {
    src: photos.cabinetConduit,
    caption: { sk: "Zapojenie rozvádzača na mieste", en: "Cabinet wiring on site", de: "Schaltschrankverdrahtung vor Ort" },
  },
  {
    src: photos.overhead,
    caption: {
      sk: "Nosné konštrukcie a rozvody pod stropom",
      en: "Overhead structures and services",
      de: "Tragkonstruktionen und Deckenleitungen",
    },
  },
  {
    src: photos.piping,
    caption: { sk: "Technologické potrubie a rámy", en: "Process piping and frames", de: "Prozessleitungen und Gestelle" },
  },
  {
    src: photos.utilities,
    caption: { sk: "Pripojenie médií k stroju", en: "Connecting utilities to a machine", de: "Medienanschluss an eine Maschine" },
  },
]

// Crew builder vocabulary — shared by the home page, contact form and API
export const crewRoles = ["electrician", "mechanic", "mechatronic", "structural"] as const
export const crewDurations = ["short", "mid", "long"] as const
export const crewStarts = ["asap", "month", "planned"] as const

export type CrewRole = (typeof crewRoles)[number]
export type CrewDuration = (typeof crewDurations)[number]
export type CrewStart = (typeof crewStarts)[number]

export interface Crew {
  ref: string
  roles: Record<CrewRole, number>
  duration: CrewDuration
  start: CrewStart
  location: string
}

export function crewToParams(crew: Crew) {
  const p = new URLSearchParams()
  p.set("ref", crew.ref)
  crewRoles.forEach((r) => crew.roles[r] > 0 && p.set(r, String(crew.roles[r])))
  p.set("duration", crew.duration)
  p.set("start", crew.start)
  if (crew.location.trim()) p.set("location", crew.location.trim())
  return p.toString()
}

export function crewFromParams(params: URLSearchParams): Crew | null {
  const ref = params.get("ref")
  if (!ref) return null
  const roles = Object.fromEntries(
    crewRoles.map((r) => [r, Math.max(0, Math.min(99, Number.parseInt(params.get(r) || "0", 10) || 0))]),
  ) as Record<CrewRole, number>
  const duration = (crewDurations as readonly string[]).includes(params.get("duration") || "")
    ? (params.get("duration") as CrewDuration)
    : "mid"
  const start = (crewStarts as readonly string[]).includes(params.get("start") || "")
    ? (params.get("start") as CrewStart)
    : "asap"
  return { ref: ref.slice(0, 32), roles, duration, start, location: (params.get("location") || "").slice(0, 120) }
}

export function crewTotal(crew: Pick<Crew, "roles">) {
  return crewRoles.reduce((sum, r) => sum + crew.roles[r], 0)
}
