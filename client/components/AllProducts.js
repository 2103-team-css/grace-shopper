import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { createCartItem } from '../store/cart';
import { Link as RouterLink } from 'react-router-dom';
import Pagination from './Pagination';

import {
  Grid,
  Typography,
  Button,
  Box,
  makeStyles,
  Container,
  FormControlLabel,
  Checkbox,
  Card,
  CardMedia,
  CardContent,
  Link,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '2rem 0',
  },
  filterSection: {
    maxWidth: '80%',
    margin: '0 auto',
  },
  cardRoot: {
    display: 'flex',
    padding: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    height: 200,
    width: 200,
  },
}));

const AllProducts = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getProducts();
  }, []);
  const { products, userId } = props;

  const [perc, setPerc] = useState(true);
  const [strs, setStr] = useState(true);
  const [keys, setKeys] = useState(true);
  const [access, setAccess] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  const filteredArr = (products, category) => {
    return products.filter((product) => product.category !== category);
  };

  const updatePercussion = (evt) => {
    setPerc(evt.target.checked);
  };

  const updateString = (evt) => {
    setStr(evt.target.checked);
  };

  const updateKey = (evt) => {
    setKeys(evt.target.checked);
  };

  const updateAccessory = (evt) => {
    setAccess(evt.target.checked);
  };

  let filteredProd = [...products]; //all of the prod
  if (perc === false) filteredProd = filteredArr(filteredProd, 'percussion');
  if (strs === false) filteredProd = filteredArr(filteredProd, 'string');
  if (keys === false) filteredProd = filteredArr(filteredProd, 'keys');
  if (access === false) filteredProd = filteredArr(filteredProd, 'accessories');

  //pagination:
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProd.slice(indexOfFirstProduct, indexOfLastProduct);
  //page-changer:
  const paginate = (event, num) => {
    setCurrentPage(num);
  };

  return (
    <Container>
      <Box className={classes.header}>
        <Typography variant="h3">Our Products</Typography>
      </Box>
      <Typography variant="h5" align="center">
        Filter by Category
      </Typography>
      <Grid container spacing={3} className={classes.filterSection} justify="center">
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox checked={perc} onChange={updatePercussion} name="perc" color="primary" />
            }
            label="Percussion"
            labelPlacement="top"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox checked={strs} onChange={updateString} name="strs" color="primary" />
            }
            label="Strings"
            labelPlacement="top"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={<Checkbox checked={keys} onChange={updateKey} name="keys" color="primary" />}
            label="Keys"
            labelPlacement="top"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox checked={access} onChange={updateAccessory} name="access" color="primary" />
            }
            label="Accesories"
            labelPlacement="top"
          />
        </Grid>
      </Grid>
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={filteredProd.length}
          paginate={paginate}
        />
      </Box>
      <Box mt={3}>
        <Grid container spacing={2}>
          {currentProducts.map((product) => (
            <Grid item key={product.id} xs={12} md={6} lg={4}>
              <Card className={classes.cardRoot}>
                <CardMedia className={classes.cover} image={product.imageUrl} />
                <Box className={classes.details}>
                  <CardContent className={classes.content}>
                    <Link to={`/products/${product.id}`} component={RouterLink}>
                      <Typography variant="h5">{product.name}</Typography>
                    </Link>
                    <Typography>
                      <strong>Price:</strong> ${product.price / 100}
                    </Typography>
                    <Typography>
                      <strong>{product.quantity} Left in Stock</strong>
                    </Typography>
                    {/* <Typography>{product.category}</Typography> */}
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disableElevation
                      onClick={() => {
                        props.addToCart(userId, product.name, product.price, 1, product.id);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
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
