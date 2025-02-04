import React from "react"
import "./page.css"
import Navbar from "@/Components/Navbar/Navbar"
import { AiOutlineExclamationCircle } from "react-icons/ai"
import CartItem from "@/Components/CartItem/CartItem"

function PaymentComplete() {
    return (
      <div className="paymentComplete__container">
        <div className="paymentComplete__container-navbar">
          <Navbar />
        </div>
        <div className="paymentComplete__container-body">
          <div className="paymentComplete__container-body-left">
            <div className="paymentComplete__container-body-left-content">
              <img src="/icons8-tick-144 1.png" alt="success.png" />
              <div className="paymentComplete__container-body-left-content-text">
                <h4>
                  Your order is completed and it is on the way for delivery!{" "}
                </h4>
                <p>
                  We’ve successfully received your payment and your order is
                  currently being packed so it get sent to you.{" "}
                </p>
              </div>
              <div className="paymentComplete__container-body-left-content-button">
                <button>Back Home</button>
                <p>
                  <AiOutlineExclamationCircle className="red" /> You’d automatically be returned
                  back to the homepage after 30 seconds.
                </p>
              </div>
            </div>
          </div>
            <div className="paymentComplete__container-body-right">
                <p>Order Summary</p>
                <div className="paymentComplete__container-body-right-content">
                    <CartItem checkout />
                </div>
          </div>
        </div>
      </div>
    )
}

export default PaymentComplete