import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import ClinicAssistant from '@/components/ClinicAssistant'
import TreatmentGuide from '@/components/TreatmentGuide'

import HeroSection from '@/sections/HeroSection'
import ServicesSection from '@/sections/ServicesSection'
import LaserSection from '@/sections/LaserSection'
import ReviewsSection from '@/components/ReviewsSection'
import StepsSection from '@/sections/StepsSection'
import TechnologySection from '@/sections/TechnologySection'
import AboutSection from '@/sections/AboutSection'
import PricingSection from '@/sections/PricingSection'
import ContactSection from '@/sections/ContactSection'

import Admin from '@/pages/admin/admin'

gsap.registerPlugin(ScrollTrigger)

function PublicWebsite() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0B1120]">
      <Navigation />
      <TreatmentGuide />

      <main>
        <HeroSection />
        <ServicesSection />
        <LaserSection />
        <ReviewsSection />
        <StepsSection />
        <TechnologySection />
        <AboutSection />
        <PricingSection />
        <ContactSection />
      </main>

      <Footer />
      <ClinicAssistant />
      <CookieBanner />
    </div>
  )
}

export default function App() {
  const path = window.location.pathname

  if (path === '/admin' || path.startsWith('/admin/')) {
    return <Admin />
  }

  return <PublicWebsite />
}
