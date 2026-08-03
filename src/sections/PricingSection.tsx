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
    title: 'Undersøkelse og rens',
    gradient: 'from-[#0073C9] to-[#0099E8]',
    items: [
      {
        name: 'Undersøkelse inkl. røntgen, enkel rens og puss',
        price: '1 340 kr',
      },
      {
        name: 'Akutt undersøkelse',
        price: '690 kr',
      },
      {
        name: 'Hygienetiltak',
        price: '199 kr',
      },
      {
        name: 'Røntgenbilde',
        price: '200 kr',
      },
      {
        name: 'Dyp tannrens – egenandel',
        price: 'fra 690 kr',
      },
      {
        name: 'Vanlig tannrens ved omfattende tannstein',
        price: 'fra 650 kr',
      },
    ],
  },
  {
    title: 'Fylling og rotfylling',
    gradient: 'from-[#0099E8] to-[#00B4D8]',
    items: [
      {
        name: 'Fylling – 1 flate',
        price: '1 500 kr',
      },
      {
        name: 'Fylling – 2 flater',
        price: '1 890 kr',
      },
      {
        name: 'Fylling – 3 flater eller mer',
        price: 'fra 2 100 kr',
      },
      {
        name: 'Midlertidig fylling',
        price: '590 kr',
      },
      {
        name: 'Rotfylling – fortann',
        price: 'fra 4 200 kr',
      },
      {
        name: 'Rotfylling – liten jeksel',
        price: 'fra 4 800 kr',
      },
      {
        name: 'Rotfylling – jeksel',
        price: 'fra 5 500 kr',
      },
    ],
  },
  {
    title: 'Tanntrekking',
    gradient: 'from-[#1167B1] to-[#0073C9]',
    items: [
      {
        name: 'Tanntrekking – enkel',
        price: 'fra 1 890 kr',
      },
      {
        name: 'Tanntrekking – komplisert',
        price: 'fra 2 600 kr',
      },
      {
        name: 'Tanntrekking – perio-tann',
        price: '890 kr',
      },
    ],
  },
  {
    title: 'Protetikk og estetikk',
    gradient: 'from-[#F2A900] to-[#FFB800]',
    items: [
      {
        name: 'Tannkrone inkl. hygienetiltak og bedøvelse',
        price: '7 400–7 990 kr',
      },
      {
        name: 'Tannbro inkl. hygienetiltak og bedøvelse – pr. ledd',
        price: '7 400 kr',
      },
      {
        name: 'Tannprotese inkl. teknikerutgift',
        price: 'fra 14 000 kr',
      },
      {
        name: 'Tannbleking – 2 kjever',
        price: '3 990 kr',
      },
      {
        name: 'Bittskinne – egenandel',
        price: '3 190 kr',
      },
    ],
  },
]

export default function PricingSection() {
  return (
    <section
      id="priser"
      className="relative overflow-hidden bg-[#F0F5FA] py-24 md:py-32"
    >
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

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#5A6B78]">
              30 % rabatt for nye pasienter på første undersøkelse.
              Pensjonister og studenter får 10 % rabatt.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal
          className="grid gap-6 md:grid-cols-2"
          y={40}
          stagger={0.12}
        >
          {priceCards.map((card) => (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0073C9]/10"
            >
              <div className={`bg-gradient-to-r ${card.gradient} px-8 py-6`}>
                <h3 className="font-display text-xl font-bold text-white">
                  {card.title}
                </h3>
              </div>

              <div className="p-6 sm:p-8">
                <ul>
                  {card.items.map((item, index) => (
                    <li
                      key={item.name}
                      className={`flex items-start justify-between gap-5 py-4 ${
                        index < card.items.length - 1
                          ? 'border-b border-[#EDF2F8]'
                          : ''
                      }`}
                    >
                      <span className="max-w-[70%] text-sm leading-relaxed text-[#0B1120]">
                        {item.name}
                      </span>

                      <span className="shrink-0 text-right text-sm font-bold text-[#0073C9]">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </ScrollReveal>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-sm leading-relaxed text-[#7A8798]">
            Prisene er veiledende. Du får informasjon om forventet pris og
            behandlingsbehov før behandlingen starter.
          </p>

          <p className="mt-2 text-sm leading-relaxed text-[#8A95A8]">
            Avbestilling må meldes senest 24 timer før avtalen. Ubenyttet
            timeavtale faktureres med 1 500 kr per klokketime eller avsatt tid.
          </p>
        </div>
      </div>
    </section>
  )
}