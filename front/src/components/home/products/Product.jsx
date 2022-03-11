import { SearchOutlined } from "@mui/icons-material"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Skeleton } from "@mui/material"

const Container = styled.div`
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
const Circle = styled.div`
  background-color: white;
  border-radius: 50%;
  height: 200px;
  position: absolute;
  width: 200px;
`
const Image = styled.img`
  height: 75%;
  max-width: 90%;
  z-index: 1;
  object-fit: cover;
`
const Info = styled.div`
  opacity: 0;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`
const Icon = styled.div`
  background-color: white;
  //borderradius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`

export default function Product(props) {
  const {
    product: { img, _id: id, title, sizes, colors }
  } = props
  // @ts-ignore
  const { products } = useSelector((state) => state.cart)
  /* const dispatch = useDispatch()
  const history = useHistory() */
  /*   const handleAddToCart = () => {
    if (sizes.length > 1 || colors.length > 1) {
      history.push(`/product/${id}`)
    } else {
      const exist = products?.find(({ _id }) => _id === id)
      if (exist) dispatch(updateProduct({ price: exist.price, id, qte: 1 }))
      else {
        const { product } = props
        dispatch(addProduct({ ...product, qte: 1 }))
      }
    }
  } */
  const [loading, setLoading] = useState(true)
  return (
    <Container>
      <Circle />
      {loading ? (
        <Skeleton
          sx={{ transform: "scale(1,1)", borderRadius: 0 }}
          width={196}
          height={263}
        />
      ) : null}
      <Image src={img} alt={title} onLoad={() => setLoading(false)} />
      <Info>
        {/* <Icon onClick={handleAddToCart}>
          <ShoppingCartOutlined />
        </Icon> */}
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/product/${id}`}
        >
          <Icon>
            <SearchOutlined />
          </Icon>
        </Link>
        {/* <Icon>
          <FavoriteBorderOutlined />
        </Icon> */}
      </Info>
    </Container>
  )
}

Product.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired
}
