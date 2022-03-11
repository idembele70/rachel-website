import Categories from "components/home/categories"
import Products from "components/home/products"
import Announcement from "components/tools/Announcement"
import Footer from "components/tools/Footer"
import Navbar from "components/tools/Navbar"
import Newsletter from "components/tools/Newsletter"
import React from "react"

function Home() {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home
