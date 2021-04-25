import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

const Checkout = () => {
    const cart = useSelector((state) => state.cart);
    console.log('cart>>>', cart);

    const userId = useSelector((state) => state.auth.id);
    console.log('userId>>>', userId);

    const email = useSelector((state) => state.auth.email);
    console.log('email>>>', email);

    const total = cart.reduce((acc, item) => {
        return acc + item.price
        }, 0);
        console.log('total>>>', total);
    
function handleToken( token, address ) {
    console.log('!!!>>>', {token, address});
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