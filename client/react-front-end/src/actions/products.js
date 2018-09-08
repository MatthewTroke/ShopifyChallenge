import axios from "axios";

export function getProduct() {
  return async dispatch => {
    try {
      dispatch({ type: "GET_PRODUCT_PENDING" });
      let products = await axios.get(
        `http://localhost:3000/shopify?path=products.json`
      );
      dispatch({
        type: "GET_PRODUCT_SUCCESS",
        payload: products.data.products
      });
    } catch (err) {
      dispatch({ type: "GET_PRODUCT_ERROR" });
    }
  };
}

export function postProduct() {
  return async dispatch => {
    var obj = {
      product: {
        title: "Burton Custom Freestyle 151",
        body_html: "<strong>Good snowboard!</strong>",
        vendor: "Burton",
        product_type: "Snowboard",
        variants: [
          {
            option1: "First",
            price: "10.00",
            sku: "1"
          },
          {
            option1: "Second",
            price: "20.00",
            sku: "2"
          }
        ]
      }
    };

    try {
      dispatch({ type: "POST_PRODUCT_PENDING" });
      let products = await axios.post(
        `http://localhost:3000/shopify?path=products.json`,
        obj
      );
      console.log(products.data.product);
      dispatch({
        type: "POST_PRODUCT_SUCCESS",
        payload: products.data.product
      });
    } catch (err) {
      dispatch({ type: "POST_PRODUCT_ERROR", payload: err });
    }
  };
}
