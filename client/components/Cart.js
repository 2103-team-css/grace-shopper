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
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(() => ({
  checkout: {
    float: 'right',
  },
  remove: {
    color: 'red',
  },
  decrement: {
    color: '#f54281',
  },
  increment: {
    color: '#32b324',
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
        <Box mt={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Item</TableCell>
                  <TableCell align="center">Price ($)</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Total ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <IconButton
                        className={classes.remove}
                        onClick={() => {
                          dispatch(deleteCartItem(userId, item.id));
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={`/products/${item.productId}`} component={RouterLink}>
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{item.price / 100}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        className={classes.decrement}
                        onClick={() => {
                          if (item.quantity <= 1) {
                            dispatch(deleteCartItem(userId, item.id));
                          }
                          changeQty(item, -1);
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      {item.quantity}
                      <IconButton onClick={() => changeQty(item, 1)} className={classes.increment}>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">{(item.price * item.quantity) / 100}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell />
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
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => {
              dispatch(removeCart(userId));
            }}
          >
            Clear Cart
          </Button>
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
