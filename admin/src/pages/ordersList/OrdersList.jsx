
import { DataGrid } from '@material-ui/data-grid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrders } from '../../Redux/apiCalls'
import './orderList.css'

export default function OrdersList() {
  const { orders } = useSelector(state => state.order)
  const dispatch = useDispatch()
  useEffect(() => {
    getOrders(dispatch)
  }, [dispatch])
  const convertDate = (date) => {
    const [y,m,d,h,min] = date.split(/[-T:]/)
     return`${d}/${m}/${y} ${h}:${min}`
  }
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 200
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) =>
        <span className={`status ${params.row.status}`}>{params.row.status}</span>
    },
    {
      field: "operator",
      headerName: "operator",
      width: 150,
      renderCell: (params) => <>{`${params.row.user?.firstname} ${params.row.user?.firstname}`}</>
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 150,
      renderCell: (params) => <>{`${convertDate(params.row.createdAt)}`}</>
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