import {
  CART_GET_ITEM_SUCCESS,
  CART_GET_ITEM_FAIL,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_INCREASE_ITEM,
  CART_DECREASE_ITEM,
} from "../types/cartTypes";
import { MESSAGE_TYPE_ERROR } from "../types/messageTypes";
import axios from "axios";

export const getCartItems = () => async (dispatch) => { 
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get("http://localhost:5000/api/cart", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({ type: CART_GET_ITEM_SUCCESS, payload: response.data.basket });
  } catch (error) {
    console.log(error);
    dispatch({ type: CART_GET_ITEM_FAIL });
  }
};

export const addToCart = (id) => async (dispatch,getState) => {
  try {
    if(getState().cart.cartItems.every(el => el.product._id !== id)) {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/cart",
        { cartItem: id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
  
      dispatch({ type: CART_ADD_ITEM, payload: response.data.basket });
    }
  
  } catch (error) {
    dispatch({
      type: MESSAGE_TYPE_ERROR,
      payload: "Ürün sepete eklenirken hata oluştu",
    });
  }
};

export const increaseItem = (id) => async (dispatch) => {
  try {

    const token = localStorage.getItem('token');
    const response = await axios.patch(`http://localhost:5000/api/cart?product=${id}`,{quantity: 1},{
      headers: {
        Authorization : 'Bearer ' + token
      }
    })
    // dispatch({ type: CART_INCREASE_ITEM, payload: id });
  }catch(error) {
    console.log(error);
  }
 
};
export const decreaseItem = (id) => async (dispatch) => {
  dispatch({ type: CART_DECREASE_ITEM, payload: id });
};

export const removeItem = (id) => async (dispatch) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
};
