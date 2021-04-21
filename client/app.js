import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from './store/cart';
import Navbar from './components/Navbar';
import Routes from './routes';

const App = () => {
  const userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [userId]);

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
