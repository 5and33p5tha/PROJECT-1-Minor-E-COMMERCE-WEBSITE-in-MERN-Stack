//New Way for express validator i.e for all validation process
const { check, validationResult } = require("express-validator");

exports.validation = (req, res, next) => {
  //These will be called whenever needed for category, product and all
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  } else {
    // return res.status(400).json({ error: errors }); //WILL SHOW EVERYTHING
    // return res.status(400).json({ error: errors.array()[0].msg }); //WILL SHOW IN ARRAY AND SHOW ONLY 1 I.E 1ST INDEX AND ONLY SHOW MSG
    // return res.status(400).json({ error: errors.array()[0].param }); //WILL SHOW IN ARRAY AND SHOW ONLY 1 I.E 1ST INDEX AND PARAMS SHOWS WHERE THE ERROR OCCURS
    return res
      .status(400)
      .json({ error: errors.array().map((err) => err.msg) }); // SHOW ALL IN ARRAY
  }
};

exports.categoryCheck = [
  //Big Brackets AS THIS IS ARRAY i.e category is array
  check("category_name", "category name is requied")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("category must be at least 3 characters"),
];

exports.productCheck = [
  //Big Brackets AS THIS IS ARRAY i.e product is array
  check("product_name", "Product name is required").notEmpty(),
  //CHECK checks the product name.
  //notEmpty makes it a must and should not be empty
  //check and notEmpty are built in functions
  //If product name is empty, the message 'Product name is required' is passed

  //The Following code is commented temporarily via version update errors in express-validator
  //   req.check("product_image", "Product name is required").notEmpty();
  //The ABOVE code is commented temporarily via version update errors in express-validator

  check("product_price", "Product Price is required")
    .notEmpty()
    .isNumeric()
    .withMessage("Price Must Be A Number"),

  check("product_description", "Product description is required")
    .notEmpty()
    .isLength({ min: 10, max: 30 })
    .withMessage(
      "Price Description Must Be Minimum 10 Characters and Maximum 30 Characters Long"
    ),

  check("Count_In_Stock", "Count In Stock is required")
    .notEmpty()
    .isNumeric()
    .withMessage("Count In Stock Must Be A Number"),

  check("category", "category ID is required").notEmpty(), //AS CATEGORY IS SEPARATE FOM PRODUCTS, WE CAN COMMENT THIS LINE ASWELL
  //THE ABOVE CODE FOR CHECKING CATEGORY CAN BE COMMENTED IN THIS CASE ONLY
  //PUT THE CATEGORY ID FROM CATEGORY IN PRODUCT
];

exports.userCheck = [
  check("first_name", "FIRST NAME is required").notEmpty(), //first_name here should match first_name as in model
  check("last_name", "LAST NAME is required").notEmpty(), //last_name here should match last_name as in model
  check("date_of_birth", "DOB is required").notEmpty(), //date_of_birth here should match date_of_birth as in model
  check("gender", "GENDER is required").notEmpty(), //gender here should match gender as in model
  check("email", "Email is required")
    .notEmpty()
    .isEmail() //.isEMAIL CHECKS IF THE FORMAT MATCHES EMAIL.
    .withMessage("Email format invalid"), //Error Message For Email
  check("password", "Password is required")
    .notEmpty()
    .isLength({ min: 8, max: 30 }) //This Means Password Should be aminimum of 8 characters and maximum of 30 characters
    .withMessage("Password must be between 8 and 30 characters"), //Error Message For Password
  //Can Also Do Different MESSAGE FOR MINIMUM AND MAXIMUM
  //FOR MINIMUM
  //.isLength({ min: 8}) //This Means Password Should be aminimum of 8 characters and maximum of 30 characters
  //.withMessage("Password must be MINIMUM 8 characters"); //Error Message For Password
  //FOR MAXIMUM
  //.isLength({ max: 30}) //This Means Password Should be aminimum of 8 characters and maximum of 30 characters
  //.withMessage("Password must be MAXIMUM 30 characters"); //Error Message For Password
];
