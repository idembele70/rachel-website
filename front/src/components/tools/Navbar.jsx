import {
  CloseOutlined,
  GpsFixed,
  PersonOutlined,
  Search,
  SearchOutlined,
  ShoppingCartOutlined
} from "@mui/icons-material"
import { Badge } from "@mui/material"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { logout } from "redux/apiCalls"
import { userRequest } from "requestMethods"
import styled from "styled-components"
import { mobile, smallMobile, tablet } from "../../responsive"

const Container = styled.div`
  flex: 0 0 60px;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  ${mobile({ flex: "0 0 50px" })};
`
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${tablet({ padding: "10px 0" })};
  ${mobile({ padding: "10px 0" })};
`
const Left = styled.div`
  display: flex;
  align-items: center;
  max-width: 130px;
  ${smallMobile({
    display: (props) => (props.canSearch ? "flex" : "none"),
    position: "fixed",
    top: 0,
    width: "100vw",
    maxWidth: "none",
    height: 50,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    zIndex: 1
  })}
`
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`
const SearchContainer = styled.div`
  position: relative;
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  ${mobile({ marginLeft: 5 })};
  ${smallMobile({ border: "none" })}
  height: 40px;
  &:hover {
    border: 1px solid teal;
    ${smallMobile({ border: "none" })}
  }
`

const Input = styled.input`
  border: none;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  ${tablet({ fontSize: "14px" })};
  ${mobile({ fontSize: "10px", width: "100%" })};
  ${smallMobile({ fontSize: 20, maxWidth: 200 })}
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 140px;
  ${smallMobile({ display: (props) => (props.canSearch ? "none" : "flex") })}
`

const Logo = styled.h1`
  font-weight: lighter;
  font-size: 20px;
  margin: 0;
  cursor: pointer;
  ${mobile({ fontSize: 18 })};
`
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${smallMobile({ display: (props) => (props.canSearch ? "none" : "flex") })}
`

const MenuItem = styled.div`
  cursor: pointer;
  margin-left: 25px;
  ${tablet({ fontSize: 24, marginLeft: 16 })};
  margin-right: ${(props) =>
    // @ts-ignore
    props.last && "14px"};
  ${mobile({ fontSize: 14, marginLeft: 6 })};
  position: relative;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`
const MenuInfo = styled.div`
  position: absolute;
  bottom: -60px;
  right: 0px;
  height: 40px;
  width: 128px;
  background-color: rgb(56 57 57);
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 0 10px 20px;
`
const MenuInfoItem = styled.div`
  margin: 5px 0;
  font-size: 16px;
  color: white;
  &:hover {
    background: rgb(255, 255, 255, 0.42);
    color: white;
  }
`
const SearchOptions = styled.div`
  max-height: 110px;
  left: -1px;
  right: -1px;
  background-color: rgba(0, 0, 0, 0.7);
  list-style-type: none;
  position: absolute;
  top: 41px;
  z-index: 1;
  padding: 5px;
  overflow-y: auto;
`
const SearchOption = styled.li`
  color: white;
  cursor: pointer;
  position: relative;
  &:hover {
    ::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
`
const Navbar = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const states = useSelector((state) => state)
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const [accountInfo, setAccountInfo] = useState(false)
  const [canSearch, setCanSearch] = useState(false)
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
  const [showOption, setShowOption] = useState(false)
  const handleSearch = (link) => {
    if (link || search) {
      history.push(`/products/${link || search}`)
      setSearch("")
    }
    setShowOption(false)
  }
  const [categories, setcategories] = useState([])
  const handleCategories = () => {
    setShowOption(true)
    ;(async () => {
      const { data } = await userRequest.get("/category?showCategory=true")
      setcategories(data)
    })()
  }
  const outlinedSx = {
    display: "inline-flex",
    verticalAlign: "middle"
  }
  const { innerWidth: winWidth } = window
  return (
    <Container>
      <Wrapper>
        <Left canSearch={canSearch}>
          <Language> {t("siteLanguage")}</Language>
          <SearchContainer>
            <Input
              type="search"
              placeholder={t("navbar.search")}
              value={search}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(search)}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={handleCategories}
              onBlur={() => {
                setShowOption(false)
                if (winWidth <= 360) setCanSearch(false)
              }}
            />
            <Search
              sx={{ color: "gray", fontSize: 16, cursor: "pointer" }}
              onClick={handleSearch}
            />
            {showOption && (
              <SearchOptions>
                {categories
                  .filter((category) =>
                    new RegExp(search, "gi").test(category.name)
                  )
                  .map((category) => (
                    <SearchOption
                      key={category._id} // eslint-disable-line no-underscore-dangle
                      onMouseDown={() => handleSearch(category.name)}
                    >
                      {category.name}
                    </SearchOption>
                  ))}
              </SearchOptions>
            )}
          </SearchContainer>
          {canSearch && winWidth <= 360 ? (
            <CloseOutlined
              sx={{
                zIndex: 2,
                color: "red",
                cursor: "pointer",
                "&:hover": {
                  background: "rgba(255,255,255,0.5)"
                }
              }}
              onClick={() => setCanSearch(false)}
            />
          ) : null}
        </Left>
        <Center canSearch={canSearch}>
          <Logo onClick={() => handleRedirect("/")}>{t("siteName")} </Logo>
        </Center>
        <Right canSearch={canSearch}>
          <MenuItem>
            {winWidth <= 360 ? (
              <SearchOutlined
                fontSize="medium"
                sx={outlinedSx}
                onClick={() => setCanSearch(true)}
              />
            ) : null}
          </MenuItem>
          <MenuItem
            onMouseEnter={() => setAccountInfo(true)}
            onMouseLeave={() => setAccountInfo(false)}
          >
            <PersonOutlined fontSize="medium" sx={outlinedSx} />
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
