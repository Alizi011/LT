import { Scan, Microscope, Zap, Shield } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const technologies = [
  {
    icon: Zap,
    title: 'Fotona® Lasersystem',
    description: 'Avansert laserteknologi for skånsom og effektiv behandling av tannkjøtt, søvnproblemer og mer.',
  },
  {
    icon: Scan,
    title: 'Digital 3D-scanning',
    description: 'Presis diagnostikk med CBCT 3D-røntgen. Detaljert oversikt over tenner, kjever og strukturer.',
  },
  {
    icon: Microscope,
    title: 'Mikroskopisk presisjon',
    description: 'Ultrapresis behandling ved rotfylling og estetisk restaurering på mikroskopisk nivå.',
  },
  {
    icon: Shield,
    title: 'Rigide rutiner',
    description: 'Toppmoderne sterilisering og infeksjonskontroll for din sikkerhet.',
  },
]

export default function TechnologySection() {
  return (
    <section className="relative overflow-hidden bg-[#F0F5FA] py-24 md:py-32">
      <div className="absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#0073C9]/3 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal y={30}>
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full bg-[#0073C9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0073C9]">
              Moderne teknologi
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-[#0B1120] md:text-5xl">
              Vi investerer i <span className="gradient-text">fremtiden</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[#5A6B78]">
              Det nyeste innen digital teknologi for presise behandlinger og best mulig resultat
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="grid gap-6 sm:grid-cols-2" y={40} stagger={0.1}>
          {technologies.map((tech) => {
            const Icon = tech.icon
            return (
              <div
                key={tech.title}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0073C9]/10 lg:p-10"
              >
                {/* Gradient accent corner */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#0073C9]/10 to-[#0099E8]/5 transition-transform duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-[#0073C9]/10 to-[#0099E8]/5 p-4">
                    <Icon size={32} className="text-[#0073C9]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1120]">{tech.title}</h3>
                  <p className="mt-3 text-[#5A6B78] leading-relaxed">{tech.description}</p>
                </div>
              </div>
            )
          })}
        </ScrollReveal>
      </div>
    </section>
  )
}
