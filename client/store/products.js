import axios from "axios";

//action types
export const SET_PRODUCTS = "SET_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

//action creator
const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};
export const _createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

export const _updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
};

//thunk

export const fetchProducts = () => {
  return async (dispatch) => {
    const { data: products } = await axios.get("/api/products");
    dispatch(setProducts(products));
  };
};

export const createProduct = (product, history) => {
  try {
    return async (dispatch) => {
      const { data: created } = await axios.post(
        "/api/admin/products",
        product,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      dispatch(_createProduct(created));
      history.push("/");
    };
  } catch (error) {
    next(error);
  }
};

export const updateProduct = (product, history) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(
      `/api/admin/products/${product.id}`,
      product
    );
    dispatch(_updateProduct(updated));
    history.push("/");
  };
};

// reducer

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case CREATE_PRODUCT:
      return [...state, action.product];
    case UPDATE_PRODUCT:
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      );
    default:
      return state;
  }
}
