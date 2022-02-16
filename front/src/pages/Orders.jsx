import Sidebar from "components/tools/Sidebar"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { userRequest } from "requestMethods"
import { mobile, tablet } from "responsive"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  ${tablet({ flexDirection: "column" })}
`

const Main = styled.div`
  position: relative;
  flex: 4;
  background-color: #fff;
  padding: 10px;
`
const MainTitle = styled.h1`
  text-align: center;
  margin-bottom: 45px;
`
const ItemTitleContainer = styled.div`
  background-color: #f5f5f5;
  display: flex;
  padding: 0 15px;
  margin-bottom: 15px;
  ${mobile({ display: "none" })}
`
const ItemTitle = styled.h4`
  flex: 1;
  text-align: center;
  color: #666;
`
const ListBody = styled.ul`
  height: 150px;
  width: 100%;
  padding: 0;
`
const ListItem = styled.li`
  list-style-type: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e5e5;
  ${mobile({ height: "auto", marginBottom: 20 })}
`
const ListItemHeader = styled.div`
  background-color: rgba(248, 248, 248, 0.75);
  flex: 0 1 28px;
  color: #767676;
  ${mobile({ display: "flex", flexDirection: "column" })}
`
const HeaderHour = styled.span`
  margin-right: 10px;
  margin-left: 21px;
`
const HeaderOrderNumber = styled.span`
  ${mobile({ marginLeft: 21 })}
`
const ListItemRow = styled.div`
  flex: 1;
  display: flex;
  padding: 0 10px;
  ${mobile({
    flexDirection: "column",
    padding: 0
  })}
`
const RowItem = styled.div`
  flex: 1;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:not(:last-of-type) {
    border-right: 1px solid #e5e5e5;
    ${mobile({
      borderRight: "none",
      borderBottom: "2px solid #e5e5e5"
      /* maxWidth: 150 */
    })}
  }
`
const Status = styled.span``
const Button = styled.div`
  padding: 4px;
  border: 1px solid #222;
  margin-bottom: 5px;
  margin-top: 5px;
  color: #999;
  text-align: center;
  max-width: 80%;
  &:hover {
    background: black;
    color: white;
    cursor: pointer;
  }
  ${tablet({ padding: 2 })}
`
const EmptyOrderContainer = styled.div`
  position: absolute;
  width: fit-content;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  ${tablet({ margin: "20px 0", position: "fixedfixed" })}
`
const EmptyOrderTitle = styled.h2`
  text-align: center;
  ${mobile({ fontSize: 20 })}
`
function Orders() {
  const {
    currentUser: { _id: id }
    // @ts-ignore
  } = useSelector((state) => state.user)
  const [orders, setOrders] = useState([])
  useEffect(() => {
    userRequest.get(`orders/${id}`).then(({ data }) => setOrders(data))
  }, [id])
  const { t } = useTranslation()
  const convertDate = (date) => {
    const [y, m, d, hour] = date.split(/[-T.]/gi)
    return `${d}/${m}/${y} ${hour}`
  }
  const history = useHistory()
  return (
    <Container>
      <Sidebar />
      <Main>
        <MainTitle>{t("user.orders.title")}</MainTitle>
        {orders.length ? (
          <>
            <ItemTitleContainer>
              <ItemTitle>{t("user.orders.itemTitle")}</ItemTitle>
              <ItemTitle>{t("user.orders.total")}</ItemTitle>
              <ItemTitle>{t("user.orders.itemState")}</ItemTitle>
              <ItemTitle>{t("user.orders.activity")}</ItemTitle>
            </ItemTitleContainer>
            <ListBody>
              {orders.map(
                ({ _id: orderId, createdAt, products, amount, status }) => (
                  <ListItem key={orderId}>
                    <ListItemHeader>
                      <HeaderHour>{convertDate(createdAt)}</HeaderHour>
                      <HeaderOrderNumber>
                        {t("user.orders.orderNumber")} {orderId}
                      </HeaderOrderNumber>
                    </ListItemHeader>
                    <ListItemRow>
                      <RowItem>
                        {products.length} {t("user.orders.article")}
                      </RowItem>
                      <RowItem>
                        {amount}
                        {t("currency")}
                      </RowItem>
                      <RowItem>
                        <Status>{t(`user.orders.${status}`)}</Status>
                        <Button
                          onClick={() => history.push(`/user/order/${orderId}`)}
                        >
                          {t("user.orders.orderDetail")}
                        </Button>
                      </RowItem>
                      <RowItem>
                        <Button>{t("user.orders.follow")}</Button>
                        <Button>{t("user.orders.return")}</Button>
                      </RowItem>
                    </ListItemRow>
                  </ListItem>
                )
              )}
            </ListBody>
          </>
        ) : (
          <EmptyOrderContainer>
            <EmptyOrderTitle>{t("user.orders.empty")}</EmptyOrderTitle>
          </EmptyOrderContainer>
        )}
      </Main>
    </Container>
  )
}

export default Orders
