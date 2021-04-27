import React, { Component } from 'react';
import { createProduct } from '../store/products';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

class CreateProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      code: '',
      quanitity: 0,
      description: '',
      price: 0,
      imageUrl: '',
      category: '',
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
    const { name, code, quantity, description, price, imageUrl, category } = this.state;
    const { handleSubmit, handleChange } = this;
    const { classes } = this.props;

    return (
      <Container maxWidth="sm" className={classes.formContainer}>
        <form id="product-form" onSubmit={handleSubmit}>
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
          <Link to="/">Cancel</Link>
        </form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createProduct: (product) => dispatch(createProduct(product, history)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(CreateProduct));
