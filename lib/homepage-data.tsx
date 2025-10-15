export interface Review {
  id: string
  name: string
  text: string
  rating: number
  date: string
}

export interface ImageGalleryItem {
  id: string
  url: string
  alt: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  order: number
}

export interface ContactsSection {
  phone: string
  email: string
  buttonText: string
  buttonLink: string
  mapIframe: string
}

export interface CurrencyRate {
  currency: string
  buyRate: number
  sellRate: number
  buyChange?: number
  sellChange?: number
}

export interface PortfolioItem {
  id: string
  title: string
  image: string
}

export interface HomepageData {
  // Hero Section
  heroTitle: string
  heroSubtitle: string
  heroButtonText: string
  heroButtonLink: string
  heroImage: string

  // About Company Section
  aboutImage: string
  aboutText: string
  aboutDescription: string

  // Statistics Section
  stat1Title: string
  stat1Subtitle: string
  stat2Title: string
  stat2Subtitle: string
  stat3Title: string
  stat3Subtitle: string

  // Reviews Section
  reviews: Review[]

  // Image Gallery Section
  imageGallery: ImageGalleryItem[]

  faqItems: FAQItem[]

  // Contacts Section
  contactsSection: ContactsSection

  // Currency Rates Section
  currencyRates: CurrencyRate[]

  portfolioItems: PortfolioItem[]

  tickerTexts?: string[]
}

// Default homepage data
const defaultHomepageData: HomepageData = {
  heroTitle: "Empowering Innovation Through Strategic Venture Investment",
  heroSubtitle:
    "We partner with visionary entrepreneurs and groundbreaking startups to build the future. From seed to scale, we provide capital, expertise, and networks to transform ideas into market leaders.",
  heroButtonText: "View Portfolio",
  heroButtonLink: "https://wa.me/77053333082",
  heroImage: "/money-bills-background.jpg",

  aboutImage: "/placeholder.svg",
  aboutText: "Building Tomorrow's Success Stories Today",
  aboutDescription:
    "We are a leading venture capital firm focused on identifying and nurturing exceptional startups across technology, healthcare, and sustainable innovation sectors.\n\nOur experienced team provides not just funding, but strategic guidance, industry connections, and operational expertise to help entrepreneurs scale their vision into global success stories.",

  stat1Title: "$50M+",
  stat1Subtitle: "Assets Under Management",
  stat2Title: "25+",
  stat2Subtitle: "Portfolio Companies",
  stat3Title: "15+",
  stat3Subtitle: "Successful Exits",

  reviews: [
    {
      id: "1",
      name: "Sarah Chen",
      text: "ALFALAH's investment and mentorship were instrumental in scaling our fintech startup from concept to Series A. Their network opened doors we couldn't have accessed alone.",
      rating: 5,
      date: "2 days ago",
    },
    {
      id: "2",
      name: "Marcus Rodriguez",
      text: "Beyond capital, ALFALAH provided strategic guidance that helped us navigate complex market challenges. Their expertise in our sector was invaluable for our growth.",
      rating: 5,
      date: "1 week ago",
    },
    {
      id: "3",
      name: "Elena Volkov",
      text: "Working with ALFALAH transformed our healthcare startup. Their connections with industry leaders and regulatory expertise accelerated our path to market.",
      rating: 5,
      date: "3 days ago",
    },
  ],

  imageGallery: [
    {
      id: "1",
      url: "/modern-office-interior.png",
      alt: "ALFALAH venture capital office",
    },
    {
      id: "2",
      url: "/currency-exchange.png",
      alt: "Investment meeting with entrepreneurs",
    },
    {
      id: "3",
      url: "/damaged-banknotes.jpg",
      alt: "Portfolio company showcase",
    },
  ],

  faqItems: [
    {
      id: "1",
      question: "What types of startups do you invest in?",
      answer:
        "We focus on early-stage to growth-stage companies in technology, healthcare, fintech, and sustainable innovation. We look for scalable business models, strong founding teams, and significant market opportunities.",
      order: 1,
    },
    {
      id: "2",
      question: "What is your typical investment range?",
      answer:
        "Our investments typically range from $100K for seed rounds to $5M for Series A and B rounds. We also participate in follow-on funding for our portfolio companies showing strong growth.",
      order: 2,
    },
    {
      id: "3",
      question: "What do you look for in founding teams?",
      answer:
        "We seek passionate, experienced founders with deep domain expertise, strong execution capabilities, and the vision to build category-defining companies. Team dynamics and coachability are also crucial factors.",
      order: 3,
    },
    {
      id: "4",
      question: "How long does the investment process take?",
      answer:
        "Our investment process typically takes 6-12 weeks from initial pitch to term sheet, depending on the complexity of the deal and due diligence requirements. We pride ourselves on efficient decision-making.",
      order: 4,
    },
    {
      id: "5",
      question: "What support do you provide beyond funding?",
      answer:
        "We offer strategic guidance, industry connections, operational expertise, talent acquisition support, and access to our extensive network of advisors, customers, and partners to help portfolio companies scale.",
      order: 5,
    },
    {
      id: "6",
      question: "Do you lead investment rounds?",
      answer:
        "Yes, we can lead rounds and also participate as co-investors alongside other VCs. We're flexible in our approach and focus on what's best for the company's growth trajectory.",
      order: 6,
    },
  ],

  contactsSection: {
    phone: "+7 (777) 323-17-15",
    email: "shotkin.azat@gmail.com",
    buttonText: "Schedule Meeting",
    buttonLink: "https://wa.me/77053333082",
    mapIframe: `<iframe
      src="https://yandex.kz/map-widget/v1/?from=mapframe&ll=76.952539%2C43.218606&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzE2ODMwMhIg0prQsNC30LDSm9GB0YLQsNC90LDQvdGC0YsiCg0r5JlCFdvyLEI%2C&source=mapframe&utm_source=mapframe&z=10"
      width="100%"
      height="100%"
      frameBorder="1"
      allowFullScreen={true}
      style={{ position: "relative", borderRadius: "1rem" }}
    />`,
  },

  currencyRates: [
    {
      currency: "Portfolio ROI",
      buyRate: 285.5,
      sellRate: 0,
      buyChange: 15.2,
      sellChange: 0,
    },
    {
      currency: "IRR",
      buyRate: 32.8,
      sellRate: 0,
      buyChange: 2.1,
      sellChange: 0,
    },
    {
      currency: "Success Rate",
      buyRate: 78.5,
      sellRate: 0,
      buyChange: 5.3,
      sellChange: 0,
    },
  ],

  portfolioItems: [
    {
      id: "1",
      title: "FinTech Startup",
      image: "/placeholder.svg",
    },
    {
      id: "2",
      title: "Healthcare Platform",
      image: "/placeholder.svg",
    },
    {
      id: "3",
      title: "AI Analytics",
      image: "/placeholder.svg",
    },
    {
      id: "4",
      title: "E-commerce Solution",
      image: "/placeholder.svg",
    },
    {
      id: "5",
      title: "SaaS Platform",
      image: "/placeholder.svg",
    },
  ],

  tickerTexts: [
    "Strategic venture capital investments",
    "Empowering innovative startups",
    "Technology, healthcare, and fintech focus",
    "From seed to scale partnerships",
    "Building tomorrow's market leaders",
    "Expert guidance and global networks",
  ],
}

