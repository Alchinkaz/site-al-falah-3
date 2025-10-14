"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"
import { useMemo } from "react"

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
      "Serik founded Elefund in 2015 with the belief that businesses create value by masterfully solving complex problems with a simple toolkit. He began his investing career as a public equities investor applying value investing principles, a framework which later served as a cornerstone to Elefund’s investment approach.",
    bioRight:
      "When he isn’t advising founders or evaluating new deals, Serik enjoys spending time with his family and friends. He also enjoys reading, and hooping. What is the most underrated characteristic of successful founders? Surrounding yourself with capable people, and attacking ideas and products, not each other.",
  },
  {
    firstName: "Diyar",
    lastName: "Medeubekov",
    role: "Chief Investment Officer",
    photo: "/placeholder.svg",
    bioLeft:
      "Diyar has extensive experience in mining, agriculture and finance. Prior to joining the fund he served as Director of Project Finance at Development Bank of Kazakhstan.",
    bioRight:
      "Diyar enjoys the outdoors and spending time with family. He holds a Master's degree in Economics from Vanderbilt University.",
  },
  {
    firstName: "Altay",
    lastName: "Mamanbayev",
    role: "Chief Operating Officer",
    photo: "/placeholder.svg",
    bioLeft:
      "Altay manages the operations of the fund since 2008, previously at Eurasia Financial Management Consulting and Panalpina World Transport LLP.",
    bioRight:
      "Altay is an ACCA member and is passionate about operational excellence and systems thinking.",
  },
  {
    firstName: "Azhar",
    lastName: "Babayeva",
    role: "Reporting Manager",
    photo: "/placeholder.svg",
    bioLeft:
      "Azhar joined the company in 2013 after 5 years at Ernst & Young. She holds bachelor’s and master’s degrees from KIMEP and is enrolled in the ACCA program.",
    bioRight:
      "Azhar enjoys reading and continuous learning across finance and reporting standards.",
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
  const member = useMemo(() => {
    return members.find((m) => slugifyMember(m) === params.slug)
  }, [params.slug])

  if (!member) {
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar forceScrolled={true} />
      <div className="h-16 sm:h-16 md:h-16 lg:h-20" />

      <section className="py-10">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#1e1a61] text-white rounded-2xl p-6 md:p-10">
              <h1 className="text-5xl md:text-6xl font-medium leading-tight">
                {member.firstName}
                <br />
                {member.lastName}
              </h1>
              <div className="mt-6 uppercase tracking-wide text-xs">{member.role}</div>
              {/* Social icons removed per request */}
            </div>
            <div className="rounded-2xl overflow-hidden bg-[#d2efe6]">
              <img src={member.photo || "/placeholder.svg"} alt={`${member.firstName} ${member.lastName}`} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mt-10 text-gray-700 text-lg leading-relaxed">
            <p>{member.bioLeft}</p>
            <p>{member.bioRight}</p>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  )
}


