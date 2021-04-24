import React from "react";
import { useLocation, useHistory } from "react-router-dom";

const Confirmation = () => {
  const history = useHistory();
  const location = useLocation();
  if (!location.state) {
    history.push("/");
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
                    <li>Name: {item.name}</li>
                    <li>Price: ${item.price}</li>
                    <li>Quantity: {item.quantity}</li>
                    <li>Total: {item.price * item.quantity}</li>
                  </ul>
                </li>
              );
            })}
          </ul>
          <p>Total: {total}</p>
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
