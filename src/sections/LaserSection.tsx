import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  ArrowRight,
  Check,
  CircleHelp,
  Droplets,
  HeartPulse,
  MoonStar,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Stethoscope,
  Waves,
  X,
} from 'lucide-react'

import ScrollReveal from '@/components/ScrollReveal'

type LaserTreatment = {
  icon: LucideIcon
  eyebrow: string
  title: string
  description: string
  details: string
  idealFor: string[]
  benefits: string[]
}

type TechnologyFeature = {
  icon: LucideIcon
  title: string
  description: string
}

const laserTreatments: LaserTreatment[] = [
  {
    icon: MoonStar,
    eyebrow: 'NightLase®',
    title: 'Laserbehandling mot snorking',
    description:
      'En ikke-invasiv behandling som kan bidra til å redusere snorking og støtte bedre søvnkvalitet.',
    details:
      'NightLase® bruker skånsom laserenergi for å varme opp og stimulere vevet bakerst i munnhulen. Målet er å bidra til økt spenst i vevet og redusert vibrasjon under søvn. Behandlingen utføres uten kirurgiske inngrep og uten klassisk nedetid.',
    idealFor: [
      'Plagsom snorking',
      'Pasienter som ønsker et ikke-kirurgisk alternativ',
      'Pasienter som ønsker en skånsom behandlingsform',
    ],
    benefits: [
      'Ikke-kirurgisk behandling',
      'Kort behandlingstid',
      'Ingen klassisk nedetid',
      'Tilpasses individuelt behandlingsforløp',
    ],
  },
  {
    icon: Sparkles,
    eyebrow: 'TouchWhite®',
    title: 'Laserassistert tannbleking',
    description:
      'Skånsom og effektiv bleking der laser brukes til å aktivere blekegelen målrettet.',
    details:
      'TouchWhite® er en laserassistert blekemetode hvor energien primært virker i blekegelen. Det gjør det mulig å arbeide mer målrettet og med mindre unødvendig varmebelastning på tannen sammenlignet med enkelte andre metoder. Behandlingen vurderes alltid ut fra tannstatus og ønsket resultat.',
    idealFor: [
      'Misfargede tenner',
      'Pasienter som ønsker raskere blekeresultat',
      'Pasienter som ønsker profesjonell bleking i klinikk',
    ],
    benefits: [
      'Målrettet aktivering av blekegelen',
      'Skånsom tilnærming',
      'Klinikkbasert og kontrollert behandling',
      'Vurderes individuelt etter tannstatus',
    ],
  },
  {
    icon: Droplets,
    eyebrow: 'ComfortLase®',
    title: 'Smertelindring og støtte til tilheling',
    description:
      'Fotobiomodulasjon kan brukes ved smerter, sårtilheling og irritert vev i munnhulen.',
    details:
      'ComfortLase® og fotobiomodulasjon benytter lavenergi-laser for å stimulere vev på en skånsom måte. Dette kan brukes som støtte ved smerter, ømhet, munnsår og tilhelingsfaser etter ulike behandlinger.',
    idealFor: [
      'Ømt eller irritert vev',
      'Sårtilheling',
      'Utvalgte smerte- og irritasjonstilstander i munnhulen',
    ],
    benefits: [
      'Skånsom behandling',
      'Kan støtte tilheling',
      'Kan bidra til mindre ubehag',
      'Kort behandlingstid',
    ],
  },
  {
    icon: HeartPulse,
    eyebrow: 'Fotona®',
    title: 'Munnsår, herpes og irritert slimhinne',
    description:
      'Målrettet laserbehandling som kan lindre ubehag og støtte raskere tilheling.',
    details:
      'Laser kan brukes ved enkelte typer munnsår, herpesutbrudd og irriterte slimhinner. Behandlingen retter seg mot det aktuelle området og kan bidra til redusert ubehag og en mer komfortabel tilhelingsprosess.',
    idealFor: [
      'Herpesutbrudd',
      'Afte / munnsår',
      'Irritert slimhinne',
    ],
    benefits: [
      'Rask og målrettet behandling',
      'Kan redusere smerter og ubehag',
      'Ingen kirurgiske inngrep',
      'Kan støtte raskere tilheling',
    ],
  },
  {
    icon: ShieldCheck,
    eyebrow: 'Periodontal laser',
    title: 'Tannkjøttbehandling',
    description:
      'Presis behandling ved betennelse, bakterier og sykt vev rundt tenner og tannkjøtt.',
    details:
      'Laser kan brukes som et supplement til tradisjonell periodontal behandling. Teknologien gjør det mulig å arbeide målrettet i periodontalområdet og kan bidra til redusert bakteriebelastning, skånsom behandling av vev og god kontroll i vanskelig tilgjengelige områder.',
    idealFor: [
      'Tannkjøttbetennelse',
      'Periodontale lommer',
      'Vedlikehold og støttebehandling',
    ],
    benefits: [
      'Presis behandling',
      'Skånsom mot omkringliggende vev',
      'Kan redusere bakterier i området',
      'Kan støtte en god tilhelingsprosess',
    ],
  },
  {
    icon: Activity,
    eyebrow: 'Peri-implantitt',
    title: 'Laserbehandling rundt implantater',
    description:
      'Skånsom og målrettet behandling ved betennelse og irritasjon rundt implantater.',
    details:
      'Ved peri-implantitt og betennelsestilstander rundt implantater kan laser brukes som en del av behandlingen for å arbeide skånsomt i området. Målet er å redusere bakteriebelastning, behandle betent vev og støtte tilheling rundt implantatet.',
    idealFor: [
      'Betennelse rundt implantater',
      'Rødhet, irritasjon eller blødning ved implantat',
      'Behov for målrettet oppfølging rundt implantat',
    ],
    benefits: [
      'Målrettet behandling rundt implantatet',
      'Skånsom mot omkringliggende vev',
      'Kan støtte en mer kontrollert tilhelingsprosess',
      'Individuell vurdering av behandlingsopplegg',
    ],
  },
  {
    icon: Waves,
    eyebrow: 'SWEEPS® / TwinLight®',
    title: 'Rotbehandling og desinfeksjon',
    description:
      'Avansert laserteknologi som kan brukes for mer målrettet rensing og desinfeksjon i rotkanalsystemet.',
    details:
      'Fotona-teknologier som SWEEPS® og TwinLight® er utviklet for å støtte mer effektiv irrigasjon og desinfeksjon i komplekse rotkanaler. Laser brukes som et supplement i behandlingen der målet er å arbeide mer presist og oppnå bedre tilgang i anatomisk krevende områder.',
    idealFor: [
      'Rotbehandling',
      'Komplekse rotkanalsystemer',
      'Behov for målrettet desinfeksjon',
    ],
    benefits: [
      'Kan forbedre rengjøring i komplekse kanaler',
      'Presis og målrettet behandling',
      'Kan brukes som supplement til tradisjonell rotbehandling',
      'Moderne teknologi for avanserte kasus',
    ],
  },
  {
    icon: SmilePlus,
    eyebrow: 'Fotona®',
    title: 'Tannfølsomhet',
    description:
      'Skånsom behandling som kan bidra til lindring ved sensitive tenner.',
    details:
      'Laser kan brukes ved tannfølsomhet som et målrettet tiltak for pasienter som opplever ising eller ubehag ved kulde, varme eller berøring. Egnethet vurderes individuelt ut fra årsak til sensitiviteten.',
    idealFor: [
      'Sensitive tenner',
      'Ising ved kaldt eller varmt',
      'Ubehag ved berøring av tannoverflaten',
    ],
    benefits: [
      'Rask og skånsom behandling',
      'Kan bidra til mindre ising og ubehag',
      'Kort behandlingstid',
      'Individuell vurdering av årsak og behov',
    ],
  },
]

