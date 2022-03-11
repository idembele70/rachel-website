import PropTypes from "prop-types"
import React from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
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

const CategoryItem = ({ itemInfo }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const { img, name } = itemInfo
  return (
    <Container>
      <Image
        onClick={() => history.push(`/products/${name}`)}
        src={img}
        alt={name}
      />
      <Info>
        <Title>{name.toUpperCase()}</Title>
        <Button>{t(`products.categories.button`)} </Button>
      </Info>
    </Container>
  )
}

CategoryItem.propTypes = {
  itemInfo: PropTypes.shape({
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}
export default CategoryItem
