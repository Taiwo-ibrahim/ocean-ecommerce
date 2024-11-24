import CartItem from "@/Components/CartItem/CartItem";
import Navbar from "@/Components/Navbar/Navbar";
import "./page.css"
import React from "react";

function Cart() {
    return (
      <div className="cart__container">
        <div className="cart__container-navbar">
          <Navbar />
        </div>
        <div className="cart__container-previous">
          <span className="cart__container-back">
            <img src="/back.png" alt="" />
          </span>
          <p>Back</p>
        </div>
        <div className="cart__container-body">
          <div className="cart__container-body_left">
            <div className="cart__container-body_left-header">
              <p className="cart-product">PRODUCT</p>
              <p className="cart-price">PRICE</p>
              <p className="cart-quantity">QUANTITY</p>
              <p className="cart-subtotal">SUBTOTAL</p>
            </div>
            <div className="cart__container-body_left-cartItem">
              <CartItem />
              <CartItem />
            </div>
            <div className="cart__container-body_left-coupon">
              <input placeholder="Enter Coupon Code" type="text" />
              <button>APPLY COUPON</button>
            </div>
          </div>
          <div className="cart__container-body_right">
            <h1>CART TOTALS</h1>
            <div className="cart__container-body_right-totals">
              <div className="cart__container-body_right-totals_section1">
                <h1>SUBTOTAL</h1>
                <h3>N300,000</h3>
              </div>
              <div className="cart__container-body_right-totals_section2">
                <div className="cart__container-delivery">
                  <h1>DELIVERY</h1>
                  <p>Delivery fees:</p>
                  <p>
                    Delivery Location: <span>Abuja</span>
                  </p>
                </div>
                <h3>N20,500</h3>
              </div>
            </div>
            <div className="cart__container-body_right-checkout">
              <h1>TOTAL</h1>
              <h3>N320,500</h3>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    )
}

export default Cart