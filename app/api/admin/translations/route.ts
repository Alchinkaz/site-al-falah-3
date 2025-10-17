import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

if (!supabaseUrl || !serviceRoleKey) {
	throw new Error('Missing Supabase environment variables')
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

async function upsertTranslation(key: string, lang: 'en' | 'ru' | 'kz', value: any) {
	await supabaseAdmin
		.from('translations')
		.upsert({ key, language: lang, value, updated_at: new Date().toISOString() })
}

export async function POST(request: Request) {
	try {
		const { updates } = await request.json()
		if (!updates || typeof updates !== 'object') {
			return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
		}

		const langs: Array<'en' | 'ru' | 'kz'> = ['en', 'ru', 'kz']

		for (const [key, val] of Object.entries(updates)) {
			if (val && typeof val === 'object' && !Array.isArray(val)) {
				// Object with language keys
				for (const lang of langs) {
					if (Object.prototype.hasOwnProperty.call(val, lang)) {
						await upsertTranslation(key, lang, (val as any)[lang])
					}
				}
			} else {
				// Single value for all languages (rare); store under 'en' only
				await upsertTranslation(key, 'en', val)
			}
		}

		return NextResponse.json({ ok: true })
	} catch (e) {
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
