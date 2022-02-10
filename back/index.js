const express = require("express")
const app = express()
const mongose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()
const { MONGO_URL, PORT } = process.env
mongose.connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Error while connecting to DB", err))
app.use(express.json())
const router = require("./routing")
app.use(cors())
app.use(router)


app.listen(PORT || 5000, () => console.log("Backend server is running ! on port:", PORT || 5000))