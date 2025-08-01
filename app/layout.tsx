import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://epindustry.sk"),
  title: {
    default: "E&P Industry - Profesionálne elektrické a montážne riešenia | Slovensko",
    template: "%s | E&P Industry - Elektrotechnika a priemyselné montáže",
  },
  description:
    "E&P Industry s.r.o. - Vedúci poskytovateľ elektrotechnických prác a priemyselných montáží na Slovensku. Viac ako 15 rokov skúseností, certifikovaní technici, komplexné riešenia pre priemysel a komerčné objekty. Kontaktujte nás pre bezplatnú konzultáciu.",
  keywords: [
    "elektrické inštalácie Slovensko",
    "priemyselné montáže",
    "elektrotechnika Bratislava",
    "elektrotechnika Košice",
    "elektrotechnika Žilina",
    "údržba elektrických systémov",
    "projektovanie elektroinštalácií",
    "E&P Industry",
    "certifikovaní elektrotechnici",
    "priemyselná automatizácia",
    "mechatronika",
    "oceľové konštrukcie",
    "regálové systémy",
    "elektroinštalácie pre priemysel",
    "komerčné elektroinštalácie",
    "bezpečnostné systémy",
    "LED osvetlenie",
    "smart building systémy",
    "energetické audity",
    "revízie elektroinštalácií",
  ],
  authors: [{ name: "E&P Industry s.r.o.", url: "https://epindustry.sk" }],
  creator: "E&P Industry s.r.o.",
  publisher: "E&P Industry s.r.o.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    alternateLocale: ["en_US", "de_DE"],
    url: "https://epindustry.sk",
    siteName: "E&P Industry - Elektrotechnika a priemyselné montáže",
    title: "E&P Industry - Profesionálne elektrické a montážne riešenia",
    description:
      "Vedúci poskytovateľ elektrotechnických prác a priemyselných montáží na Slovensku. Viac ako 15 rokov skúseností, certifikovaní technici, komplexné riešenia.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "E&P Industry - Profesionálne elektrické a montážne riešenia",
        type: "image/jpeg",
      },
      {
        url: "/images/logo-transparent.png",
        width: 800,
        height: 600,
        alt: "E&P Industry Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@epindustry_sk",
    creator: "@epindustry_sk",
    title: "E&P Industry - Profesionálne elektrické a montážne riešenia",
    description:
      "Vedúci poskytovateľ elektrotechnických prác a priemyselných montáží na Slovensku. Viac ako 15 rokov skúseností.",
    images: ["/images/og-image.png"],
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "facebook-domain-verification": "your-facebook-domain-verification",
    },
  },
  alternates: {
    canonical: "https://epindustry.sk",
    languages: {
      "sk-SK": "https://epindustry.sk",
      "en-US": "https://epindustry.sk/en",
      "de-DE": "https://epindustry.sk/de",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo-icon.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/images/logo-icon.jpg", sizes: "16x16", type: "image/jpeg" },
    ],
    shortcut: "/images/logo-icon.jpg",
    apple: [{ url: "/images/logo-icon.jpg", sizes: "180x180", type: "image/jpeg" }],
    other: [
      {
        rel: "mask-icon",
        url: "/images/logo-icon.jpg",
        color: "#3182A9",
      },
    ],
  },
  manifest: "/manifest.json",
  category: "business",
  classification: "Elektrotechnika a priemyselné montáže",
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3182A9" },
    { media: "(prefers-color-scheme: dark)", color: "#1F2C3A" },
  ],
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "E&P Industry s.r.o.",
              alternateName: "E&P Industry",
              url: "https://epindustry.sk",
              logo: "https://epindustry.sk/images/logo-transparent.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+421-123-456-789",
                contactType: "customer service",
                availableLanguage: ["Slovak", "English", "German"],
                areaServed: "SK",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Hlavná 123",
                addressLocality: "Žilina",
                postalCode: "010 01",
                addressCountry: "SK",
              },
              sameAs: [
                "https://www.facebook.com/epindustry",
                "https://www.linkedin.com/company/epindustry",
                "https://www.instagram.com/epindustry",
              ],
              foundingDate: "2008",
              numberOfEmployees: "50-100",
              industry: "Electrical Installation and Industrial Assembly",
              description:
                "Profesionálne elektrické a montážne riešenia pre priemysel a komerčné objekty na Slovensku.",
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900 overflow-x-hidden`}>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <TopBar />
            <Header />
            <main className="flex-grow" role="main">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>

        {/* Analytics Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics 4
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </body>
    </html>
  )
}
