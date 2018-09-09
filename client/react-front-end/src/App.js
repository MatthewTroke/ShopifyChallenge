import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./reset.css";
import Drawer from "./components/Drawer";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import { connect } from "react-redux";
import { getProducts } from "./actions/products";
import ProductPage from "./components/ProductPage";

class App extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    return (
      <Router>
        <React.Fragment>
          <Drawer>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/add" component={AddProduct} />
              <Route exact path="/products" component={Products} />
              <Route path="/:productId" component={ProductPage} />
            </Switch>
          </Drawer>
        </React.Fragment>
      </Router>
    );
  }
}

export default connect(
  null,
  { getProducts }
)(App);
