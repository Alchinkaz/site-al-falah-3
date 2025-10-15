"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getHomepageData, type HomepageData } from "@/lib/homepage-data"
import { useCounterAnimation } from "@/hooks/use-counter-animation"
import { aboutI18n, readLang, teamI18n, i18n, teamNames } from "@/lib/i18n"

export default function AboutPage() {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null)
  const [lang, setLang] = useState(readLang())

  const stat1Counter = useCounterAnimation({
    end: homepageData ? Number.parseInt(homepageData.stat1Title?.replace(/[^\d]/g, "") || "0") : 0,
  })
  const stat2Counter = useCounterAnimation({
    end: homepageData ? Number.parseInt(homepageData.stat2Title?.replace(/[^\d]/g, "") || "0") : 0,
  })
  const stat3Counter = useCounterAnimation({
    end: homepageData ? Number.parseInt(homepageData.stat3Title?.replace(/[^\d]/g, "") || "0") : 0,
  })

  useEffect(() => {
    const data = getHomepageData()
    setHomepageData(data)

    const handleDataUpdate = (event: CustomEvent) => {
      setHomepageData(event.detail)
    }

    window.addEventListener("homepage-data-updated", handleDataUpdate as EventListener)
    return () => window.removeEventListener("homepage-data-updated", handleDataUpdate as EventListener)
  }, [])

  useEffect(() => {
    const handler = (e: any) => setLang(e.detail?.lang || readLang())
    window.addEventListener("language-changed", handler)
    return () => window.removeEventListener("language-changed", handler)
  }, [])
  return (
    <div className="min-h-screen bg-white">
      <Navbar forceScrolled={true} />
      <div className="h-16 sm:h-16 md:h-16 lg:h-20"></div>

      {/* Top hero image block within site max-width, with slightly reduced top spacing and height */}
      <section className="bg-white mt-8 sm:mt-10 lg:mt-12 xl:mt-14">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="relative w-full rounded-2xl overflow-hidden mb-4" style={{ aspectRatio: "21/9" }}>
            <img
              src={homepageData?.aboutImage || "/placeholder.svg"}
              alt="About cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Removed hero heading & subtitle per request */}

      {/* Company Intro */}
      <section className="pt-8 pb-12 bg-white">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="grid xl:grid-cols-2 gap-12">
            <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
              <h3 className="text-3xl font-semibold text-gray-900 mb-2">{aboutI18n.title[lang]}</h3>
              {aboutI18n.paragraphs[lang].map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{aboutI18n.keyTermsTitle[lang]}</h3>
                <ul className="text-gray-700 divide-y divide-gray-200 border-t border-b border-gray-200">
                  {[
                    ["Size", aboutI18n.keyTerms["Size"][lang]],
                    ["GP commitment", aboutI18n.keyTerms["GP commitment"][lang]],
                    ["Investment period", aboutI18n.keyTerms["Investment period"][lang]],
                    ["Term", aboutI18n.keyTerms["Term"][lang]],
                    ["Hurdle rate", aboutI18n.keyTerms["Hurdle rate"][lang]],
                    ["Management fee", aboutI18n.keyTerms["Management fee"][lang]],
                    ["Carry", aboutI18n.keyTerms["Carry"][lang]],
                  ].map(([k, v]) => (
                    <li key={k} className="flex justify-between gap-4 py-3"><span className="text-gray-500">{aboutI18n.keyLabels[k][lang]}:</span><span className="text-gray-900 font-medium">{v}</span></li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{aboutI18n.sectorsTitle[lang]}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aboutI18n.sectors.map((item) => (
                    <div key={item.key} className="rounded-lg border border-gray-200 p-4">
                      <div className="text-lg font-semibold text-gray-900 mb-1">{item.title[lang]}</div>
                      <div className="text-gray-600 text-sm leading-relaxed">{item.desc[lang]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section (animated) */}
      <section className="relative py-12 bg-white">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="text-left relative">
                  <div className="px-4 py-6">
                    <h3 ref={stat1Counter.elementRef} className="text-3xl font-semibold text-gray-900 mb-2">
                      {homepageData?.stat1Title?.replace(/\d+/, stat1Counter.count.toString())}
                    </h3>
                    <p className="text-gray-600">{i18n.stat1Subtitle[lang]}</p>
                  </div>
                  <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-gray-300"></div>
                  <div className="md:hidden w-full h-px bg-gray-300"></div>
                </div>

                <div className="text-left relative">
                  <div className="px-4 py-6">
                    <h3 ref={stat2Counter.elementRef} className="text-3xl font-semibold text-gray-900 mb-2">
                      {homepageData?.stat2Title?.replace(/\d+/, stat2Counter.count.toString())}
                    </h3>
                    <p className="text-gray-600">{i18n.stat2Subtitle[lang]}</p>
                  </div>
                  <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-gray-300"></div>
                  <div className="md:hidden w-full h-px bg-gray-300"></div>
                </div>

                <div className="text-left relative">
                  <div className="px-4 py-6">
                    <h3 ref={stat3Counter.elementRef} className="text-3xl font-semibold text-gray-900 mb-2">
                      {homepageData?.stat3Title?.replace(/\d+/, stat3Counter.count.toString())}
                    </h3>
                    <p className="text-gray-600">{i18n.stat3Subtitle[lang]}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-2 bg-[rgba(30,26,97,1)]"></div>
          </div>
        </div>
      </section>


      {/* Team */}
      <section className="py-12 bg-white">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between lg:flex-row lg:items-end lg:justify-between">
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-3xl md:text-[48px] md:leading-[1.1]">{aboutI18n.teamTitle[lang]}</h3>
            </div>
            {/* Button removed per request */}
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
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            {(() => {
                              const slug = `${m.firstName} ${m.lastName}`
                                .toLowerCase()
                                .replace(/[^a-z\s-]/g, "")
                                .trim()
                                .replace(/\s+/g, "-")
                              return (
                                <Link href={`/team/${slug}`} className="group inline-block">
                                  <h3 className="text-gray-900 font-semibold text-2xl md:text-2xl leading-tight group-hover:underline">
                                    {(() => {
                                      const slug = `${m.firstName} ${m.lastName}`
                                        .toLowerCase()
                                        .replace(/[^a-z\s-]/g, "")
                                        .trim()
                                        .replace(/\s+/g, "-")
                                      return teamNames[slug]?.[lang] || `${m.firstName} ${m.lastName}`
                                    })()}
                                  </h3>
                                </Link>
                              )
                            })()}
                            <p className="text-gray-500 text-sm mt-1">
                              {(() => {
                                const slug = `${m.firstName} ${m.lastName}`
                                  .toLowerCase()
                                  .replace(/[^a-z\s-]/g, "")
                                  .trim()
                                  .replace(/\s+/g, "-")
                                return teamI18n[slug]?.role[lang] || m.role
                              })()}
                            </p>
                          </div>
                          {(() => {
                            const slug = `${m.firstName} ${m.lastName}`
                              .toLowerCase()
                              .replace(/[^a-z\s-]/g, "")
                              .trim()
                              .replace(/\s+/g, "-")
                            return (
                              <Link
                                href={`/team/${slug}`}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1e1a61] text-[#1e1a61] transition-colors hover:bg-[#1e1a61] hover:text-white"
                                aria-label={`${m.firstName} ${m.lastName}`}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </Link>
                            )
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA merged into Footer */}
      <Footer />
    </div>
  )
}


