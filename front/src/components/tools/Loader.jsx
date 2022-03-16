import { CircularProgress } from "@mui/material"
import styled from "styled-components"
import React from "react"

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
`
export default function Loader() {
  const loaderSx = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 3
  }
  return (
    <Container>
      <CircularProgress sx={loaderSx} />
    </Container>
  )
}
