//This calls our created Functions made in CategoryCONTROLLER.JS

const express = require("express");

//Can Also Do  const router = require("express").Router() instead of const express and const router;
const router = express.Router();
// As express = require("express");

// const { showInfo, showMessage } = require("../Controller/categoryController");

const {
  addCategory, //To Import Function addCategory from categoryController.js
  showCategories, //To Import Function showCategory from categoryController.js
  findCategory, //To Import Function findCategory from categoryController.js
  updateCategory, //To Import Function updateCategory from categoryController.js
  deleteCategory, //To Import Function deleteCategory from categoryController.js
} = require("../Controller/categoryController");
const { requireSignin } = require("../Controller/userController"); //To Import Function requireSignIn from userController.js FOR AUTHORIZATION

//FOR OLD EXPRESS-VALIDATOR
// const { categoryValidation } = require("../Validation/categoryValidation");

//FOR NEW EXPRESS_VALIDATOR using Category Check instead of category Validation
const { categoryCheck, validation } = require("../Validation/validation");
//i.e import 2 functions check and validation from /Validation/validation.js
// const { add } = require("nodemon/lib/rules");

//OLD EXPRESS-VALIDATOR
// const { categoryValidation } = require("../Validation/categoryValidation"); //To import validation function from category validation.
//The Following Get Codes are just to route via GET Method
// router.get("/", showInfo);
//Here, get is the Get Method
// router.get("/message", showMessage);

//OLD EXPRESS-VALIDATOR
//Now For New Post Method i.e to Write in server:-
// router.post("/addcat", requireSignin, categoryValidation, addCategory);

//Replaced By NEW EXPRESS_VALIDATOR using Category Check instead of category Validation
router.post("/addcat", requireSignin, categoryCheck, validation, addCategory);
//Here, addcat is our custom defined name  like route in react and addCategory is THE FUNCTION AS DECLARED IN CATEGORYCONTROLLER.JS
//Need requireSignin For Making Changes
//Authorization Bearer "j9s9sadjs9a0sdj" to be added in Header; where token:j9s9sadjs9a0sdj
//Steps In Functions Explained

//now to read from server
router.get("/showcat", showCategories);
//Here, showcat is our custom defined name like route in react and showCategory is THE FUNCTION AS DECLARED IN CATEGORYCONTROLLER.JS

//To Search For Single ID
router.get("/findcat/:Cid", findCategory);
//Here, findcat is our custom defined name like route in react and findCategory is THE FUNCTION AS DECLARED IN CATEGORYCONTROLLER.JS

//To update For Given ID
//OLD EXPRESS-VALIDATOR
// router.put("/updatecat/:id", requireSignin, categoryValidation, updateCategory);
//Here, updatecat is our custom defined name like route in react and updateCategory is THE FUNCTION AS DECLARED IN CATEGORYCONTROLLER.JS
//Need requireSignin For Making Changes

//NEW EXPRESS-VALIDATOR using Category Check instead of category Validation
router.put(
  "/updatecat/:id",
  requireSignin,
  categoryCheck,
  validation,
  updateCategory
);

//To remove For Given ID
router.delete("/deletecat/:Rid", requireSignin, deleteCategory);
//Here, deletecat is our custom defined name like route in react and deleteCategory is THE FUNCTION AS DECLARED IN CATEGORYCONTROLLER.JS
//Need requireSignin For Making Changes

module.exports = router;
//It is the code that runs, GET, POST, DELETE, etc can be all changed to one single term like put or get only.
//BUT THE METHOD DEFINED HERE AND ONE DEFINED IN POSTMAN SHOULD MATCH
