import { Phone, Mail, MapPin } from 'lucide-react'

const tjenester = ['Generell tannhelse', 'Laserbehandlinger', 'Estetisk tannbehandling', 'Tannlegeskrekk', 'Akutthjelp']
const snarveier = [
  { label: 'Bestill time', href: '#kontakt' },
  { label: 'Priser', href: '#priser' },
  { label: 'Om oss', href: '#om-oss' },
]

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && href !== '#') { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }
  }

  return (
    <footer className="bg-[#060B14] border-t border-white/[0.04]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <img src="/logo.png" alt="Lørenskog Tannlegesenter" className="h-[180px] w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-white/90">
              Moderne tannklinikk i Lørenskog med avansert laserteknologi og fokus på din livskvalitet.
            </p>
          </div>

          {/* Tjenester */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">Tjenester</h4>
            <ul className="mt-5 space-y-3">
              {tjenester.map(t => (
                <li key={t} className="text-sm text-white/30">{t}</li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">Kontakt</h4>
            <ul className="mt-5 space-y-4">
              {[
                { icon: Phone, label: '67 90 40 90' },
                { icon: Mail, label: 'kontakt@lorenskogtannlege.no' },
                { icon: MapPin, label: 'Skårersletta 10, 1473 Lørenskog' },
              ].map(item => (
                <li key={item.label} className="flex items-center gap-3 text-sm text-white/30">
                  <item.icon size={14} className="text-[#0073C9]" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Snarveier */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">Snarveier</h4>
            <ul className="mt-5 space-y-3">
              {snarveier.map(s => (
                <li key={s.label}>
                  <a href={s.href} onClick={(e) => handleClick(e, s.href)} className="text-sm text-white/30 transition-colors hover:text-[#0099E8]">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8">
          <p className="text-xs text-white/15">© 2025 Lørenskog Tannlegesenter. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  )
}
