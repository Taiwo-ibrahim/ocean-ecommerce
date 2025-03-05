import React from "react";
import Image from "next/image";
import "./CartItem.css";

function CartItem({ item, checkout }) {
  const imageSrc = `https://backend.oceansteeze.com/products/${item.image}`;
  return (
    <div className="cartItem__container">
      <div className="cartItem__container-q1">
        <Image width={70} height={70} src={imageSrc} alt={item.name} />
        <div className="cartItem__container-q1_text">
          <p className="responsive__topic">PRODUCT:</p>
          <h1>{item.name}</h1>
          <p>
            Color: <span>{item.color}</span>
          </p>
        </div>
      </div>
      {checkout ? (
        " "
      ) : (
        <div className="cartItem__container-q2">
          <p className="responsive__topic">PRICE:</p>
          <p>{item.price}</p>
        </div>
      )}
      <div className="cartItem__container-q2">
        <p className="responsive__topic">QUANTITY:</p>
        <p>{item.quantity}</p>
      </div>
      <div className="cartItem__container-q2">
        <p className="responsive__topic">SUBTOTAL:</p>
        <p>{item.subtotal}</p>
      </div>

      <div className="cart__responsive">
        <div className="cartItem__container-q1_responsive">
          <div className="cartItem__container-q1_img">
            <Image width={70} height={70} src={imageSrc} alt={item.name} />
          </div>
          <div className="cartItem__container-q1_text-responsive">
            <p className="responsive__topic">PRODUCT:</p>
            <div className="cartItem__container-q1_text-responsive-text">
              <h1>{item.name}</h1>
              <p>
                Color: <span>{item.color}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="cartItem__container-q2_responsive">
          <p className="responsive__topic">PRICE:</p>
          <p>{item.price}</p>
        </div>
        <div className="cartItem__container-q2_responsive">
          <p className="responsive__topic">QUANTITY:</p>
          <p>{item.quantity}</p>
        </div>
        <div className="cartItem__container-q2_responsive">
          <p className="responsive__topic">SUBTOTAL:</p>
          <p>{item.subtotal}</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
