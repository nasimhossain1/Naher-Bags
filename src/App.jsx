
import { Routes, Route, Outlet } from 'react-router-dom'
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
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

import Shop from './pages/Shop'

function Home() {
  return (
    <>
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
      <Newsletter />
    </>
  )
}

function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />

      <Outlet />

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  )
}

export default App
