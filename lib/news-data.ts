import { AdminStorage, type NewsArticle } from "./admin-storage"

const initialNewsData = [
  {
    id: "1",
    title: "New Investment Opportunities in FinTech Sector",
    description:
      "We've identified promising new investment opportunities in the FinTech sector. Our portfolio expansion includes innovative startups revolutionizing digital payments and financial services.",
    content:
      "Starting December 15, 2024, we're announcing new investment opportunities in the rapidly growing FinTech sector. Our investment committee has identified several promising startups that are revolutionizing digital payments, blockchain technology, and financial services.\n\nThese new portfolio additions represent companies with strong founding teams, proven market traction, and scalable business models. We're particularly excited about startups focusing on digital banking solutions, cryptocurrency infrastructure, and AI-powered financial analytics.\n\nOur due diligence process ensures that each investment meets our strict criteria for growth potential and market disruption. We expect these investments to deliver significant returns over the next 3-5 years.",
    image: "/placeholder.svg?height=200&width=400",
    published: true,
    show_on_homepage: true,
    createdAt: "2024-12-15T10:00:00.000Z",
    updatedAt: "2024-12-15T10:00:00.000Z",
    contentSections: [
      {
        title: "Investment Details",
        text: "Starting December 15, 2024, we're announcing new investment opportunities in the rapidly growing FinTech sector. Our investment committee has identified several promising startups that are revolutionizing digital payments, blockchain technology, and financial services.\n\nThese new portfolio additions represent companies with strong founding teams, proven market traction, and scalable business models. We're particularly excited about startups focusing on digital banking solutions, cryptocurrency infrastructure, and AI-powered financial analytics.\n\nOur due diligence process ensures that each investment meets our strict criteria for growth potential and market disruption. We expect these investments to deliver significant returns over the next 3-5 years.",
      },
    ],
    contentImage: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "Expanding Portfolio into Healthcare Technology",
    description:
      "We're diversifying our investment portfolio by entering the healthcare technology sector. New partnerships with innovative healthtech startups promise significant growth potential.",
    content:
      "We're excited to announce our expansion into the healthcare technology sector. Our new portfolio companies are developing cutting-edge solutions in telemedicine, AI-powered diagnostics, and digital health platforms.\n\nThese investments align with our strategy of supporting companies that address critical market needs while demonstrating strong scalability. The healthcare technology market is experiencing unprecedented growth, driven by digital transformation and changing patient expectations.",
    image: "/placeholder.svg?height=200&width=400",
    published: true,
    show_on_homepage: true,
    createdAt: "2024-12-10T10:00:00.000Z",
    updatedAt: "2024-12-10T10:00:00.000Z",
    contentSections: [
      {
        title: "Investment Details",
        text: "We're excited to announce our expansion into the healthcare technology sector. Our new portfolio companies are developing cutting-edge solutions in telemedicine, AI-powered diagnostics, and digital health platforms.\n\nThese investments align with our strategy of supporting companies that address critical market needs while demonstrating strong scalability. The healthcare technology market is experiencing unprecedented growth, driven by digital transformation and changing patient expectations.",
      },
    ],
    contentImage: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    title: "Special Terms for Large-Scale Investments",
    description:
      "For investment rounds exceeding $5M, we offer specialized terms and dedicated support. Our experienced team provides personalized guidance for high-growth startups.",
    content:
      "Startups seeking investment rounds of $5M or more receive our premium investment package with specialized terms and dedicated support. We understand the complexity of large-scale funding rounds and provide comprehensive assistance throughout the process.\n\nEach investment opportunity is evaluated individually using our proprietary assessment framework. This allows us to offer the most competitive terms while ensuring optimal alignment between our fund and portfolio companies.",
    image: "/placeholder.svg?height=200&width=400",
    published: true,
    show_on_homepage: true,
    createdAt: "2024-12-05T10:00:00.000Z",
    updatedAt: "2024-12-05T10:00:00.000Z",
    contentSections: [
      {
        title: "Investment Details",
        text: "Startups seeking investment rounds of $5M or more receive our premium investment package with specialized terms and dedicated support. We understand the complexity of large-scale funding rounds and provide comprehensive assistance throughout the process.\n\nEach investment opportunity is evaluated individually using our proprietary assessment framework. This allows us to offer the most competitive terms while ensuring optimal alignment between our fund and portfolio companies.",
      },
    ],
    contentImage: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "4",
    title: "Enhanced Due Diligence Process",
    description:
      "We've implemented advanced due diligence procedures using AI-powered analysis tools, enabling more accurate startup evaluations and better investment decisions.",
    content:
      "We've upgraded our due diligence process with state-of-the-art AI-powered analysis tools. These new technologies enable more comprehensive evaluation of startup potential and market opportunities.\n\nOur enhanced evaluation process has improved accuracy by 30%, allowing us to make better investment decisions and provide more value to our portfolio companies.",
    image: "/placeholder.svg?height=200&width=400",
    published: true,
    show_on_homepage: false,
    createdAt: "2024-11-28T10:00:00.000Z",
    updatedAt: "2024-11-28T10:00:00.000Z",
    contentSections: [
      {
        title: "Investment Details",
        text: "We've upgraded our due diligence process with state-of-the-art AI-powered analysis tools. These new technologies enable more comprehensive evaluation of startup potential and market opportunities.\n\nOur enhanced evaluation process has improved accuracy by 30%, allowing us to make better investment decisions and provide more value to our portfolio companies.",
      },
    ],
    contentImage: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    title: "Holiday Season Investment Schedule",
    description:
      "Information about our investment activities during the holiday season. We continue to evaluate opportunities by appointment for urgent funding needs.",
    content:
      "During the holiday season, we continue to serve our portfolio companies and evaluate new investment opportunities. We operate by appointment to ensure personalized attention for each startup.\n\nTo schedule a meeting during the holidays, contact us via phone or WhatsApp. We'll arrange a convenient time for your funding discussion.",
    image: "/placeholder.svg?height=200&width=400",
    published: true,
    show_on_homepage: false,
    createdAt: "2024-11-20T10:00:00.000Z",
    updatedAt: "2024-11-20T10:00:00.000Z",
    contentSections: [
      {
        title: "Investment Details",
        text: "During the holiday season, we continue to serve our portfolio companies and evaluate new investment opportunities. We operate by appointment to ensure personalized attention for each startup.\n\nTo schedule a meeting during the holidays, contact us via phone or WhatsApp. We'll arrange a convenient time for your funding discussion.",
      },
    ],
    contentImage: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "6",
    title: "Investment Security and Best Practices",
    description:
      "Learn about our security measures for large investments and how to protect your startup from investment fraud in the venture capital market.",
    content:
      "Security of our investments and portfolio companies is our top priority. All investment meetings are conducted in secure facilities with comprehensive documentation and legal protections.\n\nWe recommend startups work only with licensed venture capital firms. Be cautious of unusually favorable terms and always verify the credentials and track record of potential investors.",
    image: "/placeholder.svg?height=200&width=400",
    published: true,
    show_on_homepage: false,
    createdAt: "2024-11-15T10:00:00.000Z",
    updatedAt: "2024-11-15T10:00:00.000Z",
    contentSections: [
      {
        title: "Investment Details",
        text: "Security of our investments and portfolio companies is our top priority. All investment meetings are conducted in secure facilities with comprehensive documentation and legal protections.\n\nWe recommend startups work only with licensed venture capital firms. Be cautious of unusually favorable terms and always verify the credentials and track record of potential investors.",
      },
    ],
    contentImage: "/placeholder.svg?height=200&width=400",
  },
]

