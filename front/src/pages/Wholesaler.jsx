const { default: Footer } = require("components/tools/Footer")
const { default: Navbar } = require("components/tools/Navbar")
const { default: React } = require("react")
const { useTranslation } = require("react-i18next")
const { default: styled } = require("styled-components")

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const Main = styled.div`
  flex: 1;
  width: 95%;
  max-width: 900px;
  margin: 0 auto;
`
const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.25rem;
`
const Strong = styled.strong``
const Paragraph = styled.p`
  white-space: pre-line;
  margin-bottom: 0.25rem;
`
const Wholesaler = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Navbar />
      <Main>
        <Title>{t("wholesaler.title")}</Title>
        <Paragraph>
          <Strong>{t("wholesaler.title")}</Strong>
        </Paragraph>
        <Paragraph>{t("wholesaler.description")}</Paragraph>
      </Main>
      <Footer />
    </Container>
  )
}

export default Wholesaler
