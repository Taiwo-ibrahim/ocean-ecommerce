"use client";

import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Products3.css";

const Products3 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const backendBaseUrl = "https://backend.oceansteeze.com/products/";
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://backend.oceansteeze.com/getNewProducts.php"
        );
        const data = await response.json();

        if (data.status === "success") {
          setProducts(data.data); // Set products from API
        } else {
          setError("Failed to fetch products.");
        }
      } catch (err) {
        setError("An error occurred while fetching products.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel">
        {products.map((item) => (
          <div className="products2__container-product" key={item.id}>
            <Product
              className="carousel-image-container"
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
    </div>
// <<<<<<< HEAD
  )
}
export default Products3

  // <div className="carousel-container">
  //     <div className="carousel">
  //       {duplicatedItems.map((item, index) => (
  //         <div className="carousel-image-container" key={index}>
  //           <img src={item.img.src} alt={item.img.alt || "Carousel item"} />
  //           <div className="carousel-image-tag">{item.location}</div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
// =======
//   );
// };
// export default Products3;
// >>>>>>> 07ba378efa81b08fe4a2334d27d05c214b309c40
