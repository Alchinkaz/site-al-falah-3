"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { i18n, type Lang } from "@/lib/i18n"

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
      }
      
      localStorage.setItem("i18n-translations", JSON.stringify(updatedI18n))
      
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
          {/* Language Switcher */}
          <div className="flex gap-2 mb-6">
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
    </div>
  )
}
