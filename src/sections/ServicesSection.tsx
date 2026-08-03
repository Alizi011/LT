import { Stethoscope, Sparkles, Zap, Heart, Clock, Smile } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const services = [
  {
    icon: Zap,
    title: 'Laserbehandlinger',
    description: 'Skånsom laserteknologi mot snorking, tørr munn, tannkjøtt og betennelser — uten kirurgi.',
    highlight: true,
  },
  {
    icon: Stethoscope,
    title: 'Generell tannhelse',
    description: 'Undersøkelser, tannrens, fyllinger og rotbehandling. Forebygging i fokus.',
    highlight: false,
  },
  {
    icon: Heart,
    title: 'Tannlegeskrekk',
    description: 'Spesialister på angst. Beroligende behandling i trygge omgivelser. Gratis konsultasjon.',
    highlight: false,
  },
  {
    icon: Sparkles,
    title: 'Estetisk tannbehandling',
    description: 'Tannbleking, porselenfasetter, kroner og broer. Få et smil du elsker.',
    highlight: false,
  },
  {
    icon: Clock,
    title: 'Akutthjelp',
    description: 'Tannverk, skader og uforutsette problemer. Time på dagen, også kveld og helg.',
    highlight: false,
  },
  {
    icon: Smile,
    title: 'Tannkirurgi',
    description: 'Trekking av visdomstenner, implantater og kirurgiske inngrep med moderne utstyr.',
    highlight: false,
  },
]

export default function ServicesSection() {
  return (
    <section id="tjenester" className="relative bg-[#0B1120] py-24 md:py-32">
      {/* Gradient top */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0B1120] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal y={30}>
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full bg-[#0073C9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0099E8]">
              Våre tjenester
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Komplett tannhelse{' '}
              <span className="gradient-text">under ett tak</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/40">
              Fra forebyggende kontroller til avansert laserbehandling
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" y={40} stagger={0.08}>
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-500 hover:-translate-y-2 ${
                  service.highlight
                    ? 'border-[#0073C9]/30 bg-gradient-to-br from-[#0073C9]/20 to-[#0099E8]/10 shadow-lg shadow-[#0073C9]/10'
                    : 'border-white/[0.06] bg-white/[0.03] hover:border-white/[0.1] hover:bg-white/[0.06]'
                }`}
              >
                <div className={`mb-6 inline-flex rounded-2xl p-4 ${
                  service.highlight
                    ? 'bg-gradient-to-br from-[#0073C9] to-[#0099E8] shadow-lg shadow-[#0073C9]/30'
                    : 'bg-white/[0.06]'
                }`}>
                  <Icon size={28} className={service.highlight ? 'text-white' : 'text-[#0099E8]'} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/40">{service.description}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#0099E8] opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Les mer <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            )
          })}
        </ScrollReveal>
      </div>
    </section>
  )
}
