//INITIALLY, CATEGORY.JS WORKS AND WHEN THE BUTTONS ARE CLICKED, API'S ARE CALLED
//API LINK THOSE TO BACKEND FUNCTIONS
//HERE, ADDCATEGORY DOES FUNCTIONS LIKE ADDCAT IN POSTMAN BUT WITHOUT USING POSTMAN AND FOR FRONTEND

import { API } from "../../config";

// to get all categories from backend
//i.e To Connect To Backend And Get Data
export const getAllCategories = () => {
  //fetAllCategories is our custom function which will be used in Category.JS
  // console.log("fetching data")
  return (
    fetch(`http://localhost:8000/api/showcat`, {
      // here, /showcat is the route name from back end
      method: "GET",
    })
      //To Fetch Any Messages
      .then((res) => res.json())
      //res as to send values in this .then which will show it in CATEGORY.JS When CALLED THERE
      //In Category.js, .then(Data will get value from this)
      .catch((err) => console.log(err))
  ); //To Show Error in Console
};

//NOTE:-
// export const getAllCategories = () => {
//IF WE JUST WANT TO CREATE A FUNCTION WE USE EMPTY PARENTHESIS LIKE ABOVE
//BUT
// IF WE WANT TO SEND DATA TO BACKEND OR ANYWHERE, WE PUT VALUE IN PARENTHESIS LIKE BELOW
// export const addCategory = (category) => {
//To Add New Category
// to add new category
export const addCategoryForFrontAPI = (category, token) => {
  //This category and token are custom defined for this function
  //HERE CATEGORY IS ALREADY OBJECT AS WE HAVE PASSED AS CATEGORY_NAME IN CATEGORY.JS
  //addCategoryFromFrontend is our custom function name
  //   return fetch(`${API}/addcat`, {
  return (
    fetch(`http://localhost:8000/api/addcat`, {
      // here, /addcategory is the route name from back end
      //OR WE CAN WRITE RETURN FETCH AS ABOVE
      method: "POST",
      headers: {
        //If There is Require Signin, We Need To Send Authorization and Authorization IS Inside Header
        Accept: "application/json", //Only Accept JSON
        "Content-Type": "application/json", //Incomming Data Should Be JSON
        Authorization: `Bearer ${token}`, //For Authorization
      },
      body: JSON.stringify(category),
    })
      //To Fetch Any Messages
      .then((res) => res.json())
      .catch((err) => console.log(err))
  );
};

//To Delete Category
export const deleteCategoryForFrontAPI = (id, token) => {
  //This id and token are custom defined for this function
  //HERE CATEGORY IS ALREADY OBJECT AS WE HAVE PASSED AS CATEGORY_NAME IN CATEGORY.JS
  //addCategoryFromFrontend is our custom function name
  //   return fetch(`${API}/addcat`, {
  return (
    fetch(`http://localhost:8000/api/deletecat/${id}`, {
      // here, /addcategory is the route name from back end
      //OR WE CAN WRITE RETURN FETCH AS ABOVE
      method: "DELETE",
      headers: {
        //If There is Require Signin, We Need To Send Authorization and Authorization IS Inside Header
        Authorization: `Bearer ${token}`, //For Authorization
        //No Need Accept and Contend Type As Here We Just Delete it and we do not send any values to back end
      },
    })
      //To Fetch Any Messages
      .then((res) => res.json())
      .catch((err) => console.log(err))
  );
};

//To Find Category
export const findCategoryFromFrontEnd = (id) => {
  return (
    fetch(`http://localhost:8000/api/findcat/${id}`, {
      // here, /addcategory is the route name from back end
      //OR WE CAN WRITE RETURN FETCH AS ABOVE
      method: "GET",
    })
      //To Fetch Any Messages
      .then((res) => res.json())
      .catch((err) => console.log(err))
  );
};

//To Update Category

//Method 1:-

// export const updateCategory = (id, category, token) =>{
//   return fetch(`http://localhost:8000/api/updatecat/${id}`,{
//       method:"PUT",
//       headers:{
//           Accept:"application/json",
//           "Content-Type":"application/json",
//           Authorization:`Bearer ${token}`
//       },
//       body: JSON.stringify(category)
//   })
//   .then(res=>res.json())
//   .catch(err=>console.log(err))
// }

//Method 2:-

// export const updateCategoryFromFrontEnd = (id, category_name, token) => {
// console.log({category_name})
//token need as require signin done in back end
//   return (
//     fetch(`http://localhost:8000/api/updatecat/${id}`, {
// here, /addcategory is the route name from back end
//OR WE CAN WRITE RETURN FETCH AS ABOVE
//       method: "PUT",
//       headers: {
//If There is Require Signin, We Need To Send Authorization and Authorization IS Inside Header
//         Accept: "application/json", //Only Accept JSON
//         "Content-Type": "application/json", //Incomming Data Should Be JSON
//         Authorization: `Bearer ${token}`, //For Authorization
//       },
//       body: JSON.stringify({ category_name }),
//First convert OBJECT and THEN CONVERT INTO JSON
//     })
//To Fetch Any Messages
//       .then((res) => res.json())
//       .catch((err) => console.log(err))
//   );
// };

//Better Way:-
export const updateCategoryFromFrontEnd = (id, category_name, token) => {
  //This (id, category_name, token) will take   values  from updateCategoryFromFrontEnd(params.id, NewCategory, token) of CategoryUpdate.js i.e id= id, category_name=NewCategory, token = token
  return fetch(`http://localhost:8000/api/updatecat/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(category_name)
    body: JSON.stringify({ category_name }),
    //First convert OBJECT and THEN CONVERT INTO JSON
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
