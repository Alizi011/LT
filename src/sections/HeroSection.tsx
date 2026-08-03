import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!contentRef.current) return
    const els = contentRef.current.children
    const tl = gsap.timeline({ delay: 0.3 })
    
    Array.from(els).forEach((el, i) => {
      tl.fromTo(el, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        i * 0.15
      )
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="hjem"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      {/* Bakgrunnsbilde med gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0B1120]/85 to-[#0B1120]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
      </div>

      {/* Innhold */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-6xl px-4 pt-20 text-center sm:px-6"
      >
        {/* Badge */}
        <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full glass px-5 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#00D26A]" />
          <span className="text-sm font-medium text-white/80">Akutthjelp tilgjengelig — Ring 67 90 40 90</span>
        </div>

        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Mer enn et sunt smil
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/60 md:text-2xl">
          Vi forbedrer din{' '}
          <span className="font-semibold text-[#F2A900]">orale helse</span> og{' '}
          <span className="font-semibold text-[#0099E8]">livskvalitet</span> med
          avansert laserteknologi
        </p>

        
        <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Button
            onClick={() =>
              document
                .querySelector('#kontakt')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="min-w-[240px] rounded-full bg-gradient-to-r from-[#0073C9] to-[#0099E8] px-12 py-6 text-lg font-semibold text-white shadow-xl shadow-[#0073C9]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0073C9]/40"
          >
            Bestill time
          </Button>

          <Button
            onClick={() =>
              document
                .querySelector('#tjenester')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            variant="outline"
            className="min-w-[240px] rounded-full border-white/20 bg-white/5 px-12 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
          >
            Se behandlinger
          </Button>
        </div>

        {/* Scroll-pil */}
        <div className="mt-16">
          <button
            onClick={() => document.querySelector('#tjenester')?.scrollIntoView({ behavior: 'smooth' })}
            className="animate-bounce-slow text-white/30 transition-colors hover:text-white/60"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  )
}
