import { Skeleton } from "@mui/material"
import Sidebar from "components/tools/Sidebar"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { publicRequest, userRequest } from "requestMethods"
import { smallMobile, tablet } from "responsive"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  ${tablet({ flexDirection: "column" })};
`
const OrderContainer = styled.div`
  flex: 4;
  max-width: 100vw;
  background-color: #fff;
  padding: 20px;
  ${smallMobile({ padding: 5 })};
`
const LeftTitle = styled.h2``
const ProductContainer = styled.div`
  margin: 18px 0; // doit etre enlever
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
const ColorContainer = styled.div`
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid rgba(59, 75, 147, 0.8);
  background-color: ${(props) => props.color};
`

export default function Order() {
  const [data, setData] = useState({
    stripeData: {
      billing_details: { address: {}, name: "", email: "", phone: "" },
      payment_method_details: { card: {} },
      created: 0
    },
    ordersData: { _id: "", amount: 0, products: [], shippingPrice: 0 }
  })
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
  // @ts-ignore
  const { _id: userId } = useSelector((state) => state.user.currentUser)
  const location = useLocation()
  const [, , , orderId] = location.pathname.split(/\//g)
  const [loading, setLoading] = useState(true)
  const productsSkeleton = useRef(
    [...Array(location.state?.productsLength)].map(() => (
      <Skeleton width="100%" height={34} />
    ))
  )
  const addressSkeleton = useRef(
    [...Array(5)].map(() => <Skeleton width="100%" height={23} />)
  )

  useEffect(() => {
    ;(async () => {
      try {
        const { data: ordersData } = await userRequest.get(
          `orders/find/${userId}/${orderId}`
        )
        const { data: stripeData } = await publicRequest.get(
          `/checkout/payment/intents/${ordersData.stripeId}`
        )
        setData({ stripeData: stripeData.charges.data[0], ordersData })
        setLoading(false)
      } catch (err) {
        console.error("Error while fetching order in Order.jsx", err)
      }
    })()
  }, [orderId, userId])
  const {
    stripeData: {
      billing_details: { address, name, email, phone },
      payment_method_details: { card }
    },
    ordersData: { amount, products, shippingPrice, status }
  } = data
  const { t } = useTranslation()
  return (
    <Container>
      <Sidebar />
      <OrderContainer>
        <LeftTitle>{t("success.left.ordersDetails")}</LeftTitle>
        <ProductContainer>
          <ProductRow>
            <RowItem>{t("success.left.product")}</RowItem>
            <RowItem>{t("success.left.total")}</RowItem>
          </ProductRow>
          {(loading && productsSkeleton.current) ||
            products?.map(
              ({ product, color, size, quantity, _id: productId }) => (
                // eslint-disable-next-line no-underscore-dangle
                <ProductRow key={productId}>
                  <RowItemContainer>
                    <RowItem isName>
                      {product.title} {` X${quantity}`} {"-" && size}
                    </RowItem>
                    <ColorContainer color={color} />
                  </RowItemContainer>
                  <RowItem>
                    {quantity * product.price}
                    {t("currency")}
                  </RowItem>
                </ProductRow>
              )
            )}
          <ProductRow>
            <RowItem>{t("success.left.subTotal")}</RowItem>
            <RowItem>{amount + t("currency")}</RowItem>
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
            <RowItem>{amount + shippingPrice + t("currency")}</RowItem>
          </ProductRow>
          <ProductRow>
            <RowItem>{t("success.left.orderNumber")}</RowItem>
            <RowItem>{orderId}</RowItem>
          </ProductRow>
          <ProductRow>
            <RowItem>{t("success.left.status")}</RowItem>
            {loading ? (
              <Skeleton width="50%" height={33} />
            ) : (
              <RowItem>{t(`order.${status}`)}</RowItem>
            )}
          </ProductRow>
        </ProductContainer>
        <AddressContainer>
          <LeftTitle>{t("success.left.billingAddress")}</LeftTitle>
          {loading ? (
            addressSkeleton.current
          ) : (
            <>
              <AddressRow>{name}</AddressRow>
              <AddressRow>{address.line1}</AddressRow>
              <AddressRow>{`${address.postal_code}, ${address.city}, ${
                countries.find((c) => c.code === address.country)?.country
              }`}</AddressRow>
              <AddressRow>{email}</AddressRow>
              <AddressRow>{phone}</AddressRow>
            </>
          )}
        </AddressContainer>
      </OrderContainer>
    </Container>
  )
}
