const Cart = require('../database/model/cart.model')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

const router = require('express').Router()

// CREATE
router.post("/new", verifyTokenAndAuthorization, (req, res) => {
  const newCart = new Cart(req.body)
  newCart.save()
    .then(cartSaved => res.status(200).json(cartSaved))
    .catch(e => res.status(500).json(e))
})

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, (req, res) => {
  Cart.findByIdAndUpdate(req.params.id, { products: req.body }).exec()
    .then(
      cartUpdated => res.status(200).json(cartUpdated)
    )
    .catch(e => res.status(500).json(e))
})

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, (req, res) => {
  Cart.findByIdAndDelete(req.params.id).exec()
    .then(
      () => res.status(200).json("Cart deleted")
    )
    .catch(e => res.status(500).json(e))
})

// GET USER CART
router.get("/:userId", verifyTokenAndAuthorization, (req, res) => {
  Cart.findOne({ userId: req.params.userId }).exec()
    .then(
      cartFound => res.status(200).json(cartFound)
    )
    .catch(res.status(500).json)
})
// GET ALL CART
router.get("/", verifyTokenAndAdmin, (req, res) => {
  Cart.find().exec()
    .then(carts => res.status(200).json(carts))
    .catch(e => res.status(500).json(e))
})
module.exports = router