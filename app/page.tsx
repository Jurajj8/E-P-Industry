"use client"

import {
  ArrowRight,
  CheckCircle,
  Award,
  Clock,
  Shield,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function HomePage() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentProjectSlide, setCurrentProjectSlide] = useState(0)

  const heroSlides = [
    {
      title: t("heroTitle"),
      subtitle: t("heroSubtitle"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/f_auto,q_auto/v1754045378/1_fsn0ao.webp",
      stats: { number: "15+", text: "Rokov skúseností" },
    },
    {
      title: "Moderné technológie pre priemysel",
      subtitle:
        "Využívame najnovšie technológie a postupy pre dosiahnutie najlepších výsledkov vo všetkých projektoch.",
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/f_auto,q_auto/v1754045379/3_xuafga.webp",
      stats: { number: "500+", text: "Dokončených projektov" },
    },
    {
      title: "Certifikovaná kvalita práce",
      subtitle: "Všetky naše práce spĺňajú najvyššie štandardy kvality a bezpečnosti podľa európskych noriem.",
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/f_auto,q_auto/v1754045378/2_fv9fk2.webp",
      stats: { number: "50+", text: "Spokojných klientov" },
    },
  ]

  const projects = [
    {
      id: 1,
      title: t("project1Title"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/v1754312364/backg_ms4s9m.webp",
    },
    {
      id: 2,
      title: t("project1Title"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/v1754490705/IMG_2535_wdcajr.webp",
    },
    {
      id: 3,
      title: t("project1Title"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/v1754490705/IMG_6847_t3lfrw.webp",
    },
    {
      id: 4,
      title: t("project1Title"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/v1754490705/IMG_8850_grwcwq.webp",
    },
    {
      id: 5,
      title: t("project1Title"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/v1754490706/IMG_1123_bkyw4l.webp",
    },
    {
      id: 6,
      title: t("project1Title"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/v1754490706/IMG_3558_ewqs2j.webp",
    },
    {
      id: 7,
      title: t("project1Title"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/v1754490706/IMG_1144_wgofs7.webp",
    },
    {
      id: 8,
      title: t("project1Title"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/v1754490711/IMG_7074_u7dbmu.webp",
    },
    {
      id: 9,
      title: t("project1Title"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/v1754490713/IMG_8610_gx2mji.webp",
    },
    {
      id: 10,
      title: t("project1Title"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/v1754490714/IMG_0710_jkyrww.webp",
    },
    {
      id: 11,
      title: t("project1Title"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/v1754490716/IMG_1131_zhp1ew.webp",
    },
    {
      id: 12,
      title: t("project1Title"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/v1754490716/IMG_5494_x4wqog.webp",
    },
    {
      id: 13,
      title: t("project1Title"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/v1754490716/IMG_2924_ptvsot.webp",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  useEffect(() => {
    const projectTimer = setInterval(() => {
      setCurrentProjectSlide((prev) => (prev + 1) % projects.length)
    }, 5000)
    return () => clearInterval(projectTimer)
  }, [projects.length])

  const services = [
    {
      title: t("service1Title"),
      description: t("service1Desc"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/f_auto,q_auto/v1754045378/1_fsn0ao.webp",
      icon: "⚡",
    },
    {
      title: t("service2Title"),
      description: t("service2Desc"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/f_auto,q_auto/v1754308378/priem_pws6es.webp",
      icon: "🔧",
    },
    {
      title: t("service3Title"),
      description: t("service3Desc"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/f_auto,q_auto/v1754307654/mech_slxowi.webp",
      icon: "🛠️",
    },
    {
      title: t("service4Title"),
      description: t("service4Desc"),
      image: "https://res.cloudinary.com/djreoxyzu/image/upload/f_auto,q_auto/v1754307654/regale_xfbejg.webp",
      icon: "📐",
    },
  ]

  const reasons = [
    {
      title: t("reason1Title"),
      description: t("reason1Desc"),
      icon: Clock,
    },
    {
      title: t("reason3Title"),
      description: t("reason3Desc"),
      icon: CheckCircle,
    },
    {
      title: t("reason4Title"),
      description: t("reason4Desc"),
      icon: Shield,
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const nextProjectSlide = () => {
    setCurrentProjectSlide((prev) => (prev + 1) % projects.length)
  }

  const prevProjectSlide = () => {
    setCurrentProjectSlide((prev) => (prev - 1 + projects.length) % projects.length)
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
                {t("heroTitle")}
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto sm:mx-0">
                {t("heroSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12 justify-center sm:justify-start">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-[#3182A9] to-[#1A73E8] text-white px-8 py-4 rounded-lg font-bold hover:from-[#1A73E8] hover:to-[#1565C0] transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 touch-manipulation uppercase tracking-wide text-sm sm:text-base"
                >
                  <span>{t("getQuote")}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
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
                {t("aboutTitle")}
              </h2>
              <p className="text-base sm:text-lg text-[#1F2C3A]/80 leading-relaxed mb-4 sm:mb-6">{t("aboutText1")}</p>
              <p className="text-base sm:text-lg text-[#1F2C3A]/80 leading-relaxed mb-6 sm:mb-8">{t("aboutText2")}</p>
              {/* <div className="grid grid-cols-2 gap-4 sm:gap-8">
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
              </div> */}
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative">
                <Image
                  src="https://res.cloudinary.com/djreoxyzu/image/upload/f_auto,q_auto/v1754312364/backg_ms4s9m.webp"
                  alt="About E&P Industry"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl w-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2C3A]/20 to-transparent rounded-2xl"></div>
                {/* <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#3182A9] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wide">
                  15+ Rokov
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-16 sm:py-20 bg-gradient-to-br from-[#1F2C3A] via-[#1F2C3A] to-[#2A2F3B] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2C3A]/95 to-[#1F2C3A]/90"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-[#3182A9]/10 border border-[#3182A9]/20 rounded-full text-[#3182A9] text-sm font-medium mb-6">
                <Award className="h-4 w-4 mr-2" />
                Portfólio našich prác
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight uppercase tracking-wide">
                {t("projectsTitle")}
              </h2>
              <p className="text-lg sm:text-xl text-[#B0B0B0] mb-8 leading-relaxed max-w-2xl">
                Prezentujeme výber našich najvýznamnejších projektov v oblasti elektrotechniky a priemyselných montáží
                realizovaných pre významných klientov.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-[#3182A9] to-[#1A73E8] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-[#1A73E8] hover:to-[#1A73E8] transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 touch-manipulation"
                >
                  <span>{t("getQuote")}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Project Image Slider */}
            <div className="relative">
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentProjectSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2C3A]/80 via-transparent to-transparent"></div>
                  </div>
                ))}
              </div>

              {/* Project Slider Controls */}
              <button
                onClick={prevProjectSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 z-20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextProjectSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 z-20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Project Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProjectSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentProjectSlide ? "bg-[#3182A9] scale-125" : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>

              {/* Project Stats */}
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
              {t("servicesTitle")}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="mb-4 sm:mb-6">
              <span className="text-[#3182A9] font-bold text-base sm:text-lg tracking-wider uppercase">Prečo my</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 uppercase tracking-wide">
              {t("whyChooseTitle")}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Dôvody, prečo si klienti vyberajú práve nás pre svoje projekty
            </p>
          </div>

          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8">
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
        </div>
      </section>

      {/* CTA Section */}
    </div>
  )
}
