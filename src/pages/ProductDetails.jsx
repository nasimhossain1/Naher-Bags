
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  ArrowLeft,
} from 'lucide-react'
import toast from 'react-hot-toast'

import products from '../data/products'
import { useCart } from '../context/CartContext'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = products.find(
    (item) => item.id === Number(id),
  )

  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container-width py-24 text-center">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <button
          onClick={() => navigate('/shop')}
          className="mt-5 bg-brand-black px-6 py-3 text-white"
        >
          Back to Shop
        </button>
      </div>
    )
  }

  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) /
          product.oldPrice) *
          100,
      )
    : 0

  const handleAddToCart = () => {
    if (product.stock < 1) {
      toast.error('This product is out of stock')
      return
    }

    addToCart(product, quantity)
    toast.success('Product added to cart!')
  }

  const handleBuyNow = () => {
    if (product.stock < 1) {
      toast.error('This product is out of stock')
      return
    }

    addToCart(product, quantity)
    navigate('/cart')
  }

  return (
    <section className="container-width py-12">
      <button
        onClick={() => navigate('/shop')}
        className="mb-8 flex items-center gap-2 text-sm text-gray-600 hover:text-brand-gold"
      >
        <ArrowLeft size={18} />
        Back to Shop
      </button>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Product Image */}
        <div className="overflow-hidden bg-brand-cream">
          <img
            src={product.image}
            alt={product.name}
            className="h-[450px] w-full object-cover"
          />
        </div>

        {/* Product Information */}
        <div>
          <p className="text-sm uppercase tracking-widest text-brand-gold">
            {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-brand-black">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-2">
            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm text-gray-400">
              Customer Rating
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl font-bold text-brand-black">
              ৳{product.price.toLocaleString('en-BD')}
            </span>

            {product.oldPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ৳{product.oldPrice.toLocaleString('en-BD')}
                </span>
                <span className="bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <p className="mt-6 leading-7 text-gray-600">
            {product.description}
          </p>

          <div className="mt-6 space-y-3 border-y border-gray-100 py-5 text-sm">
            <p>
              <strong>Color:</strong> {product.color}
            </p>
            <p>
              <strong>Material:</strong> {product.material}
            </p>
            <p>
              <strong>Availability:</strong>{' '}
              {product.stock > 0
                ? `${product.stock} items in stock`
                : 'Out of stock'}
            </p>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold">Quantity</p>

            <div className="flex w-fit items-center border border-gray-300">
              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                disabled={quantity <= 1}
                className="p-3 disabled:opacity-40"
              >
                <Minus size={16} />
              </button>

              <span className="min-w-12 text-center">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((q) =>
                    Math.min(product.stock, q + 1),
                  )
                }
                disabled={quantity >= product.stock}
                className="p-3 disabled:opacity-40"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock < 1}
              className="flex items-center justify-center gap-2 bg-brand-black px-5 py-4 font-semibold text-white transition hover:bg-brand-gold disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag size={19} />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock < 1}
              className="bg-brand-gold px-5 py-4 font-semibold text-white transition hover:bg-brand-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>

          {/* Delivery Information */}
          <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3">
              <Truck className="text-brand-gold" size={22} />
              <span className="text-sm text-gray-600">
                Delivery available across Bangladesh
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck
                className="text-brand-gold"
                size={22}
              />
              <span className="text-sm text-gray-600">
                Quality products and customer support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
