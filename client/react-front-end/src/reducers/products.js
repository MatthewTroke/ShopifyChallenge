let initialState = {
  products: null
};

export default function ProductsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCT_PENDING":
      return state;
    case "GET_PRODUCT_SUCCESS":
      return { ...state, products: action.payload };
    case "GET_PRODUCT_ERROR":
      return { ...state, products: action.payload };
    case "GET_PRODUCT_PENDING":
      return state;
    case "GET_PRODUCT_SUCCESS":
      return { ...state, products: [...state.products, action.payload] };
    case "GET_PRODUCT_ERROR":
      return { ...state, products: action.payload };
    default:
      return state;
  }
}
