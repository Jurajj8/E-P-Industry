import type React from "react"
import type { Metadata, Viewport } from "next"
import "@/app/globals.css"
import { archivo, plexMono } from "@/lib/fonts"
import { LanguageProvider } from "@/contexts/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { SITE_URL } from "@/lib/i18n"
import { structuredData } from "@/lib/seo"
import type { Lang } from "@/lib/site"

// Shared by every root layout (Slovak at /, English at /en, German at /de)
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "E&P Industry",
  authors: [{ name: "E&P Industry s.r.o.", url: SITE_URL }],
  creator: "E&P Industry s.r.o.",
  publisher: "E&P Industry s.r.o.",
  category: "business",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-icon.png" },
    { rel: "icon", type: "image/png", url: "/icon1.png" },
    { rel: "icon", type: "image/svg+xml", url: "/icon0.svg" },
  ],
  manifest: "/manifest.json",
}

export const baseViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0E1317",
}

export default function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${archivo.variable} ${plexMono.variable} scroll-smooth`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="E&P Industry" />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(lang)).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider lang={lang}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main" className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
