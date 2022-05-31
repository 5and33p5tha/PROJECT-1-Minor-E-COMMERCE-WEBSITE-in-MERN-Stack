import React from "react";
import Carousel from "../Components/Carousel";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Products from "../Components/Products";
import Products_In_User_Page from "../Components/Products/Products_In_User_Page";
import Recommendations from "../Components/Recommendations";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Carousel />
      {/* <Products /> */}
      <Products_In_User_Page />
      <Recommendations />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
