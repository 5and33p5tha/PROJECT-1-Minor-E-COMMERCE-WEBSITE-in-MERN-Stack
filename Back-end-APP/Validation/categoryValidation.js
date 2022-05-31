//IN LOCAL STORAGE, EVERYTHING IS SAVED IN STRING FORMAT, HENCE WE CONVERT IN JSON FORMAT

//Category Validation USING EXPRESS VERSION BELOW 6.0

//ALL VALIDATION CAN BE DONE IN SAME PAGE ALL THAT MATTERS IS THAT THE IMPORT MATCHES.

//NOT USED NOW
exports.categoryValidation = (req, res, next) => {
  req.check("category_name", "Category Cannot Be Empty").notEmpty();
  //req.check
  //check 'category_name' via .notEmpty() that means cannot send empty
  //If Empty, Send Message 'Category name is required'

  const errors = req.validationErrors();

  if (errors) {
    const showError = errors.map((err) => err.msg)[0]; //i.e show one at a time
    //i.e show next error only after that is resolved

    //This Error Will Be Send In 400 VIA FOLLOWING Code.
    return res.status(400).json({ error: showError });
  }
  next();
};
