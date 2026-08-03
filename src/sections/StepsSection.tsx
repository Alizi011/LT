import { Phone, ClipboardCheck, Sparkles } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Kontakt oss',
    description: 'Ring 67 90 40 90 eller bestill online. Kvelds- og helgetimer etter avtale.',
    color: 'from-[#0073C9] to-[#0099E8]',
  },
  {
    number: '02',
    icon: ClipboardCheck,
    title: 'Grundig undersøkelse',
    description: 'Moderne diagnostikk og personlig behandlingsplan. 30% rabatt for nye pasienter.',
    color: 'from-[#0073C9] to-[#00B4D8]',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Personlig behandling',
    description: 'Skånsom behandling tilpasset dine behov. Vi følger deg opp hele veien.',
    color: 'from-[#0099E8] to-[#00D26A]',
  },
]

export default function StepsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-24 md:py-32">
      {/* Dekorative gradienter */}
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#0073C9]/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal y={30}>
          <div className="mb-20 text-center">
            <span className="inline-block rounded-full bg-[#0073C9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0099E8]">
              Din reise hos oss
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Tre enkle steg til et{' '}
              <span className="text-[#F2A900]">sunnere smil</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Koblingslinje mellom steg */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-[#0073C9]/40 via-[#0099E8]/40 to-[#00D26A]/40 md:block" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <ScrollReveal key={step.number} y={50} delay={i * 0.15}>
                <div className="relative text-center">
                  {/* Nummer */}
                  <div className={`relative z-10 mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${step.color} shadow-xl`}>
                    <Icon size={32} className="text-white" strokeWidth={1.5} />
                  </div>
                  {/* Nummer-badge */}
                  <span className="absolute -top-2 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#0B1120] px-3 py-0.5 text-xs font-bold text-[#F2A900] ring-1 ring-[#F2A900]/30">
                    {step.number}
                  </span>

                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/40">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
