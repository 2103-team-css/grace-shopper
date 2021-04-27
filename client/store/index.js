import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import productsReducer from './products';
import oneProductReducer from './singleProduct';
import cart from './cart';
import orderHistory from './orderHistory';
import usersReducer from './user';

const reducer = combineReducers({
  users: usersReducer,
  auth,
  products: productsReducer,
  cart,
  oneProduct: oneProductReducer,
  orderHistory,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
