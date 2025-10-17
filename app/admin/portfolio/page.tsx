"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { i18n, portfolioI18n, type Lang } from "@/lib/i18n"
import { NewsManagement } from "@/components/admin/news-management"

export default function AdminPortfolioPage() {
  const [currentLang, setCurrentLang] = useState<Lang>("en")
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const [titleTranslations, setTitleTranslations] = useState({
    en: portfolioI18n.heroTitle?.en || "Our Portfolio",
    ru: portfolioI18n.heroTitle?.ru || "Наше портфолио",
    kz: portfolioI18n.heroTitle?.kz || "Біздің портфолио",
  })
  const [subtitleTranslations, setSubtitleTranslations] = useState({
    en: portfolioI18n.heroSubtitle?.en || "Discover our portfolio of innovative companies transforming industries across Central Asia",
    ru: portfolioI18n.heroSubtitle?.ru || "Ознакомьтесь с портфелем инновационных компаний, меняющих отрасли в Центральной Азии",
    kz: portfolioI18n.heroSubtitle?.kz || "Орталық Азиядағы салаларды өзгертетін инновациялық компаниялар портфоліосымен танысыңыз",
  })

  // Track editor open/close to show top Cancel only during editing
  useEffect(() => {
    const handler = (e: any) => setIsEditing(!!e?.detail?.editing)
    window.addEventListener("admin-editing-project", handler as EventListener)
    return () => window.removeEventListener("admin-editing-project", handler as EventListener)
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage("")
    try {
      const updatedI18n = {
        ...i18n,
        portfolioI18n: {
          ...(i18n as any).portfolioI18n,
          heroTitle: {
            en: titleTranslations.en,
            ru: titleTranslations.ru,
            kz: titleTranslations.kz,
          },
          heroSubtitle: {
            en: subtitleTranslations.en,
            ru: subtitleTranslations.ru,
            kz: subtitleTranslations.kz,
          },
        },
      }
      localStorage.setItem("i18n-translations", JSON.stringify(updatedI18n))
      // Persist portfolio translations to Supabase
      const translationsSave = await fetch('/api/admin/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates: updatedI18n })
      })
      if (!translationsSave.ok) {
        const err = await translationsSave.json().catch(() => ({}))
        throw new Error(err?.error || 'Failed to save portfolio translations')
      }

      window.dispatchEvent(new CustomEvent("i18n-updated", { detail: { translations: updatedI18n } }))

      setSaveMessage("Сохранено")
      setTimeout(() => setSaveMessage(""), 2000)
    } catch (e) {
      setSaveMessage("Ошибка при сохранении")
      setTimeout(() => setSaveMessage(""), 2000)
    } finally {
      setIsSaving(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="space-y-6 text-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Проекты портфолио</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <Button
              variant={currentLang === "en" ? "default" : "outline"}
              onClick={() => {
                setCurrentLang("en")
                try {
                  window.dispatchEvent(new CustomEvent("admin-set-project-lang", { detail: { lang: "en" } }))
                } catch {}
              }}
              className={currentLang === "en" ? "bg-blue-600 text-white" : ""}
            >
              English
            </Button>
            <Button
              variant={currentLang === "ru" ? "default" : "outline"}
              onClick={() => {
                setCurrentLang("ru")
                try {
                  window.dispatchEvent(new CustomEvent("admin-set-project-lang", { detail: { lang: "ru" } }))
                } catch {}
              }}
              className={currentLang === "ru" ? "bg-blue-600 text-white" : ""}
            >
              Русский
            </Button>
            <Button
              variant={currentLang === "kz" ? "default" : "outline"}
              onClick={() => {
                setCurrentLang("kz")
                try {
                  window.dispatchEvent(new CustomEvent("admin-set-project-lang", { detail: { lang: "kz" } }))
                } catch {}
              }}
              className={currentLang === "kz" ? "bg-blue-600 text-white" : ""}
            >
              Қазақша
            </Button>
          </div>
          {isEditing && (
            <Button
              onClick={() => window.dispatchEvent(new Event("admin-cancel-edit"))}
              variant="outline"
              className="border-gray-300 text-gray-700 hidden md:inline-flex"
            >
              Отмена
            </Button>
          )}
          <Button
            onClick={() => window.dispatchEvent(new Event("admin-add-project"))}
            style={{ backgroundColor: "#16a34a" }}
            className="hover:opacity-90"
          >
            + Добавить проект
          </Button>
          <Button
            onClick={() => {
              if (isEditing) {
                window.dispatchEvent(new Event("admin-save-project"))
              } else {
                handleSave()
              }
            }}
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
            saveMessage.includes("охран") || saveMessage.includes("Сохранено")
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {saveMessage}
        </div>
      )}

      {/* Portfolio Section */}
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
                value={titleTranslations[currentLang]}
                onChange={(e) => setTitleTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))}
                placeholder="Our Portfolio"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="portfolioSubtitle" className="text-gray-900 font-medium">
                Подзаголовок ({currentLang === "en" ? "English" : currentLang === "ru" ? "Русский" : "Қазақша"})
              </Label>
              <Textarea
                id="portfolioSubtitle"
                value={subtitleTranslations[currentLang]}
                onChange={(e) => setSubtitleTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))}
                rows={3}
                placeholder="Discover our portfolio of innovative companies transforming industries across Central Asia"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects management merged here */}
      <NewsManagement currentUser={null as any} formatDate={formatDate} />
    </div>
  )
}
