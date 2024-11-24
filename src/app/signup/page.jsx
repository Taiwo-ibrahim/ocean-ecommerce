import Navbar from "@/Components/Navbar/Navbar";
import React from "react";
import "./page.css"

function Signup() {
    return (
      <div className="signup__container">
        <div className="signup__container-navbar">
          <Navbar />
        </div>
        <div className="signup__container-body">
          <div className="signup__container-body_header">
            <h1>Create an account</h1>
            <p>Get the best collections of our brands now!</p>
          </div>
          <form className="signup__contaienr-body_form">
            <div className="signup__container-body_form-email">
              <p>Email</p>
              <input placeholder="Enter your email" type="email" />
            </div>
            <div className="signup__container-body_form-email">
              <p>Password</p>
              <input placeholder="*****" type="password" />
            </div>
            <div className="signup__container-body_form-email">
              <p>Confirm Password</p>
              <input placeholder="*****" type="password" />
            </div>
            <div className="signup__container-body_form-button">
                <button>Sign Up</button>
            </div>
          </form>
            <div className="signup__container-body_google">
                <p>OR</p>
                <button><span><img src="/google.png" alt="googleImg" /></span>Sign up with Google</button>
            </div>
          <div className="signup__container-bottom">
            <p>
              Already have an account? <span>Log in</span>
            </p>
          </div>
        </div>
      </div>
    )
}

export default Signup