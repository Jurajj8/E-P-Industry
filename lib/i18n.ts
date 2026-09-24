import type { Lang } from "@/lib/site"

export const SITE_URL = "https://www.epindustry.sk"
export const LANGS: Lang[] = ["sk", "en", "de"]
export const DEFAULT_LANG: Lang = "sk"

export const ogLocale: Record<Lang, string> = { sk: "sk_SK", en: "en_GB", de: "de_DE" }

/** Slovak lives at the root, other languages under /en and /de. Keeps ?query and #hash. */
export function localePath(lang: Lang, href: string) {
  if (lang === DEFAULT_LANG) return href
  const [, path = "/", rest = ""] = href.match(/^([^?#]*)(.*)$/) || []
  return `/${lang}${path === "/" || path === "" ? "" : path}${rest}`
}

/** Strips the language prefix: "/en/contact" → "/contact", "/de" → "/". */
export function basePath(pathname: string) {
  const stripped = pathname.replace(/^\/(en|de)(?=\/|$)/, "")
  return stripped === "" ? "/" : stripped
}

export function absoluteUrl(lang: Lang, path: string) {
  const p = localePath(lang, path)
  return `${SITE_URL}${p === "/" ? "" : p}`
}
