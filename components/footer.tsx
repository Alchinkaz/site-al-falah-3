"use client"

import { i18n, readLang } from "@/lib/i18n"
import { useEffect, useState } from "react"

export default function Footer() {
  const [lang, setLang] = useState(readLang())
  useEffect(() => {
    const handler = (e: any) => setLang(e.detail?.lang || readLang())
    window.addEventListener("language-changed", handler)
    return () => window.removeEventListener("language-changed", handler)
  }, [])

  const [ctaLine1, ctaLine2] = i18n.ctaTitle[lang]

  return (
    <footer className="font-inter" style={{ backgroundColor: "#1e1a61" }}>
      {/* CTA top block kept exactly as before, now inside the footer */}
      <section className="py-24">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {ctaLine1}
            <br />
            {ctaLine2}
          </h2>
        </div>
      </section>

      {/* Original footer content */}
      <div className="py-12">
      <div className="relative max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-8">
          {/* Contact information - left aligned */}
          <div className="flex flex-col gap-1 text-white/80 text-sm">
            <p className="font-medium">{i18n.footerContactUs[lang]}</p>
            <p>{i18n.footerNameAltay[lang]}</p>
            <p>{i18n.footerRoleAltay[lang]}</p>
            <a href="mailto:altay@falahpartners.com" className="hover:text-white transition-colors">
              altay@falahpartners.com
            </a>
          </div>

          {/* Copyright - centered on desktop, left on mobile */}
          <div className="text-white/80 text-sm text-left md:absolute md:left-1/2 md:-translate-x-1/2">
            <p>© 2025 Al Falah Capital Partners</p>
            <p>
              <a
                href="https://wa.me/77710798939"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {i18n.footerDevelopedBy[lang]}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom-right logo aligned to container edges */}
        <img
          src="/al-falah-logo-white-img.svg"
          alt="Al Falah Partners"
          className="absolute h-10 w-auto object-contain right-2 sm:right-6 lg:right-8 xl:right-10 2xl:right-12 bottom-0"
        />
      </div>
      </div>
    </footer>
  )
}
