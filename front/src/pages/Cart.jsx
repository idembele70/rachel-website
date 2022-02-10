/* eslint-disable react/prop-types */
// @ts-nocheck
import { Add, Delete, Remove } from "@mui/icons-material"
import Announcement from "components/tools/Announcement"
import Footer from "components/tools/Footer"
import Navbar from "components/tools/Navbar"
import React, { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { mobile, tablet } from "responsive"
import styled from "styled-components"
import { deleteProduct, updateProduct } from "../redux/cartRedux"

const KEY = process.env.REACT_APP_STRIPE

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
  height: 314px;
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
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
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
  const handlePay = () => {
    if (isDisconnected)
      history.push({
        pathname: "/register",
        state: { redirectTo: "cart" }
      })
    else history.push("/pay")
  }
  return (
    <Container>
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
              <TopButton onClick={handlePay} type="filled">
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
                    {t("cart.orderSummary.shippingPrice")}
                  </SummaryItemText>
                  <SummaryItemPrice>
                    5.90{t("products.currency")}
                  </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>
                    {t("cart.orderSummary.shippingDiscount")}
                  </SummaryItemText>
                  <SummaryItemPrice>
                    -5.90{t("products.currency")}
                  </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>
                    {t("cart.orderSummary.total")}
                  </SummaryItemText>
                  <SummaryItemPrice>
                    {total}
                    {t("products.currency")}
                  </SummaryItemPrice>
                </SummaryItem>
                <Button onClick={handlePay}>{t("cart.checkout")}</Button>
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
