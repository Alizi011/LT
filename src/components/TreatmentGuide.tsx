import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TriangleAlert,
  X,
} from 'lucide-react'

type Answer = {
  label: string
  value: string
  description?: string
}

type Step = {
  id: string
  question: string
  helper: string
  answers: Answer[]
}

const steps: Step[] = [
  {
    id: 'need',
    question: 'Hva ønsker du hjelp med?',
    helper: 'Velg det som passer best.',
    answers: [
      { label: 'Tannverk eller akutt problem', value: 'acute', description: 'Smerte, skade, mistet fylling eller lignende' },
      { label: 'Vanlig undersøkelse', value: 'checkup', description: 'Kontroll, røntgen og tannrens' },
      { label: 'Tannlegeskrekk', value: 'fear', description: 'Jeg ønsker ekstra ro og tilrettelegging' },
      { label: 'Laserbehandling', value: 'laser', description: 'Fotona, NightLase, tannkjøtt eller tørr munn' },
      { label: 'Estetisk behandling', value: 'aesthetic', description: 'Bleking, kroner, fasetter eller forbedring av smilet' },
    ],
  },
  {
    id: 'urgency',
    question: 'Hvor raskt ønsker du hjelp?',
    helper: 'Dette brukes bare til å foreslå riktig neste steg.',
    answers: [
      { label: 'Så raskt som mulig', value: 'now', description: 'Helst i dag eller nærmeste ledige time' },
      { label: 'I løpet av noen dager', value: 'soon', description: 'Det haster litt, men er ikke akutt' },
      { label: 'Jeg planlegger fremover', value: 'later', description: 'Vanlig time passer fint' },
    ],
  },
  {
    id: 'comfort',
    question: 'Hvordan føler du deg før tannlegebesøk?',
    helper: 'Klinikken kan tilpasse besøket hvis du er urolig eller redd.',
    answers: [
      { label: 'Helt komfortabel', value: 'comfortable' },
      { label: 'Litt nervøs', value: 'nervous' },
      { label: 'Jeg har tannlegeskrekk', value: 'fearful' },
    ],
  },
  {
    id: 'contact',
    question: 'Hvordan vil du helst gå videre?',
    helper: 'Dette er kun en demo. Ingen informasjon sendes.',
    answers: [
      { label: 'Bestill time', value: 'booking', description: 'Gå videre til timebestilling' },
      { label: 'Bli kontaktet', value: 'callback', description: 'Klinikken kan ringe deg tilbake' },
      { label: 'Les mer først', value: 'learn', description: 'Se relevant informasjon om behandlingen' },
    ],
  },
]

type Result = {
  title: string
  description: string
  badge: string
  action: string
  icon: typeof Stethoscope
}

function getResult(answers: Record<string, string>): Result {
  if (answers.need === 'acute' || answers.urgency === 'now') {
    return {
      title: 'Akutthjelp passer best',
      description:
        'Basert på svarene dine bør du kontakte klinikken for å avklare behovet og høre om nærmeste ledige akuttime.',
      badge: 'Rask kontakt anbefales',
      action: 'Kontakt klinikken',
      icon: TriangleAlert,
    }
  }

  if (answers.need === 'laser') {
    return {
      title: 'Laser / Fotona kan være relevant',
      description:
        'Klinikken tilbyr informasjon om blant annet Fotona, NightLase/snorking, tannkjøttbehandling og tørr munn.',
      badge: 'Fotona / laser',
      action: 'Bestill vurdering',
      icon: Sparkles,
    }
  }

  if (answers.need === 'fear' || answers.comfort === 'fearful') {
    return {
      title: 'Tilrettelagt time ved tannlegeskrekk',
      description:
        'Du kan få en roligere start med ekstra tid og tydelig kommunikasjon. Si gjerne fra allerede ved bestilling.',
      badge: 'Trygg og rolig oppfølging',
      action: 'Bestill tilrettelagt time',
      icon: HeartHandshake,
    }
  }

  if (answers.need === 'aesthetic') {
    return {
      title: 'Estetisk konsultasjon',
      description:
        'En konsultasjon kan brukes til å avklare mål, muligheter og pris før behandling.',
      badge: 'Estetisk tannbehandling',
      action: 'Bestill konsultasjon',
      icon: Sparkles,
    }
  }

  return {
    title: 'Vanlig undersøkelse er et godt utgangspunkt',
    description:
      'En undersøkelse gir tannlegen mulighet til å vurdere tannhelsen din og eventuelt foreslå videre behandling.',
    badge: 'Undersøkelse',
    action: 'Bestill undersøkelse',
    icon: Stethoscope,
  }
}

