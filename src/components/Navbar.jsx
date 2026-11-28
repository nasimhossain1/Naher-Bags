
import { useState } from 'react'
import {
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  Heart,
  X,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { useCart } from '../context/CartContext'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()
  const { cartCount } = useCart()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const handleSearch = (e) => {
    e.preventDefault()

    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`)
      setSearchOpen(false)
      setSearchTerm('')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container-width">
        <div className="flex h-20 items-center justify-between gap-4">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-brand-black md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={25} />
            ) : (
              <Menu size={25} />
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <h1 className="text-2xl font-bold tracking-[3px] text-brand-black">
              NAHER <span className="text-brand-gold">BAGS</span>
            </h1>
            <p className="mt-1 text-center text-[9px] tracking-[4px] text-gray-500">
              CARRY YOUR STYLE
            </p>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gray-600 transition hover:text-brand-gold"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-brand-black transition hover:text-brand-gold"
              aria-label="Search"
            >
              <Search size={21} />
            </button>

            {/* Account */}
            <button
              onClick={() => navigate('/login')}
              className="hidden text-brand-black transition hover:text-brand-gold sm:block"
              aria-label="Account"
            >
              <UserRound size={21} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => toastWishlist()}
              className="hidden text-brand-black transition hover:text-brand-gold sm:block"
              aria-label="Wishlist"
            >
              <Heart size={21} />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-brand-black transition hover:text-brand-gold"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={23} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-gold px-1 text-[10px] font-bold text-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Box */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            className="border-t border-gray-100 py-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search bags..."
                className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-gold"
                autoFocus
              />

              <button
                type="submit"
                className="bg-brand-black px-5 text-white transition hover:bg-brand-gold"
              >
                Search
              </button>
            </div>
          </form>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-gray-100 py-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block border-b border-gray-100 px-2 py-3 text-sm font-medium text-gray-600 hover:text-brand-gold"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

function toastWishlist() {
  import('react-hot-toast').then(({ default: toast }) => {
    toast('Wishlist feature coming soon!')
  })
}

export default Navbar
