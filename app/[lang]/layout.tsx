import type React from "react"
import SiteShell, { baseMetadata, baseViewport } from "@/components/site/site-shell"

type Params = { lang: "en" | "de" }

// English and German live under /en and /de; anything else is a 404
export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return [{ lang: "en" }, { lang: "de" }]
}

export const metadata = baseMetadata
export const viewport = baseViewport

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  return <SiteShell lang={params.lang}>{children}</SiteShell>
}
