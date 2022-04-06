import { Skeleton } from "@mui/material"
import Pagination from "@mui/material/Pagination"
import axios from "axios"
import Loader from "components/tools/Loader"
import PropTypes from "prop-types"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { publicRequest } from "requestMethods"
import styled from "styled-components"
import { getTotalQuantity } from "components/tools/utils"
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
const Products = ({ category }) => {
  const [products, setProducts] = useState([])
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
  const [searching, setSearching] = useState(false)
  const skeletonGenerator = (length = 0) =>
    Array.from(
      // @ts-ignore
      { length },
      () => (
        <SkeletonContainer key={Math.random() + Date.now()}>
          <Skeleton
            sx={{ transform: "scale(1,1)", borderRadius: 0 }}
            width={196}
            height={263}
          />
        </SkeletonContainer>
      )
    )
  const productsSkeleton = useRef(
    skeletonGenerator(category ? location.state?.skeletonLength : 8)
  )
  useLayoutEffect(() => {
    publicRequest
      .get(`products?category=${category}&count=true`)
      .then(({ data }) => {
        const productsperPage = 15
        setCount(Math.ceil(data / productsperPage))
      })
      .catch(console.error)
  }, [category])
  const { t } = useTranslation()
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    if (isMounted.current) {
      ;(async () => {
        if (!location.state?.skeletonLength && category) {
          setLoading(false)
          setSearching(false)
          setProducts([])
          return
        }
        productsSkeleton.current = skeletonGenerator(
          location.state?.skeletonLength
        )
        setLoading(true)
        setSearching(false)
        try {
          // @ts-ignore
          const { data } = await axios.get(
            category
              ? `${
                  process.env.REACT_APP_BASE_URL
                }/api/products?category=${category}&page=${page - 1}`
              : `${process.env.REACT_APP_BASE_URL}/api/products`
          )
          if (category) {
            setProducts(
              data.map((product) =>
                getTotalQuantity(product.colors) ? (
                  // eslint-disable-next-line no-underscore-dangle
                  <Product product={product} key={product._id} />
                ) : null
              )
            )
          } else
            setProducts(
              data.slice(0, 8).map((product) =>
                getTotalQuantity(product.colors) ? (
                  <Product
                    product={product}
                    // eslint-disable-next-line no-underscore-dangle
                    key={product._id}
                  />
                ) : null
              )
            )
        } catch (error) {
          console.error(error)
        }
        setLoading(false)
      })()
    }
    return () => {
      isMounted.current = false
    }
  }, [category, location, page])
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

  /* 
    category ? (
          products
        ) : (
          <EmptyProduct>{t("products.categories.notFound")}</EmptyProduct>
        )}
  */
  if (loading)
    return (
      <Container>
        <ProductContainer>
          {productsSkeleton.current.length ? (
            productsSkeleton.current
          ) : (
            <EmptyProduct>{t("products.categories.notFound")}</EmptyProduct>
          )}
        </ProductContainer>
      </Container>
    )

  return (
    <Container>
      {searching && category ? <Loader /> : null}
      <ProductContainer>
        {products.length ? (
          products
        ) : (
          <EmptyProduct>{t("products.categories.notFound")}</EmptyProduct>
        )}
      </ProductContainer>
      {category ? (
        <PaginationContainer>
          <Pagination
            count={count}
            page={page}
            onChange={(_, value) => {
              setPage(value)
              setSearching(true)
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
