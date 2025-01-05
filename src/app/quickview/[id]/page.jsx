"use client";

// <<<<<<< HEAD
import Navbar from "@/Components/Navbar/Navbar"
import React, { useEffect, useState } from "react"
import "./page.css"
import Products from "@/Components/Products/Products"
import Footer from "@/Components/Footer/Footer"
import { useRouter, useParams } from "next/navigation"
import { useCart } from "@/Context/CartContext"
import { TbPointFilled } from "react-icons/tb"


// =======
// // import Navbar from "@/Components/Navbar/Navbar";
// // import React, { useEffect, useState } from "react";
// // import "./page.css";
// // import Products from "@/Components/Products/Products";
// // import Footer from "@/Components/Footer/Footer";
// // import { useRouter, useParams } from "next/navigation";
// // import { useCart } from "@/Context/CartContext";
// // >>>>>>> 07ba378efa81b08fe4a2334d27d05c214b309c40

function ProductInfo() {
  const params = useParams();
  const productId = params.id;

  const { addToCart } = useCart();

  const [cartMessage, setCartMessage] = useState(""); // New state for cart message

  const handleAddToCart = () => {
    if (product) {
      const productDetails = {
        id: product.id,
        name: product.product_name,
        price: product.price,
        image: product.image1,
      };

      addToCart(productDetails, count);

      // Show cart message
      setCartMessage(`${count} ${product.product_name} added to cart`);

      // Clear message after 3 seconds
      setTimeout(() => {
        setCartMessage("");
      }, 3000);
    }
  };

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [count, setCount] = useState(1);
  const [showSize, setShowSize] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));
  const handleShowSize = () => setShowSize((prev) => !prev);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://backend.oceansteeze.com/getProductById.php?id=${productId}`
        );
        const data = await response.json();
        console.log(data); // For debugging

        if (data.status === "success" && data.data) {
          setProduct(data.data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("An error occurred while fetching product details");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      setError("Invalid product ID");
      setLoading(false);
    }
  }, [productId]);

  // Data for FAQ-like sections (static content)
  const data = [
    {
      id: 1,
      question: "Product Details",
      answer: product ? product.description : "Loading product description...", // Dynamic data
    },
    {
      id: 2,
      question: "Shopping & Returns",
      // answer:
      //   "Clash Blue Jean Jacket ‘25 crafted with the best wool in town putting our blood and sweat on this P. Get this and know the feeling of Clash", // Static for now
    },
    {
      id: 3,
      question: "Size Guide",
      // answer:
      //   "Clash Blue Jean Jacket ‘25 crafted with the best wool in town putting our blood and sweat on this P. Get this and know the feeling of Clash", // Static for now
    },
  ];

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  // Error or loading states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="productInfo__container">
      <div className="productInfo__container-navbar">
        <Navbar />
      </div>
      <div className="productInfo__container-body">
        <div className="productInfo__container-body_left">
          <img
            src={`https://backend.clashstores.com/products/${product.image1}`}
            alt={product.product_name}
          />
        </div>
        <div className="productInfo__container-body_right">
          <div className="productInfo__section1">
            <h1>Oceanhood/Brown</h1>
            <p>$448</p>
          </div>
          <div className="productInfo__section2">
            <p>
              <TbPointFilled /> Washed denim body
            </p>
            <p>
              <TbPointFilled /> Faux leather sleeves
            </p>
            <p>
              <TbPointFilled /> Embroidered Diet logo on chest and back
            </p>
            <p>
              <TbPointFilled /> Diet branded zipper
            </p>
            <p>
              <TbPointFilled /> Striped ribbing
            </p>
{/* <<<<<<< HEAD
=======
          )}
        </div>
        <div className="productInfo__container-product_section2">
          <div>
            <img
              src={`https://backend.oceansteeze.com/products/${product.image1}`}
              alt={product.product_name}
            />
>>>>>>> 07ba378efa81b08fe4a2334d27d05c214b309c40 */}
          </div>
          <div className="productInfo__section3">
            <table>
              <tr>
                <th></th>
                <th>s</th>
                <th>m</th>
                <th>l</th>
                <th>xl</th>
                <th>2xl</th>
              </tr>
              <tr>
                <td>Length</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>shoulder</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>chest</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>sleeve</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
          <div className="productInfo__section4">
            <p>SIZE:XS</p>
            <div className="productInfo__section4-size">
              <p>xs</p>
              <p>s</p>
              <p>m</p>
              <p>l</p>
              <p>xl</p>
              <p>2x</p>
              <p>3x</p>
            </div>
            <div className="productInfo__section4-cart">
              <div className="productInfo__section4-cart_add">
                <p>-</p>
                <p>1</p>
                <p>+</p>
              </div>
              <button>add to cart</button>
            </div>
          </div>
        </div>
      </div>
      <div className="productInfo__container-footer">
        <Footer />
      </div>
    </div>
  );
}

