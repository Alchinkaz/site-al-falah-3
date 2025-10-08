"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"
import { useState, useEffect } from "react"
import { getHomepageData, type HomepageData } from "@/lib/homepage-data"
import { useCounterAnimation } from "@/hooks/use-counter-animation"
import AnimatedBackground from "@/components/animated-background"
import Link from "next/link"

export default function Home() {
  const [currentReview, setCurrentReview] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageVisible, setIsImageVisible] = useState(true)

  const stat1Counter = useCounterAnimation({
    end: homepageData ? Number.parseInt(homepageData.stat1Title?.replace(/[^\d]/g, "") || "0") : 0,
  })
  const stat2Counter = useCounterAnimation({
    end: homepageData ? Number.parseInt(homepageData.stat2Title?.replace(/[^\d]/g, "") || "0") : 0,
  })
  const stat3Counter = useCounterAnimation({
    end: homepageData ? Number.parseInt(homepageData.stat3Title?.replace(/[^\d]/g, "") || "0") : 0,
  })

  useEffect(() => {
    const data = getHomepageData()
    setHomepageData(data)

    const handleDataUpdate = (event: CustomEvent) => {
      setHomepageData(event.detail)
    }

    window.addEventListener("homepage-data-updated", handleDataUpdate as EventListener)

    return () => {
      window.removeEventListener("homepage-data-updated", handleDataUpdate as EventListener)
    }
  }, [])

  const reviews = homepageData?.reviews || []

  useEffect(() => {
    if (reviews.length === 0) return

    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length)
        setIsVisible(true)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [reviews.length])

  useEffect(() => {
    if (!homepageData?.imageGallery || homepageData.imageGallery.length === 0) return

    const interval = setInterval(() => {
      setIsImageVisible(false)
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % homepageData.imageGallery.length)
        setIsImageVisible(true)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [homepageData?.imageGallery])

  if (!homepageData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="sticky top-0 min-h-screen w-full flex flex-col relative pt-20 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent z-[1] pointer-events-none" />
        <AnimatedBackground />

        <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="flex items-center justify-center py-8">
              <div className="max-w-4xl lg:max-w-3xl xl:max-w-4xl text-left">
                <img
                  src="/images/design-mode/al-falah-logo-white-text.svg"
                  alt="Al Falah Partners"
                  className="mb-3.5 h-[100px] sm:h-[100px] md:h-[100px] lg:h-[108px] xl:h-[112px] 2xl:h-[120px]"
                />

                <h1
                  className="text-white font-normal mb-6 md:mb-8"
                  style={{
                    fontSize: "clamp(18px, 2.2vw, 24px)",
                    lineHeight: 1.4,
                    wordBreak: "keep-all",
                    overflowWrap: "normal",
                    whiteSpace: "normal",
                  }}
                >
                  Capitalizing on Emerging Opportunities
                </h1>

                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  <Link href="/portfolio">
                    <button
                      className="bg-white hover:bg-gray-100 text-black font-semibold rounded-xl w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                      style={{ height: "clamp(44px, 6.2vw, 48px)", paddingInline: "clamp(20px, 4.5vw, 40px)", fontSize: "clamp(14px, 1.6vw, 16px)" }}
                    >
                      View Portfolio
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative z-20 bg-white pt-24 pb-8" id="portfolio">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between lg:flex-row lg:items-end lg:justify-between">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Portfolio</h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl">
                Successful investments that helped our portfolio companies scale and grow
              </p>
            </div>
            <Link href="/portfolio">
              <Button
                variant="outline"
                className="hidden md:block border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 bg-white px-8 mt-6"
              >
                View All
              </Button>
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <div className="lg:col-span-1">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-80">
                  <img
                    src="/placeholder.svg"
                    alt="FinTech Startup"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-80">
                  <img
                    src="/placeholder.svg"
                    alt="Healthcare Platform"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-80">
                  <img
                    src="/placeholder.svg"
                    alt="AI Analytics"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-80">
                  <img
                    src="/placeholder.svg"
                    alt="E-commerce Solution"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-80">
                  <img
                    src="/placeholder.svg"
                    alt="SaaS Platform"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-80">
                  <img
                    src="/placeholder.svg"
                    alt="Tech Startup"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="aspect-square">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full">
                  <img
                    src="/placeholder.svg"
                    alt="FinTech Startup"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="aspect-square">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full">
                  <img
                    src="/placeholder.svg"
                    alt="Healthcare Platform"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="aspect-square">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full">
                  <img
                    src="/placeholder.svg"
                    alt="AI Analytics"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="aspect-square">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full">
                  <img
                    src="/placeholder.svg"
                    alt="E-commerce Solution"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="aspect-square">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full">
                  <img
                    src="/placeholder.svg"
                    alt="SaaS Platform"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="aspect-square">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full">
                  <img
                    src="/placeholder.svg"
                    alt="Tech Startup"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="aspect-square">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full">
                  <img
                    src="/placeholder.svg"
                    alt="FinTech Startup"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="aspect-square">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full">
                  <img
                    src="/placeholder.svg"
                    alt="Healthcare Platform"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="aspect-square">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full">
                  <img
                    src="/placeholder.svg"
                    alt="AI Analytics"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="aspect-square">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full">
                  <img
                    src="/placeholder.svg"
                    alt="E-commerce Solution"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="aspect-square">
                <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-full">
                  <img
                    src="/placeholder.svg"
                    alt="SaaS Platform"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center md:hidden">
            <Link href="/portfolio">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 bg-white px-8"
              >
                View All
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section with company info and statistics */}
      <section id="about" className="relative z-20 bg-white py-5" aria-labelledby="about-heading">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="grid xl:grid-cols-2 gap-16 items-start">
            <div className="order-2 xl:order-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 xl:mt-0">{homepageData.aboutText}</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                {homepageData.aboutDescription.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="order-1 xl:order-2">
              <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={homepageData.aboutImage || "/placeholder.svg"}
                  alt="Currency exchange office"
                  fill
                  className="object-cover rounded-lg"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-20 py-12 bg-white pb-24">
        <div className="max-w-[22rem] sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="text-left relative">
                  <div className="px-4 py-6">
                    <h3 ref={stat1Counter.elementRef} className="text-3xl font-semibold text-gray-900 mb-2">
                      {homepageData.stat1Title.replace(/\d+/, stat1Counter.count.toString())}
                    </h3>
                    <p className="text-gray-600">{homepageData.stat1Subtitle}</p>
                  </div>
                  <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-gray-300"></div>
                  <div className="md:hidden w-full h-px bg-gray-300"></div>
                </div>

                <div className="text-left relative">
                  <div className="px-4 py-6">
                    <h3 ref={stat2Counter.elementRef} className="text-3xl font-semibold text-gray-900 mb-2">
                      {homepageData.stat2Title.replace(/\d+/, stat2Counter.count.toString())}
                    </h3>
                    <p className="text-gray-600">{homepageData.stat2Subtitle}</p>
                  </div>
                  <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-gray-300"></div>
                  <div className="md:hidden w-full h-px bg-gray-300"></div>
                </div>

                <div className="text-left relative">
                  <div className="px-4 py-6">
                    <h3 ref={stat3Counter.elementRef} className="text-3xl font-semibold text-gray-900 mb-2">
                      {homepageData.stat3Title.replace(/\d+/, stat3Counter.count.toString())}
                    </h3>
                    <p className="text-gray-600">{homepageData.stat3Subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-2 bg-[rgba(30,26,97,1)]"></div>
          </div>
        </div>
      </section>

      <div className="relative z-20 bg-white">
        <CTASection />
        <Footer />
      </div>

      <style jsx>{`
        @keyframes gentle-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.6);
          }
        }
      `}</style>
    </div>
  )
}
