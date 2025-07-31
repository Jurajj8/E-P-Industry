"use client"

import { MapPin, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ProjectsSection() {
  const { t } = useLanguage()

  const projects = [
    {
      title: t("project1Title"),
      description: t("project1Desc"),
      location: "Bratislava, Slovakia",
      year: "2024",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
    },
    {
      title: t("project2Title"),
      description: t("project2Desc"),
      location: "Košice, Slovakia",
      year: "2023",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
    },
    {
      title: t("project3Title"),
      description: t("project3Desc"),
      location: "Žilina, Slovakia",
      year: "2023",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
    },
  ]

  return (
    <section id="projects" className="py-20 bg-[#1A1F2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t("projectsTitle")}</h2>
          <p className="text-xl text-gray-300">{t("projectsSubtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1A1F2B] mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{project.year}</span>
                  </div>
                </div>

                {/* Additional project images */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {project.images.slice(1).map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} ${imgIndex + 2}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
