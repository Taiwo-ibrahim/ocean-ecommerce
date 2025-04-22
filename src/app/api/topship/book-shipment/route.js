// app/api/topship/book-shipment/route.tsx
import { NextRequest, NextResponse } from "next/server"

export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.shipment || !Array.isArray(data.shipment)) {
      return NextResponse.json(
        { error: "Invalid shipment data format" },
        { status: 400 }
      )
    }

    // First, save the shipment as a draft
    const saveResponse = await fetch(
      "https://topship-staging.africa/api/save-shipment",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TOPSHIP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )

    const saveData = await saveResponse.json()

    console.log("Topship Save Response:", JSON.stringify(saveData, null, 2))

    if (!saveResponse.ok) {
      console.error("Topship Save Error:", saveData)
      return NextResponse.json(
        {
          error: "Failed to save shipment",
          details: saveData,
        },
        { status: saveResponse.status }
      )
    }

    // Extract shipment ID from the response
    let shipmentId

    // The response is an array with the shipment object
    if (Array.isArray(saveData)) {
      shipmentId = saveData[0]?.id
    } else if (saveData.id) {
      shipmentId = saveData.id
    }

    if (!shipmentId) {
      console.error("No shipment ID found in response:", saveData)
      return NextResponse.json(
        {
          error: "Failed to extract shipment ID from Topship response",
          details: saveData,
        },
        { status: 400 }
      )
    }

    console.log("Extracted shipment ID:", shipmentId)

    // Then pay for the shipment with the correct structure
    const payloadForPayment = {
      detail: {
        shipmentId: shipmentId,
      },
    }

    console.log("Payment payload:", JSON.stringify(payloadForPayment, null, 2))

    const payResponse = await fetch(
      "https://topship-staging.africa/api/pay-from-wallet",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TOPSHIP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadForPayment),
      }
    )

    const payData = await payResponse.json()
    console.log("Payment response:", JSON.stringify(payData, null, 2))

    if (!payResponse.ok) {
      console.error("Topship Payment Error:", payData)
      return NextResponse.json(
        {
          error: "Shipment saved but payment failed",
          details: payData,
        },
        { status: payResponse.status }
      )
    }

    // Return successful response with combined data
    return NextResponse.json({
      ...payData,
      shipmentId,
      trackingId: Array.isArray(saveData)
        ? saveData[0]?.trackingId
        : saveData.trackingId,
      message: "Shipment created and paid successfully",
    })
  } catch (error) {
    console.error("Internal Server Error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
