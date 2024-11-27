"use client"

import React, { useState, useEffect } from "react"
import "./Product.css"
import Link from "next/link"
import Image from "next/image"
import { useDispatch } from "react-redux"

const Product = ({ name, price, image, id, hoverImage, href }) => {
  // const dispatch = useDispatch();

  return (
    <div className="product__container">
      <button>NEW IN</button>
      <div className="product__container-image">
        <Link className="default-img" href={{ pathname: `/quickview/${id}` }}>
          <Image width={350} height={450} src={image} alt="" />
        </Link>
        <Link className="hovered-img" href={{ pathname: `/quickview/${id}` }}>
          <Image width={350} height={450} src={hoverImage} alt="" />
        </Link>
      </div>
      <span></span>
      <div className="product__container-details">
        <div className="product__container-details_name">
          <h3>{name} </h3>
          <small>
            N
            {Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(
              price
            )}
          </small>
        </div>
        <div className="product__container-details_image">
          <img src="/cartImg2.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Product
