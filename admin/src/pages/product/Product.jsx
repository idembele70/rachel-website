import { Box, Button, FormControl, Grid, Input, InputLabel, Modal, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Publish } from "@material-ui/icons";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Swatches from "react-color/lib/components/swatches/Swatches";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import app from "../../firebase";
import { updateProduct } from "../../Redux/apiCalls";
import uniqid from 'uniqid'
import { userRequest } from "../../requestMethod";
import "./product.css";
import {isEqual,filter,union,keys, pickBy} from 'lodash'
import { getTotalQuantity } from "../../utils/globalFunctions";
export default function Product() {
    const id = useLocation().pathname.split(/\//)[2]
    const dispatch = useDispatch()
    const product = useSelector(state => state.product.products.find(
        ({ _id }) => _id === id
    ))
    const { categories } = useSelector(state => state.category)
    const [data, setData] = useState({
        title: String(),
        quantity: Number(),
        img: String(),
        description: String(),
        categories: [],
        colors: [],
        price:Number(),
        weight:Number()
    })
    useEffect(() => {
    setData(product)
}, [product,id])
const { title, img, colors } = data
const quantity= useMemo(() => getTotalQuantity(colors), [colors])

    const handleUpdate = useCallback((e) => {
        console.log("update")
        const { name, value, files } = e.target
        if (["colors"].includes(name))
            setData(d => ({ ...d, [name]: value.split(",") }))
        else if (files) {
            const fileName = new Date().getTime() + files[0].name
            const storage = getStorage(app)
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, files[0])
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                    }
                },
                (error) => {
                    console.error("Error in New product file Line 36", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData(d => ({ ...d, [name]: downloadURL }))
                    });
                }
            );
        }
        else
            setData(d => ({ ...d, [name]: value }))
    }, [])
    const filterData =  useCallback((obj1,obj2) =>{
        const objKeys = union(keys(obj1),keys(obj2))
        const keysChanged = filter(objKeys,(key)=>
        obj1[key] !== obj2[key])
        const filteredObj = pickBy(data,(v,k)=>
        keysChanged.includes(k)
        )
        return filteredObj
    }, [data])
    const onUpdataData = useCallback((e) => {
        e.preventDefault()
        if(!isEqual(data,product)){
            const newData = filterData(data,product)
            updateProduct(dispatch, newData, id)
        }
    }, [id,product,data,dispatch,filterData])

    const [pStats, setPStats] = useState([])
    const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"]
        , [])

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("orders/income?pid=" + id)
                res.data
                    .sort((a, b) => a.year - b.year || a._id - b._id)
                    .map(
                        (item) => setPStats(
                            (prev) => [...prev, { name: MONTHS[item._id - 1], Sales: item.total }]
                        )
                    )
            } catch (error) {
                console.error("Error in useEffect in product.jsx", error);
            }
        }
        getStats()
    }, [MONTHS, id])

    const handleAddColor = ({ hex }) => {
        if (data.colors.includes(hex))
            setData({ ...data, colors: data.colors.filter(color => color.name !== hex) })
        else
            setData({ ...data, colors: [...data.colors, {_id:uniqid("RRD-"), name: hex, details: [] }] })
    }

    const handleDeleteColor = useCallback((colorName) => {
        setData({ ...data, colors: data.colors.filter(c => c.name !== colorName) })
    }, [data,setData])
    const handleDeleteSize = useCallback((id) =>{
        const colorsUpdated = colors.map(
            c=>({...c, details :c.details.filter(detail=>detail._id !== id)})
        )
        setData({...data, colors: colorsUpdated})
    },[data, colors])

    const colorColumn = useMemo(() => [
        {
            field: "size",
            headerName: "Size",
            width: 120,
        },
        {
            field: "quantity",
            headerName: "Quantity",
            width: 150,
        },
        {
            field: "action",
            headerName: "Actions",
            width: 150,
            renderCell: (params) =>
            (
                <DeleteOutline
                    className="productListDelete"
                    onClick={() => {
                        handleDeleteSize(params.row._id)
                    }} />
            )
        }
    ], [handleDeleteSize])
    const inStock = useMemo(() => colors?.find(
        c=>c?.details?.find(d=>d.quantity)
    ), [colors])
    
    const colorSx = useMemo(() => ({
        height: 10,
        width: 10,
        borderRadius: "50%",
        cursor: "pointer",
        margin: 5,
        border: "1px solid lightgray"
    }), [])
    const [cat, setCat] = useState("");
    const [showCat, setShowCat] = useState(false);
    const handleCategory = useCallback((item) => {
        const isActivated = data.categories.find(category => category === item)
        if (isActivated) {
            setData({ ...data, categories: data.categories.filter(category => category !== item) })
        } else {
            setData({ ...data, categories: [...data.categories, item] })
        }
    }, [data])
    const productSearched = useMemo(() =>
        showCat ? <div className="productSearched">
            {categories.filter(
                x => x.name.match(cat) && !(data.categories.find(category => category === x.name))
            ).map(x => <button key={x._id} className="categoryItem" onMouseDown={(e) => {
                e.preventDefault()
                setData({ ...data, categories: [...data.categories, x.name] })
                if (data.categories.length + 1 === categories.length) {
                    setShowCat(false)
                }
            }
            } >{x.name}</button>)}
        </div> : null, [showCat, cat, data, categories]
    )
    const productCategoriesRender = useMemo(() =>
        data.categories?.map(
            category =>  <div key={category} className="productCategory"><input type="checkbox"
                 name={category}
                checked={data.categories.find(x => x === category)}
                onChange={() => handleCategory(category)} />
                <label >{category}</label></div>
        ), [data, handleCategory])

    const availableColors = useMemo(() => data?.colors?.map(
        c => <div key={c._id} style={{ ...colorSx, backgroundColor: c.name }} onClick={() => handleDeleteColor(c.name)} />
    ), [data, handleDeleteColor, colorSx])
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [color, setColor] = useState({
        name: "",
        details:
        {
            size: "",
            quantity: 0,
        }
    });
    const handleColor = useCallback((e) => {
        if (e.target.name === "quantity")
            setColor(
                c => ({ ...c, details: { ...c.details, [e.target.name]: parseInt(e.target.value) } })
            )
        else
            setColor(
                c => ({ ...c, details: { ...c.details, [e.target.name]: e.target.value } })
            )
    }, [])

    const handleOpenDetailModal = useCallback(() =>
        setOpenDetailModal(true)
        , [])
    const handleCloseDetailModal = useCallback(() => setOpenDetailModal(false),[])
    const productColors = useMemo(() => colors?.map(
        (c) => (
            <Fragment key={c._id}>
                <h2>{c.name}</h2>
                <DataGrid
                    className="productDataGrid"
                    rows={c?.details?.map(
                        (detail) => ({ id: detail?._id || Date.now().toString(), ...detail })
                    )}
                    columns={colorColumn}
                    pageSize={5}
                />
                <div className="addDetail" onClick={() => {
                    handleOpenDetailModal()
                    setColor({ ...color, name: c.name })
                }}>Ajouter une taille</div>
            </Fragment>
        )

    ), [colors, handleOpenDetailModal, colorColumn]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmitSize = useCallback((e) => {
        e.preventDefault()
        const currentColor = colors.find(c => c.name === color.name)
        if (currentColor.details.every(detail => detail.size !== color.details.size)) {

            const newColors = data.colors.map(
                c => c.name === color.name ? { ...c, details: [...c.details,  color.details] } : c
            )
            setData({
                ...data, colors: newColors
            })
        } else {
            const updatedColors = data.colors.map(
                c=>{
                    if(c.name === color.name)
                       return {...c,details:c.details.map(
                            d=>{
                                if(d.size === color.details.size)
                                    return {...d, quantity : color.details.quantity} 
                                return d
                            }
                        )}
                    return c
                }
            )
            setData({
                ...data,colors: updatedColors
            })
        }
        setColor({
            name: "",
            details:
            { size: "",
              quantity: 0,
            }
        })
        handleCloseDetailModal()

    },[data,handleCloseDetailModal,color,colors])

    return (
        <div className="product">
            <Modal
                open={openDetailModal}
                onClose={handleCloseDetailModal}
                aria-labelledby="add-color-detail"
                aria-describedby="add-color-detail-size-and-quantity"
                className="add-color-modal"
            >
                <Box className="addColorModalBox">
                    <Typography id="add-color-detail-title" component="h5">
                        Ajout de details
                    </Typography>
                    <form onSubmit={handleSubmitSize}>
                        <Grid container spacing={1} alignItems="center" direction="column" justify="center">
                            <Grid item>
                                <FormControl variant="standard">
                                    <InputLabel >Size</InputLabel>
                                    <Input required className="modal-input" name="size" type="text" value={color.size} onChange={handleColor} />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl variant="standard">
                                    <InputLabel>Quantity</InputLabel>
                                    <Input required className="modal-input" name="quantity" type="number" value={color.quantity} onChange={handleColor} />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained">
                                    Ajouter
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
            <div className="productTitleContainer">
                <h1 className="productTitle">Produit</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Créer</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={img} alt="" className="productInfoImg" />
                        <span className="productName">{title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">identifiant: </span>
                            <span className="productInfoValue">{`${id}`}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">ventes:</span>
                            <span className="productInfoValue">{pStats.reduce(
                                (acc, cur) => acc + cur.Sales, 0
                            )}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">En stock:</span>
                            <span className="productInfoValue">{inStock ? "Oui" : "Non"}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Quantité:</span>
                            <span className="productInfoValue">{quantity}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Nom du produit</label>
                        <input name="title" type="text" value={data.title} onChange={handleUpdate} />
                        <label>Description</label>
                        <textarea name="description" cols="5" rows="3" value={data.description} onChange={handleUpdate} ></textarea>
                        <label>catégories</label>
                        <div className="searchContainer">
                            <input onFocus={() => data.categories.length < categories.length && setShowCat(true)} onBlur={() => setShowCat(false)} type="search" value={cat} onChange={(e) => { setCat(e.target.value); setShowCat(true) }} />
                            {productSearched}
                        </div>
                        <div className="productCategoryContainer">
                            {productCategoriesRender}
                        </div>
                        <label>Poids</label>
                        <input type="number" name="weight" value={data.weight} onChange={handleUpdate} />
                    </div>
                    <div className="productFormCenter">
                        <label>prix</label>
                        <input name="price" type="number" value={data.price} onChange={handleUpdate} />
                        <label>couleurs</label>
                        <Swatches name="colors" onChange={handleAddColor} className="colorPicker" height={150} />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={img} alt="" className="productUploadImg" />
                            <label htmlFor="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" name="img" onChange={handleUpdate} style={{ display: "none" }} />
                        </div>
                        <div>
                            <h4>Couleurs Disponible</h4>
                            <div style={{ display: "flex" }}>
                                {availableColors}
                            </div>
                        </div>
                        <button className="productButton" onClick={onUpdataData}>Mettre à jour</button>
                    </div>
                    <div className="productFormColor">
                        {
                            productColors
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

