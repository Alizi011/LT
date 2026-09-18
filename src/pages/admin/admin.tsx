import { useMemo, useState } from 'react'
import {
  Activity,
  Bell,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Menu,
  MessageSquareText,
  Pencil,
  Plus,
  Save,
  Search,
  Settings,
  Sparkles,
  Stethoscope,
  Users,
  X,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

const navItems = [
  { id: 'dashboard', label: 'Oversikt', icon: LayoutDashboard },
  { id: 'services', label: 'Behandlinger', icon: Stethoscope },
  { id: 'pricing', label: 'Priser', icon: CircleDollarSign },
  { id: 'laser', label: 'Laser', icon: Sparkles },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'settings', label: 'Innstillinger', icon: Settings },
] as const

type NavId = (typeof navItems)[number]['id']

type Treatment = {
  id: number
  title: string
  description: string
  active: boolean
  featured?: boolean
}

type PriceItem = {
  id: number
  category: string
  name: string
  price: string
  active: boolean
}

const initialTreatments: Treatment[] = [
  { id: 1, title: 'Laserbehandlinger', description: 'Moderne Fotona-laser for blant annet NightLase, tannbleking, tannkjøtt, implantater, rotbehandling og smertelindring.', active: true, featured: true },
  { id: 2, title: 'Generell tannhelse', description: 'Undersøkelser, tannrens, fyllinger og rotbehandling.', active: true },
  { id: 3, title: 'Tannlegeskrekk', description: 'Rolig og trygg oppfølging for pasienter med behandlingsangst.', active: true },
  { id: 4, title: 'Estetisk tannbehandling', description: 'Tannbleking, porselenfasetter, kroner og broer.', active: true },
  { id: 5, title: 'Akutthjelp', description: 'Hjelp ved tannverk, skader og uforutsette problemer.', active: true },
  { id: 6, title: 'Tannkirurgi', description: 'Visdomstenner, implantater og kirurgiske inngrep.', active: true },
]

const initialPrices: PriceItem[] = [
  { id: 1, category: 'Undersøkelse', name: 'Undersøkelse inkl. røntgen, rens', price: '1 340 kr', active: true },
  { id: 2, category: 'Undersøkelse', name: 'Akutt undersøkelse', price: '690 kr', active: true },
  { id: 3, category: 'Undersøkelse', name: 'Røntgenbilde', price: '200 kr', active: true },
  { id: 4, category: 'Behandling', name: 'Fylling 1 flate', price: '1 500 kr', active: true },
  { id: 5, category: 'Behandling', name: 'Fylling 2 flater', price: '1 890 kr', active: true },
  { id: 6, category: 'Behandling', name: 'Rotfylling fortann', price: 'fra 4 200 kr', active: true },
  { id: 7, category: 'Protetikk', name: 'Tannkrone inkl. hygiene', price: '7 400–7 990 kr', active: true },
  { id: 8, category: 'Protetikk', name: 'Tannbleking (2 kjever)', price: '3 990 kr', active: true },
]

const storageKey = 'lt-admin-draft-v1'
const authKey = 'lt-admin-auth-v1'

// Enkel frontend-innlogging. Bytt passordet før publisering.
// Dette er kun en enkel sperre og ikke sikker autentisering for sensitive data.
const ADMIN_PASSWORD = 'abc123'

function loadDraft() {
  try {
    const value = window.localStorage.getItem(storageKey)
    if (!value) return null
    return JSON.parse(value) as { treatments?: Treatment[]; prices?: PriceItem[]; settings?: Record<string, string> }
  } catch {
    return null
  }
}

