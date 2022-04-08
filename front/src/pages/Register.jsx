import Navbar from "components/tools/Navbar"
import { SendEmail } from "components/tools/utils"
import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useLocation } from "react-router-dom"
import { mobile, tablet } from "responsive"
import styled from "styled-components"
import { register } from "../redux/apiCalls"

const Container = styled.div`
  width: 100vw;
  ${mobile({ minHeight: "calc(100vh + 40px)" })}
  min-height: 100vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
`
const Main = styled.div`
  flex: 1;
  max-height: 100%;
  padding: 20px 0;
  border-top: 1px solid #fff;
  height: calc(100vh - 60px);
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  //background-size: cover;
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
  ${tablet({ flexDirection: "column" })}
`
const FormRow = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  display: flex;
`
const Input = styled.input`
  flex: 1;
  padding: 10px;
  width: 100%;
`
const Agreement = styled.div`
  font-size: 12px;
  line-height: 15px;
  width: 100%;
  margin: 10px 0;
`
const InputRadio = styled.input`
  margin-right: 3px;
  height: 15px;
  cursor: pointer;
  vertical-align: bottom;
  position: relative;
  bottom: 1px;
`
const InlineText = styled.span`
  line-height: 15px;
  font-size: 12px;
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
  &:disabled {
    cursor: not-allowed;
  }
`

const Error = styled.div`
  color: red;
  width: 100%;
  min-height: 20px;
  transition: opacity 400ms ease-in;
  line-height: 20px;
  margin: 10px 0 0;
  opacity: ${(props) => props.opacity};
`

const LoginButton = styled.span`
  cursor: pointer;
  padding: 5px;
  &:hover {
    background: black;
    color: white;
  }
`
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
  &:hover {
    ::after {
      width: 100%;
    }
  }
  ::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    transition: all 500ms ease-in;
    height: 2px;
    background-color: teal;
  }
`

function Register() {
  const { t } = useTranslation()
  const history = useHistory()
  const location = useLocation()
  const { isFetching, error: formError } = useSelector((state) => state.user)
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState("")
  const [isTouched, setIsTouched] = useState(false)
  const handleUpdate = (e) => {
    setError("")
    setIsTouched(false)
    const { name, value } = e.target
    setData({ ...data, [name]: value.toLowerCase() })
  }
  const [redirect, setRedirect] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setIsTouched(true)
    const { password, confirmPassword, email, confirmEmail } = data
    if (password !== confirmPassword || email !== confirmEmail) {
      if (email !== confirmEmail) setError(t("signup.email"))
      else if (password !== confirmPassword) setError(t("signup.passwordError"))
      setLoading(false)
    } else {
      const { confirmPassword: ignoredPassword, ...others } = data
      setError("")
      register(dispatch, others)
      setRedirect(true)
    }
  }
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    const { email, confirmEmail, password, confirmPassword } = data
    if (isMounted.current) {
      if (redirect && !formError && !isFetching) {
        setError("")
        SendEmail({ welcome: true, data: { email_to: data.email } })
        history.push({
          pathname: "/login",
          state: location.state
        })
      } else if (isTouched && formError) {
        if (email !== confirmEmail) setError(t("signup.email"))
        else if (password !== confirmPassword)
          setError(t("signup.passwordError"))
        else if (email === confirmEmail) setError(t("signup.emailError"))
        setLoading(false)
      }
    }
    return () => {
      isMounted.current = false
    }
  }, [
    redirect,
    formError,
    isFetching,
    history,
    location,
    isMounted,
    data,
    t,
    isTouched
  ])

  return (
    <Container>
      <Navbar />
      <Main>
        <Wrapper>
          <Title>{t("signup.title")}</Title>
          <Form onSubmit={handleRegister}>
            <FormRow>
              <Input
                required
                value={data.firstname}
                onChange={handleUpdate}
                name="firstname"
                placeholder={t("signup.firstname")}
              />
            </FormRow>
            <FormRow>
              <Input
                required
                value={data.lastname}
                onChange={handleUpdate}
                name="lastname"
                placeholder={t("signup.lastname")}
              />
            </FormRow>
            <FormRow>
              <Input
                required
                type="email"
                value={data.email}
                onChange={handleUpdate}
                name="email"
                placeholder={t("sign.email")}
              />
            </FormRow>
            <FormRow>
              <Input
                required
                type="email"
                value={data.confirmEmail}
                onChange={handleUpdate}
                name="confirmEmail"
                placeholder={t("signup.confirmEmail")}
              />
            </FormRow>
            <FormRow>
              <Input
                autoComplete="new-password"
                required
                type="password"
                value={data.password}
                onChange={handleUpdate}
                name="password"
                placeholder={t("sign.password")}
              />
            </FormRow>
            <FormRow>
              <Input
                autoComplete="new-password"
                required
                type="password"
                value={data.confirmPassword}
                onChange={handleUpdate}
                name="confirmPassword"
                placeholder={t("signup.confirmPassword")}
              />
            </FormRow>
            <Error opacity={error ? 1 : 0}>{error}</Error>
            <Agreement>
              <InputRadio type="checkbox" required />
              <InlineText>{t("signup.agreement")}</InlineText>
              <StyledLink target="_blank" to="/cgv">
                {t("signup.privacyPolicy")}
              </StyledLink>
              <InlineText>{t("signup.agreementand")}</InlineText>
              <StyledLink target="_blank" to="/cgv">
                {t("signup.generalCondition")}
              </StyledLink>
            </Agreement>
            <ButtonContainer>
              <Button disabled={isFetching && isTouched} type="submit">
                {loading && isFetching ? t("sign.loading") : t("signup.create")}
              </Button>
              <LoginButton
                onClick={() =>
                  history.push({
                    pathname: "/login",
                    state: location.state
                  })
                }
              >
                {t("signup.signin")}
              </LoginButton>
            </ButtonContainer>
          </Form>
        </Wrapper>
      </Main>
    </Container>
  )
}

export default Register

