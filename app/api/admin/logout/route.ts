import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

export async function POST() {
	try {
		const token = cookies().get('admin_session')?.value
		if (token) {
			await supabaseAdmin.from('user_sessions').delete().eq('token', token)
		}
		cookies().set('admin_session', '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', expires: new Date(0) })
		return NextResponse.json({ ok: true })
	} catch (e) {
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