// <<<<<<< HEAD
export default ProductInfo









// <div className="productInfo__container">
//   <div className="productInfo__container-navbar">
//     <Navbar />
//   </div>
//   <div className="productInfo__container-product_details">
//     <div className="productInfo__container-product_section1">
//       <div className="productInfo__container-product_section1-name">
//         <p>{product.product_name}</p>
//         <img src="/like.png" alt="Like" />
//       </div>
//       <h3>N{Number(product.price).toLocaleString()}</h3>
//       <div className="productInfo__container-product_size">
//         <div className="productInfo__container-product_size-button">
//           <button onClick={handleDecrease}>-</button>
//           <p>{count}</p>
//           <button onClick={handleIncrease}>+</button>
//         </div>
//         <div className="productInfo__container-product_sizeDD">
//           <button onClick={handleShowSize}>
//             Select Size
//             <span>
//               <img src="/down.png" alt="Dropdown" />
//             </span>
//           </button>
//           <div className={showSize ? "productInfo__container-DD" : "none"}>
//             <p>Small</p>
//             <p>Medium</p>
//             <p>Large</p>
//             <p>Extra Large</p>
//             <p>2XL</p>
//             <p>3XL</p>
//           </div>
//         </div>
//       </div>
//       <button onClick={handleAddToCart}>ADD TO CART</button>
//       {cartMessage && (
//         <p
//           className="cart-message"
//           style={{
//             color: "green",
//             marginTop: "10px",
//             textAlign: "center",
//           }}
//         >
//           {cartMessage}
//         </p>
//       )}
//     </div>
//     <div className="productInfo__container-product_section2">
//       <div>
//         
//       </div>
//       <div className="productInfo__container-product_section3">
//         <div className="productInfo__container-product_section3-details">
//           {data.map((item, i) => (
//             <div key={item.id} className="productInfo__container-detail">
//               <div
//                 className="productInfo__container-detail_top"
//                 onClick={() => toggle(i)}
//               >
//                 <h3>{item.question}</h3>
//                 <img src="/down.png" alt="" />
//               </div>
//               <p className={selected === i ? "content show" : "content"}>
//                 {item.answer}
//               </p>
//             </div>
//           ))}
//         </div>
//         <div className="productInfo__container-product_section3-img">
//           <img src="/mail.png" alt="Mail" />
//           <img src="/facebook.png" alt="Facebook" />
//           <img src="/instagram.png" alt="Instagram" />
//           <img src="/twitter.png" alt="Twitter" />
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="productInfo__container-interested">
//     <div className="productInfo__container-interested_top">
//       <h3>YOU MIGHT ALSO BE INTERESTED IN:</h3>
//       <span></span>
//     </div>
//     {/* <div className="productInfo__container-interested_bottom">
//       <Products />
//     </div> */}
//   </div>
//   <div className="productInfo__container-footer">
//     <Footer />
//   </div>
// </div>
// =======
// export default ProductInfo;
// >>>>>>> 07ba378efa81b08fe4a2334d27d05c214b309c40
