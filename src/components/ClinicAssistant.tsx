import { useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { createPortal } from 'react-dom'
import {
  Bot,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

type ChatMessage = {
  id: number
  role: 'assistant' | 'user'
  text: string
}

type QuickQuestion = {
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const quickQuestions: QuickQuestion[] = [
  { label: 'Hva koster en undersøkelse?', icon: CircleDollarSign },
  { label: 'Tilbyr dere laserbehandling?', icon: Sparkles },
  { label: 'Jeg har tannlegeskrekk', icon: ShieldCheck },
  { label: 'Hvordan bestiller jeg time?', icon: CalendarDays },
]

const answers = [
  {
    keywords: ['pris', 'koster', 'kostnad', 'undersøkelse', 'røntgen'],
    answer:
      'En vanlig undersøkelse inkl. røntgen og rens er oppført til 1 340 kr. En akutt undersøkelse er oppført til 690 kr. Pris kan variere etter behandlingsbehov.',
  },
  {
    keywords: ['laser', 'fotona', 'nightlase', 'snork', 'tørr munn'],
    answer:
      'Ja. Klinikken presenterer Fotona-laser som en del av behandlingstilbudet, blant annet for NightLase/snorking, tannkjøttbehandling, tørr munn og enkelte munnsår. Endelig behandlingsvurdering gjøres av tannlege.',
  },
  {
    keywords: ['tannlegeskrekk', 'redd', 'angst', 'nervøs', 'nervos'],
    answer:
      'Klinikken legger vekt på rolig og trygg oppfølging ved tannlegeskrekk. Du kan gjerne si fra allerede når du bestiller time, slik at besøket kan tilpasses.',
  },
  {
    keywords: ['bestill', 'time', 'booking', 'booke', 'avtale'],
    answer:
      'Du kan kontakte klinikken for å bestille time. I den ferdige løsningen kan denne assistenten sende deg direkte videre til booking eller kontaktskjema.',
  },
  {
    keywords: ['åpent', 'åpning', 'åpningstid', 'når', 'timer'],
    answer:
      'Oppgitt åpningstid er mandag–fredag kl. 08:00–16:00. Ta kontakt med klinikken for å bekrefte tilgjengelighet på ønsket tidspunkt.',
  },
  {
    keywords: ['akutt', 'verk', 'tannverk', 'skade', 'smerte', 'vondt'],
    answer:
      'Ved akutt tannverk eller skade tilbyr klinikken akutthjelp. Kontakt klinikken så raskt som mulig for å høre om ledig akutt-time.',
  },
  {
    keywords: ['kontakt', 'telefon', 'epost', 'e-post', 'adresse'],
    answer:
      'Du kan kontakte Lørenskog Tannlegesenter på telefon 67 90 40 90 eller e-post kontakt@lorenskogtannlege.no. Adressen er Skårersletta 10, 1473 Lørenskog.',
  },
]

function findAnswer(question: string) {
  const normalized = question.toLowerCase()

  let bestMatch: { score: number; answer: string } | null = null

  for (const item of answers) {
    const score = item.keywords.reduce(
      (total, keyword) => total + (normalized.includes(keyword) ? 1 : 0),
      0,
    )

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { score, answer: item.answer }
    }
  }

  return (
    bestMatch?.answer ??
    'Jeg kan foreløpig hjelpe med behandlinger, priser, åpningstider, laser, tannlegeskrekk, akutthjelp og timebestilling. Prøv gjerne å spørre på en annen måte.'
  )
}

export default function ClinicAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'assistant',
      text: 'Hei! Jeg er den digitale klinikkassistenten. Hva kan jeg hjelpe deg med?',
    },
  ])

  const nextId = useRef(2)

  const canSend = useMemo(() => input.trim().length > 0, [input])

  const sendQuestion = (question: string) => {
    const clean = question.trim()
    if (!clean) return

    const userMessage: ChatMessage = {
      id: nextId.current++,
      role: 'user',
      text: clean,
    }

    const assistantMessage: ChatMessage = {
      id: nextId.current++,
      role: 'assistant',
      text: findAnswer(clean),
    }

    setMessages((current) => [...current, userMessage, assistantMessage])
    setInput('')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    sendQuestion(input)
  }

  return createPortal(
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`fixed bottom-52 right-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#0073C9] text-white shadow-[0_14px_38px_rgba(0,115,201,0.30)] transition hover:-translate-y-0.5 hover:bg-[#0065AF] sm:bottom-24 sm:right-6 sm:h-auto sm:w-auto sm:gap-3 sm:px-5 sm:py-3.5 ${
          open ? 'pointer-events-none scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Åpne digital klinikkassistent"
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
          <MessageCircle size={19} />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0073C9] bg-emerald-400" />
        </span>

        <span className="hidden text-left sm:block">
          <span className="block text-xs font-semibold text-white/70">Spør klinikken</span>
          <span className="block text-sm font-bold">Digital assistent</span>
        </span>
      </button>

      <div
        className={`fixed inset-0 z-[10000] transition ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-[#07101D]/45 backdrop-blur-[2px] transition-opacity ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
          aria-label="Lukk assistent"
        />

        <section
          className={`absolute bottom-0 right-0 flex h-[min(760px,92vh)] w-full max-w-[430px] flex-col overflow-hidden rounded-t-[28px] border border-white/10 bg-white shadow-[-18px_-5px_70px_rgba(2,12,27,0.22)] transition duration-300 sm:bottom-24 sm:right-6 sm:h-[680px] sm:rounded-[28px] ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <header className="bg-[#0B1120] px-5 pb-5 pt-5 text-white">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0073C9]">
                <Bot size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold">Klinikkassistent</h2>
                  <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
                    Demo
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-white/55">
                  Lørenskog Tannlegesenter
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Lukk"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-[11px] text-white/55">
              <ShieldCheck size={14} className="shrink-0 text-[#59B9F2]" />
              Demoen gir generell klinikkinformasjon, ikke medisinsk diagnose.
            </div>
          </header>

          <div className="flex-1 overflow-y-auto bg-[#F6F8FA] px-4 py-5">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'rounded-br-md bg-[#0073C9] text-white'
                        : 'rounded-bl-md border border-[#E4EAF0] bg-white text-[#465360] shadow-[0_5px_20px_rgba(15,23,42,0.035)]'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {messages.length <= 3 && (
              <div className="mt-5">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8A96A2]">
                  Vanlige spørsmål
                </p>

                <div className="space-y-2">
                  {quickQuestions.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => sendQuestion(item.label)}
                        className="group flex w-full items-center gap-3 rounded-xl border border-[#E3E9EE] bg-white px-3.5 py-3 text-left text-sm font-medium text-[#53606D] transition hover:border-[#BBD9EE] hover:bg-[#F8FCFF]"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EDF6FD] text-[#0073C9]">
                          <Icon size={16} />
                        </div>
                        <span>{item.label}</span>
                        <ChevronRight
                          size={15}
                          className="ml-auto text-[#A9B3BD] transition group-hover:translate-x-0.5"
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-[#E5EAF0] bg-white p-4">
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <div className="flex-1 rounded-2xl border border-[#DDE5EC] bg-[#FAFBFC] px-4 py-3 focus-within:border-[#9DCAE9] focus-within:bg-white">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault()
                      if (canSend) sendQuestion(input)
                    }
                  }}
                  rows={1}
                  placeholder="Skriv et spørsmål..."
                  className="max-h-24 w-full resize-none bg-transparent text-sm text-[#26313C] outline-none placeholder:text-[#A1ACB7]"
                />
              </div>

              <button
                type="submit"
                disabled={!canSend}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0073C9] text-white transition hover:bg-[#0065AF] disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Send"
              >
                <Send size={18} />
              </button>
            </form>

            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-[#9AA5AF]">
              <Clock3 size={11} />
              Demo uten ekstern AI eller løpende API-kostnad
            </div>
          </div>
        </section>
      </div>
    </>,
    document.body,
  )
}
