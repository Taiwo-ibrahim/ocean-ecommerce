"use client"

import Navbar from "@/Components/Navbar/Navbar"
import "./page.css"
import React, { useState, useEffect } from "react"
import { useCart } from "@/Context/CartContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import POST from "@/app/api/topship/get-shipment-rate/route"

function Payment() {
  const router = useRouter()
  const { cartItems } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [deliveryFee, setDeliveryFee] = useState(0)
  const [isLoadingDeliveryFee, setIsLoadingDeliveryFee] = useState(false)
  const [deliveryError, setDeliveryError] = useState(null)

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
  })

  // Fetch delivery fee when city or postal code changes
  useEffect(() => {
    if (formData.city && formData.postalCode) {
      fetchDeliveryFee()
    }
  }, [formData.city, formData.postalCode])

  console.log("Fetching delivery fee with:", {
    origin: { postalCode: "100001", city: "Lagos", country: "NG" },
    destination: {
      postalCode: formData.postalCode,
      city: formData.city,
      country: "NG",
    },
    items: cartItems.map((item) => ({
      weight: item.weight || 1,
      quantity: item.quantity,
    })),
  })


  const fetchDeliveryFee = async () => {
    setIsLoadingDeliveryFee(true)
    setDeliveryError(null)

    try {
      const response = await fetch(
        "https://topship-staging.africa/api/get-shipment-rate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            origin: { postalCode: "100001", city: "Lagos", country: "NG" }, // Your store location
            destination: {
              postalCode: formData.postalCode,
              city: formData.city,
              country: "NG",
              Address: formData.address
            },
            items: cartItems.map((item) => ({
              weight: item.weight || 1,
              quantity: item.quantity || 1,
            })),
          }),
        }
      )

      if (!response.ok) throw new Error("Failed to get delivery fee")

      const data = await response.json()
      setDeliveryFee(data.rates[0].price) // Use first/cheapest rate
    } catch (error) {
      setDeliveryError(error.message)
      console.log("Error fetching delivery fee:", error)
      alert("failed to fetch delivery")
      setDeliveryFee(0) // Fallback flat fee
    } finally {
      setIsLoadingDeliveryFee(false)
    }
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const calculateSubtotal = (items) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const subtotal = calculateSubtotal(cartItems)
  const total = subtotal + deliveryFee

  // Initialize Paystack payment
  const initializePayment = async () => {
    if (!validateForm()) return
    if (isLoadingDeliveryFee) {
      alert("Please wait while we calculate your delivery fee")
      return
    }

    setIsProcessing(true)

    try {
      // Generate a unique reference
      const reference = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`

      // Prepare order data
      const orderData = {
        reference,
        items: cartItems,
        shipping: formData,
        subtotal,
        deliveryFee,
        total,
      }

      sessionStorage.setItem("pendingOrder", JSON.stringify(orderData))

      const response = await fetch("/api/initialize-paystack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          amount: total * 100,
          reference,
          callback_url: `${window.location.origin}/cart/payment/payment-complete`,
        }),
      })

      const data = await response.json()

      if (data.status) {
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

  // Form validation remains the same
  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address")
      return false
    }

    if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      alert("Please enter a valid phone number")
      return false
    }

    return true
  }

  return (
    <div className="payment__container">
      {/* Navbar remains the same */}
      <div className="payment__container-navbar">
        <Navbar />
      </div>

      <div className="payment__container-body">
        {/* Left section (form) remains the same */}
        {/* <div className="payment__container-body_left">
          {/* ... existing form code ... */}
        {/* </div> */}
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
            </div>
            <div className="payment__container-body_left-section4">
              <button onClick={() => router.push("/cart")}>BACK TO CART</button>
            </div>
          </div>
        </div>

        {/* Right section (totals) */}
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
                  Delivery Location:{" "}
                  <span>{formData.city || "Not specified"}</span>
                </p>
                {isLoadingDeliveryFee && <p>Calculating delivery fee...</p>}
                {deliveryError && <p className="error">{deliveryError}</p>}
              </div>
              <h3>
                {isLoadingDeliveryFee
                  ? "Calculating..."
                  : `N${Number(deliveryFee).toLocaleString()}`}
              </h3>
            </div>
          </div>
          <div className="payment__container-body_right-checkout">
            <h1>TOTAL</h1>
            <h3>
              {isLoadingDeliveryFee
                ? "Calculating..."
                : `N${Number(total).toLocaleString()}`}
            </h3>
          </div>
          <button
            onClick={initializePayment}
            disabled={
              isProcessing || cartItems.length === 0 || isLoadingDeliveryFee
            }
          >
            {isProcessing ? "PROCESSING..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Payment




// "use client";

// import Navbar from "@/Components/Navbar/Navbar";
// import "./page.css";
// import React, { useState } from "react";
// import { useCart } from "@/Context/CartContext";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// function Payment() {
//   const router = useRouter();
//   const { cartItems } = useCart();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     phoneNumber: "",
//     email: "",
//     rememberMe: false,
//   });

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const calculateSubtotal = (items) =>
//     items.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   const deliveryFee = 20500;
//   const subtotal = calculateSubtotal(cartItems);
//   const total = subtotal + deliveryFee;

//   // Initialize Paystack payment
//   const initializePayment = async () => {
//     if (!validateForm()) return;

//     setIsProcessing(true);

//     try {
//       // Generate a unique reference
//       const reference = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

//       // Prepare order data to be sent after successful payment
//       const orderData = {
//         reference,
//         items: cartItems,
//         shipping: formData,
//         subtotal,
//         deliveryFee,
//         total,
//       };

//       // Store order data in session storage for retrieval after payment
//       sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));

//       // Initialize Paystack
//       const response = await fetch("/api/initialize-paystack", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           amount: total * 100, // Paystack amount in kobo
//           reference,
//           callback_url: `${window.location.origin}/cart/payment/payment-complete`,
//         }),
//       });

//       const data = await response.json();

//       if (data.status) {
//         // Redirect to Paystack payment page
//         window.location.href = data.data.authorization_url;
//       } else {
//         alert("Payment initialization failed. Please try again.");
//         setIsProcessing(false);
//       }
//     } catch (error) {
//       console.error("Payment initialization error:", error);
//       alert("An error occurred. Please try again.");
//       setIsProcessing(false);
//     }
//   };

//   // Form validation
//   const validateForm = () => {
//     const requiredFields = [
//       "firstName",
//       "lastName",
//       "address",
//       "city",
//       "state",
//       "phoneNumber",
//       "email",
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         alert(
//           `Please fill in your ${field
//             .replace(/([A-Z])/g, " $1")
//             .toLowerCase()}`
//         );
//         return false;
//       }
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       alert("Please enter a valid email address");
//       return false;
//     }

//     // Phone validation
//     if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
//       alert("Please enter a valid phone number");
//       return false;
//     }

//     return true;
//   };

//   return (
//     <div className="payment__container">
//       <div className="payment__container-navbar">
//         <Navbar />
//       </div>
//       <div className="payment__container-body">
//         <div className="payment__container-body_left">
//           <div className="payment__container-body_left-section1">
//             <h1>Payment</h1>
//             <p>All transactions are secure and encrypted.</p>
//           </div>
//           <div className="payment__container-body_left-section2">
//             <div className="payment__container-body_left-section3">
//               <div className="payment__container-body_left-section3_top">
//                 <h1>Billing Details</h1>
//               </div>
//               <div className="payment__container-body_left-section3_bottom">
//                 <div className="section3_bottom-input1">
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     placeholder="First Name"
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     placeholder="Last Name"
//                   />
//                 </div>
//                 <div className="section3_bottom-input2">
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     placeholder="Address"
//                   />
//                 </div>
//                 <div className="section3_bottom-input3">
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     placeholder="Town/City"
//                   />
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     placeholder="State"
//                   />
//                   <input
//                     type="text"
//                     name="postalCode"
//                     value={formData.postalCode}
//                     onChange={handleChange}
//                     placeholder="Postal Code"
//                   />
//                 </div>
//                 <div className="section3_bottom-input1">
//                   <input
//                     type="number"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     placeholder="Phone Number"
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email Address"
//                   />
//                 </div>
//                 <div className="section3_bottom-input4">
//                   <input
//                     type="checkbox"
//                     id="rememberMe"
//                     name="rememberMe"
//                     checked={formData.rememberMe}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="rememberMe">Remember me</label>
//                 </div>
//               </div>
//             </div>
//             <div className="payment__container-body_left-section4">
//               <button onClick={() => router.push("/cart")}>BACK TO CART</button>
//             </div>
//           </div>
//         </div>
//         <div className="payment__container-body_right">
//           <h1>CART TOTALS</h1>
//           <div className="payment__container-body_right-totals">
//             <div className="payment__container-body_right-totals_section1">
//               <h1>SUBTOTAL</h1>
//               <h3>N{Number(subtotal).toLocaleString()}</h3>
//             </div>
//             <div className="payment__container-body_right-totals_section2">
//               <div className="payment__container-delivery">
//                 <h1>DELIVERY</h1>
//                 <p>Delivery fees:</p>
//                 <p>
//                   Delivery Location: <span>{formData.city || "Abuja"}</span>
//                 </p>
//               </div>
//               <h3>N{Number(deliveryFee).toLocaleString()}</h3>
//             </div>
//           </div>
//           <div className="payment__container-body_right-checkout">
//             <h1>TOTAL</h1>
//             <h3>N{Number(total).toLocaleString()}</h3>
//           </div>
//           <button
//             onClick={initializePayment}
//             disabled={isProcessing || cartItems.length === 0}
//           >
//             {isProcessing ? "PROCESSING..." : "PROCEED TO PAYMENT"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Payment;
