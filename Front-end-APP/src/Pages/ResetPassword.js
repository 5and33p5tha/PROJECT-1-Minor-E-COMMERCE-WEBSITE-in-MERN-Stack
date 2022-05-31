import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { resetpassword } from "../Components/Auth";

const ResetPassword = () => {
  //NOTE:- TO JUST RESET PASSWORD, WE DONT NEED USER INFORMATION BUT WE HAVE TO REMOVE EMAIL FROM BACKEND ASWELL IN USERCONTROLLER and then in frontend api
  //WE ONLY NEED USER INFORMATION TO SHOW THE USER INFORMATION

  //To Take TOken from URL
  const params = useParams();

  const token = params.token; //Assigning URL token in token
  //    console.log(token) TO CHECK TOKEN

  //For New Password
  const [new_password, setNew_password] = useState("");

  //FOr EMAIL CONNECTED TO HaAT PASSWORD
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const passwordReset = (e) => {
    setError("");
    setSuccess(false);
    e.preventDefault();
    resetpassword(token, email, new_password)
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
          Password has been reset successfully.
        </div>
      );
    }
  };

  return (
    <>
      {showError()}
      {showSuccess()}
      {!success && (
        <>
          <h3>Reset Password</h3>
          <div className="container w-50 my-5">
            <label>Email:</label>
            <input
              type={"text"}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>New Password:</label>
            <input
              type={"text"}
              className="form-control"
              onChange={(e) => setNew_password(e.target.value)}
            ></input>
            <button className="btn btn-warning" onClick={passwordReset}>
              Reset Password{" "}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
