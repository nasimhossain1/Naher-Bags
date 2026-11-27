
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react'

import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'

function App() {
  const categories = [
    {
      name: 'Ladies Bags',
      image: 'photo-1584917865442-de89df76afd3',
    },
    {
      name: 'Backpacks',
      image: 'photo-1553062407-98eeb64c6a62',
    },
    {
      name: 'Travel Bags',
      image: 'photo-1553062407-1e7e640cc6c0',
    },
    {
      name: 'Office Bags',
      image: 'photo-1553062407-7b4c4f1a0c6d',
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
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
                SHOP NOW <ArrowRight size={17} />
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

      {/* Benefits Section */}
      <section className="border-b border-gray-100 py-8">
        <div className="container-width grid grid-cols-1 gap-7 sm:grid-cols-3">

          <div className="flex items-center justify-center gap-3">
            <Truck className="text-brand-gold" size={27} />
            <div>
              <p className="text-sm font-semibold">Fast Delivery</p>
              <p className="text-xs text-gray-500">
                Across Bangladesh
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="text-brand-gold" size={27} />
            <div>
              <p className="text-sm font-semibold">Quality Products</p>
              <p className="text-xs text-gray-500">
                Carefully selected bags
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <RefreshCw className="text-brand-gold" size={27} />
            <div>
              <p className="text-sm font-semibold">Easy Support</p>
              <p className="text-xs text-gray-500">
                Here to help you
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Section */}
      <section
        id="categories"
        className="container-width py-20"
      >
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-brand-gold">
            FIND YOUR PERFECT BAG
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-brand-black md:text-4xl">
            Explore Categories
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Something beautiful for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <a
              href="/shop"
              key={category.name}
              className="group"
            >
              <div className="overflow-hidden bg-brand-cream">
                <img
                  src={`https://images.unsplash.com/${category.image}?w=500&q=80`}
                  alt={category.name}
                  loading="lazy"
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 md:h-72"
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <h3 className="text-sm font-semibold md:text-base">
                  {category.name}
                </h3>

                <ArrowRight
                  size={17}
                  className="text-brand-gold"
                />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-brand-black py-12 text-white"
      >
        <div className="container-width text-center">
          <h2 className="text-2xl font-bold tracking-[0.2em]">
            NAHER BAGS
          </h2>

          <p className="mt-3 text-sm tracking-widest text-brand-gold">
            CARRY YOUR STYLE.
          </p>

          <p className="mt-8 text-xs text-gray-400">
            © {new Date().getFullYear()} Naher Bags. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  )
}

export default App
