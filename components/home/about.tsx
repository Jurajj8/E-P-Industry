"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { photos } from "@/lib/site"

export default function About() {
  const { t } = useLanguage()
  const facts = [
    [t("fact1K"), t("fact1V")],
    [t("fact2K"), t("fact2V")],
    [t("fact3K"), t("fact3V")],
    [t("fact4K"), t("fact4V")],
  ]

  return (
    <section id="about" data-rail="X1" className="bg-paper py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3" data-reveal>
              <span className="marker">X1</span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-steel">{t("aboutMarker")}</span>
            </div>
          </div>
          <p
            data-reveal
            className="text-balance text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.015em] text-ink sm:text-4xl lg:col-span-9 lg:text-[2.9rem]"
          >
            {t("aboutStatement1")} <span className="text-steel">{t("aboutStatement2")}</span>
          </p>
        </div>

        <div className="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-8">
          <figure className="lg:col-span-5 lg:col-start-1" data-reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-300">
              <Image
                src={photos.robotCell}
                alt={t("aboutPhotoCaption")}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex justify-between font-mono text-xs text-steel">
              <span>{t("aboutPhotoCaption")}</span>
              <span aria-hidden>EP / 01</span>
            </figcaption>
          </figure>

          <div className="flex flex-col justify-between gap-12 lg:col-span-6 lg:col-start-7">
            <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink/75" data-reveal>
              <p>{t("aboutText1")}</p>
              <p>{t("aboutText2")}</p>
            </div>

            <dl className="border-t border-ink/15" data-reveal>
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-4 border-b border-ink/15 py-4 sm:py-5">
                  <dt className="font-mono text-xs uppercase leading-6 tracking-[0.14em] text-steel">{k}</dt>
                  <dd className="col-span-2 text-base font-semibold leading-6 text-ink sm:text-lg">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
