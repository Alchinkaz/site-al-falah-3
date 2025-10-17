"use client"

import { TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getProjectWithDetails } from "@/lib/portfolio-data"
import { getSectorBadgeClasses, getStageBadgeClasses } from "@/lib/badge-styles"
import { useEffect, useState } from "react"
import { readLang, portfolioI18n, projectTexts, projectBadgesI18n, projectSections } from "@/lib/i18n"

export default function PortfolioDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState(readLang())

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await getProjectWithDetails(params.id)
        setProject(projectData)
      } catch (error) {
        console.error('Error loading project:', error)
        setProject(null)
      } finally {
        setLoading(false)
      }
    }
    
    loadProject()
  }, [params.id])

  useEffect(() => {
    const handler = (e: any) => setLang(e.detail?.lang || readLang())
    window.addEventListener("language-changed", handler)
    return () => window.removeEventListener("language-changed", handler)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar forceScrolled={true} />
        <div className="h-20"></div>
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar forceScrolled={true} />
        <div className="h-20"></div>
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600">The requested portfolio project does not exist.</p>
            <Link
              href="/portfolio"
              className="mt-6 inline-block px-6 py-3 bg-[#1e1a61] text-white rounded-md hover:bg-[#16124a] transition-colors"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar forceScrolled={true} />

      <div className="h-14"></div>

      <section className="py-12 bg-white pt-24">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{projectTexts[project.id]?.title[lang] || project.title}</h1>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {(project as any).badges?.map((b: any, i: number) => (
                <span key={i} className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: `${b.color}20`, color: b.color, border: `1px solid ${b.color}40` }}>
                  {projectBadgesI18n[project.id]?.[i]?.[lang] || b.label}
                </span>
              ))}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              {lang === "ru" ? "Инвестировано в" : lang === "kz" ? "Инвестиция жылы" : "Invested in"} {project.investmentYear}
            </div>
          </div>

          {project.contentImage && (
            <div className="w-full mb-12">
              <Image
                src={project.contentImage || "/placeholder.svg"}
                alt={project.title}
                width={1200}
                height={600}
                className="w-full h-auto rounded-lg aspect-video object-cover"
              />
            </div>
          )}

          <div className="space-y-12">
            {project.contentSections &&
              project.contentSections.map((section: any, index: number) => (
                <div key={index} className="prose prose-lg max-w-none">
                  {section.title && (
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">{projectSections[project.id]?.[lang]?.[index]?.title || section.title}</h2>
                    </div>
                  )}
                  {section.text && (
                    <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line mb-8">
                      {(projectTexts[project.id]?.content?.[lang] || [projectSections[project.id]?.[lang]?.[index]?.text || section.text]).map((p, i) => (
                        <p key={i} className="mb-4 last:mb-0">{p}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-[#1e1a61] hover:text-[#16124a] font-semibold transition-colors"
            >
              ← {lang === "ru" ? "Назад к портфолио" : lang === "kz" ? "Портфолиоға оралу" : "Back to Portfolio"}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA merged into Footer */}

      <Footer />
    </div>
  )
}
