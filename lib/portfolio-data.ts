import { StorageAdapter } from './storage-adapter'

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

async function mapNewsToPortfolioProjects(): Promise<PortfolioProject[]> {
  const news = await StorageAdapter.getAllProjects()
  return news
    .filter((n) => n.published)
    .map((n) => ({
      id: n.id,
      title: n.title,
      description: n.description || "",
      badges: n.badges || [],
      investmentYear: n.investment_year || new Date(n.created_at).getFullYear(),
      image: n.image || "",
      contentImage: n.content_image || n.image || "",
      published: n.published,
      show_on_homepage: n.show_on_homepage,
      createdAt: n.created_at,
      contentSections: n.content_sections || (n.content ? [{ text: n.content }] : []),
    }))
}

export async function getPublishedProjects(): Promise<PortfolioProject[]> {
  return await mapNewsToPortfolioProjects()
}

export async function getProjectWithDetails(id: string): Promise<PortfolioProject | null> {
  const projects = await mapNewsToPortfolioProjects()
  return projects.find((project) => project.id === id) || null
}

export function formatProjectDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}
