import Footer from "components/tools/Footer"
import Navbar from "components/tools/Navbar"
import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
`
const Main = styled.div`
  flex: 1;
  width: 95%;
  margin: 0 auto;
  padding: 20px 0;
`
const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
`
const SubTitle = styled.h3`
  font-size: 1rem;
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 1rem;
`
const StrongText = styled.h4`
  display: inline;
  font-weight: 700;
`
const Paragraph = styled.p`
  margin-bottom: 20px;
  white-space: pre-line;
`
function Politics() {
  const { t } = useTranslation()
  return (
    <Container>
      <Navbar />
      <Main>
        <Title>{t("politics.title")}</Title>
        <SubTitle>{t("politics.title")}</SubTitle>
        <Paragraph>
          <StrongText>{t("politics.article1TitleStrong")}</StrongText>
          {t("politics.article1Title")}
        </Paragraph>
        <Paragraph>{t("politics.article1Text")}</Paragraph>
        <Paragraph>
          <StrongText>{t("politics.article2TitleStrong")}</StrongText>
          {t("politics.article2Title")}
        </Paragraph>
        <Paragraph>{t("politics.article2Text")}</Paragraph>
        <Paragraph>
          <StrongText>{t("politics.article3TitleStrong")}</StrongText>
          {t("politics.article3Title")}
        </Paragraph>
        <Paragraph>{t("politics.article3Text")}</Paragraph>
        <Paragraph>
          <StrongText>{t("politics.article4TitleStrong")}</StrongText>
          {t("politics.article4Title")}
        </Paragraph>
        <Paragraph>{t("politics.article4Text")}</Paragraph>
        <Paragraph>
          <StrongText>{t("politics.article5TitleStrong")}</StrongText>
          {t("politics.article5Title")}
        </Paragraph>
        <Paragraph>{t("politics.article5Text")}</Paragraph>
        <Paragraph>
          <StrongText>{t("politics.article6TitleStrong")}</StrongText>
          {t("politics.article6Title")}
        </Paragraph>
        <Paragraph>{t("politics.article6Text")}</Paragraph>
        <Paragraph>
          <StrongText>{t("politics.article7TitleStrong")}</StrongText>
          {t("politics.article7Title")}
        </Paragraph>
        <Paragraph>{t("politics.article7Text")}</Paragraph>
        <Paragraph>
          <StrongText>{t("politics.article8TitleStrong")}</StrongText>
          {t("politics.article8Title")}
        </Paragraph>
        <Paragraph>{t("politics.article8Text")}</Paragraph>
        <Paragraph>
          <StrongText>{t("politics.questionTitleStrong")}</StrongText>
        </Paragraph>
        <Paragraph>{t("politics.questionText")}</Paragraph>
      </Main>
      <Footer />
    </Container>
  )
}
export default Politics
