"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsLangOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = () => {
      setIsLangOpen(false)
    }
    if (isLangOpen) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [isLangOpen])

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/#about" },
    { name: t("services"), href: "/#services" },
    { name: t("projects"), href: "/projects" },
    { name: t("contact"), href: "/contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-xl" : "bg-white shadow-lg"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Image
              src="/E-P-Industry/images/logo-transparent.png"
              alt="E&P Industry"
              width={160}
              height={48}
              className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-semibold transition-colors uppercase tracking-wide ${pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "text-[#3182A9]" : "text-[#1F2C3A] hover:text-[#3182A9]"}`}
              >
                {item.name}
                {pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3182A9] rounded-full" />
                  ))}
              </Link>
            ))}
          </nav>

          {/* Search & Language & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLangOpen(!isLangOpen)
                }}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isLangOpen ? "bg-gray-100 text-[#1F2C3A]" : "text-[#1F2C3A] hover:bg-gray-50"}`}
              >
                <span className="text-xs uppercase tracking-wide font-bold">{language}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl py-1 min-w-[100px] border border-gray-200 animate-in slide-in-from-top-1 duration-150">
                  {["sk", "en", "de"].map((lang) => (
                    <button
                      key={lang}
                      onClick={(e) => {
                        e.stopPropagation()
                        setLanguage(lang as "sk" | "en" | "de")
                        setIsLangOpen(false)
                      }}
                      className={`flex items-center justify-center px-3 py-2 w-full text-left text-sm transition-colors ${language === lang ? "bg-[#3182A9]/10 text-[#3182A9]" : "text-[#1F2C3A] hover:bg-gray-50"}`}
                    >
                      <span className="text-xs uppercase font-bold">{lang}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="bg-gradient-to-r from-[#3182A9] to-[#1A73E8] text-white px-6 py-2.5 rounded-lg font-semibold hover:from-[#1A73E8] hover:to-[#1565C0] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm uppercase tracking-wide"
            >
              {t("getQuote")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-[#1F2C3A] p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-3 text-base font-semibold transition-colors rounded-lg touch-manipulation uppercase tracking-wide ${pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "text-[#3182A9] bg-[#3182A9]/10" : "text-[#1F2C3A] hover:text-[#3182A9] hover:bg-gray-50"}`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="pt-3 border-t border-gray-200 mt-3">
                <div className="flex space-x-2 justify-center">
                  {["sk", "en", "de"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang as "sk" | "en" | "de")
                        setIsMenuOpen(false)
                      }}
                      className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold transition-colors touch-manipulation uppercase tracking-wide ${language === lang ? "bg-[#3182A9] text-white" : "text-[#1F2C3A] hover:bg-gray-100 border border-gray-300"}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="bg-gradient-to-r from-[#3182A9] to-[#1A73E8] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#1A73E8] hover:to-[#1565C0] transition-all duration-300 shadow-lg text-center mt-4 uppercase tracking-wide touch-manipulation"
              >
                {t("getQuote")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
