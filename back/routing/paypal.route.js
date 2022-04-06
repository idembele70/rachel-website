const router = require('express').Router()
const axios = require('axios')
const { verifyTokenAndAuthorization } = require('./verifyToken')
router.get("/payment/:id" ,async (req,res) => { 
  try {
      const {data : {access_token}} = await axios({
        url :process.env.GET_PAYPAL_TOKEN_URL,
        method: "post",
        headers: {
          Accept:"application/json",
          "Accept-Language": "en_US",
          "content-type":"application/x-www-form-urlencoded"
        },
        auth: {
          username: process.env.CLIENT_ID,
          password: process.env.CLIENT_SECRET
        },
        params : {
          grant_type: "client_credentials"
        }
      })
      const { data } = await axios({
        url: `${process.env.GET_PAYPAL_ORDER_URL}${req.params.id}`,
        method: "get",
        headers: {
          Authorization : `bearer ${access_token}`
        }
      })
      const { shipping : {name,address}}= data.purchase_units[0]
      const { payer: {email_address, phone}}= data
      res.status(200).json({
        billing_details: {
          address:{
            line1: address?.address_line_1,
            postal_code: address?.postal_code,
            city: address?.admin_area_2,
            country: address?.country_code
          },
          email: email_address,
          phone: phone?.phone_number?.national_number,
          name : name?.full_name ,
        },
        payment_method_details: { card: {brand : "paypal"} }
      })
    } catch (error) {
      console.log(error)
    }
});

module.exports = router