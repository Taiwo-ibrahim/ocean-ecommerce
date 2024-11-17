import React from "react";
import './Product.css'
import Link from "next/link";

const Product = ({name, price, image, id}) => {
    return (
      <div className="product__container">
            <button>NEW IN</button>
            <Link href={`/quickview/${id}`}>
                <img src={image} alt="" />
            </Link>
        <span></span>
        <div className="product__container-details">
            <div className="product__container-details_name">    
                <h3>{name} </h3>
                <small>{price}</small>
            </div>
            <div className="product__container-details_image">
            <img src='/cartImg2.png' alt='' />
            </div>
                
        </div>
      </div>
    )
}

export default Product