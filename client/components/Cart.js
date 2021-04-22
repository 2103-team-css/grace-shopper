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
            <li key={item.cart.id}>
              <ul>
                <li>Name: {item.name}</li>
                <li>Price: ${item.price}</li>
                <li>Quantity: {item.cart.quantity}</li>
                <li>
                  <button
                    onClick={() => {
                      dispatch(
                        updateCartItem(
                          userId,
                          item.cart.id,
                          item.cart.productId,
                          item.cart.quantity + 1,
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
                      if (item.cart.quantity <= 1) {
                        dispatch(deleteCartItem(userId, item.cart.id));
                      } else {
                        dispatch(
                          updateCartItem(
                            userId,
                            item.cart.id,
                            item.cart.productId,
                            item.cart.quantity - 1,
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
                      dispatch(deleteCartItem(userId, item.cart.id));
                    }}
                  >
                    Remove
                  </button>
                </li>
                <li>Total: {item.price * item.cart.quantity}</li>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
