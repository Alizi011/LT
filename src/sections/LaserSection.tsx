import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  Check,
  Droplets,
  HeartPulse,
  MoonStar,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

import ScrollReveal from '@/components/ScrollReveal'

type LaserTreatment = {
  icon: LucideIcon
  eyebrow: string
  title: string
  description: string
  details: string
  benefits: string[]
}

const laserTreatments: LaserTreatment[] = [
  {
    icon: MoonStar,
    eyebrow: 'NightLase®',
    title: 'Laserbehandling mot snorking',
    description:
      'Skånsom behandling av vevet i munnhulen og svelget for å redusere snorking.',
    details:
      'NightLase® bruker kontrollert laserenergi for å stimulere og stramme opp vevet bakerst i munnen. Behandlingen gjennomføres uten kirurgiske inngrep og krever normalt ingen nedetid.',
    benefits: [
      'Ikke-kirurgisk behandling',
      'Kort behandlingstid',
      'Ingen sykmelding eller nedetid',
      'Individuelt behandlingsforløp',
    ],
  },
  {
    icon: Droplets,
    eyebrow: 'Fotona®',
    title: 'Behandling av tørr munn',
    description:
      'Laserstimulering som kan bidra til økt spyttproduksjon og mindre ubehag.',
    details:
      'Laserbehandlingen stimulerer spyttkjertlene og vevet i munnhulen. Målet er å redusere tørrhetsfølelse og gjøre det mer behagelig å spise, snakke og svelge.',
    benefits: [
      'Skånsom stimulering',
      'Ingen kirurgiske inngrep',
      'Kort behandlingstid',
      'Tilpasses årsak og symptomer',
    ],
  },
  {
    icon: ShieldCheck,
    eyebrow: 'Periodontal laser',
    title: 'Tannkjøttbehandling',
    description:
      'Presis laserbehandling ved betennelse og bakterier rundt tenner og tannkjøtt.',
    details:
      'Laser kan brukes sammen med tradisjonell tannrens for å behandle infisert og betent vev. Teknologien gjør det mulig å arbeide presist i områder som kan være vanskelig tilgjengelige.',
    benefits: [
      'Presis behandling',
      'Skånsom mot omkringliggende vev',
      'Reduserer bakterier i behandlingsområdet',
      'Kan støtte en god tilhelingsprosess',
    ],
  },
  {
    icon: HeartPulse,
    eyebrow: 'Fotona®',
    title: 'Munnsår og herpes',
    description:
      'Målrettet behandling som kan lindre ubehag og støtte tilhelingen.',
    details:
      'Laser kan brukes ved enkelte former for munnsår, herpesutbrudd og irritert slimhinne. Behandlingen retter seg direkte mot det aktuelle området og tar vanligvis kort tid.',
    benefits: [
      'Rask og målrettet behandling',
      'Ingen kirurgiske inngrep',
      'Kan redusere smerter og ubehag',
      'Kan støtte raskere tilheling',
    ],
  },
]

const laserAdvantages = [
  'Høy presisjon',
  'Skånsom behandling',
  'Kort behandlingstid',
  'Moderne Fotona®-teknologi',
]

