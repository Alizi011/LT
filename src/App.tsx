import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import HeroSection from '@/sections/HeroSection'
import ServicesSection from '@/sections/ServicesSection'
import LaserSection from '@/sections/LaserSection'
import StepsSection from '@/sections/StepsSection'
import TechnologySection from '@/sections/TechnologySection'
import AboutSection from '@/sections/AboutSection'
import PricingSection from '@/sections/PricingSection'
import ContactSection from '@/sections/ContactSection'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, duration: 1.2 })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy() }
  }, [])

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <LaserSection />
        <StepsSection />
        <TechnologySection />
        <AboutSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
