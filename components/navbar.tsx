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
        setIsScrolled(currentScrollY > 10)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      // Call controlNavbar immediately to set the initial state
      controlNavbar(); 
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
      {/* Transparent header on hero (visible before scroll, or when mobile menu open) */}
      {(!forceScrolled && (!isScrolled || mobileMenuOpen)) && (
        <header
          className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ease-in-out bg-transparent`}
        >
          <div className="max-w-[22rem] sm:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="relative w-full flex items-center justify-between py-3 md:py-4 px-0">
              <Link href="/" className="flex items-center shrink-0">
                <img
                  src="/al-falah-logo-white-img.svg"
                  alt="Al Falah Partners"
                  className="block h-10 md:h-10 lg:h-12 xl:h-12 2xl:h-12 w-auto shrink-0 object-contain"
                />
              </Link>

              {/* Centered white text logo when mobile menu is open */}
              <div
                className={`${mobileMenuOpen ? "block" : "hidden"} pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2`}
              >
                <img
                  src="/al-falah-logo-white-text.svg"
                  alt="Al Falah Partners"
                  className="h-8 md:h-9 lg:h-10 xl:h-11 w-auto"
                />
              </div>

              <div className="ml-auto flex items-center space-x-3 md:space-x-4 flex-shrink-0">
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white`}
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
                  className={`rounded-lg p-2 transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white`}
                  aria-label="Menu"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* White header that slides in on scroll */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "top-0 translate-y-0 bg-transparent" :
            shouldShowScrolled || forceScrolled ? "top-0 translate-y-0 bg-white shadow-md" :
            "top-0 -translate-y-full bg-transparent"
          }
        }`}
      >
        <div className="max-w-[22rem] sm:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="relative w-full flex items-center justify-between py-3 md:py-4 px-0">
            <Link href="/" className="flex items-center shrink-0">
              <img
                src={shouldShowScrolled || forceScrolled ? "/al-falah-logo-black-img.svg" : "/al-falah-logo-white-img.svg"}
                alt="Al Falah Partners"
                className="block h-10 md:h-10 lg:h-12 xl:h-12 2xl:h-12 w-auto shrink-0 object-contain"
              />
            </Link>

            {/* Centered logo text shown only in white navbar state (when not transparent and not mobile menu open) */}
            <div
              className={`${(shouldShowScrolled || forceScrolled) && !mobileMenuOpen ? "block" : "hidden"} pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2`}
            >
              <img
                src="/al-falah-logo-black-text.svg"
                alt="Al Falah Partners"
                className="h-8 md:h-9 lg:h-10 xl:h-11 w-auto"
              />
            </div>

            <div className="ml-auto flex items-center space-x-3 md:space-x-4 flex-shrink-0">
              <div className="relative hidden md:block">
                <button
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                    shouldShowScrolled || forceScrolled
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
                  shouldShowScrolled || forceScrolled
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
        <div className="fixed inset-0 z-60 bg-[#1e1a61]">
          <div className="flex flex-col h-full pt-24">
            <nav className="flex-1">
              <div className="max-w-[22rem] sm:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
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

                <div className="hidden">
                  {/* Language selector hidden on mobile menu as requested */}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
