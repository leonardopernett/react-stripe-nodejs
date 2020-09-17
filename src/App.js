import React ,{Suspense, lazy}from 'react';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import 'bootswatch/dist/lux/bootstrap.min.css'
import 'App.css';

const CheckoutForm = lazy(()=>import('components/CheckoutForm'))

const stripePromese = loadStripe('pk_test_kvZRSrXGYRq7LqAEcCPkKal700PWz1vLeC')

function App() {
  return (
    <Suspense fallback={null}>
        <Elements stripe={stripePromese}>
           <div className="container mt-5">
             <div className="row">
               <div className="col-md-4 mx-auto">
                  <CheckoutForm />
               </div>
             </div>
           </div>
       </Elements>
    </Suspense>
  );
}

export default App;
