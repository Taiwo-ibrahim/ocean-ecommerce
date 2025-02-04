"use client";

import React, { useState } from "react";
import './Footer.css'
import { FaArrowRightLong } from "react-icons/fa6"
import { PiCopyright } from "react-icons/pi"
import { FiPlus } from "react-icons/fi"
import Link from "next/link";

function Footer() {
  const currentDate = new Date()

  // Extract the year from the current date
  const currentYear = currentDate.getFullYear()

  const [showAcordion, setShowAcordion] = useState(false)
  const [showAcordion2, setShowAcordion2] = useState(false)

  const handleShowAcordion = () => {
    return setShowAcordion(!showAcordion);
  }
  
  const handleShowAcordion2 = () => {
    return setShowAcordion2(!showAcordion2)
  }

  return (
    <div className="footer__container">
      <div className="footer__container-top">
        <div
          onClick={handleShowAcordion2}
          className="footer__container-top_links"
        >
          <h3>support</h3>
          <div
            className={
              showAcordion2
                ? "footer__container-sublinks actives"
                : "footer__container-sublinks"
            }
          >
            <Link href="/faq" className="footer-text">
              FAQs
            </Link>
            <Link href="/contact" className="footer-text">
              Contact
            </Link>
            <small>Instagram</small>
          </div>
          <FiPlus className="plus" />
        </div>
        <div
          onClick={handleShowAcordion}
          className="footer__container-top_links"
        >
          <h3>policies</h3>
          <div
            className={
              showAcordion
                ? "footer__container-sublinks active"
                : "footer__container-sublinks"
            }
          >
            <Link href="/exchange-policy">Exchange Policy</Link>
            <Link href="/refund-policy">Refund Policy</Link>
            <Link href="/terms-and-conditions">Terms</Link>
          </div>
          <FiPlus className="plus" />
        </div>
        <div className="footer__container-newsletter">
          <h3>Newsletter</h3>
          <div className="footer__container-newsletter-input">
            <input type="email" placeholder="Email" />
            <button>
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
      <div className="footer__container-bottom">
        <p>
          <PiCopyright /> {currentYear} Oceansteeze.
        </p>
      </div>
    </div>
  )
}

export default Footer