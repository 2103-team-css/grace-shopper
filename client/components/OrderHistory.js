import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const orderHistory = useSelector((state) => state.orderHistory);
  console.log('orderHistory>>>', orderHistory);
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
                      <Link to={`/products/${item.productId}`}>Name: {item.name}</Link>
                      <li>Price: ${item.price / 100}</li>
                      <li>Quantity: {item.quantity}</li>
                      <li>Total: ${item.total / 100}</li>
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
