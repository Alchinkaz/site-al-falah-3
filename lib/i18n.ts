export type Lang = "en" | "ru" | "kz"

export const defaultLang: Lang = "en"

export const i18n = {
  heroTitle: {
    en: "Capitalizing on Emerging Opportunities",
    ru: "Используем возможности растущих рынков",
    kz: "Өсіп келе жатқан мүмкіндіктерді іске асырамыз",
  },
  heroButton: {
    en: "View Portfolio",
    ru: "Портфолио",
    kz: "Портфолио",
  },
  portfolioTitle: {
    en: "Portfolio",
    ru: "Портфолио",
    kz: "Портфолио",
  },
  portfolioSubtitle: {
    en: "Successful investments that helped our portfolio companies scale and grow",
    ru: "Успешные инвестиции, которые помогли нашим компаниям расти и масштабироваться",
    kz: "Біздің портфельдік компаниялардың өсуіне және ауқымын кеңейтуіне көмектескен инвестициялар",
  },
  portfolioViewAll: {
    en: "View All",
    ru: "Смотреть все",
    kz: "Барлығын көру",
  },
  aboutTitle: {
    en: "About Us",
    ru: "О компании",
    kz: "Біз туралы",
  },
  // Shortened sample about text; can be replaced by CMS later
  aboutParagraphs: {
    en: [
      "We invest across energy, agriculture, industry and technology, partnering with ambitious teams to build durable value.",
      "Our principals have executed dozens of transactions across Central Asia, combining capital with deep operating expertise.",
    ],
    ru: [
      "Мы инвестируем в энергетику, агро‑промышленность, промышленность и технологии, сотрудничая с амбициозными командами для создания устойчивой стоимости.",
      "Наши партнёры реализовали десятки сделок в Центральной Азии, сочетая капитал с глубокой операционной экспертизой.",
    ],
    kz: [
      "Біз энергетика, агроөнеркәсіп, индустрия және технология салаларына инвестиция саламыз және құн құратын командалармен серіктесеміз.",
      "Біздің серіктестер Орталық Азияда ондаған мәміле жүзеге асырып, капиталды терең операциялық тәжірибемен ұштастырады.",
    ],
  },
  stat1Subtitle: {
    en: "Assets Under Management",
    ru: "Активы под управлением",
    kz: "Басқарудағы активтер",
  },
  stat2Subtitle: {
    en: "Portfolio Companies",
    ru: "Портфельные компании",
    kz: "Портфельдік компаниялар",
  },
  stat3Subtitle: {
    en: "Successful Exits",
    ru: "Успешные выходы",
    kz: "Сәтті шығулар",
  },
  ctaTitle: {
    en: ["What future are you building?", "We'd love to connect."],
    ru: ["Какое будущее вы строите?", "Будем рады познакомиться."],
    kz: ["Қандай болашақ құрып жатырсыз?", "Байланысуға қуаныштымыз."],
  },
  footerContactUs: {
    en: "Contact us:",
    ru: "Свяжитесь с нами:",
    kz: "Бізбен байланысыңыз:",
  },
  footerNameAltay: { en: "Altay Mamanbayev", ru: "Алтай Маманбаев", kz: "Алтай Маманбаев" },
  footerRoleAltay: {
    en: "Director & Chief Operating Officer",
    ru: "Директор и операционный директор (COO)",
    kz: "Директор және операциялық директор (COO)",
  },
  footerDevelopedBy: {
    en: "Developed by Web Alchin",
    ru: "Разработано Web Alchin",
    kz: "Web Alchin әзірлеген",
  },
  navHome: { en: "Home", ru: "Главная", kz: "Басты бет" },
  navAbout: { en: "About Us", ru: "О компании", kz: "Біз туралы" },
  navPortfolio: { en: "Portfolio", ru: "Портфолио", kz: "Портфолио" },
}

export function readLang(): Lang {
  if (typeof window === "undefined") return defaultLang
  const v = window.localStorage.getItem("lang") as Lang | null
  return v ?? defaultLang
}


