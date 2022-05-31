import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./cart.css";
import Checkout_progress from "./Checkout_progress";

//Note:- NaN = Not a Number

const Checkout = () => {
  const { cart_items } = useSelector((state) => state.cart); //useSelector Allows us to pull values from reducers

  //To Calculate Total Quantity of cart
  const calculate_item = () => {
    let quantity_array = cart_items.map((item) => item.quantity);
    // [3, 2, 1]
    let total_quantity = quantity_array.reduce((acc, cur) => acc + cur);
    //     HOW REDUCE WORKS IN JS
    // [5,6,7,8]
    // sum =        reduce((acc,cur)=>{return acc+curr})
    // acc + cur
    // 5+6 =11
    // 11 + 7 = 18
    // 18 + 8 = 26
    return total_quantity;
  };

  //To calculate total PRICE OF CART ITEMS
  const calculate_total_price = () => {
    let prices = cart_items.map((item) => item.quantity * item.product_price);
    let total_price = prices.reduce((acc, cur) => acc + cur);
    return total_price;
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="row">
        <div className="col-md-9 p-5">
          <Checkout_progress confirmOrder={"confirmOrder"} className="my-3" />
          {/* CAN ALSO DO:- <Checkout_progress confirmOrder className="my-3" /> */}
          {/*confirmOrder CALLS THE CONFIRM ORDER CONDITION FROM CHECKOUT PROGRESS */}
          <div className="container mx-auto">
            <table className="table table-striped table-hover mytable text-center mt-3">
              {/* Table Hover adds hover effect, table striped adds striped color effect */}
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Product Images</th>
                  <th scope="col">Product Details</th>
                  <th scope="col">No of Items</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {cart_items.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        // src={`${API}/${item.product_image}`} //CANNOT USE API HERE AS IN BACK END, WE HAVE NOT USED API FOR IMAGE
                        src={`http://localhost:8000/${item.product_image}`}
                        //API is a variable and so is product_image of item, HENCE WE NEED TO USE $ AND {} ALONG WITH ``
                        alt=""
                        height={"100px"}
                      />
                    </td>
                    <td>
                      <h4>{item.product_name}</h4>
                      <p>{item.product_description}</p>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.product_price * item.quantity}</td>{" "}
                    {/*This WILL GIVE TOTAL PRICE*/}
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-3 shadow-lg">
          <h4>
            No. of Items in cart:
            <b>
              {/* THE FOLLOWING CODES ARE COMMENTED AS THE ARE GIVING ERROR. */}
              {/* {
                                    cart_items.reduce((acc, item)=>{ //here, cart_items is array [array of object to be more specific]
                                        // console.log(acc.quantity, item.quantity)
                                        return Number(acc.quantity+item.quantity) //adding quantity of object acc (OBJ1) and quantity of obj item (OBJ2)
                                        //therefore, [{samsung, q:5, p:13000} = acc (say), {iphone, q:3, p: 130000}] = item
                                    })
                                } */}
              {/* HOW IS ERROR OCCURING?
                                IN FIRST STEP, WE ARE FETCHING ACC AS QUANTITY I.E NUMBER OF OBJECT
                                WE CHECK THAT WITH QUANTITY OF ITEM
                                BUT FOR OTHERS, WHEN WE FETCH ACC AGAIN, BUT ACC THIS TIME IS NOT OBJECT BUT QUANTITY AND ITEM IS STILL QUANTITY, HENCE ERROR */}

              {/* 
HOW REDUCE WORKS IN JS
[5,6,7,8]
sum =        reduce((acc,cur)=>{return acc+curr})
acc + cur
5+6 =11
11 + 7 = 18
18 + 8 = 26

In above code,
Say, acc = [{samsung, q:5, p:13000}, 
  item = {iphone, q:3, p: 130000}]

*/}

              {/* BETTER ALTERNATIVE:- */}
              {/* DEFINE FUNCTION ABOVE AND CALL HERE */}
              {calculate_item()}
            </b>
          </h4>
          <h4>
            Total Price:
            <b>
              {/* SAME AS TOTAL QUANTITY I.E NO OF ITEMS IN CART AS ABOVE */}
              {calculate_total_price()}
            </b>
          </h4>
          <hr className="my-3" />{" "}
          {/*HR = HORIZONTAL RULE, IT WILL GIVE A LINE */}
          <Link to="/shipping">
            <button className="btn btn-success">Proceed to Shipping</button>
          </Link>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Checkout;
