/* eslint-disable no-underscore-dangle */
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material"
import { Skeleton } from "@mui/material"
import Loader from "components/tools/Loader"
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
  //max-height: 816px;
  position: relative;
  display: flex;
`
const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  transition: transform 450ms ease;
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
const ImgSkeleton = styled.div`
  width: calc(50vw - 30px);
  height: calc(((50vw - 30px) / (2 / 3)) - 100px);
  ${mobile({
    width: "calc(100vw - 30px)",
    height: "calc((100vw - 30px) / (2 / 3))"
  })}
  background-color: rgba(0, 0, 0, 0.2);
  max-width: 690px;
  max-height: calc((690px / (2 / 3)) - 100px);
  margin: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`
function Categories() {
  const [categories, setCategories] = useState([])
  const [slideIndex, setSlideIndex] = useState(0)
  const [autoSlide, setAutoSlide] = useState({
    state: true,
    direction: "right"
  })
  const [loading, setLoading] = useState(true)
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
  }, [autoSlide, categories.length, slideIndex, winWidth])

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
  const [searching, setSearching] = useState(false)
  const handleSearch = (state) => {
    setSearching(state)
  }
  useEffect(() => {
    publicRequest
      .get("/category?isActive=true")
      .then(async ({ data }) => {
        await setCategories([
          ...data
            .filter((category) => category.isActive)
            .map((category) => (
              <CategoryItem
                itemInfo={category}
                onSearch={handleSearch}
                key={category._id}
              />
            ))
        ])
        setLoading(false)
      })
      .catch((e) => console.error(e))
  }, [])
  const isMobile = winWidth <= 640
  const imgSkeletonSx = {
    transform: "scale(1,1)",
    borderRadius: 0,
    width: "100%",
    height: "100%"
  }
  const { current: categorySkeleton } = useRef(
    <>
      <ImgSkeleton>
        <Skeleton sx={imgSkeletonSx} />
      </ImgSkeleton>
      {!isMobile ? (
        <ImgSkeleton>
          <Skeleton sx={imgSkeletonSx} />
        </ImgSkeleton>
      ) : null}
    </>
  )
  return (
    <Container>
      {searching ? <Loader /> : null}
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined fontSize="large" sx={{ color: "teal" }} />
      </Arrow>
      <Wrapper width={100 / categories.length} slideIndex={slideIndex}>
        {loading ? categorySkeleton : categories}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined fontSize="large" sx={{ color: "teal" }} />
      </Arrow>
    </Container>
  )
}

export default Categories
