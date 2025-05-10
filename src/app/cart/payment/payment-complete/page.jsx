"use client"

import React, { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { AiOutlineExclamationCircle } from "react-icons/ai"

import "./page.css"
import Navbar from "@/Components/Navbar/Navbar"
import CartItem from "@/Components/CartItem/CartItem"
import { useCart } from "@/Context/CartContext"

function PaymentCompleteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { cartItems, clearCart } = useCart()
  const [status, setStatus] = useState("verifying")
  const [message, setMessage] = useState("Verifying your payment...")
  const [orderItems, setOrderItems] = useState([])
  const [orderDetails, setOrderDetails] = useState(null)

  useEffect(() => {
    const pendingOrder = JSON.parse(
      sessionStorage.getItem("pendingOrder") || "{}"
    )
    setOrderItems(pendingOrder.items || [...cartItems])

    const timeoutId = setTimeout(() => {
      router.push("/")
    }, 30000)

    const reference = searchParams.get("reference")

    if (!reference) {
      console.error("No reference found in URL")
      setStatus("failed")
      setMessage("Invalid payment reference")
      return () => clearTimeout(timeoutId)
    }

    const verifyPayment = async () => {
      try {
        const verifyResponse = await fetch(
          `/api/verify-paystack?reference=${reference}`
        )
        const verifyData = await verifyResponse.json()
        console.log("Paystack Verification Response:", verifyData)

        if (verifyData.status && verifyData.data.status === "success") {
          // First create database order
          const orderResponse = await fetch(
            "https://backend.oceansteeze.com/create-order.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...pendingOrder,
                payment_reference: reference,
                payment_status: "paid",
              }),
            }
          )

          const orderData = await orderResponse.json()
          console.log("Order Submission Response:", orderData)

          if (orderData.success) {
            // Now create Topship shipment
            try {
              // Map cart items to Topship format
              const topshipItems = pendingOrder.items.map((item) => ({
                category: "ClothingAndTextile", // Default category - adjust as needed
                description: item.name,
                weight: 0.5, // Default weight
                quantity: item.quantity,
                value: Number(item.price),
              }))

              // Prepare shipping data
              const totalWeight = topshipItems.reduce(
                (acc, item) => acc + item.weight * item.quantity,
                0
              )

              // Calculate VAT (7.5% of total charge)
              const shipmentCharge = Math.round(
                pendingOrder.shippingRate.cost * 100
              )
              const totalCharge = shipmentCharge
              const valueAddedTaxCharge = Math.round(totalCharge * 0.075)

              const topshipPayload = {
                shipment: [
                  {
                    items: topshipItems,
                    itemCollectionMode: "DropOff",
                    pricingTier: pendingOrder.shippingRate.pricingTier,
                    insuranceType: "None",
                    insuranceCharge: 0,
                    discount: 0,
                    shipmentRoute:
                      pendingOrder.shipping.countryCode === "NG"
                        ? "Domestic"
                        : "Export",
                    shipmentCharge: shipmentCharge,
                    pickupCharge: 0,
                    valueAddedTaxCharge: valueAddedTaxCharge,
                    senderDetail: {
                      name: "OceanSteeze",
                      email: "support@oceansteeze.com",
                      phoneNumber: "09099346124", // Replace with your phone number
                      addressLine1: "268, Herbert Macauly way",
                      addressLine2: "",
                      addressLine3: "",
                      country: "Nigeria",
                      state: "Lagos",
                      city: "Yaba",
                      countryCode: "NG",
                      postalCode: "",
                    },
                    receiverDetail: {
                      name: `${pendingOrder.shipping.firstName} ${pendingOrder.shipping.lastName}`,
                      email: pendingOrder.shipping.email,
                      phoneNumber: pendingOrder.shipping.phoneNumber,
                      addressLine1: pendingOrder.shipping.address,
                      addressLine2: "",
                      addressLine3: "",
                      country: pendingOrder.shipping.country,
                      state: pendingOrder.shipping.state,
                      city: pendingOrder.shipping.city,
                      countryCode: pendingOrder.shipping.countryCode,
                      postalCode: "",
                    },
                  },
                ],
              }

              // Book shipment
              const shipmentResponse = await fetch(
                "/api/topship/book-shipment",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(topshipPayload),
                }
              )

              const shipmentData = await shipmentResponse.json()
              console.log("Topship Booking Response:", shipmentData)

              if (shipmentData.trackingId) {
                // Update order with tracking info in your database if needed
                try {
                  await fetch(
                    `https://backend.oceansteeze.com/update-tracking.php`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        order_id: orderData.order_id,
                        tracking_id: shipmentData.trackingId,
                      }),
                    }
                  )
                } catch (updateError) {
                  console.error("Error updating tracking info:", updateError)
                }

                setOrderDetails({
                  orderId: orderData.order_id,
                  reference,
                  trackingId: shipmentData.trackingId,
                  ...pendingOrder,
                })

                setMessage(
                  "Your order is completed and it is on the way for delivery!"
                )
              } else {
                // If Topship booking fails, still consider order successful
                setOrderDetails({
                  orderId: orderData.order_id,
                  reference,
                  ...pendingOrder,
                })

                setMessage(
                  "Your order is completed and it is on the way for delivery!"
                )
              }
            } catch (shipmentError) {
              console.error("Error booking shipment:", shipmentError)

              // If Topship booking errors, still consider order successful
              setOrderDetails({
                orderId: orderData.order_id,
                reference,
                ...pendingOrder,
              })
            }

            console.log("Order successful. Updating state to 'success'.")
            setStatus("success")

            // Clear cart on successful order
            clearCart()
            sessionStorage.removeItem("pendingOrder")
          } else {
            console.log("Order submission failed. Updating state to 'warning'.")
            setStatus("warning")
            setMessage(
              "Payment successful, but we could not process your order. Our team will contact you shortly."
            )
          }
        } else {
          console.error("Payment verification failed.")
          setStatus("failed")
          setMessage("Payment verification failed. Please contact support.")
        }
      } catch (error) {
        console.error("Error processing payment:", error)
        setStatus("failed")
        setMessage("An error occurred while processing your payment.")
      }
    }

    verifyPayment()

    return () => clearTimeout(timeoutId)
  }, [searchParams, clearCart, cartItems, router])

  return (
    <div className="paymentComplete__container">
      <div className="paymentComplete__container-navbar">
        <Navbar />
      </div>
      <div className="paymentComplete__container-body">
        <div className="paymentComplete__container-body-left">
          <div className="paymentComplete__container-body-left-content">
            {status === "success" ? (
              <img src="/icons8-tick-144 1.png" alt="success.png" />
            ) : status === "failed" ? (
              <img src="/icons8-tick-144 1.png" alt="error.png" />
            ) : (
              <div className="loading-spinner"></div>
            )}
            <div className="paymentComplete__container-body-left-content-text">
              <h4>
                {status === "success"
                  ? "Your order is completed and it is on the way for delivery!"
                  : status === "failed"
                  ? "Payment Failed"
                  : "Verifying Payment..."}
              </h4>
              <p>
                {status === "success"
                  ? "We've successfully received your payment and your order is currently being packed so it get sent to you."
                  : status === "failed"
                  ? "We couldn't process your payment. Please try again or contact customer support."
                  : "Please wait while we verify your payment..."}
              </p>

              {orderDetails && orderDetails.trackingId && (
                <p className="tracking-info">
                  Tracking ID: <strong>{orderDetails.trackingId}</strong>
                </p>
              )}

              {orderDetails && orderDetails.orderId && (
                <p className="order-info">
                  Order ID: <strong>{orderDetails.orderId}</strong>
                </p>
              )}
            </div>
            <div className="paymentComplete__container-body-left-content-button">
              <Link href="/">
                <button>Back Home</button>
              </Link>
              <p>
                <AiOutlineExclamationCircle className="red" /> You&apos;d
                automatically be returned back to the homepage after 30 seconds.
              </p>
            </div>
          </div>
        </div>
        <div className="paymentComplete__container-body-right">
          <p>Order Summary</p>
          <div className="paymentComplete__container-body-right-content">
            {orderItems && orderItems.length > 0 ? (
              orderItems.map((item, index) => (
                <CartItem key={item.id || index} item={item} checkout={true} />
              ))
            ) : (
              <p>No items to display</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentComplete() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentCompleteContent />
    </Suspense>
  )
}

export default PaymentComplete
