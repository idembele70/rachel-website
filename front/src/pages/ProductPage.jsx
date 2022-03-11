import { Add, Remove } from "@mui/icons-material"
import { Skeleton } from "@mui/material"
import Announcement from "components/tools/Announcement"
import Footer from "components/tools/Footer"
import Navbar from "components/tools/Navbar"
import Newsletter from "components/tools/Newsletter"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { addProduct, updateProduct } from "redux/cartRedux"
import { publicRequest } from "requestMethods"
import { mobile, tablet } from "responsive"
import styled from "styled-components"
import Modal from "../components/tools/Modal"

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`
const Wrapper = styled.div`
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  ${mobile({ padding: 10, flexDirection: "column" })};
`

const ImageContainer = styled.div`
  flex: 1;
  margin: 10px 25px;
  min-width: 567px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  ${tablet({ flex: 1 })}
  ${mobile({ minWidth: "auto", margin: 10 })};
`

const Image = styled.img`
  object-fit: contain;
  height: 80vh;
  max-height: 850px;
  ${tablet({ maxHeight: "50vh" })};
  ${mobile({ maxHeight: "40vh" })};
`
const ImageSkeleton = styled(Skeleton)`
  && {
    transform: scale(1);
    width: 567px;
    height: 80vh;
    border-radius: 0;
  }
  max-width: calc(80vh * 567 / 850);
  max-height: 850px;
  ${tablet({ maxWidth: "calc(50vh * 567/850)", maxHeight: "50vh" })};
  ${mobile({ maxWidth: "calc(40vh * 567/850)", maxHeight: "40vh" })};
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 10px 25px;
  ${mobile({ padding: 10 })};
`

const Title = styled.h1`
  font-weight: 200;
  display: inline;
`
const TitleSkeleton = styled(Skeleton)`
  && {
    height: 38px;
    width: 146.25px;
    transform: scale(1);
  }
`

const Description = styled.p`
  margin: 20px 0;
`
const DescriptionSkeleton = styled(Skeleton)`
  && {
    width: 100%;
    max-width: 329px;
    height: 38px;
    transform: scale(1);
    margin: 20px 0;
  }
`
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`
const PriceSkeleton = styled(Skeleton)`
  && {
    height: 48px;
    width: 76.5px;
    transform: scale(1);
  }
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 30px 0;
  ${mobile({ width: "100%" })};
`
const Filter = styled.div`
  display: flex;
  align-items: center;
`
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: ${(props) =>
      // @ts-ignore
      props.isSelected ? "3px" : "1px"}
    solid rgba(59, 75, 147, 0.8);
  background-color: ${(props) =>
    // eslint-disable-next-line react/prop-types
    props.color};
  margin: 0 5px;
  cursor: pointer;
`
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`
const FilterSkeleton = styled(Skeleton)`
  && {
    transform: scale(1);
    width: 270px;
    height: 30px;
    margin: 30px 0;
    ${mobile({ width: "100%" })}
  }
`
const FilterSizeOption = styled.option``
const AddContainer = styled.div`
  max-width: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })};
`
const AddSkeleton = styled(Skeleton)`
  && {
    margin-top: 30px;
    max-width: 250px;
    height: 66px;
    transform: scale(1);
  }
`
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-right: 10px;
`
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`
export default function ProductPage() {
  const { t } = useTranslation()

  const [product, setProduct] = useState({
    price: Number(),
    title: String(),
    description: String(),
    img: String(),
    sizes: [],
    colors: [],
    weight: String()
  })
  const [loading, setLoading] = useState(true)
  const id = useLocation().pathname.split("/")[2]
  const [qte, setQte] = useState(1)
  const [color, setColor] = useState(null)
  const [size, setSize] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    publicRequest
      .get(`/products/find/${id}`)
      .then((res) => {
        setProduct(res.data)
        setColor(res.data.colors[0])
        setSize(res.data.sizes[0])
        setLoading(false)
      })
      .catch(console.error)
  }, [id])
  const { price, title, description, img, sizes, colors } = product
  const handleQuantity = (direction = String()) => {
    if (direction === "dec") {
      if (qte > 1) setQte(qte > 1 && qte - 1)
    } else setQte(qte + 1)
  }
  // @ts-ignore
  const { products } = useSelector((state) => state.cart)
  const [openModal, setOpenModal] = useState(false)
  const handleAddToCart = () => {
    setOpenModal(true)
    setTimeout(() => {
      setOpenModal(false)
    }, 2000)
    const exist = products.find(
      ({ _id, size: sizeFound, color: colorFound }) =>
        _id === id && sizeFound === size && colorFound === color
    )
    if (exist) {
      dispatch(updateProduct({ id, qte, price: price * qte, size, color }))
      setQte(1)
    } else {
      dispatch(
        addProduct({
          ...product,
          price,
          qte,
          color,
          size
        })
      )
      setQte(1)
    }
  }
  /* if (loading)
    return (
      <Container>
        <Wrapper>
          <ImageContainer />
          <InfoContainer>
            <DescriptionSkeleton />
            <PriceSkeleton />
            <FilterSkeleton />
            <AddSkeleton />
          </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
      </Container>
    ) */

  return (
    <Container>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          {t("products.ModalMessage")}
        </Modal>
      )}
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImageContainer>
          {loading ? <ImageSkeleton /> : <Image src={img} alt={title} />}
        </ImageContainer>
        <InfoContainer>
          {loading ? <TitleSkeleton /> : <Title>{title}</Title>}
          {loading ? (
            <DescriptionSkeleton />
          ) : (
            <Description>{description}</Description>
          )}
          {loading ? (
            <PriceSkeleton />
          ) : (
            <Price>
              {price}
              {t(`products.currency`)}
            </Price>
          )}
          {loading ? (
            <FilterSkeleton />
          ) : (
            <FilterContainer>
              <Filter>
                <FilterTitle>{t("products.filter.title.color")}</FilterTitle>
                {colors?.map((c) => (
                  <FilterColor
                    // @ts-ignore
                    isSelected={c === color}
                    onClick={() => setColor(c)}
                    color={c}
                    key={c}
                  />
                ))}
              </Filter>
              {(sizes.length && !sizes.includes("") && (
                <Filter>
                  <FilterTitle>{t("products.filter.sizes.size")}</FilterTitle>
                  <FilterSize
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {sizes?.map((s) => (
                      <FilterSizeOption key={s}>{s}</FilterSizeOption>
                    ))}
                  </FilterSize>
                </Filter>
              )) ||
                null}
            </FilterContainer>
          )}
          {loading ? (
            <AddSkeleton />
          ) : (
            <AddContainer>
              <AmountContainer>
                <Remove onClick={() => handleQuantity("dec")} />
                <Amount>{qte}</Amount>
                <Add onClick={() => handleQuantity("inc")} />
              </AmountContainer>
              <Button onClick={handleAddToCart}>
                {t("products.addToCard")}
              </Button>
            </AddContainer>
          )}
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  )
}
