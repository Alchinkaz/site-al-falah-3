import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    // Map certain string fields to { image } wrapper in homepage_config
    const imageKeyMap: Record<string, string> = {
      heroImage: 'hero',
      mobileMenuBg: 'mobile_menu_bg',
      footerBg: 'footer_bg',
    }

    const updates: Array<{ key: string, value: any, updated_at: string }> = []

    for (const [k, v] of Object.entries(payload as Record<string, any>)) {
      const now = new Date().toISOString()
      if (imageKeyMap[k]) {
        updates.push({ key: imageKeyMap[k], value: v ? { image: v } : null, updated_at: now })
      } else {
        updates.push({ key: k, value: v, updated_at: now })
      }
    }

    // Upsert each key separately to keep value types intact
    for (const row of updates) {
      const { error } = await supabaseAdmin
        .from('homepage_config')
        .upsert({ key: row.key, value: row.value, updated_at: row.updated_at })

      if (error) {
        console.error('Supabase upsert error (homepage_config):', row.key, error)
        return NextResponse.json({ error: error.message, key: row.key }, { status: 500 })
      }
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('Admin homepage API error:', e)
    return NextResponse.json({ error: e?.message || 'Internal server error' }, { status: 500 })
  }
}


