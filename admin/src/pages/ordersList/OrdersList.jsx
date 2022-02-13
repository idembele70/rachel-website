
import { useEffect } from 'react'
import {DataGrid} from '@material-ui/data-grid'
import { getOrders } from '../../Redux/apiCalls'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import './orderList.css'

export default function OrdersList () {
  const { orders } = useSelector(state=>state.order)
  const dispatch= useDispatch()
  useEffect(() => {
    getOrders(dispatch)
  }, [dispatch])
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "number of product",
      headerName: "number of product",
      width: 250,
      renderCell: (params) => <>{params.row.products.length}</>
    },
    {
      field: "Total",
      headerName: "Total",
      width: 150,
      renderCell: (params) => <>{`${params.row.amount}€`}</>
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
            <Link to={`/order/${params.row._id}`}>
              <button className="orderListEdit">Edit</button>
            </Link>
        );
      },
    },
  ];
  return <div className="orderList">
  <DataGrid
    rows={orders}
    disableSelectionOnClick
    columns={columns}
    getRowId={(row) => row._id}
    pageSize={15}
    checkboxSelection
  />
</div>
}