import React from "react"
import styled from "styled-components"
import Main from "components/user/Main"
import { tablet } from "responsive"
import Sidebar from "../components/tools/Sidebar"

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  ${tablet({ flexDirection: "column" })}
`
const User = () => (
  <Container>
    <Sidebar />
    <Main />
  </Container>
)

export default User
