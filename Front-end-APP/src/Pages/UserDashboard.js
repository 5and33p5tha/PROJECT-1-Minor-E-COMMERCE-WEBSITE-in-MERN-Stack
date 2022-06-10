import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //react-toast CSS
import { isAuthenticated } from "../Components/Auth";
import { UserSidebar } from "../Components/UserSidebar";
import { clearErrors, myOrders } from "../Reducer/orderActions";

const UserDashboard = () => {
  const { loginuser } = isAuthenticated();

  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.myOrder);

  // console.log('order',orders)
  useEffect(() => {
    dispatch(myOrders());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, []); //If [] is not given, it will run continuously as it will detect new change everytime and run in a loop
  //So, although nothing is written within [], it is better to write [] instead of leaving it empty
  return (
    <>
      {/* <Navbar /> */}
      <ToastContainer theme="colored" />
      <div className="container-fluid custom-row">
        <div className="row ">
          <div className="col-md-3">
            <UserSidebar />
          </div>
          <div className="col-md-9">
            <table className="table">
              <thead>
                <tr>
                  <th>No of Items</th>
                  <th>Details</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => {
                  return (
                    //   <tr>
                    //   <td>{item._id}</td>
                    //   <td>
                    //     {/* Mapping Inside A Map, (NESTED MAP) */}
                    //     {item.OrderItems.map((individual_item) => {
                    //       //  Mapping OrderItems of Order As Per Following Reason
                    //       return individual_item.product.product_name;
                    //     })}
                    //     {/* As order has items in array, one of them being OrderItems Which In Itself Is An Array, SO Mapping That Aswell To Represent All Things Inside It */}
                    //   </td>
                    //   <td>Rs. {item.totalPrice}</td>
                    //   <td>{item.status}</td>
                    // </tr>
                    <tr key={item._id}>
                      <td>{item.OrderItems.length}</td>
                      <td>
                        {item.OrderItems.map((individual_item) => {
                          return individual_item.product.product_name;
                        })}
                      </td>
                      <td>Rs. {item.totalPrice}</td>
                      <td>{item.status}</td>
                      <td>
                        <Link to={`/orderdetails/${item._id}`}>
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

// {orders.map((item) => {
// Mapping orders to represent all of the items it contains, We WIll PICK WHAT WE NEED BELOW */}
// return (
// <tr>
//   <td>{item._id}</td>
//   <td>
//     Mapping Inside A Map, (NESTED MAP)
//     {item.OrderItems.map((individual_item) => {
//        Mapping OrderItems of Order As Per Following Reason
//       return individual_item.product.product_name;
//     })}
//     As order has items in array, one of them being OrderItems Which In Itself Is An Array, SO Mapping That Aswell To Represent All Things Inside It
//   </td>
//   <td>Rs. {item.totalPrice}</td>
//   <td>{item.status}</td>
// </tr>
// );
// })}
