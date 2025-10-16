"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit3, Trash2, FileText } from "lucide-react"
import { AdminStorage, type NewsArticle } from "@/lib/admin-storage"
import { readLang } from "@/lib/i18n"
import { NewsEditForm } from "./news-edit-form-updated"

interface NewsManagementProps {
  currentUser: any
  formatDate: (dateString: string) => string
}

export function NewsManagement({ currentUser, formatDate }: NewsManagementProps) {
  const router = useRouter()
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [lang, setLang] = useState(readLang())
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

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

  // Загрузка проектов
  useEffect(() => {
    loadArticles()
  }, [])

  useEffect(() => {
    const handler = (e: any) => setLang(e.detail?.lang || readLang())
    window.addEventListener("language-changed", handler)
    return () => window.removeEventListener("language-changed", handler)
  }, [])

  const loadArticles = () => {
    const articlesData = AdminStorage.getNewsArticles()
    setArticles(articlesData)
  }

  // Seed 6 default projects if none exist
  useEffect(() => {
    const existing = AdminStorage.getNewsArticles()
    if (existing.length === 0) {
      const now = new Date().toISOString()
      const seed = [
        {
          id: "proj-1",
          title: "Alsad Kazakhstan",
          description: "Premium food production company",
          content: "Alsad Kazakhstan is a leading food production company...",
          image: "/images/portfolio/alsad.jpg",
          contentImage: "/images/portfolio/alsad-hero.jpg",
          badges: [
            { label: "Agriculture", color: "#065f46" },
            { label: "Growth", color: "#1e40af" },
          ],
          investmentYear: 2017,
          contentSections: [{ title: "Overview", text: "Company overview and impact..." }],
          published: true,
          show_on_homepage: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: "proj-2",
          title: "Karaganda Energocenter",
          description: "Regional energy provider",
          content: "Karaganda Energocenter operates major energy assets...",
          image: "/images/portfolio/karaganda.jpg",
          contentImage: "/images/portfolio/karaganda-hero.jpg",
          badges: [
            { label: "Energy", color: "#b45309" },
            { label: "Infrastructure", color: "#6b21a8" },
          ],
          investmentYear: 2012,
          contentSections: [{ title: "Modernization", text: "Upgrades and efficiencies..." }],
          published: true,
          show_on_homepage: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: "proj-3",
          title: "Ulmus Besshoky",
          description: "Agricultural enterprise",
          content: "Ulmus Besshoky develops sustainable agriculture...",
          image: "/images/portfolio/ulmus.jpg",
          contentImage: "/images/portfolio/ulmus-hero.jpg",
          badges: [
            { label: "Agriculture", color: "#047857" },
            { label: "Operations", color: "#7c3aed" },
          ],
          investmentYear: 2015,
          contentSections: [{ title: "Production", text: "Yield growth and quality..." }],
          published: true,
          show_on_homepage: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: "proj-4",
          title: "Ai Karaaul",
          description: "Industrial venture",
          content: "Ai Karaaul focuses on industrial innovation...",
          image: "/images/portfolio/aikaraaul.jpg",
          contentImage: "/images/portfolio/aikaraaul-hero.jpg",
          badges: [
            { label: "Industry", color: "#1f2937" },
            { label: "Scale-up", color: "#1d4ed8" },
          ],
          investmentYear: 2018,
          contentSections: [{ title: "Expansion", text: "Capacity and logistics..." }],
          published: true,
          show_on_homepage: false,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: "proj-5",
          title: "Karaganda Kus",
          description: "Poultry production",
          content: "Karaganda Kus is a poultry producer...",
          image: "/images/portfolio/kus.jpg",
          contentImage: "/images/portfolio/kus-hero.jpg",
          badges: [
            { label: "Food", color: "#16a34a" },
            { label: "Operations", color: "#6d28d9" },
          ],
          investmentYear: 2019,
          contentSections: [{ title: "Operations", text: "Improved efficiency..." }],
          published: true,
          show_on_homepage: false,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: "proj-6",
          title: "Elefund VC Portfolio",
          description: "Technology investments",
          content: "Investments in Robinhood, Soul of Nomad, and others...",
          image: "/images/portfolio/elefund.jpg",
          contentImage: "/images/portfolio/elefund-hero.jpg",
          badges: [
            { label: "Technology", color: "#0ea5e9" },
            { label: "Venture", color: "#d97706" },
          ],
          investmentYear: 2020,
          contentSections: [{ title: "Investments", text: "Key highlights and outcomes..." }],
          published: true,
          show_on_homepage: true,
          createdAt: now,
          updatedAt: now,
        },
      ] as any
      AdminStorage.setNewsArticles(seed as any)
      setArticles(seed as any)
    }
  }, [])

  const handleAddArticle = () => {
    const newArticle: NewsArticle = {
      id: Date.now().toString(),
      title: "",
      description: "",
      content: "",
      image: "",
      published: false,
      show_on_homepage: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Добавляем дополнительные поля для совместимости с формой
      badges: [],
      investmentYear: new Date().getFullYear(),
      contentImage: "",
      images: [],
      contentSections: [{ title: "", text: "" }],
    } as any

    setEditingArticle(newArticle)
    setShowAddForm(true)
  }

  const handleEditArticle = (article: NewsArticle) => {
    // Дополняем статью полями для совместимости с формой
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
  }

  const handleSaveArticle = (articleData: any) => {
    console.log("[v0] Saving article:", articleData)

    try {
      if (showAddForm) {
        // Создание новой статьи
        const newArticle: NewsArticle = {
          id: articleData.id,
          title: articleData.title,
          description: articleData.description,
          content: articleData.content,
          image: articleData.image,
          badges: articleData.badges || [],
          investmentYear: Number(articleData.investmentYear) || new Date().getFullYear(),
          contentImage: articleData.contentImage,
          contentSections: articleData.contentSections,
          published: articleData.published,
          show_on_homepage: articleData.show_on_homepage,
          createdAt: articleData.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        AdminStorage.addNewsArticle(newArticle)
        console.log("[v0] Article added successfully")
      } else {
        // Обновление существующей статьи
        const updates: Partial<NewsArticle> = {
          title: articleData.title,
          description: articleData.description,
          content: articleData.content,
          image: articleData.image,
          badges: articleData.badges || [],
          investmentYear: Number(articleData.investmentYear) || new Date().getFullYear(),
          contentImage: articleData.contentImage,
          contentSections: articleData.contentSections,
          published: articleData.published,
          show_on_homepage: articleData.show_on_homepage,
          createdAt: articleData.createdAt,
        }

        AdminStorage.updateNewsArticle(articleData.id, updates)
        console.log("[v0] Article updated successfully")
      }

      loadArticles()
      setEditingArticle(null)
      setShowAddForm(false)
    } catch (error) {
      console.error("[v0] Error saving article:", error)
      alert("Ошибка при сохранении статьи")
    }
  }

  const handleDeleteArticle = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту новость?")) {
      AdminStorage.deleteNewsArticle(id)
      loadArticles()
    }
  }

  const handleCancel = () => {
    setEditingArticle(null)
    setShowAddForm(false)
  }

  // Если показываем форму редактирования
  if (editingArticle) {
    return <NewsEditForm article={editingArticle} onSave={handleSaveArticle} onCancel={handleCancel} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Управление проектами</h1>
          <p className="text-muted-foreground">Создавайте и редактируйте проекты портфолио</p>
        </div>
        <Button onClick={handleAddArticle} style={{ backgroundColor: "#16a34a" }} className="hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Добавить проект
        </Button>
      </div>

      {/* Список проектов */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Проекты</CardTitle>
        </CardHeader>
        <CardContent>
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
                        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant={article.published ? "default" : "secondary"}>
                            {article.published ? "Опубликовано" : "Черновик"}
                          </Badge>
                          {article.show_on_homepage && (
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                              На главной
                            </Badge>
                          )}
                          {(article as any).badges?.map((b: any, i: number) => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded-full border" style={{ backgroundColor: `${b.color}20`, color: b.color, borderColor: `${b.color}40` }}>
                              {(window as any)?.i18n_translations?.projectBadgesI18n?.[article.id]?.[i]?.[lang] || b.label}
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
