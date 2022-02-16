const router = require('express').Router()
const KEY = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(KEY)

//CREATE PAYMENT WITH REACT STRIPE CHECKOUT
router.post("/payment/charges", (req, res) => {
  const { tokenId, amount } = req.body
  stripe.charges.create({
    source: tokenId,
    amount,
    currency: "eur"
  }, (stripeErr, stripeRes) => {
    if (stripeErr){
      res.status(500).json(stripeErr)
    }
    else{
      res.status(200).json(stripeRes)
    }
  })
})

//CREATE PAYMENT WITH REACT STRIPE CHECKOUT ENDPOINT
// CREATE PAYMENT WITH STRIPE JS
router.post("/payment/intents", async (req, res) => {
  const { id,amount } = req.body
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'EUR',
     payment_method:id,
     confirm:true,
    })
    res.status(200).json(paymentIntent)
  } catch (error) {
    res.status(404).json(error)
  }
})
// CREATE PAYMENT WITH STRIPE JS ENDPONT
// UPDATE PAYMENT WITH STRIPE JS 

// UPDATE PAYMENT WITH STRIPE JS ENDPONT
// GET PAYMENT WITH STRIPE JS
router.get("/payment/intents/:id", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      req.params.id
      )
      res.status(200).json(paymentIntent)
    } catch (error) {
      res.status(404).json(error)
    }
  }
  )
  // GET PAYMENT WITH STRIPE JS ENDPOINT
module.exports = router