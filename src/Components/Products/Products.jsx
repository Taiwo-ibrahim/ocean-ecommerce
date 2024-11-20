import React from "react"
import Product from "../Product/Product"
import "./Products.css"

const Products = () => {
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
      image: "/product1.png",
      hoverImage: "/product1b.png",
      price: "N100,000",
    },
    {
      id: 3,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product1.png",
      hoverImage: "/product1b.png",
      price: "N100,000",
    },
    {
      id: 4,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product1.png",
      hoverImage: "/product1b.png",
      price: "N100,000",
    },
    {
      id: 5,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product1.png",
      hoverImage: "/product1b.png",
      price: "N100,000",
    },
    {
      id: 6,
      name: "Summer Sleeveless Tank ‘25  ",
      image: "/product1.png",
      hoverImage: "/product1b.png",
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
