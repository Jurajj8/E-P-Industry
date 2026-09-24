"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import type { TranslationKey } from "@/contexts/language-context"

const ITEMS: { id: string; code: string; label: TranslationKey }[] = [
  { id: "about", code: "X1", label: "aboutMarker" },
  { id: "disciplines", code: "X2", label: "discMarker" },
  { id: "crew", code: "X3", label: "crewMarker" },
  { id: "field", code: "X4", label: "fieldMarker" },
  { id: "process", code: "X5", label: "procMarker" },
  { id: "team", code: "X6", label: "teamMarker" },
]

// Fixed side rail on wide screens: the page is wired like a cabinet, X1 → X6.
export default function TerminalRail() {
  const { t } = useLanguage()
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = ITEMS.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((s) => io.observe(s))
    // Above X1 (the hero) nothing is lit
    const onScroll = () => {
      if (sections[0] && window.scrollY + window.innerHeight * 0.5 < sections[0].offsetTop) setActive(null)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <nav
      aria-label="Sekcie"
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 mix-blend-difference rail:block"
    >
      <ol className="relative flex flex-col gap-5">
        <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-white/40" />
        {ITEMS.map((item) => {
          const on = active === item.id
          return (
            <li key={item.id} className="pointer-events-auto">
              <a href={`#${item.id}`} className="group flex items-center gap-3 text-white">
                <span
                  className={`relative block h-[11px] w-[11px] rounded-full border border-white transition-colors ${
                    on ? "bg-white" : "bg-black"
                  }`}
                />
                <span
                  className={`font-mono text-[11px] tracking-wider transition-opacity ${
                    on ? "opacity-100" : "opacity-50 group-hover:opacity-100"
                  }`}
                >
                  {item.code}
                  <span className="ml-2 uppercase opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {t(item.label)}
                  </span>
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
