"use client"

import { useLanguage } from "@/contexts/language-context"
import SectionHead from "@/components/site/section-head"

export default function Process() {
  const { t } = useLanguage()
  const steps = [
    [t("proc1T"), t("proc1D")],
    [t("proc2T"), t("proc2D")],
    [t("proc3T"), t("proc3D")],
    [t("proc4T"), t("proc4D")],
  ]

  return (
    <section id="process" data-rail="X5" className="bg-paper-200 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead index="X5" label={t("procMarker")} title={t("procTitle")} />

        {/* A single wire runs through the steps; each step is a terminal on it */}
        <ol className="relative mt-14 grid gap-10 sm:mt-20 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-ink/20 lg:hidden" />
          <span aria-hidden className="absolute left-2 right-0 top-[7px] hidden h-px bg-ink/20 lg:block" />
          {steps.map(([title, desc], i) => (
            <li
              key={title}
              className="relative pl-10 lg:pl-0 lg:pt-12"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-ink bg-paper-200 lg:top-0"
              >
                <span className={`h-[7px] w-[7px] rounded-full ${i === 3 ? "bg-teal" : "bg-ink"}`} />
              </span>
              <span className="font-mono text-xs text-steel">
                X5:{String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="stretch-wide mt-2 text-2xl font-bold tracking-[-0.015em] text-ink">{title}</h3>
              <p className="mt-3 max-w-xs text-pretty leading-relaxed text-ink/70">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
