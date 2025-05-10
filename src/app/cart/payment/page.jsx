// app/cart/payment/page.jsx
"use client"

import Navbar from "@/Components/Navbar/Navbar"
import "./page.css"
import React, { useState, useEffect } from "react"
import { useCart } from "@/Context/CartContext"
import { useShipping } from "@/Context/ShippingContext"
import Link from "next/link"
import { useRouter } from "next/navigation"

function Payment() {
  const router = useRouter()
  const { cartItems } = useCart()
  const {
    countries,
    states,
    cities,
    fetchCountries,
    fetchStates,
    fetchCities,
    fetchShippingRates,
    shippingRates,
    selectedRate,
    setSelectedRate,
    isLoadingRates,
  } = useShipping()

  console.log(fetchCountries)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    countryCode: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
    rememberMe: false,
  })

  // Sort countries alphabetically by name
  const sortedCountries = [...countries].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  // Sort states alphabetically by name
  const sortedStates = [...states].sort((a, b) => a.name.localeCompare(b.name))

  // Sort cities alphabetically by cityName
  const sortedCities = [...cities].sort((a, b) =>
    a.cityName.localeCompare(b.cityName)
  )

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Fetch states when country changes
    if (name === "countryCode" && value) {
      fetchStates(value)
      // Reset state and city when country changes
      setFormData((prev) => ({
        ...prev,
        state: "",
        city: "",
      }))
    }

    // Fetch cities when state changes
    if (name === "state" && value && formData.countryCode) {
      fetchCities(formData.countryCode)
    }

    // Get shipping rates when city is selected
    if (name === "city" && value && formData.countryCode) {
      const totalWeight = cartItems.reduce((total, item) => {
        // Assuming each item has a weight property, or default to 0.5kg
        return total + (item.weight || 0.5) * item.quantity
      }, 0)

      fetchShippingRates(
        {
          cityName: value,
          countryCode: formData.countryCode,
        },
        totalWeight
      )
    }
  }

  const handleSelectRate = (rate) => {
    setSelectedRate(rate)
  }

  // Function to get appropriate shipping icon based on pricing tier
  const getShippingIcon = (pricingTier) => {
    switch (pricingTier) {
      case "Express":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        )
      case "Standard":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )
      case "Budget":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        )
    }
  }

  const calculateSubtotal = (items) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const subtotal = calculateSubtotal(cartItems)
  const deliveryFee = selectedRate ? selectedRate.cost : 0
  const total = subtotal + deliveryFee

  // Initialize Paystack payment
  const initializePayment = async () => {
    if (!validateForm()) return
    if (!selectedRate) {
      alert("Please select a shipping option")
      return
    }

    setIsProcessing(true)

    try {
      // Generate a unique reference
      const reference = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`

      // Prepare order data to be sent after successful payment
      const orderData = {
        reference,
        items: cartItems,
        shipping: {
          ...formData,
          shippingMethod: selectedRate.mode,
          shippingCost: selectedRate.cost,
          estimatedDelivery: selectedRate.duration,
        },
        subtotal,
        deliveryFee,
        total,
      }

      // Book shipment with Topship
      const shipmentData = {
        shipment: [
          {
            sender: {
              firstName: "Ocean",
              lastName: "Steeze",
              email: "manonfireeverytime@gmail.com",
              phoneNumber: "1234567890",
              addressLine1: "268, Herbert Macauly way",
              addressLine2: "",
              country: "Nigeria",
              countryCode: "NG",
              state: "Lagos",
              city: "Yaba",
            },
            receiver: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phoneNumber: formData.phoneNumber,
              addressLine1: formData.address,
              addressLine2: "",
              country:
                sortedCountries.find((c) => c.code === formData.countryCode)
                  ?.name || "",
              countryCode: formData.countryCode,
              state: formData.state,
              city: formData.city,
            },
            parcel: {
              weight: cartItems.reduce(
                (total, item) => total + (item.weight || 0.5) * item.quantity,
                0
              ),
              description: `Order #${reference}`,
              items: cartItems.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                value: item.price,
                weight: item.weight || 0.5,
              })),
            },
            shipmentMode: selectedRate.mode,
            pricingTier: selectedRate.pricingTier,
            currency: selectedRate.currency,
            shipmentType: "international",
          },
        ],
      }

      // Store order and shipment data in session storage
      sessionStorage.setItem("pendingOrder", JSON.stringify(orderData))
      sessionStorage.setItem("pendingShipment", JSON.stringify(shipmentData))

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
      })

      const data = await response.json()

      if (data.status) {
        // Redirect to Paystack payment page
        window.location.href = data.data.authorization_url
      } else {
        alert("Payment initialization failed. Please try again.")
        setIsProcessing(false)
      }
    } catch (error) {
      console.error("Payment initialization error:", error)
      alert("An error occurred. Please try again.")
      setIsProcessing(false)
    }
  }

  // Form validation
  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
      "countryCode",
      "phoneNumber",
      "email",
    ]

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(
          `Please fill in your ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()}`
        )
        return false
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address")
      return false
    }

    // Phone validation
    if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      alert("Please enter a valid phone number")
      return false
    }

    return true
  }

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries()
  }, [])

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
                <h1>Billing & Shipping Details</h1>
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
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                  >
                    <option value="" disabled >Select Country</option>

                      {sortedCountries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                    ))}
                  </select>

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    disabled={!formData.countryCode}
                  >
                    <option value="">Select State</option>
                    {sortedStates.map((state) => (
                      <option key={state.code} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>

                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!formData.state}
                  >
                    <option value="">Select City</option>
                    {sortedCities.map((city) => (
                      <option key={city.cityName} value={city.cityName}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="section3_bottom-input2">
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
                    type="tel"
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

              {/* Shipping Options Section - New Styled Version */}
              <div className="mt-6 border border-gray-200 p-4">
                <h2 className="mb-4 font-medium">Shipping Options</h2>
                {isLoadingRates ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                    <p className="ml-2">Loading shipping options...</p>
                  </div>
                ) : shippingRates.length > 0 ? (
                  <div className="space-y-3">
                    {/* Hidden input for the selected shipping rate */}
                    <input
                      type="hidden"
                      name="shippingRateId"
                      value={
                        selectedRate
                          ? `${selectedRate.mode}-${selectedRate.pricingTier}`
                          : ""
                      }
                    />

                    {shippingRates.map((rate) => (
                      <div
                        key={`${rate.mode}-${rate.pricingTier}`}
                        className={`flex cursor-pointer items-center justify-between rounded border p-3 transition-colors ${
                          selectedRate?.mode === rate.mode &&
                          selectedRate?.pricingTier === rate.pricingTier
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => handleSelectRate(rate)}
                      >
                        <div className="flex items-center">
                          <div className="mr-3">
                            {getShippingIcon(rate.pricingTier)}
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {rate.mode} - {rate.pricingTier}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {rate.duration}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          ₦{rate.cost.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md bg-amber-50 p-4">
                    <p className="text-amber-800">
                      No shipping options available for this location. Please
                      check your address details.
                    </p>
                  </div>
                )}
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
                <p>
                  Delivery Location:{" "}
                  <span>{formData.city || "Not selected"}</span>
                </p>
              </div>
              <h3>
                {selectedRate
                  ? `N${Number(selectedRate.cost).toLocaleString()}`
                  : "N0"}
              </h3>
            </div>
          </div>
          <div className="payment__container-body_right-checkout">
            <h1>TOTAL</h1>
            <h3>N{Number(total).toLocaleString()}</h3>
          </div>
          <button
            onClick={initializePayment}
            disabled={isProcessing || cartItems.length === 0 || !selectedRate}
          >
            {isProcessing ? "PROCESSING..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Payment
