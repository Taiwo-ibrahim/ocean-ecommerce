"use client"

import React, { createContext, useState, useContext } from "react"

// Create Context
const CartContext = createContext()

// Custom Hook to use CartContext
export const useCart = () => useContext(CartContext)

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product, quantity) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        // Update quantity if product is already in the cart
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Add new product to the cart
        return [...prevCart, { ...product, quantity }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
