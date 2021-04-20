import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/products';

// const AllProducts = (props) => {
//   console.log(props);
//   return (
//     <div className='all-products-container'>Container for All Products</div>
//   );
// };

export class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    console.log(this.props);
    return <div>hello world</div>;
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
