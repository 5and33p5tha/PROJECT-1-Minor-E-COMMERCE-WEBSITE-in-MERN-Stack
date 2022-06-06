import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import Checkout_progress from "./Checkout_progress";
import { countries } from "countries-list";
import { saveShippingInfo } from "../Reducer/cartActions";
import { Link } from "react-router-dom";
import { useRef } from "react";

//Note:- NaN = Not a Number

const Shipping = () => {
  const dispatch = useDispatch();

  const [shippingAddress, setShippingAddress] = useState({
    //Creating Object. NORMALLY WE DO useState('')
    street1: "",
    street2: "",
    city: "",
    country: "",
    phone: "",
  });

  const ref = useRef();

  const { street1, street2, city, country, phone } = shippingAddress; //destructuring

  const countriesList = Object.values(countries);
  //console.log(countrieslist)
  const { cart_items } = useSelector((state) => state.cart); //useSelector Allows us to pull values from reducers

  //To show previous shipping info if it exists
  useEffect(() => {
    // let shippingAddress = JSON.parse(localStorage.getItem("shipping_info")); //Note, In local storage, it is always in JSON format so better to convert into Object with JSON.parse
    //parse converts JSON into object, we take values from local storage in object format and set it to shippingAddress
    // if (localStorage.getItem("shipping_info")) {
    //   setShippingAddress({
    //     ...shippingAddress,
    //     street1: shippingAddress.street1,
    //     street2: shippingAddress.street2,
    //     city: shippingAddress.city,
    //     phone: shippingAddress.phone,
    //   }); //Cannot do country: shippingAddress.country, this for country as it is in Select, we cannot give such value in select
    //       THE ABOVE CODE WILL create an error. Error Example:- shipping_info: shippingAddress: shipping_info and so on in loops of n order {commonly 3 or 4 loops} till we get street1, street2, phone, etc
    // }
    // console.log(shippingAddress)

    //SO WE CAN DO THE FOLLOWING TO FORCE CORRECT THE ABOVE ERROR AS WELL AS DISPLAY THE VALUE OF LOCAL STORAGE
    if (localStorage.getItem("shipping_info")) {
      let { shipping_info } = JSON.parse(localStorage.getItem("shipping_info"));
      setShippingAddress({
        street1: shipping_info.street1,
        street2: shipping_info.street2,
        city: shipping_info.city,
        phone: shipping_info.phone,
        // country: shipping_info.country,
        //   }); //Cannot do country: shippingAddress.country, this for country as it is in Select, we cannot give such value in select
        //So we do it using useRef as:-
      });
      ref.current.value = shipping_info.country;
      // console.log(shipping_info)
    }
  }, []);

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
    //Adding Session Storage Here
    sessionStorage.setItem("orderInfo", JSON.stringify(total_price));
    return total_price;
  };

  //Function To Save Shipping Info
  const saveShippingInfoHandler = () => {
    //TO SAVE IT IN SESSION STORAGE , SESSION STORAAGE IS SIMILAR TO LOCAL STORAGE BUT IT IS ONLY FOR SESSION, I.E IT DISSAPPERS AFTER LOGGING OUT, UNLIKE LOCAL STORAGE IT DOES NOT DISAPPEAR AFTER REFRESHING THE PAGE
    //These Lines Are Not Needed Here As WE HAVE SET IT IN total_price
    // sessionStorage.setItem(
    //SESSION STORAGE IS ONLY FOR A SESSION
    //   "orderInfo", //we are gonna save the total price here in orderInfo.
    //As total price is already defined in checkout aswell, we can do it in checkout page aswell
    //We need total price for payment
    //   JSON.stringify({ calculate_total_price }) //Stringify converts Javascript Value into Object Object Notations
    // );
    //orderInfo is JUST THE NAME WE HAVE SET HERE

    return dispatch(saveShippingInfo(shippingAddress));
  };

  //Function For Handle Change
  const handleChange = (name) => (e) => {
    //Here name = street1 of handelChange below, street2 of handelChange below, city of handelChange below, country of handelChange below, phone of handelChange below
    //Whatever the value is in street1, street2, city, country, phone, we be in e.target.value.
    setShippingAddress({ ...shippingAddress, [name]: e.target.value });
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="row">
        <div className="col-md-9 p-5">
          <Checkout_progress confirmOrder Shipping className="my-3" />
          {/*confirmOrder CALLS THE CONFIRM ORDER CONDITION FROM CHECKOUT PROGRESS */}
          {/* shipping CALLS THE shipping CONDITION FROM CHECKOUT PROGRESS */}
          <div className="container mx-auto my-3 p-5">
            <label>Address 1</label>
            <br />
            <label htmlFor="street1">Shipping Address 1:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: Jamal, Kantipath"
              id="street1"
              onChange={handleChange("street1")}
              value={street1} //Need to perform Object De-Structuring First
            />
            {/* WHAT WE ARE MAKING IS DELIVERY WITHIN SAME CITY. SO COMMON CITY BUT DIFFERENT DELIVERY LOCATION */}
            <label htmlFor="street2">Shipping Address 2</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: Amritmarg, Thamel"
              id="street2"
              onChange={handleChange("street2")}
              value={street2} //Need to perform Object De-Structuring First
            />
            <label htmlFor="city">City:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: Kathmandu"
              id="city"
              onChange={handleChange("city")}
              value={city} //Need to perform Object De-Structuring First
            />
            <label htmlFor="country">Country</label>
            <select
              id="country"
              className="form-control"
              onChange={handleChange("country")}
              ref={ref} //As we have to use useRef, we have to pass it as ref as we cannot do normal de-structuring in everything that is in select
            >
              {countriesList.map((country, i) => {
                // NOTE:- CAN ALSO REPLACE COUNTRY WITH ITEM
                // THEN WE GET ITEM IN MAP(ABOVE) VALUE(BELOW) AND ITEM.NAME,
                return (
                  <option value={country.name} key={i}>
                    {country.name}
                  </option>
                );
              })}
            </select>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type={"number"}
              className="form-control"
              id="phone"
              onChange={handleChange("phone")}
              value={phone} //Need to perform Object De-Structuring First
            />
            {/* we can write input type as text if we want to use the country extension aswell */}

            {localStorage.getItem("shipping_info") ? (
              //Show Update Button To Update Shipping Info IF Already in local address
              //Else
              //Show Save Button To Save Shipping Info
              <button
                className="btn btn-outline-danger mt-3 mx-3"
                onClick={saveShippingInfoHandler}
              >
                Update Shipping Info
              </button>
            ) : (
              <button
                className="btn btn-outline-secondary mt-3 mx-3"
                onClick={saveShippingInfoHandler}
              >
                Save Shipping Info
              </button>
            )}

            {/* SAME ONCLICK CALL FOR BOTH */}
            {/* UPDATE ONLY IF PREVIOUS SHIPPING ADDRESS IS GIVEN */}
            {/* SO, WE NEED TO SAVE IN LOCAL STORAGE BEFOREHAND */}
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
          <hr className="my-3" />
          {/*HR = HORIZONTAL RULE, IT WILL GIVE A LINE */}
          <Link to="/payment">
            <button className="btn btn-success">Proceed to Payment</button>
          </Link>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Shipping;
