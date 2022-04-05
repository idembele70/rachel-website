import { Box, Button, FormControl, Grid, IconButton, Input, InputLabel, Modal, Paper, styled, TextField, Typography, useTheme } from "@material-ui/core";
import { DeleteOutline, PhotoCamera } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Fragment, useCallback, useMemo, useState } from "react";
import Swatches from "react-color/lib/components/swatches/Swatches";
import { useDispatch, useSelector } from "react-redux";
import app from '../../firebase';
import { addProduct } from "../../Redux/apiCalls";
import "./newProduct.css";
import uniqid from 'uniqid'
import { DataGrid } from "@material-ui/data-grid";
import CircularProgressWithLabel from '../../components/tools/CircularProgressWithLabel'
import { getTotalQuantity } from "../../utils/globalFunctions";
const ModalChildContainer = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.paper,
  position: "fixed",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: 300,
  height: 100,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}))

const StyledPaper = styled(Paper)({
  width: 100,
  height: 150,
  border: "2px solid rgba(0, 0, 0, 0.37)"
})
const Image = styled("img")({
  height: "100%",
  width: "100%",
  objectFit: "contain",
})

const ColorBtn = styled("div")((props) => ({
  height: 20,
  width: 20,
  borderRadius: "50%",
  backgroundColor: props.bgcolor,
  cursor: "pointer"
}))

