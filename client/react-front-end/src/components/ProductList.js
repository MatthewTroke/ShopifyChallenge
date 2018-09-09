import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Product from "./Product";
import { Link } from "react-router-dom";

class ProductList extends Component {
  clickItem = e => {
    e.preventDefault();
  };

  renderProductRows = () => {
    return (
      <List>
        {this.props.products.map(product => {
          return (
            <Link
              key={product.id}
              style={{ textDecoration: "none" }}
              to={`/${product.id}`}
            >
              <Product title={product.title} key={product.id} />
            </Link>
          );
        })}
      </List>
    );
  };

  render() {
    const { products } = this.props;
    if (!products) return <Product title="Loading" />;
    return (
      <Fragment>
        <Link style={{ textDecoration: "none" }} to="/products">
          <Product title="All Products" />
        </Link>
        <Divider />
        {this.renderProductRows()}
        <Divider />
        <Link style={{ textDecoration: "none" }} to="/add">
          <Product title="Add Product" />
        </Link>
      </Fragment>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    products: state.products.products
  };
};

export default connect(
  mapStateToProps,
  null
)(ProductList);
