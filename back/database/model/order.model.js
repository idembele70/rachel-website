const { Schema, model } = require("mongoose")

const orderSchema = Schema({
userId: {type: String, required: true},
products : [
  {
    product: {
      type : Schema.Types.ObjectId, ref: "product", required:true
    },
    color: {type: String, required: true},
    size: {type: String, required: true},
    quantity: {
      type : Number,
      default : 1
    }
  }
],
amount : {
  type : Number, required: true
},
stripeId : {type: String, required: true},
status : {
type : String,
default: "pending"
}
},
{timestamps: true}
)

const Order = model("order", orderSchema)
module.exports = Order