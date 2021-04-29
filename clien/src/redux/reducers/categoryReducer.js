import {
  CATEGORY_ALL_REQUEST,
  CATEGORY_ALL_SUCCESS,
  CATEGORY_ALL_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_REMOVE_REQUEST,
  CATEGORY_REMOVE_SUCCESS,
  CATEGORY_REMOVE_FAIL,
} from "../types/categoryTypes";

const INITIAL_STATE = {
  categories: [],
  loading: false,
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CATEGORY_ALL_REQUEST:
    case CATEGORY_CREATE_REQUEST:
    case CATEGORY_REMOVE_REQUEST:
      return { ...state, loading: true };

    case CATEGORY_ALL_SUCCESS:
      return {
        categories: action.payload,
        loading: false,
    
      };
    case CATEGORY_CREATE_SUCCESS:
    case CATEGORY_REMOVE_SUCCESS:
    case CATEGORY_ALL_FAIL:
    case CATEGORY_CREATE_FAIL:
    case CATEGORY_REMOVE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
