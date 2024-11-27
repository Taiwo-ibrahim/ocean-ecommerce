"use client"

// import { Children } from "react"
import store from "./store"
import { Provider } from "react-redux"

export const StoreProvider = ({ Children }) => {
  return <Provider store={store}>{Children}</Provider>
}
