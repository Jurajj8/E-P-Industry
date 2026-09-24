"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowLeft, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SectionHead from "@/components/site/section-head"
import { fieldPhotos } from "@/lib/site"

const pad = (n: number) => String(n).padStart(2, "0")

export default function FieldArchive() {
  const { t, language, lp } = useLanguage()
  const [open, setOpen] = useState<number | null>(null)
  const total = fieldPhotos.length

  return (
    <section id="field" data-rail="X4" className="bg-paper py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead index="X4" label={t("fieldMarker")} title={t("fieldTitle")} sub={t("fieldSub")} />

        <ul className="mt-14 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-20 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-4">
          {fieldPhotos.map((photo, i) => (
            <li key={photo.src} className={i === 0 ? "col-span-2 row-span-2 lg:flex lg:flex-col" : ""} data-reveal>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className={`group block w-full text-left ${i === 0 ? "lg:flex lg:flex-1 lg:flex-col" : ""}`}
                aria-label={`${t("fieldOpen")}: ${photo.caption[language]}`}
              >
                <span
                  className={`relative block overflow-hidden bg-paper-300 ${
                    i === 0 ? "aspect-[4/5] lg:aspect-auto lg:flex-1" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption[language]}
                    fill
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-2.5 flex items-baseline gap-3 font-mono text-xs leading-snug">
                  <span className="text-teal">{pad(i + 1)}</span>
                  <span className="text-ink/70 transition-colors group-hover:text-ink">{photo.caption[language]}</span>
                </span>
              </button>
            </li>
          ))}
          <li data-reveal>
            <Link
              href={lp("/#crew")}
              className="group flex h-full min-h-[14rem] flex-col justify-between bg-ink p-4 text-paper transition-colors hover:bg-ink-700 sm:p-6"
            >
              <span className="font-mono text-xs text-teal-light">
                {pad(total + 1)} / {pad(total + 1)}
              </span>
              <span>
                <span className="stretch-wide block text-lg font-bold leading-tight tracking-[-0.02em] sm:text-2xl">
                  {t("fieldCtaTitle")}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-paper/70 group-hover:text-paper">
                  {t("fieldCta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {open !== null && <Lightbox index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </section>
  )
}

function Lightbox({
  index,
  onIndex,
  onClose,
}: {
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const { t, language } = useLanguage()
  const total = fieldPhotos.length
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)

  const prev = useCallback(() => onIndex((index - 1 + total) % total), [index, onIndex, total])
  const next = useCallback(() => onIndex((index + 1) % total), [index, onIndex, total])

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
      previouslyFocused?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, prev, next])

  const photo = fieldPhotos[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption[language]}
      className="fixed inset-0 z-[70] flex animate-fade-in flex-col bg-ink/[0.97] text-paper [animation-duration:250ms]"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)()
        touchX.current = null
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <span className="font-mono text-xs text-paper/60">
          <span className="text-paper">{pad(index + 1)}</span> / {pad(total)}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center border border-paper/20 hover:border-paper/60"
          aria-label={t("lbClose")}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex-1" onClick={onClose}>
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.caption[language]}
          fill
          priority
          sizes="100vw"
          className="animate-fade-in object-contain px-4 [animation-duration:300ms] sm:px-20"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={prev}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-paper/20 hover:border-paper/60"
          aria-label={t("lbPrev")}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <p className="text-center font-mono text-sm text-paper/80">{photo.caption[language]}</p>
        <button
          type="button"
          onClick={next}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-paper/20 hover:border-paper/60"
          aria-label={t("lbNext")}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
