
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
console.log("p",process.env.STRIPE_SECRET_KEY)

exports.processPayment=async(req,res,next)=>{
     
    try{
    const paymentIntent=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"usd",
        description:"TEST PAYMENT",
        metadata:{Integration_check:"accept_payment"},
        shipping:req.body.shipping
    })
    res.status(200).json({
        success:true,
        client_secret:paymentIntent.client_secret
    })
}
catch(error){
    res.status(400).json({
        success:false,
        message:error.message
    })
}
}


exports.sendStripeApi=async(req,res,next)=>{
     
    try{
    res.status(200).json({
        stripeApiKey:process.env.STRIPE_API_KEY
    })
}
catch(error){
    res.status(400).json({
        success:false,
        message:error
    })
}
}