import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { updateProduct } from "../actions/products";

class FormDialog extends React.Component {
  state = {
    open: false,
    id: this.props.variant.id,
    sku: this.props.variant.sku,
    inventory_quantity: this.props.variant.inventory_quantity,
    price: this.props.variant.price
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  saveChanges = () => {
    //Updates product based on the variant id
    const { id, sku, inventory_quantity, price } = this.state;
    let newVariantIndex = this.props.variants.findIndex(
      v => v.id == this.props.variant.id
    );
    let newVariants = this.props.variants.map(v => ({ id: v.id }));
    newVariants[newVariantIndex] = {
      id,
      sku,
      inventory_quantity,
      price
    };
    this.props.updateProduct(newVariants, this.props.productId);
  };

  renderTextFields = () => {
    return (
      <Fragment>
        <TextField
          autoFocus
          margin="normal"
          id="sku"
          label="SKU"
          onChange={this.handleChange("sku")}
          value={this.state.sku}
          type="title"
          fullWidth
        />

        <TextField
          autoFocus
          margin="normal"
          id="inventory_quantity"
          label="Stock"
          onChange={this.handleChange("inventory_quantity")}
          value={this.state.inventory_quantity}
          type="title"
          fullWidth
        />

        <TextField
          autoFocus
          margin="normal"
          id="price"
          label="Price"
          onChange={this.handleChange("price")}
          value={this.state.price}
          type="title"
          fullWidth
        />
      </Fragment>
    );
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Edit</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the variant attributes. Click SAVE CHANGES when you finish.
            </DialogContentText>
            {this.renderTextFields()}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.saveChanges} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  null,
  { updateProduct }
)(FormDialog);
