import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import app from '../../firebase';
import { addProduct } from "../../Redux/apiCalls";
import "./newProduct.css";
export default function NewProduct() {
  const [product, setproduct] = useState({
    title: String(),
    description: String(),
    img: String(),
    categories: "",
    sizes: "",
    colors: "",
    price: "",
    quantity: 0
  })
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setproduct({ ...product, [name]: files[0] })
    }
    else
      setproduct({ ...product, [name]: value })
  }
  const { title,
    description,
    categories,
    img,
    sizes,
    colors,
    price,
    quantity } = product

  const dispatch = useDispatch()
  const handleCreate = (e) => {
    e.preventDefault()
    const fileName = new Date().getTime() + img.name
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, img)
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        // Handle unsuccessful uploads
        console.error("Error in New product file Line 66", error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const toArray = (str = String()) => str.split(/,/).filter(x => x !== "")
          const newProduct = {
            ...product, img: downloadURL,
            categories: toArray(categories),
            sizes: toArray(sizes),
            colors: toArray(colors),
            quantity
          }
          addProduct(dispatch, newProduct)
        });
      }
    );
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Nouveau Produit</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label htmlFor="title">Nom</label>
          <input name="title" type="text" value={title} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label htmlFor="description">Description</label>
          <textarea name="description" cols="10" rows="3" value={description} onChange={handleChange} ></textarea>
        </div>
        <div className="addProductItem">
          <label htmlFor="categories">Categories{" (separer par un virgule)"}</label>
          <textarea name="categories" cols="10" rows="3" value={categories} onChange={handleChange} ></textarea>
        </div>
        <div className="addProductItem">
          <label htmlFor="img">Image</label>
          <input name="img" type="file" accept=".jpg,.png,.jpeg" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label htmlFor="price">Prix</label>
          <input name="price" type="number" value={price} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label htmlFor="sizes">Tailles{" (separer par un virgule)"}</label>
          <textarea name="sizes" cols="10" rows="3" value={sizes} onChange={handleChange} ></textarea>
        </div>
        <div className="addProductItem">
          <label htmlFor="colors">Couleurs{" (separer par un virgule)"}</label>
          <textarea name="colors" cols="10" rows="3" value={colors} onChange={handleChange} ></textarea>
        </div>
        <div className="addProductItem">
          <label htmlFor="quantity">quantité</label>
          <input name="quantity" value={quantity} onChange={handleChange} />
        </div>
        <button className="addProductButton" onClick={handleCreate}>Creé</button>
      </form>
    </div>
  );
}
