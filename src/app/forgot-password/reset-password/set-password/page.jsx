import React from "react"
import "./page.css"
import Navbar from "@/Components/Navbar/Navbar"


function setPassword() {
    return (
      <div className="setPassword__container">
        <div className="setPassword__navbar">
          <Navbar />
        </div>
        <div className="setPassword__form">
          <h1>Set New Password</h1>
          <p>Must be at least 8 characters</p>
          <div className="setPassword__inputs">
            <div className="setPassword__inputGroup">
              <label htmlFor="label-password">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                id="label-password"
              />
            </div>
            <div className="setPassword__inputGroup">
              <label htmlFor="label-password2">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                id="label-password2"
              />
            </div>
            <button className="setPassword__button">Reset Password</button>
            <p className="setPassword__loginPrompt">
              Remembered yet?{" "}
              <span className="setPassword__loginLink">Login Here</span>
            </p>
          </div>
        </div>
      </div>
    )
}

export default setPassword