"use client"

import Navbar from "@/Components/Navbar/Navbar"
import React, { useEffect, useState } from "react"
import "./page.css"
import Products from "@/Components/Products/Products"
import Footer from "@/Components/Footer/Footer"

function ProductInfo() {
    const [showSize, setShowSize] = useState(false)

    const handleShowSize = () => {
      setShowSize((prev) => !prev)
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
            <div className="productInfo__container-product_section1-color">
              <p>Color Type</p>
              <div className="productInfo__container-color_circle">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="productInfo__container-product_size">
              <div className="productInfo__container-product_size-button">
                <button>-</button>
                <p>1</p>
                <button>+</button>
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
              <img src="/product2.png" alt="" />
            </div>

            <div className="productInfo__container-product_section3">
              <div className="productInfo__container-product_section3-details">
                <div className="productInfo__container-detail">
                  <div className="productInfo__container-detail_top">
                    <h3>Product Details</h3>
                    <img src="/down.png" alt="" />
                  </div>
                  <p>
                    Clash Blue Jean Jacket ‘25 crafted with the best wool in
                    town putting our blood and sweat on this P. Get this and
                    know the feeling of Clash
                  </p>
                </div>
                <div className="productInfo__container-detail">
                  <div className="productInfo__container-detail_top">
                    <h3>Shopping & Returns</h3>
                    <img src="/down.png" alt="" />
                  </div>
                  <p>
                    Clash Blue Jean Jacket ‘25 crafted with the best wool in
                    town putting our blood and sweat on this P. Get this and
                    know the feeling of Clash
                  </p>
                </div>
                <div className="productInfo__container-detail">
                  <div className="productInfo__container-detail_top">
                    <h3>Size Guide</h3>
                    <img src="/down.png" alt="" />
                  </div>
                  <p>
                    Clash Blue Jean Jacket ‘25 crafted with the best wool in
                    town putting our blood and sweat on this P. Get this and
                    know the feeling of Clash
                  </p>
                </div>
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
