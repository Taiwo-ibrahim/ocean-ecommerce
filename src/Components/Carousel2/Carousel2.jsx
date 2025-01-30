import { useState } from "react"
import "./carousel2.css"
import { IoIosArrowForward } from "react-icons/io"
// import React, { useState, useEffect } from "react"
import { IoIosArrowBack } from "react-icons/io"

const Carousel2 = ({ items, renderItem }) => {
  const [current, setCurrent] = useState(0)
  const length = items?.length 

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  if (!Array.isArray(items) || items.length <= 0) {
    return null
  }

  return (
    <section className="slider">
      <IoIosArrowBack className="left-arrow" onClick={prevSlide} />
      <IoIosArrowForward className="right-arrow" onClick={nextSlide} />
      {items.map((item, index) => (
        <div
          className={index === current ? "slide active" : "slide"}
          key={index}
        >
          {index === current && renderItem(item)}
        </div>
      ))}
    </section>
  )
}

export default Carousel2
