"use client";

import React from "react"
import "./Products2.css"
import Product from "../Product/Product"


const Products2 = () => {
  const DUMMY_PRODUCTS2 = [
    {
      id: 1,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product8.png",
      price: "N100,000",
      hoverImage: "/product8.png",
    },
    {
      id: 2,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product9.png",
      hoverImage: "/product9.png",
      price: "N100,000",
    },
    {
      id: 3,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product10.png",
      hoverImage: "/product10.png",
      price: "N100,000",
    },
    {
      id: 4,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product11.png",
      hoverImage: "/product11.png",
      price: "N100,000",
    },
    {
      id: 5,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product12.png",
      hoverImage: "/product12.png",
      price: "N100,000",
    },
    {
      id: 6,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product13.png",
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