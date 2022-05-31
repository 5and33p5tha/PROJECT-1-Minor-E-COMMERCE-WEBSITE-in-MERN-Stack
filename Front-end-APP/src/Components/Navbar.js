import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import './navbar.css THIS IS FOR NAVBAR CSS, CREATE NAVBAR CSS AND IMPORT IT LIKEWISE'
import { isAuthenticated, SIGNOUT } from "../Components/Auth";

const Navbar = () => {
  const [redirect, setRedirect] = useState(false);
  // const navigate = useNavigate();

  // THE ABOVE CODES CAN BE COMMENTED AS WE HAVE USED LINK AND NOT BUTTON

  const { loginuser } = isAuthenticated();
  //login is our variable defined here and isAuthenticated is our custom method/function
  //THIS WILL ONLY SHOW USER AND RELATED DATA, HENCE IT IS PREFERRED
  //name = loginuser should match the name set in localstorage.
  //In all cases, value in data is set by backend so simply put
  //THE loginuser here should ,match the one in signin function in backend

  const CsignoutFNC = () => {
    // SIGNOUT(() => setRedirect(true));
    // THE ABOVE CODES CAN BE COMMENTED AS WE HAVE USED LINK AND NOT BUTTON

    //After Above Codes

    SIGNOUT()
      .then((data) => {
        if (data.error) {
          //For Errors While Successful Connection But No Data
          return console.log(data.error);
        } else {
          // setRedirect(true);
          // THE ABOVE CODES CAN BE COMMENTED AS WE HAVE USED LINK AND NOT BUTTON

          //For Successful Connection and Data
          console.log(data);
        }
      })
      //For Problems In Connection
      .catch((error) => console.log(error));
  };

  // const redirectToPage = () => {
  //   if (redirect) {
  //     return navigate("/");
  //   }
  // };
  // THE ABOVE CODES CAN BE COMMENTED AS WE HAVE USED LINK AND NOT BUTTON

  return (
    <>
      {/* {redirectToPage()} */}
      {/* BUTTON IS USED FOR REDIRECT, 
      IN BELOW, WE HAVE USED LINK INSTEAD OF BUTTON, SO THIS CAN BE COMMENTED */}
      {/* <Link to="/First">Go To First Page</Link>
                <Link to="/Second">Go To Second Page</Link>
                THESE ARE JUST TO SET A LINK TO FIRST OR SECOND PAGE */}

      {/* NOTE:- IN REACT, WE USE className inplace of class. */}

      {/* FIRST NAVBAR STARTS HERE */}
      {/* <div className='row py-2 bg-danger'> */}
      <div className="row py-2" style={{ backgroundColor: "#7852B2" }}>
        <div className="col-md-3">
          {/* My Store */}
          <Link
            className="navbar-brand text-warning"
            to="/"
            style={{ textAlign: "center" }}
          >
            My STORE
          </Link>

          {/* For Multple Inline CSS In REACT */}
          {/* <Link className="navbar-brand text-success" to="#" style={{ textAlign: "center", color: "#B69F2B" }}>My Store</Link> */}
        </div>

        <div className="col-md-6">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            {/* 
                        ALTERNATIVELY WE CAN ALSO DO (BUT NOT PREFERRED):-
                        <input className="me-2 w-100" type="search" placeholder="Search" aria-label="Search" /> THIS WILL KEEP WIDTH AS 100%*/}

            {/* NOTE:- IN BOOTSTRAM, FORM-CONTROL MAKES IT GO IN FULL POSSIBLE WIDTH. HERE FORM CONTROL WILL TAKE FULL 6 GRIDS OG COL-MD-6 */}

            <button
              className="btn btn-outline-success text-warning"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        <div className="col-md-3 text-center d-flex justify-content-evenly">
          {/* THE FOLLOWING CODES ARE COMMENTED AS WE HAVE NOW SEPARATED ADMIN AND USER. */}
          {/* Icons */}
          {/* <Link to="/Signup"> */}
          {/* <i className="bi bi-person-plus fs-3 text-warning"></i> */}
          {/* </Link> */}
          {/* <Link to="/Login"> */}
          {/* <i className="bi bi-box-arrow-in-right fs-3 text-warning"></i> */}
          {/* </Link> */}

          {/* Commented as cart shoul only be for user and not admin */}
          {/* <Link to="/Cart">
            <i className="bi bi-cart fs-3 text-warning"></i>
          </Link> */}
          {/* HERE, FS-3 MEANS FONT SIZE SPACER TIMES 3 WHERE SPACER IS THE BOOTSTRAP UNIT OF SIZE its value is 16px in Bootstrap */}

          {/* $spacer is a sass variable . its value is 16px in Bootstrap.
                    For example ml-1 mean margin-left with size 1 whose value is ( $spacer * 0.25 ) i.e 16px*0.25 which is 1/4th value of 16px == 4px, therefore a size 1 for padding or margin stands for " $spacer * . */}

          {/* THE FOLLOWING CODE HACE REPLACED ABOVE CODES AND IS NOW SET TO DISPLAY FOR ADMIN OR USER */}

          {!loginuser && (
            <>
              <Link to="/signup">
                <i className="bi bi-person-plus-fill fs-3 text-warning"></i>
              </Link>
              <Link to="/Login">
                <i className="bi bi-box-arrow-in-right fs-3 text-warning"></i>
              </Link>
              <Link to="/Cart">
                <i className="bi bi-cart fs-3 text-warning"></i>
              </Link>
            </>
          )}
          {loginuser && loginuser.role === 1 && (
            <>
              <Link to="/admin/dashboard">
                <i className="bi bi-border fs-3 text-warning"></i>
              </Link>
              <Link to="/" onClick={CsignoutFNC}>
                <i className="bi bi-box-arrow-left fs-3 text-warning"></i>
              </Link>

              {/* <button onClick={CsignoutFNC}>
                <i className="bi bi-box-arrow-left fs-3 text-warning"></i>
              </button> */}
            </>
          )}

          {loginuser && loginuser.role === 0 && (
            <>
              <Link to="/user/profile">
                <i className="bi bi-person-circle fs-3 text-warning"></i>
              </Link>
              <Link to="/" onClick={CsignoutFNC}>
                <i className="bi bi-box-arrow-left fs-3 text-warning"></i>
              </Link>
              <Link to="/Cart">
                <i className="bi bi-cart fs-3 text-warning"></i>
              </Link>

              {/* <button onClick={CsignoutFNC}>
                <i className="bi bi-box-arrow-left fs-3 text-warning"></i>
              </button> */}
            </>
          )}
        </div>
      </div>

      {/* SECOND NAVBAR (NAVBAR ON EXPAND STARTS HERE) */}
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#232248" }}
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item me-4">
                  <Link
                    className="nav-link active text-info"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item me-4">
                  <Link className="nav-link text-danger" to="/deals">
                    Deals
                  </Link>
                </li>
                <li className="nav-item me-4">
                  <Link className="nav-link text-success" to="#">
                    Customer Service
                  </Link>
                </li>
                <li className="nav-item me-4">
                  <Link className="nav-link text-warning" to="#">
                    Contact
                  </Link>
                </li>

                {/* <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><Link className="dropdown-item" to="#">Action</Link></li>
                                            <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                            <li><hr className="dropdown-divider"></hr></li>
                                            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link disabled" to="#" tabindex="-1" aria-disabled="true">Disabled</Link>
                                    </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
