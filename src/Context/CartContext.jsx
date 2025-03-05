"use client";

import React, { createContext, useState, useContext } from "react";

// Create Context
const CartContext = createContext();

// Custom Hook to use CartContext
export const useCart = () => useContext(CartContext);

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    setCartItems((prevCart) => {
      // Check if the item with the same ID, color, and size already exists in the cart
      const existingItem = prevCart.find(
        (item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
      );

      if (existingItem) {
        // Update quantity if the product with the same variations is already in the cart
        return prevCart.map((item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new product with its variations to the cart
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
