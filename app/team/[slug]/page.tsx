"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { i18n, readLang, teamI18n, teamNames } from "@/lib/i18n"
import { useMemo, useEffect, useState } from "react"
import { getTeamMemberData, type TeamMemberData } from "@/lib/team-data"

interface MemberData {
  firstName: string
  lastName: string
  role: string
  photo?: string
  bioLeft: string
  bioRight: string
}

const members: MemberData[] = [
  {
    firstName: "Nurlan",
    lastName: "Kussainov",
    role: "Managing Partner",
    photo: "/placeholder.svg",
    bioLeft:
      "Nurlan has more than two decades of leadership across Kazakhstan’s financial sector and public institutions. His experience spans the Astana International Financial Centre, the National Bank of Kazakhstan, the Development Bank of Kazakhstan, the Center of Marketing and Analytical Research under the Government of Kazakhstan, CNRG Capital and the Ministry of Economic Affairs and Budget Planning.",
    bioRight:
      "He holds a master’s degree from the Stanford Graduate School of Business. Nurlan serves on the boards of the Astana International Exchange (a Nasdaq subsidiary) and Beeline Kazakhstan. Previously he was Chairman of the Board of Directors at Alfa‑Bank Kazakhstan, CEO of AIFC and the Development Bank of Kazakhstan, and Deputy Governor of the Central Bank of Kazakhstan.",
  },
  {
    firstName: "Diyar",
    lastName: "Medeubekov",
    role: "Chief Investment Officer",
    photo: "/placeholder.svg",
    bioLeft:
      "Diyar oversees investment strategy and has managed several of the fund’s portfolio companies. He brings deep operating and financial experience across mining, agriculture and financial services, and earlier served as Director of Project Finance at the Development Bank of Kazakhstan. He holds a master’s degree in Economics from Vanderbilt University.",
    bioRight:
      "Alongside his work with the fund, Diyar has founded and scaled technology ventures, including the fintech platforms Pulman.uz in Uzbekistan and Akshamat.kz in Kazakhstan, as well as the AI software company Fantoramma.org. He previously led Alsad.kz as CEO and held roles at the Islamic Development Bank and the Development Bank of Kazakhstan.",
  },
  {
    firstName: "Altay",
    lastName: "Mamanbayev",
    role: "Chief Operating Officer",
    photo: "/placeholder.svg",
    bioLeft:
      "Altay has led the fund’s operations since 2008. Before joining Al Falah, he worked as a financial consultant at Eurasia Financial Management Consulting and held managerial positions at Panalpina World Transport LLP in Kazakhstan, one of the world’s leading freight‑forwarding corporations.",
    bioRight:
      "A fellow of the ACCA and a certified auditor, Altay has over twenty years of experience in finance. His expertise covers corporate governance, taxation, budgeting, audit, reporting and regulatory compliance. He has held leadership roles at Al Falah Group and Panalpina.",
  },
  {
    firstName: "Azhar",
    lastName: "Babayeva",
    role: "Reporting Manager",
    photo: "/placeholder.svg",
    bioLeft:
      "Azhar joined Al Falah in October 2013 and today oversees financial reporting and compliance. She has more than fifteen years of experience across finance, audit, tax, budgeting and fund administration, and began her career as an auditor at EY Kazakhstan.",
    bioRight:
      "Azhar earned both her bachelor’s and master’s degrees from KIMEP University and is currently pursuing the ACCA professional qualification.",
  },
]

function slugifyMember(m: MemberData): string {
  return `${m.firstName} ${m.lastName}`
    .toLowerCase()
    .replace(/[^a-z\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const [memberData, setMemberData] = useState<TeamMemberData | null>(null)
  const [lang, setLang] = useState(readLang())

  useEffect(() => {
    const loadMemberData = async () => {
      try {
        const data = await getTeamMemberData(params.slug)
        setMemberData(data)
      } catch (error) {
        console.error("[v0] Error loading team member data:", error)
      }
    }
    loadMemberData()
  }, [params.slug])

  useEffect(() => {
    const reloadMemberData = async () => {
      try {
        const data = await getTeamMemberData(params.slug)
        setMemberData(data)
      } catch (error) {
        console.error("[v0] Error reloading team member data:", error)
      }
    }
    window.addEventListener("team-data-updated", reloadMemberData as EventListener)
    return () => window.removeEventListener("team-data-updated", reloadMemberData as EventListener)
  }, [params.slug])

  const member = useMemo(() => {
    return members.find((m) => slugifyMember(m) === params.slug)
  }, [params.slug])

  // React to i18n updates to immediately reflect Team edits from admin
  useEffect(() => {
    const handler = (e: any) => setLang(e.detail?.lang || readLang())
    window.addEventListener("language-changed", handler)
    return () => window.removeEventListener("language-changed", handler)
  }, [])

  useEffect(() => {
    const force = () => setLang(readLang())
    window.addEventListener("i18n-updated", force as EventListener)
    return () => window.removeEventListener("i18n-updated", force as EventListener)
  }, [])

  if (!member && !memberData) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar forceScrolled={true} />
        <div className="h-16 sm:h-16 md:h-16 lg:h-20" />
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-16">
          <h1 className="text-2xl font-semibold text-gray-900">Member not found</h1>
        </div>
        <Footer />
      </div>
    )
  }

  const displayName =
    memberData?.name[lang] || teamNames[params.slug]?.[lang] || `${member?.firstName} ${member?.lastName}`
  const displayRole = memberData?.role[lang] || teamI18n[params.slug]?.role[lang] || member?.role
  const displayBioLeft = memberData?.bioLeft[lang] || teamI18n[params.slug]?.bioLeft[lang] || member?.bioLeft
  const displayBioRight = memberData?.bioRight[lang] || teamI18n[params.slug]?.bioRight[lang] || member?.bioRight
  const displayPhoto =
    memberData?.photo || (i18n as any).teamPhotos?.[params.slug] || member?.photo || "/placeholder.svg"

  return (
    <div className="min-h-screen bg-white">
      <Navbar forceScrolled={true} />
      <div className="h-16 sm:h-16 md:h-16 lg:h-20" />

      <section className="py-10">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#1e1a61] text-white rounded-2xl p-6 md:p-10">
              <h1 className="text-5xl md:text-6xl font-medium leading-tight">
                {(() => {
                  const parts = displayName.split(" ")
                  return (
                    <>
                      {parts[0]}
                      <br />
                      {parts.slice(1).join(" ")}
                    </>
                  )
                })()}
              </h1>
              <div className="mt-6 uppercase tracking-wide text-xs">{displayRole}</div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-[#d2efe6]">
              <img src={displayPhoto || "/placeholder.svg"} alt={displayName} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mt-10 text-gray-700 text-lg leading-relaxed">
            <p>{displayBioLeft}</p>
            <p>{displayBioRight}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
