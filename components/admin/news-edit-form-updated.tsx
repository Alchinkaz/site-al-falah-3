"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import type { NewsArticle } from "@/lib/admin-storage"

interface NewsEditFormProps {
  article: NewsArticle
  onSave: (article: NewsArticle) => void
  onCancel: () => void
}

export function NewsEditForm({ article, onSave, onCancel }: NewsEditFormProps) {
  const router = useRouter()
  const [activeLang, setActiveLang] = useState<"en" | "ru" | "kz">(() => {
    try {
      const v = localStorage.getItem("lang") as any
      return v === "ru" || v === "kz" ? v : "en"
    } catch {
      return "en"
    }
  })
  const [localData, setLocalData] = useState(() => {
    console.log("=== NewsEditForm: Initial article data ===")
    console.log("Article:", article)

    const initialData = {
      ...article,
      contentSections: article.contentSections || [{ title: "", text: "" }],
      // Убеждаемся, что все обязательные поля заполнены
      title: article.title || "",
      description: article.description || "",
      content: article.content || "",
      image: article.image || "",
      contentImage: article.contentImage || "",
      images: article.images || [],
      badges: (article as any).badges || [],
      investmentYear: (article as any).investmentYear || new Date().getFullYear(),
      published: article.published || false,
      show_on_homepage: article.show_on_homepage || false,
    }

    console.log("Initial localData:", initialData)
    return initialData
  })

  // i18n states for title, badges labels, and content sections
  const [titleI18n, setTitleI18n] = useState<{ en: string; ru: string; kz: string }>(() => {
    try {
      const stored = localStorage.getItem("i18n-translations")
      const parsed = stored ? JSON.parse(stored) : null
      const existing = parsed?.projectTexts?.[article.id]?.title
      return existing || { en: article.title || "", ru: article.title || "", kz: article.title || "" }
    } catch {
      return { en: article.title || "", ru: article.title || "", kz: article.title || "" }
    }
  })

  const [badgesI18n, setBadgesI18n] = useState<Array<{ en: string; ru: string; kz: string }>>(() => {
    try {
      const stored = localStorage.getItem("i18n-translations")
      const parsed = stored ? JSON.parse(stored) : null
      const existing = parsed?.projectBadgesI18n?.[article.id]
      const baseLen = (article as any).badges?.length || 0
      const initial = Array.isArray(existing) ? existing.slice(0, baseLen) : []
      while (initial.length < baseLen) initial.push({ en: "", ru: "", kz: "" })
      return initial
    } catch {
      return []
    }
  })

  const [sectionsI18n, setSectionsI18n] = useState<{ en: Array<{ title: string; text: string }>; ru: Array<{ title: string; text: string }>; kz: Array<{ title: string; text: string }> }>(() => {
    try {
      const stored = localStorage.getItem("i18n-translations")
      const parsed = stored ? JSON.parse(stored) : null
      const existing = parsed?.projectSections?.[article.id]
      const base = (article.contentSections || []) as Array<{ title: string; text: string }>
      const make = (lang: "en" | "ru" | "kz") => {
        const arr: Array<{ title: string; text: string }> = existing?.[lang] || []
        const out = arr.slice(0, base.length)
        while (out.length < base.length) out.push({ title: "", text: "" })
        return out
      }
      return { en: make("en"), ru: make("ru"), kz: make("kz") }
    } catch {
      const base = (article.contentSections || []) as Array<{ title: string; text: string }>
      const empty = base.map(() => ({ title: "", text: "" }))
      return { en: empty, ru: empty, kz: empty }
    }
  })

  // Проверка авторизации
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("admin_token")
        const userData = localStorage.getItem("current_user")

        if (!token || token !== "authenticated" || !userData) {
          router.push("/admin/login")
          return
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        router.push("/admin/login")
        return
      }
    }

    checkAuth()
  }, [router])

  const updateLocalData = (field: string, value: any) => {
    console.log(`=== NewsEditForm: Updating field ${field} ===`)
    console.log("Old value:", localData[field])
    console.log("New value:", value)

    setLocalData((prev) => {
      const newData = { ...prev, [field]: value }
      console.log("Updated localData:", newData)
      return newData
    })
  }

  const validateData = () => {
    console.log("=== NewsEditForm: Validating data ===")
    console.log("Current localData:", localData)

    const errors = []

    if (!localData.title?.trim()) {
      errors.push("Заголовок обязателен")
    }

    // Description optional for projects editor

    // Проверяем, что хотя бы одна секция контента заполнена
    const hasValidContent = localData.contentSections.some((section) => section.title?.trim() || section.text?.trim())

    if (!hasValidContent) {
      errors.push("Необходимо заполнить хотя бы одну секцию контента")
    }

    console.log("Validation errors:", errors)
    return errors
  }

  const handleSave = () => {
    console.log("=== NewsEditForm: Saving article ===")
    console.log("Article data to save:", localData)

    // Валидация данных
    const errors = validateData()
    if (errors.length > 0) {
      alert("Ошибки валидации:\n" + errors.join("\n"))
      return
    }

    // Очищаем пустые секции контента
    const cleanedData = {
      ...localData,
      contentSections: localData.contentSections.filter((section) => section.title?.trim() || section.text?.trim()),
      // Убеждаемся, что content заполнен на основе contentSections
      content:
        localData.contentSections
          .filter((section) => section.title?.trim() || section.text?.trim())
          .map((section) => `${section.title}\n\n${section.text}`)
          .join("\n\n---\n\n") ||
        localData.content ||
        "",
    }

    console.log("Cleaned data for save:", cleanedData)
    // Persist i18n translations for this project
    try {
      const stored = localStorage.getItem("i18n-translations")
      const parsed = stored ? JSON.parse(stored) : {}
      const next = { ...parsed }
      next.projectTexts = next.projectTexts || {}
      next.projectTexts[cleanedData.id] = {
        ...(next.projectTexts[cleanedData.id] || {}),
        title: titleI18n,
      }
      next.projectSections = next.projectSections || {}
      next.projectSections[cleanedData.id] = sectionsI18n
      next.projectBadgesI18n = next.projectBadgesI18n || {}
      next.projectBadgesI18n[cleanedData.id] = badgesI18n
      localStorage.setItem("i18n-translations", JSON.stringify(next))
      ;(window as any).i18n_translations = next
      window.dispatchEvent(new CustomEvent("i18n-updated", { detail: next }))
    } catch (e) {
      console.error("Failed to persist project i18n", e)
    }

    onSave(cleanedData)
  }

  const addContentSection = () => {
    const newSections = [...localData.contentSections, { title: "", text: "" }]
    updateLocalData("contentSections", newSections)
  }

  const removeContentSection = (index: number) => {
    if (localData.contentSections.length > 1) {
      const newSections = localData.contentSections.filter((_, i) => i !== index)
      updateLocalData("contentSections", newSections)
    }
  }

  const updateContentSection = (index: number, field: "title" | "text", value: string) => {
    setSectionsI18n((prev) => {
      const langArr = [...prev[activeLang]]
      langArr[index] = { ...langArr[index], [field]: value }
      return { ...prev, [activeLang]: langArr }
    })
  }

  useEffect(() => {
    console.log("=== NewsEditForm: LocalData changed ===")
    console.log("Current localData:", localData)
  }, [localData])

  return (
    <div className="space-y-6">
      {/* Header + language switch */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {article.id ? "Редактировать проект" : "Добавить проект"}
          </h1>
          <p className="text-muted-foreground">
            {article.id ? "Изменить информацию о проекте" : "Создать новый проект"}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 mr-2">
            {(["en", "ru", "kz"] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => setActiveLang(lng)}
                className={`px-2 py-1 rounded border ${activeLang === lng ? "bg-slate-900 text-white" : "bg-white"}`}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
          <Button onClick={onCancel} variant="outline">
            Отмена
          </Button>
          <Button onClick={handleSave} style={{ backgroundColor: "#16a34a" }} className="hover:opacity-90">
            {article.id ? "Сохранить изменения" : "Создать проект"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Изображения проекта</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Image (для карточки) */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Основное изображение (для карточки)</Label>
                <div className="space-y-3">
                  <div className="aspect-video bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                    {localData.image ? (
                      <img
                        src={localData.image || "/placeholder.svg"}
                        alt="Основное изображение"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                          target.nextElementSibling?.classList.remove("hidden")
                        }}
                      />
                    ) : null}
                    <div className="text-center text-slate-500 hidden">
                      <FileText className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Предварительный просмотр</p>
                    </div>
                  </div>
                  <Input
                    value={localData.image || ""}
                    onChange={(e) => updateLocalData("image", e.target.value)}
                    placeholder="Ссылка на основное изображение для карточки"
                  />
                  <p className="text-xs text-muted-foreground">Это изображение отображается в списке проектов</p>
                </div>
              </div>

              {/* Content Image */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Изображение контента</Label>
                <div className="space-y-3">
                  <div className="aspect-video bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                    {localData.contentImage ? (
                      <img
                        src={localData.contentImage || "/placeholder.svg"}
                        alt="Изображение контента"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                          target.nextElementSibling?.classList.remove("hidden")
                        }}
                      />
                    ) : null}
                    <div className="text-center text-slate-500 hidden">
                      <FileText className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Предварительный просмотр</p>
                    </div>
                  </div>
                  <Input
                    value={localData.contentImage || ""}
                    onChange={(e) => updateLocalData("contentImage", e.target.value)}
                    placeholder="Ссылка на изображение контента"
                  />
                  <p className="text-xs text-muted-foreground">Большое изображение в начале статьи</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Article Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Основная информация */}
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Заголовок проекта ({activeLang.toUpperCase()}) *</Label>
                <Input
                  id="title"
                  value={titleI18n[activeLang] || ""}
                  onChange={(e) => setTitleI18n((prev) => ({ ...prev, [activeLang]: e.target.value }))}
                  placeholder="Введите заголовок проекта"
                />
              </div>

              <div>
                <Label>Год</Label>
                <Input
                  type="number"
                  value={localData.investmentYear || new Date().getFullYear()}
                  onChange={(e) => updateLocalData("investmentYear", Number(e.target.value))}
                  placeholder="2017"
                />
              </div>

              {/* Badges manager */}
              <div className="space-y-3">
                <Label>Бейджи проекта</Label>
                <div className="space-y-3">
                  {(localData.badges || []).map((badge: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="color"
                        value={badge.color || "#1e1a61"}
                        onChange={(e) => {
                          const next = [...(localData.badges || [])]
                          next[index] = { ...next[index], color: e.target.value }
                          updateLocalData("badges", next)
                        }}
                        className="h-10 w-12 rounded-md border"
                        aria-label="Цвет бейджа"
                      />
                      <Input
                        value={badgesI18n[index]?.[activeLang] || ""}
                        onChange={(e) => {
                          setBadgesI18n((prev) => {
                            const next = [...prev]
                            next[index] = next[index] || { en: "", ru: "", kz: "" }
                            next[index] = { ...next[index], [activeLang]: e.target.value }
                            return next
                          })
                        }}
                        placeholder={`Название бейджа (${activeLang.toUpperCase()})`}
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          const next = (localData.badges || []).filter((_: any, i: number) => i !== index)
                          updateLocalData("badges", next)
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateLocalData("badges", [...(localData.badges || []), { color: "#1e1a61" }])
                      setBadgesI18n((prev) => [...prev, { en: "", ru: "", kz: "" }])
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Добавить бейдж
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Содержание */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
              <CardTitle>Содержание проекта *</CardTitle>
                <Button onClick={addContentSection} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить секцию
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {localData.contentSections.map((section, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium">Секция {index + 1}</h4>
                      {localData.contentSections.length > 1 && (
                        <Button
                          onClick={() => removeContentSection(index)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>Заголовок ({activeLang.toUpperCase()})</Label>
                        <Input
                          value={sectionsI18n[activeLang]?.[index]?.title || ""}
                          onChange={(e) => updateContentSection(index, "title", e.target.value)}
                          placeholder="Заголовок секции"
                        />
                      </div>
                      <div>
                        <Label>Текстовое описание ({activeLang.toUpperCase()})</Label>
                        <Textarea
                          value={sectionsI18n[activeLang]?.[index]?.text || ""}
                          onChange={(e) => updateContentSection(index, "text", e.target.value)}
                          placeholder="Текст секции"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Настройки публикации */}
          <Card>
            <CardHeader>
              <CardTitle>Настройки публикации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Опубликовать проект</Label>
                  <Switch
                    id="published"
                    checked={localData.published || false}
                    onCheckedChange={(checked) => updateLocalData("published", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show_on_homepage">Показать на главной</Label>
                  <Switch
                    id="show_on_homepage"
                    checked={localData.show_on_homepage || false}
                    onCheckedChange={(checked) => updateLocalData("show_on_homepage", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
