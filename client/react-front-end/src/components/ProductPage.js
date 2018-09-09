import React, { Component } from "react";
import Paper from "./Paper";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { Divider, Button } from "@material-ui/core";
import Dialog from "./Dialog";
import { deleteProduct } from "../actions/products";

class ProductPage extends Component {
  onButtonClick = () => {
    this.props.deleteProduct(this.props.product.id);
  };

  renderVariants() {
    return this.props.product.variants.map(variant => {
      return (
        <div key={variant.id}>
          {variant.title}
          <div>SKU: {variant.sku}</div>
          <div>Stock: {variant.inventory_quantity}</div>
          <div>Price: {variant.price}</div>
          <Dialog
            variant={variant}
            variants={this.props.product.variants}
            productId={this.props.product.id}
          />
          <Divider />
        </div>
      );
    });
  }

  render() {
    if (!this.props.product) return <div>Loading...</div>;
    return (
      <div>
        <Typography gutterBottom variant="display1" color="inherit">
          {this.props.product.title}
          <Button onClick={this.onButtonClick} color="primary">
            Delete Product
          </Button>
        </Typography>
        <Paper>
          <Typography gutterBottom variant="title" color="inherit">
            Variants
          </Typography>
          {this.renderVariants()}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = function(state, props) {
  return {
    product: selector(state.products.products, props.match.params.productId)
  };
};

//Selector Function
const selector = (products, productId) => {
  if (products) {
    return products.find(elem => {
      return elem.id == productId;
    });
  } else {
    return null;
  }
};

export default connect(
  mapStateToProps,
  { deleteProduct }
)(ProductPage);
