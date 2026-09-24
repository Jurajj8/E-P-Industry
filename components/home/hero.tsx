"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDown, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { contacts, disciplines, photos } from "@/lib/site"

export default function Hero() {
  const { t, lp } = useLanguage()
  const lines = [t("heroL1"), t("heroL2"), t("heroL3")]

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* faint drawing grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F3F1EC 1px, transparent 1px), linear-gradient(to bottom, #F3F1EC 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-0 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col lg:col-span-7 lg:pb-16">
            <p className="flex animate-fade-in items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-paper/60">
              <span className="marker">X0</span>
              {t("heroKicker")}
            </p>

            <h1 className="stretch-wide mt-8 text-[clamp(2.4rem,10.2vw,4.6rem)] font-extrabold leading-[0.92] tracking-[-0.035em] sm:mt-10 lg:text-[min(6.1vw,5.3rem)]">
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.06em]">
                  <span className="block animate-line-up" style={{ animationDelay: `${120 + i * 110}ms` }}>
                    {line}
                    <span className="text-teal-light">.</span>
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="mt-8 max-w-xl animate-fade-in text-pretty text-lg leading-relaxed text-paper/70 sm:text-xl"
              style={{ animationDelay: "500ms" }}
            >
              {t("heroSub")}
            </p>

            <div
              className="mt-10 flex animate-fade-in flex-col gap-4 sm:flex-row sm:items-center sm:gap-8"
              style={{ animationDelay: "650ms" }}
            >
              <Link href={lp("/#crew")} className="btn-paper">
                {t("heroCta")}
                <ArrowDown className="h-4 w-4" />
              </Link>
              <a href={`tel:${contacts.people[0].tel}`} className="group flex items-center gap-3 text-paper/80">
                <span className="flex h-11 w-11 items-center justify-center border border-paper/20 transition-colors group-hover:border-paper/60">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="leading-tight">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
                    {t("heroCallLabel")}
                  </span>
                  <span className="font-mono text-[15px] text-paper">{contacts.people[0].phone}</span>
                </span>
              </a>
            </div>
          </div>

          <figure className="relative lg:col-span-5 lg:-mr-8 xl:-mr-16">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-700 sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[580px]">
              <Image
                src={photos.heroCabinet}
                alt={t("heroPhotoCaption")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="animate-fade-in object-cover object-[30%_50%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
            <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-4 sm:p-6">
              <span className="font-mono text-xs leading-relaxed text-paper/85">
                <span className="block uppercase tracking-[0.18em] text-paper/55">{t("heroPhotoTag")}</span>
                {t("heroPhotoCaption")}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Discipline strip — doubles as a quick index */}
      <div className="relative border-t border-paper/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {disciplines.map((d, i) => (
            <Link
              key={d.id}
              href={lp("/#disciplines")}
              className={`group py-5 pr-4 sm:py-6 ${i % 2 === 1 ? "pl-4 sm:pl-6" : ""} ${
                i > 0 ? "lg:border-l lg:border-paper/10 lg:pl-6" : ""
              } ${i % 2 === 1 ? "border-l border-paper/10" : ""} ${i > 1 ? "border-t border-paper/10 lg:border-t-0" : ""}`}
            >
              <span className="font-mono text-[11px] text-teal-light">{d.n}</span>
              <span className="mt-2 block text-[15px] font-semibold leading-snug text-paper transition-colors group-hover:text-teal-light sm:text-base">
                {t(`disc_${d.id}_title` as const)}
              </span>
              <span className="mt-1 hidden text-sm text-paper/50 sm:block">{t(`disc_${d.id}_short` as const)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
