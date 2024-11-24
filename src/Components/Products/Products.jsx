"use client";

import React from "react"
import Product from "../Product/Product"
import "./Products.css"

const Products = ({ product }) => {
  const DUMMY_PRODUCTS = [
    {
      id: 1,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product1.png",
      price: "N100,000",
      hoverImage: "/product1b.png",
    },
    {
      id: 2,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product3.png",
      hoverImage: "/product3b.png",
      price: "N100,000",
    },
    {
      id: 3,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product4.png",
      hoverImage: "/product5.png",
      price: "N100,000",
    },
    {
      id: 4,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product5.png",
      hoverImage: "/product5.png",
      price: "N100,000",
    },
    {
      id: 5,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product6.png",
      hoverImage: "/product6.png",
      price: "N100,000",
    },
    {
      id: 6,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product7.png",
      hoverImage: "/product7.png",
      price: "N100,000",
    },
  ]
  // console.log(DUMMY_PRODUCTS)
  return (
    <div className="products__container">
      {DUMMY_PRODUCTS.map((item) => {
        return (
          <div className="products__container-product" key={item.id}>
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

export default Products
