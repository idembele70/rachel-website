/* eslint-disable react/prop-types */
// @ts-nocheck
import { Add, Delete, Remove } from "@mui/icons-material"
import { Skeleton } from "@mui/material"
import Announcement from "components/tools/Announcement"
import Footer from "components/tools/Footer"
import Loader from "components/tools/Loader"
import Modal from "components/tools/Modal"
import Navbar from "components/tools/Navbar"
import React, { Fragment, useEffect, useMemo, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { mobile, tablet } from "responsive"
import styled from "styled-components"
import { deleteProduct, updateProduct } from "../redux/cartRedux"

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
const Wrapper = styled.div`
  flex: 1;
  min-height: 320px;
  padding: 20px;
  ${mobile({ padding: 10 })};
  position: relative;
`
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${tablet({ padding: "20px 10px" })}
  ${mobile({})}
`
const TopButton = styled.div`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({ textAlign: "center" })};
`
const TopTexts = styled.div`
  ${mobile({ display: "none" })};
`
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
  ${tablet({ margin: "0 5px" })};
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column", alignItems: "center" })};
`
const Info = styled.div`
  flex: 3;
  margin: 0 5px;
`
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ width: "90vw" })};
  ${mobile({ flexDirection: "column" })};
  position: relative;
  border: 1px solid lightgray;
  padding: 5px;
  margin: 5px 0;
`
const EmptyCartContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  ${tablet({ margin: "20px 0" })}
`
const EmptyCartTitle = styled.h2`
  ${mobile({ fontSize: 20 })}
`

const StyledDelete = styled(Delete)`
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 0;
`
const DeleteSkeleton = styled(Skeleton)`
  && {
    position: absolute;
    right: 5px;
    top: 3px;
    height: 18px;
    width: 14px;
    transform: scale(1);
  }
`
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Image = styled.img`
  height: 250px;
  object-fit: contain;
  aspect-ratio: 567/850;
`
const ImageSkeleton = styled(Skeleton)`
  && {
    transform: scale(1);
    height: 250px;
    width: 175.56px;
  }
`
const Details = styled.div`
  padding: 20px;
  max-width: 311px;
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const DetailSkeleton = styled(Skeleton)`
  && {
    transform: scale(1);
    width: 100%;
    height: 19px;
    &:not(:last-of-type) {
      margin-bottom: 1px;
    }
  }
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColorContainer = styled.div`
  display: flex;
`
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid lightgray;
  margin-left: 5px;
`
const ProductSize = styled.span``
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const AmountContainerSkeleton = styled(Skeleton)`
  && {
    width: 84px;
    height: 39px;
    transform: scale(1);
    margin-bottom: 20px;
  }
`
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })};
`
const QuantityButton = styled(({ component, ...props }) =>
  React.cloneElement(component, props)
)`
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`
const ProductPrice = styled.div`
  ${mobile({ marginBottom: 20 })};
  font-size: 30px;
  font-weight: 200;
`
const PriceSkeleton = styled(Skeleton)`
  && {
    transform: scale(1);
    width: 50px;
    height: 36px;
    margin-bottom: 20px;
  }
`
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  min-height: 314px;
  min-width: 275px;
  max-width: 365px;
  max-height: 375px;
  ${tablet({ width: "100%" })};
  ${mobile({ padding: 5, minWidth: "95vw", maxHeight: "none" })};
`
const SummaryTitle = styled.h1`
  font-weight: 200;
  ${mobile({ textAlign: "center" })};
`
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && 500};
  font-size: ${(props) => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const SummarySelect = styled.select``
const SummaryOption = styled.option``
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`
const SummaryShippingText = styled.span`
  text-align: center;
  flex: 1;
`
const ShippingText = styled.div`
  color: red;
`
const EmailText = styled.h4`
  color: black;
`
const ModalEmail = styled.h3`
  font-size: 14px;
`

