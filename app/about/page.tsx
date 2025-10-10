"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar forceScrolled={true} />
      <div className="h-16 sm:h-16 md:h-16 lg:h-20"></div>

      {/* Top hero image block within site max-width, with extra top spacing */}
      <section className="bg-white mt-6 sm:mt-8">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="relative w-full rounded-2xl overflow-hidden mb-8" style={{ aspectRatio: "16/9" }}>
            <img
              src="/placeholder.svg"
              alt="About cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Removed hero heading & subtitle per request */}

      {/* Company Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="grid xl:grid-cols-2 gap-12">
            <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">About Us</h3>
              <p>
                We make investments in companies across different industries such as energy,
                mining, agriculture, food production, high‑tech, healthcare and others.
              </p>
              <p>
                Leveraging deep regional expertise and a strong network, we are raising the
                Falah Growth Fund II, the second USD200 million private equity fund to seize
                emerging opportunities, drive growth, and create lasting value. With a robust
                pipeline of high‑value opportunities, we are well‑positioned to advance the
                region’s growth and deliver exceptional returns to our new investors.
              </p>
              <p>
                Al Falah Capital Partners is headquartered in Almaty, Kazakhstan and managed the
                Falah Growth Fund, one of the leading investment funds with committed capital
                amounting to USD500 million from investors in the UAE and Kazakhstan. Since its
                establishment in 2008, our principals have invested in or acquired tens of
                companies, including Karaganda Energocenter, Ulmus Besshoky, Alsad Kazakhstan,
                Ai Karaaul, Karaganda Kus, Elefund VC funds, Robinhood Inc., Soul of Nomad Inc.
                and many others.
              </p>
              <p>
                Central Asia is a fast‑growing region and home to some of the world’s most
                talented business owners. We remain focused on the potential of this region and
                are ready to capitalize on emerging opportunities together with new investors.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key terms</h3>
                <ul className="text-gray-700 divide-y divide-gray-200 border-t border-b border-gray-200">
                  {[
                    ["Size", "USD200m"],
                    ["GP commitment", "2%"],
                    ["Investment period", "3y+2"],
                    ["Term", "10y+3"],
                    ["Hurdle rate", "8%"],
                    ["Management fee", "up to 2%"],
                    ["Carry", "20% with clawback"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex justify-between gap-4 py-3"><span className="text-gray-500">{k}:</span><span className="text-gray-900 font-medium">{v}</span></li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Sectors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Oil & Gas", desc: "Reservoirs, Wells, Equipment, Facilities, Marine & Subsea" },
                    { title: "Mining", desc: "E&P, Processing & Refining, Sales & Distribution Services" },
                    { title: "Power", desc: "Generation, Transportation & distribution, Services" },
                    { title: "Food & Agro", desc: "Production, Food processing, Logistics" },
                    { title: "Industrial & High‑tech", desc: "Construction & materials, Industrial transportation, Electronic & electrical equipment" },
                  ].map((item) => (
                    <div key={item.title} className="rounded-lg border border-gray-200 p-4">
                      <div className="text-lg font-semibold text-gray-900 mb-1">{item.title}</div>
                      <div className="text-gray-600 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Team */}
      <section className="py-12 bg-white">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between lg:flex-row lg:items-end lg:justify-between">
            <div className="text-left">
              <h3 className="font-bold text-gray-900" style={{ fontSize: "48px", lineHeight: 1.1 }}>Meet the team</h3>
            </div>
            <Link href="/#cta">
              <Button
                variant="outline"
                className="hidden md:block border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 bg-white px-8 mt-6"
              >
                Get in touch
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                firstName: "Nurlan",
                lastName: "Kussainov",
                role: "Managing Partner",
                desc:
                  "Mr. Nurlan Kussainov has over 20 years of extensive work experience as executive in financial and governmental organizations incl.: Astana International Financial Centre Authority, National Bank of Kazakhstan, Development Bank of Kazakhstan, Center of Marketing and Analytical Research under the Government of Kazakhstan, CNRG Capital, Ministry of Economic Affairs and Budget Planning, etc. Mr. Kussainov holds an MSM degree from the Stanford Graduate School of Business.",
              },
              {
                firstName: "Diyar",
                lastName: "Medeubekov",
                role: "Chief Investment Officer",
                desc:
                  "Mr. Medeubekov used to manage portfolio companies of the fund. He has extensive experience in mining, agriculture and finance. Prior to joining the fund Mr. Medeubekov served as Director of Project Finance at Development Bank of Kazakhstan. Mr. Medeubekov holds Vanderbilt University Master’s degree in Economics.",
              },
              {
                firstName: "Altay",
                lastName: "Mamanbayev",
                role: "Chief Operating Officer",
                desc:
                  "Mr. Mamanbayev manages the operations of the fund since November 2008. Previously, he was financial consultant for Eurasia Financial Management Consulting Ltd., an investment company. He held various managerial positions at Panalpina World Transport LLP in Kazakhstan, one of the world’s leading freight-forwarding international corporations. Mr. Mamanbayev is the ACCA member (the Association of Chartered Certified Accountants).",
              },
              {
                firstName: "Azhar",
                lastName: "Babayeva",
                role: "Reporting Manager",
                desc:
                  "Ms. Azhar Babayeva is Reporting Manager and joined the company in October 2013. Prior to joining the team, she gained a 5-year experience as an auditor at Ernst and Young Kazakhstan. She completed her bachelor's and master's degrees from Kazakhstan Institute of Management, Economics and Strategic Research (KIMEP) and is currently enrolled in the ACCA qualification program.",
              },
            ].map((m) => (
              <div key={`${m.firstName}-${m.lastName}`} className="lg:col-span-1">
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
                    <img
                      src="/placeholder.svg"
                      alt={`${m.firstName} ${m.lastName}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0">
                      <div className="bg-white/95 backdrop-blur-sm px-5 py-4 border-t border-gray-200">
                        <h3 className="text-gray-900 font-semibold text-2xl md:text-2xl leading-tight">
                          {m.firstName} {m.lastName}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">{m.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  )
}


