"use client"

import React, { useState, useEffect } from "react"
import "./page.css"
import Navbar from "@/Components/Navbar/Navbar"
import Link from "next/link"
import { useRouter } from "next/navigation"
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id:
          "513931588844-2rjk6ukt0gc84gsho7f4epuu90p7o6up.apps.googleusercontent.com",
        callback: handleGoogleLoginSuccess,
      })

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        { theme: "outline", size: "large" }
      )
    }

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handleGoogleLoginSuccess = async (response) => {
    const token = response.credential

    const userData = { token: token }

    try {
      const res = await fetch(
        "https://backend.clashstores.com/getGoogleUser.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      )

      const data = await res.json()

      if (data.success) {
        setSuccessMessage(data.message)
        router.push("/")
      } else {
        setErrorMessage(data.message)
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again later.")
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    const userData = { email: email, password: password }

    try {
      const res = await fetch("https://backend.clashstores.com/signin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await res.json()

      if (data.success) {
        setSuccessMessage(data.message)
        router.push("/")
      } else {
        setErrorMessage(data.message)
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again later.")
    }
  }

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

        {/* Normal Login Form */}
        <form
          onSubmit={handleLoginSubmit}
          className="login__container-body_form"
        >
          <div className="login__container-body_form-email">
            <p>Email</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login__container-body_form-password">
            <p>Password</p>
            <input
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login__container-body_form-radio_section">
            <div className="login__container-body_form-radio_btn">
              <input type="checkbox" defaultChecked="checked" id="remember" />
              <label htmlFor="remember">Remember for 30 days</label>
            </div>
            <p>Forgot Password</p>
          </div>
          <div className="login__container-body_form-button">
            <button type="submit" className="sign1">
              Sign in
            </button>

            {/* Google Login Button */}
            <div className="sign2">
              <div id="google-login-button"></div>
            </div>
          </div>
        </form>

        {/* Display Error or Success Message */}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <div className="login__container-body_bottom">
          <p>Don’t have an account?</p>
          <Link href="/signup" className="signup-link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
