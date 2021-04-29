import {
  PRODUCT_ALL_REQUEST,
  PRODUCT_ALL_SUCCESS,
  PRODUCT_ALL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_REMOVE_REQUEST,
  PRODUCT_REMOVE_SUCCESS,
  PRODUCT_REMOVE_FAIL,
  PRODUCT_ADD_COMMENT_REQUEST,
  PRODUCT_ADD_COMMENT_FAIL,
  PRODUCT_ADD_COMMENT_SUCCESS,
} from "../types/productTypes";

const INITIAL_STATE = {
  products: [],
  product: {},
  loading: false,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_ALL_REQUEST:
    case PRODUCT_DETAIL_REQUEST:
    case PRODUCT_CREATE_REQUEST:
    case PRODUCT_UPDATE_REQUEST:
    case PRODUCT_REMOVE_REQUEST:
    case PRODUCT_ADD_COMMENT_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_ALL_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case PRODUCT_DETAIL_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products,action.payload]
      }
    case PRODUCT_ADD_COMMENT_SUCCESS:
    case PRODUCT_ALL_FAIL:
    case PRODUCT_DETAIL_FAIL:
    case PRODUCT_CREATE_FAIL:
    case PRODUCT_UPDATE_FAIL:
    case PRODUCT_REMOVE_FAIL:
    case PRODUCT_ADD_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case PRODUCT_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default productReducer;
