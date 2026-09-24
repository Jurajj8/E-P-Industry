import type { ReactNode } from "react"

interface SectionHeadProps {
  index: string
  label: string
  title: ReactNode
  sub?: ReactNode
  tone?: "light" | "dark"
  className?: string
}

// Section heading with a terminal marker (X1, X2 …) — the same labels the side rail uses.
export default function SectionHead({ index, label, title, sub, tone = "light", className = "" }: SectionHeadProps) {
  const dark = tone === "dark"
  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:gap-8 ${className}`}>
      <div className="lg:col-span-3">
        <div className="flex items-center gap-3" data-reveal>
          <span className="marker">{index}</span>
          <span
            className={`font-mono text-xs uppercase tracking-[0.18em] ${dark ? "text-paper/60" : "text-steel"}`}
          >
            {label}
          </span>
        </div>
      </div>
      <div className="lg:col-span-9">
        <h2
          data-reveal
          className={`stretch-wide text-balance text-[2.1rem] font-extrabold leading-[0.98] tracking-[-0.02em] sm:text-5xl lg:text-[3.6rem] ${
            dark ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {sub && (
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "80ms" }}
            className={`mt-5 max-w-2xl text-pretty text-lg leading-relaxed ${dark ? "text-paper/65" : "text-ink/65"}`}
          >
            {sub}
          </p>
        )}
      </div>
    </div>
  )
}
