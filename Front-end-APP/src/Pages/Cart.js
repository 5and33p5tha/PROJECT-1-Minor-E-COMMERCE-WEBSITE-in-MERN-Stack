import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import "./cart.css";
import { API } from "../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //react-toast CSS
import { addItemsToCart, removeItemFromCart } from "../Reducer/cartActions";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart_items } = useSelector((state) => state.cart); //useSelector Allows us to pull values from reducers

  const dispatch = useDispatch(); //EVERYTIME WE NEED TO PERFORM ACTION ON REDUCER, WE NEED DISPATCH
  //THE CART IS FOR USERS, I.E USERS CAN REMOVE AND/OR INCREASE CART ITEMS. HENCE WE DO NOT NEED TO SHOW IT IN DATABASE.

  const removeFromCart = (id, name) => {
    //id is for removal of product from cart
    //name is for toast i.e popup message. toast.success shows green popup
    //Note:- no need to do params.id in reducer
    dispatch(removeItemFromCart(id));
    toast.success(`${name} has been removed from cart`);
  };
  // console.log(cart_items)

  const increaseInCart = (id, quantity, Count) => {
    //will take value from below as id = item.product quantity = item.quantity, count = item.Count_In_Stock
    // console.log(id, quantity, Count);
    //TO ADD, WE NEED ID, QUANTITY AND CHANGE STOCK OF SELLER AS THE ITEM GOES TO CART OF BUYER AND HE PURCHASES
    const new_quantity = quantity + 1;
    if (new_quantity > Count) {
      return; //i.e. return from function without doing any work
    }
    dispatch(addItemsToCart(id, new_quantity));
    toast.warning(`count has been updated`);
  };

  const reduceFromCart = (id, quantity) => {
    //TO REDUCE, WE JUST NEED ID AND QUANTITY AS ORIGINAL STOCK WILL NOT CHANGE
    const new_quantity = quantity - 1;
    if (new_quantity == 0) {
      return;
    }
    dispatch(addItemsToCart(id, new_quantity)); //same function as in plus
    toast.error(`count has been decreased`);
  };

  return (
    <>
      {/* <Navbar /> */}
      <ToastContainer position="top-center" theme="colored" />
      <div className="container mx-auto">
        <table className="table table-striped table-hover mytable text-center">
          {/* Table Hover adds hover effect, table striped adds striped color effect */}
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Product Images</th>
              <th scope="col">Product Details</th>
              <th scope="col" colSpan={2}>
                Action
              </th>
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
                  <div className="row w-50 mx-auto">
                    <button
                      className="col btn btn-danger"
                      onClick={() =>
                        reduceFromCart(
                          item.product,
                          item.quantity
                          //NO NEED STOCK AS DECREASING NEITHER INCREASER NOR DECREASES THE STOCK
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type={"text"}
                      value={item.quantity}
                      className="col text-center"
                      disabled={true}
                    />
                    <button
                      className="col btn btn-success"
                      onClick={() =>
                        increaseInCart(
                          item.product,
                          item.quantity,
                          item.Count_In_Stock //COUNT NEEDED AS WE HAVE TO DECREASE THE COUNT FROM STOCK IF THE IT IS ADDED IN CART
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      removeFromCart(item.product, item.product_name)
                    }
                    //item.product will give id and item.product_name will give the name AS DEFINED IN CARTACTIONS.JS ADD_ITEMS_TO_CART
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={5}>
                <Link to="/checkout">
                  <button className="btn btn-info">Proceed to Checkout</button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Cart;
