const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const Order = require('../database/model/order.model')

const router = require('express').Router()
// CREATE
router.post("/new/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const newOrder = new Order(req.body)
    const savedOrder = await newOrder.save()
    res.status(200).json(savedOrder)
  } catch (err) {
    res.status(500).json(err)
  }
})

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orderUpdated = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(orderUpdated)
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json("Order has been deleted !")
  } catch (err) {
    res.status(500).json(err)
  }
})

// Income state
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.productId
  const lastMonth = new Date(new Date().setDate(0))
  const twoMonthAgo = new Date(lastMonth.setDate(0))

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: twoMonthAgo }, ...(productId && {
            products: { $elemMatch: { productId } }
          })
        }
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          year: { $avg: "$year" },
          total: { $sum: "$sales" },
        },
      },
    ])
    res.status(200).send(income)
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET user order
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const userOders = await Order.find({ userId: req.params.id })
    res.status(200).json(userOders)
  } catch (err) {
    res.status(500).json(err)
  }
});

// GET ALL ORDER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router

