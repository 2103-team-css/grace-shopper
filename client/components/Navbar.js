import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from '../store';

import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: '#333333',
  },
  title: {
    textTransform: 'none',
    justifyContent: 'flex-start',
  },
}));

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Button color="inherit" className={classes.title} component={RouterLink} to="/">
          <Typography variant="h6">Grace Rocker</Typography>
        </Button>
        <Button color="inherit" component={RouterLink} to="/products">
          Products
        </Button>
        <Button color="inherit" component={RouterLink} to="/cart">
          Cart
        </Button>
        {isLoggedIn ? (
          <React.Fragment>
            {/* The navbar will show these links after you log in */}
            <Button color="inherit" onClick={handleClick}>
              Logout
            </Button>
            <Button color="inherit" component={RouterLink} to="/orderHistory">
              Order History
            </Button>
            {isAdmin && (
              <>
                <RouterLink to="/admin/products"> Add Product</RouterLink>
                <RouterLink to="/admin/users"> All Users</RouterLink>
              </>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* The navbar will show these links before you log in */}
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/signup">
              Sign Up
            </Button>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
