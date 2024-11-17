import React from "react";
import './Footer.css'
function Footer() {
    return (
      <div className="footer__container">
        <div className="footer__container-top">
          <div className="footer__container-top_section1">
            <h3>LEAVE US YOUR EMAIL AND GET YOUR -10% OFF</h3>
            <input placeholder="Enter Email:" type="email" />
            <div className="footer__container-social_links">
              <img src="/linkedIn.png" alt="" />
              <img src="/discord.png" alt="" />
              <img src="/facebook.png" alt="" />
              <img src="/instagram.png" alt="" />
            </div>
          </div>
          <div className="footer__container-top_section2">
            <img src="/logo2.png" alt="" />
          </div>
          <div className="footer__container-top_section3">
            <div className="footer__container-top_links">
              <h4>Quick Links</h4>
              <p>Men</p>
              <p>Women</p>
              <p>Hoodies</p>
              <p>Sweatshirts</p>
              <p>Street Wear</p>
            </div>
            <div className="footer__container-top_links">
              <h4>Resource</h4>
              <p>FAQ</p>
              <p>Need Help</p>
              <p>Contact</p>
              <p>Shipping</p>
              <p>Terms And Conditions</p>
            </div>
          </div>
        </div>
        <div className="footer__container-bottom">
          <p>© 2024 Kenny Malcon. </p>
          <div className="footer__container-bottom_links">
            <p>Terms & Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    )
}

export default Footer