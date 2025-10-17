"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit3, Trash2, FileText } from "lucide-react"
import { readLang, projectBadgesI18n, projectSections, projectTexts } from "@/lib/i18n"
import { NewsEditForm } from "./news-edit-form-updated"
import { ProjectService } from "@/lib/supabase-services"

interface NewsManagementProps {
  currentUser: any
  formatDate: (dateString: string) => string
}

type ProjectRow = any

type NewsArticle = {
  id: string
  title: string
  description?: string
  content?: string
  image?: string
  contentImage?: string
  badges?: Array<{ label: string; color: string }>
  investmentYear?: number
  contentSections?: { title?: string; text: string }[]
  published: boolean
  show_on_homepage?: boolean
  createdAt: string
  updatedAt?: string
}

export function NewsManagement({ currentUser, formatDate }: NewsManagementProps) {
  const router = useRouter()
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [lang, setLang] = useState(readLang())
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Загрузка проектов
  useEffect(() => {
    loadArticles()
  }, [])

  // Parent-driven cancel of edit mode and edit state reporting
  useEffect(() => {
    const cancelHandler = () => handleCancel()
    window.addEventListener("admin-cancel-edit", cancelHandler as EventListener)
    return () => window.removeEventListener("admin-cancel-edit", cancelHandler as EventListener)
  }, [])

  // Allow external button to trigger "Add project" from parent header
  useEffect(() => {
    const handler = () => handleAddArticle()
    window.addEventListener("admin-add-project", handler as EventListener)
    return () => window.removeEventListener("admin-add-project", handler as EventListener)
  }, [])

  useEffect(() => {
    const handler = (e: any) => setLang(e.detail?.lang || readLang())
    window.addEventListener("language-changed", handler)
    return () => window.removeEventListener("language-changed", handler)
  }, [])

  // React to admin header language toggles
  useEffect(() => {
    const handler = (e: any) => {
      const l = e?.detail?.lang
      if (l === "en" || l === "ru" || l === "kz") setLang(l)
    }
    window.addEventListener("admin-set-project-lang", handler as EventListener)
    return () => window.removeEventListener("admin-set-project-lang", handler as EventListener)
  }, [])

  const mapProject = (n: ProjectRow): NewsArticle => ({
    id: n.id,
    title: n.title,
    description: n.description || "",
    content: n.content || "",
    image: n.image || "",
    contentImage: n.content_image || n.image || "",
    badges: n.badges || [],
    investmentYear: n.investment_year || (n.created_at ? new Date(n.created_at).getFullYear() : undefined),
    contentSections: n.content_sections || (n.content ? [{ text: n.content }] : []),
    published: !!n.published,
    show_on_homepage: !!n.show_on_homepage,
    createdAt: n.created_at,
    updatedAt: n.updated_at,
  })

  const loadArticles = async () => {
    try {
      const list = await ProjectService.getAllProjects()
      setArticles((list || []).map(mapProject))
    } catch (e) {
      console.error('Failed to load projects:', e)
      setArticles([])
    }
  }

  const handleAddArticle = () => {
    const now = new Date().toISOString()
    const newArticle: NewsArticle = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      content: "",
      image: "",
      published: false,
      show_on_homepage: false,
      createdAt: now,
      updatedAt: now,
      badges: [],
      investmentYear: new Date().getFullYear(),
      contentImage: "",
      contentSections: [{ title: "", text: "" }],
    }
    setEditingArticle(newArticle)
    setShowAddForm(true)
    try {
      window.dispatchEvent(new CustomEvent("admin-editing-project", { detail: { editing: true } }))
    } catch {}
  }

  const handleEditArticle = (article: NewsArticle) => {
    const extendedArticle = {
      ...article,
      contentImage: (article as any).contentImage || "",
      images: (article as any).images || [],
      badges: (article as any).badges || [],
      investmentYear: (article as any).investmentYear || new Date().getFullYear(),
      contentSections: (article as any).contentSections || [{ title: "", text: article.content || article.description || "" }],
    }

    setEditingArticle(extendedArticle as any)
    setShowAddForm(false)
    try {
      window.dispatchEvent(new CustomEvent("admin-editing-project", { detail: { editing: true } }))
    } catch {}
  }

  const handleSaveArticle = async (articleData: any) => {
    try {
      if (showAddForm) {
        // Create
        const insertPayload: any = {
          id: articleData.id,
          title: articleData.title,
          description: articleData.description,
          content: articleData.content,
          image: articleData.image,
          content_image: articleData.contentImage,
          badges: articleData.badges || [],
          investment_year: Number(articleData.investmentYear) || new Date().getFullYear(),
          content_sections: articleData.contentSections,
          published: articleData.published,
          show_on_homepage: articleData.show_on_homepage,
          created_at: articleData.createdAt || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        await ProjectService.createProject(insertPayload)
      } else {
        // Update
        const updates: any = {
          title: articleData.title,
          description: articleData.description,
          content: articleData.content,
          image: articleData.image,
          content_image: articleData.contentImage,
          badges: articleData.badges || [],
          investment_year: Number(articleData.investmentYear) || new Date().getFullYear(),
          content_sections: articleData.contentSections,
          published: articleData.published,
          show_on_homepage: articleData.show_on_homepage,
          updated_at: new Date().toISOString(),
        }
        await ProjectService.updateProject(articleData.id, updates)
      }

      await loadArticles()
      setEditingArticle(null)
      setShowAddForm(false)
      try {
        window.dispatchEvent(new CustomEvent("admin-editing-project", { detail: { editing: false } }))
      } catch {}
    } catch (error) {
      console.error("Error saving article:", error)
      alert("Ошибка при сохранении статьи")
    }
  }

  const handleDeleteArticle = async (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту новость?")) {
      await ProjectService.deleteProject(id)
      await loadArticles()
    }
  }

  const handleCancel = () => {
    setEditingArticle(null)
    setShowAddForm(false)
    try {
      window.dispatchEvent(new CustomEvent("admin-editing-project", { detail: { editing: false } }))
    } catch {}
  }

  if (editingArticle) {
    return <NewsEditForm article={editingArticle as any} onSave={handleSaveArticle} onCancel={handleCancel} hideHeader />
  }

  return (
    <div className="space-y-6">
      {/* Header actions */}
      <div className="flex justify-end">
        <Button onClick={handleAddArticle} size="sm">
          <Plus className="h-4 w-4 mr-2" /> Добавить проект
        </Button>
      </div>

      {/* Список проектов */}
      <Card className="bg-card border-border">
        <CardContent className="pt-4">
          {articles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Проектов пока нет</p>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="border border-border rounded-lg p-4 bg-card">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      {article.image && (
                        <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                          <img
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = "none"
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{projectTexts[article.id]?.title[lang] || article.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {projectSections[article.id]?.[lang]?.[0]?.text || article.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium border ${
                              article.published
                                ? "bg-green-600 text-white border-green-600"
                                : "bg-gray-100 text-gray-700 border-gray-300"
                            }`}
                          >
                            {article.published ? "Опубликовано" : "Черновик"}
                          </span>
                          {article.show_on_homepage && (
                            <span className="text-xs px-2 py-1 rounded-full font-medium border bg-blue-50 text-blue-700 border-blue-200">
                              На главной
                            </span>
                          )}
                          {(article as any).badges?.map((b: any, i: number) => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded-full border" style={{ backgroundColor: `${b.color}20`, color: b.color, borderColor: `${b.color}40` }}>
                              {projectBadgesI18n[article.id]?.[i]?.[lang] || b.label}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Создано: {formatDate(article.createdAt)}
                          {article.updatedAt && article.updatedAt !== article.createdAt && (
                            <> • Обновлено: {formatDate(article.updatedAt)}</>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button onClick={() => handleEditArticle(article)} size="sm" variant="outline">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Редактировать
                      </Button>
                      <Button
                        onClick={() => handleDeleteArticle(article.id)}
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
