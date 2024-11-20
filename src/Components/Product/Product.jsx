"use client"

import React, { useState, useEffect } from "react";
import './Product.css'
import Link from "next/link";

const Product = ({ name, price, image, id, hoverImage }) => {
    
    return (
      <div className="product__container">
        <button>NEW IN</button>
        <div className="product__container-image">
          <Link className="default-img" href={`/quickview/${id}`}>
            <img src={image} alt="" />
          </Link>
          <Link className="hovered-img" href={`/quickview/${id}`}>
            <img src={hoverImage} alt="" />
          </Link>
        </div>
        <span></span>
        <div className="product__container-details">
          <div className="product__container-details_name">
            <h3>{name} </h3>
            <small>{price}</small>
          </div>
          <div className="product__container-details_image">
            <img src="/cartImg2.png" alt="" />
          </div>
        </div>
      </div>
    )
}

export default Product