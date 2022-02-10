import Navbar from "components/tools/Navbar"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { mobile } from "responsive"
import styled from "styled-components"
import { register } from "../redux/apiCalls"

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile("height: calc(100vh - 50px)")}
`
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })};
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`
const Agreement = styled.span`
  font-size: 12px;
  width: 100%;
  margin: 20px 0;
`
const InputRadio = styled.input`
  margin-right: 5px;
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin: 10px 0;
  }
`

const Button = styled.button`
  width: 115px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`

const Error = styled.span`
  color: red;
`

const LoginButton = styled.span`
  cursor: pointer;
  padding: 5px;
  &:hover {
    background: black;
    color: white;
  }
`

function Register() {
  const { t } = useTranslation()
  const history = useHistory()
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  })
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState("")
  const user = useSelector((state) => state.user)

  const handleUpdate = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value.toLowerCase() })
  }

  const dispatch = useDispatch()
  const state = {
    redirectTo: history.location.state?.redirectTo === "cart" ? "cart" : "/"
  }
  const handleRegister = (e) => {
    e.preventDefault()
    const { password, confirmPassword } = data
    if (!consent || password !== confirmPassword) {
      if (!consent) setError(t("signup.agreementError"))
      else setError(t("signup.passwordError"))
    } else {
      const { confirmEmail, confirmPassword: ignoredPassword, ...others } = data
      setError("")
      register(dispatch, others)
      history.push({
        pathname: "/login",
        state
      })
    }
  }

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>{t("signup.title")}</Title>
          <Form onSubmit={handleRegister}>
            <Input
              required
              value={data.firstname}
              onChange={handleUpdate}
              name="firstname"
              placeholder={t("signup.firstname")}
            />
            <Input
              required
              value={data.lastname}
              onChange={handleUpdate}
              name="lastname"
              placeholder={t("signup.lastname")}
            />
            <Input
              required
              type="email"
              value={data.email}
              onChange={handleUpdate}
              name="email"
              placeholder={t("sign.email")}
            />
            <Input
              required
              type="email"
              value={data.confirmEmail}
              onChange={handleUpdate}
              name="confirmEmail"
              placeholder={t("signup.confirmEmail")}
            />
            <Input
              required
              type="password"
              value={data.password}
              onChange={handleUpdate}
              name="password"
              placeholder={t("sign.password")}
            />
            <Input
              required
              type="password"
              value={data.confirmPassword}
              onChange={handleUpdate}
              name="confirmPassword"
              placeholder={t("signup.confirmPassword")}
            />
            <Agreement>
              {error && (
                <>
                  <Error>{error}</Error>
                  <br />
                </>
              )}
              <InputRadio
                type="checkbox"
                checked={consent}
                onChange={() => setConsent(!consent)}
              />
              {t("signup.agreement")}
              <b> {t("signup.privacyPolicy")}.</b>
            </Agreement>
            <ButtonContainer>
              <Button type="submit">{t("signup.create")}</Button>
              <LoginButton
                onClick={() =>
                  history.push({
                    pathname: "/login",
                    state
                  })
                }
              >
                {t("signup.signin")}
              </LoginButton>
            </ButtonContainer>
          </Form>
        </Wrapper>
      </Container>
    </>
  )
}

export default Register
