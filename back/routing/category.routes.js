const router = require("express").Router()
const Category = require("../database/model/category.model")
const { verifyTokenAndAdmin } = require('./verifyToken')
// CREATE a new category
router.post("/new", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newCategory = await new Category(req.body).save()
    res.status(200).json(newCategory)
  } catch (error) {
    res.status(500).json(error)
  }
})

// UPDATE one category
router.put("/:id", verifyTokenAndAdmin,async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json(error)
  }
})

// DELETE one category
router.delete("/:id", verifyTokenAndAdmin,async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json("categoryDeleteSuccess")
  } catch (error) {
    res.status(500).json("category.routes.js, in router.delete('/:id'):",error)
  }
})

// GET all categories
router.get("/", (req, res) => {
  Category.find()
    .exec()
    .then(categories => res.status(200).json(categories))
    .catch(err => res.status(500).json({ file: "category.routes.js, in router.get('/'):", err }))
})

module.exports = router