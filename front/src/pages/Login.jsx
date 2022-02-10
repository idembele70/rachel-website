import Navbar from "components/tools/Navbar"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { login } from "redux/apiCalls"
import { mobile } from "responsive"
import styled from "styled-components"

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ height: "calc(100vh - 50px)" })}
`
const Wrapper = styled.div`
  width: 75%;
  max-width: 455px;
  padding: 20px;
  background-color: white;
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  flex: 1;
  width: 80%;
  max-width: 320px;
  margin: 10px 0;
  padding: 10px;
`
const Button = styled.button`
  width: 110px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: twhite;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: teal;
    cursor: not-allowed;
  }
`

const Error = styled.span`
  color: red;
`

const LinkStyle = {
  fontSize: "12px",
  margin: "5px 0",
  textDecoration: "underline",
  cursor: "pointer"
}

const Login = () => {
  const { t } = useTranslation()
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const dispatch = useDispatch()

  const handleUpdate = (event) =>
    setData({ ...data, [event.target.name]: event.target.value })

  // @ts-ignore
  const { isFetching, error: stateError } = useSelector((state) => state.user)
  const handleLog = (e) => {
    e.preventDefault()
    if (stateError) setError(t("signin.errorMessage"))
    else {
      setError("")
      login(dispatch, data)
    }
  }

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>{t("signin.title")}</Title>
          <Form onSubmit={handleLog}>
            <Input
              required
              name="email"
              value={data.email}
              onChange={handleUpdate}
              placeholder={t("sign.email")}
            />
            <Input
              required
              type="password"
              name="password"
              value={data.password}
              // eslint-disable-next-line no-shadow
              onChange={handleUpdate}
              placeholder={t("sign.password")}
            />
            <Button disabled={isFetching} type="submit">
              {t("signin.login")}
            </Button>
            {error && <Error>{error} </Error>}
            {/*  <Link href="/">{t("signin.forgotPassword")}</Link> */}
            <Link
              to={{ pathname: "register", state: { redirectToCart: true } }}
              style={LinkStyle}
            >
              {t("signin.newUser")}
            </Link>
          </Form>
        </Wrapper>
      </Container>
    </>
  )
}
export default Login
