
import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, ShoppingBag, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import products from '../data/products'

function Shop() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (search.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (category !== 'All') {
      result = result.filter(
        (product) => product.category === category,
      )
    }

    if (sort === 'low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sort === 'high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sort === 'newest') {
      result.sort((a, b) => Number(b.isNew) - Number(a.isNew))
    } else {
      result.sort(
        (a, b) => Number(b.isFeatured) - Number(a.isFeatured),
      )
    }

    return result
  }, [search, category, sort])

  const addToCart = (e, product) => {
    e.stopPropagation()
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <main className="min-h-screen bg-white">

      <section className="bg-brand-cream py-16 text-center">
        <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-brand-gold">
          EXPLORE OUR COLLECTION
        </p>

        <h1 className="text-4xl font-bold text-brand-black md:text-5xl">
          Shop All Bags
        </h1>

        <p className="mt-4 text-sm text-gray-500">
          Find the perfect bag for every moment.
        </p>
      </section>

      <section className="container-width py-12">

        {/* Search and Sorting */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-sm">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search your favourite bag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-gold"
            />
          </div>

          <div className="flex items-center gap-3">
            <SlidersHorizontal size={18} className="text-brand-gold" />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-gold sm:w-auto"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-10">
          <h3 className="mb-4 text-sm font-semibold tracking-wider">
            SHOP BY CATEGORY
          </h3>

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2 text-xs transition ${
                  category === item
                    ? 'border-brand-black bg-brand-black text-white'
                    : 'border-gray-200 text-gray-600 hover:border-brand-gold hover:text-brand-gold'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/product/${product.id}`)
                  }
                }}
                role="link"
                tabIndex={0}
                className="group cursor-pointer"
              >

                <div className="relative overflow-hidden bg-brand-cream">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {product.oldPrice > product.price && (
                    <span className="absolute left-3 top-3 bg-brand-black px-3 py-1 text-[10px] text-white">
                      SALE
                    </span>
                  )}
                </div>

                <div className="pt-4">
                  <p className="mb-2 text-[10px] uppercase tracking-widest text-gray-400">
                    {product.category}
                  </p>

                  <h3 className="min-h-10 text-sm font-semibold text-brand-black">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1 text-xs text-brand-gold">
                    <Star size={13} fill="currentColor" />
                    <span>{product.rating}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-brand-black">
                      ৳{product.price.toLocaleString('en-BD')}
                    </span>

                    {product.oldPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ৳{product.oldPrice.toLocaleString('en-BD')}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => addToCart(e, product)}
                    className="mt-4 flex w-full items-center justify-center gap-2 bg-brand-black py-3 text-xs font-semibold text-white transition hover:bg-brand-gold"
                  >
                    <ShoppingBag size={15} />
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch('')
                setCategory('All')
              }}
              className="mt-5 bg-brand-black px-6 py-3 text-sm text-white"
            >
              Clear Filters
            </button>
          </div>
        )}

      </section>
    </main>
  )
}

export default Shop
