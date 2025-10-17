import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !anonKey) {
  throw new Error('Missing Supabase public env variables')
}

const supabase = createClient(supabaseUrl, anonKey)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('translations')
      .select('*')

    if (error) {
      console.error('Error fetching public translations:', error)
      return NextResponse.json({ error: 'Failed to fetch translations' }, { status: 500 })
    }

    const result: Record<string, any> = {}
    ;(data || []).forEach((row: any) => {
      if (!result[row.key]) result[row.key] = {}
      result[row.key][row.language] = row.value
    })

    return NextResponse.json(result)
  } catch (e) {
    console.error('Internal server error in /api/public/translations:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


