
import { ArrowRight, Tag } from 'lucide-react'

function SpecialOffers() {
  return (
    <section className="container-width py-12">

      <div className="relative overflow-hidden bg-brand-black px-7 py-14 text-white md:px-16 md:py-20">

        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-brand-gold/30" />

        <div className="absolute -bottom-32 -right-5 h-72 w-72 rounded-full border border-brand-gold/30" />

        <div className="relative z-10 grid items-center gap-10 md:grid-cols-2">

          <div>
            <div className="mb-5 flex items-center gap-2 text-brand-gold">
              <Tag size={18} />
              <span className="text-xs font-semibold tracking-[0.3em]">
                LIMITED TIME OFFER
              </span>
            </div>

            <h2 className="text-4xl font-light leading-tight md:text-6xl">
              Style More.
              <span className="block font-bold text-brand-gold">
                Spend Less.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-gray-300">
              Discover selected styles at special prices.
              Find your favourite bag and make every moment stylish.
            </p>

            <a
              href="/shop"
              className="mt-8 inline-flex items-center gap-3 bg-brand-gold px-7 py-4 text-xs font-bold tracking-widest text-white transition hover:bg-white hover:text-brand-black"
            >
              EXPLORE OFFERS
              <ArrowRight size={17} />
            </a>
          </div>

          <div className="flex justify-center">
            <div className="flex h-64 w-64 flex-col items-center justify-center rounded-full border border-brand-gold md:h-80 md:w-80">

              <p className="text-xs tracking-[0.3em] text-brand-gold">
                SPECIAL COLLECTION
              </p>

              <p className="mt-4 text-6xl font-bold md:text-7xl">
                SAVE
              </p>

              <p className="mt-2 text-sm tracking-widest text-brand-gold">
                MORE ON SELECTED BAGS
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default SpecialOffers
