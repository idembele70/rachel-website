const { Schema, model } = require("mongoose")

const orderSchema = Schema({
userId: {type: Schema.Types.ObjectId, ref:"users", required: true},
products : [
  {
    productId: {
      type :Schema.Types.ObjectId , ref:"product",required:true
    },
    color: {type: String, required: true},
    size: {type: String},
    quantity: {
      type : Number,
      default : 1
    }
  }
],
amount : {
  type : Number, required: true
},
stripeId : {type: String, trim:true},
paypalId : {type: String, trim:true},
status : {
type : String,
default: "pending"
},
shippingPrice: {type : Number, required: true},
trackingNumber: {
  type: String,
  default: "",
  trim: true
}
},
{timestamps: true}
)

const Order = model("order", orderSchema)
module.exports = Order