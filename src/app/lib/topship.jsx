// lib/topship.js
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api-topship.com/api"
    : "https://topship-staging.africa/api"

export async function fetchTopShip(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`)

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "object") {
      url.searchParams.set(key, JSON.stringify(value))
    } else {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.TOPSHIP_API_KEY}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`TopShip API error: ${response.statusText}`)
  }

  return response.json()
}

export async function getShippingRates(
  senderCity,
  senderCountry,
  receiverCity,
  receiverCountry,
  totalWeight
) {
  return fetchTopShip("get-shipment-rate", {
    shipmentDetail: {
      senderDetails: {
        cityName: senderCity,
        countryCode: senderCountry,
      },
      receiverDetails: {
        cityName: receiverCity,
        countryCode: receiverCountry,
      },
      totalWeight,
    },
  })
}

export async function getCountries() {
  return fetchTopShip("get-countries")
}

export async function getStates(countryCode) {
  return fetchTopShip("get-states", { countryCode })
}

export async function getCities(countryCode) {
  return fetchTopShip("get-cities", { countryCode })
}

export async function getPickupRates(senderDetails, pickupDate) {
  return fetchTopShip("get-pickup-rates", {
    input: {
      senderDetail: senderDetails,
      pickupDate,
    },
  })
}
