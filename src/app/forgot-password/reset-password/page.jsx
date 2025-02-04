"use client";

import React from "react"
import "./page.css"
import Navbar from "@/Components/Navbar/Navbar"
import { PinInput } from "react-input-pin-code"
import { IoIosArrowRoundBack } from "react-icons/io";


function ResetPassword() {

    const [values, setValues] = React.useState(["", "", "", ""])


    return (
      <div className="resetPassword__container">
        <div className="resetPassword__container-navbar">
          <Navbar />
        </div>
        <div className="resetPassword__container-body">
          <h2>Password Reset</h2>
          <p>
            We sent a code to{" "}
            <span className="reset-link">primafiso@gmail.com</span>
          </p>
          <div className="resetPassword__container-body-code">
            <PinInput
              id="pin-input"
              values={values}
              autoComplete="off"
              autoFocus="true"
              placeholder="0"
              type="number"
              onChange={(value, index, values) => setValues(values)}
                        validBorderColor="[#008000]"
                        size="lg"
            />
            <button>Continue</button>
            <p>
              Didnt recieve code?{" "}
              <span className="reset-link">Click to resend</span>
            </p>
            <p>
              <IoIosArrowRoundBack /> Back to login
            </p>
          </div>
        </div>
      </div>
    )
}

export default ResetPassword