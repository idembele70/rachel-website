import React from "react"
import Footer from "components/tools/Footer"
import Navbar from "components/tools/Navbar"
import styled from "styled-components"
import { useTranslation } from "react-i18next"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 1440px;
  margin: 0 auto;
  min-height: 100vh;
`
const Wrapper = styled.div`
  flex: 1;
  width: 90%;
  text-align: justify;
`
const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
`
const SubTitle = styled.h3`
  margin-bottom: 20px;
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
const Link = styled.a``
const Hr = styled.hr`
  height: 2px;
  background-color: black;
  margin-bottom: 5px;
`
const InlineParagraph = styled.span`
  font-weight: bold;
`
const Box = styled.div`
  border: 1px solid black;
  outline: 1px solid black;
  padding: 20px 4px;
  width: 780px;
  max-width: 90vw;
  margin: 0 auto 20px;
`
export default function LegalMentions() {
  const { t } = useTranslation()
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>{t("cgv.title")}</Title>
        <SubTitle>{t("cgv.preambule")}</SubTitle>
        <Paragraph>{t("cgv.preambuleSubText")}</Paragraph>
        <Paragraph>{t("cgv.preambuleServices")}</Paragraph>
        <ListBody>
          <ListItem>{t("cgv.preambuleListItem1")}</ListItem>
          <ListItem>{t("cgv.preambuleListItem2")}</ListItem>
          <ListItem>{t("cgv.preambuleListItem3")}</ListItem>
          <ListItem>{t("cgv.preambuleListItem4")}</ListItem>
          <ListItem>{t("cgv.preambuleListItem5")}</ListItem>
        </ListBody>
        <Paragraph>{t("cgv.preambuleFooter")}</Paragraph>
        <SubTitle>{t("cgv.article1")}</SubTitle>
        <Paragraph>{t("cgv.article1Text")}</Paragraph>
        <SubTitle>{t("cgv.article2")}</SubTitle>
        <Paragraph>{t("cgv.article2Text")}</Paragraph>
        <SubTitle>{t("cgv.article3")}</SubTitle>  
        <Paragraph>{t("cgv.article3Text")}</Paragraph>
        <SubTitle>{t("cgv.article4")}</SubTitle>
        <Paragraph>{t("cgv.article4Text")}</Paragraph>
        <SubTitle>{t("cgv.article5")}</SubTitle>
        <Paragraph>{t("cgv.article5Text")}</Paragraph>
        <SubTitle>{t("cgv.article6")}</SubTitle>
        <Paragraph>{t("cgv.article6Text")}</Paragraph>
        <SubTitle>{t("cgv.article7")}</SubTitle>
        <Paragraph>{t("cgv.article7Text")}</Paragraph>
        <SubTitle>{t("cgv.article8")}</SubTitle>
        <Paragraph>{t("cgv.article8Text")}</Paragraph>
        <SubTitle>{t("cgv.article9")}</SubTitle>
        <Paragraph>{t("cgv.article9Text")}</Paragraph>
        <SubTitle>{t("cgv.article10")}</SubTitle>
        <Paragraph>{t("cgv.article10Text")}</Paragraph>
        <SubTitle>{t("cgv.article11")}</SubTitle>
        <Paragraph>{t("cgv.article11Text")}</Paragraph>
        <SubTitle>{t("cgv.article12")}</SubTitle>
        <Paragraph>{t("cgv.article12Text")}</Paragraph>
        <SubTitle>{t("cgv.article13")}</SubTitle>
        <Paragraph>{t("cgv.article13Text")}</Paragraph>
        <SubTitle>{t("cgv.article14")}</SubTitle>
        <SubTitle>{t("cgv.article14-1")}</SubTitle>
        <Paragraph>{t("cgv.article14-1Text")}</Paragraph>
        <SubTitle>{t("cgv.article14-2")}</SubTitle>
        <Paragraph>{t("cgv.article14-2Text")}</Paragraph>
        <SubTitle>{t("cgv.article15")}</SubTitle>
        <Paragraph underline>{t("cgv.article15Underline")}</Paragraph>
        <Paragraph>{t("cgv.article15Text")}</Paragraph>
        <Paragraph underline>{t("cgv.article15Underline2")}</Paragraph>
        <Paragraph>{t("cgv.article15Text2")}</Paragraph>
        <SubTitle>{t("cgv.article16")}</SubTitle>
        <Paragraph>{t("cgv.article16Text")}</Paragraph>
        <SubTitle>{t("cgv.article17")}</SubTitle>
        <Paragraph>{t("cgv.article17Text")}</Paragraph>
        <SubTitle>{t("cgv.article18")}</SubTitle>
        <Paragraph>{t("cgv.article18Text")}</Paragraph>
        <SubTitle>{t("cgv.article19")}</SubTitle>
        <Paragraph>{t("cgv.article19Text")}</Paragraph>
        <SubTitle>{t("cgv.article20")}</SubTitle>
        <Paragraph>{t("cgv.article20Text")}</Paragraph>
        <SubTitle>{t("cgv.article21")}</SubTitle>
        <Paragraph>{t("cgv.article21Text")}</Paragraph>
        <SubTitle>{t("cgv.article22")}</SubTitle>
        <Paragraph>{t("cgv.article22Text")}</Paragraph>
        <SubTitle>{t("cgv.article23")}</SubTitle>
        <Paragraph>
          {t("cgv.article23Text")}
          <Link target="_blank" href={t("cgv.article23Link")}>
            {t("cgv.article23Link")}
          </Link>
        </Paragraph>
        <SubTitle>{t("cgv.article24")}</SubTitle>
        <Paragraph>{t("cgv.article24Text")}</Paragraph>
        <SubTitle>{t("cgv.article25")}</SubTitle>
        <Paragraph underline bold>
          {t("cgv.article25Underline")}
        </Paragraph>
        <Paragraph>{t("cgv.article25Text")}</Paragraph>
        <Paragraph underline bold>
          {t("cgv.article25Underline2")}
        </Paragraph>
        <Paragraph>{t("cgv.article25Text2")}</Paragraph>
        <Paragraph underline bold>
          {t("cgv.article25Underline3")}
        </Paragraph>
        <Paragraph>{t("cgv.article25Text3")}</Paragraph>
        <Paragraph underline bold>
          {t("cgv.article25Underline4")}
        </Paragraph>
        <Paragraph>{t("cgv.article25Text4")}</Paragraph>
        <Paragraph underline bold>
          {t("cgv.article25Underline5")}
        </Paragraph>
        <Paragraph>{t("cgv.article25Text5")}</Paragraph>
        <ListBody>
          <ListItem>{t("cgv.article25ListItem1")}</ListItem>
          <ListItem>{t("cgv.article25ListItem2")}</ListItem>
          <ListItem>{t("cgv.article25ListItem3")}</ListItem>
          <ListItem>{t("cgv.article25ListItem4")}</ListItem>
          <ListItem>{t("cgv.article25ListItem5")}</ListItem>
          <ListItem>{t("cgv.article25ListItem6")}</ListItem>
        </ListBody>
        <Paragraph underline bold>
          {t("cgv.article25Underline6")}
        </Paragraph>
        <Paragraph>{t("cgv.article25Text6")}</Paragraph>
        <Hr />
        <Hr />
        <Paragraph style={{ textAlign: "center", fontSize: "1.5em" }} bold>
          {t("cgv.annexe")}
        </Paragraph>
        <Paragraph style={{ textAlign: "center" }} bold>
          {t("cgv.formulaire")}
        </Paragraph>
        <Paragraph style={{ textAlign: "center" }}>
          {t("cgv.formulaireText")}
        </Paragraph>
        <Box>
          <Paragraph bold style={{ textAlign: "center" }}>
            {t("cgv.formulaire")}
          </Paragraph>
          <Paragraph>{t("cgv.formulaireDesc")}</Paragraph>
        </Box>
        <Paragraph style={{ textAlign: "center", fontSize: "1.5em" }} bold>
          {t("cgv.annexe")}
        </Paragraph>
        <Paragraph bold>{t("cgv.code-consommation")}</Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.articleL217-4")}</InlineParagraph>
          {t("cgv.articleL217-4Text")}
        </Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.articleL217-5")}</InlineParagraph>
          {t("cgv.articleL217-5Text")}
        </Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.articleL217-6")}</InlineParagraph>
          {t("cgv.articleL217-6Text")}
        </Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.articleL217-7")}</InlineParagraph>
          {t("cgv.articleL217-7Text")}
        </Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.articleL217-8")}</InlineParagraph>
          {t("cgv.articleL217-8Text")}
        </Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.articleL217-9")}</InlineParagraph>
          {t("cgv.articleL217-9Text")}
        </Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.articleL217-10")}</InlineParagraph>
          {t("cgv.articleL217-10Text")}
        </Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.articleL217-11")}</InlineParagraph>
          {t("cgv.articleL217-11Text")}
        </Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.articleL217-12")}</InlineParagraph>
          {t("cgv.articleL217-12Text")}
        </Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.articleL217-13")}</InlineParagraph>
          {t("cgv.articleL217-13Text")}
        </Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.articleL217-14")}</InlineParagraph>
          {t("cgv.articleL217-14Text")}
        </Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.articleL217-15")}</InlineParagraph>
          {t("cgv.articleL217-15Text")}
        </Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.articleL217-16")}</InlineParagraph>
          {t("cgv.articleL217-16Text")}
        </Paragraph>
        <Paragraph bold>{t("cgv.code-civil")}</Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.article1617")}</InlineParagraph>
          {t("cgv.article1617Text")}
        </Paragraph>
        <Paragraph>
          <InlineParagraph>{t("cgv.article1648")}</InlineParagraph>
          {t("cgv.article1648Text")}
        </Paragraph>
      </Wrapper>
      <Footer />
    </Container>
  )
}
