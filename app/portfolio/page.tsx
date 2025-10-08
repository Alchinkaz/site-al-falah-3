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
    const formattedProjects = publishedProjects.map((project) => ({
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
      <section className="relative bg-white py-16 mt-16 pt-36 pb-5">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          {projectsData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading portfolio projects...</p>
            </div>
          ) : (
            <>
              {/* Mobile - 1 column */}
              <div className="grid grid-cols-1 md:hidden gap-6">
                {projectsData.map((item) => (
                  <Card
                    key={item.id}
                    className="hover:shadow-lg transition-all duration-300 bg-white border-gray-200 h-full flex flex-col"
                  >
                    <CardHeader>
                      <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg leading-tight text-gray-900 mb-3">
                        <Link href={`/portfolio/${item.id}`} className="hover:text-blue-600 transition-colors">
                          {item.title}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center gap-2 pt-2.5">
                        <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded">
                          {item.sector}
                        </span>
                        <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded">
                          {item.investmentStage}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                      <CardDescription className="text-gray-600 leading-relaxed flex-grow mb-4 line-clamp-3">
                        {item.description}
                      </CardDescription>
                      <Link href={`/portfolio/${item.id}`}>
                        <Button className="bg-[#1e1a61] text-white hover:bg-[#16124a] w-full">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Tablet - 2 columns */}
              <div className="hidden md:grid xl:hidden grid-cols-2 gap-6">
                {projectsData.map((item) => (
                  <Card
                    key={item.id}
                    className="hover:shadow-lg transition-all duration-300 bg-white border-gray-200 h-full flex flex-col"
                  >
                    <CardHeader>
                      <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg leading-tight text-gray-900 mb-3">
                        <Link href={`/portfolio/${item.id}`} className="hover:text-blue-600 transition-colors">
                          {item.title}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center gap-2 pt-3">
                        <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded">
                          {item.sector}
                        </span>
                        <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded">
                          {item.investmentStage}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                      <CardDescription className="text-gray-600 leading-relaxed flex-grow mb-4 line-clamp-3">
                        {item.description}
                      </CardDescription>
                      <Link href={`/portfolio/${item.id}`}>
                        <Button className="bg-[#1e1a61] text-white hover:bg-[#16124a] w-full">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop - 3 columns */}
              <div className="hidden xl:grid grid-cols-3 gap-6">
                {projectsData.map((item) => (
                  <Card
                    key={item.id}
                    className="hover:shadow-lg transition-all duration-300 bg-white border-gray-200 h-full flex flex-col"
                  >
                    <CardHeader>
                      <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg leading-tight text-gray-900 mb-3">
                        <Link href={`/portfolio/${item.id}`} className="hover:text-blue-600 transition-colors">
                          {item.title}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center gap-2 pt-3">
                        <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded">
                          {item.sector}
                        </span>
                        <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded">
                          {item.investmentStage}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                      <CardDescription className="text-gray-600 leading-relaxed flex-grow mb-4 line-clamp-3">
                        {item.description}
                      </CardDescription>
                      <Link href={`/portfolio/${item.id}`}>
                        <Button className="bg-[#1e1a61] text-white hover:bg-[#16124a] w-full">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
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
