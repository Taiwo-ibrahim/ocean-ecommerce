import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
  },
  reducers: {
    addToCart(state, actions) {
      const newItem = actions.payload

      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      )

      if (existingItem) {
        existingItem.quantity++
        existingItem.totalprice += newItem.price
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalprice: newItem.price,
          name: newItem.name,
        })
        state.totalQuantity++
      }
    },
    removeFromCart(state, actions) {
      const id = actions.payload

      const existingItem = state.itemsList.find((item) => item.id === id)
      if (existingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id)
        state.totalQuantity--
      } else {
        existingItem.quantity--
        existingItem.totalPrice -= existingItem.price
      }
    },
    setShowCart(state) {
      state.showCart = !state.showCart
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice
