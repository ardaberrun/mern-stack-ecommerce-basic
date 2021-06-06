import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_GET_ORDERS_REQUEST,
  USER_GET_ORDERS_SUCCESS,
  USER_GET_ORDERS_FAIL
} from "../types/userTypes";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  orders: []
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_LOGOUT_REQUEST:
    case USER_GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload
      };
    case USER_REGISTER_SUCCESS:
    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL:
    case USER_GET_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
      };
    case USER_LOGOUT_FAIL:
    default:
      return state;
  }
};

export default userReducer;
