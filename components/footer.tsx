"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/#about" },
    { name: t("services"), href: "/#services" },
    { name: t("projects"), href: "/#projects" },
    { name: t("contact"), href: "/contact" },
  ]

  const services = [t("service1Title"), t("service2Title"), t("service3Title"), t("service4Title")]

  return (
    <footer className="bg-[#1F2C3A] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/images/logo-transparent.png"
                alt="E&P Industry"
                width={220}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-[#B0B0B0] text-sm leading-relaxed mb-6">
              {t("footer")}
            </p>
            {/* <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#B0B0B0]/20 p-3 rounded-lg hover:bg-[#3182A9] transition-colors group"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#B0B0B0]/20 p-3 rounded-lg hover:bg-[#3182A9] transition-colors group"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t("quickLinks")}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#B0B0B0] hover:text-[#3182A9] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t("ourServices")}</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-[#B0B0B0] text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t("contactInfo")}</h3>
            <div className="flex flex-col space-y-4">
              {/* Erik */}
              <div>
                <p className="text-white mb-1">Erik Staškovan</p>
                <a href="tel:+421944241733" className="flex items-center space-x-2 text-[#B0B0B0]/80 hover:underline">
                  <Phone className="h-4 w-4 text-[#3182A9]" />
                  <span>+421 944 241 733</span>
                </a>
              </div>

              {/* Patrik */}
              <div>
                <p className="text-white mb-1">Patrik Potočár</p>
                <a href="tel:+421948001420" className="flex items-center space-x-2 text-[#B0B0B0]/80 hover:underline">
                  <Phone className="h-4 w-4 text-[#3182A9]" />
                  <span>+421 948 001 420</span>
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#3182A9]" />
                <a href="mailto:epindustryy@gmail.com" className="text-[#B0B0B0]/80 mb-1 hover:underline">epindustryy@gmail.com</a>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#B0B0B0]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-[#B0B0B0] text-sm">{t("footerText")}</p>
            {/* <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-[#B0B0B0] text-sm">{t("followUs")}</span>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
