"use client";

import Navbar from "@/Components/Navbar/Navbar"
import React, { useEffect, useState } from "react"
import "./page.css"
import Products from "@/Components/Products/Products"
import Footer from "@/Components/Footer/Footer"
import { useRouter, useSearchParams } from "next/navigation"

function ProductInfo({ searchParams }) {
  // console.log(searchParams.image)
  // const searchParams = useSearchParams()
  
  const image = searchParams.image

  // const DUMMY_PRODUCTS = [
  //   {
  //     id: 1,
  //     name: "YP REVITAIZATION T SHIRT",
  //     image: "/product1.png",
  //     price: "N50,000",
  //     hoverImage: "/product1b.png",
  //   },
  //   {
  //     id: 2,
  //     name: "YP REVITALIZATION T SHIRT",
  //     image: "/product3.png",
  //     hoverImage: "/product3b.png",
  //     price: "N60,000",
  //   },
  //   {
  //     id: 3,
  //     name: "YP FREEDOM SWEATSUIT  ",
  //     image: "/product4.png",
  //     hoverImage: "/product5.png",
  //     price: "N100,000",
  //   },
  
  //   {
  //     id: 5,
  //     name: "YP VIBRANT THORN JERSEY",
  //     image: "/product6.png",
  //     hoverImage: "/product6.png",
  //     price: "N50,000",
  //   },
  //   {
  //     id: 6,
  //     name: "YP VIBRANT THORN JERSEY",
  //     image: "/product7.png",
  //     hoverImage: "/product7.png",
  //     price: "N50,000",
  //   },
  // ]



    const [showSize, setShowSize] = useState(false)
    const [selected, setSelected] = useState(null)

    const handleShowSize = () => {
      setShowSize((prev) => !prev)
    }

  const data = [
    {
      id: 1,
      question: "Product Details",
      answer:
        " Clash Blue Jean Jacket ‘25 crafted with the best wool in town putting our blood and sweat on this P. Get this and know the feeling of Clash",
    },
    {
      id: 2,
      question: "Shopping & Returns",
      answer:
        " Clash Blue Jean Jacket ‘25 crafted with the best wool in town putting our blood and sweat on this P. Get this and know the feeling of Clash",
    },
    {
      question: "Size Guide",
      id: 3,
      answer:
        " Clash Blue Jean Jacket ‘25 crafted with the best wool in town putting our blood and sweat on this P. Get this and know the feeling of Clash",
    },
  ]


  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null)
    }
    setSelected(i)
  }


    return (
      <div className="productInfo__container">
        <div className="productInfo__container-navbar">
          <Navbar />
        </div>
        <div className="productInfo__container-product_details">
          <div className="productInfo__container-product_section1">
            <div className="productInfo__container-product_section1-name">
              <p>Summer Clash Jean Jacket ‘25</p>
              <img src="/like.png" alt="" />
            </div>
            <h3>N250,000</h3>
            {/* <div className="productInfo__container-product_section1-color">
              <p>Color Type</p>
              <div className="productInfo__container-color_circle">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div> */}
            <div className="productInfo__container-product_size">
              <div className="productInfo__container-product_size-button">
                <button >-</button>
                <p>1</p>
                <button >+</button>
              </div>
              <div className="productInfo__container-product_sizeDD">
                <button onClick={handleShowSize}>
                  Select Size
                  <span>
                    <img src="/down.png" alt="" />
                  </span>
                </button>
                <div
                  className={showSize ? "productInfo__container-DD" : "none"}
                >
                  <p>Small</p>
                  <p>Medium</p>
                  <p>Large</p>
                  <p>Extra Large</p>
                  <p>2XL</p>
                  <p>3XL</p>
                </div>
              </div>
            </div>

            <button>ADD TO CART</button>
          </div>

          <div className="productInfo__container-product_section2">
            <div className="">
              {/* {DUMMY_PRODUCTS.map((item) => {

                // <img src="/product2.png" alt="" />
              })} */}
              <img src={image} alt={`product `} />
            </div>

            <div className="productInfo__container-product_section3">
              <div className="productInfo__container-product_section3-details">
                {data.map((item, i) => {
                  return (
                    <div
                      key={item.id}
                      className="productInfo__container-detail"
                    >
                      <div
                        className="productInfo__container-detail_top"
                        onClick={() => toggle(i)}
                      >
                        <h3>{item.question}</h3>
                        <img src="/down.png" alt="" />
                      </div>
                      <p className={selected == i ? "content show" : "content"}>
                        {item.answer}
                      </p>
                    </div>
                  )
                })}
              </div>
              <div className="productInfo__container-product_section3-img">
                <img src="/mail.png" alt="" />
                <img src="/facebook.png" alt="" />
                <img src="/instagram.png" alt="" />
                <img src="/twitter.png" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="productInfo__container-interested">
          <div className="productInfo__container-interested_top">
            <h3>You might also be interested in:</h3>
            <span></span>
          </div>
          <div className="productInfo__container-interested_bottom">
            <Products />
          </div>
        </div>

        <div className="productInfo__container-footer">
          <Footer />
        </div>
      </div>
    )
}

export default ProductInfo
