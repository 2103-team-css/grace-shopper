import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import {
  Typography,
  Box,
  Container,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
} from '@material-ui/core';

const OrderHistory = () => {
  const orderHistory = useSelector((state) => state.orderHistory);
  console.log('orderHistory>>>', orderHistory);
  return (
    <Container>
      <Box mt={3}>
        <Typography variant="h4">Order History:</Typography>
        {orderHistory.map((order) => {
          let total = 0;
          return (
            <Box mt={2} key={order.id}>
              <Card>
                <Box p={2}>
                  <Typography variant="h5">Order #{order.orderCode}</Typography>
                  <Typography variant="h6">
                    {new Date(order.createdAt).toLocaleString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                  <Box mt={1}>
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
                          {order.products.map((item) => {
                            total += item.quantity * item.price;
                            return (
                              <TableRow key={item.id}>
                                <TableCell component="th" scope="row">
                                  <Link to={`/products/${item.productId}`} component={RouterLink}>
                                    {item.name}
                                  </Link>
                                </TableCell>
                                <TableCell align="right">{item.price / 100}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">
                                  {(item.price * item.quantity) / 100}
                                </TableCell>
                              </TableRow>
                            );
                          })}
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
                </Box>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default OrderHistory;
