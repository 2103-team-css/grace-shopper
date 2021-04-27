import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchOneProduct } from '../store/singleProduct';
import { deleteProduct } from '../store/products';
import { createCartItem } from '../store/cart';
import { Link as RouterLink } from 'react-router-dom';

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  makeStyles,
  Container,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  image: {
    height: 300,
    width: 300,
    margin: '0 auto',
  },
  cardContainer: {
    marginTop: '1rem',
    padding: 10,
  },
  // editButton: {
  //   backgroundColor: '#52b788',
  // },
  maxHeight: {
    height: '100%',
  },
  itemSpacing: {
    marginBottom: 10,
  },
}));

const SingleProduct = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getOneProduct(props.match.params.id);
  }, []);

  const { oneProduct, userId, isAdmin, deleteProduct } = props;

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <Card className={classes.cardContainer}>
            <Grid container>
              <Grid item xs={12} sm={6} container direction="column">
                <Typography component="h3" variant="h3" align="center">
                  {oneProduct.name}
                </Typography>
                <Box mt={2}>
                  <CardMedia className={classes.image} image={oneProduct.imageUrl} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardContent className={classes.maxHeight}>
                  <Grid
                    container
                    direction="column"
                    justify="space-around"
                    className={classes.maxHeight}
                    spacing={2}
                    wrap="nowrap"
                  >
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        <strong>Price:</strong> ${oneProduct.price / 100}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        <strong>Availability:</strong> {oneProduct.quantity} Left in Stock
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        <strong>Category:</strong> {oneProduct.category}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        <strong>Description:</strong> {oneProduct.description}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disableElevation
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
                      </Button>
                    </Grid>
                    {isAdmin && (
                      <Grid item container spacing={2}>
                        <Grid item>
                          <Button
                            to={`/admin/products/${oneProduct.id}`}
                            component={RouterLink}
                            color="primary"
                            variant="contained"
                          >
                            Edit Product
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            onClick={() => deleteProduct(oneProduct.id)}
                            color="secondary"
                            variant="contained"
                          >
                            Delete Product
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapState = (state) => {
  return {
    oneProduct: state.oneProduct,
    userId: state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getOneProduct: (id) => dispatch(fetchOneProduct(id)),
    addToCart: (userId, name, price, quantity, productId) =>
      dispatch(createCartItem(userId, name, price, quantity, productId)),
    deleteProduct: (id) => dispatch(deleteProduct(id, history)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
