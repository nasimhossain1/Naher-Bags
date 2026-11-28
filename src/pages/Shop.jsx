
import { useMemo, useState } from 'react'
import {
  Search,
  SlidersHorizontal,
  ShoppingBag,
  Star,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import products from '../data/products'
import { useCart } from '../context/CartContext'

function Shop() {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchTerm.trim()) {
      result = result.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== 'All') {
      result = result.filter(
        (product) => product.category === selectedCategory,
      )
    }

    switch (sortBy) {
      case 'newest':
        result.sort(
          (a, b) => Number(b.isNew) - Number(a.isNew),
        )
        break

      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break

      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break

      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break

      case 'featured':
      default:
        result.sort(
          (a, b) =>
            Number(b.isFeatured) - Number(a.isFeatured),
        )
        break
    }

    return result
  }, [searchTerm, selectedCategory, sortBy])

  const handleAddToCart = (e, product) => {
    e.stopPropagation()

    if (product.stock < 1) {
      toast.error('This product is out of stock')
      return
    }

    addToCart(product, 1)
    toast.success('Product added to cart!')
  }

  return (
    <section className="container-width min-h-screen py-12">
      {/* Page Heading */}
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-brand-gold">
          Explore Our Collection
        </p>

        <h1 className="mt-3 text-4xl font-bold text-brand-black">
          Shop All Bags
        </h1>

        <p className="mt-3 text-gray-500">
          Find the perfect bag for your everyday style.
        </p>
      </div>

      {/* Search and Sort */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search your favourite bag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-brand-gold"
          />
        </div>

        <div className="flex items-center gap-3">
          <SlidersHorizontal
            size={19}
            className="text-brand-gold"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-gold sm:w-auto"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`border px-5 py-2 text-sm transition ${
              selectedCategory === category
                ? 'border-brand-black bg-brand-black text-white'
                : 'border-gray-200 bg-white text-gray-600 hover:border-brand-gold hover:text-brand-gold'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Count */}
      <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
        <p className="text-sm text-gray-500">
          Showing{' '}
          <span className="font-semibold text-brand-black">
            {filteredProducts.length}
          </span>{' '}
          products
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/product/${product.id}`)
                }
              }}
              role="button"
              tabIndex={0}
              className="group cursor-pointer overflow-hidden border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Product Image */}
              <div className="relative h-72 overflow-hidden bg-brand-cream">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {product.oldPrice > product.price && (
                  <span className="absolute left-3 top-3 bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                    SALE
                  </span>
                )}

                {product.isNew && (
                  <span className="absolute right-3 top-3 bg-brand-gold px-3 py-1 text-xs font-semibold text-white">
                    NEW
                  </span>
                )}
              </div>

              {/* Product Information */}
              <div className="p-4">
                <p className="text-xs uppercase tracking-wider text-brand-gold">
                  {product.category}
                </p>

                <h3 className="mt-2 truncate text-base font-semibold text-brand-black">
                  {product.name}
                </h3>

                <div className="mt-2 flex items-center gap-1">
                  <Star
                    size={15}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  <span className="text-sm text-gray-500">
                    {product.rating}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-lg font-bold text-brand-black">
                    ৳{product.price.toLocaleString('en-BD')}
                  </span>

                  {product.oldPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      ৳{product.oldPrice.toLocaleString('en-BD')}
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={product.stock < 1}
                  className="mt-4 flex w-full items-center justify-center gap-2 bg-brand-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  <ShoppingBag size={17} />
                  {product.stock > 0
                    ? 'Add to Cart'
                    : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <ShoppingBag
            size={45}
            className="mx-auto text-gray-300"
          />

          <h3 className="mt-4 text-xl font-semibold text-brand-black">
            No Products Found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Try another search or select a different category.
          </p>

          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('All')
            }}
            className="mt-5 bg-brand-black px-6 py-3 text-sm font-semibold text-white hover:bg-brand-gold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  )
}

export default Shop
