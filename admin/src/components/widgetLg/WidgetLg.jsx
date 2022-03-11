import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { userRequest } from "../../requestMethod";
import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  const [orders, setOrders] = useState([])
  useEffect(() => {
    userRequest.get("/orders")
      .then(({ data }) => setOrders(data))
      .catch(console.error)
  }, [])

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Dernières transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Client</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Montant</th>
            <th className="widgetLgTh">Statut</th>
          </tr>{
            orders.map(({ _id: id, amount, createdAt, status }) =>
              <tr key={id} className="widgetLgTr">
                <td className="widgetLgUser">
                  <img
                    src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt=""
                    className="widgetLgImg"
                  />
                  <span className="widgetLgName">{id}</span>
                </td>
                <td className="widgetLgDate">{format(createdAt)}</td>
                <td className="widgetLgAmount">{amount}</td>
                <td className="widgetLgStatus">
                  <Button type={status} />
                </td>
              </tr>)}
        </ tbody>
      </table>
    </div>
  );
}
