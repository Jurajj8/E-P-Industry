"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import LangSwitch from "@/components/site/lang-switch"
import { contacts, disciplines } from "@/lib/site"

export default function Footer() {
  const { t, lp } = useLanguage()

  const navigation = [
    { name: t("navAbout"), href: lp("/#about") },
    { name: t("navServices"), href: lp("/#disciplines") },
    { name: t("navProjects"), href: lp("/#field") },
    { name: t("navProcess"), href: lp("/#process") },
    { name: t("navContact"), href: lp("/contact") },
  ]

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-paper/10 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
          <p className="stretch-wide max-w-3xl text-balance text-4xl font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-6xl">
            {t("footerLine")}
          </p>
          <Link href={lp("/contact")} className="btn-paper flex-shrink-0 self-start lg:self-auto">
            {t("navContact")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Image src="/images/logo-transparent.png" alt="E&P Industry" width={1280} height={435} className="h-11 w-auto" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/55">{t("footerAbout")}</p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-paper/40">{t("footerNav")}</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {navigation.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-paper/75 hover:text-paper">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-paper/40">{t("footerServices")}</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {disciplines.map((d) => (
                <li key={d.id}>
                  <Link href={lp("/#disciplines")} className="link-underline text-paper/75 hover:text-paper">
                    {t(`disc_${d.id}_title` as const)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-paper/40">{t("footerContact")}</h3>
            <ul className="mt-5 space-y-4 text-[15px]">
              {contacts.people.map((p) => (
                <li key={p.tel}>
                  <p className="text-paper">{p.name}</p>
                  <a href={`tel:${p.tel}`} className="link-underline font-mono text-sm text-paper/65 hover:text-paper">
                    {p.phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contacts.email}`}
                  className="link-underline font-mono text-sm text-paper/65 hover:text-paper"
                >
                  {contacts.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-paper/10 py-6 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("footerRights")}</p>
          <div className="flex items-center gap-6">
            <LangSwitch />
            <a href="#" className="flex items-center gap-1.5 font-mono uppercase tracking-wider hover:text-paper">
              {t("backToTop")}
              <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
