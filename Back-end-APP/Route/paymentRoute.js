const express = require("express");
const {
  processPayment,
  sendStripeKey,
} = require("../Controller/paymentController");
const router = express.Router();

router.post("/processpayment", processPayment); //To process Payment Option of Front End
router.get("/stripeapikey", sendStripeKey); //To SHOW Stripe Key to Front End

module.exports = router;
