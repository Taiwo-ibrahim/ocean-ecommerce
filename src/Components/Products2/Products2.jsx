"use client";

import React, { useState, useEffect } from "react";
import "./Products2.css";
import Product from "../Product/Product";
// import "./Products2.css";
const Products2 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendBaseUrl = "https://backend.oceansteeze.com/products/";
  useEffect(() => {
    // Fetch products by category
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://backend.oceansteeze.com/getProductByCategory.php?category=SS123`
        );
        const data = await response.json();

        if (data.status === "success") {
          setProducts(data.data);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError("An error occurred while fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products2__container">
      {products.map((item) => (
        <div className="products2__container-product" key={item.id}>
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
  );
};

export default Products2;

