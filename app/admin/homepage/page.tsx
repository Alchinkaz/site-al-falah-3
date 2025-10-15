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
    en: i18n.heroTitle.en,
    ru: i18n.heroTitle.ru,
    kz: i18n.heroTitle.kz,
  })
  const [buttonTranslations, setButtonTranslations] = useState({
    en: i18n.heroButton.en,
    ru: i18n.heroButton.ru,
    kz: i18n.heroButton.kz,
  })
  const [portfolioTitleTranslations, setPortfolioTitleTranslations] = useState({
    en: i18n.portfolioTitle.en,
    ru: i18n.portfolioTitle.ru,
    kz: i18n.portfolioTitle.kz,
  })
  const [portfolioSubtitleTranslations, setPortfolioSubtitleTranslations] = useState({
    en: i18n.portfolioSubtitle.en,
    ru: i18n.portfolioSubtitle.ru,
    kz: i18n.portfolioSubtitle.kz,
  })
  const [portfolioButtonTranslations, setPortfolioButtonTranslations] = useState({
    en: i18n.portfolioViewAll.en,
    ru: i18n.portfolioViewAll.ru,
    kz: i18n.portfolioViewAll.kz,
  })
  const [aboutTitleTranslations, setAboutTitleTranslations] = useState({
    en: i18n.aboutTitle.en,
    ru: i18n.aboutTitle.ru,
    kz: i18n.aboutTitle.kz,
  })
  const [aboutParagraphsTranslations, setAboutParagraphsTranslations] = useState({
    en: (i18n.aboutParagraphs.en || []).join("\n\n"),
    ru: (i18n.aboutParagraphs.ru || []).join("\n\n"),
    kz: (i18n.aboutParagraphs.kz || []).join("\n\n"),
  })
  const [aboutImageUrl, setAboutImageUrl] = useState("")

  useEffect(() => {
    const data = getHomepageData()
    if (data?.aboutImage) setAboutImageUrl(data.aboutImage)
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
      // Update i18n translations in localStorage
      const updatedI18n = {
        ...i18n,
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
      }
      
      localStorage.setItem("i18n-translations", JSON.stringify(updatedI18n))
      // Save About image into homepage data
      updateHomepageData({ aboutImage: aboutImageUrl })
      
      // Dispatch event to update the main site
      window.dispatchEvent(
        new CustomEvent("i18n-updated", {
          detail: { translations: updatedI18n },
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
    </div>
  )
}
