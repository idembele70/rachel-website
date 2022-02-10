import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import react from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import app from "../../firebase"
import { addCategory } from "../../Redux/apiCalls"
import "./newCategory.css"
export default function NewCategory() {
  const [data, setData] = useState({ name: "", img: "", isActive: false })
  const history = useHistory()
  const handleUpdate = (e) => {
    const { name, value, files, checked } = e.target
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
  const handleCreate = (e) => {
    e.preventDefault()
    const fileName = new Date().getTime() + data.img.name
    console.log(data.img)
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, data.img)
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
          const newCategory = {...data, img: downloadURL}
          addCategory(dispatch, newCategory)
        }).finally(()=> history.go(0) /* setData({ name: "", img: "", isActive: false }) */);
      }
    );
  }

  return (
    <div className="newCategory">
      <h1 className="addCategoryTitle">Nouvelles Categorie</h1>
      <form onSubmit={handleCreate}>
        <div className="addProductItem">
          <label htmlFor="name">Nom:</label>
          <input required autoComplete="off" name="name" id="name" type="text" value={data.name} onChange={handleUpdate} />
        </div>
        <div className="addProductItem">
          <label htmlFor="img">Image:</label>
          <input name="img" id="img" type="file" accept=".jpg,.png,.jpeg" onChange={handleUpdate} />
        </div>
        <div className="addProductItem">
          <label htmlFor="isActive">Activer:</label>
          <input type="checkbox" checked={data.isActive} name="isActive" id="isActive" onChange={handleUpdate} />
        </div>
        <button className="addProductButton" type="submit">Creé</button>
      </form>
    </div>
  )
}


