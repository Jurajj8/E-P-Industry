import type React from "react"
import SiteShell, { baseMetadata, baseViewport } from "@/components/site/site-shell"

// Slovak is served without a prefix: / and /contact
export const metadata = baseMetadata
export const viewport = baseViewport

export default function SlovakLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="sk">{children}</SiteShell>
}
