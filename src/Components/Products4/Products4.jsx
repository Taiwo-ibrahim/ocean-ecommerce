"use client"

import React, { useEffect, useState } from "react"
import Product from "../Product/Product"
import { GrFormPrevious } from "react-icons/gr"
import { MdOutlineNavigateNext } from "react-icons/md"
import "./Products4.css"

const Products4 = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(getInitialItemsPerPage()) // Dynamic items per page
  const [displayedProducts, setDisplayedProducts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768)

  const backendBaseUrl = "https://backend.oceansteeze.com/products/"

  // Function to determine initial items per page
  function getInitialItemsPerPage() {
    return window.innerWidth < 768 ? 2 : 4
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://backend.oceansteeze.com/getAllProducts.php"
        )
        const data = await response.json()

        if (data.status === "success") {
          setProducts(data.data)
        } else {
          setError("Failed to fetch products.")
        }
      } catch (err) {
        setError("An error occurred while fetching products.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768)
      setItemsPerPage(getInitialItemsPerPage()) // Update itemsPerPage on resize
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []) // Empty dependency array ensures this runs only on mount/unmount

useEffect(() => {
  if (loading || products.length === 0) return

  setTotalPages(Math.ceil(products.length / itemsPerPage))
  updateDisplayedProducts()
}, [products, itemsPerPage, loading]) 
    
    //  useEffect(() => {
    //    if (!loading && products.length > 0) {
    //      setTotalPages(Math.ceil(products.length / itemsPerPage))
    //      updateDisplayedProducts()
    //    }
    //  }, [products, itemsPerPage, currentPage, loading])

  const updateDisplayedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setDisplayedProducts(products.slice(startIndex, endIndex))
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const renderPageNumbers = () => {
    // ... (Your existing renderPageNumbers function remains the same)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="products4__container">
      <div className="products4__container-top">
        {displayedProducts.map((item) => (
          <div className="products4__container-product" key={item.id}>
            <Product
              id={item.id}
              name={item.product_name}
              image={`${backendBaseUrl}${item.image1}`}
              hoverImage={`${backendBaseUrl}${item.image2}`}
              price={item.price}
              href={`/quickview/${item.id}`}
            />
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation" className="page-navigation">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous"
              disabled={currentPage === 1}
            >
              <GrFormPrevious className="page-link-item" />
            </button>
          </li>
          <h1 className="page-none"> {renderPageNumbers()}</h1>
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link2"
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next"
              disabled={currentPage === totalPages}
            >
              <MdOutlineNavigateNext className="page-link-item" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Products4
