import styled from "styled-components"
import React from "react"
import { useTranslation } from "react-i18next"

const Container = styled.div`
  width: 100%;
  flex: 0 0 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  max-width: 1440px;
  margin: 0 auto;
`

const Announcement = () => {
  const { t } = useTranslation()
  return <Container>{t("announcement")}</Container>
}

export default Announcement
