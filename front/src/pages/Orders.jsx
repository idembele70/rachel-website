import Sidebar from "components/tools/Sidebar"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userRequest } from "requestMethods"
import { mobile, tablet } from "responsive"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  width: 100vw;
  ${tablet({ flexDirection: "column" })}
`

const Main = styled.div`
  flex: 4;
  height: 100vh;
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
    /* alignItems: "center",
justifyContent: "center", */
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

function Orders() {
  const {
    currentUser: { _id: id }
    // @ts-ignore
  } = useSelector((state) => state.user)
  const [orders, setOrders] = useState([])
  useEffect(() => {
    userRequest.get(`orders/${id}`).then(({ data }) => setOrders(data))
  }, [id])

  return (
    <Container>
      <Sidebar />
      <Main>
        <MainTitle>MES COMMANDES</MainTitle>
        <ItemTitleContainer>
          <ItemTitle>Les articles</ItemTitle>
          <ItemTitle>Total</ItemTitle>
          <ItemTitle>État</ItemTitle>
          <ItemTitle>Activités De commande</ItemTitle>
        </ItemTitleContainer>
        <ListBody>
          {orders.map(({ _id: orderId, products, amount, status }) => (
            <ListItem>
              <ListItemHeader>
                <HeaderHour>19 oct. 2021 18:02:14</HeaderHour>
                <HeaderOrderNumber>
                  Numéro de commande {orderId}
                </HeaderOrderNumber>
              </ListItemHeader>
              <ListItemRow>
                <RowItem>{products.length} articles</RowItem>
                <RowItem>{amount}€</RowItem>
                <RowItem>
                  <Status>{status}</Status>
                  <Button>Details de ma commande</Button>
                </RowItem>
                <RowItem>
                  <Button>Suivre</Button>
                  <Button>Renvoyez L&apos;article</Button>
                </RowItem>
              </ListItemRow>
            </ListItem>
          ))}
        </ListBody>
      </Main>
    </Container>
  )
}

export default Orders
