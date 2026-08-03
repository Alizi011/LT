import { ShieldCheck, Heart, Award } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const qualities = [
  { icon: ShieldCheck, label: 'Trygge, hygieniske forhold' },
  { icon: Heart, label: 'Personlig oppfølging' },
  { icon: Award, label: 'Dokumentert kvalitet' },
]

export default function AboutSection() {
  return (
    <section id="om-oss" className="relative overflow-hidden bg-[#0B1120] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Venstre - tekst */}
          <ScrollReveal y={40}>
            <div>
              <span className="inline-block rounded-full bg-[#0073C9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0099E8]">
                Om oss
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
                Din tannklinikk i{' '}
                <span className="text-[#F2A900]">Lørenskog</span>
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/50">
                <p>
                  Lørenskog Tannlegesenter er en velutstyrt og moderne tannklinikk i 
                  hyggelige omgivelser ved Lørenskog/Solheim.
                </p>
                <p>
                  Gjennom mange års erfaring og god kommunikasjon tilbyr vi smertefri og 
                  behagelig behandling. Vi tilbyr kvelds- og helgetimer, og ved akutte 
                  tannproblemer har vi time på dagen.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {qualities.map((q) => {
                  const Icon = q.icon
                  return (
                    <div key={q.label} className="flex items-center gap-2.5 rounded-full glass px-5 py-2.5">
                      <Icon size={18} className="text-[#F2A900]" />
                      <span className="text-sm font-medium text-white/70">{q.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Høyre - bilde med overlappende elementer */}
          <ScrollReveal y={40} delay={0.2}>
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-black/30">
                <img
                  src="/clinic-interior.jpg"
                  alt="Klinikk interiør"
                  className="w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Flytende stat-kort */}
              <div className="absolute -left-6 bottom-12 rounded-2xl bg-white p-6 shadow-xl">
                <p className="font-display text-4xl font-bold text-[#0073C9]">20+</p>
                <p className="text-sm text-[#5A6B78]">år i drift</p>
              </div>
              <div className="absolute -right-4 top-8 rounded-2xl bg-gradient-to-br from-[#0073C9] to-[#0099E8] p-5 shadow-lg shadow-[#0073C9]/30">
                <p className="text-lg font-bold text-white">Åpent i dag</p>
                <p className="text-sm text-white/70">08:00 — 16:00</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
