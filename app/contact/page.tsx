"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Send, CheckCircle, ArrowRight, Play, MessageCircle, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Správa bola úspešne odoslaná!",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "",
          message: "",
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Nastala chyba pri odosielaní správy.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Nastala chyba pri odosielaní správy. Skúste to prosím znovu.",
      })
    } finally {
      setIsSubmitting(false)
      // Skryť správu po 5 sekundách
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" })
      }, 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const projectTypes = ["Elektrické inštalácie", "Priemyselné montáže", "Údržba a servis", "Projektovanie", "Iné"]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1F2C3A] via-[#1F2C3A] to-[#2A2F3B] py-20 sm:py-32 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/contact-hero.png')] bg-cover bg-center opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2C3A]/90 to-[#1F2C3A]/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-[#3182A9]/10 border border-[#3182A9]/20 rounded-full text-[#3182A9] text-sm font-medium mb-6">
                <MessageCircle className="h-4 w-4 mr-2" />
                Sme tu pre vás
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {t("contactTitle")}
              </h1>
              <p className="text-lg sm:text-xl text-[#B0B0B0] mb-8 leading-relaxed max-w-2xl">
                Hľadáte skúsených pracovníkov? Alebo ste elektrikár či mechanik pripravený vycestovať?<p></p>
                Ozvite sa nám – prepájame firmy s kvalitnými ľuďmi.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => {
                    const element = document.getElementById("contact-form")
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="bg-gradient-to-r from-[#3182A9] to-[#1A73E8] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-[#1A73E8] hover:to-[#1A73E8] transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 touch-manipulation"
                >
                  <span>Napísať správu</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="bg-gradient-to-br from-[#3182A9] to-[#1A73E8] rounded-2xl p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/contact-hero.png"
                  alt="E&P Industry kontakt - konzultácia s klientom"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover rounded-xl"
                  priority
                  sizes="(max-width: 1200px) 50vw, 600px"
                />
              </div>
              
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-[#3182A9] p-4 sm:p-6 rounded-xl shadow-xl">
                <div className="text-2xl sm:text-3xl font-bold text-white">{"<24h"}</div>
                <div className="text-xs sm:text-sm text-white/90">Odpoveď na email</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="py-16 sm:py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#1F2C3A] mb-6 sm:mb-8">{t("getInTouch")}</h2>
                <p className="text-lg text-[#1F2C3A]/80 leading-relaxed mb-8">
                  Sme tu pre vás. Kontaktujte nás telefonicky alebo emailom. Radi prediskutujeme váš projekt a nájdeme
                  najlepšie riešenie.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 touch-manipulation">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#3182A9] p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F2C3A] mb-2">{t("phoneLabel")}</h3>
                      <p>Erik Staškovan</p>
                      <a href="tel:+421944241733" className="text-[#1F2C3A]/80 hover:underline">+421 944 241 733</a>
                      <p className="mt-3">Patrik Potočár</p>
                      <a href="tel:+421948001420" className="text-[#1F2C3A]/80 hover:underline">+421 948 001 420</a>
                      <p className="text-sm text-gray-500 mt-2">24/7 pohotovostná linka</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 touch-manipulation">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#3182A9] p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F2C3A] mb-2">{t("emailLabel")}</h3>
                      <a href="mailto:epindustryy@gmail.com" className="text-[#1F2C3A]/80 mb-1 hover:underline">epindustryy@gmail.com</a>
                      <p className="text-sm text-gray-500 mt-2">Odpoveď do 24 hodín</p>
                    </div>
                  </div>
                </div>

                {/* <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 touch-manipulation">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#3182A9] p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F2C3A] mb-2">{t("addressLabel")}</h3>
                      <p className="text-[#1F2C3A]/80">
                        Hlavná 123
                        <br />
                        010 01 Žilina
                        <br />
                        Slovakia
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-[#1F2C3A] mb-8">{t("contactForm")}</h2>

              {/* Status Messages */}
              {submitStatus.type === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p className="text-green-800 text-sm">{submitStatus.message}</p>
                </div>
              )}

              {submitStatus.type === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-800 text-sm">{submitStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1F2C3A] mb-2">
                      {t("name")} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3182A9] focus:border-transparent outline-none transition-colors"
                      placeholder="Vaše meno a priezvisko"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1F2C3A] mb-2">
                      {t("email")} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3182A9] focus:border-transparent outline-none transition-colors"
                      placeholder="vas@email.sk"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#1F2C3A] mb-2">
                      {t("phone")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3182A9] focus:border-transparent outline-none transition-colors"
                      placeholder="+421 123 456 789"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-[#1F2C3A] mb-2">
                      {t("company")}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3182A9] focus:border-transparent outline-none transition-colors"
                      placeholder="Názov spoločnosti"
                    />
                  </div>
                </div>

                {/* <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-[#1F2C3A] mb-2">
                    Typ projektu
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3182A9] focus:border-transparent outline-none transition-colors"
                  >
                    <option value="">Vyberte typ projektu</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div> */}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1F2C3A] mb-2">
                    {t("message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3182A9] focus:border-transparent outline-none resize-vertical"
                    placeholder="Opíšte váš projekt alebo požiadavky..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#3182A9] to-[#1A73E8] text-white px-8 py-4 rounded-lg font-semibold hover:from-[#1A73E8] hover:to-[#1A73E8] transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Odosiela sa...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>{t("sendMessage")}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
