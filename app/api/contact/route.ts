import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, projectType, message } = body

    // Validácia povinných polí
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Meno, email a správa sú povinné polia" }, { status: 400 })
    }

    // Konfigurácia SMTP transportu
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST, // napr. 'smtp.gmail.com'
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465", // true pre 465, false pre ostatné porty
      auth: {
        user: process.env.SMTP_USER, // váš email
        pass: process.env.SMTP_PASS, // heslo alebo app password
      },
    })

    // Email pre firmu
    const companyEmailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.COMPANY_EMAIL || "info@epindustry.sk",
      subject: `Nová správa z kontaktného formulára - ${projectType || "Všeobecný dopyt"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3182A9, #1A73E8); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Nová správa z webu</h1>
          </div>
          
          <div style="padding: 20px; background: #f8f9fa;">
            <h2 style="color: #1F2C3A; border-bottom: 2px solid #3182A9; padding-bottom: 10px;">
              Kontaktné údaje
            </h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #1F2C3A; width: 30%;">Meno:</td>
                <td style="padding: 8px; color: #666;">${name}</td>
              </tr>
              <tr style="background: #fff;">
                <td style="padding: 8px; font-weight: bold; color: #1F2C3A;">Email:</td>
                <td style="padding: 8px; color: #666;">${email}</td>
              </tr>
              ${
                phone
                  ? `
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #1F2C3A;">Telefón:</td>
                <td style="padding: 8px; color: #666;">${phone}</td>
              </tr>
              `
                  : ""
              }
              ${
                company
                  ? `
              <tr style="background: #fff;">
                <td style="padding: 8px; font-weight: bold; color: #1F2C3A;">Spoločnosť:</td>
                <td style="padding: 8px; color: #666;">${company}</td>
              </tr>
              `
                  : ""
              }
              ${
                projectType
                  ? `
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #1F2C3A;">Typ projektu:</td>
                <td style="padding: 8px; color: #666;">${projectType}</td>
              </tr>
              `
                  : ""
              }
            </table>

            <h2 style="color: #1F2C3A; border-bottom: 2px solid #3182A9; padding-bottom: 10px;">
              Správa
            </h2>
            <div style="background: white; padding: 15px; border-left: 4px solid #3182A9; margin-bottom: 20px;">
              ${message.replace(/\n/g, "<br>")}
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #666; font-size: 12px;">
                Táto správa bola odoslaná z kontaktného formulára na www.epindustry.sk<br>
                Dátum: ${new Date().toLocaleString("sk-SK")}
              </p>
            </div>
          </div>
        </div>
      `,
    }

    // Automatická odpoveď pre zákazníka
    const customerEmailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Potvrdenie prijatia správy - E&P Industry",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3182A9, #1A73E8); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">E&P Industry s.r.o.</h1>
            <p style="color: white; margin: 10px 0 0 0;">Ďakujeme za vašu správu</p>
          </div>
          
          <div style="padding: 20px; background: #f8f9fa;">
            <h2 style="color: #1F2C3A;">Vážený/á ${name},</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Ďakujeme za váš záujem o naše služby. Vašu správu sme úspešne prijali 
              a náš tím sa vám ozve do <strong>24 hodín</strong>.
            </p>

            <div style="background: white; padding: 15px; border-left: 4px solid #3182A9; margin: 20px 0;">
              <h3 style="color: #1F2C3A; margin-top: 0;">Vaša správa:</h3>
              <p style="color: #666;">${message.substring(0, 200)}${message.length > 200 ? "..." : ""}</p>
            </div>

            <div style="background: #3182A9; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Kontaktné informácie:</h3>
              <p style="margin: 5px 0;">📞 +421 123 456 789</p>
              <p style="margin: 5px 0;">📧 info@epindustry.sk</p>
              <p style="margin: 5px 0;">📍 Hlavná 123, 010 01 Žilina</p>
            </div>

            <p style="color: #666; line-height: 1.6;">
              V prípade naliehavých záležitostí nás môžete kontaktovať priamo 
              na našej 24/7 pohotovostnej linke.
            </p>

            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666; font-size: 12px;">
                S pozdravom,<br>
                <strong>Tím E&P Industry s.r.o.</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    }

    // Odoslanie emailov
    await transporter.sendMail(companyEmailOptions)
    await transporter.sendMail(customerEmailOptions)

    return NextResponse.json(
      {
        success: true,
        message: "Správa bola úspešne odoslaná. Odpovieme vám do 24 hodín.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Chyba pri odosielaní emailu:", error)
    return NextResponse.json({ error: "Nastala chyba pri odosielaní správy. Skúste to prosím znovu." }, { status: 500 })
  }
}
