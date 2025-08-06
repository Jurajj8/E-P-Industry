"use client"

import { Phone, Mail, Clock, Facebook, Linkedin, Instagram } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function TopBar() {
  const { t } = useLanguage()

  return (
    <div className="hidden sm:block bg-[#1F2C3A] text-white py-2 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-[#3182A9]" />
              <a href="mailto:epindustryy@gmail.com">epindustryy@gmail.com</a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-[#3182A9]" />
              <a href="tel:+421944241733">Erik Staškovan +421 944 241 733</a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-[#3182A9]" />
              <a href="tel:+421948001420">Patrik Potočár +421 948 001 420</a>
            </div>
          </div>

          {/* Social Media */}
          {/* <div className="flex items-center space-x-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#3182A9] transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#3182A9] transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#3182A9] transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  )
}
