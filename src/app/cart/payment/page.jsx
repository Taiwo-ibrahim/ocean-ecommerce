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
                <h2>Credit Card Details</h2>
                <div className="payment__container-body_left-section2_top-img">
                  <img src="/visa.png" alt="" />
                  <img src="/mastercard.png" alt="" />
                  <img src="/amex.png" alt="" />
                </div>
                <div className="payment__container-body">
                  <input type="number" placeholder="Card number" />
                  <input type="text" placeholder="Name on Card" />
                  <div>
                    <input
                      type="date"
                      placeholder="Expiration Date (YY / MM)"
                    />
                    <input
                      type="number"
                      placeholder="CVV"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="payment__container-body_right"></div>
        </div>
      </div>
    )
}

export default Payment