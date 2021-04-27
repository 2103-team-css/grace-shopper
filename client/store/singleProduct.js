import axios from 'axios';

//action type
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT';

//action creator

const getOneProduct = (product) => {
  return {
    type: GET_ONE_PRODUCT,
    product,
  };
};

//thunk
export const fetchOneProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: oneProduct } = await axios.get(`/api/products/${id}`);
      dispatch(getOneProduct(oneProduct));
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
export default function oneProductReducer(state = {}, action) {
  switch (action.type) {
    case GET_ONE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
