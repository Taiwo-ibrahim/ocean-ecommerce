import React from "react";
import Image from "next/image";
import "./CartItem.css"

function CartItem() {
    return (
      <div className="cartItem__container">
        <div className="cartItem__container-q1">
          <Image width={70} height={70} src="/product1.png" alt="" />
          <div className="cartItem__container-q1_text">
            <h1>Summer Round Neck Tee ‘25 - Black </h1>
            <p>
              Color: <span>Black</span>
            </p>
          </div>
        </div>
        <div className="cartItem__container-q2">
          <p>N100,000</p>
        </div>
        <div className="cartItem__container-q2">
          <p>1</p>
        </div>
        <div className="cartItem__container-q2">
          <p>N100,000</p>
        </div>
      </div>
    )
}

export default CartItem