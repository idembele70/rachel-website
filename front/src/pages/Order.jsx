import { Skeleton } from "@mui/material"
import Sidebar from "components/tools/Sidebar"
import { getCountries } from "components/tools/utils"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
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
  // @ts-ignore
  const { _id: userId } = useSelector((state) => state.user.currentUser)
  const location = useLocation()
  const [, , , orderId] = location.pathname.split(/\//g)
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const productsSkeleton = useRef(
    [...Array(location.state?.productsLength)].map((_, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <Skeleton key={idx} width="100%" height={34} />
    ))
  )
  const addressSkeleton = useRef(
    [...Array(5)].map(() => <Skeleton width="100%" height={23} />)
  )
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    if (isMounted.current) {
      ;(async () => {
        try {
          const { data: ordersData } = await userRequest.get(
            `orders/find/${userId}/${orderId}`
          )

          if (ordersData.userId !== userId) {
            history.push("/")
          } else if (ordersData?.stripeId) {
            const { data: stripeData } = await publicRequest.get(
              `/checkout/payment/intents/${ordersData.stripeId}`
            )
            setData({ stripeData: stripeData.charges.data[0], ordersData })
          } else {
            const { data: stripeData } =
              await publicRequest.get(`/paypal/payment/${ordersData?.paypalId}
          `)
            setData({ stripeData, ordersData })
          }
          setLoading(false)
        } catch (err) {
          console.error("Error while fetching order in Order.jsx", err)
        }
      })()
    }
    return () => {
      isMounted.current = false
    }
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
              ({ productId: product, color, size, quantity, _id: pId }) => (
                // eslint-disable-next-line no-underscore-dangle
                <ProductRow key={pId}>
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
                getCountries({
                  code: address.country,
                  country: false
                })?.country
              }`}</AddressRow>
              <AddressRow>{email}</AddressRow>
              {phone ? <AddressRow>{phone}</AddressRow> : null}
            </>
          )}
        </AddressContainer>
      </OrderContainer>
    </Container>
  )
}
