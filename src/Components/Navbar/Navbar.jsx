"use client"

import React, { useState } from "react"
import "./Navbar.css"
import Link from "next/link"
import { RiArrowDropDownLine } from "react-icons/ri"
import { BsCart } from "react-icons/bs"
import { RiAccountCircleFill } from "react-icons/ri"
import { CiSearch } from "react-icons/ci"
import { IoSearchOutline } from "react-icons/io5"
import { RxHamburgerMenu } from "react-icons/rx"

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
                <Link href="/shop">
                  <span className="shop-link">
                    Shop
                    <RiArrowDropDownLine className="shop-link-arrow" />
                  </span>
                </Link>
                {/* <Link href="/">Mens</Link> */}
                {/* <Link href="/">Womens</Link> */}
                {/* <Link href="/">About Us</Link> */}
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
                  <BsCart />
                </span>
                <Link href="/cart">Cart</Link>
              </button>
              <button className="navbar-btn">
                <span>
                  <RiAccountCircleFill />
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
                <RxHamburgerMenu />
              </div>
              <div className="navbar__container-responsive_logo">
                <img src="/logo.png" alt="" />
              </div>
              <div className="navbar__container-responsive_search">
                <IoSearchOutline />
                <BsCart />
              </div>
            </div>
            <div
              className={
                showMenu ? "navbar__container-responsive_links" : "none"
              }
            >
              <Link href="/">Home</Link>
              <Link href="/shop">
                <span className="shop-link">
                  Shop
                  <RiArrowDropDownLine className="shop-link-arrow" />
                </span>
              </Link>
              {/* <Link href="/">Mens</Link> */}
              {/* <Link href="/">Womens</Link> */}
              {/* <Link href="/">About Us</Link> */}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="navbar__container">
            <div className="navbar__container-links2">
              <div className="navbar__container-links2_left">
                <Link href="/">Home</Link>
                <Link href="/shop">
                  <span className="shop-link">
                    Shop
                    <RiArrowDropDownLine className="shop-link-arrow" />
                  </span>
                </Link>
                {/* <Link href="/">Mens</Link> */}
                {/* <Link href="/">Womens</Link> */}
                {/* <Link href="/">About Us</Link> */}
              </div>

              <div className="navbar__container-links2_right">
                <Link href="/" className="navbar__container-logo">
                  <img src="/logo.png" alt="" />
                </Link>
              </div>
            </div>

            <div className="navbar__container-button">
              <button className="navbar-btn">
                <span>
                  <BsCart />
                </span>
                <Link href="/cart">Cart</Link>
              </button>
              <button className="navbar-btn">
                <span>
                  <RiAccountCircleFill />
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
                <RxHamburgerMenu />
              </div>
              <div className="navbar__container-responsive_logo">
                <img src="/logo.png" alt="" />
              </div>
              <div className="navbar__container-responsive_search">
                <Link href="/">
                  <IoSearchOutline />
                  {/* <BsCart /> */}
                  {/* <img src="/search.png" alt="" /> */}
                </Link>
                <Link href="/cart">
                  <BsCart />
                </Link>
              </div>
            </div>
            <div
              className={
                showMenu ? "navbar__container-responsive_links" : "none"
              }
            >
              <Link href="/">Home</Link>
              <Link href="/shop">
                <span className="shop-link">
                  Shop
                  <RiArrowDropDownLine className="shop-link-arrow" />
                </span>
              </Link>
              {/* <Link href="/">Mens</Link> */}
              {/* <Link href="/">Womens</Link> */}
              {/* <Link href="/">About Us</Link> */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
