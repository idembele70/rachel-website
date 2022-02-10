const { Schema, model } = require("mongoose")

const categorySchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  img: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    required: true
  }
},
  { timestamps: true }
)

const Category = model("category", categorySchema)

module.exports = Category
