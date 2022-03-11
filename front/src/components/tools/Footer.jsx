import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Room
} from "@mui/icons-material"
import React from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { mobile, smallMobile, tablet } from "responsive"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  flex: unset;
  & > div {
    min-width: 300px;
    padding: 20px;
    flex: 1;
    ${mobile({ padding: 10 })};
    ${smallMobile({ minWidth: "calc(95vw - 10px)", padding: 5 })};
  }
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const Logo = styled.h1``
const Description = styled.p`
  margin: 20px 0;
`
const SocialContainer = styled.div`
  display: flex;
`

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) =>
      // eslint-disable-next-line react/prop-types
      props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  border: 2px solid transparent;
  transition: border-color 500ms;
  cursor: pointer;
  &:hover {
    border: 2px solid teal;
  }
`

const Center = styled.div`
  ${mobile({ display: "none" })};
`
const Title = styled.h3`
  margin-bottom: 30px;
`
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`
const Right = styled.div`
  ${mobile({ backgroundColor: "#fff8f8" })};
`
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`
const Payment = styled.img`
  width: 50%;
`

const Footer = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const handleRedirect = (to = "") => {
    history.push(to)
  }
  return (
    <Container>
      <Left>
        <Logo>{t("siteName")}</Logo>
        <Description>{t("footer.left.description")}</Description>
        <SocialContainer>
          <SocialIcon color="385999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>{t("footer.center.title")}</Title>
        <List>
          <ListItem onClick={() => handleRedirect("/")}>
            {t("footer.center.listItem.home")}
          </ListItem>
          <ListItem onClick={() => handleRedirect("/cart")}>
            {t("footer.center.listItem.cart")}
          </ListItem>
          <ListItem onClick={() => handleRedirect("/products/hommes")}>
            {t("footer.center.listItem.manFashion")}
          </ListItem>
          <ListItem onClick={() => handleRedirect("/products/femmes")}>
            {t("footer.center.listItem.womamFashion")}
          </ListItem>
          <ListItem onClick={() => handleRedirect("/products/accessoires")}>
            {t("footer.center.listItem.accessories")}
          </ListItem>
          <ListItem onClick={() => handleRedirect("/user/")}>
            {t("footer.center.listItem.myAcount")}
          </ListItem>
          {/*           <ListItem onClick={()=> handleRedirect("/")} >{t("footer.center.listItem.orderTracking")}</ListItem>
          <ListItem onClick={()=> handleRedirect("/")} >{t("footer.center.listItem.wishlist")}</ListItem>
          <ListItem onClick={()=> handleRedirect("/")} >{t("footer.center.listItem.terms")}</ListItem> */}
        </List>
      </Center>
      <Right>
        <Title>{t("footer.right.title")}</Title>
        <ContactItem>
          <Room />
          {t("footer.right.contactItem.address")}
        </ContactItem>
        <ContactItem>
          <Phone />
          {t("footer.right.contactItem.phoneNumber")}
        </ContactItem>
        <ContactItem>
          <MailOutline />
          {t("footer.right.contactItem.email")}
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  )
}

export default Footer
