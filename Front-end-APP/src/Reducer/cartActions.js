import axios from "axios";
import { API } from "../config";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "./cartConstants";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${API}/findProd/${id}`);
  //whatever we have dispatched, it will be in data. i.e it will have all values from findprod (Product Details) of a particular id
  dispatch({
    //DISPATCH = WHEN BUTTON IS CLICKED, addItemsToCart is called, then data will select a product from id and put in data then dispatch is called.
    //DISPATCH ACTIVATES AND THEN checks type:(What to do, and switch accordingly; used for switching), payload: passing data
    type: ADD_TO_CART,
    payload: {
      //Can be in any order from backend
      //data.(something) where something = from backend
      product: id,
      product_name: data.product_name,
      product_price: data.product_price,
      product_description: data.product_description,
      product_image: data.product_image,
      Count_In_Stock: data.Count_In_Stock,
      quantity: quantity,
      //WE HAVE EXCLUDED CATEGORY HERE AS WE DO NOT NEED EVERYTHING
    },
  });
  //NOW SAVING IN LOCAL STORAGE
  localStorage.setItem(
    "cart_items",
    JSON.stringify(getState().cart.cart_items)
  );
  //stringify to convert JSON into string
  //getState to take reducer, (Which one to select?)
  //so, getState()cart.cartitems signifies cart = reducer and cartitems = inside cart
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  //as it is a function of reducer, we cannot call it directly, hence we have to pass (dispatch, getState)
  //TO ADD, WE NEED EVERY VALUE BUT TO REMOVE, JUST NEED ID
  // console.log(id)
  const { data } = await axios.get(`${API}/findProd/${id}`); //${id} passed from above (id)
  //whatever we have dispatched, it will be in data. i.e it will have all values from findprod (Product Details) of a particular id
  // console.log(data)
  dispatch({
    //DISPATCH = WHEN BUTTON IS CLICKED, addItemsToCart is called, then data will select a product from id and put in data then dispatch is called.
    //DISPATCH ACTIVATES AND THEN checks type:(What to do, and switch accordingly; used for switching), payload: passing data
    type: REMOVE_FROM_CART,
    payload: {
      //Can be in any order from backend
      //data.(something) where something = from backend
      product: data._id, // CAN ALSO DO product: id
    },
  });
  localStorage.setItem(
    "cart_items",
    JSON.stringify(getState().cart.cart_items)
  );
};

export const saveShippingInfo =
  (shipping_info) => async (dispatch, getState) => {
    //As Shipping Info Is Not In Backend Before i.e initially, so we dispatch directly
    //So
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: {
        // {shipping_info}, //Sending Shipping Info as object //NOT NEEDED AS ALREADY AN OBJECT ABOVE
        //SO:-
        shipping_info: shipping_info,
      },
    });
    localStorage.setItem(
      "shipping_info",
      JSON.stringify(getState().cart.shipping_info) //save shipping info in cart
    );
  };
