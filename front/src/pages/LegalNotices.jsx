import React from "react"
import Navbar from "components/tools/Navbar"
import Footer from "components/tools/Footer"
import styled from "styled-components"
import { useTranslation } from "react-i18next"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
`
const Main = styled.div`
  flex: 1;
  padding: 20px 50px;
`
const Title = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`
const Paragraph = styled.p`
  margin-bottom: 1rem;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  white-space: pre-line;
`
const LegalNotices = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Navbar />
      <Main>
        <Title>{t("legalNotice.title")}</Title>
        <Paragraph>{t("legalNotice.society")}</Paragraph>
        <Paragraph>{t("legalNotice.societyName")}</Paragraph>
        <Paragraph>{t("legalNotice.siret")}</Paragraph>
        <Paragraph>{t("legalNotice.postalBox")}</Paragraph>
        <Paragraph>{t("legalNotice.addressLine1")}</Paragraph>
        <Paragraph>{t("legalNotice.addressLine2")}</Paragraph>
        <Paragraph>{t("legalNotice.addressLine3")}</Paragraph>
        <Paragraph>{t("legalNotice.websiteLink")}</Paragraph>
        <Paragraph>{t("legalNotice.developer")}</Paragraph>
        <Paragraph bold>{t("legalNotice.hostNoticeTitle")}</Paragraph>
        <Paragraph>{t("legalNotice.hostName")}</Paragraph>
        <Paragraph>{t("legalNotice.hostAddress")}</Paragraph>
        <Paragraph>{t("legalNotice.hostPhone")}</Paragraph>
        <Paragraph>{t("legalNotice.hostEmail")}</Paragraph>
      </Main>
      <Footer />
    </Container>
  )
}
export default LegalNotices
