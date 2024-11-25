import React from "react";
import Image from "next/image";
import "./CartItem.css"

function CartItem() {
    return (
      <div className="cartItem__container">
        <div className="cartItem__container-q1">
          <Image width={70} height={70} src="/product1.png" alt="" />
          <div className="cartItem__container-q1_text">
            <p className="responsive__topic">PRODUCT:</p>
            <h1>Summer Round Neck Tee ‘25 - Black </h1>
            <p>
              Color: <span>Black</span>
            </p>
          </div>
        </div>
        <div className="cartItem__container-q2">
          <p className="responsive__topic">PRODUCT:</p>
          <p>N100,000</p>
        </div>
        <div className="cartItem__container-q2">
          <p className="responsive__topic">PRODUCT:</p>
          <p>1</p>
        </div>
        <div className="cartItem__container-q2">
          <p className="responsive__topic">PRODUCT:</p>
          <p>N100,000</p>
        </div>


        <div className="cart__responsive">
          <div className="cartItem__container-q1_responsive">
            <div className="cartItem__container-q1_img">
              <Image width={70} height={70} src="/product1.png" alt="" />
              <img src="/close.png" alt=" " />

            </div>
            <div className="cartItem__container-q1_text-responsive">
              <p className="responsive__topic">PRODUCT:</p>
              <div className="cartItem__container-q1_text-responsive-text">
                <h1>Summer Round Neck Tee ‘25 - Black </h1>
                {/* <p>
                  Color: <span>Black</span>
                </p> */}
              </div>
            </div>
          </div>
          <div className="cartItem__container-q2_responsive">
            <p className="responsive__topic">PRICE:</p>
            <p>N100,000</p>
          </div>
          <div className="cartItem__container-q2_responsive">
            <p className="responsive__topic">QUANTITY:</p>
            <p>1</p>
          </div>
          <div className="cartItem__container-q2_responsive">
            <p className="responsive__topic">SUBTOTAL:</p>
            <p>N100,000</p>
          </div>
        </div>
      </div>
    )
}

export default CartItem