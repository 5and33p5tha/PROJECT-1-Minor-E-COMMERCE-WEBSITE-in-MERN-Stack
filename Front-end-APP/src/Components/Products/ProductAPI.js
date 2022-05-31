import { API } from "../../config";

//API TO CONNECT TO BACKEND

//To ADD NEW PRODUCT
export const addProduct = (product) => {
  // console.log(product)
  return (
    fetch(`${API}/addProd`, {
      method: "POST",
      headers: {
        //If There is Require Signin, We Need To Send Authorization and Authorization IS Inside Header
        Accept: "application/json", //Only Accept JSON
        // "Content-Type": "application/json", //IMPLIES Incomming Data Should Be JSON NOT NEEDED HERE AS WE HAVE SENT FORM DATA DIRECTLY
        //No Authorization Needed
      },
      // body: JSON.stringify(product), //no need to stringify as formData
      body: product,
    })
      //To Fetch Any Messages
      .then((res) => res.json())
      .catch((err) => console.log(err))
  );
};

//TO GET PRODUCTS FROM BACKEND
export const getallproducts = () => {
  // console.log(product)
  return (
    fetch(`${API}/showProd`, {
      method: "GET",
    })
      //To Fetch Any Messages
      .then((res) => res.json())
      .catch((err) => console.log(err))
  );
};

//to get sorted products
//SORTING BY AND ORDER FROM FRONT END
// export const getSortedProducts = (sortBy) => {
//   return fetch(`${API}/showProducts?sortBy=${sortBy}&order=-1&limit=4`, {
//     method: "GET",
//   })
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// };

//SIRS CODE:-
//just for concept, SEE PRODUCTS_IN_ADMIN_PAGE
// export const getSortedProducts =(sortBy,order,limit) => {
//   return fetch(`${API}/showProducts?sortBy=${sortBy}&order=${order}&limit=${limit}`,{
//       method:"GET"
//   })
//   .then(res=>res.json())
//   .catch(err=>console.log(err))
// }

//to get sorted products for user
export const getSortedProducts = (sortBy, order, limit) => {
  return fetch(
    `${API}/showProd?sortBy=${sortBy}&order=${order}&limit=${limit}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//To Get Product Details
export const getProductDetails = (id) => {
  //TAKE PRODUCT DETAILS FROM HERE
  return fetch(`${API}/findProd/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//To Get Related Products in Front End
export const getRelatedProducts = (id) => {
  return fetch(`${API}/findRelatedProd/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//To DELETE Product
export const deleteProductFromFrontAPI = (id) => {
  //This id and token are custom defined for this function
  //HERE CATEGORY IS ALREADY OBJECT AS WE HAVE PASSED AS CATEGORY_NAME IN CATEGORY.JS
  //addCategoryFromFrontend is our custom function name
  //   return fetch(`${API}/addcat`, {
  return (
    fetch(`http://localhost:8000/api/deleteProd/${id}`, {
      // here, /deleteProd is the route name from back end
      //OR WE CAN WRITE RETURN FETCH AS ABOVE
      method: "DELETE",
      // headers: {
      //If There is Require Signin, We Need To Send Authorization and Authorization IS Inside Header
      //Authorization: `Bearer ${token}`, //For Authorization // NOT NECESSARY HERE AS WE HAVE NOT SET IT IN BACK END
      //No Need Accept and Contend Type As Here We Just Delete it and we do not send any values to back end
      // },
    })
      //To Fetch Any Messages
      .then((res) => res.json())
      .catch((err) => console.log(err))
  );
};

//to get filtered products
export const getFilteredProducts = (
  //NOTE, WHILE CALLING THIS FUNCTION IN DEALS.JS, IT SHOULD BE IN SAME ORDER OF OCCURENCE
  //I.E 1.SORTBY, 2.ORDER, 3.LIMIT, 4.SKIP
  //{filters} is left out in deals.js
  sortBy,
  order,
  limit,
  skip,
  // filters = {} INSTEAD DO, Cannot change Name
  { filters }
) => {
  // console.log(filters)
  //AS NAME PARAMETER, Can Change Names
  let data = { skip, filters }; //AS WE TAKE SORTBY, ORDER AND LIMIT FROM QUERY (SEE PRODUCT CONTROLLER OF BACKEND) AND WE ONLY TAKE SKIP AND FILTERS FROM REQ.BODY
  //SO ONLY SKIP AND FILTERS HERE
  // console.log(data);
  // console.log(filters);

  // return fetch(`${API}/getFilteredProd`, {
  //Temporarily removed ?sortBy=${sortBy}&order=${order}&limit=${limit}  AS WE TAKE SORTBY, ORDER AND LIMIT FROM QUERY (SEE PRODUCT CONTROLLER OF BACKEND) AND WE ONLY TAKE SKIP AND FILTERS FROM REQ.BODY
  //SO ONLY sortBy, order and limit here
  return fetch(`${API}/getFilteredProd?limit=${limit}`, {
    //to show upto limit
    method: "POST",
    headers: {
      //If There is Require Signin, We Need To Send Authorization and Authorization IS Inside Header
      Accept: "application/json", //Only Accept JSON
      "Content-Type": "application/json", //IMPLIES Incomming Data Should Be JSON NOT NEEDED HERE AS WE HAVE SENT FORM DATA DIRECTLY
      //No Authorization Needed
    },
    body: JSON.stringify(data), //no need to stringify as formData
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
