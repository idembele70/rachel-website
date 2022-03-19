import { Skeleton } from "@mui/material"
import Sidebar from "components/tools/Sidebar"
import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { userRequest } from "requestMethods"
import { mobile, tablet } from "responsive"
import styled from "styled-components"
import Modal from "../components/tools/Modal"

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
const ListItemHeaderSkeleton = styled(Skeleton)`
  && {
    flex: 0 1 28px;
    transform: scale(1);
    border-radius: 0;
  }
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

const RowItemSkeleton = styled(Skeleton)`
  && {
    border-radius: 0;
    transform: scale(1);
    width: 50%;
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
const RowItemBtnSkeleton = styled(Skeleton)`
  && {
    transform: scale(1);
    border-radius: 0;
    padding: 4px;
    display: block;
    margin-bottom: 5px;
    margin-top: 5px;
    width: 80%;
  }
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
const Tracking = styled.h4`
  color: black;
  margin: 20px;
`
const Link = styled.a`
  display: block;
  color: white;
  background-color: black;
  padding: 15px;
  text-decoration: none;
  transition-duration: 150ms;
  transition-property: background color;
  transition-timing-function: ease-in-out;
  transition-delay: 50ms;
  &:hover {
    color: black;
    background-color: rgba(0, 0, 0, 0.426);
  }
`
function Orders() {
  const {
    currentUser: { _id: id }
    // @ts-ignore
  } = useSelector((state) => state.user)
  const [orders, setOrders] = useState([])
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const skeleton = useRef(
    Array(location.state?.orderLength)
      .fill("")
      .map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <ListItem key={idx}>
          <ListItemHeader>
            <ListItemHeaderSkeleton />
          </ListItemHeader>
          <ListItemRow>
            <RowItem>
              <RowItemSkeleton />
            </RowItem>
            <RowItem>
              <RowItemSkeleton />
            </RowItem>
            <RowItem>
              <RowItemSkeleton />
              <RowItemBtnSkeleton />
            </RowItem>
            <RowItem>
              <RowItemSkeleton />
              <RowItemSkeleton style={{ marginTop: 5 }} />
            </RowItem>
          </ListItemRow>
        </ListItem>
      ))
  )
  useEffect(() => {
    userRequest.get(`orders/${id}`).then(({ data }) => {
      setOrders(data)
      setLoading(false)
    })
  }, [id])
  const { t } = useTranslation()
  const convertDate = (date) => {
    const [y, m, d, hour] = date.split(/[-T.]/gi)
    return `${d}/${m}/${y} ${hour}`
  }
  const history = useHistory()
  const [copy, setCopy] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState(null)
  const [sentBack, setSentBack] = useState(false)
  const handleCopy = () => {
    if (sentBack) navigator.clipboard.writeText(t("email"))
    else navigator.clipboard.writeText(trackingNumber)
    setCopy(true)
  }
  const [openModal, setOpenModal] = useState(false)
  const handleClose = () => {
    setOpenModal(false)
    setCopy(false)
    setSentBack(false)
  }
  const handleOrdersDetails = ({ orderId, productsLength }) => {
    history.push({
      pathname: `/user/order/${orderId}`,
      state: { productsLength }
    })
  }
  if (loading && location.state?.orderLength) {
    return (
      <Container>
        <Sidebar />
        <Main>
          <MainTitle>{t("user.orders.title")}</MainTitle>
          <ItemTitleContainer>
            <ItemTitle>{t("user.orders.itemTitle")}</ItemTitle>
            <ItemTitle>{t("user.orders.total")}</ItemTitle>
            <ItemTitle>{t("user.orders.itemState")}</ItemTitle>
            <ItemTitle>{t("user.orders.activity")}</ItemTitle>
          </ItemTitleContainer>
          <ListBody>{skeleton.current}</ListBody>
        </Main>
      </Container>
    )
  }
  return (
    <Container>
      {openModal && (
        <Modal
          onClose={handleClose}
          onCopy={handleCopy}
          title={
            sentBack ? t("user.orders.sentBack") : t("user.orders.trackingInfo")
          }
          copy={copy}
          canCopy={trackingNumber || sentBack}
        >
          {trackingNumber ? (
            <>
              <Tracking>
                {t("user.orders.trackingNumber") + trackingNumber}
              </Tracking>
              <Link
                target="_blank"
                href={`https://www.laposte.fr/outils/suivre-vos-envois?code=${trackingNumber}`}
              >
                {t("user.orders.laposte")}
              </Link>
            </>
          ) : (
            <>{sentBack ? t("email") : t("user.orders.isBeingPrepared")}</>
          )}
        </Modal>
      )}
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
                ({
                  _id: orderId,
                  createdAt,
                  products,
                  amount,
                  status,
                  shippingPrice,
                  trackingNumber: trackNum
                }) => (
                  <ListItem key={orderId}>
                    <ListItemHeader>
                      {loading ? (
                        // @ts-ignore
                        <ListItemHeaderSkeleton />
                      ) : (
                        <>
                          <HeaderHour>{convertDate(createdAt)}</HeaderHour>
                          <HeaderOrderNumber>
                            {t("user.orders.orderNumber")} {orderId}
                          </HeaderOrderNumber>
                        </>
                      )}
                    </ListItemHeader>
                    <ListItemRow>
                      <RowItem>
                        {loading ? (
                          <RowItemSkeleton />
                        ) : (
                          `${products.length} ${t("user.orders.article")}`
                        )}
                      </RowItem>
                      <RowItem>
                        {loading ? (
                          <RowItemSkeleton />
                        ) : (
                          `${amount + shippingPrice}${t("currency")}`
                        )}
                      </RowItem>
                      <RowItem>
                        {loading ? (
                          <>
                            <RowItemSkeleton />
                            <RowItemBtnSkeleton />
                          </>
                        ) : (
                          <>
                            <Status>{t(`user.orders.${status}`)}</Status>
                            <Button
                              onClick={() =>
                                handleOrdersDetails({
                                  orderId,
                                  productsLength: products.length
                                })
                              }
                            >
                              {t("user.orders.orderDetail")}
                            </Button>
                          </>
                        )}
                      </RowItem>
                      <RowItem>
                        {loading ? (
                          <>
                            <RowItemSkeleton />
                            {trackNum && (
                              <RowItemSkeleton style={{ marginTop: 5 }} />
                            )}
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={() => {
                                setOpenModal(true)
                                setTrackingNumber(trackNum)
                              }}
                            >
                              {t("user.orders.follow")}
                            </Button>
                            {trackNum && (
                              <Button
                                onClick={() => {
                                  setOpenModal(true)
                                  setSentBack(true)
                                }}
                              >
                                {t("user.orders.return")}
                              </Button>
                            )}
                          </>
                        )}
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
