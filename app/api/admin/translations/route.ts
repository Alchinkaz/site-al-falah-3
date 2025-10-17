import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

async function upsertTranslation(key: string, lang: 'en' | 'ru' | 'kz', value: any) {
  const cleaned = value === undefined ? null : value
  const { error } = await supabaseAdmin
    .from('translations')
    .upsert({ key, language: lang, value: cleaned, updated_at: new Date().toISOString() })
  if (error) throw error
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))

    // Legacy single-item payload support: { key, language, value }
    if (body?.key && body?.language && 'value' in body) {
      await upsertTranslation(body.key, body.language, body.value)
      return NextResponse.json({ ok: true })
    }

    // Batch payload: { updates: { key: { en, ru, kz } | primitive } }
    const updates = body?.updates
    if (!updates || typeof updates !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const langs: Array<'en' | 'ru' | 'kz'> = ['en', 'ru', 'kz']

    for (const [key, val] of Object.entries(updates as Record<string, any>)) {
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        // Case A: direct language object { en, ru, kz }
        let matchedDirect = false
        for (const lang of langs) {
          if (Object.prototype.hasOwnProperty.call(val, lang)) {
            matchedDirect = true
            await upsertTranslation(key, lang, (val as any)[lang])
          }
        }

        if (!matchedDirect) {
          // Case B: nested map like { heroTitle: { en,ru,kz }, heroSubtitle: { ... } }
          for (const [childKey, childVal] of Object.entries(val as Record<string, any>)) {
            if (childVal && typeof childVal === 'object' && !Array.isArray(childVal)) {
              for (const lang of langs) {
                if (Object.prototype.hasOwnProperty.call(childVal, lang)) {
                  const compositeKey = `${key}.${childKey}`
                  await upsertTranslation(compositeKey, lang, (childVal as any)[lang])
                }
              }
            }
          }
        }
      } else {
        // Single value for all languages; store under 'en'
        await upsertTranslation(key, 'en', val)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('Translations API error:', e)
    return NextResponse.json({ error: e?.message || 'Internal server error' }, { status: 500 })
  }
}
