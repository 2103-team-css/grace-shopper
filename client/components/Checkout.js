import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {loadStripe} from '@stripe/stripe-js'
// const stripePromise = loadStripe(
//   'pk_test_51IjxKTGFSgaIbDDasICfYfeRGHxBZIYxxQSjnjPJNCRozSkoRtFdcPIY6Kkhk6NrplsRyE4c5kJ62ERaXObksxYB00ko9ylzJM'
// )


toast.configure();

const Checkout = () => {
    const cart = useSelector((state) => state.cart);

    const total = cart.reduce((acc, item) => {
        return acc + (item.price * item.quantity)
        }, 0);
    

async function handleToken( token ) {
    console.log('token>>>', {token} );
    const response = await axios.post('/api/checkout', 
    {
        cart,
        token,
    })
    console.log('response>>>', response);
    const { status } = response.data;
    console.log('status>>>', status);
    if(status === 'success') {
        toast('Success! Check your order history.', { type: 'success'} )
    }   else {
        toast('Sorry, something went wrong.', { type: 'error'} )
    }

} 

    return(
        <div className="container" >
            <div className="checkout-cart">
                <h2>Your order:</h2>
                <p />
            <ul>
            {cart.map((item) => {
              return (
                <li key={item.id}>
                  <ul>
                    <li>Name: {item.name}</li>
                    <li>Price: ${item.price}</li>
                    <li>Quantity: {item.quantity}</li>
                    <li>Total: ${item.price * item.quantity}</li>
                  </ul>
                </li>
              );
            })}
          </ul>
          <p/>
          <h3>Grand Total: $ {total}</h3>
            </div>
            <StripeCheckout 
            stripeKey="pk_test_51IjxKTGFSgaIbDDasICfYfeRGHxBZIYxxQSjnjPJNCRozSkoRtFdcPIY6Kkhk6NrplsRyE4c5kJ62ERaXObksxYB00ko9ylzJM"
            token={handleToken}
            billingAddress
            shippingAddress
            amount={total}
            />
        </div>
    )


}

export default Checkout;