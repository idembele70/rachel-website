import React from "react"
import Footer from "components/tools/Footer"
import Navbar from "components/tools/Navbar"
import styled from "styled-components"
import { useTranslation } from "react-i18next"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;
  max-width: 1440px;
  margin: 0 auto;
  min-height: 100vh;
`
const Wrapper = styled.div`
  padding: 20px 0;
  flex: 1;
  width: 95%;
  text-align: justify;
`
const Title = styled.h2`
  margin-bottom: 0.5rem;
`
const SubTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`
const ListBody = styled.ul`
  margin-bottom: 20px;
`
const ListItem = styled.li``
const Paragraph = styled.p`
  margin-bottom: ${(props) => (props.underline ? 0 : 20)}px;
  white-space: pre-line;
  text-decoration: ${(props) => (props.underline ? "underline" : "none")};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`

export default function GeneralConditions() {
  const { t } = useTranslation()
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>{t("cgv.title")}</Title>
        <Paragraph>{t("cgv.preambule")}</Paragraph>
        <Paragraph>{t("cgv.warranty")}</Paragraph>
        <Paragraph>{t("cgv.payment")}</Paragraph>
        <SubTitle>{t("cgv.appliTitle")}</SubTitle>
        <Paragraph>{t("cgv.appliText")}</Paragraph>
        <SubTitle>{t("cgv.saveDataTitle")}</SubTitle>
        <Paragraph>{t("cgv.saveDataText")}</Paragraph>
        <SubTitle>{t("cgv.passwordTitle")}</SubTitle>
        <Paragraph>{t("cgv.passwordText")}</Paragraph>
        <SubTitle>{t("cgv.orderTitle")}</SubTitle>
        <Paragraph>{t("cgv.orderText")}</Paragraph>
        <SubTitle>{t("cgv.confirmOrderTitle")}</SubTitle>
        <Paragraph>{t("cgv.confirmOrderText")}</Paragraph>
        <SubTitle>{t("cgv.priceTitle")}</SubTitle>
        <Paragraph>{t("cgv.priceText")}</Paragraph>
        <SubTitle>{t("cgv.shippingTitle")}</SubTitle>
        <Paragraph>{t("cgv.shippingText")}</Paragraph>
        <SubTitle>{t("cgv.verifyItemTitle")}</SubTitle>
        <Paragraph>{t("cgv.verifyItemText")}</Paragraph>
        <SubTitle>{t("cgv.warrantyTitle")}</SubTitle>
        <Paragraph>{t("cgv.warrantyText")}</Paragraph>
        <SubTitle>{t("cgv.savTitle")}</SubTitle>
        <Paragraph>{t("cgv.savText")}</Paragraph>
        <SubTitle>{t("cgv.productsTitle")}</SubTitle>
        <Paragraph>{t("cgv.productsText")}</Paragraph>
        <SubTitle>{t("cgv.sentBackTitle")}</SubTitle>
        <Paragraph>{t("cgv.sentBackText")}</Paragraph>
        <SubTitle>{t("cgv.ForceMajeurTitle")}</SubTitle>
        <Paragraph>{t("cgv.ForceMajeurText")}</Paragraph>
        <SubTitle>{t("cgv.RightAppliTitle")}</SubTitle>
        <Paragraph>{t("cgv.RightAppliText")}</Paragraph>
      </Wrapper>
      <Footer />
    </Container>
  )
}
