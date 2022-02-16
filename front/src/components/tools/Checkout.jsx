// @ts-nocheck
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js"
import React, { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { userRequest } from "requestMethods"
import { mobile, smallMobile } from "responsive"
import styled from "styled-components"

const Container = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  background-color: rgba(39, 48, 58, 0.91);
  padding: 10px 0;
`
const Title = styled.h1`
  color: #ffffffd5;
  margin: 15px 0;
  text-align: center;
`
const Form = styled.form`
  display: flex;
  align-items: center;
  width: 90vw;
  max-width: 500px;
  margin: 0 auto;
  flex-direction: column;
`
const FormItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
const ItemRow = styled.div`
  flex-grow: 1;
  margin: 0 5px;
  ${smallMobile({ margin: 0 })}
`
const Label = styled.label`
  color: #6b7c93;
  font-weight: 300;
  letter-spacing: 0.025em;
`
const Input = styled.input`
  display: block;
  width: -webkit-fill-available;
  margin: 10px 0 20px 0;
  max-width: 500px;
  padding: 10px 14px;
  font-size: 1em;
  box-shadow: rgba(50, 50, 93, 0.109804) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  background: white;
  &::placeholder {
    color: #aab7c4;
  }
  &:focus {
    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
      rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
    transition: all 150ms ease;
  }
`
const Select = styled.select`
  display: block;
  width: -webkit-fill-available;
  margin: 10px 0 20px 0;
  max-width: 500px;
  padding: 8px 14px;
  font-size: 1em;
`
const Option = styled.option``
const StripeFormItem = styled.div`
  width: 100%;
`
const StripeInput = styled(({ component, ...props }) =>
  React.cloneElement(component, props)
)`
  display: block;
  margin: 10px 0 20px 0;
  max-width: 500px;
  padding: 10px 14px;
  font-size: 1em;
  box-shadow: rgba(50, 50, 93, 0.109804) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  background: white;
  &::placeholder {
    color: red;
  }
  &:focus {
    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
      rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
    transition: all 150ms ease;
  }
`
const ButtonContainer = styled.div``
const Button = styled.button`
  white-space: nowrap;
  border: 0;
  outline: 0;
  display: inline-block;
  height: 40px;
  padding: 0 14px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #fff;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${(props) => (props.back ? "#e56b67" : "#6772e5")};
  text-decoration: none;
  transition: all 150ms ease;
  margin: 0 10px;
  ${mobile({ margin: 10 })}
  &:hover {
    color: #fff;
    cursor: pointer;
    background-color: ${(props) => (props.back ? "#f3645f" : "#7795f8")};
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.11), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`
const Error = styled.span`
  color: red;
  margin: 0 0 15px;
  font-size: 20px;
  opacity: ${(props) => props.opacity};
`
function Checkout() {
  const history = useHistory()
  const { currentUser } = useSelector((state) => state.user)
  const [info, setInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    phone: ""
  })

  useEffect(() => {
    const {
      _id,
      isAdmin,
      accesToken,
      createdAt,
      updatedAt,
      __v,
      postalBox: zip,
      ...billing
    } = currentUser
    setInfo({ ...billing, zip })
  }, [currentUser])

  const { firstname, lastname, email, address, zip, city, country, phone } =
    info
  const handleUpdate = (ev) => {
    ev.preventDefault()
    const { name, value } = ev.target
    setInfo({ ...info, [name]: value })
  }
  const [canPay, setCanPay] = useState(false)
  const [error, setError] = useState(false)
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: 18,
          color: "#424770",
          letterSpacing: "0.025em",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    []
  )

  const stripe = useStripe()
  const elements = useElements()
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
  const { total, products } = useSelector((state) => state.cart)
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (canPay) {
      if (!stripe || !elements) {
        console.log("stripe js has not loaded!")
        return
      }
      const payload = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          address: {
            city,
            country,
            line1: address,
            postal_code: zip
          },
          email,
          name: `${firstname} ${lastname}`,
          phone
        }
      })
      try {
        const {
          data: { id: stripeId }
        } = await userRequest.post("/checkout/payment/intents", {
          id: payload.paymentMethod.id,
          amount: total * 100
        })
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
          product: product._id, // eslint-disable-line no-underscore-dangle
          quantity: product.qte,
          color: product.color,
          size: product.size
        }))
        const { data } = await userRequest.post(
          // eslint-disable-next-line no-underscore-dangle
          `/orders/new/${currentUser._id}`,
          {
            user: currentUser._id, // eslint-disable-line no-underscore-dangle
            products: ordersProducts,
            amount: total,
            stripeId
          }
        )
        if (data)
          history.push({
            pathname: "/success",
            state: { ordersData: data, cartProducts }
          })
      } catch (err) {
        // eslint-disable-next-line no-underscore-dangle
        console.error(err)
      }
    } else if (Object.values(info).filter((x) => x === "").length !== 0)
      setError(true)
    else {
      setCanPay(true)
      setError(false)
    }
  }
  const handleReset = (e) => {
    e.preventDefault()
    if (canPay) setCanPay(false)
    else {
      setCanPay(false)
      history.push("/cart")
    }
  }
  const { t } = useTranslation()
  return (
    <Container>
      <Title>{canPay ? t("checkout.payment") : t("checkout.billing")}</Title>
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        {!canPay ? (
          <>
            <FormItem>
              <ItemRow>
                <Label>{t("checkout.firstname")}</Label>
                <Input
                  required
                  placeholder={t("checkout.firstname").toUpperCase()}
                  name="firstname"
                  value={firstname}
                  onChange={handleUpdate}
                />
              </ItemRow>
              <ItemRow>
                <Label>{t("checkout.lastname")}</Label>
                <Input
                  required
                  onChange={handleUpdate}
                  placeholder={t("checkout.lastname").toUpperCase()}
                  name="lastname"
                  value={lastname}
                />
              </ItemRow>
            </FormItem>
            <FormItem>
              <ItemRow>
                <Label>{t("checkout.email")}</Label>
                <Input
                  required
                  placeholder={t("checkout.email").toUpperCase()}
                  name="email"
                  value={email}
                  onChange={handleUpdate}
                />
              </ItemRow>
              <ItemRow>
                <Label>Address</Label>
                <Input
                  required
                  placeholder="ADDRESS"
                  name="address"
                  value={address}
                  onChange={handleUpdate}
                />
              </ItemRow>
            </FormItem>
            <FormItem>
              <ItemRow>
                <Label>{t("checkout.postalCode")}</Label>
                <Input
                  required
                  placeholder={t("checkout.postalCode").toUpperCase()}
                  name="zip"
                  value={zip}
                  onChange={handleUpdate}
                />
              </ItemRow>
              <ItemRow>
                <Label>{t("checkout.city")}</Label>
                <Input
                  required
                  placeholder={t("checkout.city").toUpperCase()}
                  name="city"
                  value={city}
                  onChange={handleUpdate}
                />
              </ItemRow>
            </FormItem>
            <FormItem>
              <ItemRow>
                <Label>{t("checkout.country")}</Label>
                <Select name="country" value={country} onChange={handleUpdate}>
                  {countries.map(({ country: ctry, code }) => (
                    <Option key={code} value={code}>
                      {ctry}
                    </Option>
                  ))}
                </Select>
              </ItemRow>
              <ItemRow>
                <Label>{t("checkout.phone")}</Label>
                <Input
                  required
                  placeholder={t("checkout.phone").toUpperCase()}
                  name="phone"
                  value={phone}
                  onChange={handleUpdate}
                />
              </ItemRow>
            </FormItem>
          </>
        ) : (
          <>
            <StripeFormItem>
              <Label>{t("checkout.card.number")}</Label>
              <StripeInput
                component={<CardNumberElement options={options} />}
              />
            </StripeFormItem>
            <StripeFormItem>
              <Label>{t("checkout.card.expiration")}</Label>
              <StripeInput
                component={<CardExpiryElement options={options} />}
              />
            </StripeFormItem>
            <StripeFormItem>
              <Label>{t("checkout.card.cvc").toUpperCase()}</Label>
              <StripeInput component={<CardCvcElement options={options} />} />
            </StripeFormItem>
          </>
        )}
        <Error opacity={error ? 1 : 0}>{t("checkout.emptyField")}</Error>
        <ButtonContainer>
          <Button back type="Reset">
            {canPay ? "Go back" : "back to Card"}
          </Button>
          <Button type="submit" disabled={!stripe}>
            {canPay ? "PAY" : "Proceed to the payment"}
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default Checkout
