"use client"

import { Phone, Mail, Clock, Facebook, Linkedin, Instagram } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function TopBar() {
  const { t } = useLanguage()

  return (
    <div className="bg-[#1F2C3A] text-white py-2 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          {/* Contact Info */}
          <div className="flex flex-wrap items-center space-x-4 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-[#3182A9]" />
              <span>info@epindustry.sk</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-[#3182A9]" />
              <span>+421 123 456 789</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-[#3182A9]" />
              <span>Po - Pi 7:00 - 16:00, So - Ne zatvorené</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-center space-x-3">
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
          </div>
        </div>
      </div>
    </div>
  )
}
