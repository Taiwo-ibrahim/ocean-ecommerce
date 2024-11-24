import React from "react";
import "./page.css"
import Navbar from "@/Components/Navbar/Navbar";
import Link from "next/link";


const Login = () => {
    return (
      <div className="login__container">
        <div className="login__container-navbar">
          <Navbar />
        </div>
        <div className="login__container-body">
          <div className="login__container-body_header">
            <h1>Log in to your account</h1>
            <p>Welcome back! Please enter your details.</p>
          </div>
          <form className="login__container-body_form">
            <div className="login__container-body_form-email">
              <p>Email</p>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="login__container-body_form-password">
              <p>Password</p>
              <input type="password" placeholder="******" />
            </div>
            <div className="login__container-body_form-radio_section">
              <div className="login__container-body_form-radio_btn">
                <input type="checkbox" defaultChecked="checked" id="remember" />
                <label htmlFor="remember">Remember for 30 days</label>
              </div>
              <p>Forgot Password</p>
            </div>
            <div className="login__container-body_form-button">
              <button className="sign1">Sign in</button>
              <button className="sign2">
                <span>
                  <img src="/google.png" alt="" />
                </span>
                Sign in with Google
              </button>
            </div>
          </form>
            <div className="login__container-body_bottom">
              <p>Don’t have an account?</p>
              <Link href="/signup" className="signup-link">Sign up</Link>
            </div>
        </div>
      </div>
    )
}

export default Login