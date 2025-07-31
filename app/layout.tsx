import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "E&P Industry - Profesionálne elektrické a montážne riešenia",
    template: "%s | E&P Industry",
  },
  description:
    "E&P Industry s.r.o. - Špecialisti na elektrotechnické práce a priemyselné montáže s viac ako 15-ročnými skúsenosťami. Komplexné riešenia pre priemysel, komerčné objekty a infraštruktúru.",
  keywords: [
    "elektrické inštalácie",
    "priemyselné montáže",
    "elektrotechnika",
    "Slovensko",
    "údržba elektrických systémov",
    "projektovanie",
    "E&P Industry",
    "Žilina",
    "Bratislava",
    "Košice",
  ],
  authors: [{ name: "E&P Industry s.r.o." }],
  creator: "E&P Industry s.r.o.",
  publisher: "E&P Industry s.r.o.",
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
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: "https://epindustry.sk",
    siteName: "E&P Industry",
    title: "E&P Industry - Profesionálne elektrické a montážne riešenia",
    description: "Špecialisti na elektrotechnické práce a priemyselné montáže s viac ako 15-ročnými skúsenosťami.",
    images: [
      {
        url: "/images/logo-transparent.png",
        width: 1200,
        height: 630,
        alt: "E&P Industry - Elektrické inštalácie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E&P Industry - Profesionálne elektrické a montážne riešenia",
    description: "Špecialisti na elektrotechnické práce a priemyselné montáže s viac ako 15-ročnými skúsenosťami.",
    images: ["/images/logo-transparent.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: "/images/logo-icon.jpg",
    shortcut: "/images/logo-icon.jpg",
    apple: "/images/logo-icon.jpg",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#3182A9",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/logo-icon.jpg" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo-icon.jpg" />
        <link rel="icon" type="image/jpeg" sizes="32x32" href="/images/logo-icon.jpg" />
        <link rel="icon" type="image/jpeg" sizes="16x16" href="/images/logo-icon.jpg" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <TopBar />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
