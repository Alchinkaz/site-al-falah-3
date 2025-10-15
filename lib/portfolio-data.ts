export interface PortfolioProject {
  id: string
  title: string
  description: string
  badges?: Array<{ label: string; color: string }>
  investmentYear: number
  image: string
  contentImage?: string
  published: boolean
  show_on_homepage?: boolean
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
      badges: (n as any).badges || [],
      investmentYear: (n as any).investmentYear || new Date(n.createdAt).getFullYear(),
      image: n.image || "",
      contentImage: (n as any).contentImage || n.image || "",
      published: n.published,
      show_on_homepage: n.show_on_homepage,
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
