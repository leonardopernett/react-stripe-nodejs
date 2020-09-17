import React,{useState} from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'


export default function CheckoutForm (){
 const stripe = useStripe();
 const elements = useElements();
 const [loading,setLoading] =useState(false)
 const handlerSubmit = async  (e) =>{
   e.preventDefault();
   const {error, paymentMethod} = await stripe.createPaymentMethod({
     type:'card',
     card:elements.getElement(CardElement)
   })
    setLoading(true)
   if(!error){
     const {id }= paymentMethod
     const datos = {
       id,
       amount:10000
     }
     const res = await fetch('http://localhost:4000/api/checkout',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(datos)
     })
     const data = await res.json()
     console.log(data)
     elements.getElement(CardElement).clear()
     setLoading(false)
   }

  }
    return(
       <form onSubmit={handlerSubmit} className="card card-body">
         <img src="https://www.corsair.com/corsairmedia/sys_master/productcontent/CH-9102020-NA-K68_01.png" 
           alt="key"
           className="img-fluid py-3"
           />
           <p>price : $100</p>
          
         <CardElement className="form-control" />
        <button className="btn btn-primary mt-4" disabled={!stripe}>
        {
           loading  ?  (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
           ):'Buy'
        }
        </button>
 
       </form>
    )
}