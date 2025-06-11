// app/Context/ShippingContext.jsx
"use client"

import React, { createContext, useState, useContext, useEffect } from "react"

const ShippingContext = createContext({
  countries: [],
  cities: [],
  states: [],
  shippingRates: [],
  selectedRate: null,
  isLoadingRates: false,
  fetchCountries: async () => {},
  fetchStates: async () => {},
  fetchCities: async () => {},
  fetchShippingRates: async () => {},
  setSelectedRate: () => {},
  warehouseLocation: {
    addressLine1: "268, Herbert Macauly way",
    addressLine2: "",
    country: "Nigeria",
    countryCode: "NG",
    state: "Lagos",
    city: "Yaba",
  },
})

export const useShipping = () => useContext(ShippingContext)

export const ShippingProvider = ({ children }) => {
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [states, setStates] = useState([])
  const [shippingRates, setShippingRates] = useState([])
  const [selectedRate, setSelectedRate] = useState(null)
  const [isLoadingRates, setIsLoadingRates] = useState(false)

  const warehouseLocation = {
    addressLine1: "268, Herbert Macauly way",
    addressLine2: "",
    country: "Nigeria",
    countryCode: "NG",
    state: "Lagos",
    city: "Yaba",
  }

  // Helper function to convert % to naira
  const convertKoboToNaira = (kobo) => {
    return kobo / 100
  }

  const fetchCountries = async () => {
    try {
      const response = await fetch("/api/topship/countries")
      const data = await response.json()
      setCountries(data)
    } catch (error) {
      console.error("Error fetching countries:", error)
    }
  }

  const fetchStates = async (countryCode) => {
    try {
      const response = await fetch(
        `/api/topship/states?countryCode=${countryCode}`
      )
      const data = await response.json()
      setStates(data)
    } catch (error) {
      console.error("Error fetching states:", error)
    }
  }

  const fetchCities = async (countryCode) => {
    try {
      const response = await fetch(
        `/api/topship/cities?countryCode=${countryCode}`
      )
      const data = await response.json()
      setCities(data)
    } catch (error) {
      console.error("Error fetching cities:", error)
    }
  }

  const fetchShippingRates = async (receiverDetails, weight) => {
    setIsLoadingRates(true)
    try {
      const payload = {
        shipmentDetail: {
          senderDetails: {
            cityName: warehouseLocation.city,
            countryCode: warehouseLocation.countryCode,
          },
          receiverDetails,
          totalWeight: weight,
        },
      }

      const response = await fetch(
        `/api/topship/shipping-rates?shipmentDetail=${JSON.stringify(
          payload.shipmentDetail
        )}`
      )
      const data = await response.json()

      // Convert rates from kobo to naira before setting them
      const convertedRates = data.map((rate) => ({
        ...rate,
        cost: convertKoboToNaira(rate.cost),
      }))

      setShippingRates(convertedRates)

      // Auto-select the budget option by default if available
      if (convertedRates.length > 0) {
        const budgetOption =
          convertedRates.find((rate) => rate.pricingTier === "Budget") ||
          convertedRates[0]
        setSelectedRate(budgetOption)
      }
    } catch (error) {
      console.error("Error fetching shipping rates:", error)
    } finally {
      setIsLoadingRates(false)
    }
  }

  // Load countries on initial mount
  useEffect(() => {
    fetchCountries()
  }, [])

  return (
    <ShippingContext.Provider
      value={{
        countries,
        cities,
        states,
        shippingRates,
        selectedRate,
        isLoadingRates,
        fetchCountries,
        fetchStates,
        fetchCities,
        fetchShippingRates,
        setSelectedRate,
        warehouseLocation,
      }}
    >
      {children}
    </ShippingContext.Provider>
  )
}
