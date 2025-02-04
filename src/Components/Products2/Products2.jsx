// "use client";


// import React, { useState, useEffect } from "react";
// import "./Products2.css";
// import Product from "../Product/Product";



// const Products2 = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const backendBaseUrl = "https://backend.oceansteeze.com/products/";
//   useEffect(() => {
//     // Fetch products by category
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           `https://backend.oceansteeze.com/getProductByCategory.php?category=SS123`
//         );
//         const data = await response.json();

//         if (data.status === "success") {
//           setProducts(data.data);
//         } else {
//           setError("Failed to fetch products");
//         }
//       } catch (err) {
//         setError("An error occurred while fetching products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       {products.map((item, index) => (
//         <div className="products2__container-product" key={index}>
//           <Product
//             id={item.id}
//             name={item.product_name}
//             image={`${backendBaseUrl}${item.image1}`}
//             hoverImage={`${backendBaseUrl}${item.image2}`}
//             price={item.price}
//             href={`/quickview/${item.id}`}
//           />
//         </div>
//       ))}
//     </div>

//   )
// };

// export default Products2;

"use client"

import React, { useState, useEffect } from "react"
import "./Products2.css"
import Product from "../Product/Product"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

const Products2 = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const backendBaseUrl = "https://backend.oceansteeze.com/products/"

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://backend.oceansteeze.com/getProductByCategory.php?category=SS123`
        )
        const data = await response.json()

        if (data.status === "success") {
          setProducts(data.data)
        } else {
          setError("Failed to fetch products")
        }
      } catch (err) {
        setError("An error occurred while fetching products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const totalSlides = products.length
  // console.log(totalSlides)
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    )
  }

  return (
    <div className="carousel2-container">
      {/* Left Arrow */}
      <IoIosArrowBack className="left-arrow" onClick={prevSlide} />

      {/* Product Slider */}
      <div
        className="carousel2"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {products.map((item, index) => (
          <div
            className="carousel2-item products2__container-product"
            key={index}
          >
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

      {/* Right Arrow */}
      <IoIosArrowForward className="right-arrow" onClick={nextSlide} />
    </div>
  )
}

export default Products2
