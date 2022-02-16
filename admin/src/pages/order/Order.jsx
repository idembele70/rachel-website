import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { updateOrder } from '../../Redux/apiCalls'
import { publicRequest } from '../../requestMethod'
import './order.css'

const Order = () => {
  const [,,orderId] = useLocation().pathname.split("/")
  const order = useSelector(state => state.order.orders.find(
    ({ _id }) => _id === orderId
))
const countries = useMemo(
  () => [
    { country: "Argentina", code: "AR" },
    { country: "Australia", code: "AU" },
    { country: "Austria", code: "AT" },
    { country: "Belgium", code: "BE" },
    { country: "Bolivia", code: "BO" },
    { country: "Brazil", code: "BR" },
    { country: "Bulgaria", code: "BG" },
    { country: "Canada", code: "CA" },
    { country: "Chile", code: "CL" },
    { country: "Colombia", code: "CO" },
    { country: "Costa Rica", code: "CR" },
    { country: "Croatia", code: "HR" },
    { country: "Cyprus", code: "CY" },
    { country: "Czech Republic", code: "CZ" },
    { country: "Denmark", code: "DK" },
    { country: "Dominican Republic", code: "DO" },
    { country: "Egypt", code: "EG" },
    { country: "Estonia", code: "EE" },
    { country: "Finland", code: "FI" },
    { country: "France", code: "FR" },
    { country: "Germany", code: "DE" },
    { country: "Greece", code: "GR" },
    { country: "Hong Kong SAR China", code: "HK" },
    { country: "Hungary", code: "HU" },
    { country: "Iceland", code: "IS" },
    { country: "India", code: "IN" },
    { country: "Indonesia", code: "ID" },
    { country: "Ireland", code: "IE" },
    { country: "Israel", code: "IL" },
    { country: "Italy", code: "IT" },
    { country: "Japan", code: "JP" },
    { country: "Latvia", code: "LV" },
    { country: "Liechtenstein", code: "LI" },
    { country: "Lithuania", code: "LT" },
    { country: "Luxembourg", code: "LU" },
    { country: "Malta", code: "MT" },
    { country: "Mexico ", code: "MX" },
    { country: "Netherlands", code: "NL" },
    { country: "New Zealand", code: "NZ" },
    { country: "Norway", code: "NO" },
    { country: "Paraguay", code: "PY" },
    { country: "Peru", code: "PE" },
    { country: "Poland", code: "PL" },
    { country: "Portugal", code: "PT" },
    { country: "Romania", code: "RO" },
    { country: "Singapore", code: "SG" },
    { country: "Slovakia", code: "SK" },
    { country: "Slovenia", code: "SI" },
    { country: "Spain", code: "ES" },
    { country: "Sweden", code: "SE" },
    { country: "Switzerland", code: "CH" },
    { country: "Thailand", code: "TH" },
    { country: "Trinidad & Tobago", code: "TT" },
    { country: "United Arab Emirates", code: "AE" },
    { country: "United Kingdom", code: "GB" },
    { country: "United States", code: "US" },
    { country: "Uruguay", code: "UY" }
  ],
  []
)
const [data, setData] = useState({
  orderData : {
    products: [],
    stripeId: "",
    amount: 0,
    status : null
  },
  stripeData: {
    billing_details: { address: "", name: "", email: "", phone: "" },
    shipping: "",
    payment_method_details: { card: "" },
    created: 0
  },
});
  useEffect(() => {
    ;(async () => {
      try {
        const {data: stripeData} = await publicRequest.get(
          `/checkout/payment/intents/${order.stripeId}`
        )
        setData({orderData:order,stripeData : stripeData.charges.data[0]})
      } catch (err) {
        console.error("Error while fetching payment intent in Order.jsx admin folder", err)
      }
    })()
  }, [orderId,order])
  const dispatch = useDispatch()
  const handleUpdateStatus = (e) => {
    setData({...data,[data.orderData.status]: e.target.value})
    updateOrder(dispatch,{status: e.target.value}, orderId)
  }
  const {
    stripeData: {
      billing_details: { address, name, email, phone },
      payment_method_details: { card },
      shipping
    },
    orderData: { amount, products, status }
  } = data
  return <div className="container">
    <div className="productContainer">
          <div className="productRow">
            <h3 className="rowItem">PRODUCT</h3>
            <h3 className="rowItem">TOTAL</h3>
          </div>
          {products?.map(
            ({ product, color, size, quantity, _id: productId }) => (
              <div className="productRow" key={productId}>
                <div className="rowItemContainer">
                  <h3 className="isName">
                    {product.title} {` X${quantity}`} {"-" && size}
                  </h3>
                  <div className="colorContainer" style={{backgroundColor: color}} />
                </div>
                <h3 className="rowItem">{quantity * product.price}€</h3>
              </div>
            )
          )}
          <div className="productRow">
            <h3 className="rowItem">Subtotal</h3>
            <h3 className="rowItem">{amount}€</h3>
          </div>
          <div className="productRow">
            <h3 className="rowItem">Payment Method</h3>
            <h3 className="rowItem">{card.brand}</h3>
          </div>
          <div className="productRow">
            <h3 className="rowItem">Shipping Fee</h3>
            <h3 className="rowItem">{shipping || 0}€</h3>
          </div>
          <div className="productRow">
            <h3 className="rowItem">Total</h3>
            <h3 className="rowItem">{amount + +shipping}€</h3>
          </div>
          <div className="productRow">
            <h3 className="rowItem">Status</h3>
            <select value={status} onChange={handleUpdateStatus} >
              <option value="pending">Pending</option>
              <option value="proccessing">proccessing</option>
              <option value="send">Send</option>
            </select>
          </div>
        </div>
        <div>
          <h2 className="title">Billing Address</h2>
          <h3 className="addressRow">{name}</h3>
          <h3 className="addressRow">{address.line1}</h3>
          <h3 className="addressRow">{`${address.postal_code}, ${address.city}, ${
            countries.find((c) => c.code === address.country)?.country
          }`}</h3>
          <h3 className="addressRow">{email}</h3>
          <h3 className="addressRow">{phone}</h3>
        </div>
  </div>
}
export default Order