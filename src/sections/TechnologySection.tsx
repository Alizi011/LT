import { Heart, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react'

import ScrollReveal from '@/components/ScrollReveal'

const strengths = [
  {
    icon: Sparkles,
    title: 'Fotona® laserteknologi',
    description:
      'Moderne laserbehandling for utvalgte plager i munnhulen, med fokus på presisjon, komfort og skånsom behandling.',
  },
  {
    icon: Heart,
    title: 'Trygghet ved tannlegeskrekk',
    description:
      'Vi tar oss god tid, forklarer underveis og tilpasser behandlingen slik at du kan føle deg trygg i stolen.',
  },
  {
    icon: Stethoscope,
    title: 'Komplett tannbehandling',
    description:
      'Fra undersøkelser og fyllinger til rotfylling, kroner, broer, proteser og akutt tannhjelp.',
  },
  {
    icon: ShieldCheck,
    title: 'Grundig og personlig oppfølging',
    description:
      'Du får tydelig informasjon, individuell behandlingsplan og oppfølging gjennom hele behandlingsforløpet.',
  },
]

export default function TechnologySection() {
  return (
    <section className="relative overflow-hidden bg-[#F0F5FA] py-24 md:py-32">
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#0073C9]/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#F2A900]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal y={30}>
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full bg-[#0073C9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0073C9]">
              Hvorfor velge oss
            </span>

            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-[#0B1120] md:text-5xl">
              Trygg behandling med{' '}
              <span className="gradient-text">moderne muligheter</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#5A6B78]">
              Hos Lørenskog Tannlegesenter kombinerer vi ordinær tannbehandling
              med moderne Fotona®-laser og personlig oppfølging.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal
          className="grid gap-6 sm:grid-cols-2"
          y={40}
          stagger={0.1}
        >
          {strengths.map((strength) => {
            const Icon = strength.icon

            return (
              <article
                key={strength.title}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0073C9]/10 lg:p-10"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#0073C9]/10 to-[#0099E8]/5 transition-transform duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-[#0073C9]/10 to-[#0099E8]/5 p-4 transition-transform duration-500 group-hover:scale-105">
                    <Icon
                      size={32}
                      className="text-[#0073C9]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1120]">
                    {strength.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-[#5A6B78]">
                    {strength.description}
                  </p>
                </div>
              </article>
            )
          })}
        </ScrollReveal>
      </div>
    </section>
  )
}