export default function Cart() {
  const {
    cart: { products, quantity: cartQte, total },
    user: { currentUser }
  } = useSelector((state) => state)
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const skeleton = useRef(
    Array(cartQte)
      .fill("")
      .map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={idx}>
          <Product>
            <DeleteSkeleton />
            <ProductDetail>
              <ImageSkeleton />
              <Details>
                <DetailSkeleton />
                <DetailSkeleton />
                <DetailSkeleton />
                <DetailSkeleton />
              </Details>
            </ProductDetail>
            <PriceDetail>
              <AmountContainerSkeleton />
              <PriceSkeleton />
            </PriceDetail>
          </Product>
        </Fragment>
      ))
  )
  const [loading, setLoading] = useState(true)
  const handleDelete = (data) => {
    dispatch(deleteProduct(data))
  }
  const isDisconnected = Object.keys(currentUser).length === 0
  const [countryCode, setCountryCode] = useState("FR")
  const countries = useMemo(
    () => [
      { country: "Argentina", code: "AR" },
      { country: "Australia", code: "AU" },
      { country: "Austria", code: "AT" },
      { country: "Belgium", code: "BE" },
      { country: "Bolivia", code: "BO" },
      { country: "Brazil", code: "BR" },
      { country: "Bulgaria", code: "BG" },
      { country: "Canada", code: "CA" },
      { country: "Chile", code: "CL" },
      { country: "Colombia", code: "CO" },
      { country: "Costa Rica", code: "CR" },
      { country: "Croatia", code: "HR" },
      { country: "Cyprus", code: "CY" },
      { country: "Czech Republic", code: "CZ" },
      { country: "Denmark", code: "DK" },
      { country: "Dominican Republic", code: "DO" },
      { country: "Egypt", code: "EG" },
      { country: "Estonia", code: "EE" },
      { country: "Finland", code: "FI" },
      { country: "France", code: "FR" },
      { country: "Germany", code: "DE" },
      { country: "Greece", code: "GR" },
      { country: "Hong Kong SAR China", code: "HK" },
      { country: "Hungary", code: "HU" },
      { country: "Iceland", code: "IS" },
      { country: "India", code: "IN" },
      { country: "Indonesia", code: "ID" },
      { country: "Ireland", code: "IE" },
      { country: "Israel", code: "IL" },
      { country: "Italy", code: "IT" },
      { country: "Japan", code: "JP" },
      { country: "Latvia", code: "LV" },
      { country: "Liechtenstein", code: "LI" },
      { country: "Lithuania", code: "LT" },
      { country: "Luxembourg", code: "LU" },
      { country: "Malta", code: "MT" },
      { country: "Mexico ", code: "MX" },
      { country: "Netherlands", code: "NL" },
      { country: "New Zealand", code: "NZ" },
      { country: "Norway", code: "NO" },
      { country: "Paraguay", code: "PY" },
      { country: "Peru", code: "PE" },
      { country: "Poland", code: "PL" },
      { country: "Portugal", code: "PT" },
      { country: "Romania", code: "RO" },
      { country: "Singapore", code: "SG" },
      { country: "Slovakia", code: "SK" },
      { country: "Slovenia", code: "SI" },
      { country: "Spain", code: "ES" },
      { country: "Sweden", code: "SE" },
      { country: "Switzerland", code: "CH" },
      { country: "Thailand", code: "TH" },
      { country: "Trinidad & Tobago", code: "TT" },
      { country: "United Arab Emirates", code: "AE" },
      { country: "United Kingdom", code: "GB" },
      { country: "United States", code: "US" },
      { country: "Uruguay", code: "UY" }
    ],
    []
  )
  const [shippingPrice, setShippingPrice] = useState(0)
  const FranceTarif = useMemo(
    () => [
      { weight: 250, price: 4.95 },
      { weight: 500, price: 6.55 },
      { weight: 750, price: 7.45 },
      { weight: 1000, price: 8.1 },
      { weight: 2000, price: 9.35 },
      { weight: 5000, price: 14.35 },
      { weight: 10000, price: 20.85 },
      { weight: 15000, price: 26.4 },
      { weight: 30000, price: 32.7 }
    ],
    []
  )
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    if (isMounted.current) {
      if (["FR"].includes(countryCode) && total < 100) {
        const weight = products.reduce(
          (somme, product) => somme + +product.weight * product.qte,
          0
        )
        const price = FranceTarif.find((tarif) => tarif.weight > weight)?.price
        if (price) setShippingPrice(Math.ceil(price))
        else setShippingPrice(0)
      } else if (total >= 100 && ["FR"].includes(countryCode))
        setShippingPrice(-1)
      else setShippingPrice(0)
      setLoading(false)
    }
    return () => {
      isMounted.current = false
    }
  }, [countryCode, products, FranceTarif, total])

  const [modal, setModal] = useState(false)

  const handlePay = () => {
    if (isDisconnected)
      history.push({
        pathname: "/login",
        state: { ...history.location }
      })
    else if (shippingPrice === 0) setModal(true)
    else history.push({ pathname: "/pay", state: { shippingPrice } })
  }

  const [copy, setCopy] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(t("email"))
    setCopy(true)
  }
  const closeModal = () => {
    setModal(false)
    setCopy(true)
  }
  return (
    <Container>
      {loading && <Loader />}
      {modal && (
        <Modal
          title={t("cart.modal.title")}
          onClose={closeModal}
          onCopy={handleCopy}
          copy={copy}
          canCopy
        >
          <ModalEmail>{t("email")}</ModalEmail>
        </Modal>
      )}
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>{t(`cart.title`)}</Title>
        {products?.length ? (
          <>
            <Top>
              <TopButton onClick={() => history.push("/")}>
                {t("cart.continueShop")}
              </TopButton>
              <TopTexts>
                <TopText>
                  {t("cart.topTexts.bag")}({cartQte})
                </TopText>
                {/* <TopText>{t("cart.topTexts.whislist")}(0)</TopText> */}
              </TopTexts>
              <TopButton
                onClick={() => (shippingPrice ? handlePay() : setModal(true))}
                type="filled"
              >
                {t("cart.checkout")}
              </TopButton>
            </Top>
            <Bottom>
              <Info>
                {(loading && skeleton.current) ||
                  products?.map((product) => {
                    const { img, title, id, color, size, qte, price, maxQte } =
                      product
                    return (
                      <Fragment key={id + size + color}>
                        <Product>
                          <StyledDelete
                            onClick={() =>
                              handleDelete({
                                id,
                                totalPrice: price * qte,
                                size,
                                color
                              })
                            }
                          />
                          <ProductDetail>
                            <Image src={img} alt={title} />
                            <Details>
                              <ProductName>
                                <b>{t("products.cart.product")}: </b>
                                {title}
                              </ProductName>
                              <ProductId>
                                <b>{t("products.cart.productId")}: </b>
                                {id}
                              </ProductId>
                              <ProductColorContainer>
                                <b>{t("products.cart.color")}: </b>
                                <ProductColor color={color} />
                              </ProductColorContainer>
                              {(size?.length && size?.includes("") && (
                                <ProductSize>
                                  <b>{t("products.cart.productSize")}: </b>
                                  {size}
                                </ProductSize>
                              )) ||
                                ""}
                            </Details>
                          </ProductDetail>
                          <PriceDetail>
                            <ProductAmountContainer>
                              <QuantityButton
                                component={<Add />}
                                onClick={() =>
                                  qte < maxQte
                                    ? dispatch(
                                        updateProduct({
                                          id,
                                          qte: 1,
                                          price,
                                          size,
                                          color
                                        })
                                      )
                                    : null
                                }
                              />
                              <ProductAmount>{qte}</ProductAmount>
                              <QuantityButton
                                component={<Remove />}
                                onClick={() => {
                                  if (qte > 1)
                                    dispatch(
                                      updateProduct({
                                        id,
                                        qte: -1,
                                        price,
                                        size,
                                        color
                                      })
                                    )
                                }}
                              />
                            </ProductAmountContainer>
                            <ProductPrice>
                              {price * qte}
                              {t("products.currency")}
                            </ProductPrice>
                          </PriceDetail>
                        </Product>
                      </Fragment>
                    )
                  })}
              </Info>
              <Summary>
                <SummaryTitle>{t("cart.title")}</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>
                    {t("cart.orderSummary.subtotal")}
                  </SummaryItemText>
                  <SummaryItemPrice>
                    {total}
                    {t("products.currency")}
                  </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>
                    {t("cart.orderSummary.destinationCountry")}
                  </SummaryItemText>
                  <SummarySelect
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    {countries.map(({ country: ctry, code }) => (
                      <SummaryOption key={code} value={code}>
                        {ctry}
                      </SummaryOption>
                    ))}
                  </SummarySelect>
                </SummaryItem>
                {shippingPrice !== 0 ? (
                  <SummaryItem>
                    <SummaryItemText>
                      {t("cart.orderSummary.shippingPrice")}
                    </SummaryItemText>
                    <SummaryItemPrice>
                      {shippingPrice > 0 ? shippingPrice + t("products.currency") : t("cart.freeShipping")}
                    </SummaryItemPrice>
                  </SummaryItem>
                ) : (
                  <SummaryItem>
                    <SummaryShippingText>
                      <ShippingText>
                        {t("cart.orderSummary.cantShip")}&nbsp;
                      </ShippingText>
                      <EmailText>{t("email")}</EmailText>
                    </SummaryShippingText>
                  </SummaryItem>
                )}
                <SummaryItem type="total">
                  <SummaryItemText>
                    {t("cart.orderSummary.total")}
                  </SummaryItemText>
                  <SummaryItemPrice>
                    {total + (shippingPrice <= 0 ? 0 : shippingPrice)}
                    {t("products.currency")}
                  </SummaryItemPrice>
                </SummaryItem>
                <Button
                  onClick={() => (shippingPrice ? handlePay() : setModal(true))}
                >
                  {t("cart.checkout")}
                </Button>
              </Summary>
            </Bottom>
          </>
        ) : (
          <EmptyCartContainer>
            <EmptyCartTitle>{t("cart.empty")}</EmptyCartTitle>
          </EmptyCartContainer>
        )}
      </Wrapper>
      <Footer />
    </Container>
  )
}
