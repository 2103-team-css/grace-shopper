import axios from 'axios';
import { v4 as uuid } from 'uuid';

//action types
const SET_CART = 'SET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_IN_CART = 'UPDATE_IN_CART';
const CLEAR_CART = 'CLEAR_CART';

//action creator
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

const addToCart = (cartItem, local) => {
  return {
    type: ADD_TO_CART,
    cartItem,
    local,
  };
};

const removeFromCart = (cartId, local) => {
  return {
    type: REMOVE_FROM_CART,
    cartId,
    local,
  };
};

const updateInCart = (cartItem, local) => {
  return {
    type: UPDATE_IN_CART,
    cartItem,
    local,
  };
};

const clearCart = (local) => {
  return {
    type: CLEAR_CART,
    local,
  };
};

//thunk
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      if (userId) {
        const { data: cart } = await axios.get(`/api/carts/${userId}`, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        dispatch(setCart(cart));
      } else {
        let cart = JSON.parse(localStorage.getItem('localCart'));
        if (!cart) cart = [];
        dispatch(setCart(cart));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const ex = {
  name: 'Accessory Product',
  price: 781.72,
  cart: {
    id: 5,
    quantity: 1,
    productId: 16,
  },
};

export const createCartItem = (userId, name, price, quantity, productId) => {
  return async (dispatch) => {
    try {
      if (userId) {
        const { data: cartItem } = await axios.post(
          `/api/carts/${userId}`,
          { productId, quantity },
          {
            headers: {
              authorization: localStorage.getItem('token'),
            },
          }
        );
        dispatch(addToCart(cartItem, false));
      } else {
        dispatch(addToCart({ name, price, cart: { id: uuid(), quantity, productId } }, true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCartItem = (userId, cartId) => {
  return async (dispatch) => {
    try {
      if (userId) {
        const { data: cartItem } = await axios.delete(`/api/carts/${userId}/${cartId}`, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        dispatch(removeFromCart(cartItem.id, false));
      } else {
        dispatch(removeFromCart(cartId, true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCartItem = (userId, cartId, productId, quantity, price, name) => {
  return async (dispatch) => {
    try {
      if (userId) {
        const { data: cartItem } = await axios.put(
          `/api/carts/${userId}/${cartId}`,
          { quantity },
          {
            headers: {
              authorization: localStorage.getItem('token'),
            },
          }
        );
        dispatch(updateInCart(cartItem, false));
      } else {
        dispatch(updateInCart({ name, price, cart: { id: cartId, quantity, productId } }, true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeCart = (userId) => {
  return async (dispatch) => {
    try {
      if (userId) {
        await axios.delete(`/api/carts/${userId}`, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        dispatch(clearCart(false));
      } else {
        dispatch(clearCart(true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const existsDuplicate = (cart, newItem) => {
  return cart.some((item) => item.cart.productId === newItem.cart.productId);
};

const setLocalCart = (cart) => {
  localStorage.setItem('localCart', JSON.stringify(cart));
};

// reducer
export default function cartReducer(state = [], action) {
  let newState;
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_TO_CART:
      newState = [...state, action.cartItem];
      if (action.local) {
        if (existsDuplicate(state, action.cartItem)) {
          return state;
        }
        setLocalCart(newState);
      }
      return newState;
    case REMOVE_FROM_CART:
      newState = state.filter((item) => {
        return item.cart.id !== action.cartId;
      });
      if (action.local) setLocalCart(newState);
      return newState;
    case UPDATE_IN_CART:
      newState = state.map((item) => {
        if (item.cart.id === action.cartItem.cart.id) {
          return action.cartItem;
        }
        return item;
      });
      if (action.local) setLocalCart(newState);
      return newState;
    case CLEAR_CART:
      if (action.local) localStorage.removeItem('localCart');
      return [];
    default:
      return state;
  }
}
