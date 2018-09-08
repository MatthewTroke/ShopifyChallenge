import React, { Component } from "react";
import { connect } from "react-redux";
import { getProduct, postProduct } from "./actions/products";

class App extends Component {
  componentDidMount() {
    this.props.getProduct();
  }

  render() {
    if (!this.props.products) return <div>loading products</div>;
    return this.props.products.map(product => {
      return <div>{product.title}</div>;
    });
  }
}

const mapStateToProps = function(state) {
  return {
    products: state.products.products
  };
};

export default connect(
  mapStateToProps,
  { getProduct, postProduct }
)(App);
