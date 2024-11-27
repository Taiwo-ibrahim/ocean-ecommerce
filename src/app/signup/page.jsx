"use client"
import Navbar from "@/Components/Navbar/Navbar"
import React, { useEffect, useState } from "react"
import "./page.css"
import Link from "next/link"
import { useRouter } from "next/navigation"

function Signup() {
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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
        document.getElementById("google-signup-button"),
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
        router.push("/login")
      } else {
        setErrorMessage(data.message)
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again later.")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.")
      return
    }

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    }

    try {
      const res = await fetch("https://backend.clashstores.com/signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await res.json()

      if (data.success) {
        setSuccessMessage(data.message)
        router.push("/login")
      } else {
        setErrorMessage(data.message)
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again later.")
    }
  }

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

        {/* Normal sign-up form */}
        <form onSubmit={handleSubmit} className="signup__container-body_form">
          <div className="signup__container-body_form-email">
            <p>First Name</p>
            <input
              placeholder="Enter your first name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="signup__container-body_form-email">
            <p>Last Name</p>
            <input
              placeholder="Enter your last name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="signup__container-body_form-email">
            <p>Email</p>
            <input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signup__container-body_form-email">
            <p>Password</p>
            <input
              placeholder="*****"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="signup__container-body_form-email">
            <p>Confirm Password</p>
            <input
              placeholder="*****"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="signup__container-body_form-button">
            <button type="submit">Sign Up</button>
          </div>
        </form>

        {/* Google Sign-Up */}
        <div className="signup__container-body_google">
          <p>OR</p>
          {/* Google Sign-Up button */}
          <div id="google-signup-button"></div>
        </div>

        {/* Display Error or Success Message */}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <div className="signup__container-bottom">
          <p>
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
