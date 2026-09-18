import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  AlarmClock,
  BadgePlus,
  Check,
  Heart,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  WandSparkles,
  Wrench,
} from 'lucide-react'

import ScrollReveal from '@/components/ScrollReveal'

type Service = {
  icon: LucideIcon
  title: string
  description: string
  intro: string
  relevantTitle?: string
  relevant: string[]
  processTitle?: string
  process: string[]
  benefitsTitle?: string
  benefits: string[]
  note?: string
}

const services: Service[] = [
  {
    icon: AlarmClock,
    title: 'Tannlegevakt',
    description:
      'Rask hjelp ved akutte smerter, skader, hevelse eller andre problemer som ikke kan vente.',
    intro:
      'Akutte tannproblemer bør vurderes raskt. Ved tannverk, skade, hevelse eller en fylling som har falt ut, undersøker vi årsaken og prioriterer smertelindring og nødvendig behandling.',
    relevantTitle: 'Kontakt tannlegevakt ved',
    relevant: [
      'Sterk eller plutselig tannverk',
      'Hevelse i tannkjøtt, kinn eller kjeve',
      'Knekt eller skadet tann',
      'Fylling eller krone som har løsnet',
      'Smerter eller problemer med en visdomstann',
      'Blødning eller skade etter et uhell',
    ],
    processTitle: 'Slik foregår et akuttbesøk',
    process: [
      'Vi kartlegger symptomene og hvor lenge plagene har vart.',
      'Tannlegen undersøker området og tar røntgenbilder ved behov.',
      'Første mål er å lindre smerter og begrense videre skade.',
      'Du får informasjon om videre behandling og et kostnadsoverslag før behandlingen fortsetter.',
    ],
    benefits: [
      'Rask vurdering av årsaken',
      'Smertelindring og nødvendig akutthjelp',
      'Tydelig plan for videre behandling',
      'Mulighet for time samme dag når kapasiteten tillater det',
    ],
    note:
      'Ved alvorlig hevelse, pustevansker, svelgevansker eller rask forverring bør du kontakte akutt helsehjelp.',
  },
  {
    icon: Stethoscope,
    title: 'Undersøkelse',
    description:
      'Grundig kontroll av tenner og tannkjøtt med vurdering av behov for videre behandling.',
    intro:
      'En regelmessig tannlegeundersøkelse gjør det mulig å oppdage problemer tidlig, før de utvikler seg til større skader, smerter eller mer omfattende behandling.',
    relevantTitle: 'Under undersøkelsen vurderer vi',
    relevant: [
      'Tenner og tidligere fyllinger',
      'Tannkjøtt og tegn på betennelse',
      'Bitt og kjevefunksjon',
      'Slimhinner i munnen',
      'Kjever og kjeveledd',
      'Behov for røntgenbilder',
    ],
    processTitle: 'Slik foregår undersøkelsen',
    process: [
      'Vi starter med en samtale om din tannhelse, eventuelle symptomer og tidligere behandlinger.',
      'Tannlegen undersøker tenner, tannkjøtt, slimhinner, bitt og kjevefunksjon.',
      'Digitale røntgenbilder tas når det er nødvendig for å oppdage skjulte skader.',
      'Du får en forklaring på funnene og anbefalinger om eventuell behandling eller oppfølging.',
    ],
    benefits: [
      'Tidlig oppdagelse av hull og tannskader',
      'Forebygging av tannkjøttsykdom',
      'Bedre oversikt over egen tannhelse',
      'Mulighet til å planlegge behandling i god tid',
    ],
  },
  {
    icon: Heart,
    title: 'Tannlegeskrekk',
    description:
      'Rolig og trygg oppfølging for deg som gruer deg eller har hatt ubehagelige erfaringer tidligere.',
    intro:
      'Tannlegeskrekk er vanlig og kan skyldes tidligere opplevelser, frykt for smerte, sprøyter, lyder eller følelsen av å miste kontroll. Hos oss blir du møtt med forståelse, god tid og individuell tilrettelegging.',
    relevantTitle: 'Vi kan hjelpe dersom du',
    relevant: [
      'Utsetter tannlegebesøk på grunn av frykt',
      'Har hatt ubehagelige erfaringer tidligere',
      'Er redd for smerte, bedøvelse eller instrumenter',
      'Opplever uro eller panikk i tannlegestolen',
      'Ønsker ekstra god tid og forklaring',
    ],
    processTitle: 'Slik tilpasser vi behandlingen',
    process: [
      'Vi starter gjerne med en rolig samtale uten at behandling må gjennomføres samme dag.',
      'Du forteller hva du er redd for, og hva som kan gjøre situasjonen tryggere.',
      'Vi avtaler et tydelig stoppsignal og tar pauser ved behov.',
      'Tannlegen forklarer hvert trinn før noe utføres.',
      'Videre tiltak vurderes individuelt dersom vanlig tilrettelegging ikke er tilstrekkelig.',
    ],
    benefits: [
      'Du får være med på å styre tempoet',
      'Tydelig informasjon før og under behandlingen',
      'Mulighet for pauser og stoppsignal',
      'Skånsom og individuelt tilpasset behandling',
    ],
    note:
      'Eventuell bruk av beroligende legemidler eller annen sedasjon må vurderes individuelt av behandler.',
  },
  {
    icon: Wrench,
    title: 'Fylling',
    description:
      'Reparasjon av skadde eller kariesrammede tenner med moderne og naturlige materialer.',
    intro:
      'En fylling brukes til å reparere en tann som er skadet av hull, slitasje eller mindre brudd. Målet er å stoppe videre skade og gjenopprette tannens form og funksjon.',
    relevantTitle: 'En fylling kan være aktuell ved',
    relevant: [
      'Hull i tannen',
      'Mindre sprekk eller brudd',
      'Gammel fylling som har løsnet',
      'Slitasje eller tap av tannsubstans',
      'Ising eller ubehag fra en skadet tann',
    ],
    processTitle: 'Slik foregår behandlingen',
    process: [
      'Området bedøves ved behov.',
      'Skadet og angrepet tannsubstans fjernes.',
      'Tannen rengjøres og klargjøres for fyllingsmaterialet.',
      'Tannen bygges opp med et tannfarget materiale.',
      'Bittet kontrolleres og fyllingen formes og poleres.',
    ],
    benefits: [
      'Bevarer mest mulig av den naturlige tannen',
      'Tannfarget og naturlig resultat',
      'Stopper videre utvikling av karies',
      'Kan ofte ferdigstilles på ett besøk',
    ],
  },
  {
    icon: Activity,
    title: 'Rotfylling',
    description:
      'Behandling av betennelse eller skade i tannens nerve for å bevare tannen og redusere smerter.',
    intro:
      'Rotfylling kan være nødvendig når nerven inne i tannen er betent, infisert eller skadet. Behandlingen fjerner infisert vev og gjør det mulig å bevare tannen.',
    relevantTitle: 'Rotfylling kan være nødvendig ved',
    relevant: [
      'Dype hull som har nådd tannens nerve',
      'Langvarig eller kraftig tannverk',
      'Smerter ved tygging eller biting',
      'Betennelse eller infeksjon rundt tannroten',
      'Skade på tannen etter slag eller uhell',
    ],
    processTitle: 'Slik foregår behandlingen',
    process: [
      'Tannen bedøves og isoleres under behandlingen.',
      'Tannlegen åpner tannen og fjerner betent eller infisert vev.',
      'Rotkanalene renses, desinfiseres og formes.',
      'Kanalene fylles og forsegles for å hindre ny infeksjon.',
      'Tannen bygges opp med fylling eller krone, avhengig av hvor mye tannsubstans som er igjen.',
    ],
    benefits: [
      'Kan bevare en tann som ellers måtte trekkes',
      'Fjerner infisert vev',
      'Reduserer smerter og betennelse',
      'Gjenoppretter tyggefunksjonen',
    ],
    note:
      'Rotfylte tenner kan bli mer utsatt for sprekk eller brudd. Tannlegen vurderer derfor om tannen bør beskyttes med en krone.',
  },
  {
    icon: BadgePlus,
    title: 'Krone',
    description:
      'En varig løsning som styrker og bygger opp en svekket eller omfattende skadet tann.',
    intro:
      'En tannkrone dekker og beskytter en tann som har mistet mye tannsubstans. Kronen formes og tilpasses slik at den gjenoppretter tannens styrke, funksjon og utseende.',
    relevantTitle: 'En krone kan være aktuell ved',
    relevant: [
      'Store hull eller omfattende tannskade',
      'Store eller gamle fyllinger',
      'Sprekk eller fare for at tannen skal brekke',
      'Rotfylt og svekket tann',
      'Knekt eller sterkt slitt tann',
      'Misfarging som skyldes tannskade',
    ],
    processTitle: 'Slik foregår behandlingen',
    process: [
      'Tannen undersøkes og bedøves.',
      'Tannen formes slik at kronen får riktig plass og støtte.',
      'Det tas digitalt avtrykk eller tradisjonelt avtrykk.',
      'Du får vanligvis en midlertidig krone mens den permanente fremstilles.',
      'Den ferdige kronen prøves, tilpasses og festes permanent.',
    ],
    benefits: [
      'Styrker og beskytter en svekket tann',
      'Kan ha bedre holdbarhet enn en stor fylling',
      'Gir et naturlig og estetisk resultat',
      'Kan redusere risikoen for videre sprekk eller brudd',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Tannbro',
    description:
      'Erstatter én eller flere manglende tenner og bidrar til bedre funksjon og et naturlig smil.',
    intro:
      'En tannbro er en fast løsning som kan erstatte én eller flere manglende tenner. Broen festes vanligvis til nabotenner og utformes slik at den ser naturlig ut og forbedrer tyggefunksjonen.',
    relevantTitle: 'En tannbro kan være aktuell når',
    relevant: [
      'Du mangler én eller flere tenner',
      'Nabotenner kan brukes som støtte',
      'Du ønsker en fast løsning',
      'Implantat ikke er aktuelt eller ønskelig',
      'Manglende tenner påvirker tygging eller utseende',
    ],
    processTitle: 'Slik foregår behandlingen',
    process: [
      'Tannlegen vurderer nabotennene, bittet og området som skal erstattes.',
      'Støttetennene formes og klargjøres.',
      'Det tas avtrykk eller digital skanning.',
      'En midlertidig løsning kan brukes mens broen fremstilles.',
      'Den ferdige broen prøves, tilpasses og festes permanent.',
    ],
    benefits: [
      'Fast og stabil løsning',
      'Kan gjenopprette tyggefunksjonen',
      'Naturlig utseende',
      'Kan ferdigstilles raskere enn enkelte implantatløsninger',
    ],
    note:
      'En bro krever egnede støttetenner og god munnhygiene. Tannlegen vurderer om bro, implantat eller annen løsning passer best.',
  },
  {
    icon: Smile,
    title: 'Tannprotese',
    description:
      'Tilpassede proteser for deg som mangler flere eller alle tenner, med fokus på komfort og funksjon.',
    intro:
      'En tannprotese er en avtakbar løsning som erstatter flere eller alle tenner i en kjeve. Protesen tilpasses individuelt for å forbedre tygging, tale og utseende.',
    relevantTitle: 'Typer tannproteser',
    relevant: [
      'Delprotese når noen naturlige tenner er bevart',
      'Helprotese når alle tennene i en kjeve mangler',
      'Midlertidig protese under annen behandling',
      'Protese som støttes av gjenværende tenner eller implantater',
    ],
    processTitle: 'Slik foregår behandlingen',
    process: [
      'Tannlegen undersøker munnen og vurderer hvilken løsning som er best.',
      'Det tas avtrykk eller digital skanning av kjevene.',
      'Bitt, form og tannplassering planlegges sammen med deg.',
      'Protesen fremstilles i samarbeid med tanntekniker.',
      'Etter utlevering gjennomføres nødvendige tilpasninger og kontroller.',
    ],
    benefits: [
      'Erstatter flere eller alle manglende tenner',
      'Kan forbedre tygging og tale',
      'Avtakbar og enkel å rengjøre',
      'Kan være et rimeligere alternativ enn faste løsninger',
    ],
    note:
      'Det er normalt å ha behov for tilvenning og etterjustering. Passformen kan også endre seg over tid når kjeven forandrer seg.',
  },
  {
    icon: Sparkles,
    title: 'Tannbleking',
    description:
      'Skånsom og kontrollert hjemmebleking med individuelt tilpassede blekeskinner.',
    intro:
      'Tannbleking kan redusere misfarging og gi et lysere smil. Før behandlingen undersøkes tenner og tannkjøtt for å kontrollere at bleking kan gjennomføres på en trygg måte.',
    relevantTitle: 'Tannbleking kan passe ved',
    relevant: [
      'Naturlig gulere tenner',
      'Misfarging fra kaffe, te eller tobakk',
      'Aldersrelatert misfarging',
      'Ønske om et lysere smil',
    ],
    processTitle: 'Slik foregår hjemmebleking',
    process: [
      'Tannlegen undersøker tenner og tannkjøtt.',
      'Hull og andre tannproblemer må behandles før bleking starter.',
      'Det tas avtrykk eller digital skanning til individuelt tilpassede blekeskinner.',
      'Du får blekemiddel og tydelige instrukser for bruk hjemme.',
      'Bleketid og behandlingslengde tilpasses dine tenner og ønsket resultat.',
    ],
    benefits: [
      'Individuelt tilpassede blekeskinner',
      'Kontrollert og skånsom behandling',
      'Mulighet til å styre resultatet gradvis',
      'Oppfølging fra tannlege',
    ],
    note:
      'Midlertidig ising kan forekomme. Fyllinger, kroner og broer endrer ikke farge ved bleking.',
  },
  {
    icon: Syringe,
    title: 'Tanntrekking',
    description:
      'Skånsom fjerning av tenner som ikke kan bevares eller som skaper smerter og problemer.',
    intro:
      'Tanntrekking vurderes når en tann ikke lenger kan repareres eller når den skaper vedvarende smerter, infeksjon eller andre problemer. Vi undersøker alltid om tannen kan bevares før trekking anbefales.',
    relevantTitle: 'Tanntrekking kan være nødvendig ved',
    relevant: [
      'Omfattende hull eller tannskade',
      'Alvorlig infeksjon',
      'Knekt tann som ikke kan repareres',
      'Problemer med visdomstenner',
      'Løs tann etter alvorlig tannkjøttsykdom',
      'Rotrester eller andre kompliserende forhold',
    ],
    processTitle: 'Slik foregår behandlingen',
    process: [
      'Tannen og området rundt undersøkes, ofte med røntgen.',
      'Området bedøves grundig før behandlingen starter.',
      'Tannen fjernes med en enkel eller kirurgisk metode, avhengig av plassering og tilstand.',
      'Du får informasjon om sårstell, smertelindring og hva du bør unngå etterpå.',
      'Ved behov planlegges senere erstatning av den manglende tannen.',
    ],
    benefits: [
      'Fjerner en tann som gir smerter eller infeksjon',
      'Utføres med lokalbedøvelse',
      'Kan hindre videre skade på vevet rundt',
      'Du får tydelige råd om tiden etter behandlingen',
    ],
    note:
      'Refusjon og egenandel avhenger av diagnose, behandling og gjeldende regler. Dette vurderes individuelt.',
  },
  {
    icon: WandSparkles,
    title: 'Tannverk',
    description:
      'Undersøkelse og behandling av smerter, ising, hevelse eller andre tegn på tannproblemer.',
    intro:
      'Tannverk er et varselsignal som bør undersøkes. Smerten kan skyldes hull, sprekk, betennelse, infeksjon, tannkjøttproblemer eller andre tilstander.',
    relevantTitle: 'Søk hjelp dersom du opplever',
    relevant: [
      'Vedvarende eller pulserende tannverk',
      'Smerter ved tygging',
      'Kraftig ising mot varmt eller kaldt',
      'Hevelse eller ømhet',
      'Vond smak eller tegn på puss',
      'Smerter som forstyrrer søvn',
    ],
    processTitle: 'Slik undersøker vi tannverk',
    process: [
      'Vi kartlegger smertene og når de oppstår.',
      'Tannen og vevet rundt undersøkes grundig.',
      'Det tas røntgenbilder når det er nødvendig.',
      'Akutte smerter lindres så raskt som mulig.',
      'Du får en behandlingsplan basert på årsaken til smertene.',
    ],
    benefits: [
      'Rask avklaring av årsaken',
      'Smertelindring',
      'Redusert risiko for at problemet forverres',
      'Tydelig plan og kostnadsinformasjon før videre behandling',
    ],
    note:
      'Selv om tannverken plutselig avtar, kan årsaken fortsatt være til stede. En infisert nerve kan slutte å gi smerter før infeksjonen senere utvikler seg videre.',
  },
]

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<Service>(services[0])

  const scrollToContact = () => {
    document
      .querySelector('#kontakt')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="tjenester"
      className="relative overflow-hidden bg-[#0B1120] py-24 md:py-32"
    >
      {/* Bakgrunnseffekter */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0B1120] to-transparent" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-[#0073C9]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F2A900]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal y={30}>
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-[#0073C9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0099E8]">
              Våre behandlinger
            </span>

            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Trygg tannbehandling{' '}
              <span className="gradient-text">tilpasset dine behov</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
              Velg behandling for å se informasjon, fordeler og hvordan behandlingen foregår.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal y={40}>
          <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/10">
            <div className="grid lg:min-h-[780px] lg:grid-cols-[0.78fr_1.22fr]">
              {/* Behandlingsvelger */}
              <div className="border-b border-white/[0.08] p-3 sm:p-4 lg:border-b-0 lg:border-r lg:p-5">
                <div className="mb-3 hidden px-4 pt-2 lg:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    Velg behandling
                  </p>
                </div>

                <div
                  className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-1.5"
                  role="list"
                  aria-label="Behandlinger"
                >
                  {services.map((service) => {
                    const Icon = service.icon
                    const isActive = activeService.title === service.title
                    const isEmergency = service.title === 'Tannlegevakt'

                    return (
                      <button
                        key={service.title}
                        type="button"
                        onClick={() => setActiveService(service)}
                        onFocus={() => setActiveService(service)}
                        aria-pressed={isActive}
                        className={`group relative flex min-h-[62px] items-center gap-3 overflow-hidden rounded-2xl px-3.5 py-3 text-left transition-all duration-300 sm:px-4 ${
                          isActive
                            ? 'bg-[#0073C9]/20 text-white shadow-lg shadow-black/10'
                            : 'text-white/[0.88] hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        <span
                          className={`absolute inset-y-3 left-0 w-[3px] rounded-full transition-all duration-300 ${
                            isActive
                              ? 'bg-[#0099E8] opacity-100'
                              : 'bg-[#0099E8] opacity-0'
                          }`}
                        />

                        <span
                          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                            isActive
                              ? 'border-[#33B5F5]/45 bg-[#0073C9]/30 text-[#66C8F7]'
                              : 'border-[#0099E8]/20 bg-[#0073C9]/[0.12] text-[#33B5F5] group-hover:border-[#33B5F5]/35 group-hover:bg-[#0073C9]/20 group-hover:text-[#66C8F7]'
                          }`}
                        >
                          <Icon size={21} strokeWidth={1.7} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-sm font-semibold text-white sm:text-[15px]">
                              {service.title}
                            </span>

                            {isEmergency && (
                              <span className="hidden rounded-full border border-[#F2A900]/20 bg-[#F2A900]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#F2A900] sm:inline-flex">
                                Akutt
                              </span>
                            )}
                          </span>
                        </span>

                        <span
                          className={`hidden text-lg transition-all duration-300 lg:block ${
                            isActive
                              ? 'translate-x-0 text-[#0099E8] opacity-100'
                              : '-translate-x-1 text-white/20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                          }`}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Aktiv behandling – all informasjon vises direkte her */}
              <div className="relative min-w-0 overflow-hidden p-6 sm:p-8 lg:p-9 xl:p-10">
                <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#0073C9]/[0.12] blur-[90px]" />
                <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#0099E8]/[0.06] blur-[100px]" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#33B5F5]/35 bg-[#0073C9]/25 text-[#66C8F7] shadow-lg shadow-[#0073C9]/10 sm:h-16 sm:w-16">
                        <activeService.icon
                          size={29}
                          strokeWidth={1.5}
                          key={activeService.title}
                        />
                      </div>

                      <div>
                        {activeService.title === 'Tannlegevakt' && (
                          <span className="mb-1.5 inline-flex rounded-full border border-[#F2A900]/20 bg-[#F2A900]/[0.07] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#F2A900]">
                            Akutt hjelp
                          </span>
                        )}
                        <h3 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                          {activeService.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/[0.72] sm:text-base">
                    {activeService.intro}
                  </p>

                  <div className="mt-7 grid gap-5 xl:grid-cols-2">
                    <CompactInfoBlock
                      title={activeService.relevantTitle ?? 'Når er det aktuelt?'}
                      items={activeService.relevant}
                    />

                    <CompactInfoBlock
                      title={activeService.benefitsTitle ?? 'Fordeler'}
                      items={activeService.benefits}
                      accent="gold"
                    />
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
                    <h4 className="text-base font-semibold text-white sm:text-lg">
                      {activeService.processTitle ?? 'Slik foregår behandlingen'}
                    </h4>

                    <ol className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {activeService.process.map((step, index) => (
                        <li
                          key={step}
                          className="flex items-start gap-3 text-[13px] leading-5 text-white/[0.68] sm:text-sm"
                        >
                          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0073C9]/20 text-[11px] font-bold text-[#66C8F7]">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {activeService.note && (
                    <div className="mt-5 rounded-2xl border border-[#F2A900]/15 bg-[#F2A900]/[0.05] px-4 py-3.5">
                      <p className="text-[13px] leading-5 text-white/[0.62] sm:text-sm">
                        <span className="font-semibold text-[#F2A900]">Viktig:</span>{' '}
                        {activeService.note}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={scrollToContact}
                      className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#0073C9] to-[#0099E8] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0073C9]/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#0073C9]/30"
                    >
                      Bestill time
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

type CompactInfoBlockProps = {
  title: string
  items: string[]
  accent?: 'blue' | 'gold'
}

function CompactInfoBlock({
  title,
  items,
  accent = 'blue',
}: CompactInfoBlockProps) {
  const iconClasses =
    accent === 'gold'
      ? 'bg-[#F2A900]/15 text-[#F2A900]'
      : 'bg-[#0073C9]/20 text-[#66C8F7]'

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
      <h4 className="text-base font-semibold text-white sm:text-lg">{title}</h4>

      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-[13px] leading-5 text-white/[0.68] sm:text-sm"
          >
            <span
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${iconClasses}`}
            >
              <Check size={11} strokeWidth={2.7} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
