import {
  CART_GET_ITEM_SUCCESS,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CHANGE_QUANTITY_ITEM,
  CART_DELETE
} from "../types/cartTypes";

const INITIAL_STATE = {
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
    case CART_GET_ITEM_SUCCESS:
        return {
          ...state,
          cartItems: action.payload,
        };
      
    case CART_CHANGE_QUANTITY_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product._id === action.payload.id
            ? { ...item, quantity: action.payload.qty}
            : item
        ),
      };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(cartItem => cartItem.product._id !== action.payload)
      };
    case CART_DELETE:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
