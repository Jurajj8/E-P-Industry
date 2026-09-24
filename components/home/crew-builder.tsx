"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Minus, Plus } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SectionHead from "@/components/site/section-head"
import {
  crewDurations,
  crewRoles,
  crewStarts,
  crewToParams,
  crewTotal,
  type Crew,
  type CrewDuration,
  type CrewRole,
  type CrewStart,
} from "@/lib/site"

const MAX = 40

function makeRef() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, "0")
  return `EP-${String(d.getFullYear()).slice(2)}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${Math.floor(
    100 + Math.random() * 900,
  )}`
}

export default function CrewBuilder() {
  const { t, language, lp } = useLanguage()
  const router = useRouter()
  const [roles, setRoles] = useState<Record<CrewRole, number>>({
    electrician: 2,
    mechanic: 2,
    mechatronic: 0,
    structural: 0,
  })
  const [duration, setDuration] = useState<CrewDuration>("mid")
  const [start, setStart] = useState<CrewStart>("asap")
  const [location, setLocation] = useState("")
  const [ref, setRef] = useState("EP-······-···")
  const [today, setToday] = useState("")

  useEffect(() => setRef(makeRef()), [])
  useEffect(() => {
    setToday(new Date().toLocaleDateString(language === "en" ? "en-GB" : language, { dateStyle: "medium" }))
  }, [language])

  const total = useMemo(() => crewTotal({ roles }), [roles])

  const bump = (role: CrewRole, delta: number) =>
    setRoles((r) => ({ ...r, [role]: Math.max(0, Math.min(MAX, r[role] + delta)) }))

  const submit = () => {
    if (!total) return
    const crew: Crew = { ref, roles, duration, start, location }
    router.push(lp(`/contact?${crewToParams(crew)}`))
  }

  return (
    <section id="crew" data-rail="X3" className="relative bg-ink py-20 text-paper sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead index="X3" label={t("crewMarker")} title={t("crewTitle")} sub={t("crewSub")} tone="dark" />

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* Controls */}
          <div className="space-y-12 lg:col-span-7">
            <fieldset>
              <legend className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-paper/50">
                {t("crewRoles")}
              </legend>
              <ul className="border-t border-paper/10">
                {crewRoles.map((role) => (
                  <li key={role} className="flex items-center justify-between gap-4 border-b border-paper/10 py-4 sm:py-5">
                    <div className="min-w-0">
                      <p className="text-lg font-semibold leading-tight sm:text-xl">{t(`role_${role}` as const)}</p>
                      <p className="mt-1 font-mono text-xs text-paper/45">{t(`role_${role}_d` as const)}</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center">
                      <button
                        type="button"
                        onClick={() => bump(role, -1)}
                        disabled={roles[role] === 0}
                        aria-label={`${t("decrease")}: ${t(`role_${role}` as const)}`}
                        className="flex h-11 w-11 items-center justify-center border border-paper/20 transition-colors hover:border-paper/60 disabled:opacity-30 disabled:hover:border-paper/20"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <output
                        aria-live="polite"
                        className={`w-12 text-center font-mono text-xl tabular-nums ${
                          roles[role] ? "text-paper" : "text-paper/30"
                        }`}
                      >
                        {String(roles[role]).padStart(2, "0")}
                      </output>
                      <button
                        type="button"
                        onClick={() => bump(role, 1)}
                        disabled={roles[role] === MAX}
                        aria-label={`${t("increase")}: ${t(`role_${role}` as const)}`}
                        className="flex h-11 w-11 items-center justify-center border border-paper/20 transition-colors hover:border-paper/60 disabled:opacity-30"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </fieldset>

            <div className="grid gap-12 sm:grid-cols-2 sm:gap-8">
              <Segmented
                legend={t("crewDuration")}
                name="duration"
                value={duration}
                options={crewDurations.map((d) => ({ value: d, label: t(`duration_${d}` as const) }))}
                onChange={(v) => setDuration(v as CrewDuration)}
              />
              <Segmented
                legend={t("crewStart")}
                name="start"
                value={start}
                options={crewStarts.map((s) => ({ value: s, label: t(`start_${s}` as const) }))}
                onChange={(v) => setStart(v as CrewStart)}
              />
            </div>

            <div>
              <label
                htmlFor="crew-location"
                className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-paper/50"
              >
                {t("crewLocation")}
              </label>
              <input
                id="crew-location"
                value={location}
                maxLength={120}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t("crewLocationPh")}
                className="w-full border-0 border-b border-paper/25 bg-transparent px-0 py-3 text-xl text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-teal-light"
              />
            </div>
          </div>

          {/* Ticket */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <article
                aria-label={t("ticketTitle")}
                className="relative bg-paper text-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] lg:rotate-[0.6deg]"
              >
                <div className="perforation h-4" aria-hidden />
                <div className="px-6 pb-6 pt-3 sm:px-8 sm:pb-8">
                  <header className="flex flex-col gap-3 border-b-2 border-ink pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">E&P Industry s.r.o.</p>
                      <p className="stretch-wide mt-1 text-2xl font-extrabold uppercase tracking-[-0.01em]">
                        {t("ticketTitle")}
                      </p>
                    </div>
                    <div className="whitespace-nowrap font-mono text-xs leading-5 sm:text-right">
                      <p>
                        <span className="text-steel">{t("ticketNo")} </span>
                        <span suppressHydrationWarning>{ref}</span>
                      </p>
                      <p>
                        <span className="text-steel">{t("ticketDate")} </span>
                        <span suppressHydrationWarning>{today || "—"}</span>
                      </p>
                    </div>
                  </header>

                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-steel">{t("ticketCrew")}</p>
                  <ul className="mt-2 min-h-[7.5rem] space-y-1.5 font-mono text-sm">
                    {total === 0 && <li className="py-2 text-steel">{t("ticketEmpty")}</li>}
                    {crewRoles
                      .filter((r) => roles[r] > 0)
                      .map((r) => (
                        <li key={r} className="flex items-baseline gap-2">
                          <span>{t(`role_${r}` as const)}</span>
                          <span className="flex-1 translate-y-[-3px] border-b border-dotted border-ink/35" />
                          <span className="tabular-nums">× {roles[r]}</span>
                        </li>
                      ))}
                  </ul>

                  <div className="mt-5 flex items-end justify-between border-y border-ink/15 py-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">{t("ticketTotal")}</span>
                    <span className="stretch-wide text-5xl font-extrabold leading-none tracking-[-0.03em] tabular-nums">
                      {String(total).padStart(2, "0")}
                      <span className="ml-1.5 font-mono text-sm font-normal tracking-normal text-steel">
                        {t("ticketPeople")}
                      </span>
                    </span>
                  </div>

                  <dl className="mt-4 space-y-2 font-mono text-sm">
                    {[
                      [t("crewDuration"), t(`duration_${duration}` as const)],
                      [t("crewStart"), t(`start_${start}` as const)],
                      [t("crewLocation"), location.trim() || "—"],
                    ].map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-3">
                        <dt className="text-steel">{k}</dt>
                        <dd className="break-words">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex items-center gap-4" aria-hidden>
                    <div className="barcode h-9 flex-1" />
                    <span className="font-mono text-[10px] text-steel" suppressHydrationWarning>
                      {ref}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={submit}
                    disabled={total === 0}
                    className="btn-ink mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t("ticketSend")}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-3 text-center font-mono text-[11px] text-steel">{t("ticketNote")}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Segmented({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string
  name: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <fieldset>
      <legend className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-paper/50">{legend}</legend>
      <div className="flex flex-col border-t border-paper/10">
        {options.map((o) => {
          const checked = o.value === value
          return (
            <label
              key={o.value}
              className="flex cursor-pointer items-center gap-3 border-b border-paper/10 py-3.5 text-[15px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-teal-light"
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`flex h-4 w-4 flex-shrink-0 items-center justify-center border ${
                  checked ? "border-signal" : "border-paper/30"
                }`}
              >
                {checked && <span className="h-2 w-2 bg-signal" />}
              </span>
              <span className={checked ? "text-paper" : "text-paper/60"}>{o.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
