"use client"

import { ArrowRight, Play, CheckCircle, Award, Clock, Shield, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import CertificationsSection from "@/components/certifications-section"
import { t } from "@/utils/translation"

const heroSlides = [
  {
    title: t("heroTitle"),
    subtitle: t("heroSubtitle"),
    image: "/images/hero-electrical-work.png",
    stats: { number: "15+", text: "Rokov skúseností" },
  },
  {
    title: "Moderné technológie pre priemysel",
    subtitle: "Využívame najnovšie technológie a postupy pre dosiahnutie najlepších výsledkov vo všetkých projektoch.",
    image: "/images/about-industrial-facility.png",
    stats: { number: "500+", text: "Dokončených projektov" },
  },
  {
    title: "Certifikovaná kvalita práce",
    subtitle: "Všetky naše práce spĺňajú najvyššie štandardy kvality a bezpečnosti podľa európskych noriem.",
    image: "/images/service-electrical-installations.png",
    stats: { number: "50+", text: "Spokojných klientov" },
  },
]

export default function HomePage() {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const services = [
    {
      title: t("service1Title", language),
      description: t("service1Desc", language),
      image: "/images/service-electrical-installations.png",
      icon: "⚡",
    },
    {
      title: t("service2Title", language),
      description: t("service2Desc", language),
      image: "/images/service-industrial-assembly.png",
      icon: "🔧",
    },
    {
      title: t("service3Title", language),
      description: t("service3Desc", language),
      image: "/images/service-maintenance.png",
      icon: "🛠️",
    },
    {
      title: t("service4Title", language),
      description: t("service4Desc", language),
      image: "/images/service-design-engineering.png",
      icon: "📐",
    },
  ]

  const reasons = [
    {
      title: t("reason1Title", language),
      description: t("reason1Desc", language),
      icon: Clock,
    },
    {
      title: t("reason2Title", language),
      description: t("reason2Desc", language),
      icon: Award,
    },
    {
      title: t("reason3Title", language),
      description: t("reason3Desc", language),
      icon: CheckCircle,
    },
    {
      title: t("reason4Title", language),
      description: t("reason4Desc", language),
      icon: Shield,
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3) // Use fixed length instead of heroSlides.length
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3) // Use fixed length instead of heroSlides.length
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative h-[calc(100vh-80px)] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F2C3A]/90 via-[#1F2C3A]/70 to-[#1F2C3A]/50"></div>
            </div>
          </div>
        ))}

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl text-center sm:text-left">
              <div className="mb-4 sm:mb-6">
                <span className="text-[#3182A9] font-bold text-base sm:text-lg tracking-wider uppercase">
                  Profesionálne riešenia
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight uppercase tracking-wide">
                {t("heroTitle", language)}
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto sm:mx-0">
                {t("heroSubtitle", language)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12 justify-center sm:justify-start">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-[#3182A9] to-[#1A73E8] text-white px-8 py-4 rounded-lg font-bold hover:from-[#1A73E8] hover:to-[#1565C0] transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 touch-manipulation uppercase tracking-wide text-sm sm:text-base"
                >
                  <span>{t("getQuote", language)}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/projects"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#1F2C3A] transition-all duration-300 flex items-center justify-center space-x-2 touch-manipulation uppercase tracking-wide text-sm sm:text-base"
                >
                  <Play className="h-5 w-5" />
                  <span>{t("ourProjects", language)}</span>
                </Link>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 inline-block">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-gray-300 text-xs sm:text-sm uppercase tracking-wide">Rokov skúseností</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-20"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-20"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-[#3182A9] scale-125" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-4 sm:mb-6">
                <span className="text-[#3182A9] font-bold text-base sm:text-lg tracking-wider uppercase">O nás</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2C3A] mb-4 sm:mb-6 uppercase tracking-wide">
                {t("aboutTitle", language)}
              </h2>
              <p className="text-base sm:text-lg text-[#1F2C3A]/80 leading-relaxed mb-4 sm:mb-6">
                {t("aboutText1", language)}
              </p>
              <p className="text-base sm:text-lg text-[#1F2C3A]/80 leading-relaxed mb-6 sm:mb-8">
                {t("aboutText2", language)}
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-[#3182A9] mb-2">500+</div>
                  <div className="text-xs sm:text-sm text-[#1F2C3A]/70 uppercase tracking-wide">Projektov</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-[#3182A9] mb-2">50+</div>
                  <div className="text-xs sm:text-sm text-[#1F2C3A]/70 uppercase tracking-wide">
                    Spokojných klientov
                  </div>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative">
                <Image
                  src="/images/about-industrial-facility.png"
                  alt="About E&P Industry"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl w-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2C3A]/20 to-transparent rounded-2xl"></div>
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#3182A9] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wide">
                  15+ Rokov
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="mb-4 sm:mb-6">
              <span className="text-[#3182A9] font-bold text-base sm:text-lg tracking-wider uppercase">Služby</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2C3A] mb-4 sm:mb-6 uppercase tracking-wide">
              {t("servicesTitle", language)}
            </h2>
            <p className="text-lg sm:text-xl text-[#1F2C3A]/80 max-w-3xl mx-auto">
              Poskytujeme komplexné riešenia v oblasti elektrotechniky a priemyselných montáží
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#3182A9]/20"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2C3A]/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 uppercase tracking-wide">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-sm sm:text-base text-[#1F2C3A]/80 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        {/* Dynamic gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F2C3A] via-[#243447] to-[#1F2C3A]"></div>

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2C3A]/95 via-[#1F2C3A]/90 to-[#1F2C3A]/95"></div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#3182A9]/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-[#1A73E8]/10 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#3182A9]/5 to-[#1A73E8]/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M0 10h5v-5h5v5h5v5h-5v5h-5v-5h-5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
                <circle cx="5" cy="5" r="1" fill="currentColor" opacity="0.4" />
                <circle cx="15" cy="15" r="1" fill="currentColor" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" className="text-[#3182A9]" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="mb-4 sm:mb-6">
              <span className="text-[#3182A9] font-bold text-base sm:text-lg tracking-wider uppercase">Prečo my</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 uppercase tracking-wide">
              {t("whyChooseTitle", language)}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Dôvody, prečo si klienti vyberajú práve nás pre svoje projekty
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center"
              >
                {/* Enhanced icon container with subtle glow */}
                <div className="relative mx-auto mb-6 flex justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3182A9] to-[#1A73E8] w-16 h-16 sm:w-20 sm:h-20 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity mx-auto"></div>
                  <div className="relative bg-gradient-to-br from-[#3182A9] to-[#1A73E8] w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl backdrop-blur-sm border border-white/10">
                    <reason.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 uppercase tracking-wide group-hover:text-[#3182A9] transition-colors">
                  {reason.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional visual elements */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-[#3182A9]/30 rounded-full animate-ping"></div>
          <div
            className="absolute bottom-20 right-20 w-1 h-1 bg-[#1A73E8]/40 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 right-10 w-1.5 h-1.5 bg-[#3182A9]/25 rounded-full animate-ping"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>
      </section>

      {/* Certifications Section */}
      <CertificationsSection />

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#3182A9] to-[#1A73E8] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-electrical-work.png')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 uppercase tracking-wide">
            Pripravení začať váš projekt?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kontaktujte nás ešte dnes a získajte bezplatnú konzultáciu pre váš projekt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#3182A9] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 shadow-lg touch-manipulation uppercase tracking-wide text-sm sm:text-base"
            >
              <span>Kontaktovať nás</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/projects"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#1F2C3A] transition-colors flex items-center justify-center space-x-2 touch-manipulation uppercase tracking-wide text-sm sm:text-base"
            >
              <span>Pozrieť projekty</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
