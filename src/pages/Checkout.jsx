
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin,
  User,
  Phone,
  ShoppingBag,
  Truck,
  ShieldCheck,
} from 'lucide-react'
import toast from 'react-hot-toast'

import { useCart } from '../context/CartContext'

function Checkout() {
  const navigate = useNavigate()

  const { cartItems, cartTotal } = useCart()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    district: '',
    city: '',
    address: '',
    note: '',
  })

  const [deliveryArea, setDeliveryArea] = useState('inside')

  const deliveryCharge = deliveryArea === 'inside' ? 70 : 130
  const grandTotal = cartTotal + deliveryCharge

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      navigate('/shop')
      return
    }

    const phoneRegex = /^01[3-9]\d{8}$/

    if (!phoneRegex.test(formData.phone.trim())) {
      toast.error('Enter a valid 11-digit Bangladesh phone number')
      return
    }

    const order = {
      orderId: `NB${Date.now()}`,
      customer: formData,
      products: cartItems,
      deliveryArea,
      deliveryCharge,
      subtotal: cartTotal,
      total: grandTotal,
      paymentMethod: 'Cash on Delivery',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }

    try {
      localStorage.setItem(
        'naher-bags-last-order',
        JSON.stringify(order),
      )

      navigate('/order-success')
    } catch {
      toast.error('Could not save your order. Please try again.')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="container-width py-24 text-center">
        <ShoppingBag
          size={50}
          className="mx-auto text-brand-gold"
        />

        <h2 className="mt-5 text-2xl font-bold">
          Your Cart is Empty
        </h2>

        <p className="mt-2 text-gray-500">
          Add some products before checkout.
        </p>

        <button
          onClick={() => navigate('/shop')}
          className="mt-6 bg-brand-black px-7 py-3 text-white hover:bg-brand-gold"
        >
          Shop Now
        </button>
      </div>
    )
  }

  return (
    <section className="container-width min-h-screen py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[3px] text-brand-gold">
          Complete Your Purchase
        </p>

        <h1 className="mt-3 text-3xl font-bold text-brand-black md:text-4xl">
          Checkout
        </h1>

        <p className="mt-3 text-gray-500">
          Enter your delivery information to place your order.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3">

          {/* Customer Information */}
          <div className="space-y-7 lg:col-span-2">

            <div className="border border-gray-200 p-6">
              <div className="mb-6 flex items-center gap-3">
                <User className="text-brand-gold" size={23} />

                <h2 className="text-xl font-bold">
                  Customer Information
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Mobile Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    maxLength={11}
                    required
                    className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email Address (Optional)
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="border border-gray-200 p-6">
              <div className="mb-6 flex items-center gap-3">
                <MapPin className="text-brand-gold" size={23} />

                <h2 className="text-xl font-bold">
                  Delivery Address
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Delivery Area *
                  </label>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className={`flex cursor-pointer items-center gap-3 border p-4 ${
                      deliveryArea === 'inside'
                        ? 'border-brand-gold bg-brand-cream'
                        : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="deliveryArea"
                        value="inside"
                        checked={deliveryArea === 'inside'}
                        onChange={() => setDeliveryArea('inside')}
                      />

                      <span className="text-sm font-medium">
                        Inside Dhaka — ৳70
                      </span>
                    </label>

                    <label className={`flex cursor-pointer items-center gap-3 border p-4 ${
                      deliveryArea === 'outside'
                        ? 'border-brand-gold bg-brand-cream'
                        : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="deliveryArea"
                        value="outside"
                        checked={deliveryArea === 'outside'}
                        onChange={() => setDeliveryArea('outside')}
                      />

                      <span className="text-sm font-medium">
                        Outside Dhaka — ৳130
                      </span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      District *
                    </label>

                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="e.g. Dhaka"
                      required
                      className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      City / Area *
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Savar"
                      required
                      className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Full Address *
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House number, road, area, landmark..."
                    rows={3}
                    required
                    className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Order Note (Optional)
                  </label>

                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Any special instructions?"
                    rows={2}
                    className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-gray-200 p-6">
              <div className="mb-5 flex items-center gap-3">
                <ShieldCheck className="text-brand-gold" size={23} />

                <h2 className="text-xl font-bold">
                  Payment Method
                </h2>
              </div>

              <div className="border border-brand-gold bg-brand-cream p-5">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    checked
                    readOnly
                  />

                  <div>
                    <p className="font-semibold">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Pay when your order arrives.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border border-gray-200 p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold">
              Your Order
            </h2>

            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3 text-sm"
                >
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>

                  <span className="shrink-0 font-semibold">
                    ৳{(item.price * item.quantity).toLocaleString('en-BD')}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">
                  ৳{cartTotal.toLocaleString('en-BD')}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Charge</span>
                <span className="font-semibold">
                  ৳{deliveryCharge}
                </span>
              </div>
            </div>

            <div className="mt-5 flex justify-between border-t border-gray-100 pt-5">
              <span className="font-bold">Grand Total</span>

              <span className="text-xl font-bold">
                ৳{grandTotal.toLocaleString('en-BD')}
              </span>
            </div>

            <button
              type="submit"
              className="mt-7 flex w-full items-center justify-center gap-2 bg-brand-black px-5 py-4 font-semibold text-white transition hover:bg-brand-gold"
            >
              <ShoppingBag size={19} />
              Place Order
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              <Truck size={14} className="mr-1 inline" />
              Delivery charge depends on your location.
            </p>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Checkout
