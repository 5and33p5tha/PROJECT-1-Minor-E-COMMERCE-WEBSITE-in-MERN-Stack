//FUNCTION TO CONNECT TO BACKEND

import { API } from "../../config";

//For Signup i.e TO CONNECT TO SIGNUP BACKEND
export const signupfrombackendtofrontend = (user) => {
  //user = data/value from signup form
  //SEND THOSE VALUE IN BACKEND TO RUN ADDUSER FUNCTIONS
  //TO DO SO: THE FOLLOWING IS DONE SO

  // console.log(user); only to check error
  return (
    // fetch(`${API}/addUser`, { API ERROR SO REPLACING BY THE FOLLOWING
    fetch(`http://localhost:8000/api/addUser`, {
      //THIS IS ONLY IF api is set as the default route in backend, if different routes than this code requires changes
      //${API} => PATH i.e LocalHost Path as In ENV and /addUser is the ADD USER FUNCTION IN BACKEND
      method: "post",
      //For Method Post, Headers Is Necessary
      headers: {
        //JSON FORMAT
        accept: "application/json", //VALUE TO BE ACCEPTED SHOULD BE IN JSON FORMAT
        "Content-Type": "application/json", //VALUE PASSED SHOULD BE JSON TYPE
      },
      body: JSON.stringify(user), //converts in JSON format
    })
      //IF SUCCESSFUL FETCH
      //LOOK ELSE IN ADDUSER FUNCTION SAY EX: SUCCESSFUL MESSAGE
      //ALL MESSAGES OF BACKEND FAILED SUCESSFUL, ETC
      // .then((res) => {
      //   return res.json();
      // })

      .then((res) => res.json())

      //IF FETCH IS UNSUCESSFUL, IT IS PLACED IN CATCH
      .catch((err) => console.log(err))
  );
};

//For Signup i.e TO CONNECT TO SIGNIN BACKEND
export const SignIn = (user) => {
  //user = data/value from signup form
  //SEND THOSE VALUE IN BACKEND TO RUN ADDUSER FUNCTIONS
  //TO DO SO: THE FOLLOWING IS DONE SO
  // console.log(user);
  return (
    // fetch(
    // `${API}/signin`, //{ API ERROR SO REPLACING BY THE FOLLOWING
    fetch(`http://localhost:8000/api/signin`, {
      //THIS IS ONLY IF api is set as the default route in backend, if different routes than this code requires changes
      //${API} => PATH i.e LocalHost Path as In ENV and /addUser is the ADD USER FUNCTION IN BACKEND
      method: "post",
      //For Method Post, Headers Is Necessary
      headers: {
        //JSON FORMAT
        accept: "application/json", //VALUE TO BE ACCEPTED SHOULD BE IN JSON FORMAT
        "Content-Type": "application/json", //VALUE PASSED SHOULD BE JSON TYPE
      },
      body: JSON.stringify(user), //converts in JSON format
    })
      //IF SUCCESSFUL FETCH
      //LOOK ELSE IN ADDUSER FUNCTION SAY EX: SUCCESSFUL MESSAGE
      //ALL MESSAGES OF BACKEND FAILED SUCESSFUL, ETC
      // .then((res) => {
      //   return res.json();
      // })

      .then((res) => res.json())

      //IF FETCH IS UNSUCESSFUL, IT IS PLACED IN CATCH
      .catch((err) => console.log(err))
  );
};

// for authentication i.e.
// TO Perform SIGNIN and Save DATA IN LOCAL STORAGE IF SUCCESSFUL
//This Was Not Done Before In Above Functions
export const authenticate = (data, next) => {
  localStorage.setItem("jwt", JSON.stringify(data)); //jwt is just a name here to save in local storage
  next();
};

// for redirecting according to user role
// i.e Separate User And Admin
export const isAuthenticated = () => {
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt")); //parse Creates STRING INTO OBJECT
  } else {
    return false;
  }
};

//for signout
export const SIGNOUT = (next) => {
  //AS Auto Redirect Is Not Working As For This, via Next i.e Our Custom Defined Call Back Function
  //We Can Write:- export const SIGNOUT = () => {
  localStorage.removeItem("jwt"); //removeItem is inbuilt function
  next();
};

//For Forget Password
export const forgetpassword = (email) => {
  //(email) means value passing in backend in req.body.email of forgetPassword
  //export const forgetpassword = ({email})=>{
  // {"email":"xyz@gmail.com"}, to do this, we need to do ({email}) in {} or we can do in below
  return fetch(`${API}/forgetPass`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

//TO RESET PASSWORD
export const resetpassword = (token, email, new_password) => {
  //Needs token and to verify who the user is and password is newpassword that we are setting
  //can remove email aswell but we have to remove all of this from backend aswell
  const data = { email, new_password }; //
  return fetch(`${API}/resetpassword/${token}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ new_password }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};
