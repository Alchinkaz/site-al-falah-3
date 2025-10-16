export interface User {
  id: string
  username: string
  password: string
  role: "admin"
  createdAt: string
  lastLogin?: string
}

export interface Order {
  id: string
  productName: string
  productImage?: string
  quantity: number
  contact: string
  city: string
  status: "new" | "processing" | "completed"
  createdAt: string
}

export interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  image?: string
  contentImage?: string
  images?: string[]
  // Portfolio specific fields
  badges?: Array<{ label: string; color: string }>
  investmentYear?: number
  contentSections?: Array<{ title: string; text: string }>
  published: boolean
  show_on_homepage: boolean
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  title: string
  description: string
  content: string
  image?: string
  published: boolean
  show_on_homepage: boolean
  createdAt: string
  updatedAt: string
}

// Утилиты для работы с localStorage
export class AdminStorage {
  private static isBrowser(): boolean {
    return typeof window !== "undefined"
  }

  // Пользователи
  static getUsers(): User[] {
    try {
      if (!this.isBrowser()) {
        return []
      }
      const users = localStorage.getItem("admin_users")
      if (!users) {
        // Создаем дефолтного админа
        const defaultAdmin: User = {
          id: "1",
          username: "admin",
          password: "admin123",
          role: "admin",
          createdAt: new Date().toISOString(),
        }
        this.setUsers([defaultAdmin])
        return [defaultAdmin]
      }
      return JSON.parse(users)
    } catch (error) {
      console.error("Error getting users:", error)
      return []
    }
  }

  static setUsers(users: User[]): void {
    try {
      if (!this.isBrowser()) {
        return
      }
      localStorage.setItem("admin_users", JSON.stringify(users))
    } catch (error) {
      console.error("Error setting users:", error)
    }
  }

  static updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers()
    const userIndex = users.findIndex((u) => u.id === id)
    if (userIndex === -1) return null

