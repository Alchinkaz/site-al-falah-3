import { HomepageService } from '@/lib/supabase-services'

export interface HomepageData {
  heroImage: string
  mobileMenuBg: string
  footerBg: string
  aboutImage?: string
  // Statistic titles displayed with animated numbers (strings like "$50M+", "25+", "15+")
  stat1Title?: string
  stat2Title?: string
  stat3Title?: string
  footerEmail?: string
  footerCopyright?: string
  heroTitle: string
  heroSubtitle: string
  aboutText: string
  aboutDescription: string
  faqItems: any[]
  reviews: any[]
  currencyRates: any[]
  tickerTexts: any[]
  portfolioItems: any[]
  stats: any[]
}

const defaultHomepageData: HomepageData = {
  heroImage: "/hero-bg.jpg",
  mobileMenuBg: "/hero-bg.jpg",
  footerBg: "/hero-bg.jpg",
  aboutImage: "/placeholder.svg",
  stat1Title: "$50M+",
  stat2Title: "25+",
  stat3Title: "15+",
  footerEmail: "altay@falahpartners.com",
  footerCopyright: "© 2025 Al Falah Capital Partners",
  heroTitle: "Empowering Innovation Through Strategic Venture Investment",
  heroSubtitle: "We partner with visionary entrepreneurs and groundbreaking startups to build the future.",
  aboutText: "Building Tomorrow's Success Stories Today",
  aboutDescription: "We are a leading venture capital firm...",
  faqItems: [],
  reviews: [],
  currencyRates: [],
  tickerTexts: [],
  portfolioItems: [],
  stats: [],
}

export async function getHomepageData(): Promise<HomepageData> {
  const config = await HomepageService.getHomepageData()
  // Support both dedicated keys (stat1Title, stat2Title, stat3Title)
  // and a possible statistics object { stat1Title, stat2Title, stat3Title }
  const statisticsFromObject = ((): { stat1Title?: string; stat2Title?: string; stat3Title?: string } => {
    const stats = (config as any)?.statistics
    if (stats && typeof stats === 'object' && !Array.isArray(stats)) {
      return {
        stat1Title: (stats as any).stat1Title,
        stat2Title: (stats as any).stat2Title,
        stat3Title: (stats as any).stat3Title,
      }
    }
    return {}
  })()

  return {
    ...defaultHomepageData,
    heroImage: (config as any)?.hero?.image ?? defaultHomepageData.heroImage,
    mobileMenuBg: (config as any)?.mobile_menu_bg?.image ?? defaultHomepageData.mobileMenuBg,
    footerBg: (config as any)?.footer_bg?.image ?? defaultHomepageData.footerBg,
    aboutImage: (config as any)?.aboutImage ?? defaultHomepageData.aboutImage,
    // Prefer dedicated keys from homepage_config, fall back to statistics object, then defaults
    stat1Title: (config as any)?.stat1Title ?? statisticsFromObject.stat1Title ?? defaultHomepageData.stat1Title,
    stat2Title: (config as any)?.stat2Title ?? statisticsFromObject.stat2Title ?? defaultHomepageData.stat2Title,
    stat3Title: (config as any)?.stat3Title ?? statisticsFromObject.stat3Title ?? defaultHomepageData.stat3Title,
    footerEmail: (config as any)?.footerEmail ?? defaultHomepageData.footerEmail,
    footerCopyright: (config as any)?.footerCopyright ?? defaultHomepageData.footerCopyright,
    heroTitle: defaultHomepageData.heroTitle,
    heroSubtitle: defaultHomepageData.heroSubtitle,
    aboutText: defaultHomepageData.aboutText,
    aboutDescription: defaultHomepageData.aboutDescription,
    faqItems: Array.isArray((config as any)?.faq_items) ? (config as any).faq_items : defaultHomepageData.faqItems,
    reviews: Array.isArray((config as any)?.reviews) ? (config as any).reviews : defaultHomepageData.reviews,
    currencyRates: Array.isArray((config as any)?.currency_rates) ? (config as any).currency_rates : defaultHomepageData.currencyRates,
    tickerTexts: Array.isArray((config as any)?.ticker_texts) ? (config as any).ticker_texts : defaultHomepageData.tickerTexts,
    portfolioItems: Array.isArray((config as any)?.portfolio_items) ? (config as any).portfolio_items : defaultHomepageData.portfolioItems,
    // Keep legacy stats array for compatibility if used elsewhere
    stats: Array.isArray((config as any)?.statistics) ? [(config as any).statistics] : defaultHomepageData.stats,
  }
}

export async function updateHomepageData(updates: Partial<HomepageData>): Promise<HomepageData> {
  // Map incoming updates to homepage_config keys
  const keyMap: Record<string, string> = {
    heroImage: 'hero',
    mobileMenuBg: 'mobile_menu_bg',
    footerBg: 'footer_bg',
    faqItems: 'faq_items',
    reviews: 'reviews',
    currencyRates: 'currency_rates',
    tickerTexts: 'ticker_texts',
    portfolioItems: 'portfolio_items',
    stats: 'statistics',
  }

  for (const [k, v] of Object.entries(updates)) {
    const key = keyMap[k] || k
    const value = typeof v === 'string' && (key === 'hero' || key === 'mobile_menu_bg' || key === 'footer_bg')
      ? { image: v }
      : v
    await HomepageService.updateHomepageData(key, value)
  }

  return await getHomepageData()
}
