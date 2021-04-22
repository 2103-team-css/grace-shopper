import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchOneProduct } from '../store/singleProduct';

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
  console.log(props);
  return <div>Hello</div>;
};

const mapState = (state) => {
  return {
    oneProduct: state.oneProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getOneProduct: (id) => dispatch(fetchOneProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
