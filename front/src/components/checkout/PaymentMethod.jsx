import { ArrowRightAltOutlined, CreditCardOutlined } from "@mui/icons-material"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { mobile, smallMobile } from "responsive"
import styled from "styled-components"
import PropTypes from "prop-types"

const Container = styled.div`
  max-width: 95vw;
  width: 300px;
  height: 300px;
  border-radius: 5px;
  padding: 1.25rem;
  background-color: #ffffff63;
  ${mobile({ maxWidth: "calc(95vw - 40px)" })}
`
const Title = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  ${smallMobile({ fontSize: "1rem" })}
`
const SubTitle = styled.h4`
  font-size: 1rem;
  font-weight: lighter;
  margin-bottom: 2rem;
`
const MethodsContainer = styled.div`
  width: calc(100% - 40px);
  height: 90px;
  border: 2px solid
    ${(props) =>
      // @ts-ignore
      props.isSelected ? "teal" : "rgba(231, 238, 244, 1)"};
  background-color: ${(props) =>
    // @ts-ignore
    props.isSelected ? "rgba(0, 128, 128, 0.09)" : "transparent"};
  & svg {
    color: ${(props) =>
      // @ts-ignore
      props.isSelected ? "teal" : ""};
  }
  border-radius: 5px;
  margin-bottom: 1rem;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 150ms ease-in;
  transition: background 300ms ease-in 100ms;

  &:hover {
    border: 2px solid teal;
    & svg {
      color: teal;
    }
  }
`
const MethodsTitle = styled.h3`
  font-size: 1rem;
  margin-left: 1rem;
`
const StyledCreditCardOutlined = styled(CreditCardOutlined)`
  && {
    font-size: 3rem;
    transition: color 150ms ease-in 50ms;
  }
`
const Image = styled.img``

const StyledArrowRightAltOutlined = styled(ArrowRightAltOutlined)`
  && {
    margin-left: auto;
    font-size: 2rem;
    transition: color 150ms ease-in 100ms;
    ${smallMobile({ display: "none" })}
  }
`

const PaymentMethod = ({ onChoosePm }) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(0)
  const handleSelect = (id) => {
    if (selected === id) {
      setSelected(0)
      onChoosePm(0)
    } else {
      setSelected(id)
      onChoosePm(id)
    }
  }
  return (
    <Container>
      <Title>{t("checkout.paymentMethod.title")}</Title>
      <SubTitle>{t("checkout.paymentMethod.subTitle")}</SubTitle>
      <MethodsContainer
        // @ts-ignore
        isSelected={selected === 1}
        onClick={() => handleSelect(1)}
      >
        <StyledCreditCardOutlined />
        <MethodsTitle>{t("checkout.paymentMethod.CBTitle")}</MethodsTitle>
        <StyledArrowRightAltOutlined />
      </MethodsContainer>
      <MethodsContainer
        // @ts-ignore
        isSelected={selected === 2}
        onClick={() => handleSelect(2)}
      >
        <Image
          src="assets/img/checkout/paypa_little.png"
          alt={t("checkout.paymentMethod.paypalAlt")}
        />
        <MethodsTitle>{t("checkout.paymentMethod.paypalTitle")}</MethodsTitle>
        <StyledArrowRightAltOutlined />
      </MethodsContainer>
    </Container>
  )
}

PaymentMethod.propTypes = {
  onChoosePm: PropTypes.func.isRequired
}

export default PaymentMethod
