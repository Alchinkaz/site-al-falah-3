import { HomepageService } from '@/lib/supabase-services'

export interface HomepageData {
  heroImage: string
  mobileMenuBg: string
  footerBg: string
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
  return {
        ...defaultHomepageData,
    heroImage: config?.hero?.image ?? defaultHomepageData.heroImage,
    mobileMenuBg: config?.mobile_menu_bg?.image ?? defaultHomepageData.mobileMenuBg,
    footerBg: config?.footer_bg?.image ?? defaultHomepageData.footerBg,
        heroTitle: defaultHomepageData.heroTitle,
        heroSubtitle: defaultHomepageData.heroSubtitle,
        aboutText: defaultHomepageData.aboutText,
        aboutDescription: defaultHomepageData.aboutDescription,
    faqItems: Array.isArray(config?.faq_items) ? config.faq_items : defaultHomepageData.faqItems,
    reviews: Array.isArray(config?.reviews) ? config.reviews : defaultHomepageData.reviews,
    currencyRates: Array.isArray(config?.currency_rates) ? config.currency_rates : defaultHomepageData.currencyRates,
    tickerTexts: Array.isArray(config?.ticker_texts) ? config.ticker_texts : defaultHomepageData.tickerTexts,
    portfolioItems: Array.isArray(config?.portfolio_items) ? config.portfolio_items : defaultHomepageData.portfolioItems,
    stats: Array.isArray(config?.statistics) ? [config.statistics] : defaultHomepageData.stats,
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
