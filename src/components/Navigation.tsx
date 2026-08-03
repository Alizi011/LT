import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Hjem', href: '#hjem' },
  { label: 'Tjenester', href: '#tjenester' },
  { label: 'Laser', href: '#laser' },
  { label: 'Priser', href: '#priser' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B1120]/90 shadow-lg shadow-black/10 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#hjem"
          onClick={(e) => handleNavClick(e, '#hjem')}
          className="flex items-center gap-2"
        >
          <img
            src="/logo.png"
            alt="Lørenskog Tannlegesenter"
            className="h-[68px] w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="group relative text-[15px] font-medium text-white/80 transition-colors duration-300 hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#F2A900] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <Button
            onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full bg-gradient-to-r from-[#0073C9] to-[#0099E8] px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0073C9]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#0073C9]/40 hover:-translate-y-0.5"
          >
            Bestill time
          </Button>
        </nav>

        {/* Mobile Nav */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="p-2 text-white">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] border-[#0073C9]/20 bg-[#0B1120] p-8">
            <div className="flex flex-col gap-6 pt-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-medium text-white/70 transition-colors hover:text-[#0073C9]"
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => {
                  setMobileOpen(false)
                  document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-4 rounded-full bg-gradient-to-r from-[#0073C9] to-[#0099E8] py-3 text-base font-semibold text-white"
              >
                Bestill time
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
