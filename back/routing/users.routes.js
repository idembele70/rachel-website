const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const router = require("express").Router()
const User = require("../database/model/user.model")
const CryptoJS = require("crypto-js")
// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt
      (req.body.password, process.env.PASSWORD_SECRET_KEY).toString()
  }
  try {
    const {password, ...others} = req.body
    const userUpdated = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: others
      },
      { new: true }
    )
    res.status(200).json(userUpdated)
  } catch (error) {
    console.log(req.body)
    res.status(500).json(error)
  }
})

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted")
  } catch (error) {
    res.status(500).json(error)
  }
})

// GET ONE USER
router.get("/find/:id", verifyTokenAndAdmin, (req, res) => {
  User.findById(req.params.id).exec()
    .then(
      user => {
        if (!user) return res.status(401).json("User not found !")
        const { password, ...others } = user._doc
        res.status(200).json(others)
      }
    )
    .catch(error => res.status(500).json(error))
})

// GET ALL USERS
router.get("/", verifyTokenAndAdmin, (req, res) => {
  User.find({})
    .then(users => {
      if (!users) return res.status(401).json("There is no users One the DB !")
      res.status(200).json(users.map(user => {
        const { password, ...others } = user._doc
        return others
      }))
    }
    )
    .catch(
      error => res.status(500).json(error)
    )
})

// GET USERS STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" }
        },
      },
      {
        $group: {
          _id: "$month",
          year: {$avg: "$year"},
          total: { $sum: 1 },
        },
      }
    ])
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router

