import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem, deleteCartItem, removeCart } from '../store/cart';

const Cart = () => {
  const userId = useSelector((state) => state.auth.id);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      Cart:
      <button
        onClick={() => {
          dispatch(removeCart(userId));
        }}
      >
        Clear Cart
      </button>
      <ul>
        {cart.map((item) => {
          return (
            <li key={item.id}>
              <ul>
                <li>Name: {item.name}</li>
                <li>Price: ${item.price}</li>
                <li>Quantity: {item.quantity}</li>
                <li>
                  <button
                    onClick={() => {
                      dispatch(
                        updateCartItem(
                          userId,
                          item.id,
                          item.productId,
                          item.quantity + 1,
                          item.price,
                          item.name
                        )
                      );
                    }}
                  >
                    Increase
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (item.quantity <= 1) {
                        dispatch(deleteCartItem(userId, item.id));
                      } else {
                        dispatch(
                          updateCartItem(
                            userId,
                            item.id,
                            item.productId,
                            item.quantity - 1,
                            item.price,
                            item.name
                          )
                        );
                      }
                    }}
                  >
                    Decrease
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      dispatch(deleteCartItem(userId, item.id));
                    }}
                  >
                    Remove
                  </button>
                </li>
                <li>Total: {item.price * item.quantity}</li>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
