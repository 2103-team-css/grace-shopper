import axios from 'axios';

//action types
const SET_PRODUCTS = 'SET_PRODUCTS';

//action creator
const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

//thunk

export const fetchProducts = () => {
  return async (dispatch) => {
    const { data: products } = await axios.get('/api/products');
    dispatch(setProducts(products));
  };
};

// reducer

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
