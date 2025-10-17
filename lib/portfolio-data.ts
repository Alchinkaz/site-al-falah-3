import { ProjectService } from './supabase-services'

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

async function mapProjects(): Promise<PortfolioProject[]> {
  const projects = await ProjectService.getAllProjects()
  return projects
    .filter((n: any) => n.published)
    .map((n: any) => ({
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
  return await mapProjects()
}

export async function getProjectWithDetails(id: string): Promise<PortfolioProject | null> {
  const projects = await mapProjects()
  return projects.find((project) => project.id === id) || null
}

export function formatProjectDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}
