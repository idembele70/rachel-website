const router = require("express").Router()
const User = require('../database/model/user.model')
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const dotEnv = require("dotenv")
dotEnv.config()
const { PASSWORD_SECRET_KEY, JWT_SECRET_KEY } = process.env
//REGISTER
router.post("/register", async (req, res) => {
  try {
  const {password,...others } = req.body
  const cryptedPassword = CryptoJS.AES.encrypt(password, PASSWORD_SECRET_KEY).toString()
  const newUser = new User({
    ...others, password: cryptedPassword
  })
    const savedUser = await newUser.save()
    res.status(200).json(savedUser)
  } catch (error) {
    res.status(500).json(error);
  }
})

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json("Wrong credentials")

    const userPassword = CryptoJS.AES.decrypt(user.password, PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8)

    if (password !== userPassword) return res.status(401).json("Wrong credentials")
    const { _id: id, isAdmin } = user
    const accessToken = jwt.sign({ id, isAdmin }, JWT_SECRET_KEY, { expiresIn: "1d" })
    const {exp} = jwt.decode(accessToken)
    const { password: DBPassword, ...others } = user._doc
    res.status(200).json({ ...others, accessToken,exp })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router

