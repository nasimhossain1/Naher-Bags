
import { useState } from 'react'
import {
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  Heart,
  X,
} from 'lucide-react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <nav className="container-width flex h-20 items-center justify-between">

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        {/* Logo */}
        <a href="/" className="text-2xl font-bold tracking-[0.15em] text-brand-black">
          NAHER<span className="font-light text-brand-gold">.</span>
          <span className="block text-[9px] font-normal tracking-[0.35em]">
            BAGS & ACCESSORIES
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="transition hover:text-brand-gold"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button aria-label="Search">
            <Search size={20} />
          </button>

          <button className="hidden sm:block" aria-label="Account">
            <UserRound size={20} />
          </button>

          <button className="hidden sm:block" aria-label="Wishlist">
            <Heart size={20} />
          </button>

          <button className="relative" aria-label="Shopping bag">
            <ShoppingBag size={21} />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] text-white">
              0
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-brand-gold"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
