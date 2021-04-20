import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../redux/products';

const AllProducts = (props) => {
  return (
    <div className='all-products-container'>Container for All Products</div>
  );
};

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts),
  };
};

export default AllProducts;
