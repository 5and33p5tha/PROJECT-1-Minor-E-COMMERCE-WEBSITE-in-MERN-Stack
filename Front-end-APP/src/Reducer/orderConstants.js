export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAIL = "CREATE_ORDER_FAIL";

export const MY_ORDER_REQUEST = "MY_ORDER_REQUEST";
export const MY_ORDER_SUCCESS = "MY_ORDER_SUCCESS";
export const MY_ORDER_FAIL = "MY_ORDER_FAIL";

export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL";

export const CLEAR_ERRORS = "CLEAR_ERRORS";

//Redux:-
//orderConstants (self-choice)
//orderReducer ()
//in index or app.js, do     <Provider store={store}>
/* FOR COMMON STORE, HENCE WE HAVE KEPT IT IN MYROUTES  */
//   <MyRouter />
//   </Provider>
//Just note this has to wrap the <MyRouter/>
//orderActions(), BUT IN ACTUAL, ORDER ACTIONS WORKS FIRST AND SENDS TO ORDER REDUCER NA DCOMES BACK AGAIN
//https://redux.js.org/tutorials/essentials/part-1-overview-concepts#redux-application-data-flow
