import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from '../store';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Grid,
  Menu,
  MenuItem,
  IconButton,
  Badge,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: '#333333',
  },
  title: {
    textTransform: 'none',
    justifyContent: 'flex-start',
  },
  icons: {
    color: 'white',
  },
}));

const Navbar = ({ handleClick, isLoggedIn, isAdmin, cart }) => {
  const classes = useStyles();

  const [profileAnchor, setProfileAnchor] = useState(null);

  const handleOpen = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setProfileAnchor(null);
  };

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Grid container alignItems="center" wrap="nowrap">
          <Grid item>
            <Button color="inherit" className={classes.title} component={RouterLink} to="/">
              <Typography variant="h6">Grace Rocker</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" component={RouterLink} to="/products">
              Products
            </Button>
          </Grid>
          {isLoggedIn && (
            <React.Fragment>
              <Grid item>
                <Button color="inherit" component={RouterLink} to="/orderHistory">
                  Order History
                </Button>
              </Grid>
              {isAdmin && (
                <Button color="inherit" to="/admin/products" component={RouterLink}>
                  Add Product
                </Button>
              )}
              {isAdmin && (
                <Button color="inherit" to="/admin/users" component={RouterLink}>
                  All Users
                </Button>
              )}
            </React.Fragment>
          )}
        </Grid>
        <Grid container alignItems="center" justify="flex-end">
          <Grid item className={classes.icons}>
            <IconButton color="inherit" component={RouterLink} to="/cart">
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon fontSize="large" />
              </Badge>
            </IconButton>
          </Grid>
          <Grid item className={classes.icons}>
            <IconButton onClick={handleOpen} color="inherit">
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={profileAnchor}
              keepMounted
              open={Boolean(profileAnchor)}
              onClose={handleClose}
            >
              {!isLoggedIn && (
                <MenuItem onClick={handleClose}>
                  <Button color="inherit" component={RouterLink} to="/login">
                    Login
                  </Button>
                </MenuItem>
              )}
              {!isLoggedIn && (
                <MenuItem onClick={handleClose}>
                  <Button color="inherit" component={RouterLink} to="/signup">
                    Sign Up
                  </Button>
                </MenuItem>
              )}
              {isLoggedIn && (
                <MenuItem onClick={handleClose}>
                  <Button color="inherit" onClick={handleClick}>
                    Logout
                  </Button>
                </MenuItem>
              )}
            </Menu>
          </Grid>
        </Grid>
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
    cart: state.cart,
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
