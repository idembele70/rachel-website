import { CircularProgress, Skeleton } from "@mui/material"
import Pagination from "@mui/material/Pagination"
import axios from "axios"
import PropTypes from "prop-types"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { useLocation } from "react-router-dom"
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
const SkeletonContainer = styled.div`
  align-items: center;
  background-color: #f5fbfd;
  display: flex;
  flex: 1;
  height: 350px;
  justify-content: center;
  margin: 5px;
  min-width: 280px;
  max-width: 400px;
  position: relative;
`
const ProgressContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
`
const Products = ({ category }) => {
  const [products, setProducts] = useState([])
  const [Allproducts, setAllProducts] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const location = useLocation()
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
  const [loading, setLoading] = useState(true)
  const skeletonLength = useRef(location.state?.skeletonLength)
  useEffect(() => {
    setLoading(true)
    const getProducts = async () => {
      let data = []
      try {
        // @ts-ignore
        if (!location.state?.data?.length) {
          const res = await axios.get(
            category
              ? `${process.env.REACT_APP_BASE_URL}/products?category=${category}`
              : `${process.env.REACT_APP_BASE_URL}/products`
          )
          data = res.data
        } else data = location.state?.data
        if (category) {
          setAllProducts(data)
          setCount(Math.ceil(data.length / 15))
        } else
          setProducts(
            data
              .slice(0, 8)
              .map((product) => (
                <Product product={product} key={product.title} />
              ))
          )
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    getProducts()
  }, [category, location])
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
  const skeletonGenerator = (length = Number()) =>
    Array.from({ length }, () => (
      <SkeletonContainer>
        <Skeleton
          sx={{ transform: "scale(1,1)", borderRadius: 0 }}
          width={196}
          height={263}
        />
      </SkeletonContainer>
    ))
  const progressSx = {
    color: "teal",
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 2
  }
  if (loading && (skeletonLength.current || !category))
    return (
      <Container>
        <ProductContainer>
          {category
            ? skeletonGenerator(skeletonLength.current)
            : skeletonGenerator(8)}
        </ProductContainer>
      </Container>
    )

  return (
    <Container>
      {loading && !skeletonLength && category ? (
        <ProgressContainer>
          <CircularProgress sx={progressSx} />
        </ProgressContainer>
      ) : null}
      <ProductContainer>
        {category ? productsRender : products}
      </ProductContainer>
      {category ? (
        <PaginationContainer>
          <Pagination
            count={count}
            page={page}
            onChange={(_, value) => {
              setPage(value)
              window.scrollTo(0, 0)
            }}
          />
        </PaginationContainer>
      ) : null}
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
