import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import ScrollReveal from '@/components/ScrollReveal'

const contactInfo = [
  { icon: Phone, label: 'Telefon', value: '67 90 40 90', href: 'tel:67904090' },
  { icon: Mail, label: 'E-post', value: 'kontakt@lorenskogtannlege.no', href: 'mailto:kontakt@lorenskogtannlege.no' },
  { icon: MapPin, label: 'Adresse', value: 'Skårersletta 10, 1473 Lørenskog', href: '#' },
  { icon: Clock, label: 'Åpningstider', value: 'Man–Fre: 08:00–16:00', subValue: 'Akutt: Kveld/helg etter avtale', href: '#' },
]

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [consent, setConsent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true) }

  return (
    <section id="kontakt" className="relative overflow-hidden bg-[#0B1120] py-24 md:py-32">
      <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#0073C9]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Venstre - info */}
          <ScrollReveal y={30} x={-30}>
            <div>
              <span className="inline-block rounded-full bg-[#0073C9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0099E8]">
                Kontakt
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
                Bestill <span className="gradient-text">time i dag</span>
              </h2>
              <p className="mt-5 text-lg text-white/40">
                Vi tar gjerne imot nye pasienter. Ved akutte problemer tilbyr vi time på dagen.
              </p>

              <div className="mt-10 space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  return (
                    <a
                      key={info.label}
                      href={info.href}
                      className="group flex items-start gap-4 rounded-2xl glass p-5 transition-all duration-300 hover:bg-white/[0.12]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0073C9] to-[#0099E8] shadow-lg shadow-[#0073C9]/20">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/30">{info.label}</p>
                        <p className="mt-1 text-base font-medium text-white">{info.value}</p>
                        {info.subValue && <p className="text-sm text-white/40">{info.subValue}</p>}
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Høyre - skjema */}
          <ScrollReveal y={30} x={30} delay={0.15}>
            <div className="rounded-3xl glass p-8 lg:p-10">
              {submitted ? (
                <div className="py-16 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#0073C9] to-[#0099E8] shadow-xl shadow-[#0073C9]/30">
                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-white">Takk for din henvendelse!</h3>
                  <p className="mt-3 text-white/40">Vi kontakter deg innen 24 timer.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label className="text-sm text-white/50">Navn *</Label>
                      <Input required placeholder="Ditt navn" className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#0073C9] focus:ring-[#0073C9]" />
                    </div>
                    <div>
                      <Label className="text-sm text-white/50">Telefon *</Label>
                      <Input required type="tel" placeholder="Ditt nummer" className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#0073C9] focus:ring-[#0073C9]" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-white/50">E-post</Label>
                    <Input type="email" placeholder="din@epost.no" className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#0073C9] focus:ring-[#0073C9]" />
                  </div>
                  <div>
                    <Label className="text-sm text-white/50">Ønsket dato</Label>
                    <Input type="date" className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#0073C9] focus:ring-[#0073C9]" />
                  </div>
                  <div>
                    <Label className="text-sm text-white/50">Hva gjelder henvendelsen? *</Label>
                    <Textarea required rows={4} placeholder="Beskriv hva du trenger hjelp med..." className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-[#0073C9] focus:ring-[#0073C9]" />
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox checked={consent} onCheckedChange={(c) => setConsent(c === true)} className="mt-0.5 border-white/20 data-[state=checked]:bg-[#0073C9] data-[state=checked]:text-white" />
                    <Label className="cursor-pointer text-[13px] leading-relaxed text-white/30">Jeg samtykker til behandling av mine personopplysninger.</Label>
                  </div>
                  <Button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-[#0073C9] to-[#0099E8] py-4 text-base font-semibold text-white shadow-lg shadow-[#0073C9]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                    Send forespørsel
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
