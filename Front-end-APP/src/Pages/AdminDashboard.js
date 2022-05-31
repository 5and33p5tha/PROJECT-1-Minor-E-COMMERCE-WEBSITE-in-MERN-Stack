//rafce
//rafe
import React from "react";
import Navbar from "../Components/Navbar.js";
import Footer from "../Components/Footer";
import AdminSidebar from "../Components/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="container-fluid custom-row">
        <div className="row ">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9"></div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default AdminDashboard;
