import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SignIn,
  authenticate,
  isAuthenticated,
} from "../Components/Auth/index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false); //To Go To Next Page Or Display error

  const navigate = useNavigate();
  //I.E TO AUTO CHANGE PAGES BASED ON CONDITION WITHOUT CLICKING

  const path = useLocation(); //PATH IS FOR NAVIGATION

  const { loginuser } = isAuthenticated(); //THIS WILL ONLY SHOW USER AND RELATED DATA, HENCE IT IS PREFERRED
  // const  user  = isAuthenticated(); THIS WILL SHOW ALL LIKE TOKEN USER, ID, ETC

  //Authenticate = Authenticate
  //IsAuthenticate = Get Values After Authentication

  //WE CAN PERFORM HANDLE CHANGE ASWELL.
  //BUT MOSTLY HANDLE CHANGE IS DONE FOR MULTIPLE  FIELDS LIKE FIRST NAME, LAST NAME, EMAIL, PASSWORD, ETC AS IN SIGNUP
  // handle change function to store values in useState
  // const handleChanges = (name) => (event) => {
  // setValues({ ...values, error: false, [name]: event.target.value });
  // console.log(name + ": " + event.target.value)
  // };

  //INSTEAD OF HANDLE CHANGE, WE HAVE DONE SO DIRECTLY IN EACH FIELD

  // ONCHANGE IS RELATED TO OR LINKED WITH TEXT BOX.
  //THIS PUTS VALUE IN E.TARGET.VALUE
  // AND E.TARGET.VALUE PUTS THOSE DATA IN OUR SET FIELDS, EG: SET EMAIL or SET PASSFORD FROM USE STATE
  //For onChange, The Use State Are As Above

  const ClickSubmit = (e) => {
    e.preventDefault();
    SignIn({ email, password })
      .then((data) => {
        if (data.error) {
          // console.log(data.error);
          setError(data.error);
        } else {
          // setRedirect(true);
          authenticate(data, () => setRedirect(true));
          //auth
        }
      })
      .catch((error) => console.log(error));
  };

  //IF SUCCESSFUL, IT WILL GO TO REDIRECT, ELSE IT WILL SHOW ERROR

  // to show error
  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  };

  // to redirect if successful login
  const redirectToPage = () => {
    // console.log(loginuser)
    if (redirect) {
      // console.log(user)
      if (loginuser && loginuser.role === 1) {
        //If Admin go to dashboard
        return navigate("/admin/dashboard");
        //navigate TO AUTO CHANGE PAGES BASED ON CONDITION WITHOUT CLICKING
      }
      if (loginuser && loginuser.role === 0) {
        //if user, go to home
        return navigate("/");
      }
      return false;
    }
  };

  return (
    <>
      {/* <div className='container-sm'> THIS WILL CREATE SMALL CONTAINER(NOT CONTAINER IN SMALL SCREEN BUT SMAL CONTAINER) */}
      {/* CHECK BOOTSTRAP DOCUMENTS FOR MORE DETAILS
            BOOTSTRAP DOCUMENTATION:- https://getbootstrap.com/docs/5.1/layout/containers/ */}

      {/* <Navbar /> */}
      {showError()}
      {redirectToPage()}

      {/* <h1>HELLO, THIS IS LOGIN PAGE</h1> */}

      {/* In React,
            class = className
            <a> </a> = <Link to></Link>
            for = htmlFor i.e label for = label htmlFor */}

      <div className="container w-50 mx-auto mt-5">
        <div className="text-center">
          <main className="form-signin">
            <form>
              <div className="text-center">
                <img
                  className="mb-4"
                  src="./logo192.png"
                  alt=""
                  width="72"
                  height="57"
                />
                <h1 className="h3 mb-3 fw-normal">Please Log In To Continue</h1>
              </div>
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* SINCE FORM CONTROL PUTS THE LABEL IN PLACE OF PLACEHOLDER I.E INSIDE THE BOX, THE PLACEHOLDER WILL NOT WORK HERE */}

                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div>
              <button
                className="w-100 btn btn-lg btn-primary"
                //Can also use form-control instead of w-100
                type="submit"
                onClick={(e) => ClickSubmit(e)}
              >
                Sign in
              </button>
              <Link to="/forgetpassword">Forget Password.</Link>
              <br />
              <br></br>
              <br />
              Don`t have an account? <Link to="/Signup">Register Here</Link>
              <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
            </form>
          </main>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Login;
