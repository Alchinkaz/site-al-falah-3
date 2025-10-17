"use client"

import { useEffect } from "react"

export default function TranslationsLoader() {
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/public/translations', { cache: 'no-store' })
        if (!res.ok) return
        const translations = await res.json()
        if (typeof window !== 'undefined') {
          localStorage.setItem('i18n-translations', JSON.stringify(translations))
          window.dispatchEvent(new CustomEvent('i18n-updated', { detail: { translations } }))
        }
      } catch {}
    }
    load()
  }, [])

  return null
}


