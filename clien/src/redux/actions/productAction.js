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
  PRODUCT_ADD_COMMENT_SUCCESS,
  PRODUCT_ADD_COMMENT_FAIL,
} from "../types/productTypes";
import {
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_ERROR,
} from "../types/messageTypes";

import axios from "axios";

export const getProducts = (slug) => async (dispatch) => {
  dispatch({ type: PRODUCT_ALL_REQUEST });
  try {
    let url = "http://localhost:5000/api/product";
    if (slug) {
      url += `?slug=${slug}`;
    }
    const response = await axios.get(url);

    dispatch({ type: PRODUCT_ALL_SUCCESS, payload: response.data.products });
  } catch (e) {
    dispatch({ type: PRODUCT_ALL_FAIL });
    dispatch({ type: MESSAGE_TYPE_ERROR, payload: e.response.data.error });
  }
};
export const getProductDetail = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAIL_REQUEST });
  try {
    const response = await axios.get(`http://localhost:5000/api/product/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: PRODUCT_DETAIL_FAIL });
    dispatch({ type: MESSAGE_TYPE_ERROR, payload: e.response.data.error });
  }
};

export const createProduct = ({
  brand,
  category,
  description,
  image,
  price,
  stock,
}) => async (dispatch) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  try {
    const token = localStorage.getItem("token");
    stock = +stock;
    price = +price;

    if (token) {
      const response = await axios.post(
        "http://localhost:5000/api/product",
        {
          brand,
          category,
          description,
          image,
          price,
          stock,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: response.data.product
      });
      dispatch({ type: MESSAGE_TYPE_SUCCESS, payload: response.data.message });
    }
  } catch (e) {
    dispatch({ type: PRODUCT_CREATE_FAIL });
    dispatch({ type: MESSAGE_TYPE_ERROR, payload: e.response.data.error });
  }
};

export const editProduct = (
  { brand, category, description, image, price, stock },
  id
) => async (dispatch) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST });
  try {
    const token = localStorage.getItem("token");
    stock = +stock;
    price = +price;

    if (token) {
      const response = await axios.put(
        `http://localhost:5000/api/product/${id}`,
        {
          brand,
          category,
          description,
          image,
          price,
          stock,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: response.data.product,
      });
      dispatch({
        type: MESSAGE_TYPE_SUCCESS,
        payload: response.data.message,
      });
    }
  } catch (e) {
    dispatch({ type: PRODUCT_UPDATE_FAIL });
    dispatch({ type: MESSAGE_TYPE_ERROR, payload: e.response.data.error });
  }
};

export const removeProduct = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_REMOVE_REQUEST });
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:5000/api/product/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: PRODUCT_REMOVE_SUCCESS,
      payload: id,
    });
    dispatch({
      type: MESSAGE_TYPE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({ type: PRODUCT_REMOVE_FAIL });
    dispatch({ type: MESSAGE_TYPE_ERROR, payload: e.response.data.error });
  }
};

export const addComment = (productId, commentData) => async (dispatch) => {
  dispatch({ type: PRODUCT_ADD_COMMENT_REQUEST });
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `http://localhost:5000/api/product/${productId}/comment`,
      commentData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: PRODUCT_ADD_COMMENT_SUCCESS });
    dispatch({
      type: MESSAGE_TYPE_SUCCESS,
      payload: response.data.message,
    });
  } catch (e) {
    dispatch({ type: PRODUCT_ADD_COMMENT_FAIL });
    dispatch({
      type: MESSAGE_TYPE_ERROR,
      payload: e.response.data.error,
    });
  }
};
