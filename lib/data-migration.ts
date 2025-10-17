import { supabase } from './supabase'
import { UserService, ProjectService, TranslationService, HomepageService, TeamService } from './supabase-services'

// Migration utility to transfer data from localStorage to Supabase
export class DataMigration {
  static async migrateAllData(): Promise<boolean> {
    try {
      console.log('Starting data migration...')
      
      // 1. Migrate users
      await this.migrateUsers()
      
      // 2. Migrate homepage data
      await this.migrateHomepageData()
      
      // 3. Migrate translations
      await this.migrateTranslations()
      
      // 4. Migrate projects
      await this.migrateProjects()
      
      // 5. Migrate team data
      await this.migrateTeamData()
      
      console.log('Data migration completed successfully!')
      return true
    } catch (error) {
      console.error('Migration failed:', error)
      return false
    }
  }

  private static async migrateUsers(): Promise<void> {
    const usersData = localStorage.getItem('admin-users')
    if (!usersData) return

    const users = JSON.parse(usersData)
    console.log('Migrating users...')

    for (const user of users) {
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          username: user.username,
          password_hash: user.password_hash,
          role: user.role || 'admin',
          created_at: user.createdAt || new Date().toISOString(),
          last_login: user.lastLogin || null,
          updated_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error migrating user:', user.username, error)
      }
    }
  }

  private static async migrateHomepageData(): Promise<void> {
    const homepageData = localStorage.getItem('homepage-data')
    if (!homepageData) return

    const data = JSON.parse(homepageData)
    console.log('Migrating homepage data...')

    // Migrate each key-value pair
    for (const [key, value] of Object.entries(data)) {
      const { error } = await supabase
        .from('homepage_config')
        .upsert({
          key,
          value,
          updated_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error migrating homepage data:', key, error)
      }
    }
  }

  private static async migrateTranslations(): Promise<void> {
    const translationsData = localStorage.getItem('i18n-translations')
    if (!translationsData) return

    const translations = JSON.parse(translationsData)
    console.log('Migrating translations...')

    // Migrate general translations
    for (const [key, langData] of Object.entries(translations)) {
      if (typeof langData === 'object' && langData !== null) {
        for (const [language, value] of Object.entries(langData as Record<string, any>)) {
          if (['en', 'ru', 'kz'].includes(language)) {
            const { error } = await supabase
              .from('translations')
              .upsert({
                key,
                language: language as 'en' | 'ru' | 'kz',
                value,
                updated_at: new Date().toISOString()
              })

            if (error) {
              console.error('Error migrating translation:', key, language, error)
            }
          }
        }
      }
    }
  }

  private static async migrateProjects(): Promise<void> {
    const projectsData = localStorage.getItem('news-articles')
    if (!projectsData) return

    const projects = JSON.parse(projectsData)
    console.log('Migrating projects...')

    for (const project of projects) {
      // Insert project
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .upsert({
          id: project.id,
          title: project.title,
          description: project.description || null,
          content: project.content || null,
          image: project.image || null,
          content_image: project.contentImage || null,
          images: project.images || [],
          badges: project.badges || [],
          investment_year: project.investmentYear || null,
          content_sections: project.contentSections || [],
          published: project.published || false,
          show_on_homepage: project.show_on_homepage || false,
          created_at: project.createdAt || new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (projectError) {
        console.error('Error migrating project:', project.id, projectError)
        continue
      }

      // Migrate project-specific translations
      await this.migrateProjectTranslations(project.id, translations)
    }
  }

  private static async migrateProjectTranslations(projectId: string, translations: any): Promise<void> {
    // Migrate project titles
    if (translations.projectTexts?.[projectId]?.title) {
      const titleData = translations.projectTexts[projectId].title
      for (const [language, value] of Object.entries(titleData)) {
        if (['en', 'ru', 'kz'].includes(language)) {
          await supabase
            .from('project_translations')
            .upsert({
              project_id: projectId,
              translation_type: 'title',
              language: language as 'en' | 'ru' | 'kz',
              value,
              updated_at: new Date().toISOString()
            })
        }
      }
    }

    // Migrate project badges
    if (translations.projectBadgesI18n?.[projectId]) {
      const badgesData = translations.projectBadgesI18n[projectId]
      for (const [language, badges] of Object.entries(badgesData)) {
        if (['en', 'ru', 'kz'].includes(language)) {
          await supabase
            .from('project_translations')
            .upsert({
              project_id: projectId,
              translation_type: 'badges',
              language: language as 'en' | 'ru' | 'kz',
              value: badges,
              updated_at: new Date().toISOString()
            })
        }
      }
    }

    // Migrate project sections
    if (translations.projectSections?.[projectId]) {
      const sectionsData = translations.projectSections[projectId]
      for (const [language, sections] of Object.entries(sectionsData)) {
        if (['en', 'ru', 'kz'].includes(language)) {
          await supabase
            .from('project_translations')
            .upsert({
              project_id: projectId,
              translation_type: 'sections',
              language: language as 'en' | 'ru' | 'kz',
              value: sections,
              updated_at: new Date().toISOString()
            })
        }
      }
    }
  }

  private static async migrateTeamData(): Promise<void> {
    const translationsData = localStorage.getItem('i18n-translations')
    if (!translationsData) return

    const translations = JSON.parse(translationsData)
    console.log('Migrating team data...')

    // Migrate team member photos
    if (translations.teamPhotos) {
      for (const [slug, photo] of Object.entries(translations.teamPhotos)) {
        await supabase
          .from('team_members')
          .upsert({
            slug,
            photo: photo as string,
            updated_at: new Date().toISOString()
          })
      }
    }

    // Migrate team translations
    if (translations.teamTexts) {
      for (const [slug, memberData] of Object.entries(translations.teamTexts)) {
        for (const [type, langData] of Object.entries(memberData as Record<string, any>)) {
          if (['name', 'role', 'bio_left', 'bio_right'].includes(type)) {
            for (const [language, value] of Object.entries(langData as Record<string, any>)) {
              if (['en', 'ru', 'kz'].includes(language)) {
                await supabase
                  .from('team_translations')
                  .upsert({
                    team_member_slug: slug,
                    translation_type: type as 'name' | 'role' | 'bio_left' | 'bio_right',
                    language: language as 'en' | 'ru' | 'kz',
                    value: value as string,
                    updated_at: new Date().toISOString()
                  })
              }
            }
          }
        }
      }
    }
  }

  // Utility method to check if migration is needed
  static async checkMigrationStatus(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id')
        .limit(1)

      // If we can fetch projects and there are none, migration might be needed
      return !error && (!data || data.length === 0)
    } catch (error) {
      console.error('Error checking migration status:', error)
      return true
    }
  }

  // Method to seed default data if no data exists
  static async seedDefaultData(): Promise<void> {
    try {
      const needsSeeding = await this.checkMigrationStatus()
      if (!needsSeeding) return

      console.log('Seeding default data...')

      // Seed default projects
      const defaultProjects = [
        {
          id: "p1",
          title: "Alsad Kazakhstan LLP",
          description: "Not operating and pre-bankrupt farm has been turned into the market leader in egg production reaching full capacity of 160 millions high quality eggs per year with a 20% market niche in Almaty region.",
          content: "Not operating and pre-bankrupt farm has been turned into the market leader in egg production reaching full capacity of 160 millions high quality eggs per year with a 20% market niche in Almaty region.",
          image: "",
          content_image: "",
          badges: [{ label: "Agriculture", color: "#16a34a" }, { label: "Turnaround", color: "#ea580c" }],
          investment_year: 2012,
          content_sections: [{ title: "Overview", text: "Not operating and pre-bankrupt farm has been turned into the market leader in egg production reaching full capacity of 160 millions high quality eggs per year with a 20% market niche in Almaty region." }],
          published: true,
          show_on_homepage: true,
          created_at: new Date(Date.UTC(2012, 0, 1)).toISOString(),
          updated_at: new Date().toISOString()
        },
        // Add other default projects here...
      ]

      for (const project of defaultProjects) {
        await supabase.from('projects').insert(project)
        
        // Add translations for each project
        await this.addDefaultProjectTranslations(project.id, project.title, project.badges, project.content_sections)
      }

      console.log('Default data seeded successfully!')
    } catch (error) {
      console.error('Error seeding default data:', error)
    }
  }

  private static async addDefaultProjectTranslations(projectId: string, title: string, badges: any[], sections: any[]): Promise<void> {
    // Add title translations
    const titleTranslations = {
      en: title,
      ru: title, // Add proper Russian translation
      kz: title  // Add proper Kazakh translation
    }

    for (const [lang, value] of Object.entries(titleTranslations)) {
      await supabase.from('project_translations').insert({
        project_id: projectId,
        translation_type: 'title',
        language: lang as 'en' | 'ru' | 'kz',
        value
      })
    }

    // Add badge translations
    const badgeTranslations = {
      en: badges.map(b => b.label),
      ru: badges.map(b => b.label), // Add proper Russian translations
      kz: badges.map(b => b.label)  // Add proper Kazakh translations
    }

    for (const [lang, value] of Object.entries(badgeTranslations)) {
      await supabase.from('project_translations').insert({
        project_id: projectId,
        translation_type: 'badges',
        language: lang as 'en' | 'ru' | 'kz',
        value
      })
    }

    // Add section translations
    const sectionTranslations = {
      en: sections,
      ru: sections, // Add proper Russian translations
      kz: sections  // Add proper Kazakh translations
    }

    for (const [lang, value] of Object.entries(sectionTranslations)) {
      await supabase.from('project_translations').insert({
        project_id: projectId,
        translation_type: 'sections',
        language: lang as 'en' | 'ru' | 'kz',
        value
      })
    }
  }
}