export default function LaserSection() {
  const [selectedTreatment, setSelectedTreatment] =
    useState<LaserTreatment | null>(null)

  useEffect(() => {
    if (!selectedTreatment) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedTreatment(null)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [selectedTreatment])

  const scrollToContact = () => {
    setSelectedTreatment(null)

    window.setTimeout(() => {
      document
        .querySelector('#kontakt')
        ?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      <section
        id="laser"
        className="relative overflow-hidden bg-[#07101F] py-24 text-white md:py-32"
      >
        {/* Bakgrunn */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0073C9]/20 via-transparent to-[#F2A900]/10" />

        <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#0073C9]/20 blur-[150px]" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#F2A900]/10 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Introduksjon */}
          <ScrollReveal y={35}>
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0099E8]/25 bg-[#0073C9]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#33B5F5]">
                <Sparkles size={15} />
                Fotona® laserteknologi
              </span>

              <h2 className="mt-7 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
                Neste generasjon
                <span className="block bg-gradient-to-r from-[#33B5F5] to-[#F2A900] bg-clip-text text-transparent">
                  tannbehandling
                </span>
              </h2>

              <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/55">
                Moderne laserteknologi gir oss mulighet til å utføre flere
                behandlinger med høy presisjon, god komfort og minimal
                belastning på vevet.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                {laserAdvantages.map((advantage) => (
                  <span
                    key={advantage}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm text-white/75 backdrop-blur-sm"
                  >
                    <Check size={15} className="text-[#F2A900]" />
                    {advantage}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Stort bilde */}
          <ScrollReveal y={45} delay={0.1}>
            <div className="relative mx-auto mt-16 max-w-6xl">
              <div className="relative min-h-[430px] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black/40 sm:min-h-[560px]">
                <img
                  src="/laser-dentistry.jpg"
                  alt="Fotona laserbehandling ved Lørenskog Tannlegesenter"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#07101F]/85 via-[#07101F]/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07101F] via-[#07101F]/40 to-transparent p-7 pt-32 sm:p-12 sm:pt-40">
                  <div className="max-w-xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F2A900]">
                      Avansert teknologi
                    </p>

                    <h3 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
                      Fotona® hos Lørenskog Tannlegesenter
                    </h3>

                    <p className="mt-4 max-w-lg leading-relaxed text-white/65">
                      Vi bruker laser der teknologien kan gi en mer presis,
                      skånsom og komfortabel behandling.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-7 right-5 hidden rounded-3xl border border-white/10 bg-[#0B1629]/90 p-6 shadow-2xl backdrop-blur-xl sm:block lg:right-10">
                <div className="flex items-center gap-4">
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0073C9] to-[#0099E8] p-3 text-white shadow-lg shadow-[#0073C9]/30">
                    <ShieldCheck size={26} />
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Moderne og presist
                    </p>
                    <p className="mt-1 text-sm text-white/45">
                      Behandling tilpasset dine behov
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Behandlingskort */}
          <ScrollReveal y={40}>
            <div className="mb-10 mt-24 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#33B5F5]">
                Laserbehandlinger
              </p>

              <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                Hva tilbyr vi?
              </h3>
            </div>
          </ScrollReveal>

          <ScrollReveal
            className="grid gap-5 md:grid-cols-2"
            y={40}
            stagger={0.1}
          >
            {laserTreatments.map((treatment) => {
              const Icon = treatment.icon

              return (
                <article
                  key={treatment.title}
                  className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.045] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#0099E8]/30 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-black/25 sm:p-8"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0099E8]/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-5">
                    <div className="inline-flex rounded-2xl border border-[#0099E8]/20 bg-[#0073C9]/15 p-4 text-[#33B5F5] transition-all duration-500 group-hover:scale-105 group-hover:bg-[#0073C9]/25">
                      <Icon size={29} strokeWidth={1.5} />
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/45">
                      {treatment.eyebrow}
                    </span>
                  </div>

                  <h4 className="mt-7 font-display text-2xl font-semibold text-white">
                    {treatment.title}
                  </h4>

                  <p className="mt-4 flex-1 leading-relaxed text-white/50">
                    {treatment.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedTreatment(treatment)}
                    className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#33B5F5] transition-colors hover:text-white"
                  >
                    Les mer

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </article>
              )
            })}
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal y={30}>
            <div className="mt-16 flex flex-col items-center rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#0073C9]/15 to-[#0099E8]/5 px-6 py-10 text-center backdrop-blur-sm sm:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F2A900]">
                Er laserbehandling riktig for deg?
              </p>

              <h3 className="mt-4 font-display text-3xl font-bold">
                Bestill en personlig konsultasjon
              </h3>

              <p className="mt-4 max-w-xl leading-relaxed text-white/50">
                Vi vurderer dine behov og forklarer hvilke muligheter
                laserteknologien kan gi.
              </p>

              <button
                type="button"
                onClick={scrollToContact}
                className="group mt-7 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#0073C9] to-[#0099E8] px-9 py-4 font-semibold text-white shadow-xl shadow-[#0073C9]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0073C9]/40"
              >
                Bestill konsultasjon

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Informasjonsmodal */}
      {selectedTreatment && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="laser-dialog-title"
          className="fixed inset-0 z-[120] flex items-end justify-center bg-[#020617]/85 p-0 backdrop-blur-md sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedTreatment(null)
            }
          }}
        >
          <div className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] border border-white/10 bg-[#0B1629] p-6 text-white shadow-2xl shadow-black/50 sm:rounded-[2rem] sm:p-9">
            <button
              type="button"
              onClick={() => setSelectedTreatment(null)}
              aria-label="Lukk"
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <X size={21} />
            </button>

            <div className="pr-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#33B5F5]">
                {selectedTreatment.eyebrow}
              </p>

              <h2
                id="laser-dialog-title"
                className="mt-3 font-display text-3xl font-bold sm:text-4xl"
              >
                {selectedTreatment.title}
              </h2>
            </div>

            <p className="mt-6 leading-relaxed text-white/60">
              {selectedTreatment.details}
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-lg font-semibold">Fordeler</h3>

              <ul className="mt-5 space-y-4">
                {selectedTreatment.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-white/65"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0073C9]/20 text-[#33B5F5]">
                      <Check size={14} strokeWidth={2.5} />
                    </span>

                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedTreatment(null)}
                className="min-h-12 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Lukk
              </button>

              <button
                type="button"
                onClick={scrollToContact}
                className="min-h-12 rounded-full bg-gradient-to-r from-[#0073C9] to-[#0099E8] px-8 py-3 font-semibold text-white shadow-lg shadow-[#0073C9]/25 transition hover:-translate-y-0.5"
              >
                Bestill konsultasjon
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}