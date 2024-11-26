"use client";

import React from "react"
import "./Products2.css"
import Product from "../Product/Product"


const Products2 = () => {
  const DUMMY_PRODUCTS2 = [
    {
      id: 1,
      name: "YP FREEDOM SWEATSUIT",
      image: "/product8.png",
      price: "N100,000",
      hoverImage: "/product9.png",
    },
    {
      id: 2,
      name: "YP FREEDOM SWEATSUIT",
      image: "/product10.png",
      hoverImage: "/product11.png",
      price: "N100,000",
    },
    {
      id: 3,
      name: "YP FREEDOM SWEATSUIT",
      image: "/product12.png",
      hoverImage: "/product13.png",
      price: "N100,000",
    },
  ]

  return (
    <div className="products2__container">
      {DUMMY_PRODUCTS2.map((item) => {
        return (
          <div className="products2__container-product" key={item.id}>
            <Product
              id={item.id}
              name={item.name}
              image={item.image}
              hoverImage={item.hoverImage}
              price={item.price}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Products2
