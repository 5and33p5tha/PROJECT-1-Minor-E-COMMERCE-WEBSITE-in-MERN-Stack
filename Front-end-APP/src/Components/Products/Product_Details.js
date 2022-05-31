import React, { useState, useEffect } from "react";
import API from "../../config"; //CAN ALSO USE API INCASE OF HTTPS://LOCALHOST:8000 if it is working

// const Product_Details = ({product}) => { THIS IS OLD METHOD. THIS HAS BEEN UPDATED

//The updated technique is
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { deleteProductFromFrontAPI, getProductDetails } from "./ProductAPI";
//AND THE FOLLOWING
// const Product_Details = () => {
//   const params = useParams(); //To Fetch What Is In The URL say product id
// const product = params.product; cant be used like this as unread product id
// so,
//   const [product, setProduct] = useState({});

import { isAuthenticated } from "../Auth";
import RelatedProducts from "../RelatedProducts";
import { addItemsToCart } from "../../Reducer/cartActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //react-toast CSS
import { useDispatch } from "react-redux";
const Product_Details = () => {
  const params = useParams(); //To Fetch What Is In The URL say product id
  // const product = params.product; cant be used like this as unread product id
  // so,
  const [product, setProduct] = useState({});

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const id = params.id;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  //NOW, FOR BUTTONS
  const { loginuser } = isAuthenticated();
  // console.log(loginuser);
  // console.log(user) TO CHECK VALUES FROM USER
  // console.log(user.role) TO CHECK VALUES FROM USER

  useEffect(() => {
    getProductDetails(params.id)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProduct(data);
        }
      })
      .catch((err) => console.log(err));
  }, [params]);

  // console.log(product);
  // console.log(params);
  // console.log(params,id);
  //Since Id Is Not Read, we use product API

  //To Delete product FOR ADMIN
  const deleteProductFromFrontEnd = (id) => {
    //WE NEED ID AND TOKEN AND HENCE DEFINED ID AND No Need To Call Token Here As WE HAVE DEFINED TOKEN ABOVE
    //WE CANNOT DEFINE ID HERE LIKE TOKEN AS WE HAVE GENERATED ID VIA MAP
    //This Is Custom Function Name

    setSuccess("");
    //e.preventDefault() if we have passed e. USED IN CASES IF IT RUNS CONTINUOUSLY
    deleteProductFromFrontAPI(id) // Calling Function From PRODUCTAPI.JS
      .then((data) => {
        if (data.error) {
          setSuccess("");
          setError(data.error);
        } else {
          setError("");
          setSuccess("Product Deleted successfully");
          navigate("/deals"); //If not performed, delete function will run infinitely.
          //we write navigate if it is above return in react and we write Navigate with capital N if it is inside return
        }
      })
      .catch((err) => console.log(err));
  };

  // TO SHOW ERROR
  const showError = () => {
    if (error) {
      //Errors From Backend
      return <div className="alert alert-danger">{error}</div>; //WHATEVER VALUE IS IN (ERROR) IS DISPLAYED IN {ERROR}
    }
  };

  //TO SHOW SUCCESS
  const showSuccess = () => {
    if (success) {
      //Success From Backend
      return <div className="alert alert-success">{success}</div>; //WHATEVER VALUE IS IN (SUCCESS) IS DISPLAYED IN {SUCCESS}
    }
  };

  //To Add Items To Cart FOR USER
  const addtocart = () => {
    dispatch(addItemsToCart(params.id, 1)); //calling function addItemsToCart from Cart Actions
    //params.id as it has to take that id of the product we are viewing to add to cart
    //1 as we will only add it once from here, the number can be set via cart
    toast.success("Items Added To Cart Successfully"); //IS USED VIA TOAST-CONTAINER
  };
  return (
    <>
      {showError()}
      {showSuccess()}
      <ToastContainer position="top-center" theme="colored" />
      <div className="container w-75 my-5 shadow-lg p-5 mx-auto">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`http://localhost:8000/${product.product_image}`}
              alt={product.product_name} //i.e show if image does not load
              className="img-fluid" //MAKES IMAGE FIT TO CONTAINER WIDTH
            />
          </div>
          <div className="col-md-6">
            <h1>{product.product_name}</h1>
            <h4>Rs.{product.product_price}</h4>
            <h4>
              Stock:
              <input
                type="text"
                className="text-muted"
                value={product.Count_In_Stock}
                disabled={true} //TO MAKE IT UNABLE TO TYPE
              />
            </h4>
            <p>Description: {product.product_description}</p>

            {/* FOR USER = 0 I.E NORMAL USER */}
            {/* Can Do:-  Initially !loginuser && ()
            And Then loginuser.role==0 && () */}

            {/* OR WE CAN DO IN A SINGLE CONDITIONAL STATEMENT AS */}
            {/* {loginuser.role === 0 && ( */}
            {/* {(!loginuser || loginuser.role==0) && (
              <button className="btn btn-warning">Add to cart</button>
            )} */}

            {/* FOR USER = 1 I.E ADMIN */}
            {/* {
              loginuser.role === 1 && (
                <>
                  <button className="btn btn-info">Edit Product</button>
                  <button className="btn btn-danger">Remove Product</button>
                </>
              )
              //<></> IN CASE OF ERROR, FORMATTING FOR ERROR
            } */}

            {/* CAN DO ALL OF THIS IN A BETTER MANNER USING TERNARY OPERATOR AS:- */}
            {loginuser && loginuser.role === 1 ? (
              <>
                {/* Initially check if user is logged in and then check user role is 1 or not */}
                {/* i.e if user is logged in and has a role =1 i.e admin */}
                <button className="btn btn-info">Edit Product</button>
                <button
                  className="btn btn-danger"
                  // onClick={deleteProductFromFrontEnd}
                  onClick={() => deleteProductFromFrontEnd(params.id)} //Passing function in onclick, while passing, no parenthesis
                  //i.e We Cannot do Onclick = {function ()}
                  //So, we have to write it as Onclick = {()=>deleteProductFromFrontEnd(params.id)}
                >
                  Remove Product
                </button>
              </>
            ) : (
              // if user is not logged and if logged in, the role is not =1
              <button className="btn btn-warning" onClick={addtocart}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
        {/* {console.log(product._id)} */}
      </div>
      <RelatedProducts />
    </>
  );
};

export default Product_Details;
