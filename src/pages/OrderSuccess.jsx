
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle,
  Package,
  ShoppingBag,
  Home,
  Truck,
} from 'lucide-react'

import { useCart } from '../context/CartContext'

function OrderSuccess() {
  const navigate = useNavigate()
  const { clearCart } = useCart()

  const [order] = useState(() => {
    try {
      const savedOrder = localStorage.getItem(
        'naher-bags-last-order',
      )

      return savedOrder ? JSON.parse(savedOrder) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (order) {
      clearCart()
    }
  }, [order, clearCart])

  if (!order) {
    return (
      <section className="container-width flex min-h-[65vh] flex-col items-center justify-center py-16 text-center">
        <Package size={55} className="text-brand-gold" />

        <h1 className="mt-5 text-2xl font-bold">
          No Order Found
        </h1>

        <p className="mt-3 text-gray-500">
          Please place an order before visiting this page.
        </p>

        <button
          onClick={() => navigate('/shop')}
          className="mt-6 bg-brand-black px-7 py-3 font-semibold text-white hover:bg-brand-gold"
        >
          Go to Shop
        </button>
      </section>
    )
  }

  return (
    <section className="container-width flex min-h-[75vh] items-center justify-center py-16">
      <div className="w-full max-w-2xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:p-10">

        {/* Success Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
          <CheckCircle
            size={55}
            className="text-green-600"
          />
        </div>

        <p className="mt-7 text-sm font-semibold uppercase tracking-[3px] text-brand-gold">
          Thank You for Shopping
        </p>

        <h1 className="mt-3 text-3xl font-bold text-brand-black">
          Order Placed Successfully!
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-500">
          Thank you for choosing Naher Bags. Your order has
          been received successfully. We will contact you
          to confirm your order.
        </p>

        {/* Order Information */}
        <div className="mt-8 bg-brand-cream p-6 text-left">
          <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-4">
            <span className="text-sm text-gray-500">
              Order ID
            </span>

            <span className="font-bold text-brand-black">
              {order.orderId}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-gray-200 py-4">
            <span className="text-sm text-gray-500">
              Customer Name
            </span>

            <span className="font-semibold">
              {order.customer.name}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-gray-200 py-4">
            <span className="text-sm text-gray-500">
              Payment Method
            </span>

            <span className="font-semibold">
              {order.paymentMethod}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-gray-200 py-4">
            <span className="text-sm text-gray-500">
              Order Status
            </span>

            <span className="font-semibold text-orange-600">
              {order.status}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 pt-4">
            <span className="font-bold">
              Total Amount
            </span>

            <span className="text-xl font-bold text-brand-black">
              ৳{order.total.toLocaleString('en-BD')}
            </span>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-500">
          <Truck size={20} className="text-brand-gold" />

          <span>
            We will contact you before delivery.
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center justify-center gap-2 bg-brand-black px-5 py-4 font-semibold text-white transition hover:bg-brand-gold"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 border border-gray-300 px-5 py-4 font-semibold text-brand-black transition hover:border-brand-gold hover:text-brand-gold"
          >
            <Home size={18} />
            Back to Home
          </button>
        </div>
      </div>
    </section>
  )
}

export default OrderSuccess
