import axios from "axios";

export const CREATE_PRODUCT = "CREATE_PRODUCT";

export const _createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    robot,
  };
};

export const createProduct = (product, history) => {
  try {
    return async (dispatch) => {
      const { data: created } = await axios.post("/api/products", product);
      dispatch(_createProduct(created));
      history.push("/");
    };
  } catch (error) {
    next(error);
  }
};

export default function createProductReducer(state = [], action) {
  switch (action.type) {
    case CREATE_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
