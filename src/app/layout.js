import Head from "next/head"
import "./globals.css"
import { CartProvider } from "@/Context/CartContext"
export const metadata = {
  title: "Clash e-commerce app",
  description: "E-commerce store to a fast rising brand in the world of fashion",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {" "}
          {/* Wrap the app with CartProvider */}
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