const STORAGE_KEY = "homepage-data"

// In-memory storage for homepage data
let homepageData: HomepageData = { ...defaultHomepageData }

// Load data from localStorage on initialization
if (typeof window !== "undefined") {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const parsedData = JSON.parse(stored)
      homepageData = {
        ...defaultHomepageData,
        ...parsedData,
        // Override with new venture investing content
        heroTitle: defaultHomepageData.heroTitle,
        heroSubtitle: defaultHomepageData.heroSubtitle,
        aboutText: defaultHomepageData.aboutText,
        aboutDescription: defaultHomepageData.aboutDescription,
        faqItems: defaultHomepageData.faqItems,
        reviews: defaultHomepageData.reviews,
        currencyRates: defaultHomepageData.currencyRates,
        tickerTexts: defaultHomepageData.tickerTexts,
        portfolioItems: defaultHomepageData.portfolioItems,
      }
      // Save the updated data back to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(homepageData))
    } catch (error) {
      console.error("Error loading homepage data from localStorage:", error)
    }
  }
}

export function getHomepageData(): HomepageData {
  // Always check localStorage for latest data
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsedData = JSON.parse(stored)
        homepageData = {
          ...defaultHomepageData,
          ...parsedData,
          // Override with new venture investing content
          heroTitle: defaultHomepageData.heroTitle,
          heroSubtitle: defaultHomepageData.heroSubtitle,
          aboutText: defaultHomepageData.aboutText,
          aboutDescription: defaultHomepageData.aboutDescription,
          faqItems: defaultHomepageData.faqItems,
          reviews: defaultHomepageData.reviews,
          currencyRates: defaultHomepageData.currencyRates,
          tickerTexts: defaultHomepageData.tickerTexts,
          portfolioItems: defaultHomepageData.portfolioItems,
        }
      } catch (error) {
        console.error("Error loading homepage data from localStorage:", error)
      }
    }
  }
  return { ...homepageData }
}

export function updateHomepageData(data: Partial<HomepageData>): HomepageData {
  console.log("[v0] Updating homepage data:", data)
  homepageData = { ...homepageData, ...data }

  // Save to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(homepageData))
    console.log("[v0] Data saved to localStorage")

    window.dispatchEvent(
      new CustomEvent("homepage-data-updated", {
        detail: { ...homepageData, timestamp: Date.now() },
      }),
    )
    console.log("[v0] Event dispatched to notify components")
  }

  return { ...homepageData }
}
