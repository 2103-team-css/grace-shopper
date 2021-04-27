import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeCart } from '../store/cart';
import { fetchHistory } from '../store/orderHistory';
import { Link as RouterLink } from 'react-router-dom';

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

toast.configure();

const useStyles = makeStyles(() => ({
  checkout: {
    float: 'right',
  },
}));

const Checkout = (props) => {
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  const { history } = props;
  const classes = useStyles();

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  async function handleToken(token) {
    try {
      let response;
      if (userId) {
        response = await axios.post(
          `/api/checkout/${userId}`,
          {
            cart,
            token,
          },
          {
            headers: {
              authorization: localStorage.getItem('token'),
            },
          }
        );
      } else {
        response = await axios.post('/api/checkout/guest', {
          cart,
          token,
        });
      }
      const { orderCode, cart: returnCart, total: returnTotal, status } = response.data;
      if (status === 'success') {
        if (userId) {
          toast('Success! Check your order history.', { type: 'success' });
          dispatch(fetchHistory(userId));
        } else {
          toast('Success!', { type: 'success' });
        }
        dispatch(removeCart(userId));
        history.push('/confirmation', {
          successful: true,
          cart: returnCart,
          orderCode: orderCode,
          total: returnTotal,
        });
      } else {
        toast('Sorry, something went wrong.', { type: 'error' });
        history.push('/confirmation', {
          successful: false,
        });
      }
    } catch (error) {
      console.error(error);
      toast('Sorry, something went wrong.', { type: 'error' });
      history.push('/confirmation', {
        successful: false,
      });
    }
  }

  return (
    <Container>
      <div className="checkout-cart">
        <h2>Your order:</h2>
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
                    <TableCell align="right">{item.quantity}</TableCell>
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
          <StripeCheckout
            stripeKey="pk_test_51IjxKTGFSgaIbDDasICfYfeRGHxBZIYxxQSjnjPJNCRozSkoRtFdcPIY6Kkhk6NrplsRyE4c5kJ62ERaXObksxYB00ko9ylzJM"
            token={handleToken}
            billingAddress
            shippingAddress
            amount={total}
            className={classes.checkout}
          />
        </Box>
      </div>
    </Container>
  );
};

export default Checkout;
