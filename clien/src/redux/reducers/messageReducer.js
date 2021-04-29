import {
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_ERROR,
} from "../types/messageTypes";

const messageReducer = (state = { type: null, message: null }, action) => {
  switch (action.type) {
    case MESSAGE_TYPE_SUCCESS:
      return { type: "success", message: action.payload };
    case MESSAGE_TYPE_ERROR:
      return { type: "error", message: action.payload };
    default:
      return state;
  }
};

export default messageReducer;
