import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../Auth";
import Footer from "../Footer";
import Navbar from "../Navbar";
import AdminSidebar from "../AdminSidebar";
import {
  getAllCategories,
  addCategoryForFrontAPI,
  deleteCategoryForFrontAPI,
} from "./CategoryAPI";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { loginuser } = isAuthenticated();

  const { token } = isAuthenticated();

  const [categories, setCategories] = useState([]);

  const [category_name, setCategoryName] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  //To Show All Category
  useEffect(() => {
    getAllCategories() //Function Called From CategoryAPI.js
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          // console.log(data)
          setCategories(data);
        }
      })
      .catch((err) => console.log(err));
    // }, [error, success]); //i.e Either in Success or Error, The UseEffect Will Work
    //If Only Success Was Used, Only When Value Of Success Changes, Output is Displayed
    //Same For Error
  }, [success]); //Change Only In Success

  //Note About ONCLICK
  //If Passing Function:-
  //OnClick{addCategoryFromFrontEnd}

  //If Calling a function:-
  //   onClick={() => {
  // addCategoryFromFrontEnd();
  //THIS addCategoryFromFrontEnd IS THE INTERNAL FUNCTION CALLED HERE
  //   }}

  //To Add New Category
  const addCategoryFromFrontEnd = () => {
    // addCategoryForFrontAPI( category ) THIS LINE HAS ERROR AS WE NEED TO PASS CATEGORY AS AN OBJECT

    setSuccess("");
    // e.preventDefault()
    addCategoryForFrontAPI({ category_name }, token) //Category_Name Passed as an object as it is an object in the backend
      //addCategoryForFrontAPI is the fucntion from CategoryAPI.JS
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess(""); //So That SetSuccess Will Not Show During SetError
        } else {
          setSuccess("Çategory Added Successfully");
          setError(""); //So That SetError Will Not Show During SetSuccess
          setCategoryName(""); //THIS WILL MAKE SURE THAT THE INPUT BOX WILL RESET TO BLANK AFTER A CATEGORY HAS BEEN ADDED SUCCESSFULLY
          //THE SETCATEGORY IS DEFINED BY VALUE IN BELOW
        }
      })
      .catch((err) => console.log(err));
  };

  //To Delete Category
  const deleteCategoryFromFrontEnd = (id) => {
    //WE NEED ID AND TOKEN AND HENCE DEFINED ID AND No Need To Call Token Here As WE HAVE DEFINED TOKEN ABOVE
    //WE CANNOT DEFINE ID HERE LIKE TOKEN AS WE HAVE GENERATED ID VIA MAP
    //This Is Custom Function Name

    setSuccess("");
    //e.preventDefault() if we have passed e. USED IN CASES IF IT RUNS CONTINUOUSLY
    deleteCategoryForFrontAPI(id, token) // Calling Function From CATEGORYAPI.JS
      .then((data) => {
        if (data.error) {
          setSuccess("");
          setError(data.error);
        } else {
          setError("");
          setSuccess("Category Deleted successfully");
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

  return (
    <>
      {/* <Navbar /> */}
      <div className="container-fluid custom-row">
        <div className="row ">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h3 className="my-3 text-center">Categories</h3>
            <div className="container">
              {/* TO SHOW ERROR AND SUCCESS */}
              {showError()}
              {showSuccess()}
              <table className="table">
                <thead>
                  <tr>
                    <td>S.No.</td>
                    <td>Category Name</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((item, i) => (
                    //To Display What Is In Array
                    <tr key={i}>
                      <td>{i + 1}</td>
                      {/* console.log(item.category_name) */}
                      <td>{item.category_name}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            navigate(`/admin/categoryupdate/${item._id}`)
                          }
                        >
                          EDIT
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteCategoryFromFrontEnd(item._id);
                            //As We Have Mapped As Item, We Need Its ID so item._id
                          }}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2}>
                      <input
                        className="form-control"
                        type={"text"}
                        placeholder="input category name"
                        onChange={(e) => {
                          setCategoryName(e.target.value);
                        }}
                        value={category_name}
                        //This Will Make It Blank After Successful Addition
                        //This Has  Been defined in SetCategoryName
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          addCategoryFromFrontEnd();
                          //THIS addCategoryFromFrontEnd IS THE INTERNAL FUNCTION CALLED HERE
                        }}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Category;
