/* eslint-disable react/prop-types */
// @ts-nocheck
import { Add, Delete, Remove } from "@mui/icons-material"
import Announcement from "components/tools/Announcement"
import Footer from "components/tools/Footer"
import Navbar from "components/tools/Navbar"
import React, { Fragment, useEffect, useMemo, useState } from "react"
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
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Image = styled.img`
  width: 200px;
  min-height: 200px;
`
const Details = styled.div`
  padding: 20px;
  max-width: 311px;
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  min-height: 314px;
  min-width: 275px;
  max-width: 365px;
  ${tablet({ width: "100%" })};
  ${mobile({ padding: 5, minWidth: "95vw" })};
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
const ModalContainer = styled.div`
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 1;
  background-color: #00000047;
  padding-top: 10%;
  display: flex;
  justify-content: center;
  ${mobile({ paddingTop: "20%" })}
`
const Modal = styled.div`
  max-width: 700px;
  width: 90vw;
  height: 50vh;
  max-height: 225px;
  background-color: #ffffff;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  padding: 40px;
  ${tablet({ width: "calc(90vw - 40px)", padding: 20 })};
  display: flex;
  flex-direction: column;
`
const ModalTitle = styled.h2`
  font-family: "IBM Plex Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  flex-grow: 33px;
  ${mobile({ fontSize: 16 })}
`
const ModalContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const ModalEmailContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ModalEmail = styled.h3`
  font-size: 14px;
`
const ModalButtonContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  ${mobile({ flexDirection: "column" })};
`
const ModalButton = styled.button`
  margin: 0 10px;
  padding: 16px 58px;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 6px;
  background-color: transparent;
  transition: all 500ms ease 50ms;
  cursor: pointer;
  &:hover {
    background-color: #222222;
    color: white;
  }
  ${mobile({ padding: "8px 29px", margin: "10px 0" })};
`
const Alert = styled.div`
  position: relative;
`
export default function Cart() {
  const {
    cart: { products, quantity: cartQte, total },
    user: { currentUser }
  } = useSelector((state) => state)
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
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
  useEffect(() => {
    if (["FR"].includes(countryCode)) {
      const weight = products.reduce(
        (somme, product) => somme + +product.weight * product.qte,
        0
      )
      const { price } = FranceTarif.find((tarif) => tarif.weight > weight)
      if (price) setShippingPrice(price)
      else setShippingPrice(0)
    } else setShippingPrice(0)
  }, [countryCode, products, FranceTarif])

  const [modal, setModal] = useState(false)

  const handlePay = () => {
    if (isDisconnected)
      history.push({
        pathname: "/register",
        state: { redirectTo: "cart" }
      })
    else if (!shippingPrice) setModal(true)
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
      {modal && (
        <ModalContainer>
          <Modal>
            <ModalTitle>{t("cart.modal.title")}</ModalTitle>
            <ModalContent>
              <ModalEmailContainer>
                <ModalEmail>{t("email")}</ModalEmail>
              </ModalEmailContainer>
              <ModalButtonContainer>
                <ModalButton onClick={closeModal}>
                  {t("cart.modal.cancel")}
                </ModalButton>
                <ModalButton onClick={handleCopy}>
                  {copy ? t("cart.modal.copied") : t("cart.modal.copy")}
                </ModalButton>
              </ModalButtonContainer>
            </ModalContent>
          </Modal>
        </ModalContainer>
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
                {products?.map((product) => {
                  const {
                    img,
                    title,
                    _id: id,
                    color,
                    size,
                    qte,
                    price
                  } = product
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
                              onClick={() => {
                                dispatch(
                                  updateProduct({
                                    id,
                                    qte: 1,
                                    price,
                                    size,
                                    color
                                  })
                                )
                              }}
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
                {shippingPrice ? (
                  <SummaryItem>
                    <SummaryItemText>
                      {t("cart.orderSummary.shippingPrice")}
                    </SummaryItemText>
                    <SummaryItemPrice>
                      {shippingPrice + t("products.currency")}
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
                    {total + shippingPrice}
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
