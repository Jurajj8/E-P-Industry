"use client"

import { ArrowRight, Play } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function HeroSection() {
  const { t } = useLanguage()

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToServices = () => {
    const element = document.getElementById("services")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="bg-[#1A1F2B] pt-20 pb-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t("heroTitle")}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">{t("heroSubtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToContact}
                className="bg-[#FF6B00] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#e55a00] transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>{t("getQuote")}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={scrollToServices}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1A1F2B] transition-colors flex items-center justify-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>{t("learnMore")}</span>
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-[#FF6B00] to-[#e55a00] rounded-2xl p-8 shadow-2xl">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="E&P Industry electrical work"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
              <div className="text-2xl font-bold text-[#1A1F2B]">15+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
