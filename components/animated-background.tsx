"use client"

import { useEffect, useState } from "react"
import { getHomepageData } from "@/lib/homepage-data"

export default function AnimatedBackground() {
  const [bg, setBg] = useState<string>("/hero-bg.jpg")

  useEffect(() => {
    const data = getHomepageData()
    if (data?.heroImage) setBg(data.heroImage)

    const onUpdate = (e: any) => {
      const d = e.detail || {}
      if (d.heroImage) setBg(d.heroImage)
    }
    window.addEventListener("homepage-data-updated", onUpdate)
    return () => window.removeEventListener("homepage-data-updated", onUpdate)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${bg || "/hero-bg.jpg"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  )
}
