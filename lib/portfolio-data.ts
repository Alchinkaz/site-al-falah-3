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
    id: "fintech-platform",
    title: "FinTech Payment Platform",
    description: "Revolutionary digital payment solution transforming financial transactions across Central Asia",
    sector: "FinTech",
    investmentStage: "Series A",
    investmentYear: 2023,
    image: "/placeholder.svg?height=400&width=600",
    contentImage: "/placeholder.svg?height=400&width=600",
    published: true,
    createdAt: "2023-06-15",
    contentSections: [
      {
        title: "Investment Overview",
        text: "We invested $5M in Series A funding to help scale this innovative payment platform across the region. The company has shown exceptional growth with a 300% increase in transaction volume year-over-year.",
      },
      {
        title: "Market Opportunity",
        text: "The digital payments market in Central Asia is experiencing rapid growth, with increasing smartphone penetration and a young, tech-savvy population. This platform addresses the critical need for seamless, secure cross-border transactions.",
      },
      {
        title: "Key Achievements",
        text: "• Processed over $500M in transactions\n• Expanded to 5 countries in the region\n• Achieved profitability within 18 months\n• Built partnerships with major banks and retailers\n• Developed proprietary fraud detection technology",
      },
    ],
  },
  {
    id: "healthtech-telemedicine",
    title: "HealthTech Telemedicine Service",
    description: "AI-powered telemedicine platform connecting patients with healthcare professionals",
    sector: "HealthTech",
    investmentStage: "Seed",
    investmentYear: 2024,
    image: "/placeholder.svg?height=400&width=600",
    contentImage: "/placeholder.svg?height=400&width=600",
    published: true,
    createdAt: "2024-01-20",
    contentSections: [
      {
        title: "Investment Overview",
        text: "Our seed investment of $2M enabled this healthcare startup to launch their telemedicine platform and expand their medical network. The platform uses AI to match patients with the most suitable healthcare providers.",
      },
      {
        title: "Innovation & Technology",
        text: "The platform leverages advanced AI algorithms for symptom analysis, appointment scheduling, and medical record management. It provides secure video consultations and integrates with local pharmacies for prescription fulfillment.",
      },
      {
        title: "Impact & Growth",
        text: "• Served over 50,000 patients in the first year\n• Network of 500+ verified healthcare professionals\n• Average consultation time reduced by 60%\n• 95% patient satisfaction rate\n• Expanded to rural areas with limited healthcare access",
      },
    ],
  },
  {
    id: "edtech-learning-platform",
    title: "EdTech Learning Platform",
    description: "Personalized online education platform using adaptive learning technology",
    sector: "EdTech",
    investmentStage: "Series B",
    investmentYear: 2022,
    image: "/placeholder.svg?height=400&width=600",
    contentImage: "/placeholder.svg?height=400&width=600",
    published: true,
    createdAt: "2022-09-10",
    contentSections: [
      {
        title: "Investment Overview",
        text: "We led the $10M Series B round to help this EdTech company scale their adaptive learning platform and expand into new markets. The platform has revolutionized online education with personalized learning paths.",
      },
      {
        title: "Technology & Approach",
        text: "The platform uses machine learning to analyze student performance and adapt content delivery in real-time. It offers courses in multiple languages and subjects, with interactive content and gamification elements.",
      },
      {
        title: "Results & Expansion",
        text: "• 200,000+ active students across 15 countries\n• 1,000+ courses covering various subjects\n• 40% improvement in student outcomes\n• Partnerships with 50+ educational institutions\n• Launched corporate training division",
      },
    ],
  },
  {
    id: "agritech-supply-chain",
    title: "AgriTech Supply Chain Solution",
    description: "Blockchain-based platform optimizing agricultural supply chain management",
    sector: "AgriTech",
    investmentStage: "Series A",
    investmentYear: 2023,
    image: "/placeholder.svg?height=400&width=600",
    contentImage: "/placeholder.svg?height=400&width=600",
    published: true,
    createdAt: "2023-03-25",
    contentSections: [
      {
        title: "Investment Overview",
        text: "Our $7M Series A investment supported the development of this innovative supply chain platform that connects farmers directly with buyers, eliminating intermediaries and increasing profitability.",
      },
      {
        title: "Blockchain Innovation",
        text: "The platform uses blockchain technology to ensure transparency and traceability throughout the supply chain. Smart contracts automate payments and quality verification, reducing transaction costs by 30%.",
      },
      {
        title: "Market Impact",
        text: "• Connected 10,000+ farmers with buyers\n• Reduced supply chain costs by 25%\n• Increased farmer income by 35% on average\n• Processed $100M in agricultural transactions\n• Expanded to 8 countries in the region",
      },
    ],
  },
  {
    id: "cleantech-renewable-energy",
    title: "CleanTech Renewable Energy",
    description: "Solar energy solutions for commercial and residential applications",
    sector: "CleanTech",
    investmentStage: "Growth",
    investmentYear: 2021,
    image: "/placeholder.svg?height=400&width=600",
    contentImage: "/placeholder.svg?height=400&width=600",
    published: true,
    createdAt: "2021-11-05",
    contentSections: [
      {
        title: "Investment Overview",
        text: "We invested $15M in growth capital to help this renewable energy company expand their solar installation capacity and develop innovative energy storage solutions. The company is leading the clean energy transition in the region.",
      },
      {
        title: "Sustainable Impact",
        text: "The company has installed over 500MW of solar capacity, reducing carbon emissions by 300,000 tons annually. Their innovative financing models make solar energy accessible to businesses and homeowners.",
      },
      {
        title: "Growth Metrics",
        text: "• Installed 2,000+ solar systems\n• Generated 800GWh of clean energy\n• Created 500+ green jobs\n• Achieved 45% year-over-year revenue growth\n• Developed proprietary energy storage technology",
      },
    ],
  },
  {
    id: "logistics-tech-platform",
    title: "Logistics Tech Platform",
    description: "AI-driven logistics optimization platform for last-mile delivery",
    sector: "LogisticsTech",
    investmentStage: "Series A",
    investmentYear: 2024,
    image: "/placeholder.svg?height=400&width=600",
    contentImage: "/placeholder.svg?height=400&width=600",
    published: true,
    createdAt: "2024-02-14",
    contentSections: [
      {
        title: "Investment Overview",
        text: "Our $8M Series A investment enabled this logistics startup to scale their AI-powered platform that optimizes last-mile delivery routes and reduces operational costs for e-commerce businesses.",
      },
      {
        title: "Technology Platform",
        text: "The platform uses advanced machine learning algorithms to predict delivery times, optimize routes in real-time, and manage fleet operations. It integrates with major e-commerce platforms and provides end-to-end visibility.",
      },
      {
        title: "Operational Excellence",
        text: "• Reduced delivery costs by 30%\n• Improved on-time delivery rate to 98%\n• Processed 5M+ deliveries\n• Network of 5,000+ delivery partners\n• Expanded to 20 cities across the region",
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
