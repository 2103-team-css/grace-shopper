import React, { Component } from "react";
import { updateProduct } from "../store/products";
import { connect } from "react-redux";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: props.product.code || "",
      name: props.product.name || "",
      quantity: props.product.quantity,
      imageUrl: props.product.imageUrl || "",
      description: props.product.description || "",
      price: props.product.price,
      category: props.product.category || "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.updateProduct(this.props.match.id);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.product.id && this.props.id) {
      this.setState({
        code: this.props.product.code,
        name: this.props.product.name,
        quantity: this.props.product.quantity,
        imageUrl: this.props.product.imageUrl,
        description: this.props.product.description,
        price: this.props.product.price,
        category: this.props.product.category,
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateProduct({ ...this.props.product, ...this.state });
  }

  render() {
    const {
      code,
      name,
      quantity,
      imageUrl,
      description,
      price,
      category,
    } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form id="updateProduct-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input name="name" onChange={handleChange} value={name} />

          <label htmlFor="code">Code: </label>
          <input name="code" onChange={handleChange} value={code} />

          <label htmlFor="quantity">Quantity: </label>
          <input name="quantity" onChange={handleChange} value={quantity} />

          <label htmlFor="imageUrl">Image Url: </label>
          <input name="imageUrl" onChange={handleChange} value={imageUrl} />

          <label htmlFor="description">Description: </label>
          <input
            name="description"
            onChange={handleChange}
            value={description}
          />

          <label htmlFor="price">Price: </label>
          <input name="price" onChange={handleChange} value={price} />

          <label htmlFor="category">Category: </label>
          <input name="category" onChange={handleChange} value={category} />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.oneProduct,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  updateProduct: (product) => dispatch(updateProduct(product, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
