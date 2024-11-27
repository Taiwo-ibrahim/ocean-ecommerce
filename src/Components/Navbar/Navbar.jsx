"use client"

import React, { useState } from "react"
import "./Navbar.css"
import Link from "next/link"

const Navbar = ({ home }) => {
  const [showMenu, setShowMenu] = useState(false)

  const handleShowMenu = () => {
    return setShowMenu(!showMenu)
  }

  return (
    <div>
      {home ? (
        <div>
          <div className="navbar__container">
            <div className="navbar__container-links">
              <div className="navbar__container-links_left">
                <Link href="/">Home</Link>
                <Link href="/shop">Shop</Link>
                <Link href="/">Mens</Link>
                <Link href="/">Womens</Link>
                <Link href="/">About Us</Link>
              </div>

              <div className="navbar__container-links_right">
                <Link className="navbar__container-logo" href="/">
                  <img src="/logo.png" alt="" />
                </Link>
              </div>
            </div>

            <div className="navbar__container-button">
              <button className="navbar-btn">
                <span>
                  <img src="/cartImg.png" alt="cart" />
                </span>
                <Link href="/cart">Cart</Link>
              </button>
              <button className="navbar-btn">
                <span>
                  <img src="/loginImg.png" alt="login" />
                </span>
                <Link href="/login"> Login</Link>
              </button>
            </div>
          </div>

          <div className="navbar__container-responsive">
            <div className="navbar__container-responsive_top">
              <div
                onClick={handleShowMenu}
                className="navbar__container-responsive_menu"
              >
                <img src="/menu.png" alt="" />
              </div>
              <div className="navbar__container-responsive_logo">
                <img src="/logo3.png" alt="" />
              </div>
              <div className="navbar__container-responsive_search">
                <img src="/search.png" alt="" />
                <img src="/cartImg.png" alt="" />
              </div>
            </div>
            <div
              className={
                showMenu ? "navbar__container-responsive_links" : "none"
              }
            >
              <Link href="/">Home</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/">Mens</Link>
              <Link href="/">Womens</Link>
              <Link href="/about-us">About Us</Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="navbar__container">
            <div className="navbar__container-links2">
              <div className="navbar__container-links2_left">
                <Link href="/">Home</Link>
                <Link href="/shop">Shop</Link>
                <Link href="/">Mens</Link>
                <Link href="/">Womens</Link>
                <Link href="/about-us">About Us</Link>
              </div>

              <div className="navbar__container-links2_right">
                <Link href="/" className="navbar__container-logo">
                  <img src="/logo3.png" alt="" />
                </Link>
              </div>
            </div>

            <div className="navbar__container-button">
              <button className="navbar-btn">
                <span>
                  <img src="/cartImg.png" alt="cart" />
                </span>
                <Link href="/cart">Cart</Link>
              </button>
              <button className="navbar-btn">
                <span>
                  <img src="/loginImg.png" alt="login" />
                </span>
                <Link href="/login"> Login</Link>
              </button>
            </div>
          </div>
          <div className="navbar__container-responsive">
            <div className="navbar__container-responsive_top">
              <div
                onClick={handleShowMenu}
                className="navbar__container-responsive_menu"
              >
                <img src="/menu.png" alt="" />
              </div>
              <div className="navbar__container-responsive_logo">
                <img src="/logo3.png" alt="" />
              </div>
              <div className="navbar__container-responsive_search">
                <Link href="/">
                  <img src="/search.png" alt="" />
                </Link>
                <Link href="/cart">
                  <img src="/cartImg.png" alt="" />
                </Link>
              </div>
            </div>
            <div
              className={
                showMenu ? "navbar__container-responsive_links" : "none"
              }
            >
              <Link href="/">Home</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/">Mens</Link>
              <Link href="/">Womens</Link>
              <Link href="/about-us">About Us</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
