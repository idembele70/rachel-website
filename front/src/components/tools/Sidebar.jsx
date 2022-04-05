import {
  ExitToAppSharp,
  HomeSharp,
  LocalGroceryStore
} from "@mui/icons-material"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useHistory } from "react-router-dom"
import { logout } from "redux/apiCalls"
import { userRequest } from "requestMethods"
import { mobile, smallMobile, tablet } from "responsive"
import styled from "styled-components"
import Loader from "./Loader"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 311px;
  border-right: 2px solid #e5e5e5;
  ${tablet({
    height: "auto",
    maxHeight: 74,
    flexDirection: "row",
    borderBottom: "2px solid #e5e5e5"
  })};
  ${mobile({ minWidth: "initial" })}
`
const LogoContainer = styled.div`
  padding: 24px;
  height: 54px;
  border-bottom: 2px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  ${tablet({
    borderBottom: "none",
    borderRight: "2px solid #e5e5e5",
    padding: 10
  })}
  ${mobile({ padding: "0 5px" })}
`
const Logo = styled.h1`
  cursor: pointer;
  font-family: "Gill Sans", sans-serif;
  font-size: 27px;
  font-weight: lighter;
  ${mobile({ fontSize: 15 })}
`

const MainContainer = styled.div`
  padding: 35px 0;
  flex: 1;
  ${tablet({ display: "flex", padding: 10 })}
  ${mobile({ padding: 0 })}
`
const MainItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 25px;
  &:hover {
    background: #4f9ae726;
    & > * {
      color: #4f9ae7;
    }
  }
  cursor: pointer;
  & > svg {
    ${mobile({ fontSize: 18 })};
  }
  ${tablet({
    padding: 0,
    flex: 1,
    justifyContent: "center"
  })};
  &:not(:last-of-type) {
    ${tablet({ borderRight: "2px solid #e5e5e5" })}
  }
  ${mobile({
    flex: (props) => props.flex
  })}
`
const MainItemTitle = styled.h1`
  margin-left: 10px;
  font-size: 22px;
  font-weight: 500;
  ${tablet({ fontSize: 15 })};
  ${mobile({ display: "none" })};
`

export default function Sidebar() {
  const { t } = useTranslation()
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const {
    currentUser: { _id: id }
    // @ts-ignore
  } = useSelector((state) => state.user)
  return (
    <Container>
      {loading && <Loader />}
      <LogoContainer>
        <Logo onClick={() => history.push("/")}>{t("siteName")}</Logo>
      </LogoContainer>
      <MainContainer>
        <MainItem
          onClick={() => {
            if (location.pathname !== "/user") history.push("/user")
          }}
        >
          <HomeSharp />
          <MainItemTitle>{t("navbar.home")}</MainItemTitle>
        </MainItem>
        <MainItem
          onClick={() => {
            ;(async () => {
              if (location.pathname !== "/user/orders") {
                try {
                  setLoading(true)
                  const { data: orderLength } = await userRequest.get(
                    `orders/${id}?count=true`
                  )
                  history.push({
                    pathname: "/user/orders",
                    state: { orderLength }
                  })
                } catch (err) {
                  setLoading(false)
                }
              }
            })()
          }}
        >
          <LocalGroceryStore />
          <MainItemTitle>{t("navbar.orders")}</MainItemTitle>
        </MainItem>
        <MainItem onClick={() => logout(dispatch)}>
          <ExitToAppSharp />
          <MainItemTitle>{t("sign.logout")}</MainItemTitle>
        </MainItem>
      </MainContainer>
    </Container>
  )
}
