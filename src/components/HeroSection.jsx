
import { ArrowRight } from 'lucide-react'

function HeroSection() {
  return (
    <section className="relative flex min-h-[570px] items-center overflow-hidden bg-brand-cream">
      <div className="container-width grid items-center gap-10 py-16 md:grid-cols-2">

        <div className="z-10">
          <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-brand-gold">
            ELEGANCE IN EVERY DETAIL
          </p>

          <h1 className="max-w-xl text-5xl font-light leading-tight text-brand-black md:text-7xl">
            Carry Your
            <span className="block font-semibold">Style.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-gray-600">
            Discover bags that complement your personality.
            Designed for everyday elegance and made for every journey.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="/shop"
              className="inline-flex items-center gap-3 bg-brand-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-brand-gold"
            >
              SHOP NOW
              <ArrowRight size={17} />
            </a>

            <a
              href="#categories"
              className="border border-brand-black px-8 py-4 text-sm font-semibold transition hover:bg-brand-black hover:text-white"
            >
              EXPLORE
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-5 -top-5 h-full w-full border border-brand-gold md:-right-7 md:-top-7" />

          <img
            src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1000&q=85"
            alt="Elegant fashion handbag"
            className="relative h-[390px] w-full object-cover md:h-[470px]"
          />

          <div className="absolute bottom-5 left-5 bg-white px-5 py-4 shadow-lg">
            <p className="text-xs tracking-widest text-brand-gold">
              NEW COLLECTION
            </p>

            <p className="mt-1 text-sm font-semibold">
              Discover Your Style
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection
