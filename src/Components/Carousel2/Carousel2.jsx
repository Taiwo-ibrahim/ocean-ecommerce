"use client"

import { Carousel } from "@/components/Carousel"
import { Product } from "@/components/Product"

export function ProductCarousel({
  products,
  backendBaseUrl,
  itemsPerSlide = 6,
}) {
  return (
    <div className="w-full">
      <Carousel itemsPerSlide={itemsPerSlide}>
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
      </Carousel>
    </div>
  )
}
