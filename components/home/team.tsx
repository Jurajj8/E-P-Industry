"use client"

import { ArrowUpRight, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { contacts } from "@/lib/site"

export default function Team() {
  const { t } = useLanguage()

  return (
    <section id="team" data-rail="X6" className="relative overflow-hidden bg-ink py-20 text-paper sm:py-28 lg:py-36">
      {/* The ampersand from the name, as the connection between the two */}
      <span
        aria-hidden
        className="stretch-wide pointer-events-none absolute -right-[0.08em] top-1/2 -translate-y-1/2 select-none text-[34rem] font-extrabold leading-none text-transparent sm:text-[44rem] lg:text-[52rem]"
        style={{ WebkitTextStroke: "1px rgba(109,178,200,0.22)" }}
      >
        &amp;
      </span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3" data-reveal>
          <span className="marker">X6</span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-paper/60">{t("teamMarker")}</span>
        </div>

        <h2
          data-reveal
          className="stretch-wide mt-8 text-balance text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[5.2rem]"
        >
          {t("teamTitle")}
          <span className="mt-2 block text-paper/45">{t("teamTitleSub")}</span>
        </h2>
        <p data-reveal className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-paper/65">
          {t("teamSub")}
        </p>

        <div className="mt-14 grid border-t border-paper/15 sm:mt-20 md:grid-cols-2">
          {contacts.people.map((p, i) => (
            <a
              key={p.tel}
              href={`tel:${p.tel}`}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
              className={`group relative flex flex-col gap-8 border-b border-paper/15 py-10 transition-colors sm:py-12 md:pr-10 ${
                i === 1 ? "md:border-l md:pl-10" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-teal-light">
                  {t("lineLabel")} {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-12 w-12 items-center justify-center border border-paper/20 transition-colors group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
              <div>
                <p className="stretch-wide whitespace-nowrap text-[1.85rem] font-extrabold leading-none tracking-[-0.02em] tabular-nums sm:text-[2.6rem]">
                  {p.phone}
                </p>
                <p className="mt-4 text-lg text-paper/70 transition-colors group-hover:text-paper">{p.name}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-paper/40">{t("call")} →</p>
              </div>
            </a>
          ))}
        </div>

        <a
          href={`mailto:${contacts.email}`}
          className="group mt-10 inline-flex items-center gap-4 text-paper/75 transition-colors hover:text-paper"
        >
          <Mail className="h-5 w-5 text-teal-light" />
          <span className="link-underline font-mono text-base sm:text-lg">{contacts.email}</span>
        </a>
      </div>
    </section>
  )
}
