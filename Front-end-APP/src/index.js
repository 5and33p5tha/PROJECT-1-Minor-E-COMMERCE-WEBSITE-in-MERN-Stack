import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MyRouter from "./MyRoutes";
import { Provider } from "react-redux";
import store from "../src/Reducer/store";
// import First from './First';
// import Second from './Second';
// import { Router, BrowserRouter, Route } from 'react-router-dom';  This is better. BUT ALTERNATIVELY, WE CAN USE ANOTHER JS PAGE FOR THIS
// import { Router, BrowserRouter, Switch } from 'react-router-dom'; This Was In Previous Version. Switch Here Worked Like Switch Case To Switch In Different Pages

//     First is The Function and ./First is the File Name
//As first is the default export return, we do not need brackets in FIRST like (First)

//IN REACT, WE NEED CLOSING TAG, NO EMPTY TAGS ALLOWED.
//IN REACT, WE DIFINE CLASS AS CLASSNAME
//IN REACT, WE REMOVE CHECKED FROM INPUT TYPE FORM-CHECK-INPUT At The End

//react - render - dom is to swiitch beteen components. SOmetimes we may need all components and sometimes we need just some. react-render-dom allows us to do this

ReactDOM.render(
  <React.StrictMode>
    {/* Here, App.js, Index.js, First .js Are All Components */}
    {/* <App /> */}
    <Provider store={store}>
      <MyRouter />
    </Provider>
    {/* <First />

      <Second></Second> */}
  </React.StrictMode>,

  //Now In LocalHost, if we do /First, First Page Is Displayed and Send Page Is Displayed for /Second
  document.getElementById("root")
  //This Root Is Passed in Div Id=Root In Index.html. Hence, Index.HTML is displayed Finally
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
