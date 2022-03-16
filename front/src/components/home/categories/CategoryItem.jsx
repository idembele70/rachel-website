import { CircularProgress } from "@mui/material"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { publicRequest } from "requestMethods"
import { mobile, tablet } from "responsive"
import styled from "styled-components"

const Container = styled.div`
  width: calc(50vw - 30px);
  max-width: 690px;
  height: calc(((50vw - 30px) / (2 / 3)) - 100px);
  max-height: calc((690px / (2 / 3)) - 100px);
  ${mobile({
    width: "calc(100vw - 30px)",
    height: "calc((100vw - 30px) / (2 / 3))"
  })}
  background-color: rgba(0, 0, 0, 0.2);
  margin: 5px;
  padding: 10px;
  position: relative;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  display: flex;
  align-items: center;
  justify-content: center;
`
const Image = styled.img`
  height: 100%;
  max-width: 100%;
  object-fit: contain;
  transition: all 150ms;
`
const Info = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })};
`
const Button = styled.button`
  background-color: white;
  border: none;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  padding: 10px;
`
const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
`
const CategoryItem = ({ itemInfo, onSearch }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const { img, name } = itemInfo
  const handleRedirect = (e) => {
    onSearch(true)
    ;(async () => {
      const { data: dataLength } = await publicRequest.get(
        `/products?count=true&category=${name}`
      )
      const skeletonLength = dataLength <= 15 ? dataLength : 15
      history.push({
        pathname: `/products/${name}`,
        state: { skeletonLength }
      })
      onSearch(false)
    })()
  }
  return (
    <Container>
      <Image src={img} alt={name} />
      <Info>
        <Title>{name.toUpperCase()}</Title>
        <Button onClick={handleRedirect}>
          {t(`products.categories.button`)}
        </Button>
      </Info>
    </Container>
  )
}

CategoryItem.propTypes = {
  itemInfo: PropTypes.shape({
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onSearch: PropTypes.func.isRequired
}
export default CategoryItem
