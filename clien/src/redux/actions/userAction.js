import axios from "axios";
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
import {CART_DELETE} from '../types/cartTypes';
import {MESSAGE_TYPE_SUCCESS,MESSAGE_TYPE_ERROR} from '../types/messageTypes';




export const register = (userData) => async (
  dispatch
) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const response = await axios.post("http://localhost:5000/api/register",userData);
    dispatch({ type: USER_REGISTER_SUCCESS });
    dispatch({ type: MESSAGE_TYPE_SUCCESS, payload: response.data.message });
   
  } catch (e) {
    dispatch({ type: USER_REGISTER_FAIL });    
    dispatch({ type: MESSAGE_TYPE_ERROR, payload: e.response.data.error });    
  }

 
};

export const login = ({ email, password }, history) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const { data } = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });
  
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.data));

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data });
    dispatch({ type: MESSAGE_TYPE_SUCCESS, payload: 'Başarıyla giriş yaptınız.' });
    history.push("/");

  } catch (e) {
    dispatch({ type: USER_LOGIN_FAIL });
    dispatch({ type: MESSAGE_TYPE_ERROR, payload: e.response.data.error });      
  }

};

export const logout = (history) => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch({type:USER_LOGOUT_SUCCESS});
    dispatch({type:CART_DELETE});
    dispatch({ type: MESSAGE_TYPE_SUCCESS, payload: 'Başarıyla çıkış yaptınız.' });

    history.push('/');

  }catch(e) {
    dispatch({type: USER_LOGOUT_FAIL});
    dispatch({ type: MESSAGE_TYPE_ERROR, payload: 'Çıkış yaparken bir hata oluştu.'});   
  }
};

export const getOrders = () => async (dispatch) => {
  dispatch({type: USER_GET_ORDERS_REQUEST});
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`http://localhost:5000/api/order`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });  
    dispatch({type: USER_GET_ORDERS_SUCCESS,payload: response.data.orders});    

  }catch(e) {
    dispatch({type: USER_GET_ORDERS_FAIL});
    dispatch({ type: MESSAGE_TYPE_ERROR, payload: 'Satın alınan ürünler getirilirken bir hata oluştu.'});   
  
  }
};
