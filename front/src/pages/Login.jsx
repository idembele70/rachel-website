import { Visibility, VisibilityOff } from "@mui/icons-material"
import Navbar from "components/tools/Navbar"
import React, { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { login } from "redux/apiCalls"
import { mobile } from "responsive"
import styled from "styled-components"

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
const Main = styled.div`
  flex: 1;
  max-height: calc(100vh - 60px);
  ${mobile({ height: "calc(100vh - 50px)" })}
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 75%;
  max-width: 455px;
  padding: 20px;
  background-color: white;
  margin-top: 10%;
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const FormRow = styled.div`
  flex: 1;
  width: 80%;
  max-width: 340px;
  margin: 10px 0;
  position: relative;
  display: flex;
`
const Input = styled.input`
  flex: 1;
  padding: 10px;
`
const StyledVisibility = styled(({ component, ...props }) =>
  React.cloneElement(component, props)
)`
  position: absolute;
  right: 0%;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
const Button = styled.button`
  width: 110px;
  border: none;
  line-height: 46px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    text-transform: uppercase;
    cursor: not-allowed;
  }
`

const Error = styled.div`
  width: 100%;
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
  opacity: ${(props) => props.opacity};
`

const StyledLink = styled(Link)`
  font-size: 12px;
  margin: 5px 0;
  padding: 5px;
  text-decoration: none;
  color: black;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
`

const Login = () => {
  const { t } = useTranslation()
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const location = useLocation()
  const dispatch = useDispatch()
  const [isTouched, setIsTouched] = useState(false)
  const handleUpdate = (event) => {
    const { value, name } = event.target
    if (name === "email") setData({ ...data, [name]: value })
    else setData({ ...data, [name]: value })
  }
  const [hidePassword, setHidePassword] = useState(true)
  // @ts-ignore
  const { isFetching, error: errorForm } = useSelector((state) => state.user)
  const [error, setError] = useState(false)
  const handleLog = (e) => {
    e.preventDefault()
    setIsTouched(true)
    login(dispatch, data)
  }
  const handleVisibility = () => setHidePassword(!hidePassword)
  
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    if (isMounted.current) {
      if (errorForm && isTouched) setError(true)
      else setError(false)
    }
    return () => {
      isMounted.current = false
    }
  }, [errorForm, data, isTouched])
  return (
    <Container>
      <Navbar />
      <Main>
        <Wrapper>
          <Title>{t("signin.title")}</Title>
          <Form onSubmit={handleLog}>
            <FormRow aria-label="email">
              <Input
                type="email"
                required
                name="email"
                value={data.email}
                onChange={handleUpdate}
                placeholder={t("sign.email")}
              />
            </FormRow>
            <FormRow>
              <Input
                required
                type={hidePassword ? "password" : "text"}
                name="password"
                value={data.password}
                // eslint-disable-next-line no-shadow
                onChange={handleUpdate}
                placeholder={t("sign.password")}
              />
              {hidePassword ? (
                <StyledVisibility
                  onClick={handleVisibility}
                  component={<Visibility />}
                />
              ) : (
                <StyledVisibility
                  onClick={handleVisibility}
                  component={<VisibilityOff />}
                />
              )}
            </FormRow>
            <Error opacity={error ? 1 : 0}>{t("signin.errorMessage")}</Error>
            <Button disabled={isFetching && isTouched.current} type="submit">
              {isFetching ? t("sign.loading") : t("signin.login")}
            </Button>
          </Form>
          <StyledLink to={{ pathname: "register", state: location.state }}>
            {t("signin.newUser")}
          </StyledLink>
        </Wrapper>
      </Main>
    </Container>
  )
}
export default Login
