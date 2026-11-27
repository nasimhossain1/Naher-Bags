
import { ArrowRight, Heart, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'

const newProducts = [
  {
    id: 1,
    name: 'Luxury Shoulder Bag',
    category: 'Shoulder Bags',
    price: 1950,
    image: 'photo-1548036328-c9fa89d128fa',
  },
  {
    id: 2,
    name: 'Classic Ladies Handbag',
    category: 'Ladies Bags',
    price: 2250,
    image: 'photo-1584917865442-de89df76afd3',
  },
  {
    id: 3,
    name: 'Modern Travel Backpack',
    category: 'Backpacks',
    price: 1750,
    image: 'photo-1553062407-98eeb64c6a62',
  },
]

function NewArrivals() {
  const addToCart = (product) => {
    toast.success(`${product.name} added to cart!`)
  }

  const addToWishlist = () => {
    toast.success('Added to wishlist!')
  }

  return (
    <section className="container-width py-20">

      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand-gold">
            JUST ARRIVED
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-brand-black md:text-4xl">
            New Arrivals
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Explore the latest additions to our collection.
          </p>
        </div>

        <a
          href="/shop"
          className="hidden items-center gap-2 text-sm font-semibold text-brand-black transition hover:text-brand-gold sm:flex"
        >
          VIEW ALL <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-7">

        {newProducts.map((product) => (
          <div key={product.id} className="group">

            <div className="relative overflow-hidden bg-brand-cream">

              <img
                src={`https://images.unsplash.com/${product.image}?w=600&q=85`}
                alt={product.name}
                loading="lazy"
                className="h-56 w-full object-cover transition duration-700 group-hover:scale-105 md:h-96"
              />

              <span className="absolute left-3 top-3 bg-brand-gold px-3 py-1 text-[10px] font-semibold tracking-widest text-white">
                NEW
              </span>

              <button
                onClick={addToWishlist}
                aria-label="Add to wishlist"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow transition hover:bg-brand-gold hover:text-white"
              >
                <Heart size={17} />
              </button>

              <button
                onClick={() => addToCart(product)}
                className="absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 bg-brand-black py-3 text-xs font-semibold tracking-widest text-white transition hover:bg-brand-gold"
              >
                <ShoppingBag size={15} />
                ADD TO CART
              </button>

            </div>

            <div className="pt-4">
              <p className="text-[10px] uppercase tracking-widest text-gray-400">
                {product.category}
              </p>

              <h3 className="mt-2 text-sm font-semibold text-brand-black md:text-base">
                {product.name}
              </h3>

              <p className="mt-2 font-bold text-brand-black">
                ৳{product.price.toLocaleString('en-BD')}
              </p>
            </div>

          </div>
        ))}

      </div>
    </section>
  )
}

export default NewArrivals
