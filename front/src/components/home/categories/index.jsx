import React, { useEffect, useState } from "react"
import { publicRequest } from "requestMethods"
import { mobile } from "responsive"
import styled from "styled-components"
import CategoryItem from "./CategoryItem"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
  max-width: 1440px;
  margin: auto;
  & > div {
    min-width: 480px;
    min-height: 756px;
    ${mobile({ minWidth: "auto", minHeight: "unset" })};
  }
  ${mobile({ padding: 0, flexDirection: "column" })};
`

function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    publicRequest
      .get("/category")
      .then(({ data }) => setCategories(data))
      .catch((e) =>
        console.error(
          "Error while fetching categories in index of categories page",
          e
        )
      )
  }, [])

  return (
    <Container>
      {categories.map((category) => (
        <CategoryItem itemInfo={category} key={category._id} /> // eslint-disable-line no-underscore-dangle
      ))}
    </Container>
  )
}

export default Categories
