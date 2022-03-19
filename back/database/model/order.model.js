const { Schema, model } = require("mongoose")

const orderSchema = Schema({
userId: {type: Schema.Types.ObjectId, ref:"users", required: true},
products : [
  {
    productId: {
      type :Schema.Types.ObjectId , ref:"product",required:true
    },
    color: {type: String, required: true},
    size: {type: String, default : ""},
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
},
shippingPrice:{
  type: Number,
  default: 0,
},
trackingNumber: {
  type: String,
  default: ""
}
},
{timestamps: true}
)

const Order = model("order", orderSchema)
module.exports = Order