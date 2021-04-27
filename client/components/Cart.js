import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { updateCartItem, deleteCartItem, removeCart } from '../store/cart';

import {
  Typography,
  Button,
  Box,
  makeStyles,
  Container,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  checkout: {
    float: 'right',
  },
  remove: {
    color: 'red',
  },
  decrement: {
    color: '#f54281',
    fontSize: '2rem',
  },
  increment: {
    color: '#32b324',
    fontSize: '2rem',
  },
}));

const Cart = () => {
  const userId = useSelector((state) => state.auth.id);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const classes = useStyles();

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const changeQty = (item, mod) => {
    dispatch(
      updateCartItem({
        userId,
        ...item,
        cartId: item.id,
        quantity: item.quantity + mod,
      })
    );
  };

  return (
    <Container>
      <Box mt={3}>
        <Typography variant="h4">My Cart</Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => {
              dispatch(removeCart(userId));
            }}
          >
            Clear Cart
          </Button>
        </Box>
        <Box mt={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Price ($)</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/products/${item.productId}`} component={RouterLink}>
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{item.price / 100}</TableCell>
                    <TableCell align="right">
                      <Button
                        className={classes.remove}
                        onClick={() => {
                          dispatch(deleteCartItem(userId, item.id));
                        }}
                      >
                        X
                      </Button>
                      <Button
                        className={classes.decrement}
                        onClick={() => {
                          if (item.quantity <= 1) {
                            dispatch(deleteCartItem(userId, item.id));
                          }
                          changeQty(item, -1);
                        }}
                      >
                        -
                      </Button>
                      {item.quantity}
                      <Button onClick={() => changeQty(item, 1)} className={classes.increment}>
                        +
                      </Button>
                    </TableCell>
                    <TableCell align="right">{(item.price * item.quantity) / 100}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell component="th" scope="row" />
                  <TableCell align="right" />
                  <TableCell align="right" />
                  <TableCell align="right">{total / 100}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box mt={2}>
          <Button
            className={classes.checkout}
            to="/checkout"
            component={RouterLink}
            color="primary"
            variant="contained"
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart;
