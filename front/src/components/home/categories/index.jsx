/* eslint-disable no-underscore-dangle */
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material"
import React, { useEffect, useRef, useState } from "react"
import { publicRequest } from "requestMethods"
import { mobile } from "responsive"
import styled from "styled-components"
import CategoryItem from "./CategoryItem"

const Container = styled.div`
  padding: 20px 0;
  max-width: 1440px;
  overflow-x: hidden;
  margin: auto;
  max-height: 816px;
  position: relative;
  display: flex;
`
const Wrapper = styled.div`
  display: flex;
  transition: all 450ms ease;
  transform: translateX(${(props) => -props.width * props.slideIndex}%);
`
const Arrow = styled.span`
  width: 50px;
  height: 50px;
  background-color: #fcfcfc;
  border: 2px solid #000000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 20;
`
function Categories() {
  const [categories, setCategories] = useState([])
  const [slideIndex, setSlideIndex] = useState(0)
  const [autoSlide, setAutoSlide] = useState({
    state: true,
    direction: "right"
  })
  const { innerWidth: winWidth } = window
  const TimeOutRef = useRef(null)
  useEffect(() => {
    clearTimeout(TimeOutRef.current)
    if (autoSlide.state)
      TimeOutRef.current = setTimeout(() => {
        if (autoSlide.direction === "right") {
          if (slideIndex < categories.length - (winWidth <= 640 ? 1 : 2))
            setSlideIndex(slideIndex + 1)
          else setAutoSlide({ ...autoSlide, direction: "left" })
        } else if (slideIndex > 0) {
          setSlideIndex(slideIndex - 1)
        } else {
          setAutoSlide({ ...autoSlide, direction: "right" })
        }
      }, 4000)
    return () => clearTimeout(TimeOutRef.current)
  }, [autoSlide, categories.length, slideIndex])

  const handleClick = (direction) => {
    setAutoSlide({ ...autoSlide, state: false })
    clearTimeout(TimeOutRef.current)
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slideIndex)
    } else {
      setSlideIndex(
        slideIndex < categories.length - (winWidth <= 640 ? 1 : 2)
          ? slideIndex + 1
          : slideIndex
      )
    }
  }

  useEffect(() => {
    publicRequest
      .get("/category?isActive=true")
      .then(({ data }) => setCategories(data))
      .catch((e) => console.error(e))
  }, [])

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined fontSize="large" sx={{ color: "teal" }} />
      </Arrow>
      <Wrapper width={winWidth <= 640 ? 100 : 50} slideIndex={slideIndex}>
        {categories
          .filter((category) => category.isActive)
          .map((category) => (
            <CategoryItem itemInfo={category} key={category._id} />
          ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined fontSize="large" sx={{ color: "teal" }} />
      </Arrow>
    </Container>
  )
}

export default Categories
