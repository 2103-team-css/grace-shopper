import React, { Component } from "react";
import { createProduct } from "../store/products";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CreateProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      code: "",
      quanitity: 0,
      description: "",
      price: 0,
      imageUrl: "",
      category: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createProduct({ ...this.state });
  }

  render() {
    const {
      name,
      code,
      quantity,
      description,
      price,
      imageUrl,
      category,
    } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <form id="product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={this.handleChange}
          value={name}
        />
        <label htmlFor="code">Code: </label>
        <input
          type="text"
          id="code"
          name="code"
          onChange={this.handleChange}
          value={code}
        />
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          onChange={this.handleChange}
          value={quantity}
        />

        <label htmlFor="description">Description: </label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          value={description}
        />

        <label htmlFor="price">Price: </label>
        <input
          type="float"
          id="price"
          name="price"
          onChange={handleChange}
          value={price}
        />

        <label htmlFor="imageUrl">ImageUrl: </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={this.handleChange}
          value={imageUrl}
        />

        <label htmlFor="category">Category: </label>
        <input
          type="text"
          id="category"
          name="category"
          onChange={this.handleChange}
          value={category}
        />

        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createProduct: (product) => dispatch(createProduct(product, history)),
});

export default connect(null, mapDispatchToProps)(CreateProduct);
