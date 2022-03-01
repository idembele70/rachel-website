import Pagination from "@mui/material/Pagination"
import axios from "axios"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import Product from "./Product"

const Container = styled.div`
  display: flex;
  padding: 20px;
  max-width: 1440px;
  flex-direction: column;
  margin: auto;
`
const ProductContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const PaginationContainer = styled.div`
  flex-grow: 32px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`
const EmptyProduct = styled.h2``

const Products = ({ category }) => {
  const [products, setProducts] = useState([])
  const [Allproducts, setAllProducts] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  
  /* const [filteredProducts, setFilteredProducts] = useState([])
  function sortProducts({ value = "newest", arr = [] }) {
    switch (value) {
      case "asc":
        return arr.sort((a, b) => a.price - b.price)
      case "desc":
        return arr.sort((a, b) => b.price - a.price)
      default:
        return arr.sort(
          (a, b) =>
            // @ts-ignore
            new Date(b.createdAt) - new Date(a.createdAt)
        )
    }
  } */

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          category
            ? `http://localhost:5000/api/products?category=${category}`
            : "http://localhost:5000/api/products"
        )
        if (category) {
          const productsSearched = data.filter(
            (product) => product.categories.length
          )
          setAllProducts(productsSearched)
          setCount(Math.ceil(productsSearched.length / 15))
        } else setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }
    getProducts()
  }, [category])
  useEffect(() => {
    const currentCount = (page - 1) * 15
    setProducts(Allproducts.slice(currentCount, currentCount + 15))
  }, [page, Allproducts])
  /* useEffect(() => {
    if ((category && filters.colors !== "none") || filters.sizes !== "size") {
      const filtered = products.filter((item) =>
        Object.entries(filters).find(([key, value]) =>
          item[key].includes(value)
        )
      )
      setFilteredProducts(sortProducts({ value: sort, arr: filtered }))
    } else setFilteredProducts(sortProducts({ value: sort, arr: products }))
  }, [category, products, sort]) */

  const { t } = useTranslation()
  const productsRender = products.length ? (
    products.map((product) => <Product product={product} key={product.title} />)
  ) : (
    <EmptyProduct>{t("products.categories.notFound")}</EmptyProduct>
  )
  return (
    <Container>
      <ProductContainer>
        {category
          ? productsRender
          : products
              .slice(0, 8)
              .map((product) => (
                <Product product={product} key={product.title} />
              ))}
      </ProductContainer>
      <PaginationContainer>
        <Pagination
          count={count}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </PaginationContainer>
    </Container>
  )
}
Products.propTypes = {
  category: PropTypes.string
}
Products.defaultProps = {
  category: null
}
export default Products
