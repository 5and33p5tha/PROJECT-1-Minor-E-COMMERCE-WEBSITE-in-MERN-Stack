import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Second = () => {
  return (
    <div>
      <Navbar />
      <h6>This Is Hello From Second.JS</h6>
      This is the react app
      <Link to="/First">Go To First Page</Link>
      <Footer />
    </div>
  );
};

export default Second;
