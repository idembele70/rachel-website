import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
export default function FeaturedInfo() {
  const [incomes, setIncomes] = useState([])
  const [percentage, setPercentage] = useState("")
  const month = new Date().getMonth() + 1

  const toPercent = (data = []) => {
    const { total: sum } = data.find(t => t._id === month)
    const { total: prevSum } = data.find(t => t._id !== month)
    const totalPercent = Math.round(sum * 100 / prevSum - 100)
    setPercentage(`${totalPercent}%`)
  }


  useEffect(() => {
    const getIncome = async () => {
      try {
        const { data } = await userRequest.get('/orders/income')
        setIncomes(data)
        if (data) {
          toPercent(data)
        }
      } catch (error) {
        console.error("Error in Featuredinfo.jsx ==>", error);
      }
    }
    getIncome()
  }, [])

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{incomes.find(
            ({ _id: id }) => id === month)?.total || 0}</span>
          <span className="featuredMoneyRate">
            {percentage} {
              /-/.test(percentage) ? <ArrowDownward className="featuredIcon negative" /> : <ArrowUpward className="featuredIcon" />}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
