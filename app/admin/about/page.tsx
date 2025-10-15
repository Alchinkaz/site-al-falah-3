"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { i18n, type Lang, teamI18n, teamNames } from "@/lib/i18n"
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
  const [keyTermsTitle, setKeyTermsTitle] = useState<{ en: string; ru: string; kz: string }>((i18n as any).aboutPageKeyTermsTitle || { en: "Key terms", ru: "Ключевые условия", kz: "Негізгі шарттар" })
  const [sectorsTitle, setSectorsTitle] = useState<{ en: string; ru: string; kz: string }>((i18n as any).aboutPageSectorsTitle || { en: "Sectors", ru: "Сектора", kz: "Салалар" })
  const [sectors, setSectors] = useState<any[]>(((i18n as any).aboutPageSectors) || [])
  // Team editor state
  const [teamTitle, setTeamTitle] = useState<{ en: string; ru: string; kz: string }>(i18n.teamTitle)
  const [teamPhotos, setTeamPhotos] = useState<Record<string, string>>(((i18n as any).teamPhotos) || {})
  // Statistics (same as homepage)
  const [statTitles, setStatTitles] = useState<{ stat1Title: string; stat2Title: string; stat3Title: string }>({
    stat1Title: "",
    stat2Title: "",
    stat3Title: "",
  })
  const [stat1SubtitleTranslations, setStat1SubtitleTranslations] = useState({
    en: i18n.stat1Subtitle.en,
    ru: i18n.stat1Subtitle.ru,
    kz: i18n.stat1Subtitle.kz,
  })
  const [stat2SubtitleTranslations, setStat2SubtitleTranslations] = useState({
    en: i18n.stat2Subtitle.en,
    ru: i18n.stat2Subtitle.ru,
    kz: i18n.stat2Subtitle.kz,
  })
  const [stat3SubtitleTranslations, setStat3SubtitleTranslations] = useState({
    en: i18n.stat3Subtitle.en,
    ru: i18n.stat3Subtitle.ru,
    kz: i18n.stat3Subtitle.kz,
  })

  useEffect(() => {
    const data = getHomepageData()
    if (data?.aboutImage) setAboutImageUrl(data.aboutImage)
    if (data) {
      setStatTitles({
        stat1Title: data.stat1Title || "",
        stat2Title: data.stat2Title || "",
        stat3Title: data.stat3Title || "",
      })
    }
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
        aboutPageKeyTermsTitle: keyTermsTitle,
        aboutPageSectorsTitle: sectorsTitle,
        aboutPageSectors: sectors,
        teamTitle,
        teamPhotos: teamPhotos,
        // Statistics subtitles (shared with homepage)
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
      }
      localStorage.setItem("i18n-translations", JSON.stringify(updatedI18n))

      updateHomepageData({
        aboutImage: aboutImageUrl,
        stat1Title: statTitles.stat1Title,
        stat2Title: statTitles.stat2Title,
        stat3Title: statTitles.stat3Title,
      })

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
      {/* Team editor */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">Team</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-gray-900 font-medium">Заголовок Team ({currentLang.toUpperCase()})</Label>
            <Input
              value={teamTitle[currentLang] || ""}
              onChange={(e) => setTeamTitle({ ...teamTitle, [currentLang]: e.target.value })}
              placeholder={currentLang === "en" ? "Meet the team" : currentLang === "ru" ? "Команда" : "Команда"}
              className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(teamNames).map((slug) => (
              <div key={slug} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div>
                  <Label className="text-gray-900 font-medium">Имя ({currentLang.toUpperCase()})</Label>
                  <Input
                    value={(teamNames as any)[slug]?.[currentLang] || ""}
                    onChange={(e) => {
                      ;(teamNames as any)[slug] = {
                        ...(teamNames as any)[slug],
                        [currentLang]: e.target.value,
                      }
                      // force rerender by touching local state (title)
                      setTeamTitle({ ...teamTitle })
                    }}
                    placeholder={currentLang === "en" ? "Full name" : currentLang === "ru" ? "Имя и фамилия" : "Аты-жөні"}
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 font-medium">Должность ({currentLang.toUpperCase()})</Label>
                  <Input
                    value={(teamI18n as any)[slug]?.role?.[currentLang] || ""}
                    onChange={(e) => {
                      ;(teamI18n as any)[slug] = {
                        ...(teamI18n as any)[slug],
                        role: { ...((teamI18n as any)[slug]?.role || {}), [currentLang]: e.target.value },
                      }
                      setTeamTitle({ ...teamTitle })
                    }}
                    placeholder={currentLang === "en" ? "Role" : currentLang === "ru" ? "Должность" : "Лауазым"}
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 font-medium">Фото (URL)</Label>
                  <Input
                    value={teamPhotos[slug] || ""}
                    onChange={(e) => setTeamPhotos({ ...teamPhotos, [slug]: e.target.value })}
                    placeholder="/placeholder.svg"
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 font-medium">Био — абзац 1 ({currentLang.toUpperCase()})</Label>
                  <Textarea
                    value={(teamI18n as any)[slug]?.bioLeft?.[currentLang] || ""}
                    onChange={(e) => {
                      ;(teamI18n as any)[slug] = {
                        ...(teamI18n as any)[slug],
                        bioLeft: { ...((teamI18n as any)[slug]?.bioLeft || {}), [currentLang]: e.target.value },
                      }
                      setTeamTitle({ ...teamTitle })
                    }}
                    rows={4}
                    placeholder={currentLang === "en" ? "First paragraph" : currentLang === "ru" ? "Первый абзац" : "Бірінші абзац"}
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 font-medium">Био — абзац 2 ({currentLang.toUpperCase()})</Label>
                  <Textarea
                    value={(teamI18n as any)[slug]?.bioRight?.[currentLang] || ""}
                    onChange={(e) => {
                      ;(teamI18n as any)[slug] = {
                        ...(teamI18n as any)[slug],
                        bioRight: { ...((teamI18n as any)[slug]?.bioRight || {}), [currentLang]: e.target.value },
                      }
                      setTeamTitle({ ...teamTitle })
                    }}
                    rows={4}
                    placeholder={currentLang === "en" ? "Second paragraph" : currentLang === "ru" ? "Второй абзац" : "Екінші абзац"}
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Key terms editor */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">Key terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-900 font-medium">Заголовок Key terms ({currentLang.toUpperCase()})</Label>
            <Input
              value={keyTermsTitle[currentLang] || ""}
              onChange={(e) => setKeyTermsTitle({ ...keyTermsTitle, [currentLang]: e.target.value })}
              placeholder={currentLang === "en" ? "Key terms" : currentLang === "ru" ? "Ключевые условия" : "Негізгі шарттар"}
              className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {keyTermsRows.map((row, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="text-gray-900 font-medium">Label ({currentLang.toUpperCase()})</Label>
                  <Input
                    value={(row.label && row.label[currentLang]) || ""}
                    onChange={(e) => {
                      const next = [...keyTermsRows]
                      next[idx] = {
                        ...next[idx],
                        label: { ...(next[idx]?.label || {}), [currentLang]: e.target.value },
                      }
                      setKeyTermsRows(next)
                    }}
                    placeholder={currentLang === "en" ? "Size" : currentLang === "ru" ? "Размер" : "Өлшемі"}
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 font-medium">Value ({currentLang.toUpperCase()})</Label>
                  <Input
                    value={(row.value && row.value[currentLang]) || ""}
                    onChange={(e) => {
                      const next = [...keyTermsRows]
                      next[idx] = {
                        ...next[idx],
                        value: { ...(next[idx]?.value || {}), [currentLang]: e.target.value },
                      }
                      setKeyTermsRows(next)
                    }}
                    placeholder={currentLang === "en" ? "USD200m" : "USD200 млн"}
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
      {/* Statistics Section Editor (same as homepage) */}
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
                  placeholder="35+"
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
                  placeholder="10+"
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
      {/* Sectors editor */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">Sectors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-900 font-medium">Заголовок Sectors ({currentLang.toUpperCase()})</Label>
            <Input
              value={sectorsTitle[currentLang] || ""}
              onChange={(e) => setSectorsTitle({ ...sectorsTitle, [currentLang]: e.target.value })}
              placeholder={currentLang === "en" ? "Sectors" : currentLang === "ru" ? "Сектора" : "Салалар"}
              className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {sectors.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="text-gray-900 font-medium">Title ({currentLang.toUpperCase()})</Label>
                  <Input
                    value={(item.title && item.title[currentLang]) || ""}
                    onChange={(e) => {
                      const next = [...sectors]
                      next[idx] = { ...next[idx], title: { ...(next[idx]?.title || {}), [currentLang]: e.target.value } }
                      setSectors(next)
                    }}
                    placeholder={currentLang === "en" ? "Oil & Gas" : currentLang === "ru" ? "Нефть и газ" : "Мұнай‑газ"}
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 font-medium">Description ({currentLang.toUpperCase()})</Label>
                  <Textarea
                    value={(item.desc && item.desc[currentLang]) || ""}
                    onChange={(e) => {
                      const next = [...sectors]
                      next[idx] = { ...next[idx], desc: { ...(next[idx]?.desc || {}), [currentLang]: e.target.value } }
                      setSectors(next)
                    }}
                    rows={3}
                    placeholder={currentLang === "en" ? "Production, Food processing, Logistics" : currentLang === "ru" ? "Производство, переработка продуктов питания, логистика" : "Өндіріс, азық‑түлік өңдеу, логистика"}
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => setSectors(sectors.filter((_, i) => i !== idx))}
                >
                  Удалить
                </Button>
              </div>
            </div>
          ))}
          <div>
            <Button
              variant="outline"
              onClick={() => setSectors([...sectors, { title: { en: "", ru: "", kz: "" }, desc: { en: "", ru: "", kz: "" } }])}
              className="border-gray-300"
            >
              Добавить сектор
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


