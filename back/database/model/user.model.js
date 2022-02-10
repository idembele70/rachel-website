const { Schema, model } = require('mongoose')

const userSchema = Schema({
  firstname: {
    type: String,
    required: "firstname is required",
  },
  lastname: {
    type: String,
    required: "lastname is required",
  },
  email: {
    type: String,
    required: "email is required",
    unique: true
  },
  password: {
    type: String,
    required: "password is required"
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  postalBox: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  }
},
  { timestamps: true }
)

const User = model("users", userSchema)

module.exports = User