function StatusPill({ children, tone = 'blue' }: { children: React.ReactNode; tone?: 'blue' | 'green' | 'amber' }) {
  const styles = {
    blue: 'bg-[#E8F3FC] text-[#0073C9]',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
  }
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[tone]}`}>{children}</span>
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      return window.sessionStorage.getItem(authKey) === 'true'
    } catch {
      return false
    }
  })
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password === ADMIN_PASSWORD) {
      window.sessionStorage.setItem(authKey, 'true')
      setLoggedIn(true)
      setPassword('')
      setLoginError('')
      return
    }

    setLoginError('Feil passord')
  }

  const handleLogout = () => {
    window.sessionStorage.removeItem(authKey)
    setLoggedIn(false)
    setPassword('')
    setLoginError('')
  }

  if (!loggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7FA] px-4">
        <div className="w-full max-w-md rounded-3xl border border-[#E7ECF2] bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF4FC] text-[#0073C9]">
              <LockKeyhole size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Lørenskog Tannlegesenter</p>
              <p className="mt-0.5 text-xs text-[#7B8794]">Administrasjon</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[#0B1120]">Logg inn</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#75818E]">
            Skriv inn admin-passordet for å åpne kontrollpanelet.
          </p>

          <form onSubmit={handleLogin} className="mt-7">
            <Label htmlFor="admin-password">Passord</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                if (loginError) setLoginError('')
              }}
              autoComplete="current-password"
              autoFocus
              className="mt-2 h-12 border-[#E4EAF0]"
              placeholder="Admin-passord"
            />

            {loginError && (
              <p className="mt-3 text-sm font-medium text-red-600">{loginError}</p>
            )}

            <Button
              type="submit"
              className="mt-6 h-12 w-full rounded-xl bg-[#0073C9] text-white hover:bg-[#0065AF]"
            >
              Logg inn
            </Button>
          </form>

          <a href="/" className="mt-6 block text-center text-xs font-medium text-[#7B8794] hover:text-[#0073C9]">
            Tilbake til nettsiden
          </a>
        </div>
      </div>
    )
  }

  return <AdminPanel onLogout={handleLogout} />
}

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const draft = useMemo(() => loadDraft(), [])
  const [active, setActive] = useState<NavId>('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [offerOpen, setOfferOpen] = useState(false)
  const [treatments, setTreatments] = useState<Treatment[]>(draft?.treatments ?? initialTreatments)
  const [prices, setPrices] = useState<PriceItem[]>(draft?.prices ?? initialPrices)
  const [settings, setSettings] = useState(draft?.settings ?? {
    clinicName: 'Lørenskog Tannlegesenter',
    phone: '67 90 40 90',
    email: 'kontakt@lorenskogtannlege.no',
    address: 'Skårersletta 10, 1473 Lørenskog',
    hours: 'Man–Fre: 08:00–16:00',
  })

  const saveDraft = () => {
    const payload = { treatments, prices, settings }

    window.localStorage.setItem(storageKey, JSON.stringify(payload))

    // Oppdater forsiden umiddelbart dersom den er åpen i samme nettleservindu.
    window.dispatchEvent(
      new CustomEvent('lt-admin-content-updated', {
        detail: payload,
      }),
    )

    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  const title = navItems.find((item) => item.id === active)?.label ?? 'Oversikt'

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#0B1120]">
      <aside className={`fixed inset-y-0 left-0 z-50 w-[272px] border-r border-[#E7ECF2] bg-white transition-transform lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-20 items-center justify-between border-b border-[#EEF2F6] px-6">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Lørenskog Tannlegesenter" className="h-10 w-10 rounded-xl object-contain" />
            <div>
              <p className="text-[13px] font-bold leading-tight">Lørenskog</p>
              <p className="text-[11px] text-[#7B8794]">Tannlegesenter · Admin</p>
            </div>
          </a>
          <button className="rounded-lg p-2 text-[#6B7785] lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Lukk meny">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon
            const selected = active === item.id
            return (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); setMobileOpen(false) }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${selected ? 'bg-[#EAF4FC] text-[#0073C9]' : 'text-[#667381] hover:bg-[#F7F9FB] hover:text-[#0B1120]'}`}
              >
                <Icon size={19} strokeWidth={1.8} />
                {item.label}
                {selected && <ChevronRight size={16} className="ml-auto" />}
              </button>
            )
          })}
        </nav>

        <div className="absolute inset-x-4 bottom-5 rounded-2xl bg-[#0B1120] p-4 text-white">
          <p className="text-xs font-semibold">Nettsiden</p>
          <p className="mt-1 text-[11px] leading-relaxed text-white/50">Se hvordan innholdet vises for pasientene.</p>
          <a href="/" className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#59B9F2]">
            Åpne nettsiden <ExternalLink size={13} />
          </a>
        </div>
      </aside>

      {mobileOpen && <button aria-label="Lukk meny" className="fixed inset-0 z-40 bg-black/25 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <div className="lg:pl-[272px]">
        <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-[#E7ECF2] bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-10">
          <button className="rounded-xl border border-[#E6EBF1] p-2.5 text-[#556271] lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Åpne meny">
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold tracking-tight">{title}</h1>
            <p className="hidden text-xs text-[#8793A0] sm:block">Administrasjon av innhold og klinikkinformasjon</p>
          </div>
          <div className="ml-auto hidden w-full max-w-xs items-center rounded-xl border border-[#E6EBF1] bg-[#FAFBFC] px-3 sm:flex">
            <Search size={17} className="text-[#95A1AE]" />
            <input className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-[#A3ADB7]" placeholder="Søk i admin..." />
          </div>
          <button className="relative rounded-xl border border-[#E6EBF1] p-2.5 text-[#5A6876]">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#0073C9]" />
          </button>
          <button
            onClick={onLogout}
            className="hidden items-center gap-2 rounded-xl border border-[#E6EBF1] px-3 py-2.5 text-sm font-medium text-[#5A6876] transition hover:bg-[#F7F9FB] sm:flex"
          >
            <LogOut size={16} />
            Logg ut
          </button>
          <Button onClick={saveDraft} className="rounded-xl bg-[#0073C9] px-4 text-white hover:bg-[#0065AF]">
            <Save size={16} className="mr-2" /> {saved ? 'Lagret' : 'Lagre'}
          </Button>
        </header>

        <div className="border-b border-[#DDE5EC] bg-white">
          <button
            type="button"
            onClick={() => setOfferOpen((current) => !current)}
            className="flex w-full animate-pulse items-center gap-4 bg-[#0073C9] px-4 py-3 text-left text-white transition hover:bg-[#0065AF] sm:px-6 lg:px-10"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
              <FileText size={17} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-sm font-bold text-white">Pristilbud</span>
                <span className="hidden text-xs text-white/70 sm:inline">Ny nettside for Lørenskog Tannlegesenter</span>
              </div>
              <p className="mt-0.5 text-xs text-white/80">
                49 900 kr eks. mva. · Klikk for å {offerOpen ? 'lukke' : 'åpne'} tilbudet
              </p>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-white">49 900 kr</p>
                <p className="text-[11px] text-white/70">eks. mva.</p>
              </div>

              <div className={`flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-transform duration-300 ${offerOpen ? 'rotate-90' : 'rotate-0'}`}>
                <ChevronRight size={17} />
              </div>
            </div>
          </button>

          <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
              offerOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="min-h-0">
              <div className="border-t border-[#E8EDF2] bg-[#F8FAFC] px-4 py-6 sm:px-6 lg:px-10">
                <OfferDetails />
              </div>
            </div>
          </div>
        </div>

        <main className="p-4 sm:p-6 lg:p-10">
          {active === 'dashboard' && <Dashboard onNavigate={setActive} treatments={treatments} prices={prices} />}
          {active === 'services' && <Treatments treatments={treatments} setTreatments={setTreatments} />}
          {active === 'pricing' && <Prices prices={prices} setPrices={setPrices} />}
          {active === 'laser' && <LaserPanel />}
          {active === 'team' && <TeamPanel />}
          {active === 'settings' && <SettingsPanel settings={settings} setSettings={setSettings} />}
        </main>
      </div>
    </div>
  )
}

function Dashboard({ onNavigate, treatments, prices }: { onNavigate: (id: NavId) => void; treatments: Treatment[]; prices: PriceItem[] }) {
  const cards = [
    { label: 'Aktive behandlinger', value: treatments.filter((item) => item.active).length, icon: Stethoscope, note: `${treatments.length} totalt` },
    { label: 'Prislinjer', value: prices.filter((item) => item.active).length, icon: CircleDollarSign, note: 'Publiserte utkast' },
    { label: 'Henvendelser', value: '—', icon: MessageSquareText, note: 'Krever backend' },
    { label: 'Sist oppdatert', value: 'I dag', icon: Clock3, note: 'Lokalt utkast' },
  ]
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-[#0073C9]">God morgen</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Klinikken på ett sted</h2>
          <p className="mt-2 max-w-xl text-sm text-[#75818E]">Oppdater behandlinger, priser og klinikkinformasjon uten å gå inn i kildekoden.</p>
        </div>
        <StatusPill tone="green">Nettsiden er aktiv</StatusPill>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="rounded-2xl border border-[#E7ECF2] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.03)]">
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-[#EDF6FD] p-2.5 text-[#0073C9]"><Icon size={20} /></div>
                <Activity size={16} className="text-[#C0C8D0]" />
              </div>
              <p className="mt-5 text-3xl font-bold tracking-tight">{card.value}</p>
              <p className="mt-1 text-sm font-medium text-[#3D4A57]">{card.label}</p>
              <p className="mt-2 text-xs text-[#94A0AC]">{card.note}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
        <div className="rounded-2xl border border-[#E7ECF2] bg-white p-6">
          <div className="flex items-center justify-between">
            <div><h3 className="font-bold">Hurtigredigering</h3><p className="mt-1 text-xs text-[#8A96A2]">Vanlige oppgaver</p></div>
            <StatusPill>Admin</StatusPill>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ['Oppdater behandlinger', 'Endre tekster og synlighet', 'services' as NavId, Stethoscope],
              ['Oppdater priser', 'Rediger prislisten', 'pricing' as NavId, CircleDollarSign],
              ['Laserinnhold', 'Fotona og laserbehandlinger', 'laser' as NavId, Sparkles],
              ['Klinikkinfo', 'Telefon, e-post og åpningstid', 'settings' as NavId, Settings],
            ].map(([label, sub, id, Icon]) => (
              <button key={label as string} onClick={() => onNavigate(id as NavId)} className="group flex items-center gap-4 rounded-xl border border-[#EDF1F5] p-4 text-left transition hover:border-[#CFE5F6] hover:bg-[#F8FCFF]">
                <div className="rounded-xl bg-[#F3F7FA] p-2.5 text-[#0073C9]"><Icon size={19} /></div>
                <div><p className="text-sm font-semibold">{label as string}</p><p className="mt-1 text-xs text-[#8C98A4]">{sub as string}</p></div>
                <ChevronRight size={16} className="ml-auto text-[#B5BEC7] transition group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E7ECF2] bg-white p-6">
          <h3 className="font-bold">Systemstatus</h3>
          <div className="mt-5 space-y-4">
            <StatusRow label="Offentlig nettside" value="Aktiv" ok />
            <StatusRow label="Admin-grensesnitt" value="Aktiv" ok />
            <StatusRow label="Database" value="Ikke koblet" />
            <StatusRow label="Innlogging" value="Enkel frontend" />
          </div>
          <div className="mt-5 rounded-xl bg-amber-50 p-4 text-xs leading-relaxed text-amber-800">
            Denne versjonen lagrer endringer som lokalt admin-utkast. Backend og autentisering må kobles før admin brukes i produksjon.
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusRow({ label, value, ok = false }: { label: string; value: string; ok?: boolean }) {
  return <div className="flex items-center justify-between text-sm"><span className="text-[#6F7B87]">{label}</span><span className={`font-semibold ${ok ? 'text-emerald-600' : 'text-amber-600'}`}>{value}</span></div>
}

function Treatments({ treatments, setTreatments }: { treatments: Treatment[]; setTreatments: React.Dispatch<React.SetStateAction<Treatment[]>> }) {
  const update = (id: number, patch: Partial<Treatment>) => setTreatments((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item))
  return (
    <AdminSection title="Behandlinger" description="Rediger behandlingskortene som brukes på nettsiden." action={<Button onClick={() => setTreatments((items) => [...items, { id: Date.now(), title: 'Ny behandling', description: '', active: false }])} className="rounded-xl bg-[#0B1120] text-white"><Plus size={16} className="mr-2" />Ny behandling</Button>}>
      <div className="space-y-3">
        {treatments.map((item) => (
          <div key={item.id} className="rounded-2xl border border-[#E8EDF2] bg-white p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EDF6FD] text-[#0073C9]"><Stethoscope size={19} /></div>
              <div className="min-w-0 flex-1">
                <Input value={item.title} onChange={(e) => update(item.id, { title: e.target.value })} className="h-auto border-0 bg-transparent p-0 text-base font-bold shadow-none focus-visible:ring-0" />
                <Textarea value={item.description} onChange={(e) => update(item.id, { description: e.target.value })} className="mt-1 min-h-0 resize-none border-0 bg-transparent p-0 text-sm text-[#7B8793] shadow-none focus-visible:ring-0" rows={2} />
              </div>
              <div className="flex items-center gap-3 md:pl-4">
                {item.featured && <StatusPill>Fremhevet</StatusPill>}
                <span className="text-xs font-medium text-[#7D8995]">Synlig</span>
                <Switch checked={item.active} onCheckedChange={(value) => update(item.id, { active: value })} />
                <button className="rounded-lg border border-[#E6EBF0] p-2 text-[#778490]"><Pencil size={15} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminSection>
  )
}

function Prices({ prices, setPrices }: { prices: PriceItem[]; setPrices: React.Dispatch<React.SetStateAction<PriceItem[]>> }) {
  const update = (id: number, patch: Partial<PriceItem>) => setPrices((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item))
  return (
    <AdminSection title="Priser" description="Prisene er gruppert på samme måte som på den offentlige nettsiden." action={<Button onClick={() => setPrices((items) => [...items, { id: Date.now(), category: 'Behandling', name: 'Ny prislinje', price: '0 kr', active: false }])} className="rounded-xl bg-[#0B1120] text-white"><Plus size={16} className="mr-2" />Ny pris</Button>}>
      <div className="overflow-hidden rounded-2xl border border-[#E7ECF2] bg-white">
        <div className="hidden grid-cols-[1fr_2fr_1fr_100px] gap-4 border-b border-[#EDF1F4] bg-[#FAFBFC] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#8A96A2] md:grid">
          <span>Kategori</span><span>Behandling</span><span>Pris</span><span>Synlig</span>
        </div>
        {prices.map((item) => (
          <div key={item.id} className="grid gap-3 border-b border-[#F0F3F6] px-5 py-4 last:border-b-0 md:grid-cols-[1fr_2fr_1fr_100px] md:items-center md:gap-4">
            <Input value={item.category} onChange={(e) => update(item.id, { category: e.target.value })} className="border-[#E6EBF0]" />
            <Input value={item.name} onChange={(e) => update(item.id, { name: e.target.value })} className="border-[#E6EBF0]" />
            <Input value={item.price} onChange={(e) => update(item.id, { price: e.target.value })} className="border-[#E6EBF0] font-semibold text-[#0073C9]" />
            <div className="flex items-center gap-2"><Switch checked={item.active} onCheckedChange={(value) => update(item.id, { active: value })} /><span className="text-xs text-[#77838F] md:hidden">Synlig</span></div>
          </div>
        ))}
      </div>
    </AdminSection>
  )
}

function LaserPanel() {
  return (
    <AdminSection title="Laser" description="Administrer Fotona-relatert innhold og fremhevede laserbehandlinger.">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#E7ECF2] bg-white p-6">
          <div className="flex items-center gap-3"><div className="rounded-xl bg-[#EEF6FD] p-3 text-[#0073C9]"><Sparkles size={21} /></div><div><h3 className="font-bold">Fotona laser</h3><p className="text-xs text-[#8B97A3]">Hovedseksjon på nettsiden</p></div><Switch defaultChecked className="ml-auto" /></div>
          <div className="mt-6 space-y-4"><Field label="Overskrift" defaultValue="Presis og skånsom laserbehandling med Fotona" /><div><Label>Beskrivelse</Label><Textarea className="mt-2 border-[#E4EAF0]" rows={5} defaultValue="Fotona-laseren brukes i utvalgte behandlinger der høy presisjon, skånsom vevshåndtering og god pasientkomfort er viktig." /></div></div>
        </div>
        <div className="rounded-2xl border border-[#E7ECF2] bg-white p-6"><h3 className="font-bold">Fremhevede behandlinger</h3><p className="mt-1 text-xs text-[#8B97A3]">Klar for senere kobling til databasen.</p><div className="mt-5 space-y-3">{['NightLase / snorking', 'TouchWhite / tannbleking', 'Tannkjøtt og peri-implantitt', 'Rotbehandling / SWEEPS', 'Tannfølsomhet', 'Munnsår / herpes', 'ComfortLase / smertelindring'].map((name) => <div key={name} className="flex items-center justify-between rounded-xl border border-[#EDF1F4] px-4 py-3"><span className="text-sm font-medium">{name}</span><Switch defaultChecked /></div>)}</div></div>
      </div>
    </AdminSection>
  )
}

function TeamPanel() {
  return (
    <AdminSection title="Team" description="Forbered presentasjon av tannleger og klinikkpersonell." action={<Button className="rounded-xl bg-[#0B1120] text-white"><Plus size={16} className="mr-2" />Ny ansatt</Button>}>
      <div className="rounded-2xl border border-dashed border-[#CAD3DD] bg-white p-12 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF6FD] text-[#0073C9]"><Users /></div><h3 className="mt-4 font-bold">Ingen teamprofiler lagt inn ennå</h3><p className="mx-auto mt-2 max-w-md text-sm text-[#85919D]">Her kan vi senere legge inn navn, rolle, bilde, kompetanse og presentasjonstekst.</p></div>
    </AdminSection>
  )
}


function OfferDetails() {
  const offerLines = [
    ['Design og visuelt oppsett', '7 500 kr'],
    ['Frontend-utvikling i React / TypeScript', '13 500 kr'],
    ['Responsiv tilpasning og animasjoner', '4 500 kr'],
    ['Behandlings-, laser- og prisinnhold', '6 500 kr'],
    ['Adminpanel og innholdsredigering', '6 000 kr'],
    ['Behandlingsguide og digital klinikkassistent', '5 000 kr'],
    ['Teknisk SEO, testing og publisering', '6 900 kr'],
  ]

  return (
    <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-[#CFE5F6] bg-[#EAF4FC] shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
      <div className="border-b border-[#E8EDF2] bg-[#0B1120] p-6 text-white sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#59B9F2]">Pristilbud</p>
            <h3 className="mt-2 text-2xl font-bold sm:text-3xl">Ny nettside for Lørenskog Tannlegesenter</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
              Design, utvikling og publisering av moderne nettside med behandlingsinnhold, Fotona/laser,
              prisvisning, administrasjonspanel, interaktiv behandlingsguide, digital klinikkassistent
              og skreddersydd visuelt innhold.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 sm:text-right">
            <p className="text-xs text-white/50">Tilbudssum eks. mva.</p>
            <p className="mt-1 text-3xl font-bold">49 900 kr</p>
            <p className="mt-1 text-xs text-white/45">62 375 kr inkl. mva.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-7 bg-[#EAF4FC] p-6 sm:p-8 lg:grid-cols-[1.3fr_.7fr]">
        <div>
          <h4 className="text-base font-bold">Leveransen omfatter</h4>

          <div className="mt-4 overflow-hidden rounded-xl border border-[#CFE5F6] bg-white">
            {offerLines.map(([label, price], index) => (
              <div
                key={label}
                className={`flex items-center justify-between gap-5 px-4 py-3.5 text-sm ${
                  index !== offerLines.length - 1 ? 'border-b border-[#EDF1F4]' : ''
                }`}
              >
                <span className="text-[#53606D]">{label}</span>
                <span className="shrink-0 font-semibold text-[#0B1120]">{price}</span>
              </div>
            ))}
          </div>

          <h4 className="mt-7 text-base font-bold">Inkludert i leveransen</h4>

          <ul className="mt-4 space-y-2.5 rounded-xl border border-[#CFE5F6] bg-white/75 p-5 text-sm text-[#53606D]">
            {[
              'Skreddersydd nettside i React / TypeScript',
              'Responsivt design for mobil og desktop',
              'Behandlinger, prisstruktur og konverteringsfokuserte handlingsknapper',
              'Utvidet Fotona / laserpresentasjon med flere behandlingsområder',
              'Pasientvurderinger, kontaktseksjon og tydelig timebestilling',
              'Animasjoner, scroll-effekter og moderne brukeropplevelse',
              'Produksjonsoppsett og publisering av nettsiden',
              'Klargjøring for domene- og DNS-konfigurasjon',
              'Interaktiv behandlingsguide for pasienter',
              'Digital klinikkassistent for vanlige spørsmål og veiledning',
              'Adminpanel for behandlinger, priser, laser, team og klinikkinnstillinger',
              'Skreddersydd visuelt innhold og egne illustrasjoner/bilder til sentrale seksjoner',
              'Grunnleggende teknisk SEO og ytelsesoptimalisering',
              'Testing på mobil og desktop før lansering',
              'Cookie-banner og grunnleggende produksjonsoppsett',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 leading-relaxed">
                <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#0073C9]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 space-y-3">
            <div className="rounded-xl border border-[#CFE5F6] bg-white/80 p-4 text-sm leading-relaxed text-[#315A78]">
              Den digitale klinikkassistenten og behandlingsguiden settes opp for vanlige spørsmål om behandlinger,
              priser, åpningstider, laser, tannlegeskrekk, kontakt og timebestilling. Eventuell senere
              tilkobling til ekstern AI-tjeneste, journalsystem eller booking-API avtales separat.
            </div>

            <div className="rounded-xl border border-[#CFE5F6] bg-white/80 p-4 text-sm leading-relaxed text-[#315A78]">
              Adminpanelet i denne leveransen omfatter redigering av nettsideinnhold og lokale utkast.
              Produksjonsklar backend, sikker innlogging, database, pasientportal eller lagring av
              helseopplysninger er ikke inkludert og må eventuelt avtales som eget prosjekt.
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-[#CFE5F6] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8793A0]">Pris</p>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#697684]">Sum eks. mva.</span>
                <span className="font-semibold">49 900 kr</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#697684]">Mva. 25 %</span>
                <span className="font-semibold">12 475 kr</span>
              </div>

              <div className="border-t border-[#DDE5EC] pt-4">
                <div className="flex items-end justify-between gap-4">
                  <span className="text-sm font-semibold">Totalt inkl. mva.</span>
                  <span className="text-2xl font-bold text-[#0073C9]">62 375 kr</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#E7ECF2] bg-white p-6">
            <h4 className="font-bold">Forutsetninger</h4>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#6F7B87]">
              <p>Tilbudet gjelder nettsiden, administrasjonspanel, behandlingsguide, digital klinikkassistent, skreddersydd laserinnhold og produksjonsoppsett for ferdig publisering.</p>
              <p>Større nye funksjoner, produksjonsklar backend/database, eksterne integrasjoner, avansert booking, pasientportal eller behandling av sensitive pasientdata avtales separat.</p>
              <p>Eventuelle abonnementer og tredjepartskostnader hos domeneleverandør, webhotell, e-postleverandør eller andre eksterne tjenester faktureres av leverandøren og kommer i tillegg dersom de oppstår.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsPanel({ settings, setSettings }: { settings: Record<string, string>; setSettings: React.Dispatch<React.SetStateAction<Record<string, string>>> }) {
  const update = (key: string, value: string) => setSettings((current) => ({ ...current, [key]: value }))
  return (
    <AdminSection title="Innstillinger" description="Grunnleggende klinikkinformasjon som skal brukes på nettsiden.">
      <div className="max-w-3xl rounded-2xl border border-[#E7ECF2] bg-white p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Klinikknavn" value={settings.clinicName} onChange={(e) => update('clinicName', e.target.value)} className="sm:col-span-2" />
          <Field label="Telefon" value={settings.phone} onChange={(e) => update('phone', e.target.value)} />
          <Field label="E-post" value={settings.email} onChange={(e) => update('email', e.target.value)} />
          <Field label="Adresse" value={settings.address} onChange={(e) => update('address', e.target.value)} className="sm:col-span-2" />
          <Field label="Åpningstider" value={settings.hours} onChange={(e) => update('hours', e.target.value)} className="sm:col-span-2" />
        </div>
        <div className="mt-7 border-t border-[#EDF1F4] pt-6"><h3 className="text-sm font-bold">Publisering</h3><div className="mt-4 flex items-center justify-between rounded-xl bg-[#F8FAFC] p-4"><div><p className="text-sm font-medium">Vis klinikken som åpen for nye pasienter</p><p className="mt-1 text-xs text-[#8B97A3]">Kan senere brukes til å styre tekst og bookingknapper.</p></div><Switch defaultChecked /></div></div>
      </div>
    </AdminSection>
  )
}

function AdminSection({ title, description, action, children }: { title: string; description: string; action?: React.ReactNode; children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl"><div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-2xl font-bold tracking-tight">{title}</h2><p className="mt-2 text-sm text-[#7D8995]">{description}</p></div>{action}</div>{children}</div>
}

function Field({ label, className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <div className={className}><Label>{label}</Label><Input {...props} className="mt-2 border-[#E4EAF0]" /></div>
}
