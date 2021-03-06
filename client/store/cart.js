import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

toast.configure();

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
        if (cartItem.id) {
          toast(`${cartItem.name} added to your cart!`, { type: 'success' });
        }
        dispatch(addToCart(cartItem, false));
      } else {
        toast(`${name} added to your cart!`, { type: 'success' });
        dispatch(addToCart({ id: uuid(), quantity, productId, name, price }, true));
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
        if (cartItem.id) {
          toast(`${cartItem.name} removed from your cart!`, { type: 'success' });
        }
        dispatch(removeFromCart(cartItem.id, false));
      } else {
        toast(`Item removed from your cart!`, { type: 'success' });
        dispatch(removeFromCart(cartId, true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCartItem = ({ userId, cartId, productId, quantity, price, name }) => {
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
        dispatch(updateInCart({ id: cartId, quantity, productId, name, price }, true));
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
  return cart.some((item) => item.productId === newItem.productId);
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
        return item.id !== action.cartId;
      });
      if (action.local) setLocalCart(newState);
      return newState;
    case UPDATE_IN_CART:
      newState = state.map((item) => {
        if (item.id === action.cartItem.id) {
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
