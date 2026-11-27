
import {
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

function Footer() {
  return (
    <footer id="contact" className="bg-brand-black text-white">

      <div className="container-width grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold tracking-[0.2em]">
            NAHER BAGS
          </h2>

          <p className="mt-3 text-xs tracking-widest text-brand-gold">
            CARRY YOUR STYLE.
          </p>

          <p className="mt-6 max-w-xs text-sm leading-7 text-gray-400">
            Discover your perfect bag with Naher Bags.
            Style, elegance and quality for every journey.
          </p>

          <div className="mt-6 flex gap-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={19} className="transition hover:text-brand-gold" />
            </a>

            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={19} className="transition hover:text-brand-gold" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-6 text-sm font-semibold tracking-widest">
            QUICK LINKS
          </h3>

          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="/" className="hover:text-brand-gold">Home</a></li>
            <li><a href="/shop" className="hover:text-brand-gold">Shop</a></li>
            <li><a href="/about" className="hover:text-brand-gold">About Us</a></li>
            <li><a href="/contact" className="hover:text-brand-gold">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="mb-6 text-sm font-semibold tracking-widest">
            CUSTOMER SERVICE
          </h3>

          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="/shipping-policy" className="hover:text-brand-gold">Shipping Policy</a></li>
            <li><a href="/return-policy" className="hover:text-brand-gold">Return Policy</a></li>
            <li><a href="/privacy-policy" className="hover:text-brand-gold">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-brand-gold">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-6 text-sm font-semibold tracking-widest">
            CONTACT US
          </h3>

          <ul className="space-y-5 text-sm text-gray-400">

            <li className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0 text-brand-gold" />
              Bangladesh
            </li>

            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-gold" />
              <span>+880 1XXXXXXXXX</span>
            </li>

            <li className="flex items-center gap-3">
              <Mail size={18} className="text-brand-gold" />
              <span>support@naherbags.com</span>
            </li>

            <li className="flex items-center gap-3">
              <MessageCircle size={18} className="text-brand-gold" />
              <span>WhatsApp Support</span>
            </li>

          </ul>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container-width flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row">

          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Naher Bags. All rights reserved.
          </p>

          <p className="text-xs text-gray-400">
            Designed with care for your style.
          </p>

        </div>
      </div>

    </footer>
  )
}

export default Footer
