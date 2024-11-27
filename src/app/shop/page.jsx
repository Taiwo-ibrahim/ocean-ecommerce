import React from "react"
import "./page.css"
import Navbar from "@/Components/Navbar/Navbar"
import Products from "@/Components/Products/Products"
import Footer from "@/Components/Footer/Footer"

function Shop() {
  return (
    <div className="shop__container">
      <div className="shop__container-navbar">
        <Navbar />
      </div>
      <div className="shop__container-body">
        <div className="shop__container-body_top">
          <h3>ALL ITEMS</h3>
          <span></span>
        </div>
        <div className="shop__container-body_bottom">
          <Products />
        </div>
      </div>
      <div className="shop__container-footer">
        <Footer />
      </div>
    </div>
  )
}

export default Shop
