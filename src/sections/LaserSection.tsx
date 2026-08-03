import { CheckCircle2, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const laserTreatments = [
  { title: 'Laser mot snorking og søvnapné', desc: 'Skånsom laser som strammer opp vev i halsen og reduserer snorking effektivt.' },
  { title: 'Laser mot tørr munn (xerostomi)', desc: 'Stimulerer spyttproduksjonen og gir lindring ved tørrhet og ubehag.' },
  { title: 'Laser ved tannkjøttbetennelse', desc: 'Laser reduserer betennelse og bakterier — og forbedrer helsen i tannkjøttet.' },
  { title: 'Laser ved sår, herpes og betennelser', desc: 'Effektiv behandling av sår, herpes, betennelser og munnsår på dager.' },
]

export default function LaserSection() {
  return (
    <section id="laser" className="relative overflow-hidden bg-[#F0F5FA] py-24 md:py-32">
      {/* Dekorative elementer */}
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#0073C9]/5 blur-3xl" />
      <div className="absolute -left-40 -bottom-40 h-96 w-96 rounded-full bg-[#F2A900]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Venstre kolonne - bilde */}
          <ScrollReveal y={40}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-[#0073C9]/10">
                <img
                  src="/laser-dentistry.jpg"
                  alt="Laserbehandling"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/30 to-transparent" />
              </div>
              {/* Flytende kort */}
              <div className="absolute -bottom-8 -left-6 rounded-2xl bg-white p-6 shadow-xl shadow-black/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0073C9] to-[#0099E8] text-white text-lg font-bold shadow-lg shadow-[#0073C9]/30">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B1120]">Smertefritt</p>
                    <p className="text-sm text-[#5A6B78]">Ingen bedøvelse nødvendig</p>
                  </div>
                </div>
              </div>
              {/* Flytende kort 2 */}
              <div className="absolute -right-4 top-8 rounded-2xl bg-white p-5 shadow-xl shadow-black/5">
                <p className="text-3xl font-bold text-[#F2A900]">98%</p>
                <p className="text-sm text-[#5A6B78]">Pasienttilfredshet</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Høyre kolonne - tekst */}
          <ScrollReveal y={40} delay={0.2}>
            <div>
              <span className="inline-block rounded-full bg-[#0073C9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0073C9]">
                Laserbehandlinger
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-[#0B1120] md:text-5xl">
                Skånsomt. Effektivt.{' '}
                <span className="text-[#0073C9]">Fremtidsrettet.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#5A6B78]">
                Våre laserbehandlinger er smertefrie, trygge og gir raskere tilheling — 
                uten kirurgi eller bivirkninger. Fotona® laserteknologi åpner nye muligheter.
              </p>

              <div className="mt-8 space-y-5">
                {laserTreatments.map((treatment) => (
                  <div
                    key={treatment.title}
                    className="group flex gap-4 rounded-xl bg-white/60 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md"
                  >
                    <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-[#0073C9]" />
                    <div>
                      <p className="font-medium text-[#0B1120]">{treatment.title}</p>
                      <p className="mt-0.5 text-sm text-[#5A6B78]">{treatment.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#kontakt"
                onClick={(e) => { e.preventDefault(); document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0073C9] to-[#0099E8] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#0073C9]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Book laserbehandling
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
