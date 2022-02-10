import { useEffect, useMemo, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { userRequest } from "../../requestMethod";
import "./home.css";

export default function Home() {
  const [userData, setUserData] = useState([])
  const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"]
    , [])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await userRequest.get("/users/stats")

        data.sort((a, b) => a.year - b.year).map(
          item => setUserData(
            prev => [...prev, { name: MONTHS[item._id - 1], "Active User": item.total }]
          )
        )
      } catch (error) {
        console.log("Error while fetching data in Home.jsx:", error)
      }
    })()
  }, [MONTHS])
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
