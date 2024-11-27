// import CartItem from "@/Components/CartItem/CartItem";
// import Navbar from "@/Components/Navbar/Navbar";
// import "./page.css"
// import React from "react";
// import Link from "next/link";

// function Cart() {

//     return (
//       <div className="cart__container">
//         <div className="cart__container-navbar">
//           <Navbar />
//         </div>
//         <div className="cart__container-previous">
//           <span className="cart__container-back">
//             <img src="/back.png" alt="" />
//           </span>
//           <Link href="/shop">Back</Link>
//         </div>
//         <div className="cart__container-body">
//           <div className="cart__container-body_left">
//             <div className="cart__container-body_left-header">
//               <p className="cart-product">PRODUCT</p>
//               <p className="cart-price">PRICE</p>
//               <p className="cart-quantity">QUANTITY</p>
//               <p className="cart-subtotal">SUBTOTAL</p>
//             </div>
//             <div className="cart__container-body_left-cartItem">
//               <CartItem />
//               <CartItem />
//             </div>
//             <div className="cart__container-body_left-coupon">
//               <input placeholder="Enter Coupon Code" type="text" />
//               <button>APPLY COUPON</button>
//             </div>
//           </div>
//           <div className="cart__container-body_right">
//             <h1>CART TOTALS</h1>
//             <div className="cart__container-body_right-totals">
//               <div className="cart__container-body_right-totals_section1">
//                 <h1>SUBTOTAL</h1>
//                 <h3>N300,000</h3>
//               </div>
//               <div className="cart__container-body_right-totals_section2">
//                 <div className="cart__container-delivery">
//                   <h1>DELIVERY</h1>
//                   <p>Delivery fees:</p>
//                   <p>
//                     Delivery Location: <span>Abuja</span>
//                   </p>
//                 </div>
//                 <h3>N20,500</h3>
//               </div>
//             </div>
//             <div className="cart__container-body_right-checkout">
//               <h1>TOTAL</h1>
//               <h3>N320,500</h3>
//             </div>
//             <button>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>
//       </div>
//     )
// }

// export default Cart

"use client"

import { useCart } from "@/context/CartContext"
import Navbar from "@/Components/Navbar/Navbar"
import "./page.css"
import React from "react"
import Link from "next/link"

function Cart() {
  const { cartItems, removeFromCart } = useCart()

  const calculateSubtotal = (items) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const deliveryFee = 20500
  const subtotal = calculateSubtotal(cartItems)
  const total = subtotal + deliveryFee

  return (
    <div className="cart__container">
      {/* Navbar */}
      <div className="cart__container-navbar">
        <Navbar />
      </div>

      {/* Back link */}
      <div className="cart__container-previous">
        <span className="cart__container-back">
          <img src="/back.png" alt="" />
        </span>
        <Link href="/shop">Back</Link>
      </div>

      {/* Cart Items */}
      <div className="cart__container-body">
        <div className="cart__container-body_left">
          <div className="cart__container-body_left-header">
            <p className="cart-product">PRODUCT</p>
            <p className="cart-price">PRICE</p>
            <p className="cart-quantity">QUANTITY</p>
            <p className="cart-subtotal">SUBTOTAL</p>
          </div>

          {/* Cart Items List */}
          <div className="cart__container-body_left-cartItem">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="responsive-cart">
                    <h3 className="topic">PRODUCT:</h3>
                    <div className="product">
                      <button onClick={() => removeFromCart(item.id)}>
                        <img src="/close.png" alt="" />
                      </button>
                      <p>{item.name}</p>
                    </div>
                  </div>
                  <div className="responsive-cart2">
                    <h3 className="topic">PRICE:</h3>
                    <p className="price">
                      N{Number(item.price).toLocaleString()}
                    </p>
                  </div>
                  <div className="responsive-cart2">
                    <h3 className="topic">QUANTITY:</h3>
                    <p className="price">{item.quantity}</p>
                  </div>
                  <div className="responsive-cart2">
                    <h3 className="topic">SUBTOTAL:</h3>
                    <p className="price">
                      N{Number(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          {/* Coupon Section */}
          <div className="cart__container-body_left-coupon">
            <input placeholder="Enter Coupon Code" type="text" />
            <button>APPLY COUPON</button>
          </div>
        </div>

        {/* Cart Totals */}
        <div className="cart__container-body_right">
          <h1>CART TOTALS</h1>
          <div className="cart__container-body_right-totals">
            <div className="cart__container-body_right-totals_section1">
              <h1>SUBTOTAL</h1>
              <h3>N{Number(subtotal).toLocaleString()}</h3>
            </div>
            <div className="cart__container-body_right-totals_section2">
              <div className="cart__container-delivery">
                <h1>DELIVERY</h1>
                <p>Delivery fees:</p>
                <p>
                  Delivery Location: <span>Abuja</span>
                </p>
              </div>
              <h3>N{Number(deliveryFee).toLocaleString()}</h3>
            </div>
          </div>
          <div className="cart__container-body_right-checkout">
            <h1>TOTAL</h1>
            <h3>N{Number(total).toLocaleString()}</h3>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
