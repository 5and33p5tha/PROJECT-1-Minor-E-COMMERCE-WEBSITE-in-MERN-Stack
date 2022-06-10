//Documentation:- STRIPE TESTING INFO LINKS:-
//https://stripe.com/docs/testing
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Checkout_progress from "./Checkout_progress";
import { useElements } from "@stripe/react-stripe-js";
import { isAuthenticated } from "../Components/Auth";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { API } from "../config";
import { createOrder } from "../Reducer/orderActions";

const Payment = () => {
  const navigate = useNavigate();
  const { loginuser, token } = isAuthenticated();
  const stripe = useStripe();
  const Elements = useElements();
  const dispatch = useDispatch();
  //Axios Vs Fetch
  //For Axios, Define Function First and Then Call
  //For fetch, use fetch and we can define function later
  //both can be used inplace of eachother
  let options = {
    //In place of style={fontSize: "smth", color: "smth"}, WE CAN NOW USE style{options}
    style: {
      base: {
        fontSize: "16px",
      },
      invalid: {
        color: "#ff0000",
      },
    },
  };
  let orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")); //Read any value if it is in session storage, Parse converts JSON onto object
  //Basically, what the above code is doing is reading the session storage value that was saved before (In our case, in SHIPPING.JS)
  const { cart_items, shipping_info } = useSelector((state) => state.cart);
  console.log(orderInfo);

  //As we have an error i.e shipping_info: shipping_info{}, sjipping info inside a shipping info and then array of objects, we do the following:-
  //To correct this issue, we do:
  const shipping = shipping_info.shipping_info;

  //To calculate total PRICE OF CART ITEMS
  const calculate_total_price = () => {
    let prices = cart_items.map((item) => item.quantity * item.product_price);
    let total_price = prices.reduce((acc, cur) => acc + cur);
    return total_price;
  };

  //To Save Order in Backend, We need to send data and we send it via here
  const order = {
    orderItems: cart_items,
    shippingAddress:
      shipping.street1 + "," + shipping.city + ", " + shipping.country, //Concatinating Multiple fields as SINGLE FIELD NAMED SHIPPING ADDRESS 1 IN BACKEND, NO COUNTRY, NO CITY, ETC.
    shippingAddress2:
      shipping.street2 + "," + shipping.city + ", " + shipping.country, //Concatinating Multiple fields as SINGLE FIELD NAMED SHIPPING ADDRESS 2 IN BACKEND, NO COUNTRY, NO CITY, ETC.
    // city:shipping_info.city,
    // zip:shipping_info.zip,
    // country:shipping_info.country,
    phone: shipping.phone,
    user: loginuser._id,
  };

  //If we want to show Shipping Details and Order Details, We Do the following

  const paymentData = {
    amount: orderInfo * 100,
  }; /*Multiplying by 100 as it comes in paisa so converting paisa as we have set currency = npr in stripe in front or back end into rupee*/
  //We have amount i.e to show amount : only, We then put amount into paymentData
  const paymentHandle = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true; //selecting the button, disable
    let res;
    try {
      //try-catch for error handling
      // to attempt payment
      const config = {
        // to connect with backend
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer ${token}", not needed now as we have not set require signin in backend in payment controller
        },
      };
      console.log(paymentData);
      res = await axios.post(`${API}/processpayment`, paymentData, config);

      const client_secret = res.data.client_secret; //This Client_Secret comes from backend
      console.log(client_secret);
      if (!stripe || !Elements) {
        return;
      }
      // To Make Payment, here THIS PAYMENT IS VIA STRIPE PAYMENT
      const result = await stripe.confirmCardPayment(`${client_secret}`, {
        //confirmCardPayment is the stripe built function
        //client_secret form backend, stripe.confirmCardPayment
        payment_method: {
          card: Elements.getElement(CardNumberElement),
          billing_details: {
            // first_name: loginuser.first_name,
            // last_name: loginuser.last_name,
            //WE CANNOT DEFINE IT AS ABOVE, HENCE, WE HAVE TO DO THE FOLLOWING AS IN STRIPE, WE ONLY HAVE name AND email and not extras
            //INSTEAD, WE CAN SHOW THE NAMES AS FOLLOWS
            name: loginuser.first_name + ` ` + loginuser.last_name, //name:"TEST" if name is not defined in backend, this will put name of user as test for trial
            email: loginuser.email,
          },
        },
      });
      if (result.error) {
        toast.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
        //In querySelector, we can use both id as well as class, can take both
      } else {
        if (result.paymentIntent.status === "succeeded") {
          //the paymentIntent.status is inside the result of the above code having confirmCartPayment via stripe:-

          //In Payment Success Case
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          // dispatchEvent(createOrder(order)) //This is false as we called it without defining const dispatch = useDispatch()
          dispatch(createOrder(order));
          localStorage.removeItem("cart_items");
          // return <Navigate to="/payment_success" />;
          //Instead of above code, we can also use the navigate as below
          // navigate("/payment_success"); //this route is to be displayed in front end to show message
          //We Can Also Do This Via Toast
          toast.success("Payment Successful");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          //Now to disable Button After Successful Payment
          document.querySelector(`#pay_btn`).disabled = true;
        } else {
          toast.error("error while processing"); //show message in toast
        }
      }
    } catch (error) {
      toast.error(error.message);
      document.querySelector("#pay_btn").disabled = false;
    }
  };

  return (
    <>
      <ToastContainer theme="colored" />
      <div className="row">
        <div className="col-md-9 p-5">
          <Checkout_progress confirmOrder Shipping Payment className="my-3" />
          {/*confirmOrder CALLS THE CONFIRM ORDER CONDITION FROM CHECKOUT PROGRESS */}
          {/* shipping CALLS THE shipping CONDITION FROM CHECKOUT PROGRESS
          payment CALLS THE payment CONDITION FROM CHECKOUT PROGRESS */}
          {/* Below Codes aare from cart.js and then edited*/}
          <div className="container mx-auto mt-5">
            <h3 className="text-center">Order Information</h3>
            <table className="table table-striped table-hover mytable text-center">
              {/* Table Hover adds hover effect, table striped adds striped color effect */}
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Product Images</th>
                  <th scope="col">Product Details</th>
                  <th scope="col">No of Items</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr> */}
                {/* THE FOLLOWING COMMANDS ARE STATIC SO NOW WE WILL DO IT VIA MAPPING */}
                {/* <th scope="row">1</th> */}
                {/* <td> */}
                {/* <img src='./Images/Image1.jpeg' alt='' height={'100px'} width={"175px"}></img> This is the standard form. Check https://validator.w3.org/#validate_by_upload for standard validation */}
                {/* <img
                  src="https://www.apple.com/v/macbook-pro-14-and-16/a/images/meta/macbook-pro-14-and-16_overview__fz0lron5xyuu_og.png?202111170920"
                  alt=""
                  height={"100px"}
                  width={"175px"}
                ></img>
              </td> */}
                {/* <td>
                <h4>Apple Macbook Pro 16 (2021)</h4>
                <p>
                  Apple M1 Max, 64GB Unified Memory, 8TB SSD Storage, $6598.98
                </p>
              </td>
              <td>
                <button className="btn btn-info me-2">Update</button>
                <button className="btn btn-info">Delete</button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>
                <img
                  src="https://media.wired.com/photos/5f4ecb34cc91b230ecb28b08/master/pass/Gear-Surface-Book-3-4-ways-SOURCE-Microsoft.jpg"
                  alt=""
                  height={"100px"}
                  width={"175px"}
                ></img> */}
                {/* </td> */}
                {/* <td> */}
                {/* <h4>Microsoft Surface Book 3</h4>
                <p>intel Core i7, 32GB RAM, 2TB SSD Storage, $3999.99</p>
              </td>
              <td>
                <button className="btn btn-info me-2">Update</button>
                <button className="btn btn-info">Delete</button>
              </td> */}
                {/* </tr> */}
                {/* <tr>
              <th scope="row">3</th>
              <td>
                <img
                  src="https://i1.wp.com/laptopmedia.com/wp-content/uploads/2021/08/dellxps1393102-in-1featured.jpg?fit=965%2C543&ssl=1"
                  alt=""
                  height={"100px"}
                  width={"175px"}
                ></img>
              </td>
              <td>
                <h4>Dell XPS 13 (2-in-1) </h4>
                <p>intel Core i7, 16GB RAM, 1TB SSD Storage, $1869.99</p>
              </td>
              <td>
                <button className="btn btn-info me-2">Update</button>
                <button className="btn btn-info">Delete</button>
              </td> */}

                {/* </tr> */}

                {/* now to make it dynamic */}

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
                      <h5>{item.product_price}</h5>
                      <p>{item.product_description}</p>
                    </td>
                    {/* <div>
                  <button className="btn btn-warning me-2">-</button>
                  <input
                  type={"text"}
                  value={item.quantity}
                  className="text-center"
                  />
                  <button className="btn btn-warning me-2">+</button>
                  
                  <button className="btn btn-warning">Remove</button>
                </div> */}
                    {/* BETTER WAY:- */}
                    <td>
                      <h4>{item.quantity}</h4>
                    </td>
                    <td>
                      <h4>Rs. {item.quantity * item.product_price}</h4>
                    </td>
                  </tr>
                ))}
                <tr className="text-end">
                  <td colSpan={5}>
                    <h4>Total Amount: Rs.{calculate_total_price()}</h4>
                  </td>
                </tr>
                {/* ColSpan 5 = merge 5 columns, text-end will bring that to end */}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-3 shadow-lg">
          <h3>Card Information</h3>
          <div>
            <label htmlFor="card-number">Card Number</label>
            <CardNumberElement
              className="form-control"
              type="text"
              id="card-number"
              options={options}
            />
          </div>
          <div>
            <label htmlFor="card-expiry">Card Expiry Date</label>
            <CardExpiryElement
              className="form-control"
              type="text"
              id="card-expiry"
              options={options}
            />
          </div>
          <div>
            <label htmlFor="card-cvc">Card Expiry Date</label>
            <CardCvcElement
              className="form-control"
              type="text"
              id="card-cvc"
              options={options}
            />
          </div>
          <button
            className="btn btn-success form-control"
            id="pay_btn"
            onClick={paymentHandle}
          >
            Pay Now
          </button>
        </div>
      </div>

      {/* Below Codes are for Shipping.js and then edited*/}
      <div className="row">
        <div className="col-md-9 p-5">
          <div className="container mx-auto my-3 p-5">
            <h4 className="text-center">Shipping Information</h4>
            <label className="h4 my-3">
              <u>Address 1: </u>
            </label>
            <br />
            <label htmlFor="street1">Shipping Address: </label>
            <span>{shipping.street1}</span>
            <br />
            <label htmlFor="street2">Shipping Address 2: </label>
            <span>{shipping.street2}</span>
            <br />
            <label htmlFor="city">City: </label>
            <span>{shipping.city}</span>
            <br />
            <label htmlFor="country">Country: </label>
            <span>{shipping.country}</span>
            <br />
            <label htmlFor="phone">Phone Number: </label>
            <span>{shipping.phone}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
