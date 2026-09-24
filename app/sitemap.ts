import type { MetadataRoute } from "next"
import { LANGS, absoluteUrl } from "@/lib/i18n"

const pages = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return pages.flatMap(({ path, priority, changeFrequency }) =>
    LANGS.map((lang) => ({
      url: absoluteUrl(lang, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(LANGS.map((l) => [l, absoluteUrl(l, path)])),
      },
    })),
  )
}
