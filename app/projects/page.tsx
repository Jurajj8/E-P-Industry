"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, User, Filter, Eye, ArrowRight, Play, Award } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import ImageLightbox from "@/components/image-lightbox"

export default function ProjectsPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const projects = [
    {
      id: 1,
      title: t("project1Title"),
      description: t("project1Desc"),
      type: t("project1Type"),
      client: t("project1Client"),
      location: "Bratislava, Slovakia",
      year: "2024",
      category: "industrial",
      images: [
        "/images/project-automotive-plant.png",
        "/images/service-electrical-installations.png",
        "/images/service-industrial-assembly.png",
        "/images/service-maintenance.png",
      ],
    },
    {
      id: 2,
      title: t("project2Title"),
      description: t("project2Desc"),
      type: t("project2Type"),
      client: t("project2Client"),
      location: "Košice, Slovakia",
      year: "2023",
      category: "commercial",
      images: [
        "/images/project-logistics-center.png",
        "/images/service-electrical-installations.png",
        "/images/service-industrial-assembly.png",
        "/images/service-maintenance.png",
      ],
    },
    {
      id: 3,
      title: t("project3Title"),
      description: t("project3Desc"),
      type: t("project3Type"),
      client: t("project3Client"),
      location: "Žilina, Slovakia",
      year: "2023",
      category: "commercial",
      images: [
        "/images/project-shopping-center.png",
        "/images/service-electrical-installations.png",
        "/images/service-industrial-assembly.png",
        "/images/service-design-engineering.png",
      ],
    },
    {
      id: 4,
      title: t("project4Title"),
      description: t("project4Desc"),
      type: t("project4Type"),
      client: t("project4Client"),
      location: "Bratislava, Slovakia",
      year: "2022",
      category: "industrial",
      images: [
        "/images/project-chemical-plant.png",
        "/images/service-electrical-installations.png",
        "/images/service-industrial-assembly.png",
        "/images/service-maintenance.png",
      ],
    },
    {
      id: 5,
      title: t("project5Title"),
      description: t("project5Desc"),
      type: t("project5Type"),
      client: t("project5Client"),
      location: "Nové Zámky, Slovakia",
      year: "2022",
      category: "healthcare",
      images: [
        "/images/project-hospital.png",
        "/images/service-electrical-installations.png",
        "/images/service-maintenance.png",
        "/images/service-design-engineering.png",
      ],
    },
    {
      id: 6,
      title: t("project6Title"),
      description: t("project6Desc"),
      type: t("project6Type"),
      client: t("project6Client"),
      location: "Trnava, Slovakia",
      year: "2021",
      category: "it",
      images: [
        "/images/project-datacenter.png",
        "/images/service-electrical-installations.png",
        "/images/service-maintenance.png",
        "/images/service-design-engineering.png",
      ],
    },
  ]

  const categories = [
    { id: "all", name: "Všetky projekty", count: projects.length },
    { id: "industrial", name: "Priemyselné", count: projects.filter((p) => p.category === "industrial").length },
    { id: "commercial", name: "Komerčné", count: projects.filter((p) => p.category === "commercial").length },
    { id: "healthcare", name: "Zdravotníctvo", count: projects.filter((p) => p.category === "healthcare").length },
    { id: "it", name: "IT infraštruktúra", count: projects.filter((p) => p.category === "it").length },
  ]

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)

  const openLightbox = (project: any, imageIndex = 0) => {
    setCurrentProject(project)
    setCurrentImageIndex(imageIndex)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setCurrentProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (currentProject) {
      setCurrentImageIndex((prev) => (prev + 1) % currentProject.images.length)
    }
  }

  const prevImage = () => {
    if (currentProject) {
      setCurrentImageIndex((prev) => (prev - 1 + currentProject.images.length) % currentProject.images.length)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1F2C3A] via-[#1F2C3A] to-[#2A2F3B] py-20 sm:py-32 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/projects-hero.png')] bg-cover bg-center opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2C3A]/90 to-[#1F2C3A]/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-[#3182A9]/10 border border-[#3182A9]/20 rounded-full text-[#3182A9] text-sm font-medium mb-6">
                <Award className="h-4 w-4 mr-2" />
                Portfólio našich prác
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {t("projectsTitle")}
              </h1>
              <p className="text-lg sm:text-xl text-[#B0B0B0] mb-8 leading-relaxed max-w-2xl">
                Prezentujeme výber našich najvýznamnejších projektov v oblasti elektrotechniky a priemyselných montáží
                realizovaných pre významných klientov.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-[#3182A9] to-[#1A73E8] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-[#1A73E8] hover:to-[#1A73E8] transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 touch-manipulation"
                >
                  <span>Získať ponuku</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => {
                    const element = document.getElementById("projects-grid")
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1F2C3A] transition-all duration-300 flex items-center justify-center space-x-2 touch-manipulation"
                >
                  <Play className="h-5 w-5" />
                  <span>Prezrieť projekty</span>
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="bg-gradient-to-br from-[#3182A9] to-[#1A73E8] rounded-2xl p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/projects-hero.png"
                  alt="E&P Industry projekty - prehľad elektrických inštalácií"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover rounded-xl"
                  priority
                  sizes="(max-width: 1200px) 50vw, 600px"
                />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white p-4 sm:p-6 rounded-xl shadow-xl">
                <div className="text-2xl sm:text-3xl font-bold text-[#1F2C3A]">6</div>
                <div className="text-xs sm:text-sm text-[#1F2C3A]/80">Kategórií projektov</div>
              </div>
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-[#3182A9] p-4 sm:p-6 rounded-xl shadow-xl">
                <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
                <div className="text-xs sm:text-sm text-white/90">Realizovaných projektov</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 sm:py-12 bg-[#F8F9FA] border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-[#3182A9]" />
              <span className="font-semibold text-[#1F2C3A]">Filtrovať projekty:</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-base touch-manipulation ${
                  selectedCategory === category.id
                    ? "bg-[#3182A9] text-white shadow-lg"
                    : "bg-white text-[#1F2C3A] hover:bg-[#1A73E8] hover:text-white border border-gray-200"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects-grid" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#3182A9]/20"
              >
                {/* Main Image */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <button onClick={() => openLightbox(project, 0)} className="relative w-full h-full group/image">
                    <Image
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                        <Eye className="h-6 w-6 text-[#3182A9]" />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-[#3182A9]/10 text-[#3182A9] px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {project.type}
                    </span>
                    <span className="text-xs sm:text-sm text-[#B0B0B0]">{project.year}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1F2C3A] mb-4 group-hover:text-[#3182A9] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#1F2C3A]/80 leading-relaxed mb-6">{project.description}</p>

                  {/* Project Details */}
                  <div className="space-y-3 mb-6 text-sm sm:text-base">
                    <div className="flex items-center space-x-3">
                      <User className="h-4 w-4 text-[#3182A9]" />
                      <span className="text-[#1F2C3A]/80">{project.client}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-[#3182A9]" />
                      <span className="text-[#1F2C3A]/80">{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-[#3182A9]" />
                      <span className="text-[#1F2C3A]/80">
                        {t("completedIn")} {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Additional Images */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {project.images.slice(1, 4).map((image, imgIndex) => (
                      <button
                        key={imgIndex}
                        onClick={() => openLightbox(project, imgIndex + 1)}
                        className="relative h-16 sm:h-20 rounded-lg overflow-hidden group/thumb"
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} ${imgIndex + 2}`}
                          width={120}
                          height={80}
                          className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300">
                            <Eye className="h-3 w-3 text-[#3182A9]" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-[#1F2C3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Máte podobný projekt?</h2>
          <p className="text-lg sm:text-xl text-[#B0B0B0] mb-8 max-w-2xl mx-auto">
            Kontaktujte nás a prediskutujme možnosti realizácie vašich plánov
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-[#3182A9] to-[#1A73E8] text-white px-8 py-4 rounded-lg font-semibold hover:from-[#1A73E8] hover:to-[#1A73E8] transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl"
            >
              <span>Kontaktovať nás</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      {currentProject && (
        <ImageLightbox
          images={currentProject.images}
          isOpen={lightboxOpen}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
          projectTitle={currentProject.title}
        />
      )}
    </div>
  )
}
