
import { useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
} from 'lucide-react'

import { useCart } from '../context/CartContext'

function Cart() {
  const navigate = useNavigate()

  const {
    cartItems,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart()

  const formatPrice = (price) =>
    `৳${price.toLocaleString('en-BD')}`

  if (cartItems.length === 0) {
    return (
      <section className="container-width flex min-h-[65vh] flex-col items-center justify-center py-16 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-cream">
          <ShoppingCart
            size={42}
            className="text-brand-gold"
          />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-brand-black">
          Your Cart is Empty
        </h1>

        <p className="mt-3 max-w-md text-gray-500">
          Looks like you haven't added any bags to your
          shopping cart yet.
        </p>

        <button
          onClick={() => navigate('/shop')}
          className="mt-7 flex items-center gap-2 bg-brand-black px-8 py-4 font-semibold text-white transition hover:bg-brand-gold"
        >
          <ShoppingBag size={19} />
          Continue Shopping
        </button>
      </section>
    )
  }

  return (
    <section className="container-width min-h-screen py-12">
      {/* Heading */}
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[3px] text-brand-gold">
          Your Shopping Bag
        </p>

        <h1 className="mt-3 text-3xl font-bold text-brand-black md:text-4xl">
          Shopping Cart
        </h1>

        <p className="mt-3 text-gray-500">
          You have {cartCount} item(s) in your cart.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-5 lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-5 border border-gray-100 p-4 sm:flex-row"
            >
              {/* Image */}
              <div className="h-40 w-full shrink-0 overflow-hidden bg-brand-cream sm:w-36">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-brand-gold">
                    {item.category}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-brand-black">
                    {item.name}
                  </h3>

                  <p className="mt-2 font-bold text-brand-black">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-200">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1,
                        )
                      }
                      disabled={item.quantity <= 1}
                      className="p-2 disabled:opacity-30"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="min-w-10 text-center text-sm">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1,
                        )
                      }
                      disabled={item.quantity >= item.stock}
                      className="p-2 disabled:opacity-30"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 text-sm text-red-500 transition hover:text-red-700"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>

              {/* Item Total */}
              <div className="text-right sm:min-w-24">
                <p className="text-xs text-gray-400">
                  Item Total
                </p>

                <p className="mt-2 font-bold text-brand-black">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 pt-3 text-sm font-semibold text-gray-600 transition hover:text-brand-gold"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </button>
        </div>

        {/* Order Summary */}
        <div className="border border-gray-200 p-6 lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-brand-black">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4 border-b border-gray-100 pb-5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Subtotal ({cartCount} items)
              </span>

              <span className="font-semibold">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Delivery Charge
              </span>

              <span className="font-medium text-gray-500">
                Calculated at checkout
              </span>
            </div>
          </div>

          <div className="flex justify-between py-5">
            <span className="font-bold text-brand-black">
              Total
            </span>

            <span className="text-xl font-bold text-brand-black">
              {formatPrice(cartTotal)}
            </span>
          </div>

          <p className="mb-5 text-xs text-gray-400">
            Delivery charge will be added during checkout.
          </p>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-brand-black px-5 py-4 font-semibold text-white transition hover:bg-brand-gold"
          >
            Proceed to Checkout
          </button>

          <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Truck size={19} className="text-brand-gold" />
              Delivery across Bangladesh
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500">
              <ShieldCheck
                size={19}
                className="text-brand-gold"
              />
              Secure shopping experience
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
