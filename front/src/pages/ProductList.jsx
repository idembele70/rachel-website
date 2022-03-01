/* eslint-disable no-restricted-syntax */
import Products from "components/home/products"
import Announcement from "components/tools/Announcement"
import Footer from "components/tools/Footer"
import Navbar from "components/tools/Navbar"
import Newsletter from "components/tools/Newsletter"
import React from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  max-width: 1440px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`
const Main = styled.div`
  flex-grow:1;
`;
const Title = styled.h1`
  margin: 20px;
`
/* const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0 20px", display: "flex", flexDirection: "column" })};
`
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: 0 })};
`
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0" })};
`
const Option = styled.option`` */

const ProductList = () => {
  const { t } = useTranslation()

  const location = useLocation()
  const category = location.pathname.split("/")[2]

  /*   const [filters, setFilters] = useState({ colors: [], sizes: [] })
    const [color, setColor] = useState("none")
    const [size, setSize] = useState("size") */

  /* const handleFilters = (e) => {
    const { name, value } = e.target
    switch (name) {
      case "color":
        setColor(value)
        break
      case "size":
        setColor(value)
        break
      case "sort":
        setColor(value)
        break
      default:
        console.error("Error in ProductList page line 64, name not found.")
        break
    }
    setFilters({ ...filters, [name]: value })
  } */

  /*   useEffect(() => {
      // @ts-ignore
      axios
        .get(
          `http://localhost:5000/api/products${category ? `?category=${category}` : ""
          }`
        )
        .then((res) => {
          const colors = res.data
            .map((x) => x.colors)
            .flat()
            .filter((col, idx, thisArray) => thisArray.indexOf(col) === idx)
          const sizes = res.data
            .map((x) => x.sizes)
            .flat()
            .filter((sze, idx, thisArray) => thisArray.indexOf(sze) === idx)
          // @ts-ignore
          setFilters({ ...filters, colors, sizes })
        })
    }, []) */
  /*  const [sort, setSort] = useState("newest") */
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Main>
      <Title>{category}</Title>
      {/* <FilterContainer>
        <Filter>
          <FilterText>{t("products.filter.text.filterProducts")}</FilterText>
          <Select name="color" value={color} onChange={handleFilters}>
            <Option value="none">{t("products.filter.colors.color")}</Option>
            {filters.colors?.map((col) => (
              <Option key={col} value={col}>
                {col}
              </Option>
            ))}
          </Select>
          <Select name="sizes" value={size} onChange={handleFilters}>
            <Option value="size">{t("products.filter.sizes.size")}</Option>
            {filters.sizes?.map((sze) => (
              <Option key={sze} value={sze}>
                {sze}
              </Option>
            ))}
          </Select>
        </Filter>
        <Filter>
          <FilterText>{t("products.filter.text.sortProducts")}</FilterText>
          <Select
            name="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <Option value="newest">{t("products.filter.sort.newest")}</Option>
            <Option value="asc">{t("products.filter.sort.priceAsc")}</Option>
            <Option value="desc">{t("products.filter.sort.priceDesc")}</Option>
          </Select>
        </Filter>
      </FilterContainer> */}
      <Products category={category} />
      </Main>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList
