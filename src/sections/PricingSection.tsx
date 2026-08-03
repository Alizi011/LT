import ScrollReveal from '@/components/ScrollReveal'

interface PriceItem {
  name: string
  price: string
}

interface PriceCard {
  title: string
  gradient: string
  items: PriceItem[]
}

const priceCards: PriceCard[] = [
  {
    title: 'Undersøkelse',
    gradient: 'from-[#0073C9] to-[#0099E8]',
    items: [
      { name: 'Undersøkelse inkl. røntgen, rens', price: '1 340 kr' },
      { name: 'Akutt undersøkelse', price: '690 kr' },
      { name: 'Røntgenbilde', price: '200 kr' },
      { name: 'Dyp tannrens (egenandel)', price: 'fra 690 kr' },
      { name: 'Vanlig tannrens', price: 'fra 650 kr' },
    ],
  },
  {
    title: 'Behandling',
    gradient: 'from-[#0099E8] to-[#00B4D8]',
    items: [
      { name: 'Fylling 1 flate', price: '1 500 kr' },
      { name: 'Fylling 2 flater', price: '1 890 kr' },
      { name: 'Fylling 3+ flater', price: 'fra 2 100 kr' },
      { name: 'Rotfylling fortann', price: 'fra 4 200 kr' },
      { name: 'Rotfylling jeksel', price: 'fra 5 500 kr' },
    ],
  },
  {
    title: 'Protetikk',
    gradient: 'from-[#F2A900] to-[#FFB800]',
    items: [
      { name: 'Tannkrone inkl. hygiene', price: '7 400–7 990 kr' },
      { name: 'Tannbro (per ledd)', price: '7 400 kr' },
      { name: 'Tannprotese', price: 'fra 14 000 kr' },
      { name: 'Tannbleking (2 kjever)', price: '3 990 kr' },
      { name: 'Bittskinne', price: '3 190 kr' },
    ],
  },
]

export default function PricingSection() {
  return (
    <section id="priser" className="relative overflow-hidden bg-[#F0F5FA] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal y={30}>
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full bg-[#0073C9]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0073C9]">
              Priser
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-[#0B1120] md:text-5xl">
              Transparente priser —{' '}
              <span className="text-[#0073C9]">ingen overraskelser</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[#5A6B78]">
              30% rabatt for nye pasienter på første undersøkelse. Pensjonister og studenter 10% rabatt.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="grid gap-6 md:grid-cols-3" y={40} stagger={0.12}>
          {priceCards.map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0073C9]/10"
            >
              {/* Farget header */}
              <div className={`bg-gradient-to-r ${card.gradient} px-8 py-6`}>
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
              </div>

              <div className="p-8">
                <ul className="space-y-0">
                  {card.items.map((item, i) => (
                    <li
                      key={item.name}
                      className={`flex items-center justify-between gap-4 py-3.5 ${
                        i < card.items.length - 1 ? 'border-b border-[#EDF2F8]' : ''
                      }`}
                    >
                      <span className="text-sm text-[#0B1120]">{item.name}</span>
                      <span className="shrink-0 text-sm font-bold text-[#0073C9]">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </ScrollReveal>

        <p className="mt-8 text-center text-sm text-[#8A95A8]">
          OBS: Avbestilling må meldes senest 24 timer før avtalen. Alle priser er veiledende.
        </p>
      </div>
    </section>
  )
}
