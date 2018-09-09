import React, { Component } from "react";
import Paper from "./Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { postProduct } from "../actions/products";
import { connect } from "react-redux";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  menu: {
    width: 200
  },
  options: {
    paddingBottom: "20px",
    width: "80%",
    margin: 0
  }
});

class Option {
  constructor() {
    this.name = "";
    this.value = "";
  }
}

class AddProduct extends Component {
  state = {
    title: "",
    body_html: "",
    options: []
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  addOption = () => {
    if (this.state.options.length < 3) {
      let option = new Option();
      this.setState(prevState => ({
        options: [...prevState.options, option]
      }));
    }
  };

  handleOptionChange = (e, index, name) => {
    let newAttributes = [...this.state.options];
    newAttributes[index][name] = e.target.value;
    this.setState({ options: newAttributes });
  };

  removeOption = (e, index) => {
    let newAttributes = [...this.state.options];
    newAttributes.splice(index, 1);
    this.setState({ options: newAttributes });
  };

  displayAddOptionsButton = e => {
    const { classes } = this.props;
    if (this.state.options.length < 3) {
      return (
        <Button
          color="primary"
          className={classes.button}
          onClick={this.addOption}
        >
          Add A New option
        </Button>
      );
    } else {
      return (
        <Button color="primary" disabled={true} className={classes.button}>
          Add A New option
        </Button>
      );
    }
  };

  renderProductInformation = () => {
    const { classes } = this.props;
    return (
      <Paper>
        <Typography gutterBottom variant="title" color="inherit">
          Product Information
        </Typography>
        <TextField
          id="title"
          label="Title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange("title")}
          margin="none"
        />
        <TextField
          id="body_html"
          label="Description"
          multiline
          rows="4"
          onChange={this.handleChange("body_html")}
          className={classes.textField}
          margin="normal"
        />
      </Paper>
    );
  };

  renderProductOptions = () => {
    const { classes } = this.props;
    return (
      <Paper>
        <Typography gutterBottom variant="title" color="inherit">
          Options
        </Typography>
        {this.state.options.map((option, index) => {
          return (
            <div className={classes.options} key={index}>
              <TextField
                id="name"
                label="Name (e.g. Color)"
                className={classes.textField}
                value={this.state.options[index].name}
                onChange={e => this.handleOptionChange(e, index, "name")}
                margin="none"
              />
              <TextField
                id="value"
                label="Values (Seperated by commas)"
                className={classes.textField}
                value={this.state.options[index].value}
                onChange={e => this.handleOptionChange(e, index, "value")}
                margin="none"
              />
              <Button
                color="primary"
                onClick={e => this.removeOption(e, index)}
                className={classes.button}
              >
                Remove Option
              </Button>
            </div>
          );
        })}
      </Paper>
    );
  };

  addProduct = () => {
    let newOptions = this.state.options.map(option => {
      return {
        name: option.name,
        values: option.value.split(",").map(value => value.trim())
      };
    });
    let newState = { ...this.state, options: newOptions };
    this.props.postProduct(newState);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography gutterBottom variant="display1" color="inherit">
          Add a product
        </Typography>
        {this.renderProductInformation()}
        {this.renderProductOptions()}
        {this.displayAddOptionsButton()}
        <Button
          color="primary"
          onClick={this.addProduct}
          className={classes.button}
        >
          Add Product
        </Button>
      </div>
    );
  }
}

export default connect(
  null,
  { postProduct }
)(withStyles(styles)(AddProduct));
