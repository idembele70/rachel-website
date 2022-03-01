const { Schema, model } = require("mongoose")

const productSchema = Schema({
   title: { type: String, required: true, unique: true },
   description: { type: String, required: true },
   img: { type: String, required: true },
   categories: [
         { type: Schema.Types.ObjectId, ref: "category", required:true }
   ],
   sizes: { type: Array },
   colors: { type: Array },
   price: { type: Number, required: true },
   quantity: {
      type: Number,
      default: 1,
      required: true
   },
   weight: {
      type: Number,
      default: 0,
      required: true
   }
},
   { timestamps: true }
)

const Product = model("product", productSchema)

module.exports = Product

