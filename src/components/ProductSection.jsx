
import { useState } from 'react'
import { Heart, ShoppingBag, Star, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const products = [
  {
    id: 1,
    name: 'Elegant Ladies Handbag',
    category: 'Ladies Bags',
    price: 1850,
    oldPrice: 2300,
    rating: 4.8,
    reviews: 24,
    image: 'photo-1584917865442-de89df76afd3',
    badge: 'BEST SELLER',
  },
  {
    id: 2,
    name: 'Classic Travel Backpack',
    category: 'Backpacks',
    price: 1450,
    oldPrice: 1800,
    rating: 4.7,
    reviews: 18,
    image: 'photo-1553062407-98eeb64c6a62',
    badge: 'POPULAR',
  },
  {
    id: 3,
    name: 'Premium Everyday Bag',
    category: 'Shoulder Bags',
    price: 1650,
    oldPrice: 2100,
    rating: 4.9,
    reviews: 32,
    image: 'photo-1548036328-c9fa89d128fa',
    badge: 'NEW',
  },
  {
    id: 4,
    name: 'Stylish Office Bag',
    category: 'Office Bags',
    price: 2200,
    oldPrice: 2700,
    rating: 4.6,
    reviews: 15,
    image: 'photo-1553062407-7b4c4f1a0c6d',
    badge: 'POPULAR',
  },
]

function ProductSection() {
  const [cartCount, setCartCount] = useState(0)
  const [wishlist, setWishlist] = useState([])

  const addToCart = (product) => {
    setCartCount((previous) => previous + 1)
    toast.success(`${product.name} added to cart!`)
  }

  const toggleWishlist = (productId) => {
    setWishlist((previous) => {
      if (previous.includes(productId)) {
        toast.success('Removed from wishlist')
        return previous.filter((id) => id !== productId)
      }

      toast.success('Added to wishlist')
      return [...previous, productId]
    })
  }

  return (
    <section id="shop" className="container-width py-20">

      {/* Section Heading */}
      <div className="mb-10 flex flex-col items-center justify-between gap-5 sm:flex-row">

        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand-gold">
            CUSTOMER FAVORITES
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-brand-black md:text-4xl">
            Best Selling Products
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Discover our most loved bags.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-brand-black">
          <ShoppingBag size={18} />
          Cart Items: {cartCount}
        </div>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-6">

        {products.map((product) => (
          <div key={product.id} className="group">

            {/* Product Image */}
            <div className="relative overflow-hidden bg-brand-cream">

              <img
                src={`https://images.unsplash.com/${product.image}?w=600&q=85`}
                alt={product.name}
                loading="lazy"
                className="h-52 w-full object-cover transition duration-700 group-hover:scale-105 md:h-80"
              />

              {/* Product Badge */}
              <span className="absolute left-3 top-3 bg-brand-black px-3 py-1 text-[9px] font-semibold tracking-widest text-white">
                {product.badge}
              </span>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow transition hover:bg-brand-gold hover:text-white"
              >
                <Heart
                  size={17}
                  fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                  className={wishlist.includes(product.id) ? 'text-red-500' : ''}
                />
              </button>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product)}
                className="absolute bottom-0 left-0 w-full translate-y-full bg-brand-black py-3 text-xs font-semibold tracking-widest text-white transition duration-300 group-hover:translate-y-0 hover:bg-brand-gold max-md:static max-md:translate-y-0"
              >
                ADD TO CART
              </button>

            </div>

            {/* Product Information */}
            <div className="pt-4">

              <p className="text-[10px] uppercase tracking-widest text-gray-400">
                {product.category}
              </p>

              <h3 className="mt-2 text-sm font-semibold text-brand-black md:text-base">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1">
                <Star
                  size={13}
                  fill="#B89B72"
                  className="text-brand-gold"
                />

                <span className="text-xs font-semibold">
                  {product.rating}
                </span>

                <span className="text-xs text-gray-400">
                  ({product.reviews} Reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-base font-bold text-brand-black">
                  ৳{product.price.toLocaleString('en-BD')}
                </span>

                <span className="text-xs text-gray-400 line-through">
                  ৳{product.oldPrice.toLocaleString('en-BD')}
                </span>
              </div>

            </div>

          </div>
        ))}

      </div>

      {/* View All */}
      <div className="mt-12 text-center">
        <a
          href="/shop"
          className="inline-flex items-center gap-3 border border-brand-black px-8 py-4 text-xs font-semibold tracking-widest transition hover:bg-brand-black hover:text-white"
        >
          VIEW ALL PRODUCTS
          <ArrowRight size={16} />
        </a>
      </div>

    </section>
  )
}

export default ProductSection
