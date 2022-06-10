import axios from "axios";
import { API } from "../config";
import { isAuthenticated } from "../Components/Auth";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "./orderConstants";

//CreateOrder i.e Place Order
//new Order gives Object {} as single order per time

//INSTEAD OF THE FOLLOWING ASYNC-AWAIT CODES, WE CAN ALSO DO .THEN-.CATCH CODES FOR API AS WE HAVE DONE IN CATEGORY.JS
export const createOrder = (order) => async (dispatch, getState) => {
  //After here, It Will Go To OrderReducer
  const { token } = isAuthenticated();
  try {
    //Dispatch The Following While Loading
    dispatch({ type: CREATE_ORDER_REQUEST });

    // console.log(order);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(order);
    const { data } = await axios.post(`${API}/postorder`, order, config);

    //Dispatch The FOllowing After Loading
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });

    //If Loading Fails, If Some Error
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.error,
    });
  }
};

//Personal Users Orders
//My Order Is In Array, as multiple orders
export const myOrders = () => async (dispatch) => {
  //since this function takes from local storage, so no need to pass id in myOrders(id)
  const { loginuser, token } = isAuthenticated();
  try {
    dispatch({ type: MY_ORDER_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`${API}/userorder/${loginuser._id}`);
    // console.log('data',data)
    dispatch({
      type: MY_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.error,
    });
  }
};

//clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const orderDetails = (id) => async (dispatch) => {
  //As we take id from params, and since this is not in local storage, we need to pass id here in orderDetails(id)
  console.log(id);
  const { token } = isAuthenticated();
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`${API}/orderdetail/${id}`);
    console.log(data);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.error,
    });
  }
};
