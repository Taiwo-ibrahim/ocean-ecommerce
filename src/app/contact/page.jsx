import Navbar from "@/Components/Navbar/Navbar"
import "./page.css"
import React from "react"
import Footer from "@/Components/Footer/Footer"


export default function Contact() {
    return (
      <div className="contact__container">
        <div className="contact__container-header">
          <Navbar />
        </div>
        <div className="contact__container-body">
          <h1>CONTACT US</h1>
          <form className="contact__container-body_form">
            <input placeholder="Name" type="text"></input>
            <input placeholder="Email" type="email"></input>
            <textarea placeholder="Message"></textarea>
            <div className="contact__container-body_form-submit">
              <button>Submit</button>
              <p>
                By pressing the submit button, I agree to OCEANSTEEZE contacting
                me by email and/or phone. I also understand that any information
                shared in this form is subject to OCEANSTEEZE Privacy Policy.
              </p>
            </div>
          </form>
        </div>
        <div className="contact__container-footer">
            <Footer/>
        </div>
      </div>
    )
}


