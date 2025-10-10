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

const portfolioProjects: PortfolioProject[] = [
  {
    id: "alsad-kazakhstan-llp",
    title: "Alsad Kazakhstan LLP",
    description: "Agriculture – Turnaround, 2012",
    sector: "Agriculture",
    investmentStage: "Turnaround",
    investmentYear: 2012,
    image: "/placeholder.svg?height=400&width=600",
    contentImage: "/placeholder.svg?height=400&width=600",
    published: true,
    createdAt: "2012-06-01",
    contentSections: [
      {
        text: "Not operating and pre-bankrupt farm has been turned into the market leader in egg production reaching full capacity of 160 millions high quality eggs per year with a 20% market niche in Almaty region.",
      },
    ],
  },
  {
    id: "karaganda-energocenter-llp",
    title: "Karaganda Energocenter LLP",
    description: "Energy – Growth, 2012",
    sector: "Energy",
    investmentStage: "Growth",
    investmentYear: 2012,
    image: "/placeholder.svg?height=400&width=600",
    contentImage: "/placeholder.svg?height=400&width=600",
    published: true,
    createdAt: "2012-11-15",
    contentSections: [
      {
        text: "Investment has been used to support expansion program through the construction of new 120MW energy block to cover regional power deficit, total installed capacity has reached 712MW by the end of 2015.",
      },
    ],
  },
  {
    id: "karaganda-kus-llp",
    title: "Karaganda Kus LLP",
    description: "Agriculture – LBO, 2017",
    sector: "Agriculture",
    investmentStage: "LBO",
    investmentYear: 2017,
    image: "/placeholder.svg?height=400&width=600",
    contentImage: "/placeholder.svg?height=400&width=600",
    published: true,
    createdAt: "2017-05-10",
    contentSections: [
      {
        text: "Further expansion of Alsad expertise to Karaganda region by attracting external funding and combined egg production business became the market leader in Kazakhstan with 300 million eggs capacity.",
      },
    ],
  },
  {
    id: "ulmus-besshoky-jsc",
    title: "Ulmus Besshoky JSC",
    description: "Mining – Greenfield, 2015",
    sector: "Mining",
    investmentStage: "Greenfield",
    investmentYear: 2015,
    image: "/placeholder.svg?height=400&width=600",
    contentImage: "/placeholder.svg?height=400&width=600",
    published: true,
    createdAt: "2015-08-20",
    contentSections: [
      {
        text: "Early stage investment to conduct initial exploration to feasibility study with aim to expand confirmed resources that has been reached to 1,167K tons of copper",
      },
    ],
  },
  {
    id: "ai-karaaul-jsc",
    title: "Ai Karaaul JSC",
    description: "Mining – Greenfield, 2008",
    sector: "Mining",
    investmentStage: "Greenfield",
    investmentYear: 2008,
    image: "/placeholder.svg?height=400&width=600",
    contentImage: "/placeholder.svg?height=400&width=600",
    published: true,
    createdAt: "2008-04-18",
    contentSections: [
      {
        text: "Early stage investment to conduct initial exploration to feasibility study with aim to expand confirmed resources that has been reached to 180K tons of high grade copper",
      },
    ],
  },
  {
    id: "elefund-vc-funds",
    title: "Elefund VC funds",
    description: "Venture capital funds, 2017",
    sector: "Venture capital",
    investmentStage: "Funds",
    investmentYear: 2017,
    image: "/placeholder.svg?height=400&width=600",
    contentImage: "/placeholder.svg?height=400&width=600",
    published: true,
    createdAt: "2017-12-01",
    contentSections: [
      {
        text: "Investments were made in several consecutive VC funds that has a management team of world class operators and investors who strive for excellence and impact by building a new world of highly profitable businesses",
      },
    ],
  },
]

export function getPublishedProjects(): PortfolioProject[] {
  return portfolioProjects.filter((project) => project.published)
}

export function getProjectWithDetails(id: string): PortfolioProject | null {
  return portfolioProjects.find((project) => project.id === id && project.published) || null
}

export function formatProjectDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}
