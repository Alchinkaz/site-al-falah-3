"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"
import { getPublishedProjects, formatProjectDate } from "@/lib/portfolio-data"
import { useEffect, useState } from "react"

export default function PortfolioPage() {
  const [projectsData, setProjectsData] = useState<any[]>([])

  useEffect(() => {
    const publishedProjects = getPublishedProjects()
    const sorted = [...publishedProjects].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    const formattedProjects = sorted.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      sector: project.sector,
      investmentStage: project.investmentStage,
      investmentYear: project.investmentYear,
      date: formatProjectDate(project.createdAt),
      image: project.image,
    }))
    setProjectsData(formattedProjects)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar forceScrolled={true} />

      {/* Hero Section */}
      <section className="relative bg-white py-12 mt-12 pt-28 pb-5">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Portfolio</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover our portfolio of innovative companies transforming industries across Central Asia
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          {projectsData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading portfolio projects...</p>
            </div>
          ) : (
            <>
              {/* Large screens - 3 columns */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                  {projectsData.map((item, index) => (
                    <div key={item.id} className="lg:col-span-1">
                      <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-80">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-4 flex flex-col h-40">
                        <div className="flex gap-2 mb-3">
                          <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">{item.sector}</span>
                          <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">{item.investmentStage}</span>
                        </div>
                        <h3 className="text-black font-semibold text-2xl mb-2 leading-tight line-clamp-2 overflow-hidden flex-grow">
                          <Link href={`/portfolio/${item.id}`} className="hover:text-blue-600 transition-colors block line-clamp-2 overflow-hidden">
                          {item.title}
                        </Link>
                        </h3>
                        <p className="text-gray-500 text-sm mt-0.5 md:mt-auto">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medium screens - 2 columns */}
              <div className="hidden md:block lg:hidden">
                <div className="grid grid-cols-2 gap-6 mb-12">
                {projectsData.map((item) => (
                    <div key={item.id} className="aspect-square">
                      <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-3 flex flex-col h-36">
                        <div className="flex gap-2 mb-2">
                          <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full">{item.sector}</span>
                          <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">{item.investmentStage}</span>
                        </div>
                        <h3 className="text-black font-semibold text-2xl md:text-2xl mb-1 leading-tight line-clamp-2 overflow-hidden flex-grow">
                          <Link href={`/portfolio/${item.id}`} className="hover:text-blue-600 transition-colors block line-clamp-2 overflow-hidden">
                          {item.title}
                        </Link>
                        </h3>
                        <p className="text-gray-500 text-xs mt-0.5 md:mt-auto">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile - 1 column */}
              <div className="md:hidden mb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projectsData.map((item) => (
                    <div key={item.id} className="aspect-square">
                      <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-3 flex flex-col h-36">
                        <div className="flex gap-2 mb-2">
                          <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full">{item.sector}</span>
                          <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">{item.investmentStage}</span>
                        </div>
                        <h3 className="text-black font-semibold text-2xl md:text-2xl mb-1 leading-tight line-clamp-2 overflow-hidden flex-grow">
                          <Link href={`/portfolio/${item.id}`} className="hover:text-blue-600 transition-colors block line-clamp-2 overflow-hidden">
                          {item.title}
                        </Link>
                        </h3>
                        <p className="text-gray-500 text-xs mt-0.5 md:mt-auto">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <CTASection />

      <Footer />
    </div>
  )
}
