const express = require('express');
const Stripe = require('stripe')
const cors = require('cors')


const app = express();

const stripe = new Stripe('sk_test_0GtckB81c7iRloQRaNDBJ2v900T93U1Jex')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({origin:'http://localhost:3000'}))


app.post('/api/checkout',async (req,res)=>{
  try {
    const {id, amount} = req.body

    const payment =  await stripe.paymentIntents.create({
       amount:amount,
       currency: "usd",
       description:"game keyword",
       payment_method:id,
       confirm:true
     })
     console.log(payment)
     res.json({message:'success payment'})
  
  } catch (error) {
     console.log(error)
     res.json({message:error.row.message})
  }

})

app.listen(4000,()=>{
  console.log('server on port 4000')
})
