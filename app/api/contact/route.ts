import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { crewRoles, type Lang } from "@/lib/site"

const esc = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

const clip = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const roleSk: Record<string, string> = {
  electrician: "Elektrikár",
  mechanic: "Mechanik / montážnik",
  mechatronic: "Mechatronik",
  structural: "Montážnik konštrukcií",
  other: "Iné",
}
const durationSk: Record<string, string> = { short: "Do 1 mesiaca", mid: "1–3 mesiace", long: "Viac ako 3 mesiace" }
const startSk: Record<string, string> = { asap: "Čo najskôr", month: "Do 30 dní", planned: "Plánujú dopredu" }

const autoReply: Record<Lang, { subject: string; hello: string; body: string; sign: string }> = {
  sk: {
    subject: "Prijali sme vašu správu — E&P Industry",
    hello: "Dobrý deň",
    body: "ďakujeme za správu. Prijali sme ju a ozveme sa vám do 24 hodín. Ak je to súrne, zavolajte nám priamo.",
    sign: "S pozdravom<br>E&amp;P Industry s.r.o.",
  },
  en: {
    subject: "We've received your message — E&P Industry",
    hello: "Hello",
    body: "thank you for your message. We've received it and will get back to you within 24 hours. If it's urgent, please call us directly.",
    sign: "Best regards<br>E&amp;P Industry s.r.o.",
  },
  de: {
    subject: "Wir haben Ihre Nachricht erhalten — E&P Industry",
    hello: "Guten Tag",
    body: "vielen Dank für Ihre Nachricht. Wir haben sie erhalten und melden uns innerhalb von 24 Stunden. Wenn es dringend ist, rufen Sie uns bitte direkt an.",
    sign: "Mit freundlichen Grüßen<br>E&amp;P Industry s.r.o.",
  },
}

const row = (k: string, v: string) =>
  v
    ? `<tr><td style="padding:8px 12px 8px 0;color:#6F767B;font-family:monospace;font-size:12px;text-transform:uppercase;vertical-align:top;width:34%">${k}</td><td style="padding:8px 0;color:#0E1317">${v}</td></tr>`
    : ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Bots fill the hidden field — pretend success, send nothing
    if (clip(body.website, 200)) return NextResponse.json({ success: true })

    const type = body.type === "job" ? "job" : "client"
    const lang: Lang = body.lang === "en" || body.lang === "de" ? body.lang : "sk"
    const name = clip(body.name, 120)
    const email = clip(body.email, 200)
    const phone = clip(body.phone, 40)
    const company = clip(body.company, 160)
    const profession = clip(body.profession, 40)
    const message = clip(body.message, 5000)

    if (!name || !email || !message || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 })
    }

    const crew = type === "client" && body.crew && typeof body.crew === "object" ? body.crew : null
    const crewRows = crew
      ? crewRoles
          .map((r) => [r, Math.max(0, Math.min(99, Number(crew.roles?.[r]) || 0))] as const)
          .filter(([, n]) => n > 0)
      : []
    const crewTotal = crewRows.reduce((s, [, n]) => s + n, 0)

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const heading = type === "job" ? "Záujem o prácu" : crewTotal ? `Dopyt na partiu (${crewTotal} os.)` : "Nový dopyt"

    const crewBlock = crewTotal
      ? `<h2 style="font-size:14px;margin:28px 0 8px;color:#0E1317">Montážny list ${esc(clip(crew.ref, 32))}</h2>
         <table style="width:100%;border-collapse:collapse;border-top:1px solid #D8D4CA">
           ${crewRows.map(([r, n]) => row(roleSk[r], `${n} ×`)).join("")}
           ${row("Spolu", `<strong>${crewTotal} osôb</strong>`)}
           ${row("Dĺžka", esc(durationSk[crew.duration] || ""))}
           ${row("Nástup", esc(startSk[crew.start] || ""))}
           ${row("Miesto", esc(clip(crew.location, 120)))}
         </table>`
      : ""

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.COMPANY_EMAIL,
      replyTo: email,
      subject: `${heading} — ${name}${company ? `, ${company}` : ""}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#F3F1EC;padding:28px">
          <p style="font-family:monospace;font-size:11px;letter-spacing:2px;color:#6F767B;margin:0">E&amp;P INDUSTRY · WEB</p>
          <h1 style="font-size:22px;margin:6px 0 20px;color:#0E1317">${esc(heading)}</h1>
          <table style="width:100%;border-collapse:collapse;border-top:1px solid #D8D4CA">
            ${row("Meno", esc(name))}
            ${row("E-mail", `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
            ${row("Telefón", esc(phone))}
            ${row("Spoločnosť", esc(company))}
            ${row("Profesia", esc(roleSk[profession] || ""))}
            ${row("Jazyk webu", lang.toUpperCase())}
          </table>
          ${crewBlock}
          <h2 style="font-size:14px;margin:28px 0 8px;color:#0E1317">Správa</h2>
          <div style="background:#fff;padding:16px;border-left:3px solid #2A7394;color:#0E1317;line-height:1.5">${esc(message).replace(/\n/g, "<br>")}</div>
          <p style="color:#6F767B;font-size:12px;margin-top:24px">Odoslané ${new Date().toLocaleString("sk-SK")}</p>
        </div>`,
    })

    const reply = autoReply[lang]
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: reply.subject,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#F3F1EC;padding:28px;color:#0E1317;line-height:1.6">
          <p style="font-family:monospace;font-size:11px;letter-spacing:2px;color:#6F767B;margin:0 0 20px">E&amp;P INDUSTRY</p>
          <p>${reply.hello} ${esc(name)},</p>
          <p>${reply.body}</p>
          <p style="font-family:monospace;font-size:13px">
            Erik Staškovan — <a href="tel:+421944241733">+421 944 241 733</a><br>
            Patrik Potočár — <a href="tel:+421948001420">+421 948 001 420</a><br>
            <a href="mailto:ep@infoepindustry.com">ep@infoepindustry.com</a>
          </p>
          <p>${reply.sign}</p>
        </div>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form: sending failed", error instanceof Error ? error.message : error)
    return NextResponse.json({ error: "send_failed" }, { status: 500 })
  }
}
