"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { i18n, type Lang } from "@/lib/i18n"
import { getHomepageData, updateHomepageData } from "@/lib/homepage-data"

export default function HomepageAdminPage() {
  const [currentLang, setCurrentLang] = useState<Lang>("en")
  const [heroTranslations, setHeroTranslations] = useState({
    en: i18n.heroTitle?.en || "Capitalizing on Emerging Opportunities",
    ru: i18n.heroTitle?.ru || "Используем возможности растущих рынков",
    kz: i18n.heroTitle?.kz || "Өсіп келе жатқан мүмкіндіктерді іске асырамыз",
  })
  const [buttonTranslations, setButtonTranslations] = useState({
    en: i18n.heroButton?.en || "View Portfolio",
    ru: i18n.heroButton?.ru || "Портфолио",
    kz: i18n.heroButton?.kz || "Портфолио",
  })
  const [portfolioTitleTranslations, setPortfolioTitleTranslations] = useState({
    en: i18n.portfolioTitle?.en || "Portfolio",
    ru: i18n.portfolioTitle?.ru || "Портфолио",
    kz: i18n.portfolioTitle?.kz || "Портфолио",
  })
  const [portfolioSubtitleTranslations, setPortfolioSubtitleTranslations] = useState({
    en: i18n.portfolioSubtitle?.en || "Successful investments that helped our portfolio companies scale and grow",
    ru: i18n.portfolioSubtitle?.ru || "Успешные инвестиции, которые помогли нашим компаниям расти и масштабироваться",
    kz: i18n.portfolioSubtitle?.kz || "Біздің портфельдік компаниялардың өсуіне және ауқымын кеңейтуіне көмектескен инвестициялар",
  })
  const [portfolioButtonTranslations, setPortfolioButtonTranslations] = useState({
    en: i18n.portfolioViewAll?.en || "View All",
    ru: i18n.portfolioViewAll?.ru || "Смотреть все",
    kz: i18n.portfolioViewAll?.kz || "Барлығын көру",
  })
  const [aboutTitleTranslations, setAboutTitleTranslations] = useState({
    en: i18n.aboutTitle?.en || "About Us",
    ru: i18n.aboutTitle?.ru || "О компании",
    kz: i18n.aboutTitle?.kz || "Біз туралы",
  })
  const [aboutParagraphsTranslations, setAboutParagraphsTranslations] = useState({
    en: (i18n.aboutParagraphs?.en || []).join("\n\n"),
    ru: (i18n.aboutParagraphs?.ru || []).join("\n\n"),
    kz: (i18n.aboutParagraphs?.kz || []).join("\n\n"),
  })
  const [aboutImageUrl, setAboutImageUrl] = useState("")
  const [heroBgUrl, setHeroBgUrl] = useState("")
  const [footerBgUrl, setFooterBgUrl] = useState("")
  const [mobileMenuBgUrl, setMobileMenuBgUrl] = useState("")

  // Navbar Mobile Menu translations
  const [mobileMenuTranslations, setMobileMenuTranslations] = useState({
    home: {
      en: i18n.navHome?.en || "Home",
      ru: i18n.navHome?.ru || "Главная",
      kz: i18n.navHome?.kz || "Басты бет",
    },
    about: {
      en: i18n.navAbout?.en || "About Us",
      ru: i18n.navAbout?.ru || "О компании",
      kz: i18n.navAbout?.kz || "Біз туралы",
    },
    portfolio: {
      en: i18n.navPortfolio?.en || "Portfolio",
      ru: i18n.navPortfolio?.ru || "Портфолио",
      kz: i18n.navPortfolio?.kz || "Портфолио",
    },
  })
  // Statistics
  const [statTitles, setStatTitles] = useState<{ stat1Title: string; stat2Title: string; stat3Title: string }>({
    stat1Title: "",
    stat2Title: "",
    stat3Title: "",
  })
  const [stat1SubtitleTranslations, setStat1SubtitleTranslations] = useState({
    en: i18n.stat1Subtitle?.en || "Assets Under Management",
    ru: i18n.stat1Subtitle?.ru || "Активы под управлением",
    kz: i18n.stat1Subtitle?.kz || "Басқарудағы активтер",
  })
  const [stat2SubtitleTranslations, setStat2SubtitleTranslations] = useState({
    en: i18n.stat2Subtitle?.en || "Portfolio Companies",
    ru: i18n.stat2Subtitle?.ru || "Портфельные компании",
    kz: i18n.stat2Subtitle?.kz || "Портфельдік компаниялар",
  })
  const [stat3SubtitleTranslations, setStat3SubtitleTranslations] = useState({
    en: i18n.stat3Subtitle?.en || "Successful Exits",
    ru: i18n.stat3Subtitle?.ru || "Успешные выходы",
    kz: i18n.stat3Subtitle?.kz || "Сәтті шығулар",
  })

  // Footer
  const [footerEmail, setFooterEmail] = useState("")
  const [footerCopyright, setFooterCopyright] = useState("")
  const [footerContactUsTranslations, setFooterContactUsTranslations] = useState({
    en: i18n.footerContactUs?.en || "Contact us:",
    ru: i18n.footerContactUs?.ru || "Свяжитесь с нами:",
    kz: i18n.footerContactUs?.kz || "Бізбен байланысыңыз:",
  })
  const [footerNameTranslations, setFooterNameTranslations] = useState({
    en: i18n.footerNameAltay?.en || "Altay Mamanbayev",
    ru: i18n.footerNameAltay?.ru || "Алтай Маманбаев",
    kz: i18n.footerNameAltay?.kz || "Алтай Маманбаев",
  })
  const [footerRoleTranslations, setFooterRoleTranslations] = useState({
    en: i18n.footerRoleAltay?.en || "Chief Operating Officer",
    ru: i18n.footerRoleAltay?.ru || "Исполнительный Директор",
    kz: i18n.footerRoleAltay?.kz || "Атқарушы Директор",
  })
  const [ctaLine1Translations, setCtaLine1Translations] = useState({
    en: i18n.ctaTitle.en?.[0] || "",
    ru: i18n.ctaTitle.ru?.[0] || "",
    kz: i18n.ctaTitle.kz?.[0] || "",
  })
  const [ctaLine2Translations, setCtaLine2Translations] = useState({
    en: i18n.ctaTitle.en?.[1] || "",
    ru: i18n.ctaTitle.ru?.[1] || "",
    kz: i18n.ctaTitle.kz?.[1] || "",
  })

  useEffect(() => {
    const data = getHomepageData()
    if (data?.aboutImage) setAboutImageUrl(data.aboutImage)
    if (data?.heroImage) setHeroBgUrl(data.heroImage)
    if (data?.footerBg) setFooterBgUrl(data.footerBg)
    if (data?.mobileMenuBg) setMobileMenuBgUrl(data.mobileMenuBg)
    // Initialize statistics titles from homepage data
    if (data) {
      setStatTitles({
        stat1Title: data.stat1Title || "",
        stat2Title: data.stat2Title || "",
        stat3Title: data.stat3Title || "",
      })
      setFooterEmail(data.footerEmail || "altay@falahpartners.com")
      setFooterCopyright(data.footerCopyright || "© 2025 Al Falah Capital Partners")
    }
  }, [])
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const handleHeroTitleChange = (lang: Lang, value: string) => {
    setHeroTranslations((prev) => ({
      ...prev,
      [lang]: value,
    }))
  }

  const handleButtonTextChange = (lang: Lang, value: string) => {
    setButtonTranslations((prev) => ({
        ...prev,
      [lang]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage("")

    try {
      const normalizeUrl = (val: string) => {
        const v = (val || "").trim()
        if (!v) return ""
        if (/^https?:\/\//i.test(v)) return v
        if (/^data:image\//i.test(v)) return v
        return v.startsWith("/") ? v : `/${v}`
      }

      // Update i18n translations in localStorage
      const updatedI18n = {
        ...i18n,
        // Navbar Mobile Menu
        navHome: {
          ...(i18n as any).navHome,
          ...mobileMenuTranslations.home,
        },
        navAbout: {
          ...(i18n as any).navAbout,
          ...mobileMenuTranslations.about,
        },
        navPortfolio: {
          ...(i18n as any).navPortfolio,
          ...mobileMenuTranslations.portfolio,
        },
        heroTitle: {
          ...i18n.heroTitle,
          ...heroTranslations,
        },
        heroButton: {
          ...i18n.heroButton,
          ...buttonTranslations,
        },
        portfolioTitle: {
          ...i18n.portfolioTitle,
          ...portfolioTitleTranslations,
        },
        portfolioSubtitle: {
          ...i18n.portfolioSubtitle,
          ...portfolioSubtitleTranslations,
        },
        portfolioViewAll: {
          ...i18n.portfolioViewAll,
          ...portfolioButtonTranslations,
        },
        aboutTitle: {
          ...i18n.aboutTitle,
          ...aboutTitleTranslations,
        },
        aboutParagraphs: {
          en: aboutParagraphsTranslations.en.split(/\n\n+/).map((s) => s.trim()).filter(Boolean),
          ru: aboutParagraphsTranslations.ru.split(/\n\n+/).map((s) => s.trim()).filter(Boolean),
          kz: aboutParagraphsTranslations.kz.split(/\n\n+/).map((s) => s.trim()).filter(Boolean),
        },
        // Statistics subtitles
        stat1Subtitle: {
          ...i18n.stat1Subtitle,
          ...stat1SubtitleTranslations,
        },
        stat2Subtitle: {
          ...i18n.stat2Subtitle,
          ...stat2SubtitleTranslations,
        },
        stat3Subtitle: {
          ...i18n.stat3Subtitle,
          ...stat3SubtitleTranslations,
        },
        footerContactUs: {
          ...i18n.footerContactUs,
          ...footerContactUsTranslations,
        },
        footerNameAltay: {
          ...i18n.footerNameAltay,
          ...footerNameTranslations,
        },
        footerRoleAltay: {
          ...i18n.footerRoleAltay,
          ...footerRoleTranslations,
        },
        ctaTitle: {
          en: [ctaLine1Translations.en, ctaLine2Translations.en],
          ru: [ctaLine1Translations.ru, ctaLine2Translations.ru],
          kz: [ctaLine1Translations.kz, ctaLine2Translations.kz],
        },
      }
      
      localStorage.setItem("i18n-translations", JSON.stringify(updatedI18n))
      // Save About image and statistics numbers into homepage data (normalize URLs to allow local public paths)
      updateHomepageData({
        aboutImage: normalizeUrl(aboutImageUrl) || undefined,
        heroImage: normalizeUrl(heroBgUrl) || undefined,
        footerBg: normalizeUrl(footerBgUrl) || undefined,
        mobileMenuBg: normalizeUrl(mobileMenuBgUrl) || undefined,
        stat1Title: statTitles.stat1Title,
        stat2Title: statTitles.stat2Title,
        stat3Title: statTitles.stat3Title,
        footerEmail,
        footerCopyright,
      })
      
      // Dispatch event to update the main site
      window.dispatchEvent(
        new CustomEvent("i18n-updated", {
          detail: { translations: updatedI18n },
        })
      )
      window.dispatchEvent(
        new CustomEvent("homepage-data-updated", {
          detail: { footerEmail, footerCopyright },
        })
      )
      
      setSaveMessage("Переводы успешно сохранены!")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      setSaveMessage("Ошибка при сохранении переводов")
      setTimeout(() => setSaveMessage(""), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6 text-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Редактирование главной страницы</h1>
          <p className="text-gray-600 mt-2">Управление контентом hero секции</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <Button
              variant={currentLang === "en" ? "default" : "outline"}
              onClick={() => setCurrentLang("en")}
              className={currentLang === "en" ? "bg-blue-600 text-white" : ""}
            >
              English
            </Button>
            <Button
              variant={currentLang === "ru" ? "default" : "outline"}
              onClick={() => setCurrentLang("ru")}
              className={currentLang === "ru" ? "bg-blue-600 text-white" : ""}
            >
              Русский
            </Button>
            <Button
              variant={currentLang === "kz" ? "default" : "outline"}
              onClick={() => setCurrentLang("kz")}
              className={currentLang === "kz" ? "bg-blue-600 text-white" : ""}
            >
              Қазақша
            </Button>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
            style={{ backgroundColor: "#16a34a" }}
            className="hover:opacity-90 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Сохранение..." : "Сохранить"}
        </Button>
        </div>
      </div>

      {saveMessage && (
        <div
          className={`p-4 rounded-lg ${
            saveMessage.includes("успешно") 
              ? "bg-green-50 text-green-800 border border-green-200" 
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {saveMessage}
        </div>
      )}

      {/* Navbar Mobile Menu Section */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">Navbar Mobile Menu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
              <Label className="text-gray-900 font-medium">Home ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})</Label>
                <Input
                value={mobileMenuTranslations.home[currentLang]}
                onChange={(e) => setMobileMenuTranslations((prev: any) => ({ ...prev, home: { ...prev.home, [currentLang]: e.target.value } }))}
                placeholder="Home"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
              <Label className="text-gray-900 font-medium">About Us ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})</Label>
                <Input
                value={mobileMenuTranslations.about[currentLang]}
                onChange={(e) => setMobileMenuTranslations((prev: any) => ({ ...prev, about: { ...prev.about, [currentLang]: e.target.value } }))}
                placeholder="About Us"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
              <Label className="text-gray-900 font-medium">Portfolio ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})</Label>
                <Input
                value={mobileMenuTranslations.portfolio[currentLang]}
                onChange={(e) => setMobileMenuTranslations((prev: any) => ({ ...prev, portfolio: { ...prev.portfolio, [currentLang]: e.target.value } }))}
                placeholder="Portfolio"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
          </div>
              <div>
            <Label className="text-gray-900 font-medium">Фон мобильного меню (ссылка на изображение)</Label>
                <Input
              value={mobileMenuBgUrl}
              onChange={(e) => setMobileMenuBgUrl(e.target.value)}
              placeholder="/placeholder.svg"
              className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Hero Section Editor */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Current Language Editor */}
          <div className="space-y-6">
          <div>
              <Label htmlFor="heroTitle" className="text-gray-900 font-medium">
                Заголовок ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})
            </Label>
            <Textarea
              id="heroTitle"
                value={heroTranslations[currentLang]}
                onChange={(e) => handleHeroTitleChange(currentLang, e.target.value)}
                placeholder="Введите заголовок hero секции"
              rows={3}
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
              <Label htmlFor="heroButtonText" className="text-gray-900 font-medium">
                Текст кнопки ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})
              </Label>
              <Input
                id="heroButtonText"
                value={buttonTranslations[currentLang]}
                onChange={(e) => handleButtonTextChange(currentLang, e.target.value)}
                placeholder="View Portfolio"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            </div>
          <div>
            <Label htmlFor="heroBg" className="text-gray-900 font-medium">Фон Hero (ссылка на изображение)</Label>
            <Input
              id="heroBg"
              value={heroBgUrl}
              onChange={(e) => setHeroBgUrl(e.target.value)}
              placeholder="/money-bills-background.jpg"
              className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>
      {/* Portfolio Section Editor */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">Portfolio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="portfolioTitle" className="text-gray-900 font-medium">
                Заголовок ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})
              </Label>
              <Input
                id="portfolioTitle"
                value={portfolioTitleTranslations[currentLang]}
                onChange={(e) =>
                  setPortfolioTitleTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))
                }
                placeholder="Portfolio"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="portfolioSubtitle" className="text-gray-900 font-medium">
                Подзаголовок ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})
              </Label>
            <Textarea
                id="portfolioSubtitle"
                value={portfolioSubtitleTranslations[currentLang]}
                      onChange={(e) =>
                  setPortfolioSubtitleTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))
                }
                placeholder="Successful investments that helped our portfolio companies scale and grow"
                rows={3}
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
          </div>
              <div>
              <Label htmlFor="portfolioViewAll" className="text-gray-900 font-medium">
                Текст кнопки ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})
                </Label>
                      <Input
                id="portfolioViewAll"
                value={portfolioButtonTranslations[currentLang]}
                onChange={(e) =>
                  setPortfolioButtonTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))
                }
                placeholder="View All"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
                    </div>
          </div>
        </CardContent>
      </Card>
      {/* About Us Section Editor */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">About Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
          <div>
              <Label htmlFor="aboutTitle" className="text-gray-900 font-medium">
                Заголовок ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})
            </Label>
            <Input
                id="aboutTitle"
                value={aboutTitleTranslations[currentLang]}
                onChange={(e) =>
                  setAboutTitleTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))
                }
                placeholder="About Us"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
              <Label htmlFor="aboutParagraphs" className="text-gray-900 font-medium">
                Текст ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})
            </Label>
            <Textarea
                id="aboutParagraphs"
                value={aboutParagraphsTranslations[currentLang]}
                onChange={(e) =>
                  setAboutParagraphsTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))
                }
                placeholder={"We invest across energy, agriculture, industry and technology, partnering with ambitious teams to build durable value.\n\nOur principals have executed dozens of transactions across Central Asia, combining capital with deep operating expertise."}
                rows={6}
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Разделяйте абзацы пустой строкой.</p>
          </div>
          <div>
              <Label htmlFor="aboutImage" className="text-gray-900 font-medium">
                Ссылка на изображение
            </Label>
                <Input
                id="aboutImage"
                value={aboutImageUrl}
                onChange={(e) => setAboutImageUrl(e.target.value)}
                placeholder="/placeholder.svg"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Картинка по ссылке будет отображаться в блоке изображения.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Statistics Section Editor (moved after About Us) */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat 1 */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="stat1Title" className="text-gray-900 font-medium">Значение</Label>
                <Input
                  id="stat1Title"
                  value={statTitles.stat1Title}
                  onChange={(e) => setStatTitles((prev) => ({ ...prev, stat1Title: e.target.value }))}
                  placeholder="$50M+"
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label className="text-gray-900 font-medium">Подпись ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})</Label>
                <Input
                  value={stat1SubtitleTranslations[currentLang]}
                  onChange={(e) => setStat1SubtitleTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))}
                  placeholder="Assets Under Management"
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Stat 2 */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="stat2Title" className="text-gray-900 font-medium">Значение</Label>
                <Input
                  id="stat2Title"
                  value={statTitles.stat2Title}
                  onChange={(e) => setStatTitles((prev) => ({ ...prev, stat2Title: e.target.value }))}
                  placeholder="25+"
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label className="text-gray-900 font-medium">Подпись ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})</Label>
                <Input
                  value={stat2SubtitleTranslations[currentLang]}
                  onChange={(e) => setStat2SubtitleTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))}
                  placeholder="Portfolio Companies"
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Stat 3 */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="stat3Title" className="text-gray-900 font-medium">Значение</Label>
                <Input
                  id="stat3Title"
                  value={statTitles.stat3Title}
                  onChange={(e) => setStatTitles((prev) => ({ ...prev, stat3Title: e.target.value }))}
                  placeholder="15+"
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label className="text-gray-900 font-medium">Подпись ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})</Label>
                <Input
                  value={stat3SubtitleTranslations[currentLang]}
                  onChange={(e) => setStat3SubtitleTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))}
                  placeholder="Successful Exits"
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Footer Section Editor */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">Footer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div>
              <Label className="text-gray-900 font-medium">Фон Footer (ссылка на изображение)</Label>
              <Input
                value={footerBgUrl}
                onChange={(e) => setFooterBgUrl(e.target.value)}
                placeholder="/placeholder.svg"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
                    <div>
              <Label className="text-gray-900 font-medium">CTA — строка 1 ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})</Label>
              <Input
                value={ctaLine1Translations[currentLang]}
                onChange={(e) => setCtaLine1Translations((prev) => ({ ...prev, [currentLang]: e.target.value }))}
                placeholder="What future are you building?"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
              <Label className="text-gray-900 font-medium">CTA — строка 2 ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})</Label>
              <Input
                value={ctaLine2Translations[currentLang]}
                onChange={(e) => setCtaLine2Translations((prev) => ({ ...prev, [currentLang]: e.target.value }))}
                placeholder="We'd love to connect."
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                <Label className="text-gray-900 font-medium">Метка контактов ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})</Label>
                <Input
                  value={footerContactUsTranslations[currentLang]}
                  onChange={(e) => setFooterContactUsTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))}
                  placeholder="Contact us:"
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                <Label className="text-gray-900 font-medium">Email</Label>
                <Input
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  placeholder="altay@falahpartners.com"
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <Label className="text-gray-900 font-medium">Имя ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})</Label>
                <Input
                  value={footerNameTranslations[currentLang]}
                  onChange={(e) => setFooterNameTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))}
                  placeholder="Altay Mamanbayev"
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label className="text-gray-900 font-medium">Должность ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})</Label>
                <Input
                  value={footerRoleTranslations[currentLang]}
                  onChange={(e) => setFooterRoleTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))}
                  placeholder="Chief Operating Officer"
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
                      <div>
              <Label className="text-gray-900 font-medium">Copyright</Label>
                <Input
                value={footerCopyright}
                onChange={(e) => setFooterCopyright(e.target.value)}
                placeholder="© 2025 Al Falah Capital Partners"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
          </div>
        </CardContent>
      </Card>

      
    </div>
  )
}
