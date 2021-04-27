import React, { Component } from 'react';
import { updateProduct } from '../store/products';
import { connect } from 'react-redux';

import { Button, TextField, Container, withStyles, Grid } from '@material-ui/core';

const styles = () => ({
  form: {
    width: '100%',
  },
  submit: {
    margin: '1rem 0',
  },
  formContainer: {
    margin: '1rem auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: props.product.code || '',
      name: props.product.name || '',
      quantity: props.product.quantity,
      imageUrl: props.product.imageUrl || '',
      description: props.product.description || '',
      price: props.product.price,
      category: props.product.category || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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
    this.props.updateProduct({ ...this.props.product, ...this.state }, this.props.match.params.id);
  }

  render() {
    const { code, name, quantity, imageUrl, description, price, category } = this.state;
    const { handleSubmit, handleChange } = this;

    const { classes } = this.props;

    return (
      <Container maxWidth="sm" className={classes.formContainer}>
        <form id="updateProduct-form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                name="name"
                label="Product Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="code"
                name="code"
                label="Code"
                variant="outlined"
                fullWidth
                value={code}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                id="quantity"
                name="quantity"
                label="Quantity"
                variant="outlined"
                fullWidth
                value={quantity}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                fullWidth
                value={price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="imageUrl"
                name="imageUrl"
                label="Image URL"
                variant="outlined"
                fullWidth
                value={imageUrl}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="category"
                name="category"
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.oneProduct,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  updateProduct: (product, id) => dispatch(updateProduct(product, history, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditProduct));
