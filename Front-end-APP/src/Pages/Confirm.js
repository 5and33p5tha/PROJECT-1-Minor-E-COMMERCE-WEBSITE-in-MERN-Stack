import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Confirm = () => {
  let url_parameters = useParams(); // to get parameters from url

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = url_parameters.token;

  useEffect(() => {
    fetch(`http://localhost:8000/api/confirmation/${token}`, {
      method: "POST",
      //THE METHOD HERE SOULD MATCH THE METHOD IN BACKEND IN VERIFICATION FOR USER ROUTE
    })
      .then((res) => res.json()) //This Is To Convert Response into JSON TYPE

      .then((data) => {
        //For Data That Comes
        if (data.error) {
          return setError(data.error);
        } else {
          return setSuccess(true);
        }
      })
      //Catch Error Orrcurs If DATA DOES NOT COME AT ALL
      .catch((error) => console.log(error));
  }, [url_parameters]);

  // to show error
  const showError = () => {
    if (error) {
      console.log(error);
      return <div className="alert alert-danger">{error}</div>;
    }
  };

  // to show success/ user is added
  const showSuccess = () => {
    if (success) {
      return (
        <div className="alert alert-success">
          Account verified successfully. Please log in to continue.
        </div>
      );
    }
  };

  // console.log(url_parameters.token)
  return (
    <div>
      <Navbar></Navbar>
      {showError()}
      {showSuccess()}Confirm
    </div>
  );
};

export default Confirm;
