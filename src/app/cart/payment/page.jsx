import Navbar from "@/Components/Navbar/Navbar";
import  "./page.css" 
import React from "react";

function Payment() {
    return (
      <div className="payment__container">
        <div className="payment__container-navbar">
          <Navbar />
        </div>
        <div className="payment__container-body">
          <div className="payment__container-body_left">
            <div className="payment__container-body_left-section1">
              <h1>Payment</h1>
              <p>All transactions are secure and encrypted.</p>
            </div>
            <div className="payment__container-body_left-section2">
              <div className="payment__container-body_left-section2_top">
                <div className="payment__container-body_left-section2_top-img">
                  <div className="payment-section1-text">
                    <h2>Credit Card Details</h2>
                  </div>
                  <div className="payment-section1-img">

                  <img src="/visa.png" alt="" />
                  <img src="/mastercard.png" alt="" />
                  <img src="/amex.png" alt="" />
                  </div>
                </div>
                <div className="payment__container-body2">
                  <input type="number" placeholder="Card number" />
                  <input type="text" placeholder="Name on Card" />
                  <div className="payment-container-body2-container">
                    <input
                      type="date"
                      placeholder="Expiration Date (YY / MM)"
                    />
                    <input type="text" placeholder="CVV" />
                  </div>
                </div>
              </div>
              <div className="payment__container-body_left-section3">
                <div className="payment__container-body_left-section3_top">
                  <h1>Billing Details</h1>
                </div>
                <div className="payment__container-body_left-section3_bottom">
                  <div className="section3_bottom-input1">
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                  </div>
                  <div className="section3_bottom-input2">
                    <input type="text" placeholder="Address" />
                  </div>
                  <div className="section3_bottom-input3">
                    <input type="text" placeholder="Town/City" />
                    <input type="text" placeholder="Town/City" />
                    <input type="text" placeholder="Town/City" />
                  </div>
                  <div className="section3_bottom-input1">
                    <input type="number" placeholder="Phone Number" />
                    <input type="text" placeholder="Last Name" />
                  </div>
                  <div className="section3_bottom-input4">
                    <input type="checkbox" id="rememberMe" />
                    <p for="rememberMe" >Remember me</p>
                  </div>
                </div>
              </div>
              <div className="payment__container-body_left-section4">
                <button>BACK TO CART</button>
              </div>
            </div>
          </div>
          <div className="payment__container-body_right">
            <h1>CART TOTALS</h1>
            <div className="payment__container-body_right-totals">
              <div className="payment__container-body_right-totals_section1">
                <h1>SUBTOTAL</h1>
                <h3>N300,000</h3>
              </div>
              <div className="payment__container-body_right-totals_section2">
                <div className="payment__container-delivery">
                  <h1>DELIVERY</h1>
                  <p>Delivery fees:</p>
                  <p>
                    Delivery Location: <span>Abuja</span>
                  </p>
                </div>
                <h3>N20,500</h3>
              </div>
            </div>
            <div className="payment__container-body_right-checkout">
              <h1>TOTAL</h1>
              <h3>N320,500</h3>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    )
}

export default Payment