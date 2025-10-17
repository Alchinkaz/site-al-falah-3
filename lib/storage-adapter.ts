import { UserService, ProjectService, TranslationService, HomepageService, TeamService } from './supabase-services'
import { DataMigration } from './data-migration'

// Adapter to gradually migrate from localStorage to Supabase
export class StorageAdapter {
  private static useSupabase = false
  private static migrationChecked = false

  // Initialize and check if we should use Supabase
  static async initialize(): Promise<void> {
    if (this.migrationChecked) return

    try {
      // Check if Supabase is available and has data
      const projects = await ProjectService.getAllProjects()
      
      if (projects.length > 0) {
        // Supabase has data, use it
        this.useSupabase = true
        console.log('Using Supabase for data storage')
      } else {
        // Check if localStorage has data
        const hasLocalData = this.hasLocalStorageData()
        
        if (hasLocalData) {
          // Migrate from localStorage to Supabase
          console.log('Migrating data from localStorage to Supabase...')
          await DataMigration.migrateAllData()
          this.useSupabase = true
        } else {
          // No data anywhere, seed defaults in Supabase
          console.log('Seeding default data in Supabase...')
          await DataMigration.seedDefaultData()
          this.useSupabase = true
        }
      }
    } catch (error) {
      console.error('Failed to initialize Supabase, falling back to localStorage:', error)
      this.useSupabase = false
    }

    this.migrationChecked = true
  }

  private static hasLocalStorageData(): boolean {
    const keys = ['admin-users', 'news-articles', 'homepage-data', 'i18n-translations']
    return keys.some(key => localStorage.getItem(key) !== null)
  }

