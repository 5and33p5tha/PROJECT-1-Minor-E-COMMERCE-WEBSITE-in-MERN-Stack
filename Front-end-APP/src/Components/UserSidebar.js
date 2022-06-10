import React from "react";
import "./adminsidebar.css";
import { isAuthenticated } from "./Auth";
import { SIGNOUT } from "./Auth";
import { Link } from "react-router-dom";

export const UserSidebar = () => {
  const { loginuser } = isAuthenticated();
  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark custom-sidebar"
        style={{ width: "280px" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">User Profile</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link active" aria-current="page">
              Home
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link text-white">
              My Orders
            </Link>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <Link
            to="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>{loginuser.email}</strong>
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <Link to="#" className="dropdown-item">
                Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a
                className="dropdown-item"
                href="/"
                onClick={() => {
                  SIGNOUT()
                    .then((data) => {
                      if (data.error) {
                        console.log(data.error);
                      } else {
                        return;
                      }
                    })
                    .catch((err) => console.log(err));
                }}
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
