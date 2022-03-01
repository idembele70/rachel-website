import PropTypes from "prop-types"
import React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { mobile } from "responsive"
import styled from "styled-components"

const Container = styled.div`
  min-width: calc(50% - 30px);
  ${mobile({ minWidth: "calc(100% - 30px)", height: "auto" })};
  height: 70vh;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 5px;
  padding: 10px;
  position: relative;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`
const Image = styled.img`
  height: 100%;
  object-fit: contain;
  width: 100%;
  ${mobile({ maxHeight: "90vh" })};
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
  const { img, name } = itemInfo

  return (
    <Container>
      <Link to={`/products/${name}`}>
        <Image src={img} alt={name} />
        <Info>
          <Title>{name.toUpperCase()}</Title>
          <Button>{t(`products.categories.button`)} </Button>
        </Info>
      </Link>
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
