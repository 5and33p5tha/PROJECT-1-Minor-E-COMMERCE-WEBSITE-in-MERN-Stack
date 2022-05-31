const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// payment process
exports.processPayment = async (req, res) => {
  const paymentIntent = await stripe.paymentIntent.create({
    //Payment Initiallization

    //The Following values comes from frontend i.e via req
    amount: req.body.amount,
    currency: "npr",
    metadata: { integration_check: "accept_a_payment" }, //We accept or reject from here
  });

  //This will send message in frontend via res
  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  }); //Send the client secret to the frontend to complete the payment
};


//To Connect Front End With Stripe i.e Send Stripe Key to Front End
exports.sendStripeKey = (req, res) => {
    res.status(200).json({
        success: true,
        stripeAPIkey: process.env.STRIPE_API_KEY,
        //While Connecting with front end, we need to match the name stripeAPIkey
      }); //Send the client secret to the frontend to complete the payment
}