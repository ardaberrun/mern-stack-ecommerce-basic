import {
  CART_GET_ITEM_SUCCESS,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_INCREASE_ITEM,
  CART_DECREASE_ITEM,
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
      
    case CART_INCREASE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case CART_DECREASE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item._id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !==  action.payload),
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
