
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react'

import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

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

      <AnnouncementBar />
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Section */}
      <section className="border-b border-gray-100 py-8">
        <div className="container-width grid grid-cols-1 gap-7 sm:grid-cols-3">

          <div className="flex items-center justify-center gap-3">
            <Truck className="text-brand-gold" size={27} />
            <div>
              <p className="text-sm font-semibold">Fast Delivery</p>
              <p className="text-xs text-gray-500">Across Bangladesh</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="text-brand-gold" size={27} />
            <div>
              <p className="text-sm font-semibold">Quality Products</p>
              <p className="text-xs text-gray-500">Carefully selected bags</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <RefreshCw className="text-brand-gold" size={27} />
            <div>
              <p className="text-sm font-semibold">Easy Support</p>
              <p className="text-xs text-gray-500">Here to help you</p>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="container-width py-20">
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
            <a href="/shop" key={category.name} className="group">
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

                <ArrowRight size={17} className="text-brand-gold" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-brand-black py-12 text-white">
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
