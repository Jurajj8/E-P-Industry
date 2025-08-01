"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MapPin, Send } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ContactSection() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
    alert("Message sent successfully!")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1F2B] mb-4">{t("contactTitle")}</h2>
          <p className="text-xl text-gray-600">{t("contactSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#1A1F2B] mb-6">Get in Touch</h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#FF6B00] p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1A1F2B]">{t("phone")}</div>
                    <div className="text-gray-600">+421 123 456 789</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-[#FF6B00] p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1A1F2B]">Email</div>
                    <div className="text-gray-600">info@epindustry.sk</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-[#FF6B00] p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1A1F2B]">{t("address")}</div>
                    <div className="text-gray-600">
                      Hlavná 123
                      <br />
                      010 01 Žilina
                      <br />
                      Slovakia
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1A1F2B] mb-2">
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3182A9] focus:border-transparent outline-none transition-colors text-base"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1A1F2B] mb-2">
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3182A9] focus:border-transparent outline-none transition-colors text-base"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#1A1F2B] mb-2">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3182A9] focus:border-transparent outline-none transition-colors resize-vertical text-base"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6B00] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#e55a00] transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <Send className="h-5 w-5" />
                <span>{t("sendMessage")}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
