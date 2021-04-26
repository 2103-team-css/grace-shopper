import React from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();

  if (!location.state) {
    return <Redirect to="/" />;
  }

  const { successful, cart, orderCode, total } = location.state;
  return (
    <div>
      {successful ? (
        <div>
          <p>Your order has been placed!</p>
          <p>Order number: {orderCode}</p>
          <ul>
            {cart.map((item) => {
              return (
                <li key={item.id}>
                  <ul>
                    <Link to={`/products/${item.productId}`}>Name: {item.name}</Link>
                    <li>Price: ${item.price / 100}</li>
                    <li>Quantity: {item.quantity}</li>
                    <li>Total: ${(item.price * item.quantity) / 100}</li>
                  </ul>
                </li>
              );
            })}
          </ul>
          <p>Total: ${total / 100}</p>
        </div>
      ) : (
        <div>
          <p>Your order could not be processed at the moment. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
