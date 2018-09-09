let initialState = {
  products: null,
  filteredProducts: null
};

export default function ProductsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCT_PENDING":
      return state;
    case "GET_PRODUCT_SUCCESS":
      return { ...state, products: action.payload };
    case "GET_PRODUCT_ERROR":
      return { ...state, products: action.payload };
    case "GET_PRODUCT_WITH_FILTER_PENDING":
      return state;
    case "GET_PRODUCT_WITH_FILTER_SUCCESS":
      return { ...state, filteredProducts: action.payload };
    case "GET_PRODUCT_WITH_FILTER_ERROR":
      return { ...state, filteredProducts: action.payload };
    default:
      return state;
  }
}
