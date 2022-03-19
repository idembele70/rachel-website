import { useTranslation } from "react-i18next"

const { default: Footer } = require("components/tools/Footer")
const { default: Navbar } = require("components/tools/Navbar")
const { default: React } = require("react")
const { default: styled } = require("styled-components")

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
`
const Main = styled.div`
  flex: 1;
  width: 90vw;
  margin: 0 auto;
  padding-top: 20px;
  max-width: 870px;
`
const Title = styled.h2`
  margin-bottom: 20px;
`
const Paragraph = styled.p`
  white-space: pre-line;
  text-align: justify;
  margin-bottom: 1.25rem;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`
const ImportantText = styled.span`
  color: red;
`
const SentBack = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Navbar />
      <Main>
        <Title>{t("sentBack.title")}</Title>
        <Paragraph>{t("sentBack.subTitle")}</Paragraph>
        <Paragraph bold>{t("sentBack.refundTitle")}</Paragraph>
        <Paragraph>{t("sentBack.refundText")}</Paragraph>
        <Paragraph bold>{t("sentBack.refundORLateTitle")}</Paragraph>
        <Paragraph>{t("sentBack.refundORLateText")}</Paragraph>
        <Paragraph bold>{t("sentBack.discountArticleTitle")}</Paragraph>
        <Paragraph>{t("sentBack.discountArticleText")}</Paragraph>
        <Paragraph bold>{t("sentBack.changeArticleTitle")}</Paragraph>
        <Paragraph>{t("sentBack.changeArticleText")}</Paragraph>
        <Paragraph bold>{t("sentBack.giftArticleTitle")}</Paragraph>
        <Paragraph>{t("sentBack.giftArticleText")}</Paragraph>
        <Paragraph bold>{t("sentBack.shippingTitle")}</Paragraph>
        <Paragraph>
          {t("sentBack.shippingText1")}
          <ImportantText>{t("sentBack.shippingText2")} </ImportantText>
          {t("sentBack.shippingText3")}
        </Paragraph>
      </Main>
      <Footer />
    </Container>
  )
}
export default SentBack
