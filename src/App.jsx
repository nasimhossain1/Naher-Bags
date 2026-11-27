
import {
  Truck,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react'

import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CategorySection from './components/CategorySection'
import ProductSection from './components/ProductSection'
import NewArrivals from './components/NewArrivals'
import SpecialOffers from './components/SpecialOffers'

function App() {
  return (
    <div className="min-h-screen bg-white">

      <AnnouncementBar />

      <Navbar />

      <HeroSection />

      {/* Benefits */}
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

      <CategorySection />

      <ProductSection />

      <SpecialOffers />

      <NewArrivals />

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
