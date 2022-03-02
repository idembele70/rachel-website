import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../Redux/apiCalls";

export default function ProductList() {
  const { products } = useSelector(state => state.product)
  const dispatch = useDispatch()
  const handleDelete = (id) => {
    deleteProduct(dispatch, id)
  };
  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])

  const columns = [
    { field: "_id", headerName: "Identifiant", width: 90 },
    {
      field: "product",
      headerName: "Produit",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={`${params.row.img}`} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Quantité",
      width: 150,
      renderCell: (params) => <>{params.row.quantity ? "Oui" : "Non"}</>
    },
    {
      field: "price",
      headerName: "Prix",
      width: 150,
      renderCell: (params) => <>{`${params.row.price}€`}</>
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Modifier</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];


  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={15}
        checkboxSelection
      />
    </div>
  );
}
