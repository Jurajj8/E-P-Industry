"use client"

import Image from "next/image"
import { Award, ShieldCheck, Zap, Users, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function CertificationsSection() {
  const { t } = useLanguage()

  const certifications = [
    {
      icon: Award,
      title: "ISO 9001:2015",
      subtitle: "Systém manažérstva kvality",
      description:
        "Medzinárodne uznávaný štandard pre systémy manažérstva kvality, ktorý potvrdzuje náš záväzok k neustálemu zlepšovaniu a spokojnosti zákazníkov.",
      year: "2020",
      validUntil: "2026",
      issuer: "TÜV SÜD Slovakia",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: ShieldCheck,
      title: "BOZP Certifikát",
      subtitle: "Bezpečnosť a ochrana zdravia pri práci",
      description:
        "Komplexná certifikácia v oblasti bezpečnosti práce a ochrany zdravia, zahŕňajúca pravidelné školenia všetkých zamestnancov a dodržiavanie najvyšších bezpečnostných štandardov.",
      year: "2023",
      validUntil: "2025",
      issuer: "Národný inšpektorát práce",
      color: "from-green-600 to-green-700",
    },
    {
      icon: Zap,
      title: "Elektro Licencia",
      subtitle: "Autorizácia pre elektrické inštalácie",
      description:
        "Oficiálne oprávnenie na vykonávanie všetkých typov elektrických inštalácií a revízií podľa platných slovenských a európskych noriem a predpisov.",
      year: "2019",
      validUntil: "2029",
      issuer: "Slovenský elektrotechnický zväz",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: Users,
      title: "ZVPS Členstvo",
      subtitle: "Zväz verejného a súkromného sektora",
      description:
        "Aktívne členstvo v kľúčových priemyselných asociáciách, ktoré nám umožňuje byť v popredí najnovších technológií a priemyselných inovácií.",
      year: "2018",
      validUntil: "Trvalé",
      issuer: "ZVPS Slovakia",
      color: "from-purple-600 to-purple-700",
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-[#F8F9FA] relative overflow-hidden">
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Image
          src="/E-P-Industry/images/logo-full.jpg"
          alt="E&P Industry Background"
          width={800}
          height={800}
          className="w-96 h-96 object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/E-P-Industry/images/logo-icon.jpg"
              alt="E&P Industry"
              width={60}
              height={60}
              className="w-12 h-12 sm:w-15 sm:h-15 object-contain mr-4"
            />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2C3A]">{t("certificationsTitle")}</h2>
          </div>
          <p className="text-lg sm:text-xl text-[#1F2C3A]/80 max-w-3xl mx-auto">{t("certificationsSubtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="text-center group bg-gradient-to-br from-white to-[#F8F9FA] p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#3182A9]/30 relative overflow-hidden"
            >
              <div className="bg-gradient-to-br from-[#3182A9] to-[#1A73E8] w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-10">
                <cert.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1F2C3A] mb-3 sm:mb-4 group-hover:text-[#3182A9] transition-colors relative z-10">
                {cert.title}
              </h3>
              <p className="text-sm font-medium text-[#3182A9] mb-3">{cert.subtitle}</p>
              <p className="text-[#1F2C3A]/80 leading-relaxed text-sm sm:text-base relative z-10 mb-4">
                {cert.description}
              </p>

              {/* Certification Details */}
              <div className="space-y-2 pt-4 border-t border-gray-200 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Vydané:</span>
                  <span className="font-medium text-[#1F2C3A]">{cert.year}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Platné do:</span>
                  <span className="font-medium text-[#1F2C3A]">{cert.validUntil}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Vydavateľ:</span>
                  <span className="font-medium text-[#1F2C3A] text-right text-xs" title={cert.issuer}>
                    {cert.issuer}
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-center mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700">AKTÍVNE</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional certification badges */}
        <div className="mt-16 pt-12 border-t border-[#B0B0B0]/20">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-[#1F2C3A] mb-2">Naše profesionálne certifikácie</h3>
            <p className="text-[#1F2C3A]/80">Overené štandardy kvality a bezpečnosti</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-white p-4 rounded-lg shadow-md border border-[#B0B0B0]/20 flex items-center space-x-3">
              <Image
                src="/E-P-Industry/images/logo-icon.jpg"
                alt="E&P Industry"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="text-sm font-medium text-[#1F2C3A]">ISO 9001:2015</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-[#B0B0B0]/20 flex items-center space-x-3">
              <Image
                src="/E-P-Industry/images/logo-icon.jpg"
                alt="E&P Industry"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="text-sm font-medium text-[#1F2C3A]">BOZP Certifikát</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-[#B0B0B0]/20 flex items-center space-x-3">
              <Image
                src="/E-P-Industry/images/logo-icon.jpg"
                alt="E&P Industry"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="text-sm font-medium text-[#1F2C3A]">Elektro Licencia</span>
            </div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-[#3182A9]/10 text-[#3182A9] rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4 mr-2" />
            Všetky certifikáty sú pravidelne obnovované a auditované
          </div>
        </div>
      </div>
    </section>
  )
}
