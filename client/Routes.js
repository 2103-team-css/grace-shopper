import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import Cart from "./components/Cart";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import SingleProduct from "./components/SingleProduct";
import { me } from "./store";
import CheckoutForm from "./components/CheckoutForm";
import OrderHistory from "./components/OrderHistory";
import Confirmation from "./components/Confirmation";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import AllUsers from "./components/AllUsers";

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
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/orderHistory" component={OrderHistory} />
            <Route path="/checkout" component={CheckoutForm} />
            <Route path="/confirmation" component={Confirmation} />
            {isAdmin && (
              <>
                <Route exact path="/admin/products" component={CreateProduct} />
                <Route
                  exact
                  path="/admin/products/:id"
                  component={EditProduct}
                />
                <Route exact path="/admin/users" component={AllUsers} />
              </>
            )}

            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={CheckoutForm} />
            <Route path="/confirmation" component={Confirmation} />
          </Switch>
        )}
      </div>
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
