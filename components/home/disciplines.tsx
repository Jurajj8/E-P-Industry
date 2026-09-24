"use client"

import { useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { disciplines } from "@/lib/site"
import SectionHead from "@/components/site/section-head"

export default function Disciplines() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)

  return (
    <section id="disciplines" data-rail="X2" className="border-t border-ink/10 bg-paper py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead index="X2" label={t("discMarker")} title={t("discTitle")} sub={t("discSub")} />

        <div className="mt-14 grid gap-8 sm:mt-20 lg:grid-cols-12">
          {/* Sticky photo (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-paper-300">
                {disciplines.map((d, i) => (
                  <Image
                    key={d.id}
                    src={d.image}
                    alt={t(`disc_${d.id}_title` as const)}
                    fill
                    sizes="40vw"
                    className={`object-cover transition-[opacity,transform] duration-700 ease-out ${
                      i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute left-4 top-4 bg-ink px-2 py-1 font-mono text-xs text-paper">
                  {disciplines[active].n} / 04
                </div>
              </div>
            </div>
          </div>

          {/* Index */}
          <ol className="border-t border-ink/15 lg:col-span-7 lg:col-start-6 lg:pl-8">
            {disciplines.map((d, i) => {
              const isActive = i === active
              return (
                <li
                  key={d.id}
                  className="border-b border-ink/15"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    className="group grid w-full grid-cols-[3rem_1fr] items-baseline gap-2 py-7 text-left sm:grid-cols-[4rem_1fr] sm:py-9"
                  >
                    <span className={`font-mono text-sm ${isActive ? "text-teal" : "text-teal lg:text-steel"}`}>{d.n}</span>
                    <span
                      className={`stretch-wide text-2xl font-bold leading-tight tracking-[-0.02em] transition-colors sm:text-[2.1rem] ${
                        isActive ? "text-ink" : "text-ink lg:text-ink/45 lg:group-hover:text-ink/75"
                      }`}
                    >
                      {t(`disc_${d.id}_title` as const)}
                    </span>
                  </button>

                  {/* Mobile photo */}
                  <div className="relative -mt-2 mb-6 aspect-[4/3] overflow-hidden bg-paper-300 lg:hidden">
                    <Image
                      src={d.image}
                      alt={t(`disc_${d.id}_title` as const)}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out lg:grid-rows-[0fr] lg:opacity-0 ${
                      isActive ? "lg:grid-rows-[1fr] lg:opacity-100" : ""
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-8 sm:pl-16 lg:pb-10">
                        <p className="max-w-xl text-pretty text-lg leading-relaxed text-ink/70">
                          {t(`disc_${d.id}_desc` as const)}
                        </p>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {t(`disc_${d.id}_tags` as const)
                            .split(" · ")
                            .map((tag) => (
                              <li
                                key={tag}
                                className="border border-ink/20 px-2.5 py-1.5 font-mono text-xs text-ink/80"
                              >
                                {tag}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
