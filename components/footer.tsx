"use client"

export default function Footer() {
  return (
    <footer className="py-12 font-inter" style={{ backgroundColor: "#1e1a61" }}>
      <div className="relative max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-8">
          {/* Contact information - left aligned */}
          <div className="flex flex-col gap-1 text-white/80 text-sm">
            <p className="font-medium">Contact us:</p>
            <p>Altay Mamanbayev</p>
            <p>Director & Chief Operating Officer</p>
            <a href="mailto:altay@falahpartners.com" className="hover:text-white transition-colors">
              altay@falahpartners.com
            </a>
          </div>

          {/* Copyright - centered on desktop, left on mobile */}
          <div className="text-white/80 text-sm text-left md:absolute md:left-1/2 md:-translate-x-1/2">
            <p>© 2025 Al Falah Capital Partners</p>
            <p>Developed by Web Alchin</p>
          </div>
        </div>

        {/* Bottom-right logo */}
        <img
          src="/al-falah-logo-white-img.svg"
          alt="Al Falah Partners"
          className="absolute right-2 bottom-3 md:right-4 md:bottom-4 h-10 w-auto object-contain"
        />
      </div>
    </footer>
  )
}
