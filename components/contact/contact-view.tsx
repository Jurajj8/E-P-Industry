"use client"

import type React from "react"
import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AlertCircle, ArrowRight, Check, ChevronDown, Mail, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { contacts, crewFromParams, crewRoles, crewTotal, type Crew } from "@/lib/site"

type Mode = "client" | "job"

const emptyForm = { name: "", email: "", phone: "", company: "", profession: "", message: "", website: "" }

// Reads ?type= and the crew request from the URL. Kept in its own Suspense boundary
// so the rest of the contact page is still rendered on the server (and indexed).
function QuerySync({ onChange }: { onChange: (params: URLSearchParams) => void }) {
  const params = useSearchParams()
  useEffect(() => onChange(new URLSearchParams(params.toString())), [params, onChange])
  return null
}

export default function ContactView() {
  const { t, language, lp } = useLanguage()
  const router = useRouter()

  const [mode, setMode] = useState<Mode>("client")
  const [crew, setCrew] = useState<Crew | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const syncQuery = useCallback((params: URLSearchParams) => {
    setMode(params.get("type") === "job" ? "job" : "client")
    setCrew(crewFromParams(params))
  }, [])

  const crewTotalCount = useMemo(() => (crew ? crewTotal(crew) : 0), [crew])

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const removeCrew = () => {
    setCrew(null)
    router.replace(lp("/contact"), { scroll: false })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: mode, lang: language, crew: mode === "client" ? crew : null }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus("sent")
      setForm(emptyForm)
    } catch {
      setStatus("error")
    }
  }

  const input =
    "w-full border border-ink/20 bg-white px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-ink/35 hover:border-ink/40 focus:border-teal focus:ring-1 focus:ring-teal"
  const label = "mb-2 flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.14em] text-ink/70"

  return (
    <section className="bg-paper lg:bg-[linear-gradient(to_right,#0E1317_calc(50%-64px),#F3F1EC_calc(50%-64px))]">
      <Suspense fallback={null}>
        <QuerySync onChange={syncQuery} />
      </Suspense>
      <div className="mx-auto grid max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Left — direct lines */}
        <div className="bg-ink px-4 pb-16 pt-12 text-paper sm:px-6 sm:pt-16 lg:col-span-5 lg:bg-transparent lg:px-0 lg:py-24">
          <div className="lg:sticky lg:top-28">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-paper/60">
              <span className="marker">X6</span>
              {t("contactKicker")}
            </p>
            <h1 className="stretch-wide mt-8 text-balance text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[4.2rem]">
              {t("contactTitle")}
            </h1>
            <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-paper/65">{t("contactSub")}</p>

            <p className="mt-14 font-mono text-xs uppercase tracking-[0.18em] text-paper/40">{t("directLines")}</p>
            <ul className="mt-4 border-t border-paper/15">
              {contacts.people.map((p, i) => (
                <li key={p.tel} className="border-b border-paper/15">
                  <a href={`tel:${p.tel}`} className="group flex items-center justify-between gap-4 py-5">
                    <span className="flex items-center gap-5">
                      <span className="w-8 font-mono text-sm text-teal-light">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="block text-lg font-semibold">{p.name}</span>
                        <span className="font-mono text-[15px] text-paper/65 group-hover:text-paper">{p.phone}</span>
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 text-paper/40 transition-transform group-hover:translate-x-1 group-hover:text-paper" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${contacts.email}`}
              className="mt-8 inline-flex items-center gap-3 font-mono text-[15px] text-paper/75 hover:text-paper"
            >
              <Mail className="h-4 w-4 text-teal-light" />
              <span className="link-underline">{contacts.email}</span>
            </a>
            <p className="mt-3 font-mono text-xs text-paper/40">{t("responseTime")}</p>
          </div>
        </div>

        {/* Right — form */}
        <div className="px-4 py-12 sm:px-6 sm:py-16 lg:col-span-6 lg:col-start-7 lg:px-0 lg:py-24">
          <div role="tablist" aria-label={t("contactKicker")} className="grid grid-cols-2 border border-ink/20">
            {(["client", "job"] as Mode[]).map((m) => (
              <button
                key={m}
                role="tab"
                type="button"
                aria-selected={mode === m}
                onClick={() => {
                  setMode(m)
                  setStatus("idle")
                }}
                className={`px-4 py-4 text-left transition-colors sm:px-5 ${
                  mode === m ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-paper-200"
                }`}
              >
                <span className="block text-base font-semibold sm:text-lg">
                  {m === "client" ? t("modeClient") : t("modeJob")}
                </span>
                <span className={`mt-0.5 block text-xs sm:text-sm ${mode === m ? "text-paper/60" : "text-ink/55"}`}>
                  {m === "client" ? t("modeClientHint") : t("modeJobHint")}
                </span>
              </button>
            ))}
          </div>

          {mode === "client" && crew && crewTotalCount > 0 && (
            <div className="mt-6 border border-dashed border-ink/35 bg-white/60 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">{t("crewAttached")}</p>
                  <p className="mt-1 font-mono text-sm text-ink">{crew.ref}</p>
                </div>
                <button
                  type="button"
                  onClick={removeCrew}
                  className="flex items-center gap-1.5 font-mono text-xs text-steel hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                  {t("crewRemove")}
                </button>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {crewRoles
                  .filter((r) => crew.roles[r] > 0)
                  .map((r) => (
                    <li key={r} className="bg-ink px-2.5 py-1.5 font-mono text-xs text-paper">
                      {crew.roles[r]} × {t(`role_${r}` as const)}
                    </li>
                  ))}
              </ul>
              <p className="mt-3 font-mono text-xs leading-relaxed text-ink/65">
                {t("ticketTotal")}: {crewTotalCount} {t("ticketPeople")} · {t(`duration_${crew.duration}` as const)} ·{" "}
                {t(`start_${crew.start}` as const)}
                {crew.location ? ` · ${crew.location}` : ""}
              </p>
            </div>
          )}

          {status === "sent" ? (
            <div className="mt-8 border border-teal/40 bg-white p-8" role="status">
              <span className="flex h-11 w-11 items-center justify-center bg-teal text-white">
                <Check className="h-5 w-5" />
              </span>
              <p className="stretch-wide mt-5 text-2xl font-bold tracking-[-0.01em] text-ink">{t("sent")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative mt-8 space-y-6">
              {/* honeypot */}
              <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={label}>
                    {t("fName")} <span className="normal-case tracking-normal text-ink/40">{t("required")}</span>
                  </label>
                  <input id="name" name="name" required autoComplete="name" value={form.name} onChange={update} placeholder={t("phName")} className={input} />
                </div>
                {mode === "client" ? (
                  <div>
                    <label htmlFor="company" className={label}>
                      {t("fCompany")}
                    </label>
                    <input id="company" name="company" autoComplete="organization" value={form.company} onChange={update} placeholder={t("phCompany")} className={input} />
                  </div>
                ) : (
                  <div>
                    <label htmlFor="profession" className={label}>
                      {t("fProfession")}
                    </label>
                    <div className="relative">
                      <select id="profession" name="profession" value={form.profession} onChange={update} className={`${input} appearance-none pr-10`}>
                        <option value="">—</option>
                        {crewRoles.map((r) => (
                          <option key={r} value={r}>
                            {t(`role_${r}` as const)}
                          </option>
                        ))}
                        <option value="other">{t("profOther")}</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60" />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className={label}>
                    {t("fEmail")} <span className="normal-case tracking-normal text-ink/40">{t("required")}</span>
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={update} placeholder={t("phEmail")} className={input} />
                </div>
                <div>
                  <label htmlFor="phone" className={label}>
                    {t("fPhone")}
                  </label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update} placeholder={t("phPhone")} className={input} />
                </div>
              </div>

              <div>
                <label htmlFor="message" className={label}>
                  {t("fMessage")} <span className="normal-case tracking-normal text-ink/40">{t("required")}</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  maxLength={5000}
                  value={form.message}
                  onChange={update}
                  placeholder={mode === "client" ? t("phMessageClient") : t("phMessageJob")}
                  className={`${input} resize-y`}
                />
              </div>

              {status === "error" && (
                <p role="alert" className="flex items-start gap-3 border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  {t("sendError")}
                </p>
              )}

              <button type="submit" disabled={status === "sending"} className="btn-teal w-full disabled:opacity-60 sm:w-auto sm:px-10">
                {status === "sending" ? t("sending") : t("send")}
                {status !== "sending" && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
