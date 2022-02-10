import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from "@material-ui/icons"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getCategories,deleteCategory } from "../../Redux/apiCalls"
import "./categoryList.css"
const CategoryList = () => {
  const {categories} = useSelector(state => state.category)

  const dispatch = useDispatch()
  const handleDelete = (id) => {
    deleteCategory(dispatch,id)
  }

  useEffect(() => { getCategories(dispatch) }, [dispatch])
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={`${params.row.img}`} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "isActive",
      headerName: "isActive",
      width: 190,
      renderCell: (params) => <>{params.row.isActive ? "Oui" : "Non"}</>
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/category/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={()=> handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="categoryList">
      <DataGrid
        rows={categories}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={15}
        checkboxSelection
      />
    </div>
  )
}

export default CategoryList