export default function TreatmentGuide() {
  const [open, setOpen] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [finished, setFinished] = useState(false)

  const step = steps[stepIndex]
  const selected = answers[step.id]
  const progress = finished ? 100 : ((stepIndex + 1) / steps.length) * 100
  const result = useMemo(() => getResult(answers), [answers])
  const ResultIcon = result.icon

  const choose = (value: string) => {
    setAnswers((current) => ({ ...current, [step.id]: value }))
  }

  const next = () => {
    if (!selected) return

    if (stepIndex === steps.length - 1) {
      setFinished(true)
      return
    }

    setStepIndex((current) => current + 1)
  }

  const back = () => {
    if (finished) {
      setFinished(false)
      return
    }

    if (stepIndex > 0) {
      setStepIndex((current) => current - 1)
    }
  }

  const reset = () => {
    setAnswers({})
    setStepIndex(0)
    setFinished(false)
  }

  const close = () => setOpen(false)

  useEffect(() => {
    const openGuide = () => setOpen(true)
    window.addEventListener('open-treatment-guide', openGuide)

    return () => {
      window.removeEventListener('open-treatment-guide', openGuide)
    }
  }, [])

  return (
    <>
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[12000] flex items-center justify-center p-3 sm:p-6">
            <button
              type="button"
              aria-label="Lukk behandlingsveiviser"
              onClick={close}
              className="absolute inset-0 bg-[#07101D]/70 backdrop-blur-sm"
            />

            <div className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
              <header className="flex items-center justify-between gap-4 border-b border-[#E4EBF0] bg-[#0B1120] px-5 py-4 text-white sm:px-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#59B9F2]">
                    Behandlingsveiviser
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    Fire enkle spørsmål – ingen opplysninger lagres
                  </p>
                </div>

                <button
                  type="button"
                  onClick={close}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label="Lukk"
                >
                  <X size={19} />
                </button>
              </header>

              <div className="overflow-y-auto">
                <div className="border-b border-[#E8EEF3] px-5 py-4 sm:px-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0073C9]">
                        {finished ? 'Ferdig' : `Steg ${stepIndex + 1} av ${steps.length}`}
                      </p>
                      <p className="mt-1 text-xs text-[#82909D]">
                        {finished ? 'Ditt foreslåtte neste steg' : 'Finn riktig inngang til klinikken'}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-[#0B1120]">{Math.round(progress)}%</p>
                      <p className="text-[11px] text-[#95A1AD]">fullført</p>
                    </div>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EAF0F4]">
                    <div
                      className="h-full rounded-full bg-[#0073C9] transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {!finished ? (
                  <div className="grid lg:grid-cols-[1fr_300px]">
                    <main className="p-5 sm:p-7 lg:p-8">
                      <h3 className="text-2xl font-bold tracking-tight text-[#0B1120] sm:text-3xl">
                        {step.question}
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#74818E]">
                        {step.helper}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {step.answers.map((answer) => {
                          const isSelected = selected === answer.value

                          return (
                            <button
                              key={answer.value}
                              type="button"
                              onClick={() => choose(answer.value)}
                              className={`min-h-[88px] rounded-2xl border p-4 text-left transition ${
                                isSelected
                                  ? 'border-[#0073C9] bg-[#EFF8FE] shadow-[0_0_0_1px_#0073C9]'
                                  : 'border-[#E0E7ED] bg-white hover:border-[#B8D9EF] hover:bg-[#FAFDFF]'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                                    isSelected
                                      ? 'border-[#0073C9] bg-[#0073C9] text-white'
                                      : 'border-[#C8D2DC] text-transparent'
                                  }`}
                                >
                                  <CheckCircle2 size={15} />
                                </div>

                                <div>
                                  <p className="font-semibold text-[#17212B]">{answer.label}</p>
                                  {answer.description && (
                                    <p className="mt-1 text-xs leading-relaxed text-[#7D8995]">
                                      {answer.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>

                      <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={back}
                          disabled={stepIndex === 0}
                          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#DDE5EB] px-4 py-2.5 text-sm font-semibold text-[#5F6C79] transition hover:bg-[#F7F9FB] disabled:opacity-35"
                        >
                          <ArrowLeft size={16} />
                          Tilbake
                        </button>

                        <button
                          type="button"
                          onClick={next}
                          disabled={!selected}
                          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0073C9] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0065AF] disabled:opacity-35"
                        >
                          {stepIndex === steps.length - 1 ? 'Se anbefaling' : 'Neste'}
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </main>

                    <aside className="border-t border-[#E7EDF2] bg-[#F7FAFC] p-5 sm:p-6 lg:border-l lg:border-t-0">
                      <div className="rounded-2xl bg-[#0B1120] p-5 text-white">
                        <ShieldCheck size={23} className="text-[#59B9F2]" />
                        <h4 className="mt-4 font-bold">Trygg veiledning</h4>
                        <p className="mt-2 text-sm leading-relaxed text-white/60">
                          Veiviseren foreslår bare neste steg. Den stiller ikke diagnose.
                        </p>
                      </div>
                    </aside>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-[1fr_320px]">
                    <main className="p-5 sm:p-7 lg:p-8">
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FC] px-3 py-1.5 text-xs font-bold text-[#0073C9]">
                        <ResultIcon size={14} />
                        {result.badge}
                      </div>

                      <h3 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-[#0B1120]">
                        {result.title}
                      </h3>

                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#687684]">
                        {result.description}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <button
                          type="button"
                          className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#0073C9] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0065AF]"
                        >
                          <CalendarDays size={17} />
                          {result.action}
                        </button>

                        <button
                          type="button"
                          onClick={reset}
                          className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#DCE4EA] px-5 py-3 text-sm font-semibold text-[#5F6C79] transition hover:bg-[#F7F9FB]"
                        >
                          Start på nytt
                        </button>
                      </div>
                    </main>

                    <aside className="border-t border-[#E7EDF2] bg-[#F7FAFC] p-5 sm:p-6 lg:border-l lg:border-t-0">
                      <h4 className="font-bold text-[#0B1120]">Oppsummering</h4>

                      <div className="mt-5 space-y-3">
                        {steps.map((item) => {
                          const value = answers[item.id]
                          const answer = item.answers.find((candidate) => candidate.value === value)

                          return (
                            <div key={item.id} className="rounded-xl border border-[#E0E7ED] bg-white p-4">
                              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#98A3AE]">
                                {item.question}
                              </p>
                              <p className="mt-1.5 text-sm font-semibold text-[#465360]">
                                {answer?.label ?? 'Ikke besvart'}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </aside>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