export default function NewProduct() {
  const { categories } = useSelector(state => state.category)
  const productInitalState = {
    title: String(),
    description: String(),
    img: String(),
    categories: [],
    price: Number(),
    weight: Number(),
    colors: []
  }
  const [product, setProduct] = useState(productInitalState)
  const [autoCompleteValue, setAutoCompleteValue] = useState([]);
  const handleAutoComplete = useCallback((_, value) => {
    setAutoCompleteValue(value)
    setProduct({ ...product, categories: value.map(x => x.name) })
  }, [product])
  const { title,
    description,
    img,
    colors,
    weight,
    price
  } = product

  const [openProductAddModal, setOpenProductAddModal] = useState(false);
  const handleOpenProductAddedModal = useCallback(() =>
    setOpenProductAddModal(true), [])
  const handleCloseProductAddedModal = useCallback(() =>
    setOpenProductAddModal(false), [])
  const dispatch = useDispatch()
  const handleCreate = useCallback((e) => {
    e.preventDefault()
    if (colors.length) {
      addProduct(dispatch, product)
      setProduct(productInitalState)
      setAutoCompleteValue([])
      handleOpenProductAddedModal()
      setInterval(() => {
        handleCloseProductAddedModal()
      }, 1000)
    }
  }, [colors.length, productInitalState, dispatch, handleOpenProductAddedModal, handleCloseProductAddedModal])
  const productAddedModal = useMemo(() =>
    <Modal
      open={openProductAddModal}
      onClose={handleCloseProductAddedModal}
    >
      <ModalChildContainer>
        Produit ajouter avec success !
      </ModalChildContainer>
    </Modal>, [openProductAddModal, handleCloseProductAddedModal])
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme()
  const [progress, setProgress] = useState(0);
  const handleUpdate = useCallback((e) => {
    const { name, value, files, type } = e.target
    if (files) {
      const fileName = files[0]?.name
      const storage = getStorage(app)
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, files[0])

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setOpenModal(true)
          setProgress(Math.round(progress))
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
            setProduct(d => ({ ...d, [name]: downloadURL }))
            setProgress(0)
            setOpenModal(false)
          });
        }
      );
    }
     else if (type === "number")
       setProduct(d => ({ ...d, [name]: parseInt(value) }))
    else
      setProduct(d => ({ ...d, [name]: value }))

  }, [])
  const handleDeleteColor = useCallback((colorName) => {
    setProduct({ ...product, colors: product.colors.filter(c => c.name !== colorName) })
  }, [product, setProduct])
  const handleDeleteSize = useCallback((id) => {
    const colorsUpdated = colors.map(
      c => ({ ...c, details: c.details.filter(detail => detail._id !== id) })
    )
    setProduct({ ...product, colors: colorsUpdated })
  }, [product, colors])
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
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const handleOpenDetailModal = useCallback(() =>
    setOpenDetailModal(true)
    , [])
  const handleCloseDetailModal = useCallback(() => setOpenDetailModal(false), [])
  const colorsDetails = useMemo(() =>
    colors?.map(
      c =>
        <Fragment key={c._id}>
          <Grid item xs={12} container direction="row" alignItems="center">
            <Grid item xs={4}>
              <ColorBtn bgcolor={c?.name} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">{c?.name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" fullWidth onClick={() => handleDeleteColor(c?.name)}>Supprimer</Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box height={200}>
              <DataGrid
                rows={c?.details?.map(
                  (detail) => ({ id: detail?.id || detail?._id, ...detail })
                )}
                columns={colorColumn}
                pageSize={5}
                disableSelectionOnClick
              />
            </Box>
          </Grid>
          <Grid item container xs={12} direction="row" justifyContent="center">
            <Grid item xs="auto">
              <Button variant="outlined" onClick={() => {
                handleOpenDetailModal()
                setColor({ ...color, name: c.name })
              }} >Ajouter une taille</Button>
            </Grid>
          </Grid>
        </Fragment>
    )
    , [colors, colorColumn, handleDeleteColor, handleOpenDetailModal, color])
  const colorsRender = useMemo(() =>
    colors.length ? <Grid item container xs={12} spacing={1}>
      {colors.map(
        c => <Grid key={c?.name} item xs={1}>
          <ColorBtn bgcolor={c?.name} />
        </Grid>
      )}
    </Grid> : null, [colors])
  const handleAddColor = useCallback(({ hex }) => {
    if (colors.every(c => c.name !== hex))
      setProduct({ ...product, colors: [...colors, { _id: uniqid("RRD-"), name: hex, details: [] }] })
    else
      setProduct({ ...product, colors: colors.filter(color => color.name !== hex) })
  }, [colors, product])
  const handleSubmitSize = useCallback((e) => {
    e.preventDefault()
    const currentColor = colors.find(c => c.name === color.name)
    if (currentColor.details.every(detail => detail.size !== color.details.size)) {
      const newColors = product.colors.map(
        c => c.name === color.name ? { ...c, details: [...c.details, { _id: uniqid("RRD-"), ...color.details }] } : c
      )
      setProduct({
        ...product, colors: newColors
      })
    } else {
      const updatedColors = product.colors.map(
        c => {
          if (c.name === color.name)
            return {
              ...c, details: c.details.map(
                d => {
                  if (d.size === color.details.size)
                    return { ...d, quantity: color.details.quantity }
                  return d
                }
              )
            }
          return c
        }
      )
      setProduct({
        ...product, colors: updatedColors
      })
    }
    setColor({
      name: "",
      details:
      {
        size: "",
        quantity: 0,
      }
    })
    handleCloseDetailModal()

  }, [product, handleCloseDetailModal, color, colors])
  return (
    <>
      {productAddedModal}
      <Modal
        open={openModal}
        aria-labelledby="image-upload"
        aria-describedby="container-of-image-upload-progress-bar"
      >
        <ModalChildContainer>
          <Typography variant="body1">Telechargement de votre image</Typography>
          <CircularProgressWithLabel value={progress} />
        </ModalChildContainer>
      </Modal>
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
            <Grid container spacing={1} alignItems="center" direction="column" justifyContent="center">
              <Grid item>
                <FormControl variant="standard">
                  <InputLabel >Taille</InputLabel>
                  <Input required className="modal-input" name="size" type="text" value={color.size} onChange={handleColor} />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="standard">
                  <InputLabel>Quantité</InputLabel>
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

      <Box flex={4} p={2}>
        <Paper style={{
          flexGrow: 1,
          padding: theme.spacing(0, 2),
          marginTop: theme.spacing(3)
        }}>
          <Grid component="form" direction="row" onSubmit={handleCreate} container spacing={4}>
            <Grid item xs={12}>
              <Typography style={{ marginBottom: "2rem" }} variant="h4">Nouveau Produit</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6} lg={4} >
              <Grid item xs>
                <TextField required name="title" id="nom" label="Nom" variant="standard" value={title} onChange={handleUpdate} />
              </Grid>
              <Grid item xs>
                <TextField required name="description" id="description" label="Description" value={description} onChange={handleUpdate} multiline rows={3} />
              </Grid>
              <Grid item xs>
                <Autocomplete
                  name="categories"
                  id="categories"
                  multiple
                  value={autoCompleteValue}
                  options={categories}
                  getOptionLabel={(option) => option.name}
                  onChange={handleAutoComplete}
                  renderInput={(params) =>
                    <TextField {...params} id="categories-input" name="categories" variant="standard" label="categories" />
                  }
                />
              </Grid>
              <Grid item xs>
                <TextField required label="poids" type="number" name="weight" variant="standard" value={weight} onChange={handleUpdate} />
              </Grid>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6} lg={4} >
              <Grid item>
                <TextField required variant="standard" type="number" label="prix" name="price" id="price" value={price} onChange={handleUpdate} />
              </Grid>
              <Grid item>
                <Typography variant="body1">Couleurs</Typography>
                <Swatches name="colors" onChange={handleAddColor} height={150} />
              </Grid>
            </Grid>
            <Grid item container xs={12} sm={6} lg={4} direction="row" alignItems="center" spacing={1}>
              <Grid item xs={12} container direction="row" spacing={1}>
                <Grid item xs="auto">
                  <StyledPaper
                    variant="outlined"
                  >
                    {img && <Image src={img} alt={img} />}
                  </StyledPaper>
                </Grid>
                <Grid item xs="auto">
                  <label htmlFor="img">
                    <Input style={{ display: "none" }} id="img" name="img" type="file" onChange={handleUpdate} />
                    <IconButton component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Grid>
              </Grid>
              <Grid item container direction="row" xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6">Couleurs Disponible</Typography>
                </Grid>
                {colorsRender}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" fullWidth color="primary" size="large">Créer</Button>
              </Grid>
            </Grid>
            <Grid item container xs={12} direction="row" justifyContent="center" spacing={1}>
              {
                colorsDetails
              }
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
