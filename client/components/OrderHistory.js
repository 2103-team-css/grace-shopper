import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const orderHistory = useSelector((state) => state.orderHistory);

  return (
    <div>
      Order History:
      {orderHistory.map((order) => {
        return (
          <div key={order.id}>
            <h3>Order #{order.orderCode}</h3>
            <h4>Date: {order.createdAt}</h4>
            <ul>
              {order.products.map((item) => {
                return (
                  <li key={item.id}>
                    <ul>
                      <li>Name: {item.name}</li>
                      <li>Price: ${item.price}</li>
                      <li>Quantity: {item.quantity}</li>
                      <li>Total: ${item.total}</li>
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistory;
