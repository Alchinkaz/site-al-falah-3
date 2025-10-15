export interface PortfolioProject {
  id: string
  title: string
  description: string
  sector: string
  investmentStage: string
  investmentYear: number
  image: string
  contentImage?: string
  published: boolean
  createdAt: string
  contentSections?: {
    title?: string
    text: string
  }[]
}

import { AdminStorage } from "@/lib/admin-storage"

function mapNewsToPortfolioProjects(): PortfolioProject[] {
  const news = AdminStorage.getNewsArticles()
  return news
    .filter((n) => n.published)
    .map((n) => ({
      id: n.id,
      title: n.title,
      description: n.description,
      sector: (n as any).sector || "",
      investmentStage: (n as any).investmentStage || "",
      investmentYear: (n as any).investmentYear || new Date(n.createdAt).getFullYear(),
      image: n.image || "",
      contentImage: (n as any).contentImage || n.image || "",
      published: n.published,
      createdAt: n.createdAt,
      contentSections: (n as any).contentSections || (n.content ? [{ text: n.content }] : []),
    }))
}

export function getPublishedProjects(): PortfolioProject[] {
  return mapNewsToPortfolioProjects()
}

export function getProjectWithDetails(id: string): PortfolioProject | null {
  return mapNewsToPortfolioProjects().find((project) => project.id === id) || null
}

export function formatProjectDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}
