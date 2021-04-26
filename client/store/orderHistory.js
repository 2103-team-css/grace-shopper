import axios from 'axios';
import { removeCart } from './cart';

//action types
export const SET_HISTORY = 'SET_HISTORY';

//action creator
const setHistory = (history) => {
  return {
    type: SET_HISTORY,
    history,
  };
};

//thunk

export const fetchHistory = (userId) => {
  return async (dispatch) => {
    const { data: history } = await axios.get(`/api/orders/${userId}`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
    dispatch(setHistory(history));
  };
};

export const submitCheckout = (userId, sentCart, payment, shipping, history) => {
  return async (dispatch) => {
    try {
      let response;
      if (userId) {
        response = await axios.post(
          `/api/checkout/${userId}`,
          {
            cart: sentCart,
            payment,
            shipping,
          },
          {
            headers: {
              authorization: localStorage.getItem('token'),
            },
          }
        );
      } else {
        response = await axios.post(`/api/checkout/guest`, {
          cart: sentCart,
          payment,
          shipping,
        });
      }
      const { cart, orderCode, total } = response.data;
      dispatch(removeCart(userId));
      if (userId) {
        dispatch(fetchHistory(userId));
      }
      history.push('/confirmation', {
        successful: true,
        cart: cart,
        orderCode: orderCode,
        total: total,
      });
    } catch (error) {
      console.log(error);
      history.push('/confirmation', {
        successful: false,
      });
    }
  };
};

// reducer
export default function historyReducer(state = [], action) {
  switch (action.type) {
    case SET_HISTORY:
      return action.history;
    default:
      return state;
  }
}
