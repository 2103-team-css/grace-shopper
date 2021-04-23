import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchOneProduct } from "../store/singleProduct";
import { createCartItem } from "../store/cart";
import { Link } from "react-router-dom";

// export class SingleProduct extends Component {
//   componentDidMount() {
//     this.props.getOneProduct(this.props.match.params.id);
//   }
//   render() {
//     console.log(this.props);
//     return <div>render</div>;
//   }
// }

const SingleProduct = (props) => {
  useEffect(() => {
    props.getOneProduct(props.match.params.id);
  }, []);
  const { oneProduct, userId } = props;
  return (
    <div className="single-product-container">
      <div className="single-product-profile">
        <img
          className="single-product-image"
          src={oneProduct.imageUrl}
          alt={oneProduct.name}
          height="200"
          width="300"
        />
        <h3>Name: {oneProduct.name}</h3>
        <p>Description: {oneProduct.description}</p>
        <p>Availability: {oneProduct.quantity} left in stock!</p>
        <p>Category: {oneProduct.category}</p>
        <button
          onClick={() => {
            props.addToCart(
              userId,
              oneProduct.name,
              oneProduct.price,
              1,
              oneProduct.id
            );
          }}
        >
          Add to Cart
        </button>
        <Link to={`/admin/products/${oneProduct.id}`}> Edit Product: </Link>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    oneProduct: state.oneProduct,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getOneProduct: (id) => dispatch(fetchOneProduct(id)),
    addToCart: (userId, name, price, quantity, productId) =>
      dispatch(createCartItem(userId, name, price, quantity, productId)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
