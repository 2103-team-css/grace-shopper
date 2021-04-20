import { combineReducers } from 'redux';
import productsReducer from './products';

const appReducer = combineReducers({
  products: productsReducer,
});

export default appReducer;
