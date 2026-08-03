const reviews = [
  {
    title: 'Trygg og godt ivaretatt',
    text: 'Følte meg trygg og godt ivaretatt med en gang. Hun forklarte hele veien hva hun gjorde og hva hun tenkte videre.',
    date: '12. mars 2026',
  },
  {
    title: 'Profesjonell og grundig',
    text: 'Utrolig profesjonell, rolig og grundig. Behandlingen var skånsom, og hele teamet var vennlig og imøtekommende.',
    date: '9. mars 2026',
  },
  {
    title: 'Tannlegeskrekken forsvant',
    text: 'Hun kurerte tannlegeskrekken min for noen år siden, og siden har det vært en fryd å gå til tannlegen.',
    date: '8. desember 2025',
  },
  {
    title: 'Raskt og smertefritt',
    text: 'Jeg fikk trukket to visdomstenner. Det gikk raskt og smertefritt, og tannlegen forklarte prosessen godt.',
    date: '22. februar 2025',
  },
  {
    title: 'Ro og trygghet',
    text: 'Her får du en følelse av ro og trygghet fra du kommer inn døra til du går. Hun forklarer godt og får deg til å slappe av.',
    date: '13. august 2025',
  },
  {
    title: 'Resultat over forventning',
    text: 'Kompetent og hyggelig. Resultatet var over all forventning, og jeg er svært fornøyd.',
    date: '3. juni 2026',
  },
]

export default function ReviewsSection() {
  return (
    <section
      id="vurderinger"
      className="relative overflow-hidden bg-[#0B1120] px-4 py-24 text-white sm:px-6 lg:py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0073C9]/10 via-transparent to-[#F2A900]/10" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#F2A900]">
            Pasientvurderinger
          </p>

          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Derfor anbefaler pasientene oss
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
            Pasientene fremhever særlig trygghet, grundighet, god kommunikasjon
            og skånsom behandling.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-2">
            <div
              className="text-3xl tracking-[0.15em] text-[#F2A900]"
              aria-label="5 av 5 stjerner"
            >
              ★★★★★
            </div>

            <p className="text-xl font-semibold text-white">
              5,0 av 5 på Legelisten
            </p>

            <p className="text-sm text-white/45">
              Basert på publiserte pasientvurderinger
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={`${review.title}-${review.date}`}
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <div
                className="text-lg tracking-wider text-[#F2A900]"
                aria-label="5 av 5 stjerner"
              >
                ★★★★★
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                {review.title}
              </h3>

              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-white/70">
                «{review.text}»
              </blockquote>

              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="text-sm font-medium text-white/55">
                  Pasientvurdering på Legelisten
                </p>

                <p className="mt-1 text-xs text-white/35">{review.date}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://www.legelisten.no/klinikker/11384-lorenskog-tannlegesenter-as"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-[260px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-9 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
          >
            Les alle vurderinger på Legelisten
          </a>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-white/30">
          Tekstene er korte utdrag og bearbeidede sammendrag av offentlig
          publiserte pasientvurderinger. Fullstendige vurderinger finnes på
          Legelisten.
        </p>
      </div>
    </section>
  )
}