// Function to initialize news data in admin panel
export function initializeNewsData() {
  const existingNews = AdminStorage.getNewsArticles()

  // If no news exists, add initial data
  if (existingNews.length === 0) {
    initialNewsData.forEach((article) => {
      AdminStorage.addNewsArticle(article as NewsArticle)
    })
  }
}

// Function to get all news
export function getAllNews(): NewsArticle[] {
  // Initialize data if it doesn't exist
  initializeNewsData()
  return AdminStorage.getNewsArticles()
}

// Function to get published news
export function getPublishedNews(): NewsArticle[] {
  return getAllNews().filter((article) => article.published)
}

// Function to get news for homepage
export function getHomepageNews(): NewsArticle[] {
  return getAllNews().filter((article) => article.published && article.show_on_homepage)
}

// Function to get news by ID
export function getNewsById(id: string): NewsArticle | null {
  const news = getAllNews().find((article) => article.id === id)
  return news || null
}

// Function to format date
export function formatNewsDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch (error) {
    return "Date not specified"
  }
}

// Extended data for detailed news display
export function getNewsWithDetails(id: string) {
  const article = getNewsById(id)
  if (!article) return null

  const contentSections =
    (article as any).contentSections && (article as any).contentSections.length > 0
      ? (article as any).contentSections
      : [
          {
            title: "Details",
            text: article.content,
          },
        ]

  // Add additional fields for compatibility with existing components
  return {
    ...article,
    date: formatNewsDate(article.createdAt),
    contentImage: (article as any).contentImage || article.image,
    contentSections,
  }
}