const laserAdvantages = [
  'Høy presisjon',
  'Skånsom behandling',
  'Kort behandlingstid',
  'Moderne Fotona®-teknologi',
]

const technologyFeatures: TechnologyFeature[] = [
  {
    icon: ShieldCheck,
    title: 'Presisjon i behandling',
    description:
      'Laser gjør det mulig å arbeide svært målrettet i både hardt og bløtt vev, med god kontroll i små behandlingsområder.',
  },
  {
    icon: Droplets,
    title: 'Skånsom mot vevet',
    description:
      'Ved mange behandlinger kan laser bidra til mindre belastning på omkringliggende vev og en mer kontrollert behandlingsopplevelse.',
  },
  {
    icon: Activity,
    title: 'Komfort og tilheling',
    description:
      'Teknologien kan i mange tilfeller bidra til mindre ubehag, mindre blødning og en god tilhelingsprosess.',
  },
  {
    icon: Waves,
    title: 'Avansert Fotona-plattform',
    description:
      'LightWalker®, SkyPulse®, NightLase®, SWEEPS® og TouchWhite® gir flere behandlingsmuligheter på samme teknologi-plattform.',
  },
]

const treatmentGroups = [
  'Snorking og søvnrelaterte plager',
  'Tannbleking',
  'Tannkjøttbehandling',
  'Peri-implantitt',
  'Rotbehandling / endodonti',
  'Tannfølsomhet',
  'Herpes, after og irritert slimhinne',
  'Smertelindring og støtte til tilheling',
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
                Presis, skånsom og
                <span className="block bg-gradient-to-r from-[#33B5F5] to-[#F2A900] bg-clip-text text-transparent">
                  moderne laserbehandling
                </span>
              </h2>

              <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-white/60">
                Med Fotona®-teknologi kan vi tilby flere behandlinger med høy
                presisjon og god komfort. Laser kan i mange tilfeller være et
                skånsomt supplement eller alternativ ved utvalgte behandlinger
                innen tannhelse.
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

          {/* Hero / hovedblokk */}
          <ScrollReveal y={45} delay={0.1}>
            <div className="relative mx-auto mt-16 max-w-6xl">
              <div className="relative min-h-[460px] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black/40 sm:min-h-[600px]">
                <img
                  src="/laser-dentistry.jpg"
                  alt="Fotona laserbehandling ved Lørenskog Tannlegesenter"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#07101F]/92 via-[#07101F]/58 to-[#07101F]/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07101F] via-[#07101F]/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 pt-32 sm:p-12 sm:pt-40">
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F2A900]">
                      LightWalker® • SkyPulse® • SWEEPS®
                    </p>

                    <h3 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
                      Fotona® hos Lørenskog Tannlegesenter
                    </h3>

                    <p className="mt-4 max-w-xl leading-relaxed text-white/70">
                      Vi bruker moderne laserteknologi der det kan gi en mer
                      presis, skånsom og komfortabel behandling – alltid basert
                      på en individuell vurdering av dine behov.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80">
                        Fotona®-plattform
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80">
                        Presis og målrettet behandling
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80">
                        Skånsom tilnærming
                      </span>
                    </div>
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
                      Presist og skånsomt
                    </p>
                    <p className="mt-1 text-sm text-white/50">
                      Tilpasses hver enkelt behandling
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Teknologifordeler */}
          <ScrollReveal y={35}>
            <div className="mt-28 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#33B5F5]">
                Hvorfor laser?
              </p>

              <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                Hva gjør teknologien nyttig?
              </h3>

              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/55">
                Laserteknologi gir ikke bare moderne utstyr – den gir oss flere
                måter å behandle på, med høy kontroll og god komfort i mange
                typer behandlinger.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal
            className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            y={35}
            stagger={0.08}
          >
            {technologyFeatures.map((feature) => {
              const Icon = feature.icon

              return (
                <article
                  key={feature.title}
                  className="rounded-[2rem] border border-white/[0.08] bg-white/[0.045] p-7 backdrop-blur-sm transition-all duration-300 hover:border-[#0099E8]/25 hover:bg-white/[0.06]"
                >
                  <div className="inline-flex rounded-2xl border border-[#0099E8]/20 bg-[#0073C9]/15 p-4 text-[#33B5F5]">
                    <Icon size={28} strokeWidth={1.7} />
                  </div>

                  <h4 className="mt-5 text-xl font-semibold text-white">
                    {feature.title}
                  </h4>

                  <p className="mt-3 leading-relaxed text-white/55">
                    {feature.description}
                  </p>
                </article>
              )
            })}
          </ScrollReveal>

          {/* Behandlingsområder */}
          <ScrollReveal y={35}>
            <div className="mt-28 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#F2A900]">
                    Behandlingsområder
                  </p>

                  <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                    Laser kan brukes i flere typer behandlinger
                  </h3>

                  <p className="mt-4 max-w-2xl leading-relaxed text-white/58">
                    Fotona®-plattformen gir oss mulighet til å arbeide innen
                    både hardt og bløtt vev. Hvilke behandlinger som er aktuelle
                    for deg vurderes alltid individuelt etter kliniske funn,
                    behov og mål.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {treatmentGroups.map((group) => (
                    <div
                      key={group}
                      className="rounded-2xl border border-white/10 bg-[#0B1629]/80 px-4 py-4 text-sm text-white/78"
                    >
                      <div className="flex items-start gap-3">
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-[#33B5F5]"
                        />
                        <span>{group}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Behandlingskort */}
          <ScrollReveal y={40}>
            <div className="mb-10 mt-28 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#33B5F5]">
                Laserbehandlinger
              </p>

              <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                Hva kan vi hjelpe deg med?
              </h3>

              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/55">
                Under ser du noen av behandlingsområdene der laser kan være en
                relevant del av behandlingen.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            y={40}
            stagger={0.08}
          >
            {laserTreatments.map((treatment) => {
              const Icon = treatment.icon

              return (
                <article
                  key={treatment.title}
                  className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.045] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#0099E8]/30 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-black/25"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0099E8]/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-5">
                    <div className="inline-flex rounded-2xl border border-[#0099E8]/20 bg-[#0073C9]/15 p-4 text-[#33B5F5] transition-all duration-500 group-hover:scale-105 group-hover:bg-[#0073C9]/25">
                      <Icon size={29} strokeWidth={1.5} />
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/45">
                      {treatment.eyebrow}
                    </span>
                  </div>

                  <h4 className="mt-7 font-display text-2xl font-semibold text-white">
                    {treatment.title}
                  </h4>

                  <p className="mt-4 flex-1 leading-relaxed text-white/54">
                    {treatment.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {treatment.benefits.slice(0, 2).map((benefit) => (
                      <span
                        key={benefit}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/60"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

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

          {/* Trygghet / vurdering */}
          <ScrollReveal y={30}>
            <div className="mt-24 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[2rem] border border-white/10 bg-[#0B1629]/90 p-8">
                <div className="inline-flex rounded-2xl border border-[#F2A900]/20 bg-[#F2A900]/10 p-4 text-[#F2A900]">
                  <Stethoscope size={28} />
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold">
                  Individuell vurdering først
                </h3>

                <p className="mt-4 leading-relaxed text-white/60">
                  Ikke alle behandlinger passer for alle. Derfor starter vi med
                  en vurdering av symptomer, kliniske funn og behandlingsmål før
                  vi anbefaler om laser er riktig løsning for deg.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#0073C9]/15 to-[#0099E8]/5 p-8">
                <div className="inline-flex rounded-2xl border border-[#0099E8]/20 bg-[#0073C9]/15 p-4 text-[#33B5F5]">
                  <CircleHelp size={28} />
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold">
                  Hva kan du forvente?
                </h3>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/70">
                    Presis og målrettet behandling i utvalgte områder
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/70">
                    Skånsom tilnærming med moderne utstyr
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/70">
                    Behandlingsplan som tilpasses dine behov
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/70">
                    Tydelig forklaring før behandling starter
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal y={30}>
            <div className="mt-16 flex flex-col items-center rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#0073C9]/15 to-[#0099E8]/5 px-6 py-10 text-center backdrop-blur-sm sm:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F2A900]">
                Er laserbehandling aktuelt for deg?
              </p>

              <h3 className="mt-4 font-display text-3xl font-bold">
                Bestill en personlig konsultasjon
              </h3>

              <p className="mt-4 max-w-2xl leading-relaxed text-white/55">
                Vi vurderer dine behov og forklarer hvilke muligheter
                laserteknologien kan gi – og om dette er riktig behandling for
                deg.
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
          <div className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] border border-white/10 bg-[#0B1629] p-6 text-white shadow-2xl shadow-black/50 sm:rounded-[2rem] sm:p-9">
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

            <p className="mt-6 leading-relaxed text-white/62">
              {selectedTreatment.details}
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold">Kan være aktuelt ved</h3>

                <ul className="mt-5 space-y-4">
                  {selectedTreatment.idealFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-white/65"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0073C9]/20 text-[#33B5F5]">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold">Mulige fordeler</h3>

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
            </div>

            <div className="mt-8 rounded-3xl border border-[#F2A900]/15 bg-[#F2A900]/8 p-5 text-sm leading-relaxed text-white/70">
              Behandlingsopplegg og egnethet vurderes alltid individuelt. Vi
              forklarer hva som passer for deg, hva du kan forvente, og hvilke
              alternativer som finnes.
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