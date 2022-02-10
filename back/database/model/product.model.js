const { Schema, model } = require("mongoose")

const productSchema = Schema({
   title: { type: String, required: true, unique: true },
   description: { type: String, required: true },
   img: { type: String, required: true },
   categories: { type: Array },
   sizes: { type: Array },
   colors: { type: Array },
   price: { type: Number, required: true },
   quantity: {
      type: Number,
      default: 0,
      required: true
   }
},
   { timestamps: true }
)

const Product = model("product", productSchema)

module.exports = Product

