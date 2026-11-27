
import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('naher-bags-cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })

  // Save cart data in Local Storage
  useEffect(() => {
    localStorage.setItem('naher-bags-cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.id === product.id,
      )

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  product.stock,
                ),
              }
            : item,
        )
      }

      return [
        ...previousItems,
        {
          ...product,
          quantity: Math.min(quantity, product.stock),
        },
      ]
    })
  }

  // Update product quantity
  const updateQuantity = (id, quantity) => {
    setCartItems((previousItems) =>
      previousItems
        .map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: Math.min(
                Math.max(1, quantity),
                item.stock,
              ),
            }
          }

          return item
        }),
    )
  }

  // Remove product
  const removeFromCart = (id) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== id),
    )
  }

  // Clear entire cart
  const clearCart = () => {
    setCartItems([])
  }

  // Total quantity
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  // Total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
