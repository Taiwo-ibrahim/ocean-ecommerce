import React from "react";
import "./page.css";  
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { MdKeyboardArrowRight } from "react-icons/md"
import { VscMail } from "react-icons/vsc"
import { IoCallSharp } from "react-icons/io5"
import { MdOutlineAccessTimeFilled } from "react-icons/md"


function Contact() {
  return (
    <div className="contact__container">
      <div className="contact__container-navbar">
        <Navbar />
      </div>
      <div className="contact__container-content">
        <div className="contact__container-content_section1">
          <h1>Contact</h1>
          <span className="contact-nav">
            <p>
              Home <MdKeyboardArrowRight />
            </p>{" "}
            <h6>Contact</h6>
          </span>
        </div>
        <div className="contact__container-content_section2">
          <div className="contact__container-content_section2-top">
            <h1>Get In Touch With Us</h1>
            <p>For More Information About Our Product & Services. </p>
          </div>
          <div className="contact__container-content_section2-bottom">
            <div className="contact__container-content_section2-bottom-left">
              <div className="contact-left-section1">
                <VscMail className="RI" />
                <div className="contact-left-section1-content">
                  <h4>Email</h4>
                  <p>support@oceansteeze.com</p>
                </div>
              </div>
              <div className="contact-left-section1">
                <IoCallSharp className="RI" />
                <div className="contact-left-section1-content">
                  <h4>Phone</h4>
                  <p>support@oceansteeze.com</p>
                </div>
              </div>
              <div className="contact-left-section1">
                <MdOutlineAccessTimeFilled className="RI" />
                <div className="contact-left-section1-content">
                  <h4>Working Time</h4>
                  <p>Monday-Friday: 9:00 - 22:00</p>
                  <p>Saturday-Sunday: 9:00 - 21:00</p>
                </div>
              </div>
            </div>
            <div className="contact__container-content_section2-bottom-right">
              <div className="contact-right-section1">
                <h3>Your name</h3>
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className="contact-right-section1">
                <h3>Email address</h3>
                <input type="email" placeholder="Abc@def.com" />
              </div>
              <div className="contact-right-section1">
                <h3>Subject</h3>
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className="contact-right-section1">
                <h3>Message</h3>
                <textarea type="text" placeholder="Hi! i’d like to ask about" />
              </div>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div className="contact__container-footer">
        <Footer />
      </div>
    </div>
  )
}

export default Contact;

