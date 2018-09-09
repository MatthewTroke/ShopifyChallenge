import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default class Product extends Component {
  render() {
    return (
      <ListItem button onClick={this.props.onItemClick}>
        <ListItemText className="crop" primary={this.props.title} />
      </ListItem>
    );
  }
}
