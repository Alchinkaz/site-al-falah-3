"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { i18n, type Lang } from "@/lib/i18n"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { getHomepageData, updateHomepageData } from "@/lib/homepage-data"

export default function AdminAboutPage() {
  const [currentLang, setCurrentLang] = useState<Lang>("en")
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [aboutTitleTranslations, setAboutTitleTranslations] = useState({
    en: i18n.aboutPageTitle?.en || i18n.aboutTitle.en,
    ru: i18n.aboutPageTitle?.ru || i18n.aboutTitle.ru,
    kz: i18n.aboutPageTitle?.kz || i18n.aboutTitle.kz,
  })
  const [aboutParagraphsTranslations, setAboutParagraphsTranslations] = useState({
    en: (i18n.aboutPageParagraphs?.en || i18n.aboutParagraphs.en || []).join("\n\n"),
    ru: (i18n.aboutPageParagraphs?.ru || i18n.aboutParagraphs.ru || []).join("\n\n"),
    kz: (i18n.aboutPageParagraphs?.kz || i18n.aboutParagraphs.kz || []).join("\n\n"),
  })
  const [aboutImageUrl, setAboutImageUrl] = useState("")
  const [keyTermsRows, setKeyTermsRows] = useState<any[]>(i18n.aboutPageKeyTermsRows || [])

  useEffect(() => {
    const data = getHomepageData()
    if (data?.aboutImage) setAboutImageUrl(data.aboutImage)
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage("")
    try {
      const updatedI18n = {
        ...i18n,
        aboutPageTitle: {
          en: aboutTitleTranslations.en,
          ru: aboutTitleTranslations.ru,
          kz: aboutTitleTranslations.kz,
        },
        aboutPageParagraphs: {
          en: aboutParagraphsTranslations.en.split(/\n\n+/).map((s) => s.trim()).filter(Boolean),
          ru: aboutParagraphsTranslations.ru.split(/\n\n+/).map((s) => s.trim()).filter(Boolean),
          kz: aboutParagraphsTranslations.kz.split(/\n\n+/).map((s) => s.trim()).filter(Boolean),
        },
        aboutPageKeyTermsRows: keyTermsRows,
      }
      localStorage.setItem("i18n-translations", JSON.stringify(updatedI18n))

      updateHomepageData({ aboutImage: aboutImageUrl })

      window.dispatchEvent(new CustomEvent("i18n-updated", { detail: { translations: updatedI18n } }))
      window.dispatchEvent(new CustomEvent("homepage-data-updated", { detail: { aboutImage: aboutImageUrl } }))

      setSaveMessage("Сохранено")
      setTimeout(() => setSaveMessage(""), 2000)
    } catch (e) {
      setSaveMessage("Ошибка при сохранении")
      setTimeout(() => setSaveMessage(""), 2000)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6 text-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Редактирование страницы «О компании»</h1>
          <p className="text-gray-600 mt-2">Управление контентом страницы «О компании»</p>
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
            saveMessage.includes("охран") || saveMessage.includes("Сохранено")
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {saveMessage}
        </div>
      )}

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
                onChange={(e) => setAboutTitleTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))}
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
                onChange={(e) => setAboutParagraphsTranslations((prev) => ({ ...prev, [currentLang]: e.target.value }))}
                rows={12}
                placeholder={"We make investments in companies across energy, mining, agriculture, food production, high‑tech, healthcare and other sectors.\n\nLeveraging deep regional expertise and a strong network, we are raising the Falah Growth Fund II, a USD200 million private equity fund focused on emerging opportunities and long‑term value creation.\n\nAl Falah Capital Partners is headquartered in Almaty. Since 2008, our principals have invested in or acquired dozens of companies including Karaganda Energocenter, Ulmus Besshoky, Alsad Kazakhstan, Ai Karaaul, Karaganda Kus, Elefund VC funds, Robinhood Inc., Soul of Nomad Inc. and others.\n\nCentral Asia is a rapidly growing region with exceptional entrepreneurs. We remain focused on its potential and are ready to partner with new investors to capture the next wave of growth."}
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Разделяйте абзацы пустой строкой.</p>
            </div>
            <div>
              <Label htmlFor="aboutImage" className="text-gray-900 font-medium">
                Ссылка на изображение (верхний баннер)
              </Label>
              <Input
                id="aboutImage"
                value={aboutImageUrl}
                onChange={(e) => setAboutImageUrl(e.target.value)}
                placeholder="/placeholder.svg"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Key terms editor */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">Key terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {keyTermsRows.map((row, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-900 font-medium">Label (EN)</Label>
                  <Input
                    value={row.label?.en || ""}
                    onChange={(e) => {
                      const next = [...keyTermsRows]
                      next[idx] = { ...next[idx], label: { ...(next[idx]?.label || {}), en: e.target.value } }
                      setKeyTermsRows(next)
                    }}
                    placeholder="Size"
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 font-medium">Label (RU)</Label>
                  <Input
                    value={row.label?.ru || ""}
                    onChange={(e) => {
                      const next = [...keyTermsRows]
                      next[idx] = { ...next[idx], label: { ...(next[idx]?.label || {}), ru: e.target.value } }
                      setKeyTermsRows(next)
                    }}
                    placeholder="Размер"
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 font-medium">Label (KZ)</Label>
                  <Input
                    value={row.label?.kz || ""}
                    onChange={(e) => {
                      const next = [...keyTermsRows]
                      next[idx] = { ...next[idx], label: { ...(next[idx]?.label || {}), kz: e.target.value } }
                      setKeyTermsRows(next)
                    }}
                    placeholder="Өлшемі"
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-900 font-medium">Value (EN)</Label>
                  <Input
                    value={row.value?.en || ""}
                    onChange={(e) => {
                      const next = [...keyTermsRows]
                      next[idx] = { ...next[idx], value: { ...(next[idx]?.value || {}), en: e.target.value } }
                      setKeyTermsRows(next)
                    }}
                    placeholder="USD200m"
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 font-medium">Value (RU)</Label>
                  <Input
                    value={row.value?.ru || ""}
                    onChange={(e) => {
                      const next = [...keyTermsRows]
                      next[idx] = { ...next[idx], value: { ...(next[idx]?.value || {}), ru: e.target.value } }
                      setKeyTermsRows(next)
                    }}
                    placeholder="USD200 млн"
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 font-medium">Value (KZ)</Label>
                  <Input
                    value={row.value?.kz || ""}
                    onChange={(e) => {
                      const next = [...keyTermsRows]
                      next[idx] = { ...next[idx], value: { ...(next[idx]?.value || {}), kz: e.target.value } }
                      setKeyTermsRows(next)
                    }}
                    placeholder="USD200 млн"
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => setKeyTermsRows(keyTermsRows.filter((_, i) => i !== idx))}
                >
                  Удалить
                </Button>
              </div>
            </div>
          ))}
          <div>
            <Button
              variant="outline"
              onClick={() => setKeyTermsRows([...keyTermsRows, { label: { en: "", ru: "", kz: "" }, value: { en: "", ru: "", kz: "" } }])}
              className="border-gray-300"
            >
              Добавить строку
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


