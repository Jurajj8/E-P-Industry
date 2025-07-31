"use client"

import { Zap, Settings, Wrench } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ServicesSection() {
  const { t } = useLanguage()

  const services = [
    {
      icon: Zap,
      title: t("service1Title"),
      description: t("service1Desc"),
    },
    {
      icon: Settings,
      title: t("service2Title"),
      description: t("service2Desc"),
    },
    {
      icon: Wrench,
      title: t("service3Title"),
      description: t("service3Desc"),
    },
  ]

  return (
    <section id="services" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1F2B] mb-4">{t("servicesTitle")}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#FF6B00] w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1F2B] mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
