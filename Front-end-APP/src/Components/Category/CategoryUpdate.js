import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import { isAuthenticated } from "../Auth";
import Navbar from "../Navbar";
import {
  findCategoryFromFrontEnd,
  updateCategoryFromFrontEnd,
} from "./CategoryAPI";

const CategoryUpdate = () => {
  const params = useParams();
  //WHEN WE CLICK THE EDIT BUTTON ON THE EDIT OR DELETE, WE GET AN ID ON THE URL, WE USE USE PARAMS TO GET THAT URL ID INFO
  //HERE, USE PARAMS IS USED TO JUST GET THE PARAMS INFORMATION; WHICH IN THIS CASE IS ID INFO ONLY

  const { token } = isAuthenticated();

  //For Old Category
  const [OldCategory, setOldCategory] = useState("");

  //For New Category
  const [NewCategory, setNewCategory] = useState("");

  //FOR ERROR
  const [error, setError] = useState("");

  //For Setting Success
  const [success, setSuccess] = useState("");

  //TO redirect
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(params.id)
    findCategoryFromFrontEnd(params.id, token)
      //We Will Do Task Via Find Category for [success]
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setOldCategory(data.category_name);
          // console.log(data.category_name);
        }
      })
      .catch((error) => console.log(error));
  }, [success]); //load and show everytime we have new value in success
  //Empty means load only once
  //if [category] was set then this was to reload the function every time category has new value

  //To Update Category:-
  //Method 1:-
  //   const update = (e) =>{
  //     e.preventDefault()
  //     const category_name = new_category
  //     updateCategory(params.id,{new_category},token)
  //     .then(data=>{
  //         if(data.error){
  //             setError(data.error)
  //         }
  //         else{
  //             setSuccess(true)
  //         }
  //     })
  //     .catch(err=>console.log(err))

  // }

  //Method 2:-
  // const update = (e) => {
  //   e.preventDefault()
  // const category_name = NewCategory
  //   updateCategoryFromFrontEnd(params.id,NewCategory,token)
  //   .then(data=>{
  //       if(data.error){
  //           setError(data.error)
  //       }
  //       else{
  //           setSuccess(true)
  //       }
  //   })
  //   .catch(err=>console.log(err))
  // };

  //Better Way:-
  const update = (e) => {
    e.preventDefault();
    // const category_name = new_category
    // updateCategory(params.id,{category_name},token)

    //To let users change value again and again
    // setSuccess("false");
    //TO Change VAlues Again and Again
    updateCategoryFromFrontEnd(params.id, NewCategory, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          // setSuccess("");
        } else {
          setSuccess(true);
          // setError("");
        }
      })
      .catch((err) => console.log(err));
  };

  // to show error
  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  };

  // to show success/ user is added
  const showSuccess = () => {
    if (success) {
      return <div className="alert alert-success">Category Updated</div>;
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="container-fluid custom-row">
          <div className="row ">
            <div className="col-md-3">
              <AdminSidebar />
            </div>
            <div className="col-md-9">
              <h3 className="my-3 text-center">Categories</h3>
              <div className="container">
                {showError()}
                {showSuccess()}
                <div className="form-floating">
                  <input
                    type={"text"}
                    className="form-control"
                    // placeholder="old category_name" AS PLACE HOLDER DOES NOT WORK IN FORM CONTROL
                    value={OldCategory}
                    readOnly
                    //READONLY DOES NOT ALLOW US TO TYPE THERE.
                  />
                  <label>Previous Category Name</label>
                </div>

                {/* THIS WILL BE SET BELOW AS AFTER SUCCESSFUL UPDATE, WE DONT NEED TO SHOW THIS FIELD ANYMORE */}
                {/* <div className="form-floating">
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="enter category_name"
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <label>New Category Name</label>
                </div> */}

                {/* TO HIDE UPDATE BUTTON AND UPDATE FIELD IF UPDATED ONCE */}
                {/* USING TERNARY OPERATOR */}
                {success ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/admin/category")}
                  >
                    Go back
                  </button>
                ) : (
                  <>
                    <div className="form-floating">
                      <input
                        type={"text"}
                        className="form-control"
                        placeholder="enter category_name"
                        onChange={(e) => setNewCategory(e.target.value)}
                      />
                      <label>New Category Name</label>
                    </div>

                    {/* NOW FOR UPDATE BUTTON */}
                    <button className="btn btn-info" onClick={(e) => update(e)}>
                      Update
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryUpdate;
