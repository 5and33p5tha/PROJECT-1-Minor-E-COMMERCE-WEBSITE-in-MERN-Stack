import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import cartReducer from "./cartReducer";
import {
  myOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./orderReducer";

//PREVIOUSLY, THIS INITIALSTATE WAS DEFINED IN REDUCER, WE CAN DEFINE IT HERE ASWELL
const initialState = {
  cart: {
    //this cart is passed in state in cartReducer.js
    //General Rule,
    //Multiple items = array
    //Single item = object
    cart_items: localStorage.getItem("cart_items")
      ? JSON.parse(localStorage.getItem("cart_items"))
      : [],
    //[] as it has to be array as multiple items may be in cart
    //If localStorage has item, We need to take it as parse
    //SO, IF localStorage.getItem('cart_items'), WE TAKE IT AS
    //JSON.parse(localStorage.getItem('cart_items'))
    //ELSE IF LOCALSTORAGE IS EMPTY,
    //TAKE [] I.E EMPTY
    //PARSE CONVERTS JSON STRING INTO OBJECT

    //SAME CONCEPT IN SHIPPING INFO
    //If Value in SHipping Info, DO:-
    shipping_info: localStorage.getItem("shipping_info")
      ? //Else Pass Empty Object
        JSON.parse(localStorage.getItem("shipping_info"))
      : {},
    //{} as it has to be object as only one shipping address
  },
};

//Similarly, we can do the same for order

//combining reducers
const reducer = combineReducers({
  cart: cartReducer,
  newOrder: newOrderReducer, //i.e create new order
  myOrder: myOrderReducer, //i.e personal users orders
  orderDetails: orderDetailsReducer, //i.e user order details
});

//using middleware
const middleware = [thunk];

//CREATING THE OBJECT OF REDUCER
const store = createStore(
  //CreateStore is cut here it has been updated
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) //applying middleware, NEED TO INSTALL EXTENSION IN BROWSER
);

export default store;
