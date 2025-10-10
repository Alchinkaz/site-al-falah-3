"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar forceScrolled={true} />

      {/* Hero */}
      <section className="relative bg-white py-12 mt-12 pt-28 pb-8">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">About Us</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Al Falah Capital Partners is a private asset manager and investment firm
              specializing in private equity, venture capital, partnership opportunities and
              special situations in Central Asia with a primary focus on Kazakhstan.
            </p>
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="grid xl:grid-cols-2 gap-12">
            <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
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
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Falah Growth Fund</h3>
                <div className="rounded-lg border border-gray-200 p-6 bg-gray-50">
                  <div className="text-3xl font-semibold text-gray-900">450+ deals reviewed</div>
                </div>
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

      {/* How we work */}
      <section className="py-12 bg-white">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key terms</h3>
              <ul className="space-y-2 text-gray-700">
                {[
                  ["Size", "USD200m"],
                  ["GP commitment", "2%"],
                  ["Investment period", "3y+2"],
                  ["Term", "10y+3"],
                  ["Hurdle rate", "8%"],
                  ["Management fee", "up to 2%"],
                  ["Carry", "20% with clawback"],
                ].map(([k, v]) => (
                  <li key={k} className="flex justify-between gap-4"><span className="text-gray-500">{k}:</span><span className="text-gray-900 font-medium">{v}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Investment strategy</h3>
              <div className="space-y-3 text-gray-700">
                <div><span className="font-semibold">Pipeline:</span> Strong and solid</div>
                <div>
                  <div className="font-semibold mb-1">Situations</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {['Growth','Consolidations','Buyout','Distressed & Restructuring','Brownfields (5y payback)'].map(i => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-1">Sectors</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {['Oil & Gas, Metals & Mining','Power & Utilities','High‑tech & Telecom','Agriculture & Food processing','Healthcare','Logistics'].map(i => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
                <div><span className="font-semibold">Investment ticket:</span> USD5‑40m</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 bg-white">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Our team</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Mr. Nurlan Kussainov",
                role: "Founder / Managing Partner",
                bullets: [
                  "Stanford MBA",
                  "Board Member at AIX (Nasdaq subsidiary) and Beeline Kazakhstan",
                  "Former Chairman of the BoD Alfa Bank Kazakhstan",
                  "Former CEO of AIFC and Development Bank of Kazakhstan",
                  "Former Deputy Governor of Kazakhstan Central Bank",
                ],
              },
              {
                name: "Mr. Diyar Medeubekov",
                role: "Chief Investment Officer",
                bullets: [
                  "Vanderbilt University, MA",
                  "Founder of fintech ventures in Uzbekistan and Kazakhstan",
                  "Former CEO of Alsad.kz (agricultural holding)",
                  "Founder of AI software company",
                  "Former executive roles at IsDB and DBK",
                ],
              },
              {
                name: "Mr. Altay Mamanbayev",
                role: "Chief Operating Officer / Director",
                bullets: [
                  "FCCA, certified Auditor",
                  "20+ years in finance, governance, taxation, audit, compliance",
                  "Leadership roles at Al Falah Group, Panalpina World Transport",
                ],
              },
              {
                name: "Ms. Azhar Babayeva",
                role: "Reporting / Compliance Manager",
                bullets: [
                  "KIMEP, MSc",
                  "15+ years in finance, audit, reporting, fund administration",
                  "Former auditor at EY",
                  "Enrolled in ACCA program",
                ],
              },
            ].map((m) => (
              <div key={m.name} className="rounded-lg border border-gray-200 p-6">
                <div className="text-xl font-semibold text-gray-900">{m.name}</div>
                <div className="text-gray-600 mb-3">{m.role}</div>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {m.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
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


