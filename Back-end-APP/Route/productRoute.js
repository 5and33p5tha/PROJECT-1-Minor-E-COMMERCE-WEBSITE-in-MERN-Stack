//This calls our created Functions made in ProductCONTROLLER.JS
const router = require("express").Router();

const { productValidation } = require("../Validation/productValidation"); //To Import Express Validator

const {
  addProduct, //TO IMPORT THE FUNCTION addProduct as declared in ProductController.js
  showProducts, //TO IMPORT THE FUNCTION showProducts as declared in ProductController.js
  findProduct, //TO IMPORT THE FUNCTION findProduct as declared in ProductController.js
  updateProduct, //TO IMPORT THE FUNCTION updateProduct as declared in ProductController.js
  deleteProduct,
  findRelated,
  filterProduct, //TO IMPORT THE FUNCTION deleteProduct as declared in ProductController.js
} = require("../Controller/productController"); //To Import from productController.js

//To import upload.js
const upload = require("../middleware/upload");

//Now Replaced By Validation.js
//Used In Old Express Format

//Replaced By
const { productCheck, validation } = require("../Validation/validation");

//Now For New Post Method i.e to Write in server:-
// router.post("/addProd", upload.single("product_image"), addProduct);
//Here, upload helps to upload in desired destination with filename.
// upload.single = for single uploads
// upload.array = for multiple uploads
//Here, addProd is our custom defined name  like route in react and addProduct is THE FUNCTION AS DECLARED IN PRODUCTCONTROLLER.JS
//Now doing the same with product validation

//PRODUCT VALIDATION IS NO LONGER IN USE
// router.post(
//   "/addProd",
//   upload.single("product_image"),
//   productValidation,
//After Successful Validation, it can go to addProduct via next function
//   addProduct
// );

//INSTEAD WE HAVE:-
router.post(
  "/addProd",
  upload.single("product_image"),
  productCheck,
  validation,
  //After Successful Validation, it can go to addProduct via next function
  addProduct
);

//now to read from server
router.get("/showProd", showProducts);
//Here, showProd is our custom defined name  like route in react and showProducts is THE FUNCTION AS DECLARED IN PRODUCTCONTROLLER.JS

//To Search For Single ID
router.get("/findProd/:Pid", findProduct);
//ALSO PRODUCT DETAIL
//Here, findProd is our custom defined name  like route in react and findProduct is THE FUNCTION AS DECLARED IN PRODUCTCONTROLLER.JS

//To update For Given ID
router.put("/updateProd/:id", updateProduct);
//Here, updateProd is our custom defined name like route in react and updateProduct is THE FUNCTION AS DECLARED IN PRODUCTCONTROLLER.JS

//To update For Given ID
router.delete("/deleteProd/:Did", deleteProduct);
//Here, :Did is custom id definition, uf given so, the naming should be same in product controller aswell
//Here, deleteProd is our custom defined name like route in react and deleteProduct is THE FUNCTION AS DECLARED IN PRODUCTCONTROLLER.JS

//To Get related Products
router.get("/findRelatedProd/:id", findRelated);

//To get Filterd Products
router.post("/getFilteredProd", filterProduct);

module.exports = router;
//It is the code that runs, GET, POST, DELETE, etc can be all changed to one single term like put or get only.
//BUT THE METHOD HERE AND IN POSTMAN SHOULD MATCH
