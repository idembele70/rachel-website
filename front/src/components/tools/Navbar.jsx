import {
  PersonOutlined,
  Search,
  ShoppingCartOutlined
} from "@mui/icons-material"
import { Badge } from "@mui/material"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { logout } from "redux/apiCalls"
import Styled from "styled-components"
import { mobile, smallMobile, tablet } from "../../responsive"

const Container = Styled.div`
flex: 0 0 60px;
width: 100%;
max-width: 1440px;
margin: 0 auto;
${mobile({ flex: "0 0 50px" })};
`
const Wrapper = Styled.div`
padding: 10px 20px;
display: flex;
align-items: center;
justify-content: space-between;
${tablet({ padding: "10px 0" })};
${mobile({ padding: "10px 0" })};
`
const Left = Styled.div`
  display: flex;
  align-items: center;
  max-width: 130px;
  ${smallMobile({ display: "none" })}
`
const Language = Styled.span`
font-size:14px;
cursor: pointer;
${mobile({ display: "none" })};
`
const SearchContainer = Styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  ${mobile({ marginLeft: 5 })};
  padding: 5px;
`

const Input = Styled.input`
  border: none;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  ${tablet({ fontSize: "14px" })};
  ${mobile({ fontSize: "10px", width: "100%" })};
`

const Center = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 140px;
`

const Logo = Styled.h1`
  font-weight: lighter;
  font-size: 20px;
  margin: 0;
  cursor: pointer;
  ${mobile({ fontSize: 18 })};

`
const Right = Styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  `

const MenuItem = Styled.div`
  cursor: pointer;
  margin-left: 25px;
  ${tablet({ fontSize: 24, marginLeft: 16 })};
  margin-right : ${(props) =>
    // @ts-ignore
    props.last && "14px"};
  ${mobile({ fontSize: 14, marginLeft: 6 })};
  position:relative;
  &:hover {
    background-color:rgba(0,0,0,0.2);
  }
`
const MenuInfo = Styled.div`
position:absolute;
bottom: -60px;
right:0px;
height:40px;
width: 128px;
background-color: rgb(56 57 57);
z-index:999;
display: flex;
flex-direction: column;
padding:0 10px 20px;
`
const MenuInfoItem = Styled.div`
margin: 5px 0;
font-size: 16px;
color: white;
&:hover{
  background: rgb(255, 255, 255, 0.42);
  color: white;
}
`

const Navbar = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const states = useSelector((state) => state)
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const [accountInfo, setAccountInfo] = useState(false)
  const {
    // @ts-ignore
    cart: { quantity },
    // @ts-ignore
    user: { currentUser }
  } = states
  const handleRedirect = (to = String()) => history.push(`${to}`)
  const handleLogout = () => {
    logout(dispatch)
  }
  const handleSearch = () => {
    history.push(`/products/${search}`)
    setSearch("")
  }
  const PersonOutlinedSx = {
    display: "inline-flex",
    verticalAlign: "middle"
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language> {t("siteLanguage")}</Language>
          <SearchContainer>
            <Input
              placeholder={t("navbar.search")}
              value={search}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search
              sx={{ color: "gray", fontSize: 16, cursor: "pointer" }}
              onClick={handleSearch}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={() => handleRedirect("/")}>{t("siteName")} </Logo>
        </Center>
        <Right>
          <MenuItem
            onMouseEnter={() => setAccountInfo(true)}
            onMouseLeave={() => setAccountInfo(false)}
          >
            <PersonOutlined fontSize="medium" sx={PersonOutlinedSx} />
            {Object.keys(currentUser).length
              ? accountInfo && (
                  <MenuInfo onMouseEnter={() => setAccountInfo(true)}>
                    <MenuInfoItem
                      onClick={() => {
                        history.push("/user")
                      }}
                    >
                      {t("navbar.myAccount")}
                    </MenuInfoItem>
                    <MenuInfoItem onClick={handleLogout}>
                      {t("sign.logout")}
                    </MenuInfoItem>
                  </MenuInfo>
                )
              : accountInfo && (
                  <MenuInfo onMouseEnter={() => setAccountInfo(true)}>
                    <MenuInfoItem onClick={() => handleRedirect("/register")}>
                      {t("sign.signup")}
                    </MenuInfoItem>
                    <MenuInfoItem onClick={() => handleRedirect("/login")}>
                      {t("sign.login")}
                    </MenuInfoItem>
                  </MenuInfo>
                )}
          </MenuItem>
          <MenuItem
            // @ts-ignore
            last
            onClick={() => history.push("/cart")}
          >
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
