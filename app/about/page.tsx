"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar forceScrolled={true} />
      <div className="h-16 sm:h-16 md:h-16 lg:h-20"></div>

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
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Our team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Mr. Nurlan Kussainov",
                role: "Managing Partner",
                desc:
                  "Mr. Nurlan Kussainov has over 20 years of extensive work experience as executive in financial and governmental organizations incl.: Astana International Financial Centre Authority, National Bank of Kazakhstan, Development Bank of Kazakhstan, Center of Marketing and Analytical Research under the Government of Kazakhstan, CNRG Capital, Ministry of Economic Affairs and Budget Planning, etc. Mr. Kussainov holds an MSM degree from the Stanford Graduate School of Business.",
              },
              {
                name: "Mr. Diyar Medeubekov",
                role: "Chief Investment Officer",
                desc:
                  "Mr. Medeubekov used to manage portfolio companies of the fund. He has extensive experience in mining, agriculture and finance. Prior to joining the fund Mr. Medeubekov served as Director of Project Finance at Development Bank of Kazakhstan. Mr. Medeubekov holds Vanderbilt University Master’s degree in Economics.",
              },
              {
                name: "Mr. Altay Mamanbayev",
                role: "Chief Operating Officer",
                desc:
                  "Mr. Mamanbayev manages the operations of the fund since November 2008. Previously, he was financial consultant for Eurasia Financial Management Consulting Ltd., an investment company. He held various managerial positions at Panalpina World Transport LLP in Kazakhstan, one of the world’s leading freight-forwarding international corporations. Mr. Mamanbayev is the ACCA member (the Association of Chartered Certified Accountants).",
              },
              {
                name: "Ms. Azhar Babayeva",
                role: "Reporting Manager",
                desc:
                  "Ms. Azhar Babayeva is Reporting Manager and joined the company in October 2013. Prior to joining the team, she gained a 5-year experience as an auditor at Ernst and Young Kazakhstan. She completed her bachelor's and master's degrees from Kazakhstan Institute of Management, Economics and Strategic Research (KIMEP) and is currently enrolled in the ACCA qualification program.",
              },
            ].map((m) => (
              <div key={m.name} className="h-full">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 aspect-square w-full">
                  <img
                    src="/placeholder.svg?height=800&width=800"
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-black font-semibold text-2xl mb-1 leading-tight">{m.name}</h3>
                  <p className="text-gray-600 text-base mb-2">{m.role}</p>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">{m.desc}</p>
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


