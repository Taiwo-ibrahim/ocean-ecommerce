import Navbar from "@/Components/Navbar/Navbar"
import Image from "next/image"
import "./globals.css"
import Link from "next/link"
import Product from "@/Components/Product/Product"
import Products3 from "../Components/Products3/Products3"
import Footer from "@/Components/Footer/Footer"
import Products2 from "@/Components/Products2/Products2"
import Products4 from "@/Components/Products4/Products4"

export default function Home() {
  // Get the current date
  const currentDate = new Date()

  // Extract the year from the current date
  const currentYear = currentDate.getFullYear()

  // Display the current year
  // console.log("The current year is:", currentYear)

  let str = currentYear.toString()
  let newStr = str.replace(/^.{2}/, "'")
  // console.log(newStr) 

  return (
    <div className="home__container">
      <div className="home__container-hero">
        <Navbar home={true} />
        <div className="home__container-shop">
          <h2>Oceansteeze {newStr}</h2>
          <button><Link href="/shop">shop now</Link></button>
        </div>
      </div>
      <div className="home__container-section2">
        <h1>New Drops</h1>
        
        <div className="home__container-section2_bottom">
          <Products4 />
        </div>
      </div>

      <div className="home__container-section3">
        <button><Link href="/shop">shop now</Link></button>
      </div>

      <div className="home__container-section2">
        <h1>Best Sellers</h1>
        <div className="home__container-section2_bottom">
          <Products4 />
        </div>
      </div>

      <div className="home__container-footer">
        <Footer />
      </div>
    </div>
  )
}
