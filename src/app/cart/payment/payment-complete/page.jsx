"use client";

import React, { useEffect, useState } from "react";
import "./page.css";
import Navbar from "@/Components/Navbar/Navbar";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import CartItem from "@/Components/CartItem/CartItem";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/Context/CartContext";
import Link from "next/link";

function PaymentComplete() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartItems, clearCart } = useCart();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your payment...");
  const [orderItems, setOrderItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const pendingOrder = JSON.parse(
      sessionStorage.getItem("pendingOrder") || "{}"
    );
    setOrderItems(pendingOrder.items || [...cartItems]);

    const timeoutId = setTimeout(() => {
      router.push("/");
    }, 30000);

    const reference = searchParams.get("reference");

    if (!reference) {
      console.error("No reference found in URL");
      setStatus("failed");
      setMessage("Invalid payment reference");
      return () => clearTimeout(timeoutId);
    }

    const verifyPayment = async () => {
      try {
        const verifyResponse = await fetch(
          `/api/verify-paystack?reference=${reference}`
        );
        const verifyData = await verifyResponse.json();
        console.log("Paystack Verification Response:", verifyData);

        if (verifyData.status && verifyData.data.status === "success") {
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
          );

          const orderData = await orderResponse.json();
          console.log("Order Submission Response:", orderData);

          if (orderData.success) {
            console.log("Order successful. Updating state to 'success'.");
            setStatus("success");
            setMessage(
              "Your order is completed and it is on the way for delivery!"
            );
            setOrderDetails({
              orderId: orderData.order_id,
              reference,
              ...pendingOrder,
            });

            sessionStorage.removeItem("pendingOrder");
          } else {
            console.log(
              "Order submission failed. Updating state to 'warning'."
            );
            setStatus("warning");
            setMessage(
              "Payment successful, but we could not process your order. Our team will contact you shortly."
            );
          }
        } else {
          console.error("Payment verification failed.");
          setStatus("failed");
          setMessage("Payment verification failed. Please contact support.");
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        setStatus("failed");
        setMessage("An error occurred while processing your payment.");
      }
    };

    verifyPayment();

    return () => clearTimeout(timeoutId);
  }, [searchParams, clearCart, cartItems, router]);

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
            </div>
            <div className="paymentComplete__container-body-left-content-button">
              <Link href="/">
                <button>Back Home</button>
              </Link>
              <p>
                <AiOutlineExclamationCircle className="red" /> You'd
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

            {/* {orderDetails && (
              <div className="order-totals">
                <div className="order-total-row">
                  <span>Subtotal:</span>
                  <span>N{Number(orderDetails.subtotal).toLocaleString()}</span>
                </div>
                <div className="order-total-row">
                  <span>Delivery Fee:</span>
                  <span>
                    N{Number(orderDetails.deliveryFee).toLocaleString()}
                  </span>
                </div>
                <div className="order-total-row total">
                  <span>Total:</span>
                  <span>N{Number(orderDetails.total).toLocaleString()}</span>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentComplete;
