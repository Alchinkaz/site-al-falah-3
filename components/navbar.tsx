"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { X, Globe, Menu } from "lucide-react"

export default function Navbar({ forceScrolled = false }: { forceScrolled?: boolean } = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [language, setLanguage] = useState<"kz" | "ru" | "en">("ru")
  const [isScrolled, setIsScrolled] = useState(false)
  const shouldShowScrolled = forceScrolled || isScrolled
  const shouldShowTransparent = mobileMenuOpen && !forceScrolled

  // Initialize scrolled state if forceScrolled is true
  useEffect(() => {
    if (forceScrolled) {
      setIsScrolled(true)
    }
  }, [forceScrolled])

  useEffect(() => {
    if (forceScrolled) return // Don't listen to scroll if forced
    
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const heroHeight = window.innerHeight
        const currentScrollY = window.scrollY
        setIsScrolled(currentScrollY >= heroHeight)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => window.removeEventListener("scroll", controlNavbar)
    }
  }, [forceScrolled])

  const handleLanguageChange = (lang: "kz" | "ru" | "en") => {
    setLanguage(lang)
    setLanguageDropdownOpen(false)
  }

  const navItems = [
    { href: "#about", label: "About us" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "#contacts", label: "Contacts" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          shouldShowTransparent ? "bg-transparent" : shouldShowScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="relative w-full flex items-center justify-between py-3 md:py-4 px-0">
            <Link href="/" className="flex items-center shrink-0">
              <img
                src={
                  shouldShowTransparent
                    ? "/al-falah-logo-white-img.svg"
                    : shouldShowScrolled
                    ? "/al-falah-logo-black-img.svg"
                    : "/al-falah-logo-white-img.svg"
                }
                alt="Al Falah Partners"
                className="block h-12 md:h-12 lg:h-14 xl:h-14 2xl:h-14 shrink-0"
                style={{ width: "160px", height: "48px" }}
              />
            </Link>

            <div className="ml-auto flex items-center space-x-3 md:space-x-4 flex-shrink-0">
              <div className="relative">
                <button
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                    shouldShowTransparent
                      ? "bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white"
                      : shouldShowScrolled
                      ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      : "bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white"
                  }`}
                  aria-label="Select language"
                >
                  <Globe className="w-5 h-5" />
                </button>

                {languageDropdownOpen && (
                  <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[80px] z-50">
                    <button
                      onClick={() => handleLanguageChange("kz")}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        language === "kz" ? "text-[#1e1a61] font-semibold" : "text-gray-700"
                      }`}
                    >
                      Қаз
                    </button>
                    <button
                      onClick={() => handleLanguageChange("ru")}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        language === "ru" ? "text-[#1e1a61] font-semibold" : "text-gray-700"
                      }`}
                    >
                      Рус
                    </button>
                    <button
                      onClick={() => handleLanguageChange("en")}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        language === "en" ? "text-[#1e1a61] font-semibold" : "text-gray-700"
                      }`}
                    >
                      Eng
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`rounded-lg p-2 transition-colors ${
                  shouldShowTransparent
                    ? "bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white"
                    : shouldShowScrolled
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    : "bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white"
                }`}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1e1a61]">
          <div className="flex flex-col h-full pt-24">
            <nav className="flex-1">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
                <ul className="space-y-0">
                  {navItems.map(({ href, label }, index) => (
                    <li key={href}>
                      <a
                        href={href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-4 text-lg font-medium text-white transition-colors hover:text-[#54C6CF] font-inter"
                      >
                        {label}
                      </a>
                      {index < navItems.length - 1 && <div className="h-px bg-white/20"></div>}
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-white/20 mt-0 lg:hidden">
                  <div className="flex items-center justify-center space-x-6">
                    <button
                      onClick={() => setLanguage("kz")}
                      className={`text-lg font-medium transition-colors hover:text-[#54C6CF] ${
                        language === "kz" ? "text-[#54C6CF] font-semibold" : "text-white"
                      }`}
                    >
                      Қаз
                    </button>
                    <div className="w-px h-6 bg-white/30"></div>
                    <button
                      onClick={() => setLanguage("ru")}
                      className={`text-lg font-medium transition-colors hover:text-[#54C6CF] ${
                        language === "ru" ? "text-[#54C6CF] font-semibold" : "text-white"
                      }`}
                    >
                      Рус
                    </button>
                    <div className="w-px h-6 bg-white/30"></div>
                    <button
                      onClick={() => setLanguage("en")}
                      className={`text-lg font-medium transition-colors hover:text-[#54C6CF] ${
                        language === "en" ? "text-[#54C6CF] font-semibold" : "text-white"
                      }`}
                    >
                      Eng
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
