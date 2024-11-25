"use client";

import React from "react"
import Product from "../Product/Product"
import "./Products.css"
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-slice";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "YP REVITAIZATION T SHIRT",
    image: "/product1.png",
    price: "N50,000",
    hoverImage: "/product1b.png",
  },
  {
    id: 2,
    name: "YP REVITALIZATION T SHIRT",
    image: "/product3.png",
    hoverImage: "/product3b.png",
    price: "N60,000",
  },
  {
    id: 3,
    name: "YP FREEDOM SWEATSUIT  ",
    image: "/product4.png",
    hoverImage: "/product5.png",
    price: "N100,000",
  },

  {
    id: 5,
    name: "YP VIBRANT THORN JERSEY",
    image: "/product6.png",
    hoverImage: "/product6.png",
    price: "N50,000",
  },
  {
    id: 6,
    name: "YP VIBRANT THORN JERSEY",
    image: "/product7.png",
    hoverImage: "/product7.png",
    price: "N50,000",
  },
]
const Products = ({ name, id, image, price, hoverImage }) => {
  // console.log(DUMMY_PRODUCTS)

  // const dispatch = useDispatch()
  // const addToCart = () => {
  //   dispatch(
  //     cartActions.addToCart({
  //       name,
  //       id,
  //       price,
  //     })
  //   )
  // }

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
