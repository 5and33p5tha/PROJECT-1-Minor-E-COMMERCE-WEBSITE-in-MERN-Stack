import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// This Importing can be done in any order
//Here, Router is the alias for router. So We Can Use Router inPlace of BrowserRouter

import Home from "./Pages/Home";
import First from "./Pages/First";
import Second from "./Pages/Second";
import App from "./App";

//These are Import "FUNCTIONNAME" from "PAGELOCATION/PAGENAME"
// In AnimationPlaybackEvent, Home is the function name or "Export Default Value" of Home and ./Pages is where home is placed and Home after that is Home.js

//REACT ROUTER DOM DOCUMENTATION:- https://www.npmjs.com/package/react-dom

import React, { useState } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";
import Data from "./Hooks/Data";
import FetchData from "./Hooks/FetchData";
import Main from "./Hooks/Main";
import Confirm from "./Pages/Confirm";
import AdminRoute from "../src/Components/Routes/AdminRoute";
import PrivateRoute from "../src/Components/Routes/PrivateRoute";
import AdminDashboard from "../src/Pages/AdminDashboard";
import UserDashboard from "../src/Pages/UserDashboard";
import Category from "./Components/Category/Category";
import CategoryUpdate from "./Components/Category/CategoryUpdate";
import AddProducts from "./Components/Products/AddProducts";
import Products_In_Admin_Page from "./Components/Products/Products_In_Admin_Page";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Product_Details from "./Components/Products/Product_Details";
import Deals from "./Pages/Deals";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import Checkout from "./Pages/Checkout";
import Shipping from "./Pages/Shipping";
import Payment from "./Pages/Payment";
import { useEffect } from "react";
import axios from "axios";
import { API } from "./config";

//payment
import PaymentElement from "./Pages/PaymentElement";
import PaymentSuccess from "./Pages/PaymentSuccess";
import OrderDetails from "./Pages/OrderDetails";
//REMOVED AS UPDATED TO LATEST MODULE (REACT-ROUTER DOM UPDATED)
//We have to do these in a separate page now and define normal route below
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

const MyRouter = () => {
  // const [stripeAPIkey, setStripeAPIkey] = useState("");
  // useEffect(() => {
  //   async function getStripeApiKey() {
  //     const { data } = await axios.get(`${API}/stripeapikey`);
  //     setStripeAPIkey(data.stripeAPIkey);
  //   }
  // });
  //REMOVED AS UPDATED TO LATEST MODULE (REACT-ROUTER DOM UPDATED)
  //We have to do these in a separate page now and define normal route below

  return (
    <Router>
      <Navbar />
      {/* SO AS NOT TO DEFINE NAVBAR IN ALL PAGES */}
      <Routes>
        <Route path="/First" element={<First />} />

        {/* HERE, '/First' is the our custom defined path. we can give say /f or any <First /> is the FUNCTIONNAME or "export default First" from the export of First.
                       <Route path='/f' element={<First />}>



                </Route>

                <Route path="/Second" element={<Second />} />


                {/* <Route path="/" element={<App />} /> */}

        {/* This will create what will display in default without switching */}
        {/* Common Route Starts. */}

        <Route path="/" element={<Home />} />

        <Route path="/Login" element={<Login />}></Route>

        <Route path="/Signup" element={<Signup></Signup>}></Route>

        {/* <Route path="/Cart" element={<Cart />} /> */}
        {/* THIS IS COMMENTED NOW AS WE HAVE CREATED PROVATE AND ADMIN ROUTE */}

        <Route path="/Data" element={<Data />} />

        <Route path="/FetchData" element={<FetchData />} />

        <Route path="/Main" element={<Main></Main>}></Route>

        <Route path="/email/confirmation/:token" element={<Confirm />} />

        <Route path="/product/details/:id" element={<Product_Details />} />

        <Route path="/deals" element={<Deals />} />

        <Route path="/forgetpassword" element={<ForgetPassword />} />

        <Route path="/resetpassword/:token" element={<ResetPassword />} />

        {/* Common Route Ends. */}
        {/* <AdminRoute path="/admin/dashboard" element={<AdminDashboard />} /> */}

        {/* The Following Route Is For Admin */}
        {/* Only Accessible to Admin */}
        <Route path="/" element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/category" element={<Category />} />
          <Route
            path="/admin/categoryupdate/:id"
            element={<CategoryUpdate />}
          />
          <Route path="/product/add" element={<AddProducts />} />
          <Route path="/admin/products" element={<Products_In_Admin_Page />} />
        </Route>

        {/* The Following Route Is For Normal User */}
        {/* Only Accessible to Normal User */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/user/profile" element={<UserDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shipping" element={<Shipping />} />
          {/* <Route path="/payment" element={<Payment/>} /> THIS SHOULD BE BOUND BY StripeAPIKey Condition as Follows*/}
          {/* {stripeAPIkey && ( */}
          {/* //Elements of Stripe = Card Info, Card No, Card Expiry Date, etc */}
          {/* <Elements stripe={loadStripe(stripeAPIkey)}> */}
          {/* If stripeAPIkey comes from backend and Elements of Card are loaded, ONLY THEN SHOW THE ROUTE */}
          <Route path="/payment" element={<PaymentElement />} />
          {/* Updated!!!, Now We Create This Page And Define It There */}
          {/* This is our custom route to u=our defined page */}
          {/* </Elements> */}
          {/* )} */}
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/orderdetails/:order_id" element={<OrderDetails />} />
        </Route>
      </Routes>
      <Footer />
      {/* SO AS NOT TO DEFINE FOOTER AGAIN IN EVERY PAGES */}
    </Router>
  );
};

export default MyRouter;
