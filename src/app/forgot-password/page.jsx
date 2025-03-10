import React from "react" 
import "./page.css"
import Navbar from "@/Components/Navbar/Navbar"
import Link from "next/link"


function ForgotPassword() {
  return (
    <div className="forgotPassword__container">
      <div className="forgotPassword__container-navbar">
        <Navbar />
      </div>
      <div className="forgotPassword__container-body">
        <h1>Forgot Password?</h1>
        <p>No worries, lets get you back on track</p>
        <div className="forgotPassword__container-body-email">
            <p>Email</p>
            <input placeholder="Enter your email" type="email"/>
        </div>
        <button><Link href="/forgot-password/reset-password">Reset password</Link></button>
        <p>Remembered yet? <span className="login-span">Login Here</span></p>
      </div>
    </div>
  )
}   


export default ForgotPassword