// @ts-nocheck
import Announcement from "components/tools/Announcement"
import Footer from "components/tools/Footer"
import Navbar from "components/tools/Navbar"
import React, { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useLocation, useHistory } from "react-router-dom"
import { publicRequest, userRequest } from "requestMethods"
import { smallMobile } from "responsive"
import styled from "styled-components"
import { initializeCart } from "../redux/cartRedux"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1440px;
  margin: auto;
`
const OrderContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 16px;
  gap: 20px;
  ${smallMobile({ margin: 8, gap: "20px 0" })};
`
const Left = styled.div`
  flex-grow: 1;
`
const LeftTitle = styled.h2``
const ProductContainer = styled.div`
  margin: 18px 0;
`
const ProductRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e2dcdc;
`
const RowItemContainer = styled.div`
  display: flex;
  align-items: center;
`
const RowItem = styled.h3`
  padding: 5px;
  font-weight: ${(props) =>
    // @ts-ignore
    props.isName ? 100 : 600};
`

const AddressContainer = styled.div``
const AddressRow = styled.h3`
  font-style: italic;
  font-weight: 300;
  &:first-of-type {
    margin-top: 18px;
  }
`

const Right = styled.div`
  flex-grow: 0.66;
  box-shadow: 2px 2px #c0bebe;
  background-color: #f6f6f6;
  max-width: 350px;
  max-height: 220px;
  padding: 20px;
  ${smallMobile({
    flexGrow: 1,
    /* width: "calc(100% - 10px)", */
    padding: 5
  })}
`
const RightTitle = styled.h3`
  color: green;
  margin-bottom: 18px;
`
const RightList = styled.ul`
  ${smallMobile({ padding: 0, listStyleType: "none" })}
`
const RightListItem = styled.li``
const ItemTitle = styled.h3`
  display: ${(props) => props.id || "inline"};
  font-weight: ${(props) => (props.isBold === true ? 600 : "normal")};
  white-space: ${(props) => (props.isBold === true ? "wrap" : "initial")};
`
const ColorContainer = styled.div`
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid rgba(59, 75, 147, 0.8);
  background-color: ${(props) => props.color};
`
export default function Success() {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const [data, setData] = useState({
    cartProducts: [],
    stripeData: {
      billing_details: { address: "", name: "", email: "", phone: "" },
      payment_method_details: { card: "" },
      created: 0
    },
    ordersData: { _id: "", amount: 0, shippingPrice: 0 }
  })
  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? `0${s}` : s
    }
    const d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/")
  }
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
  useEffect(() => {
    if (!location.state) history.push({ pathname: "/" })
    else {
      dispatch(initializeCart())
      ;(async () => {
        const { stripeId } = location.state.ordersData
        try {
          const { data: stripeData } = await publicRequest.get(
            `/checkout/payment/intents/${stripeId}`
          )

          setData({
            ...location.state,
            stripeData:
              stripeData.charges
                .data[0] /* eslint-disable-line react/jsx-props-no-spreading */
          })
        } catch (error) {
          console.error(error)
        }
      })()
    }
  }, [dispatch, history, location])
  const {
    stripeData: {
      billing_details: { address, name, email, phone },
      payment_method_details: { card },
      created
    },
    ordersData: { _id: id, amount, shippingPrice },
    cartProducts
  } = data
  const { t } = useTranslation()
  return (
    <Container>
      <Navbar />
      <Announcement />
      <OrderContainer>
        <Left>
          <LeftTitle>{t("success.left.ordersDetails")}</LeftTitle>
          <ProductContainer>
            <ProductRow>
              <RowItem>{t("success.left.product")}</RowItem>
              <RowItem>{t("success.left.total")}</RowItem>
            </ProductRow>
            {cartProducts.map((product) => (
              <ProductRow key={product.size + product.color + product.name}>
                <RowItemContainer>
                  <RowItem isName>
                    {product.title} {` X${product.qte}`} {"-" && product?.size}
                  </RowItem>
                  <ColorContainer color={product.color} />
                </RowItemContainer>
                <RowItem>{product.qte * product.price + t("currency")}</RowItem>
              </ProductRow>
            ))}
            <ProductRow>
              <RowItem>{t("success.left.subTotal")}</RowItem>
              <RowItem>{`${amount}${t("currency")}`}</RowItem>
            </ProductRow>
            <ProductRow>
              <RowItem>{t("success.left.paymentMethod")}</RowItem>
              <RowItem>{card.brand}</RowItem>
            </ProductRow>
            <ProductRow>
              <RowItem>{t("success.left.shippingFee")}</RowItem>
              <RowItem>{shippingPrice + t("currency")}</RowItem>
            </ProductRow>
            <ProductRow>
              <RowItem>{t("success.left.total")}</RowItem>
              <RowItem>{`${amount + shippingPrice}${t("currency")}`}</RowItem>
            </ProductRow>
          </ProductContainer>
          <AddressContainer>
            <LeftTitle>{t("success.left.billingAddress")}</LeftTitle>
            <AddressRow>{name}</AddressRow>
            <AddressRow>{address.line1}</AddressRow>
            <AddressRow>{`${address.postal_code}, ${address.city}, ${
              countries.find((c) => c.code === address.country)?.country
            }`}</AddressRow>
            <AddressRow>{email}</AddressRow>
            <AddressRow>{phone}</AddressRow>
          </AddressContainer>
        </Left>
        <Right>
          <RightTitle>{t("success.right.title")}</RightTitle>
          <RightList>
            <RightListItem>
              <ItemTitle>{t("success.right.orderNumber")}&nbsp;</ItemTitle>
              <ItemTitle isBold id="block">
                {id}
              </ItemTitle>
            </RightListItem>
            <RightListItem>
              <ItemTitle>{t("success.right.date")}&nbsp;</ItemTitle>
              <ItemTitle isBold>{convertDate(created * 1000)}</ItemTitle>
            </RightListItem>
            <RightListItem>
              <ItemTitle>{t("success.right.email")}&nbsp;</ItemTitle>
              <ItemTitle isBold>{email}</ItemTitle>
            </RightListItem>
            <RightListItem>
              <ItemTitle>{t("success.right.total")}&nbsp;</ItemTitle>
              <ItemTitle isBold>
                {amount + shippingPrice + t("currency")}
              </ItemTitle>
            </RightListItem>
          </RightList>
        </Right>
      </OrderContainer>
      <Footer />
    </Container>
  )
}