    users[userIndex] = { ...users[userIndex], ...updates }
    this.setUsers(users)
    return users[userIndex]
  }

  // Заявки
  static getOrders(): Order[] {
    try {
      if (!this.isBrowser()) {
        return []
      }
      const orders = localStorage.getItem("admin_orders")
      return orders ? JSON.parse(orders) : []
    } catch (error) {
      console.error("Error getting orders:", error)
      return []
    }
  }

  static setOrders(orders: Order[]): void {
    try {
      if (!this.isBrowser()) {
        return
      }
      localStorage.setItem("admin_orders", JSON.stringify(orders))
    } catch (error) {
      console.error("Error setting orders:", error)
    }
  }

  static addOrder(order: Order): void {
    const orders = this.getOrders()
    orders.unshift(order) // Добавляем в начало для сортировки по дате
    this.setOrders(orders)
  }

  static updateOrderStatus(id: string, status: Order["status"]): boolean {
    const orders = this.getOrders()
    const orderIndex = orders.findIndex((o) => o.id === id)
    if (orderIndex === -1) return false

    orders[orderIndex].status = status
    this.setOrders(orders)
    return true
  }

  static deleteOrder(id: string): boolean {
    const orders = this.getOrders()
    const filteredOrders = orders.filter((o) => o.id !== id)
    if (filteredOrders.length === orders.length) return false

    this.setOrders(filteredOrders)
    return true
  }

  // Новости
  static getNewsArticles(): NewsArticle[] {
    try {
      if (!this.isBrowser()) {
        return []
      }
      const articles = localStorage.getItem("admin_news")
      if (articles) {
        return JSON.parse(articles)
      }

      // Seed 6 default projects if none exist
      const now = new Date().toISOString()
      const defaults: NewsArticle[] = [
        {
          id: "p1",
          title: "Alsad Kazakhstan LLP",
          description:
            "Not operating and pre-bankrupt farm has been turned into the market leader in egg production reaching full capacity of 160 millions high quality eggs per year with a 20% market niche in Almaty region.",
          content:
            "Not operating and pre-bankrupt farm has been turned into the market leader in egg production reaching full capacity of 160 millions high quality eggs per year with a 20% market niche in Almaty region.",
          image: "",
          contentImage: "",
          badges: [
            { label: "Agriculture", color: "#16a34a" },
            { label: "Turnaround", color: "#ea580c" },
          ],
          investmentYear: 2012,
          contentSections: [
            {
              title: "Overview",
              text:
                "Not operating and pre-bankrupt farm has been turned into the market leader in egg production reaching full capacity of 160 millions high quality eggs per year with a 20% market niche in Almaty region.",
            },
          ],
          published: true,
          show_on_homepage: true,
          createdAt: new Date(Date.UTC(2012, 0, 1)).toISOString(),
          updatedAt: now,
        },
        {
          id: "p2",
          title: "Karaganda Energocenter LLP",
          description:
            "Investment has been used to support expansion program through the construction of new 120MW energy block to cover regional power deficit, total installed capacity has reached 712MW by the end of 2015.",
          content:
            "Investment has been used to support expansion program through the construction of new 120MW energy block to cover regional power deficit, total installed capacity has reached 712MW by the end of 2015.",
          image: "",
          contentImage: "",
          badges: [
            { label: "Energy", color: "#0ea5e9" },
            { label: "Growth", color: "#7c3aed" },
          ],
          investmentYear: 2012,
          contentSections: [
            {
              title: "Overview",
              text:
                "Investment has been used to support expansion program through the construction of new 120MW energy block to cover regional power deficit, total installed capacity has reached 712MW by the end of 2015.",
            },
          ],
          published: true,
          show_on_homepage: true,
          createdAt: new Date(Date.UTC(2012, 0, 1)).toISOString(),
          updatedAt: now,
        },
        {
          id: "p3",
          title: "Karaganda Kus LLP",
          description:
            "Further expansion of Alsad expertise to Karaganda region by attracting external funding and combined egg production business became the market leader in Kazakhstan with 300 million eggs capacity.",
          content:
            "Further expansion of Alsad expertise to Karaganda region by attracting external funding and combined egg production business became the market leader in Kazakhstan with 300 million eggs capacity.",
          image: "",
          contentImage: "",
          badges: [
            { label: "Agriculture", color: "#16a34a" },
            { label: "LBO", color: "#dc2626" },
          ],
          investmentYear: 2017,
          contentSections: [
            {
              title: "Overview",
              text:
                "Further expansion of Alsad expertise to Karaganda region by attracting external funding and combined egg production business became the market leader in Kazakhstan with 300 million eggs capacity.",
            },
          ],
          published: true,
          show_on_homepage: true,
          createdAt: new Date(Date.UTC(2017, 0, 1)).toISOString(),
          updatedAt: now,
        },
        {
          id: "p4",
          title: "Ulmus Besshoky JSC",
          description:
            "Early stage investment to conduct initial exploration to feasibility study with aim to expand confirmed resources that has been reached to 1,167K tons of copper",
          content:
            "Early stage investment to conduct initial exploration to feasibility study with aim to expand confirmed resources that has been reached to 1,167K tons of copper",
          image: "",
          contentImage: "",
          badges: [
            { label: "Mining", color: "#6b7280" },
            { label: "Greenfield", color: "#059669" },
          ],
          investmentYear: 2015,
          contentSections: [
            {
              title: "Overview",
              text:
                "Early stage investment to conduct initial exploration to feasibility study with aim to expand confirmed resources that has been reached to 1,167K tons of copper",
            },
          ],
          published: true,
          show_on_homepage: false,
          createdAt: new Date(Date.UTC(2015, 0, 1)).toISOString(),
          updatedAt: now,
        },
        {
          id: "p5",
          title: "Ai Karaaul JSC",
          description:
            "Early stage investment to conduct initial exploration to feasibility study with aim to expand confirmed resources that has been reached to 180K tons of high grade copper",
          content:
            "Early stage investment to conduct initial exploration to feasibility study with aim to expand confirmed resources that has been reached to 180K tons of high grade copper",
          image: "",
          contentImage: "",
          badges: [
            { label: "Mining", color: "#6b7280" },
            { label: "Greenfield", color: "#059669" },
          ],
          investmentYear: 2008,
          contentSections: [
            {
              title: "Overview",
              text:
                "Early stage investment to conduct initial exploration to feasibility study with aim to expand confirmed resources that has been reached to 180K tons of high grade copper",
            },
          ],
          published: true,
          show_on_homepage: false,
          createdAt: new Date(Date.UTC(2008, 0, 1)).toISOString(),
          updatedAt: now,
        },
        {
          id: "p6",
          title: "Elefund VC funds",
          description:
            "Investments were made in several consecutive VC funds that has a management team of world class operators and investors who strive for excellence and impact by building a new world of highly profitable businesses",
          content:
            "Investments were made in several consecutive VC funds that has a management team of world class operators and investors who strive for excellence and impact by building a new world of highly profitable businesses",
          image: "",
          contentImage: "",
          badges: [
            { label: "Venture Capital", color: "#2563eb" },
            { label: "Funds", color: "#9333ea" },
          ],
          investmentYear: 2017,
          contentSections: [
            {
              title: "Overview",
              text:
                "Investments were made in several consecutive VC funds that has a management team of world class operators and investors who strive for excellence and impact by building a new world of highly profitable businesses",
            },
          ],
          published: true,
          show_on_homepage: true,
          createdAt: new Date(Date.UTC(2017, 0, 1)).toISOString(),
          updatedAt: now,
        },
      ]

      // Seed i18n translations for default projects (titles, badges, sections)
      try {
        const stored = localStorage.getItem("i18n-translations")
        const parsed = stored ? JSON.parse(stored) : {}
        const next = { ...parsed }
        next.projectTexts = next.projectTexts || {}
        next.projectBadgesI18n = next.projectBadgesI18n || {}
        next.projectSections = next.projectSections || {}

        // p1 Alsad Kazakhstan LLP
        next.projectTexts["p1"] = {
          ...(next.projectTexts["p1"] || {}),
          title: {
            en: "Alsad Kazakhstan LLP",
            ru: "Алсад Казахстан ТОО",
            kz: "Alsad Kazakhstan ЖШС",
          },
        }
        next.projectBadgesI18n["p1"] = [
          { en: "Agriculture", ru: "Сельское хозяйство", kz: "Ауыл шаруашылығы" },
          { en: "Turnaround", ru: "Оздоровление", kz: "Беті қайтару" },
        ]
        next.projectSections["p1"] = {
          en: [{ title: "Overview", text: defaults[0].contentSections?.[0].text || "" }],
          ru: [{ title: "Обзор", text: "Неработающая ферма на грани банкротства была превращена в лидера рынка по производству яиц с мощностью 160 млн качественных яиц в год и долей 20% в Алматинском регионе." }],
          kz: [{ title: "Шолу", text: "Банкроттық алдында тұрған жұмыс істемейтін ферма жылына 160 млн сапалы жұмыртқа өндіретін нарық көшбасшысына айналды, Алматы өңірінде 20% үлеске жетті." }],
        }

        // p2 Karaganda Energocenter LLP
        next.projectTexts["p2"] = {
          ...(next.projectTexts["p2"] || {}),
          title: {
            en: "Karaganda Energocenter LLP",
            ru: "Караганда Энергоцентр ТОО",
            kz: "Қарағанды Энергоцентр ЖШС",
          },
        }
        next.projectBadgesI18n["p2"] = [
          { en: "Energy", ru: "Энергетика", kz: "Энергетика" },
          { en: "Growth", ru: "Рост", kz: "Өсу" },
        ]
        next.projectSections["p2"] = {
          en: [{ title: "Overview", text: defaults[1].contentSections?.[0].text || "" }],
          ru: [{ title: "Обзор", text: "Инвестиции направлены на расширение через строительство нового энергоблока 120 МВт для покрытия дефицита мощности, установленная мощность достигла 712 МВт к концу 2015 года." }],
          kz: [{ title: "Шолу", text: "Инвестициялар қуат тапшылығын жабу үшін 120 МВт жаңа энергоблок салу арқылы кеңейтуге бағытталды, 2015 жылдың соңына қарай орнатылған қуат 712 МВт-қа жетті." }],
        }

        // p3 Karaganda Kus LLP
        next.projectTexts["p3"] = {
          ...(next.projectTexts["p3"] || {}),
          title: {
            en: "Karaganda Kus LLP",
            ru: "Караганда Кус ТОО",
            kz: "Қарағанды Құс ЖШС",
          },
        }
        next.projectBadgesI18n["p3"] = [
          { en: "Agriculture", ru: "Сельское хозяйство", kz: "Ауыл шаруашылығы" },
          { en: "LBO", ru: "LBO", kz: "LBO" },
        ]
        next.projectSections["p3"] = {
          en: [{ title: "Overview", text: defaults[2].contentSections?.[0].text || "" }],
          ru: [{ title: "Обзор", text: "Дальнейшая экспансия экспертизы Alsad в Карагандинский регион с привлечением внешнего финансирования. Объединённый бизнес по производству яиц стал лидером рынка Казахстана с мощностью 300 млн яиц." }],
          kz: [{ title: "Шолу", text: "Сыртқы қаржыландыру тарту арқылы Alsad тәжірибесін Қарағанды өңіріне кеңейту. Біріккен жұмыртқа өндірісі 300 млн жұмыртқа қуатымен Қазақстан нарығының көшбасшысы болды." }],
        }

        // p4 Ulmus Besshoky JSC
        next.projectTexts["p4"] = {
          ...(next.projectTexts["p4"] || {}),
          title: {
            en: "Ulmus Besshoky JSC",
            ru: "Улмус Бешёкы АО",
            kz: "Ulmus Besshoky АҚ",
          },
        }
        next.projectBadgesI18n["p4"] = [
          { en: "Mining", ru: "Добыча", kz: "Кен өндіру" },
          { en: "Greenfield", ru: "Гринфилд", kz: "Гринфилд" },
        ]
        next.projectSections["p4"] = {
          en: [{ title: "Overview", text: defaults[3].contentSections?.[0].text || "" }],
          ru: [{ title: "Обзор", text: "Ранняя стадия: от разведки до ТЭО с целью увеличения подтверждённых ресурсов, достигнутых на уровне 1 167 тыс. тонн меди." }],
          kz: [{ title: "Шолу", text: "Ерте кезең: барлау жұмыстарынан ТЭН-ге дейін, 1 167 мың тонна мыс қоры расталды." }],
        }

        // p5 Ai Karaaul JSC
        next.projectTexts["p5"] = {
          ...(next.projectTexts["p5"] || {}),
          title: {
            en: "Ai Karaaul JSC",
            ru: "Ай Карааул АО",
            kz: "Ай Қарааул АҚ",
          },
        }
        next.projectBadgesI18n["p5"] = [
          { en: "Mining", ru: "Добыча", kz: "Кен өндіру" },
          { en: "Greenfield", ru: "Гринфилд", kz: "Гринфилд" },
        ]
        next.projectSections["p5"] = {
          en: [{ title: "Overview", text: defaults[4].contentSections?.[0].text || "" }],
          ru: [{ title: "Обзор", text: "Ранняя стадия: от разведки до ТЭО с целью увеличения подтверждённых ресурсов, достигнутых на уровне 180 тыс. тонн высокосортной меди." }],
          kz: [{ title: "Шолу", text: "Ерте кезең: барлау жұмыстарынан ТЭН-ге дейін, 180 мың тонна жоғары сапалы мыс қоры расталды." }],
        }

        // p6 Elefund VC funds
        next.projectTexts["p6"] = {
          ...(next.projectTexts["p6"] || {}),
          title: {
            en: "Elefund VC funds",
            ru: "Elefund венчурные фонды",
            kz: "Elefund венчур қорлары",
          },
        }
        next.projectBadgesI18n["p6"] = [
          { en: "Venture Capital", ru: "Венчурный капитал", kz: "Венчурлық капитал" },
          { en: "Funds", ru: "Фонды", kz: "Қорлар" },
        ]
        next.projectSections["p6"] = {
          en: [{ title: "Overview", text: defaults[5].contentSections?.[0].text || "" }],
          ru: [{ title: "Обзор", text: "Инвестиции в несколько последовательных венчурных фондов с командой мирового уровня, строящих высокодоходные компании с реальным воздействием." }],
          kz: [{ title: "Шолу", text: "Әлемдік деңгейдегі командасы бар бірнеше венчурлық қорға инвестициялар, жоғары табысты компаниялар құру арқылы әсер етеді." }],
        }

        localStorage.setItem("i18n-translations", JSON.stringify(next))
        ;(window as any).i18n_translations = next
        window.dispatchEvent(new CustomEvent("i18n-updated", { detail: next }))
      } catch {}

      this.setNewsArticles(defaults)
      return defaults
    } catch (error) {
      console.error("Error getting news articles:", error)
      return []
    }
  }

  static setNewsArticles(articles: NewsArticle[]): void {
    try {
      if (!this.isBrowser()) {
        return
      }
      localStorage.setItem("admin_news", JSON.stringify(articles))
      // Backfill missing RU/KZ translations for any existing projects without overwriting user data
      try {
        const stored = localStorage.getItem("i18n-translations")
        const parsed = stored ? JSON.parse(stored) : {}
        const next = { ...parsed }
        next.projectTexts = next.projectTexts || {}
        next.projectBadgesI18n = next.projectBadgesI18n || {}
        next.projectSections = next.projectSections || {}

        const ensure = (id: string, enTitle: string, ruTitle: string, kzTitle: string, badges: Array<{ en: string; ru: string; kz: string }>, enText: string, ruText: string, kzText: string) => {
          next.projectTexts[id] = next.projectTexts[id] || {}
          next.projectTexts[id].title = next.projectTexts[id].title || { en: enTitle, ru: ruTitle, kz: kzTitle }
          const existingBadges = Array.isArray(next.projectBadgesI18n[id]) ? next.projectBadgesI18n[id] : []
          const mergedBadges = [...existingBadges]
          for (let i = 0; i < badges.length; i++) {
            mergedBadges[i] = mergedBadges[i] || badges[i]
          }
          next.projectBadgesI18n[id] = mergedBadges
          next.projectSections[id] = next.projectSections[id] || {
            en: [{ title: "Overview", text: enText }],
            ru: [{ title: "Обзор", text: ruText }],
            kz: [{ title: "Шолу", text: kzText }],
          }
        }

        // Only backfill if defaults exist
        const byId: Record<string, NewsArticle> = {}
        for (const a of articles) byId[a.id] = a
        if (byId["p1"]) ensure(
          "p1",
          "Alsad Kazakhstan LLP",
          "Алсад Казахстан ТОО",
          "Alsad Kazakhstan ЖШС",
          [
            { en: "Agriculture", ru: "Сельское хозяйство", kz: "Ауыл шаруашылығы" },
            { en: "Turnaround", ru: "Оздоровление", kz: "Беті қайтару" },
          ],
          byId["p1"].contentSections?.[0]?.text || "",
          "Неработающая ферма на грани банкротства была превращена в лидера рынка по производству яиц с мощностью 160 млн качественных яиц в год и долей 20% в Алматинском регионе.",
          "Банкроттық алдында тұрған ферма жылына 160 млн сапалы жұмыртқа шығаратын нарық көшбасшысына айналды, Алматы өңірінде 20% үлеске жетті."
        )
        if (byId["p2"]) ensure(
          "p2",
          "Karaganda Energocenter LLP",
          "Караганда Энергоцентр ТОО",
          "Қарағанды Энергоцентр ЖШС",
          [
            { en: "Energy", ru: "Энергетика", kz: "Энергетика" },
            { en: "Growth", ru: "Рост", kz: "Өсу" },
          ],
          byId["p2"].contentSections?.[0]?.text || "",
          "Инвестиции направлены на расширение через строительство нового энергоблока 120 МВт для покрытия дефицита мощности, установленная мощность достигла 712 МВт к концу 2015 года.",
          "Инвестициялар қуат тапшылығын жабу үшін 120 МВт энергоблок салу арқылы кеңейтуге бағытталды, 2015 жылдың соңына қарай орнатылған қуат 712 МВт-қа жетті."
        )
        if (byId["p3"]) ensure(
          "p3",
          "Karaganda Kus LLP",
          "Караганда Кус ТОО",
          "Қарағанды Құс ЖШС",
          [
            { en: "Agriculture", ru: "Сельское хозяйство", kz: "Ауыл шаруашылығы" },
            { en: "LBO", ru: "LBO", kz: "LBO" },
          ],
          byId["p3"].contentSections?.[0]?.text || "",
          "Дальнейшая экспансия экспертизы Alsad в Карагандинский регион с привлечением внешнего финансирования. Объединённый бизнес по производству яиц стал лидером рынка Казахстана с мощностью 300 млн яиц.",
          "Сыртқы қаржыландыру арқылы Alsad тәжірибесін Қарағанды өңіріне кеңейту. Біріккен жұмыртқа өндірісі 300 млн жұмыртқа қуатымен Қазақстан нарығының көшбасшысы болды."
        )
        if (byId["p4"]) ensure(
          "p4",
          "Ulmus Besshoky JSC",
          "Улмус Бешёкы АО",
          "Ulmus Besshoky АҚ",
          [
            { en: "Mining", ru: "Добыча", kz: "Кен өндіру" },
            { en: "Greenfield", ru: "Гринфилд", kz: "Гринфилд" },
          ],
          byId["p4"].contentSections?.[0]?.text || "",
          "Ранняя стадия: от разведки до ТЭО с целью увеличения подтверждённых ресурсов, достигнутых на уровне 1 167 тыс. тонн меди.",
          "Ерте кезең: барлау жұмыстарынан ТЭН-ге дейін, 1 167 мың тонна мыс қоры расталды."
        )
        if (byId["p5"]) ensure(
          "p5",
          "Ai Karaaul JSC",
          "Ай Карааул АО",
          "Ай Қарааул АҚ",
          [
            { en: "Mining", ru: "Добыча", kz: "Кен өндіру" },
            { en: "Greenfield", ru: "Гринфилд", kz: "Гринфилд" },
          ],
          byId["p5"].contentSections?.[0]?.text || "",
          "Ранняя стадия: от разведки до ТЭО с целью увеличения подтверждённых ресурсов, достигнутых на уровне 180 тыс. тонн высокосортной меди.",
          "Ерте кезең: барлау жұмыстарынан ТЭН-ге дейін, 180 мың тонна жоғары сапалы мыс қоры расталды."
        )
        if (byId["p6"]) ensure(
          "p6",
          "Elefund VC funds",
          "Elefund венчурные фонды",
          "Elefund венчур қорлары",
          [
            { en: "Venture Capital", ru: "Венчурный капитал", kz: "Венчурлық капитал" },
            { en: "Funds", ru: "Фонды", kz: "Қорлар" },
          ],
          byId["p6"].contentSections?.[0]?.text || "",
          "Инвестиции в несколько последовательных венчурных фондов с командой мирового уровня, строящих высокодоходные компании с реальным воздействием.",
          "Әлемдік деңгейдегі командасы бар бірнеше венчурлық қорға инвестициялар, жоғары табысты компаниялар құру арқылы әсер етеді."
        )

        localStorage.setItem("i18n-translations", JSON.stringify(next))
        ;(window as any).i18n_translations = next
        window.dispatchEvent(new CustomEvent("i18n-updated", { detail: next }))
      } catch {}
      window.dispatchEvent(new CustomEvent("projects-updated", { detail: { timestamp: Date.now() } }))
    } catch (error) {
      console.error("Error setting news articles:", error)
    }
  }

  static addNewsArticle(article: NewsArticle): void {
    const articles = this.getNewsArticles()
    articles.unshift(article)
    this.setNewsArticles(articles)
  }

  static updateNewsArticle(id: string, updates: Partial<NewsArticle>): boolean {
    const articles = this.getNewsArticles()
    const articleIndex = articles.findIndex((a) => a.id === id)
    if (articleIndex === -1) return false

    articles[articleIndex] = { ...articles[articleIndex], ...updates, updatedAt: new Date().toISOString() }
    this.setNewsArticles(articles)
    return true
  }

  static deleteNewsArticle(id: string): boolean {
    const articles = this.getNewsArticles()
    const filteredArticles = articles.filter((a) => a.id !== id)
    if (filteredArticles.length === articles.length) return false

    this.setNewsArticles(filteredArticles)
    return true
  }

  // Проекты
  static getProjects(): Project[] {
    try {
      if (!this.isBrowser()) {
        return []
      }
      const projects = localStorage.getItem("admin_projects")
      return projects ? JSON.parse(projects) : []
    } catch (error) {
      console.error("Error getting projects:", error)
      return []
    }
  }

  static setProjects(projects: Project[]): void {
    try {
      if (!this.isBrowser()) {
        return
      }
      localStorage.setItem("admin_projects", JSON.stringify(projects))
    } catch (error) {
      console.error("Error setting projects:", error)
    }
  }

  static addProject(project: Project): void {
    const projects = this.getProjects()
    projects.unshift(project)
    this.setProjects(projects)
  }

  static updateProject(id: string, updates: Partial<Project>): boolean {
    const projects = this.getProjects()
    const projectIndex = projects.findIndex((p) => p.id === id)
    if (projectIndex === -1) return false

    projects[projectIndex] = { ...projects[projectIndex], ...updates, updatedAt: new Date().toISOString() }
    this.setProjects(projects)
    return true
  }

  static deleteProject(id: string): boolean {
    const projects = this.getProjects()
    const filteredProjects = projects.filter((p) => p.id !== id)
    if (filteredProjects.length === projects.length) return false

    this.setProjects(filteredProjects)
    return true
  }

  // Авторизация
  static getCurrentUser(): User | null {
    try {
      if (!this.isBrowser()) {
        return null
      }
      const userData = localStorage.getItem("current_user")
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error("Error getting current user:", error)
      return null
    }
  }

  static setCurrentUser(user: User): void {
    try {
      if (!this.isBrowser()) {
        return
      }
      localStorage.setItem("current_user", JSON.stringify(user))
      localStorage.setItem("admin_token", "authenticated")
    } catch (error) {
      console.error("Error setting current user:", error)
    }
  }

  static logout(): void {
    try {
      if (!this.isBrowser()) {
        return
      }
      localStorage.removeItem("current_user")
      localStorage.removeItem("admin_token")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  static isAuthenticated(): boolean {
    try {
      if (!this.isBrowser()) {
        return false
      }
      const token = localStorage.getItem("admin_token")
      const userData = localStorage.getItem("current_user")
      return token === "authenticated" && !!userData
    } catch (error) {
      console.error("Error checking authentication:", error)
      return false
    }
  }
}

export const PAGE_LABELS: Record<string, string> = {
  currency: "Курсы валют",
  homepage: "Главная страница",
  news: "Новости",
  contacts: "Контакты",
  users: "Пользователи",
}

export const getDefaultPermissions = (role: "admin" | "editor") => {
  if (role === "admin") {
    // Super admin gets all permissions
    return {
      currency: true,
      homepage: true,
      news: true,
      contacts: true,
      users: true,
    }
  } else {
    // Regular editors get no permissions by default
    return {
      currency: false,
      homepage: false,
      news: false,
      contacts: false,
      users: false,
    }
  }
}
