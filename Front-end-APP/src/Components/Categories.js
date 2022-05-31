import React, { useState, useEffect } from "react";
import { getAllCategories } from "./Category/CategoryAPI";

const Categories = ({ passing_handleFilters }) => {
  //passing_handleFilter is like PROPS
  //Actual Pass
  //{ passing_handleFilters } = PASSING handleFilters here as Passing_handleFilters
  //This should be called below to EXECUTE or RUN
  //Note:- We MUST PASS FUNCTION TO CALL/RUN IT but WE CAN ASLO JUST PASS FUNCTION ONLY

  //Now To display categories
  const [categories, setCategories] = useState([]);

  //To store only checked categories
  const [checked, setChecked] = useState([]);
  const handleToggle = (c) => {
    //is called below
    //just like when event passed we use e, c is similar

    //THIS IS USED IN SIDEBAR TO CLICK AND UNCLICK CATEGORIES. we will use this to show relevant categories
    const currentCategoryId = checked.indexOf(c); //TO CHECK WHETHER SELECTED ONE IS  ALREADY CHECKED
    const newCheckedCategoryId = [...checked]; //TO GET PREVIOUS CHECKED
    //newCheckedCategoryID will create NEW ARRAY AND DISCARD OLD ARRAY, THIS IS HOW ARRAY USUALLY WORKS
    if (currentCategoryId === -1) {
      //LINE 21 GIVES INDEX IF PRESENT AND -1 IF NOT PRESENT
      //IF CASE FOR INITIAL CLICKING
      newCheckedCategoryId.push(c);
      //i.e if it does not have that value, it will show -1
      //and then add if it is -1
    } else {
      //ELSE CASE WHEN IT IS CLICKED AGAIN REMOVING FROM ARRAY USING SPLICE METHOD
      newCheckedCategoryId.splice(currentCategoryId, 1); //currentCategoryID is dynamic i.e it can be telivision, mobile, etc  BUT 1 MEANS REMOVE BY ONE EVERY TIME
      //if it exists, just remove by 1
      //Splice Syntax(Index i.e position of item, Number of items to remove, items to add at position given by index)
      //splice(Index, No, Add) if add is not give, nothing will be added
      //splice( 2, 0, apple) i.e remove nothing and add apple at 2nd index
    }
    setChecked(newCheckedCategoryId); //PUT newCheckedCategoryId in checked IE TO STORE NEWLY CHANGED CHECKED ARRAY

    //NOW CALLING THE FUNCTION OF DEALS PAGE, PASSING NEWLY CHANGED ARRAY INTO FILTERS
    passing_handleFilters(newCheckedCategoryId, "category"); //CHECKED GIVES THE FINAL VALUE IE. AFTER END OF CLICKS AND UNCLICKS IN DEALS.JS FRONT PAGE IN BROWSER
    //Actual USE, In order to use, MUST PASS so Actual Pass ABOVE
    //CALLING passing_handleFilers
    //USE SIRS DIAGRAM FOR BETTER UNDERSTANDING.
    //THIS FUNCTIONS GOES BACK AND FORTH TO CATEGORY, AND DEALS
    //HEAVILY LINKED TO DEALS PAGE HANDLE FILTERS
    //Note:- We MUST PASS FUNCTION TO CALL/RUN IT but WE CAN ASLO JUST PASS FUNCTION ONLY
  };

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {categories.map((category, z) => {
        //Following Code is Copied From Bootstrap */}
        return (
          <div key={z} className="form-check">
            {/* //IF YOU WANT, YOU CAN PUT THE DUV ABOVE, REMOVE RETURN AND REMOVE CURLY BRACES */}
            <input
              className="form-check-input mt-1 me-1"
              type="checkbox"
              onChange={() => handleToggle(category._id)}
              value={category._id} //value is {"category._id"} as EACH BUTTON CLICKED SHOW SHOW THAT CATEGORY I.E PHONE BOX SHOWULD SHOW PHONE CATEGORY FROM BACKEND
              //IF value={"category._id"} means passing string, WITHOUT QUOTE MEANS PASSING VALUE
              id={category._id} //PASSING VALUE TO ID
            />
            <label htmlFor="{category._id}" className="form-check-label">
              {/* //Names will come from Label for each checkboxex */}
              {category.category_name}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default Categories;
