"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import LangSwitch from "@/components/site/lang-switch"
import RevealObserver from "@/components/site/reveal-observer"
import { contacts } from "@/lib/site"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t, lp } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    if (!isMenuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [isMenuOpen])

  const navigation = [
    { name: t("navAbout"), href: lp("/#about") },
    { name: t("navServices"), href: lp("/#disciplines") },
    { name: t("navProjects"), href: lp("/#field") },
    { name: t("navProcess"), href: lp("/#process") },
    { name: t("navContact"), href: lp("/contact") },
  ]

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
      >
        {t("skip")}
      </a>
      <RevealObserver />
      {/* Solid bar plus an ink extension above it: mobile browsers briefly expose the area above
          a sticky header while the toolbar resizes or the page bounces */}
      <header
        className={`sticky top-0 z-50 border-b bg-ink transition-colors duration-300 before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-40 before:bg-ink ${
          isScrolled || isMenuOpen ? "border-paper/10" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href={lp("/")} className="flex-shrink-0" aria-label="E&P Industry">
            <Image
              src="/images/logo-transparent.png"
              alt="E&P Industry"
              width={1280}
              height={435}
              className="h-9 w-auto sm:h-10"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {navigation.map((item) => {
              const active = item.href.endsWith("/contact") && pathname.endsWith("/contact")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-underline py-1 text-[15px] transition-colors ${
                    active ? "text-paper" : "text-paper/65 hover:text-paper"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={`tel:${contacts.people[0].tel}`}
              className="hidden font-mono text-xs tracking-wide text-paper/65 transition-colors hover:text-paper xl:block"
            >
              {contacts.people[0].phone}
            </a>
            <LangSwitch />
            <Link href={lp("/#crew")} className="btn-teal px-5 py-3 text-sm">
              {t("navCta")}
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="-mr-2 flex h-11 items-center gap-3 px-2 font-mono text-xs uppercase tracking-[0.18em] text-paper lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? t("close") : t("menu")}
            <span className="relative block h-3 w-5" aria-hidden>
              <span
                className={`absolute left-0 h-px w-5 bg-paper transition-transform duration-300 ${
                  isMenuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-5 bg-paper transition-transform duration-300 ${
                  isMenuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </header>
      {/* Kept outside <header> so no ancestor filter/transform can trap this fixed overlay */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[72px] z-50 flex animate-fade-in flex-col [animation-duration:200ms] overflow-y-auto bg-ink px-4 pb-8 pt-6 sm:px-6 lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {navigation.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="stretch-wide flex items-baseline justify-between border-b border-paper/10 py-4 text-3xl font-bold text-paper"
              >
                {item.name}
                <span className="font-mono text-xs font-normal text-paper/40">0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <Link href={lp("/#crew")} onClick={() => setIsMenuOpen(false)} className="btn-teal mt-8 w-full">
            {t("navCta")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <div className="mt-auto space-y-3 pt-10">
            {contacts.people.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="flex justify-between font-mono text-sm text-paper/70">
                <span>{p.name}</span>
                <span className="text-paper">{p.phone}</span>
              </a>
            ))}
            <LangSwitch size="lg" className="pt-4" />
          </div>
        </div>
      )}
    </>
  )
}
