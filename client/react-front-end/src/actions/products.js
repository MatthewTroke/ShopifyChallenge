import axios from "axios";

export function getProducts() {
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

export function getProductsWithTitleFilter(filter) {
  return async dispatch => {
    try {
      dispatch({ type: "GET_PRODUCT_WITH_FILTER_PENDING" });
      let products = await axios.get(
        `http://localhost:3000/shopify?path=products.json&title=${filter}`
      );
      dispatch({
        type: "GET_PRODUCT_WITH_FILTER_SUCCESS",
        payload: products.data.products
      });
    } catch (err) {
      dispatch({ type: "GET_PRODUCT_WITH_FILTER_ERROR" });
    }
  };
}

export function deleteProduct(productId) {
  return async dispatch => {
    try {
      dispatch({ type: "DELETE_PRODUCT_PENDING" });
      let products = await axios.delete(
        `http://localhost:3000/shopify?path=products/${productId}.json`
      );
      dispatch(getProducts());
    } catch (err) {
      dispatch({ type: "DELETE_PRODUCT_ERROR", payload: err });
    }
  };
}

export function updateProduct(variants, productId) {
  return async dispatch => {
    try {
      dispatch({ type: "UPDATE_PRODUCT_PENDING" });
      let products = await axios.put(
        `http://localhost:3000/shopify?path=products/${productId}.json`,
        { product: { id: productId, variants } }
      );
      dispatch(getProducts());
    } catch (err) {
      dispatch({ type: "UPDATE_PRODUCT_ERROR", payload: err });
    }
  };
}

export function postProduct(product) {
  return async dispatch => {
    let result;
    //Cartesian Algorithm.
    const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
    const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);
    let productOptions = product.options.map(option => option.values);
    let cartesianResult = cartesian(...productOptions);
    if (product.options.length < 2) {
      cartesianResult = cartesianResult.map(v => Array(v));
    }
    let variants = cartesianResult.map(array => {
      return array.reduce((obj, val, index) => {
        let optionNumber = "option" + (index + 1);
        obj[optionNumber] = val;
        return obj;
      }, {});
    });
    result = { product: { ...product, variants: variants } };
    try {
      let products = await axios.post(
        `http://localhost:3000/shopify?path=products.json`,
        result
      );
      dispatch(getProducts());
    } catch (err) {}
  };
}