  // User methods
  static async authenticate(username: string, password: string) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await UserService.authenticate(username, password)
    } else {
      // Fallback to localStorage
      return this.authenticateLocal(username, password)
    }
  }

  static async getAllUsers() {
    await this.initialize()
    
    if (this.useSupabase) {
      // This would need to be implemented in UserService
      return []
    } else {
      // Fallback to localStorage
      return this.getAllUsersLocal()
    }
  }

  static async setUsers(users: any[]) {
    await this.initialize()
    
    if (this.useSupabase) {
      // This would need to be implemented in UserService
      return true
    } else {
      // Fallback to localStorage
      return this.setUsersLocal(users)
    }
  }

  static async getUserById(id: string) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await UserService.getUserById(id)
    } else {
      // Fallback to localStorage
      return this.getUserByIdLocal(id)
    }
  }

  static async setCurrentUser(user: any) {
    await this.initialize()
    
    if (this.useSupabase) {
      // Store in sessionStorage for now
      sessionStorage.setItem('current-user', JSON.stringify(user))
      return true
    } else {
      // Fallback to localStorage
      localStorage.setItem('current-user', JSON.stringify(user))
      return true
    }
  }

  static async getCurrentUser() {
    await this.initialize()
    
    if (this.useSupabase) {
      const userData = sessionStorage.getItem('current-user')
      return userData ? JSON.parse(userData) : null
    } else {
      // Fallback to localStorage
      const userData = localStorage.getItem('current-user')
      return userData ? JSON.parse(userData) : null
    }
  }

  static async logout() {
    await this.initialize()
    
    if (this.useSupabase) {
      sessionStorage.removeItem('current-user')
      return true
    } else {
      // Fallback to localStorage
      localStorage.removeItem('current-user')
      return true
    }
  }

  static async isAuthenticated() {
    await this.initialize()
    
    if (this.useSupabase) {
      const userData = sessionStorage.getItem('current-user')
      return !!userData
    } else {
      // Fallback to localStorage
      const userData = localStorage.getItem('current-user')
      return !!userData
    }
  }

  static async updateUser(id: string, updates: any) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await UserService.updateUser(id, updates)
    } else {
      // Fallback to localStorage
      return this.updateUserLocal(id, updates)
    }
  }

  // Project methods
  static async getAllProjects() {
    await this.initialize()
    
    if (this.useSupabase) {
      try {
        return await ProjectService.getAllProjects()
      } catch (error) {
        console.error('Error getting projects from Supabase, falling back to localStorage:', error)
        return this.getAllProjectsLocal()
      }
    } else {
      // Fallback to localStorage
      return this.getAllProjectsLocal()
    }
  }

  static async getProjectById(id: string) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await ProjectService.getProjectById(id)
    } else {
      // Fallback to localStorage
      return this.getProjectByIdLocal(id)
    }
  }

  static async getPublishedProjects() {
    await this.initialize()
    
    if (this.useSupabase) {
      return await ProjectService.getPublishedProjects()
    } else {
      // Fallback to localStorage
      return this.getPublishedProjectsLocal()
    }
  }

  static async getHomepageProjects() {
    await this.initialize()
    
    if (this.useSupabase) {
      return await ProjectService.getHomepageProjects()
    } else {
      // Fallback to localStorage
      return this.getHomepageProjectsLocal()
    }
  }

  static async createProject(project: any) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await ProjectService.createProject(project)
    } else {
      // Fallback to localStorage
      return this.createProjectLocal(project)
    }
  }

  static async updateProject(id: string, updates: any) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await ProjectService.updateProject(id, updates)
    } else {
      // Fallback to localStorage
      return this.updateProjectLocal(id, updates)
    }
  }

  static async deleteProject(id: string) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await ProjectService.deleteProject(id)
    } else {
      // Fallback to localStorage
      return this.deleteProjectLocal(id)
    }
  }

  // News/Project methods (for backward compatibility)
  static async addNewsArticle(article: any) {
    return await this.createProject(article)
  }

  static async updateNewsArticle(id: string, updates: any) {
    return await this.updateProject(id, updates)
  }

  static async deleteNewsArticle(id: string) {
    return await this.deleteProject(id)
  }

  static async getNewsArticles() {
    return await this.getAllProjects()
  }

  static async setNewsArticles(articles: any[]) {
    await this.initialize()
    
    if (this.useSupabase) {
      // This would need to be implemented in ProjectService
      return true
    } else {
      // Fallback to localStorage
      localStorage.setItem('news-articles', JSON.stringify(articles))
      return true
    }
  }

  // Translation methods
  static async getTranslations() {
    await this.initialize()
    
    if (this.useSupabase) {
      return await TranslationService.getTranslations()
    } else {
      // Fallback to localStorage
      return this.getTranslationsLocal()
    }
  }

  static async updateTranslation(key: string, language: 'en' | 'ru' | 'kz', value: any) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await TranslationService.updateTranslation(key, language, value)
    } else {
      // Fallback to localStorage
      return this.updateTranslationLocal(key, language, value)
    }
  }

  static async getProjectTranslations(projectId: string) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await TranslationService.getProjectTranslations(projectId)
    } else {
      // Fallback to localStorage
      return this.getProjectTranslationsLocal(projectId)
    }
  }

  static async updateProjectTranslation(projectId: string, type: 'title' | 'badges' | 'sections', language: 'en' | 'ru' | 'kz', value: any) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await TranslationService.updateProjectTranslation(projectId, type, language, value)
    } else {
      // Fallback to localStorage
      return this.updateProjectTranslationLocal(projectId, type, language, value)
    }
  }

  // Homepage methods
  static async getHomepageData() {
    await this.initialize()
    
    if (this.useSupabase) {
      return await HomepageService.getHomepageData()
    } else {
      // Fallback to localStorage
      return this.getHomepageDataLocal()
    }
  }

  static async updateHomepageData(updates: any) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await HomepageService.updateHomepageData(updates)
    } else {
      // Fallback to localStorage
      return this.updateHomepageDataLocal(updates)
    }
  }

  // Team methods
  static async getTeamMembers() {
    await this.initialize()
    
    if (this.useSupabase) {
      return await TeamService.getTeamMembers()
    } else {
      // Fallback to localStorage
      return this.getTeamMembersLocal()
    }
  }

  static async updateTeamMemberPhoto(slug: string, photo: string) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await TeamService.updateTeamMemberPhoto(slug, photo)
    } else {
      // Fallback to localStorage
      return this.updateTeamMemberPhotoLocal(slug, photo)
    }
  }

  static async getTeamTranslations(slug: string) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await TeamService.getTeamTranslations(slug)
    } else {
      // Fallback to localStorage
      return this.getTeamTranslationsLocal(slug)
    }
  }

  static async updateTeamTranslation(slug: string, type: 'name' | 'role' | 'bio_left' | 'bio_right', language: 'en' | 'ru' | 'kz', value: string) {
    await this.initialize()
    
    if (this.useSupabase) {
      return await TeamService.updateTeamTranslation(slug, type, language, value)
    } else {
      // Fallback to localStorage
      return this.updateTeamTranslationLocal(slug, type, language, value)
    }
  }

  // localStorage fallback methods
  private static getAllUsersLocal() {
    const usersData = localStorage.getItem('admin-users')
    return usersData ? JSON.parse(usersData) : []
  }

  private static setUsersLocal(users: any[]) {
    localStorage.setItem('admin-users', JSON.stringify(users))
    return true
  }

  private static authenticateLocal(username: string, password: string) {
    const usersData = localStorage.getItem('admin-users')
    if (!usersData) return null

    const users = JSON.parse(usersData)
    const user = users.find((u: any) => u.username === username && u.password_hash === password)
    return user || null
  }

  private static getUserByIdLocal(id: string) {
    const usersData = localStorage.getItem('admin-users')
    if (!usersData) return null

    const users = JSON.parse(usersData)
    return users.find((u: any) => u.id === id) || null
  }

  private static updateUserLocal(id: string, updates: any) {
    const usersData = localStorage.getItem('admin-users')
    if (!usersData) return null

    const users = JSON.parse(usersData)
    const index = users.findIndex((u: any) => u.id === id)
    if (index === -1) return null

    users[index] = { ...users[index], ...updates, updated_at: new Date().toISOString() }
    localStorage.setItem('admin-users', JSON.stringify(users))
    return users[index]
  }

  private static getAllProjectsLocal() {
    const projectsData = localStorage.getItem('news-articles')
    return projectsData ? JSON.parse(projectsData) : []
  }

  private static getProjectByIdLocal(id: string) {
    const projects = this.getAllProjectsLocal()
    return projects.find((p: any) => p.id === id) || null
  }

  private static getPublishedProjectsLocal() {
    const projects = this.getAllProjectsLocal()
    return projects.filter((p: any) => p.published)
  }

  private static getHomepageProjectsLocal() {
    const projects = this.getAllProjectsLocal()
    return projects.filter((p: any) => p.published && p.show_on_homepage)
  }

  private static createProjectLocal(project: any) {
    const projects = this.getAllProjectsLocal()
    const newProject = {
      ...project,
      id: project.id || `p${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    projects.push(newProject)
    localStorage.setItem('news-articles', JSON.stringify(projects))
    return newProject
  }

  private static updateProjectLocal(id: string, updates: any) {
    const projects = this.getAllProjectsLocal()
    const index = projects.findIndex((p: any) => p.id === id)
    if (index === -1) return null

    projects[index] = { ...projects[index], ...updates, updatedAt: new Date().toISOString() }
    localStorage.setItem('news-articles', JSON.stringify(projects))
    return projects[index]
  }

  private static deleteProjectLocal(id: string) {
    const projects = this.getAllProjectsLocal()
    const filtered = projects.filter((p: any) => p.id !== id)
    localStorage.setItem('news-articles', JSON.stringify(filtered))
    return true
  }

  private static getTranslationsLocal() {
    const translationsData = localStorage.getItem('i18n-translations')
    return translationsData ? JSON.parse(translationsData) : {}
  }

  private static updateTranslationLocal(key: string, language: 'en' | 'ru' | 'kz', value: any) {
    const translations = this.getTranslationsLocal()
    if (!translations[key]) translations[key] = {}
    translations[key][language] = value
    localStorage.setItem('i18n-translations', JSON.stringify(translations))
    return true
  }

  private static getProjectTranslationsLocal(projectId: string) {
    const translations = this.getTranslationsLocal()
    return {
      title: translations.projectTexts?.[projectId]?.title || {},
      badges: translations.projectBadgesI18n?.[projectId] || {},
      sections: translations.projectSections?.[projectId] || {}
    }
  }

  private static updateProjectTranslationLocal(projectId: string, type: 'title' | 'badges' | 'sections', language: 'en' | 'ru' | 'kz', value: any) {
    const translations = this.getTranslationsLocal()
    
    if (type === 'title') {
      if (!translations.projectTexts) translations.projectTexts = {}
      if (!translations.projectTexts[projectId]) translations.projectTexts[projectId] = {}
      translations.projectTexts[projectId][language] = value
    } else if (type === 'badges') {
      if (!translations.projectBadgesI18n) translations.projectBadgesI18n = {}
      if (!translations.projectBadgesI18n[projectId]) translations.projectBadgesI18n[projectId] = []
      translations.projectBadgesI18n[projectId][language] = value
    } else if (type === 'sections') {
      if (!translations.projectSections) translations.projectSections = {}
      if (!translations.projectSections[projectId]) translations.projectSections[projectId] = {}
      translations.projectSections[projectId][language] = value
    }

    localStorage.setItem('i18n-translations', JSON.stringify(translations))
    return true
  }

  private static getHomepageDataLocal() {
    const homepageData = localStorage.getItem('homepage-data')
    return homepageData ? JSON.parse(homepageData) : {}
  }

  private static updateHomepageDataLocal(updates: any) {
    const data = this.getHomepageDataLocal()
    const updatedData = { ...data, ...updates }
    localStorage.setItem('homepage-data', JSON.stringify(updatedData))
    return true
  }

  private static getTeamMembersLocal() {
    const translations = this.getTranslationsLocal()
    const photos = translations.teamPhotos || {}
    return Object.keys(photos).map(slug => ({ slug, photo: photos[slug] }))
  }

  private static updateTeamMemberPhotoLocal(slug: string, photo: string) {
    const translations = this.getTranslationsLocal()
    if (!translations.teamPhotos) translations.teamPhotos = {}
    translations.teamPhotos[slug] = photo
    localStorage.setItem('i18n-translations', JSON.stringify(translations))
    return true
  }

  private static getTeamTranslationsLocal(slug: string) {
    const translations = this.getTranslationsLocal()
    const teamTexts = translations.teamTexts?.[slug] || {}
    return {
      name: teamTexts.name || {},
      role: teamTexts.role || {},
      bio_left: teamTexts.bio_left || {},
      bio_right: teamTexts.bio_right || {}
    }
  }

  private static updateTeamTranslationLocal(slug: string, type: 'name' | 'role' | 'bio_left' | 'bio_right', language: 'en' | 'ru' | 'kz', value: string) {
    const translations = this.getTranslationsLocal()
    if (!translations.teamTexts) translations.teamTexts = {}
    if (!translations.teamTexts[slug]) translations.teamTexts[slug] = {}
    if (!translations.teamTexts[slug][type]) translations.teamTexts[slug][type] = {}
    translations.teamTexts[slug][type][language] = value
    localStorage.setItem('i18n-translations', JSON.stringify(translations))
    return true
  }
}
