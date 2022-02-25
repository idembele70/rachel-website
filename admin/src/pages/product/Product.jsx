import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { updateProduct } from "../../Redux/apiCalls";
import { userRequest } from "../../requestMethod";
import { ref, getDownloadURL, uploadBytesResumable, getStorage } from 'firebase/storage'
import app from "../../firebase"
import Swatches from "react-color/lib/components/swatches/Swatches";
import styled from "styled-components";


export default function Product() {
    const id = useLocation().pathname.split(/\//)[2]
    const dispatch = useDispatch()
    const { title, quantity, img, description, categories: productCategories, sizes, colors, price, weight } = useSelector(state => state.product.products.find(
        ({ _id }) => _id === id
    ))
    const { categories } = useSelector(state => state.category)
    const [data, setdata] = useState({
        title,
        quantity,
        img,
        description,
        categories: productCategories,
        sizes,
        colors,
        price,
        weight
    })
    const handleUpdate = (e) => {
        const { name, value, files } = e.target
        if (["sizes", "colors"].includes(name))
            setdata(d => ({ ...d, [name]: value.split(",") }))
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
                        setdata(d => ({ ...d, [name]: downloadURL }))
                    });
                }
            );
        }
        else
            setdata(d => ({ ...d, [name]: value }))
    }
    const onUpdataData = (e) => {
        e.preventDefault()
        updateProduct(dispatch, { ...data, categories: data.categories.map(x => x._id) }, id)
    }

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
            setdata({ ...data, colors: data.colors.filter(color => color !== hex) })
        else
            setdata({ ...data, colors: [...data.colors, hex] })
    }

    const handleDeleteColor = (color) => {
        setdata({ ...data, colors: data.colors.filter(c => c !== color) })
    }

    const colorSx = {
        height: 10,
        width: 10,
        borderRadius: "50%",
        cursor: "pointer",
        margin: 5,
        border: "1px solid lightgray"
    }
    const [cat, setCat] = useState("");
    const [showCat, setShowCat] = useState(false);
    const handleCategory = (item) => {
        const isActivated = data.categories.find(category => category.name === item.name)
        console.log(data.categories.length)
        if (isActivated) {
            setdata({ ...data, categories: data.categories.filter(category => category.name !== item.name) })
        } else {
            setdata({ ...data, categories: [...data.categories, item] })
        }
    }

    return (
        <div className="product">
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
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{` ${id}`}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">ventes:</span>
                            <span className="productInfoValue">{pStats.reduce(
                                (acc, cur) => acc + cur.Sales, 0
                            )}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">En stock:</span>
                            <span className="productInfoValue">{quantity ? "Oui" : "Non"}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Quantity:</span>
                            <span className="productInfoValue">{data.quantity}</span>
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
                        <label>categories</label>
                        <div className="searchContainer">
                            <input onFocus={() => data.categories.length < categories.length && setShowCat(true)} onBlur={() => setShowCat(false)} type="search" value={cat} onChange={(e) => { setCat(e.target.value); setShowCat(true) }} />
                            {showCat && <div className="productSearched">
                                {categories.filter(
                                    x => x?.name?.match(cat) && !(data.categories.find(category => category.name === x.name))
                                ).map(x => <button key={x.name} className="categoryItem" onMouseDown={(e) => {
                                    e.preventDefault()
                                    setdata({ ...data, categories: [...data.categories, x] })

                                    if (data.categories.length + 1 === categories.length) {
                                        setShowCat(false)
                                    }
                                }
                                } >{x.name}</button>)}
                            </div>}
                        </div>
                        <div className="productCategoryContainer">
                            {data.categories?.map(
                                category => <div className="productCategory"><input type="checkbox"
                                    key={category.name} name={category.name}
                                    checked={data.categories.find(x => x.name === category.name)}
                                    onChange={() => handleCategory(category)} />
                                    <label >{category.name}</label></div>
                            )}
                        </div>
                        <label>Tailles</label>
                        <textarea name="sizes" cols="5" rows="3" value={data.sizes} onChange={handleUpdate} ></textarea>
                        <label>Poids</label>
                        <input type="number" name="weight" value={data.weight} onChange={handleUpdate} />
                    </div>
                    <div className="productFormCenter">
                        <label>prix</label>
                        <input name="price" type="number" value={data.price} onChange={handleUpdate} />
                        <label>Quantité</label>
                        <input name="quantity" type="number" value={data.quantity} onChange={handleUpdate} />
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
                                {data?.colors.map(
                                    color => <div key={color} style={{ ...colorSx, backgroundColor: color }} onClick={() => handleDeleteColor(color)} />
                                )}
                            </div>
                        </div>
                        <button className="productButton" onClick={onUpdataData}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

