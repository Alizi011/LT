import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const heroReviews = [
  'Trygg og godt ivaretatt',
  'Profesjonell og grundig',
  'Tannlegeskrekken forsvant',
  'Raskt og smertefritt',
  'Ro og trygghet',
  'Resultat over forventning',
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [reviewIndex, setReviewIndex] = useState(0)
  const [reviewVisible, setReviewVisible] = useState(true)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setReviewVisible(false)

      window.setTimeout(() => {
        setReviewIndex((current) => (current + 1) % heroReviews.length)
        setReviewVisible(true)
      }, 350)
    }, 3600)

    return () => window.clearInterval(interval)
  }, [])

  useGSAP(
    () => {
      if (!contentRef.current) return

      const els = contentRef.current.children
      const tl = gsap.timeline({ delay: 0.3 })

      Array.from(els).forEach((el, i) => {
        tl.fromTo(
          el,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          i * 0.15
        )
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="hjem"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#0B1120]"
    >
      {/* =========================================================
          HERO BAKGRUNN
      ========================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0B1120]">
        <img
          src="/hero-bg.png"
          alt=""
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-[72%_center]
            sm:object-[74%_center]
            lg:object-[76%_center]
          "
        />

        {/* Mørk venstreside for tekst, gradvis lysere mot personen */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#0B1120]/95
            via-[#0B1120]/78
            to-[#0B1120]/20
          "
        />

        {/* Litt mørkere nederst */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#0B1120]/75
            via-transparent
            to-[#0B1120]/10
          "
        />
      </div>

      {/* =========================================================
          HERO INNHOLD
      ========================================================== */}
      <div
        ref={contentRef}
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-6xl
          px-4
          pt-20
          text-center
          sm:px-6
          lg:ml-[8vw]
          lg:mr-auto
          lg:max-w-[820px]
        "
      >
        {/* Badge */}
        <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full glass px-5 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#00D26A]" />

          <span className="text-sm font-medium text-white/80">
            Akutthjelp tilgjengelig — Ring 67 90 40 90
          </span>
        </div>

        {/* Overskrift */}
        <h1
          className="
            mx-auto
            max-w-4xl
            font-display
            text-5xl
            font-bold
            leading-[1.05]
            tracking-tight
            text-white
            sm:text-6xl
            md:text-7xl
            lg:text-[4.8rem] xl:text-[5.1rem]
          "
        >
          Mer enn et sunt smil
        </h1>

        {/* Intro */}
        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-xl
            leading-relaxed
            text-white/60
            md:text-2xl
          "
        >
          Vi forbedrer din{' '}
          <span className="font-semibold text-[#F2A900]">
            orale helse
          </span>{' '}
          og{' '}
          <span className="font-semibold text-[#0099E8]">
            livskvalitet
          </span>{' '}
          med avansert laserteknologi
        </p>

        {/* =========================================================
            KNAPPER
        ========================================================== */}
        <div
          className="
            mx-auto
            mt-16
            flex
            w-full
            max-w-[816px]
            flex-col
            items-center
            justify-center
            gap-6
            sm:flex-row
            lg:translate-x-20
            xl:translate-x-24
          "
        >
          <Button
            onClick={() =>
              document
                .querySelector('#kontakt')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="
              w-full
              rounded-full
              bg-gradient-to-r
              from-[#0073C9]
              to-[#0099E8]
              px-12
              py-6
              text-lg
              font-semibold
              text-white
              shadow-xl
              shadow-[#0073C9]/30
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
              hover:shadow-[#0073C9]/40
              sm:flex-1
            "
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
            className="
              w-full
              rounded-full
              border-white/20
              bg-white/5
              px-12
              py-6
              text-lg
              font-semibold
              text-white
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-white/30
              hover:bg-white/10
              sm:flex-1
            "
          >
            Se behandlinger
          </Button>

          <Button
            onClick={() =>
              window.dispatchEvent(
                new Event('open-treatment-guide')
              )
            }
            variant="outline"
            className="
              w-full
              rounded-full
              border-[#0099E8]/50
              bg-[#0073C9]/15
              px-12
              py-6
              text-lg
              font-semibold
              text-white
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#0099E8]
              hover:bg-[#0073C9]/30
              sm:flex-1
            "
          >
            Finn riktig behandling
          </Button>
        </div>

        {/* =========================================================
            PASIENTVURDERING
        ========================================================== */}
        <div className="mt-8 flex min-h-[52px] items-center justify-center lg:translate-x-20 xl:translate-x-24">
          <div
            className={`
              w-full
              max-w-[816px]
              transition-all
              duration-300
              ${
                reviewVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-1 opacity-0'
              }
            `}
          >
            <div
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/[0.05]
                px-8
                py-4
                backdrop-blur-sm
              "
            >
              <div className="flex items-center justify-center gap-4">
                <span
                  className="
                    shrink-0
                    text-lg
                    tracking-[0.18em]
                    text-[#F2A900]
                    sm:text-xl
                  "
                  aria-label="5 av 5 stjerner"
                >
                  ★★★★★
                </span>

                <span className="text-base font-semibold text-white/85 sm:text-lg">
                  «{heroReviews[reviewIndex]}»
                </span>
              </div>

              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-white/10" />

                <p
                  className="
                    text-center
                    text-[9px]
                    uppercase
                    tracking-[0.14em]
                    text-white/30
                    sm:text-[10px]
                  "
                >
                  Pasientvurdering på Legelisten
                </p>

                <span className="h-px w-8 bg-white/10" />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SCROLL PIL
        ========================================================== */}
        <div className="mt-10">
          <button
            type="button"
            aria-label="Gå til behandlinger"
            onClick={() =>
              document
                .querySelector('#tjenester')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="
              animate-bounce-slow
              text-white/30
              transition-colors
              hover:text-white/60
            "
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  )
}