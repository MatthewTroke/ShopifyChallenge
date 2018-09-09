import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./Card";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { getProductsWithTitleFilter } from "../actions/products";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  textField: {
    width: 500
  }
});

class Products extends Component {
  state = {
    filter: ""
  };

  componentDidMount() {
    this.props.getProductsWithTitleFilter("");
  }

  handleChange = e => {
    this.setState({ filter: e.target.value });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.getProductsWithTitleFilter(e.target.value);
    } else {
      return null;
    }
  };

  render() {
    if (!this.props.filteredProducts) return <div>Loading</div>;
    return (
      <div>
        <TextField
          id="filter"
          label="Filter By Title (Press enter to filter)"
          className={this.props.classes.textField}
          value={this.state.filter}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          margin="normal"
        />
        <div className={this.props.classes.root}>
          <Grid container spacing={24}>
            {this.props.filteredProducts.map(product => {
              return (
                <Grid key={product.id} item lg={3} sm={3} xm={6}>
                  <Card product={product} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    filteredProducts: state.products.filteredProducts
  };
};

export default connect(
  mapStateToProps,
  { getProductsWithTitleFilter }
)(withStyles(styles)(Products));
