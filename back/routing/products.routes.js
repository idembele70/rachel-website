
const Product = require("../database/model/product.model")
const { verifyTokenAndAdmin,verifyTokenAndAuthorization } = require("./verifyToken")

const router = require("express").Router()
// CREATE
router.post("/new", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body)
  try {
    const savedProduct = await newProduct.save()
    res.status(200).json(savedProduct)
  } catch (error) {
    res.status(500).json(error)
  }
})
// CREATE ENDPOINT
// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    let productUpdated = null
    const qDecreaseQte = req.query.decreaseQte
    if (qDecreaseQte) {
      Product.findById(req.params.id).exec().then(
        product => {
          const toUpdate = product.colors.find(color => color.name === req.body.name)
            .details.find(
              ((detail) => detail.size === req.body.size))
          if (toUpdate.quantity && toUpdate.quantity >= qDecreaseQte) {
            toUpdate.quantity = toUpdate.quantity - qDecreaseQte
            product.save()
            res.status(200).json(product)
          } else {
            res.status(500).json({
              errorMessage : "Your product Quantity is superior to the current maximun size"
            })
          }
        }
      ).catch(
        err => res.status(500).json({
          message: "Cannot decrement product quantity something went wrong",
          err,
          file: __filename
        }
        ))
    } else {
      productUpdated = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        {
          new: true
        }
      )
      res.status(200).json(productUpdated)
    }
  } catch (err) {
    res.status(500).json({
      file: __filename,
      err,
    })
  }
})
// UPDATE ENDPOINT
// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json("Product has been deleted")
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET ONE PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) res.status(401).json("Product not Found")
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET ALL PRODUCTS
router.get("/", async (req, res) => {

  const qNew = req.query.new
  const qCategory = req.query.category
  const qCount = req.query.count
  const qPage = req.query.page
  try {
    let products = []
    const productPerPage = 15
    if (qNew)
      products = await Product.find().sort({ createdAt: -1 }).limit(5)
    else if (qCategory) {
      if (qCount) {
        if (qPage)
          Product.find({
            categories: { $eq: qCategory }
          }).skip(productPerPage * qPage).limit(productPerPage).count().exec()
            .then(count => res.status(200).json(count))
        else {
          Product.find({
            categories: { $eq: qCategory }
          }).count().exec()
            .then(count => res.status(200).json(count))
        }
      }
      else if (qPage)
        products = await Product.find({
          categories: { $eq: qCategory },
        }).skip(productPerPage * qPage).limit(productPerPage)
      else
        products = await Product.find({
          categories: { $eq: qCategory }
        })
    }
    else
      products = await Product.find()
    if (products.length) {
      res.status(200).json(products)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
