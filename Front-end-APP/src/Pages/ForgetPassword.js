import React, { useState } from "react";
import { forgetpassword } from "../Components/Auth";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false); //By default, Success = false

  const clickSubmit = (e) => {
    setError("");
    setSuccess(false);
    //THIS CAN ALSO BE DOND IN .THEN -> IF ELSE LIKE BEFORE
    //DIFFERENCE?
    //THIS WILL FIRST RESET ALWAYS AND THEN SHOW
    //IF WE DO IT IN IF-ELSE, IT WILL RESET WHEN DISPLAYING ONLY AND THEN SHOW
    e.preventDefault(); //In Button, we  mostly use PREVENT DEFAULT SO AS TO OVER-WRITER THE DIRECT ACTION OF THE BUTTON
    forgetpassword(email)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  };
  const showSuccess = () => {
    if (success) {
      return (
        <div className="alert alert-success">
          Password reset link has been sent to your email.
        </div>
      );
    }
  };

  return (
    <>
      {showError()}
      {showSuccess()}
      {!success && (
        <div className="container mx-auto my-5">
          <label htmlFor="email">Email:</label>
          <input
            type={"email"}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-warning" onClick={clickSubmit}>
            Forget Password
          </button>
        </div>
      )}
    </>
  );
};

export default ForgetPassword;
