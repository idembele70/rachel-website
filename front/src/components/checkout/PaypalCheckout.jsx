import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { SendEmail } from "components/tools/utils"
import PropTypes from "prop-types"
import React, { useState, useLayoutEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { userRequest } from "requestMethods"
import styled from "styled-components"

const Container = styled.div`
  width: calc(100vw - 40px);
  max-width: 300px;
  padding: 20px;
  min-height: 146px;
  background-color: #ffffffb8;
  border-radius: 5px;
  opacity: ${(props) => props.opacity};
  transition: opacity 1s linear;
`
const PaypalCheckout = ({ amount, onLoading }) => {
  const initialOptions = {
    "client-id": process.env.REACT_APP_CLIENT_ID,
    currency: process.env.REACT_APP_CURRENCY
  }
  useLayoutEffect(() => {
    onLoading(true)
  }, [])
  const [opacity, setOpacity] = useState(0)
  const createOrder = (_data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount
          }
        }
      ]
    })
  const location = useLocation()
  const history = useHistory()
  const {
    user: { currentUser },
    cart: { products }
  } = useSelector((state) => state)
  const onApprove = (_data, actions) => {
    onLoading(true)
    setOpacity(0)
    return actions.order
      .capture()
      .then((details) => {
        const cartProducts = products.map(
          ({ title, price, qte, size, color }) => ({
            title,
            price,
            qte,
            size,
            color
          })
        )
        const ordersProducts = products.map((product) => ({
          productId: product.id, // eslint-disable-line no-underscore-dangle
          quantity: product.qte,
          color: product.color,
          size: product.size
        }))
        ;(async () => {
          const shippingPrice = location.state?.shippingPrice
          const { data } = await userRequest.post(
            `/orders/new/${currentUser._id}`, // eslint-disable-line no-underscore-dangle
            {
              userId: currentUser._id, // eslint-disable-line no-underscore-dangle
              products: ordersProducts,
              amount,
              paypalId: details.id,
              shippingPrice: shippingPrice <= 0 ? 0 : shippingPrice
            }
          )
          if (data) {
            ordersProducts.forEach(({ productId, quantity, color, size }) => {
              userRequest.put(
                `/products/${productId}?decreaseQte=${quantity}`,
                {
                  name: color,
                  size
                }
              )
            })
            const { id } = details
            const {
              data: {
                billing_details: {
                  email,
                  name,
                  address: { line1, city, postal_code: postalCode, country }
                }
              }
            } = await userRequest.get(`paypal/payment/${id}`)
            SendEmail({
              welcome: false,
              data: {
                first_name: details.payer.name.given_name,
                order_number: data._id, // eslint-disable-line no-underscore-dangle
                name,
                address: line1,
                city,
                postal_code: postalCode,
                country,
                to_email: email
              }
            })
            history.push({
              pathname: "/success",
              state: { ordersData: data, cartProducts }
            })
          } else {
            onLoading(false)
          }
        })()
      })
      .catch((err) => {
        console.error(err)
        onLoading(false)
        setOpacity(1)
      })
  }
  return (
    <Container opacity={opacity}>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          onInit={() => {
            setOpacity(1)
            onLoading(false)
          }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </Container>
  )
}

PaypalCheckout.propTypes = {
  amount: PropTypes.number.isRequired,
  onLoading: PropTypes.func.isRequired
}

export default PaypalCheckout
