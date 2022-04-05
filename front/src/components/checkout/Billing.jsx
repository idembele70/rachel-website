import { getCountries } from "components/tools/utils"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { mobile, smallMobile } from "responsive"
import styled from "styled-components"
import PropTypes from "prop-types"

const FormItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  ${mobile({ flexDirection: "column" })}
`
const ItemRow = styled.div`
  flex: 1;
  max-width: 50%;
  margin: 0 5px;
  display: flex;
  flex-direction: column;
  ${mobile({ maxWidth: "initial" })}
  ${smallMobile({ margin: 0 })}
`
const Label = styled.label`
  color: #6b7c93;
  font-weight: 300;
  letter-spacing: 0.025em;
`
const Input = styled.input`
  width: calc(100% - 28px);
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
  ${mobile({ maxWidth: 300 })}
`
const Select = styled.select`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  max-width: 500px;
  padding: 10px 14px;
  -webkit-appearance: none;
  border-radius: 4px;
  font-size: 1em;
  ${mobile({ maxWidth: 328 })}
`
const Option = styled.option``
function Billing({ onUserSubmit }) {
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
  const { currentUser } = useSelector((state) => state.user)
  const handleUpdate = (ev) => {
    ev.preventDefault()
    const { name, value } = ev.target
    setInfo({ ...info, [name]: value })
  }
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
  useEffect(() => {
    onUserSubmit(info)
  }, [info, onUserSubmit])

  const { firstname, lastname, email, address, zip, city, country, phone } =
    info
  const { t } = useTranslation()
  return (
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
          <Label>{t("checkout.address")}</Label>
          <Input
            required
            placeholder={t("checkout.address").toUpperCase()}
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
            {getCountries({ code: "", country: "" })?.map(
              ({ country: ctry, code }) => (
                <Option key={code} value={code}>
                  {ctry}
                </Option>
              )
            )}
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
  )
}

Billing.propTypes = {
  onUserSubmit: PropTypes.func.isRequired
}

export default Billing
