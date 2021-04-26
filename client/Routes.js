import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import AllProducts from './components/AllProducts';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import SingleProduct from './components/SingleProduct';
import { me } from './store';
import OrderHistory from './components/OrderHistory';
import Confirmation from './components/Confirmation';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import AllUsers from './components/AllUsers';
import Checkout from './components/Checkout';

/**
 * COMPONENT
 */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/confirmation" component={Confirmation} />
        {isLoggedIn && <Route path="/orderHistory" component={OrderHistory} />}
        {!isLoggedIn && <Route path="/login" component={Login} />}
        {!isLoggedIn && <Route path="/signup" component={Signup} />}
        {isAdmin && (
          <>
            <Route exact path="/admin/products" component={CreateProduct} />
            <Route exact path="/admin/products/:id" component={EditProduct} />
            <Route exact path="/admin/users" component={AllUsers} />
          </>
        )}
        <Redirect to="/" />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
