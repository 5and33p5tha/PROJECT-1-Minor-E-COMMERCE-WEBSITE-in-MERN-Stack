//Reducer = used to store cart.
//This will create reducer. Multiple reducers may be present
//It will be combined in store.
//after button clicks, first get data and dispatch, what to do in dispatch is defined in cartActions,  BEFORE WE DID THIS IN SAME BUTTON ACTIONS PAGE, NOW WE CALL THIS FUNCTION
//cartConstants is just to create constants for dispatch
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "./cartConstants";

//THE FOLLOWING LINES ARE COMMENTED AS THIS HAS BEEN WRITTEN IN STORE.JS
// const initialData = {
//     cart_items: []
// }

// const cartReducer = (state=initialData, actions)=> { //NOW THIS WILL RESULT IN ERROR
//SO, WRITTEN AS:
const cartReducer = (state = { cart_items: [], shipping_info: {} }, action) => {
  //Cart Items as object and shipping_info as array
  //the cart from store.js is passed in state in here as initial state and WHATEVER THE CART HAS, IT WILL BE HERE
  switch (action.type) {
    //To Add TO Cart
    case ADD_TO_CART:
      //everytime it is added to cart, do the following
      let item = action.payload; //payload from cartActions
      //action.payload puts that in item

      let itemExists = state.cart_items.find((i) => i.product === item.product); //TO CHECK IF THAT ITEM IS ALREADY IN CART OR NOT
      //IF ITEM EXISTS, RETURN THAT ITEM, IF THAT ITEM IS NOT THERE, RETURN NULL

      //If That Item Already Exists
      if (itemExists) {
        //... = rest operator, to save old values
        //METHOD 1
        return {
          ...state,
          cart_items: state.cart_items.map((i) =>
            i.product === item.product ? item : i
          ),
        };

        //the above code will make sure that this will not create a duplicate

        //Example:-
        //let i : a, b, c, d
        //let item = c
        //now for a===c, return a i.e i
        //now for b===c, return b i.e i
        //now for c===c, return c i.e item
        //now for d===c, return c i.e i
        //hence no repeated items

        //NOW FOR SAME ITEMS AND TO INCREASE ITS QUANTITY WITH PLUS AND MINUS  BUTTON
        // i = apple 6, samsung 3
        // payload = apple 7  [say previous quantity of apple = 6 and we have written new_quantity = quantity + 1 as defined so 7]
        //compare apple 6 and apple 7 [say previous quantity of apple = 6 and we have written new_quantity = quantity + 1 as defined so 7]
        // hence return apple 7 instead of apple 6  as apple = apple and 6, 7 are quantity and not the name
        // again compare apple 7 and samsung 3
        // payload = apple 7
        // return samsung 3
      } else {
        return {
          ...state, //as multiple reducers are there
          cart_items: [...state.cart_items, item],
        };
      }

    //To Remove From Cart
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart_items: state.cart_items.filter(
          (i) => i.product != action.payload.product
        ),
      };

    //Example:-
    //i:- Samsung, Apple, LG, Sony
    //payload:- Samsung  i.e remove samsung
    //return : Apple, LG, Song i.e Show except Samsung i.e after removal

    //To Save Shipping Info
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        // Normally we do
        // shipping_info: state.shipping_info
        //But shipping_info is not an array but object, Thus We Get Value In Object Directly
        //Hence
        shipping_info: action.payload, //not {action.Payload} as already an object that was passed here, SO NO NEED TO MAKE AN OBJECT HERE ASWELL
      };

    default:
      return state;
  }
};
export default cartReducer;
