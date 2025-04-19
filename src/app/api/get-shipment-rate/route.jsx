// export default async function POST(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" })
//   }

//   try {
//     // Extract data from request body
//     const { origin, destination, item } = req.body

  

//     // Mock response (replace with real API call)
//     const response = await fetch(
//       "https://api-topship.com/api/get-shipment-rate",
//       {
//         method: "POST",
//         headers: { Authorization: `Bearer ${process.env.TOPSHIP_API_KEY}` },
//         body: JSON.stringify(data),
//       }
//     )
//     res.status(200).json(await response.json())
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch rates" })
//   }
// }

// src/app/api/get-shipment-rate/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { origin, destination, package: pkg } = body

    // Validation
    // if (!origin?.postalCode || !destination?.postalCode || !pkg?.weight) {
    //   return NextResponse.json(
    //     { error: 'Missing required fields' },
    //     { status: 400 }
    //   )
    // }

    // Mock response - replace with real API call
    const mockRates = [
      {
        carrier: 'UPS',
        service: 'Ground',
        price: 12.99,
        estimatedDelivery: '3-5 business days',
      },
      {
        carrier: 'FedEx',
        service: 'Standard',
        price: 15.49,
        estimatedDelivery: '2-3 business days',
      },
    ]

    return NextResponse.json({ rates: mockRates })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch rates', details: error.message },
      { status: 500 }
    )
  }
}

// Optionally add other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}