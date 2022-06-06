//If a normal user does /admin or /admin/dashboard, the dashboard page should not be displayed to him or her AS HE/SHE LACKS THE AUTHORITY
//HENCE SEPARATE ROUTES ARE NECESSARY

//This Admin Route Is For Admin

// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { isAuthenticated } from "../Auth";

// const AdminRoute = ({ Component: Component, ...rest }) => {
//Components = Pages userlogin, signin etc
//   return (
//     <>
//       <Route
//         {...rest}
//Keep as it is without changing values
//         render={(props) =>
//           isAuthenticated() && isAuthenticated().loginuser.role === 1 ? (
//If user is authenticated, send same component in component
//If user has not signed up, send signin i.e Login Page page to user
//             <Component {...props} />
//           ) : (
//             <Navigate
//               to={{
//                 pathname: "/Login",
//                 state: { from: props.location },
//               }}
//             />
//           )
//         }
//       />
//     </>
//   );
// };

// export default AdminRoute;

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../Auth";

const AdminRoute = () => {
  return isAuthenticated() && isAuthenticated().loginuser.role === 1 ? (
    <Outlet /> //If user is authenticated, send same component in component i.e //If sign in -> same page, else, Sign In Page
  ) : (
    <Navigate to="/Login" />
  );
  //Outelet, Return Some Page if Login
  //Eg: When Clicking on Cart, If Logged In, Go To Cart
  //If Not Logged in, when clicking to cart page, go to signin page
};

export default AdminRoute;
