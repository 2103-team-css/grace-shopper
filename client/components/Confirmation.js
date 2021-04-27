import React from 'react';
import { useLocation, Redirect, Link as RouterLink } from 'react-router-dom';

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
} from '@material-ui/core';

const Confirmation = () => {
  const location = useLocation();

  if (!location.state) {
    return <Redirect to="/" />;
  }

  const { successful, cart, orderCode, total } = location.state;
  return (
    <Container>
      <Box mt={3}>
        {successful ? (
          <Box>
            <Typography variant="h5">Your order has been placed!</Typography>
            <Typography variant="h6">Order number: {orderCode}</Typography>
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
          </Box>
        ) : (
          <Typography variant="h5">
            Your order could not be processed at the moment. Please try again later.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Confirmation;
