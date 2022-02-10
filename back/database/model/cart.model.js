const { Schema, model } = require("mongoose")

const cartSchema = Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: {
        type: String
      },
      quantity:
      {
        type: String,
        default: 1
      }
    }
  ]
},
  { timestamps: true }
)

const Cart = model("cart", cartSchema)
module.exports = Cart