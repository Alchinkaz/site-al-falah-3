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

// Local type (project/news editor)
export type NewsArticle = {
	id: string
	title: string
	description?: string
	content?: string
	image?: string
	contentImage?: string
	images?: string[]
	badges?: Array<{ label: string; color: string }>
	investmentYear?: number
	contentSections?: Array<{ title: string; text: string }>
	published: boolean
	show_on_homepage?: boolean
	createdAt: string
	updatedAt?: string
}

interface NewsEditFormProps {
  article: NewsArticle
  onSave: (article: NewsArticle) => void
  onCancel: () => void
	hideHeader?: boolean
}

export function NewsEditForm({ article, onSave, onCancel, hideHeader }: NewsEditFormProps) {
  const router = useRouter()
	const [activeLang, setActiveLang] = useState<"en" | "ru" | "kz">("en")
  const [localData, setLocalData] = useState(() => {
    console.log("=== NewsEditForm: Initial article data ===")
    console.log("Article:", article)

    const initialData = {
      ...article,
      contentSections: article.contentSections || [{ title: "", text: "" }],
			// Ensure required fields
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
	const [titleI18n, setTitleI18n] = useState<{ en: string; ru: string; kz: string }>({
		en: article.title || "",
		ru: article.title || "",
		kz: article.title || "",
	})

	const [badgesI18n, setBadgesI18n] = useState<Array<{ en: string; ru: string; kz: string }>>([])

	const [sectionsI18n, setSectionsI18n] = useState<{
		en: Array<{ title: string; text: string }>
		ru: Array<{ title: string; text: string }>
		kz: Array<{ title: string; text: string }>
	}>(() => {
		const base = (article.contentSections || []) as Array<{ title: string; text: string }>
		const filled = base.map((s) => ({ title: s.title || "", text: s.text || "" }))
		return { en: filled, ru: filled, kz: filled }
	})

	// Auth is handled by /admin layout via server routes

  const updateLocalData = (field: string, value: any) => {
    console.log(`=== NewsEditForm: Updating field ${field} ===`)
		console.log("Old value:", (localData as any)[field])
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

		const errors: string[] = []

    if (!localData.title?.trim()) {
      errors.push("Заголовок обязателен")
    }

		// Проверяем, что хотя бы одна секция контента заполнена (по переводам)
		const candidates = [
			...(sectionsI18n.en || []),
			...(sectionsI18n.ru || []),
			...(sectionsI18n.kz || []),
		]
		const hasValidContent = candidates.some((section) => section?.title?.trim() || section?.text?.trim())

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

		// Построим базовый массив секций из переводов, чтобы карта секций сохранялась и рендерилась
		const baseSections = (() => {
			const en = sectionsI18n.en || []
			const ru = sectionsI18n.ru || []
			const kz = sectionsI18n.kz || []
			const len = Math.max(en.length, ru.length, kz.length)
			const out: Array<{ title: string; text: string }> = []
			for (let i = 0; i < len; i++) {
				const t = en[i]?.title || ru[i]?.title || kz[i]?.title || ""
				const x = en[i]?.text || ru[i]?.text || kz[i]?.text || ""
				out.push({ title: t, text: x })
			}
			return out
		})()

		const nonEmptySections = baseSections.filter((section) => section.title?.trim() || section.text?.trim())

		const normalizeUrl = (val: string) => {
			const v = (val || "").trim()
			if (!v) return ""
			if (/^https?:\/\//i.test(v)) return v
			if (/^data:image\//i.test(v)) return v
			return v.startsWith("/") ? v : `/${v}`
		}

    const cleanedData = {
      ...localData,
			image: normalizeUrl(localData.image as any) || undefined,
			contentImage: normalizeUrl(localData.contentImage as any) || undefined,
			contentSections: nonEmptySections,
      content:
				nonEmptySections
          .map((section) => `${section.title}\n\n${section.text}`)
          .join("\n\n---\n\n") ||
        localData.content ||
        "",
    }

    console.log("Cleaned data for save:", cleanedData)
		// Persist i18n translations for this project via server API (Supabase-only)
		fetch("/api/admin/translations", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				updates: {
					[`projectTexts.${cleanedData.id}.title`]: titleI18n,
					[`projectSections.${cleanedData.id}`]: sectionsI18n,
					[`projectBadgesI18n.${cleanedData.id}`]: badgesI18n,
				},
			}),
		}).catch(() => {})

    onSave(cleanedData)
  }

	// Allow parent header Save button to trigger project save as well
	useEffect(() => {
		const handler = () => handleSave()
		window.addEventListener("admin-save-project", handler as EventListener)
		return () => window.removeEventListener("admin-save-project", handler as EventListener)
	}, [localData, titleI18n, sectionsI18n, badgesI18n])

  const addContentSection = () => {
		const newSections = [...localData.contentSections!, { title: "", text: "" }]
    updateLocalData("contentSections", newSections)
		setSectionsI18n((prev) => ({
			en: [...(prev.en || []), { title: "", text: "" }],
			ru: [...(prev.ru || []), { title: "", text: "" }],
			kz: [...(prev.kz || []), { title: "", text: "" }],
		}))
  }

  const removeContentSection = (index: number) => {
		if ((localData.contentSections || []).length > 1) {
			const newSections = (localData.contentSections || []).filter((_, i) => i !== index)
      updateLocalData("contentSections", newSections)
			setSectionsI18n((prev) => ({
				en: (prev.en || []).filter((_, i) => i !== index),
				ru: (prev.ru || []).filter((_, i) => i !== index),
				kz: (prev.kz || []).filter((_, i) => i !== index),
			}))
    }
  }

  const updateContentSection = (index: number, field: "title" | "text", value: string) => {
		setSectionsI18n((prev) => {
			const langArr = [...prev[activeLang]]
			langArr[index] = { ...langArr[index], [field]: value }
			return { ...prev, [activeLang]: langArr }
		})
		// Sync base contentSections for preview alignment
		updateLocalData(
			"contentSections",
			(() => {
				const copy = [...(localData.contentSections || [])]
				while (copy.length <= index) copy.push({ title: "", text: "" })
				copy[index] = { ...copy[index], [field]: value }
				return copy
			})()
		)
  }

  useEffect(() => {
    console.log("=== NewsEditForm: LocalData changed ===")
    console.log("Current localData:", localData)
  }, [localData])

  return (
    <div className="space-y-6">
			{/* Header + language switch */}
			{hideHeader ? null : (
      <div className="flex items-center justify-between">
					<div />
					<div className="flex gap-2 items-center">
						<div className="flex gap-2 mr-2">
							<Button
								variant={activeLang === "en" ? "default" : "outline"}
								onClick={() => setActiveLang("en")}
								className={`${activeLang === "en" ? "bg-blue-600 text-white" : "border-gray-300 text-gray-700"}`}
							>
								English
							</Button>
							<Button
								variant={activeLang === "ru" ? "default" : "outline"}
								onClick={() => setActiveLang("ru")}
								className={`${activeLang === "ru" ? "bg-blue-600 text-white" : "border-gray-300 text-gray-700"}`}
							>
								Русский
							</Button>
							<Button
								variant={activeLang === "kz" ? "default" : "outline"}
								onClick={() => setActiveLang("kz")}
								className={`${activeLang === "kz" ? "bg-blue-600 text-white" : "border-gray-300 text-gray-700"}`}
							>
								Қазақша
							</Button>
        </div>
						<Button onClick={onCancel} variant="outline" className="border-gray-300 text-gray-700">
            Отмена
          </Button>
						<Button onClick={handleSave} style={{ backgroundColor: "#16a34a" }} className="hover:opacity-90">
							{article.id ? "Сохранить изменения" : "Создать проект"}
          </Button>
        </div>
      </div>
			)}

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
												src={(localData as any).image || "/placeholder.svg"}
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
										value={(localData as any).image || ""}
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
										{(localData as any).contentImage ? (
                      <img
												src={(localData as any).contentImage || "/placeholder.svg"}
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
										value={(localData as any).contentImage || ""}
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
								<Label>Год инвестирования</Label>
								<Input
									type="number"
									value={(localData as any).investmentYear || new Date().getFullYear()}
									onChange={(e) => updateLocalData("investmentYear", Number(e.target.value))}
									placeholder="2017"
                />
              </div>

              <div>
								<Label>Дата публикации</Label>
                <Input
									type="date"
									value={(((localData as any).createdAt ? new Date((localData as any).createdAt) : new Date()).toISOString()).slice(0, 10)}
									onChange={(e) => {
										const v = e.target.value
										const iso = v ? new Date(v + "T00:00:00.000Z").toISOString() : new Date().toISOString()
										updateLocalData("createdAt", iso)
									}}
                />
              </div>

							{/* Badges manager */}
							<div className="space-y-3">
								<Label>
									Бейджи проекта <span className="ml-2 text-xs text-muted-foreground">({activeLang.toUpperCase()})</span>
								</Label>
								<div className="space-y-3">
									{((localData as any).badges || []).map((badge: any, index: number) => (
										<div key={index} className="flex items-center gap-2">
											<input
												type="color"
												value={badge.color || "#1e1a61"}
												onChange={(e) => {
													const next = [...(((localData as any).badges) || [])]
													next[index] = { ...next[index], color: e.target.value }
													updateLocalData("badges", next)
												}}
												className="h-10 w-12 rounded-md border"
												aria-label="Цвет бейджа"
											/>
											<div className="flex-1 flex items-center gap-2">
												<span className="text-xs px-2 py-1 rounded border bg-gray-50 text-gray-600 border-gray-200">
													{activeLang.toUpperCase()}
												</span>
                <Input
														value={badgesI18n[index]?.[activeLang] || (((localData as any).badges?.[index]?.label) || "")}
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
              </div>
											<Button
												variant="outline"
												onClick={() => {
													const next = (((localData as any).badges) || []).filter((_: any, i: number) => i !== index)
													updateLocalData("badges", next)
													setBadgesI18n((prev) => prev.filter((_, i) => i !== index))
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
											updateLocalData("badges", [ ...((((localData as any).badges) || [])), { color: "#1e1a61" } ])
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
								{(localData.contentSections || []).map((section, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium">Секция {index + 1}</h4>
											{(localData.contentSections || []).length > 1 && (
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
										checked={(localData as any).published || false}
                    onCheckedChange={(checked) => updateLocalData("published", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show_on_homepage">Показать на главной</Label>
                  <Switch
                    id="show_on_homepage"
										checked={(localData as any).show_on_homepage || false}
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
