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
import {
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_ERROR,
} from "../types/messageTypes";

import axios from "axios";

export const getCategories = () => async (dispatch) => {
  dispatch({ type: CATEGORY_ALL_REQUEST });
  try {
    const response = await axios.get("http://localhost:5000/api/category");

    dispatch({ type: CATEGORY_ALL_SUCCESS, payload: response.data.categories });
  } catch (e) {
    dispatch({ type: CATEGORY_ALL_FAIL });
    dispatch({ type: MESSAGE_TYPE_ERROR, payload: e.response.data.error });
  }
};

export const createCategory = (name) => async (dispatch) => {
  dispatch({ type: CATEGORY_CREATE_REQUEST });
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await axios.post(
        "http://localhost:5000/api/category",
        { name },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({ type: CATEGORY_CREATE_SUCCESS });
      dispatch({ type: MESSAGE_TYPE_SUCCESS, payload: response.data.message });
    }
  } catch (e) {
    dispatch({ type: CATEGORY_CREATE_FAIL });
    dispatch({ type: MESSAGE_TYPE_ERROR, payload: e.response.data.error });
  }
};

export const removeCategory = (id) => async (dispatch) => {
  dispatch({ type: CATEGORY_REMOVE_REQUEST });
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:5000/api/category/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: CATEGORY_REMOVE_SUCCESS });
    dispatch({ type: MESSAGE_TYPE_SUCCESS, payload: response.data.message });
  } catch (e) {
    dispatch({ type: CATEGORY_REMOVE_FAIL });
    dispatch({ type: MESSAGE_TYPE_ERROR, payload: e.response.data.error });
  }
};
