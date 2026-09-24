"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { LANGS, basePath, localePath } from "@/lib/i18n"

// Links to the same page in the other languages (each language has its own URL)
export default function LangSwitch({ className = "", size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const { language, t } = useLanguage()
  const base = basePath(usePathname() || "/")
  return (
    <div role="group" aria-label={t("language")} className={`flex items-center font-mono ${className}`}>
      {LANGS.map((lang, i) => (
        <span key={lang} className="flex items-center">
          {i > 0 && (
            <span className="px-1.5 text-paper/25" aria-hidden>
              /
            </span>
          )}
          <Link
            href={localePath(lang, base)}
            hrefLang={lang}
            lang={lang}
            aria-current={language === lang ? "true" : undefined}
            className={`uppercase transition-colors ${size === "lg" ? "px-1 py-2 text-base" : "px-0.5 py-1 text-xs"} ${
              language === lang ? "text-paper" : "text-paper/45 hover:text-paper/80"
            }`}
          >
            {lang}
          </Link>
        </span>
      ))}
    </div>
  )
}
