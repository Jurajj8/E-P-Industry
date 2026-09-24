"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { photos } from "@/lib/site"

export default function Careers() {
  const { t, lp } = useLanguage()

  return (
    <section className="bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 border-y border-ink/15 py-10 sm:py-14 lg:grid-cols-12 lg:gap-8">
          <div className="relative hidden aspect-[4/3] overflow-hidden bg-paper-300 sm:block lg:col-span-3">
            <Image src={photos.moduleWiring} alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
          </div>
          <div className="lg:col-span-6" data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-steel">{t("careersKicker")}</p>
            <h2 className="stretch-wide mt-3 text-balance text-3xl font-extrabold leading-[1.02] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              {t("careersTitle")}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-ink/70">{t("careersText")}</p>
          </div>
          <div className="lg:col-span-3 lg:text-right" data-reveal>
            <Link href={lp("/contact?type=job")} className="btn-ink w-full sm:w-auto">
              {t("careersCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
