import Head from "next/head"
import "./globals.css"
import { CartProvider } from "@/Context/CartContext"
import { ShippingProvider } from "@/Context/ShippingContext"
export const metadata = {
  title: "Ocean e-commerce app",
  description:
    "E-commerce store to a fast rising brand in the world of fashion",
  icons: {
    icon: "/favicon.png",
    shortcutIcon: "/favicon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ShippingProvider>
            {" "}
            {/* Wrap the app with CartProvider */}
            {children}
          </ShippingProvider>
        </CartProvider>
      </body>
    </html>
  )
}
