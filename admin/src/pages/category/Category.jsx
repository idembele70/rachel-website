import { Publish } from '@material-ui/icons'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import app from '../../firebase'
import { updateCategory } from '../../Redux/apiCalls'
import "./category.css"
function Category() {
  const id = useLocation().pathname.split('/')[2]
  const category = useSelector(state => state.category.categories.find(cat => cat._id === id))
  const [data, setData] = useState({
    name: String(),
    img: String(),
    isActive: Boolean()
  })

  useEffect(() => {
    /* const { name, img, isActive } =  */
    setData(category)
  }, [category, id])

  const handleChange = (e) => {
    const { name, files, value, checked } = e.target
    switch (name) {
      case "img":
        setData({ ...data, [name]: files[0] })
        break;
      case "isActive":
        setData({ ...data, [name]: checked })
        break;
      default:
        setData({ ...data, [name]: value })
        break;
    }
  }
  const dispatch = useDispatch()
  const handleUpdate = (e) => {
    e.preventDefault()
    if (data.img) {
      const fileName = new Date().getTime() + data.img.name
      const storage = getStorage(app)
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, data.img)
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
            updateCategory(dispatch, { ...data, img: downloadURL }, id)
          })
        }
      );
    }
    else
      updateCategory(dispatch, data, id)
  }

  const { name, img, isActive } = data
  return (
    <div className="category">
      <div className="categoryTitleContainer">
        <h1 className="categoryTitle">Category</h1>
        <Link to="newcategory">
          <button className="categoryAddButton">Create</button>
        </Link>
      </div>
      <div className="categoryFormContainer">
        <form onSubmit={handleUpdate} className="categoryForm">
          <div className="categoryFormItem">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" value={name}
              onChange={handleChange} />
          </div>
          <div className="categoryFormItem">
            <div className="categoryUpload">
              <img src={img} alt={name} className="categoryUploadImg" />
              <label htmlFor="img"><Publish style={{ cursor: "pointer" }} /></label>
              <input id="img" type="file" name="img" accept=".jpeg,.jpg,.png"
                onChange={handleChange} style={{ display: "none" }} />
            </div>
          </div>
          <div className="categoryFormItem">
            <label htmlFor="isActive" >isActive</label>
            <input id="isActive" type="checkbox" name="isActive" checked={isActive}
              onChange={handleChange} />
          </div>
          <button className="categoryButton">Update</button>
        </form>
      </div>
    </div>
  )
}

export default Category
