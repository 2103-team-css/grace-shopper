import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from './store/cart';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { fetchHistory } from './store/orderHistory';

import { CssBaseline } from '@material-ui/core';

const App = () => {
  const userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [userId]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchHistory(userId));
    }
  }, [userId]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <Routes />
    </React.Fragment>
  );
};

export default App;
