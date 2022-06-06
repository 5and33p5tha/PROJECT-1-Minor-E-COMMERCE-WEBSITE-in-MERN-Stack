//THIS PAGE IS USED JUST AS CHECKOUT PROGRESS
import React from "react";
import { Link } from "react-router-dom";
const Checkout_progress = ({ confirmOrder, Shipping, Payment }) => {
  return (
    <>
      <div className="d-flex justify-content-evenly">
        {confirmOrder ? (
          //If Confirm order is given
          <Link to="/checkout">
            <button className="btn btn-info">Confirm Order</button>
          </Link>
        ) : (
          //If Confirm Order is not passed/given
          <Link to="#">
            {" "}
            {/* When Button is disabled disable link or rather link to same page */}
            <button className="btn btn-info disabled">Confirm Order</button>
          </Link>
        )}

        {Shipping ? (
          <Link to="/shipping">
            <button className="btn btn-success">Shipping</button>
          </Link>
        ) : (
          <Link to="#">
            {/* When Button is disabled disable link or rather link to same page */}
            <button className="btn btn-success disabled">Shipping</button>
          </Link>
        )}

        {Payment ? (
          <Link to="/payment">
            <button className="btn btn-danger">Payment</button>
          </Link>
        ) : (
          <Link to="#">
            {" "}
            {/* When Button is disabled disable link or rather link to same page */}
            <button className="btn btn-danger disabled">Payment</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Checkout_progress;
