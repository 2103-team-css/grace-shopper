import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/products';
import { createCartItem } from '../store/cart';

const AllProducts = (props) => {
  useEffect(() => {
    props.getProducts();
  }, []);
  const { products, userId } = props;
  console.log(products);

  //l 23 filt products before map
  //arr of filt prod
  //l28 use that instead of using full prod array
  //filt conneted to state
  //loc state holds filt

  return (
    <div className="all-products-container">
      <div className="filter-div">
        <label for="products">Filter by product category</label>
        <select name="instruments" id="instruments">
          <option value="percussion">percussion</option>
          <option value="strings">strings</option>
          <option value="keys">keys</option>
          <option value="accessories">accessories</option>
        </select>
        {products.map((product) => {
          return (
            <div key={product.id} className="product-container">
              <img
                src={product.imageUrl}
                alt={product.name}
                heigt="150"
                width="200"
                className="product-image"
              />
              <h3>Name:{product.name}</h3>
              <p>Price: ${product.price}</p>
              <button
                onClick={() => {
                  props.addToCart(userId, product.name, product.price, 1, product.id);
                }}
              >
                Add to Cart
              </button>
              <p>{product.quantity} Left in Stock</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    products: state.products,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addToCart: (userId, name, price, quantity, productId) =>
      dispatch(createCartItem(userId, name, price, quantity, productId)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
