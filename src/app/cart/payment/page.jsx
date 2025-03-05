"use client";

import Navbar from "@/Components/Navbar/Navbar";
import "./page.css";
import React, { useState } from "react";
import { useCart } from "@/Context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Payment() {
  const router = useRouter();
  const { cartItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
    rememberMe: false,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const calculateSubtotal = (items) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const deliveryFee = 20500;
  const subtotal = calculateSubtotal(cartItems);
  const total = subtotal + deliveryFee;

  // Initialize Paystack payment
  const initializePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Generate a unique reference
      const reference = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

      // Prepare order data to be sent after successful payment
      const orderData = {
        reference,
        items: cartItems,
        shipping: formData,
        subtotal,
        deliveryFee,
        total,
      };

      // Store order data in session storage for retrieval after payment
      sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));

      // Initialize Paystack
      const response = await fetch("/api/initialize-paystack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          amount: total * 100, // Paystack amount in kobo
          reference,
          callback_url: `${window.location.origin}/cart/payment/payment-complete`,
        }),
      });

      const data = await response.json();

      if (data.status) {
        // Redirect to Paystack payment page
        window.location.href = data.data.authorization_url;
      } else {
        alert("Payment initialization failed. Please try again.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      alert("An error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  // Form validation
  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
      "phoneNumber",
      "email",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(
          `Please fill in your ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()}`
        );
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    // Phone validation
    if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      alert("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  return (
    <div className="payment__container">
      <div className="payment__container-navbar">
        <Navbar />
      </div>
      <div className="payment__container-body">
        <div className="payment__container-body_left">
          <div className="payment__container-body_left-section1">
            <h1>Payment</h1>
            <p>All transactions are secure and encrypted.</p>
          </div>
          <div className="payment__container-body_left-section2">
            <div className="payment__container-body_left-section3">
              <div className="payment__container-body_left-section3_top">
                <h1>Billing Details</h1>
              </div>
              <div className="payment__container-body_left-section3_bottom">
                <div className="section3_bottom-input1">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
                <div className="section3_bottom-input2">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                </div>
                <div className="section3_bottom-input3">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Town/City"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal Code"
                  />
                </div>
                <div className="section3_bottom-input1">
                  <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />
                </div>
                <div className="section3_bottom-input4">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
              </div>
            </div>
            <div className="payment__container-body_left-section4">
              <button onClick={() => router.push("/cart")}>BACK TO CART</button>
            </div>
          </div>
        </div>
        <div className="payment__container-body_right">
          <h1>CART TOTALS</h1>
          <div className="payment__container-body_right-totals">
            <div className="payment__container-body_right-totals_section1">
              <h1>SUBTOTAL</h1>
              <h3>N{Number(subtotal).toLocaleString()}</h3>
            </div>
            <div className="payment__container-body_right-totals_section2">
              <div className="payment__container-delivery">
                <h1>DELIVERY</h1>
                <p>Delivery fees:</p>
                <p>
                  Delivery Location: <span>{formData.city || "Abuja"}</span>
                </p>
              </div>
              <h3>N{Number(deliveryFee).toLocaleString()}</h3>
            </div>
          </div>
          <div className="payment__container-body_right-checkout">
            <h1>TOTAL</h1>
            <h3>N{Number(total).toLocaleString()}</h3>
          </div>
          <button
            onClick={initializePayment}
            disabled={isProcessing || cartItems.length === 0}
          >
            {isProcessing ? "PROCESSING..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
