const Product = require("../Model/product");
//To use Products as declared OBJECT or BETTER MODEL IN TERMS OF DATABASE in Product.js

//TO ADD PRODUCTS
exports.addProduct = async (req, res) => {
  let product = new Product({
    //Product = Model As Declared
    //Only input those that will be declared initially when adding products.
    //HENCE COMMENTS OR REVIEWS OR RATINGS ARE LEFT OUT AS FRROM PRODUCT.JS
    category: req.body.category, //req means to input from and req.body means that which comes from user
    product_name: req.body.product_name, //req means to input from and req.body means that which comes from user
    product_price: req.body.product_price, //req means to input from and req.body means that which comes from user
    // product_image: req.body.product_image, //req means to input from and req.body means that which comes from user
    //Now for actual image
    product_image: req.file.path,
    product_description: req.body.product_description, //req means to input from and req.body means that which comes from user
    Count_In_Stock: req.body.Count_In_Stock, //req means to input from and req.body means that which comes from user
    //This can be done in any order
    //The Left Part (say category:) SHOULD MATCH WITH MODEL I.E. PRODUCT.JS
    //The Right Part (say after req.body. i.e category)SHOULD MATCH WITH POSTMAN, IT MAY ALSO COME FROM THE USER
  });
  product = await product.save();
  if (!product) {
    return res.status(400).json({ error: "Something went wrong" });
  } else {
    res.send(product);
  }
};

//TO SHOW PRODUCTS
exports.showProducts = async (reqs, resp) => {
  // let products = await Product.find();

  //THIS IS FOR DEFAULT
  //I.E BY DEFAULT, IN ASCENDING ORDER, BY ID AND SEND 20000 DATAS
  let order = reqs.query.order ? reqs.query.order : 1; //i.e sort in ascending order, we have order as 1 = ascending, -1 as descending
  //ascending means oldest first, descending means newest first
  let sortBy = reqs.query.order ? reqs.query.sortBy : "_id"; //i.e sory by id, we have sortBy id, price, best match, etc
  //THE SORD AND ORDER HERE IS DONE IN BACK END, AND ONLY THEN THE 20000 DATAS ARE PASSED TO FRONT END.
  //THE SORT AND ORDER CAN BE DONE IN FRONT END AFTER PASSING THE DATA TO FRONT END ASWELL.

  let limit = reqs.query.order ? parseInt(reqs.query.limit) : "20000"; //i.e PASS HOW MANY DATA TO FRONT END, AND THEN FRONT END WILL DISPLAY BASED ON ITS OWN LIMIT
  //HERE, it will pass 20000 data to front end and frontend will choose how much to display

  let products = await Product.find()
    .populate("category") //Incase of multiple models, we can do .populate("model1").populate("model2") aswell BUT its BETTER TO DO:-   populate: { path: "product", populate: "category" },
    //WHERE IN   populate: { path: "product", populate: "category" }, PRODUCT IS MODEL1 WHICH IS UNDER I.E BELONGS TO  CATEGORY WHICH IS MODEL 2
    .sort([[sortBy, order]]) //[[]] signifies array of array
    .limit(limit);
  //IF POPULATE IS NOT DONE, THE SHOWPROD WILLL NOT SHOW THE CATEGORY WHICH IT CAME FROM
  // This products can have same name as in above products or completely new
  //Here, Product = Model as Defined
  //.populate('') will show where it derived from or which field, In this case it is category
  //category is not the model but the field name as in product.js
  //In:-
  // category: {
  //   type: ObjectId,
  //   required: true, //No Empty Allowed
  //   ref: "Category", //This Will Link it to The Model named Category as created in export.default Category in Category.js
  // },
  if (!products) {
    return resp.status(400).json({ error: "Something Went Wrong" });
  } else {
    resp.send(products);
    //This will show products.
    //IF NO PRODUCTS, IT WILL SHOW BLANK TABLE
  }
};

//TO VIEW A PRODUCT
exports.findProduct = async (req, res) => {
  //Find By ID Does Not Make It Exclusive To Be In Object Format
  let prod = await Product.findById(req.params.Pid).populate("category"); //This Pid can also be id or extra id but should match the name in router in ProductRoute.js
  //  Product is the model
  // This prod can have same name as in above products or completely new
  // Can Also Do:
  // let prod = await Category.findOne({_id: req.params.Pid}); or just id instead of Pid
  // Or
  // let prod = await Category.findOne({_id:req.params.Pid}); Object Form As It Has To Be Object
  if (!prod) {
    return res.status(400).json({ error: "Something Went Wrong Went Wrong" });
  } else {
    res.send(prod);
  }
};

//To View A Product i.e productDEtails in SIR's way
// exports.productDetails = async (req, res) => {
// let product = await Product.findById(req.params.id).populate('category')
//   if (!product) {
//       return res.status(400).json({ error: "something went wrong" })
//   }
//   else {
//       res.send(product)
//   }
// }

exports.updateProduct = async (req, response) => {
  //reqs=request and resp = response for this only
  let prods = await Product.findByIdAndUpdate(
    //Here, prods = our custom defined variable and Product = Name of Model
    // This prods can have same name as in above category Like prod or product
    //findIdAndUpdate will search for and id and Update that ID and related data
    req.params.id,
    {
      category: req.body.category, //req means to input from and req.body means that which comes from user AND PLACE HERE
      product_name: req.body.product_name, //req means to input from and req.body means that which comes from user AND PLACE HERE
      product_price: req.body.product_price, //req means to input from and req.body means that which comes from user AND PLACE HERE
      // product_image: req.body.product_image, //req means to input from and req.body means that which comes from user AND PLACE HERE
      //Now for actual image
      product_image: req.file.path,
      product_description: req.body.product_description, //req means to input from and req.body means that which comes from user  AND PLACE HERE
      Count_In_Stock: req.body.Count_In_Stock, //req means to input from and req.body means that which comes from user  AND PLACE HERE
    },
    { new: true } //WILL DISIPLAY UPDATED DATA AFTER SUCCESSFUL UPDATE
  );
  if (!prods) {
    return response.status(400).json({ error: "something went wrong" });
  } else {
    response.send(prods);
  }
};

exports.deleteProduct = (reqs, resp) => {
  //reqs=request and resp = response for this only
  let DelProdts = Product.findByIdAndDelete(
    //can also do findByIDAndRemove
    //Here, Categories = our custom defined variable and Categories = Name of Model
    // This cate can have same name as in above category Like Cat or Ctry or category
    //findIdAndRemove will search for and id and Remove that ID and related data
    reqs.params.Did //Did as we are using Did instead of id and we will set Did in product route aswell
  )
    .then((DelProdts) => {
      //Then Will TAKE EFFECT IF CONNECTED TO DATABASE
      if (!DelProdts) {
        return resp.status(400).json({ error: "product not found" });
        //THIS ERROR WILL POP UP IF DATABASE CONNECTION IS SUCCESSFUL BUT NO ID IS FOUND OR GIVEN ID DOES NOT MATCH
      } else {
        return resp.status(200).json({ msg: "product removed successfully" });
        //THIS MESSAGE WILL POP UP IF DATA REMOVAL IS SUCCESSFUL
      }
    })

    .catch((error) => resp.status(400).json({ error: error })); //Then Will TAKE EFFECT IF UNABLE TO CONNECTED TO DATABASE
};

//TO FIND RELATED PRODUCTS
exports.findRelated = async (req, res) => {
  // let product = Product.findById CANNOT DO BY ID AS IT WILL ONLY SEARCH ONE PRODUCT
  //SO, WE DO VIA FOLLOWING
  //NOTE, RELATED PRODUCT = SAME CATEGORY PRODUCTS
  let singleProduct = await Product.findById(req.params.id);
  //the single product and searched category shoul be the same for ALL RELATED PRODUCTS
  //SO:- Product.find({category:singleProduct.category
  //AND, SINCE THAT PRODUCT SHOULD NOT SHOW SINGLE PRODUCT SO _id:{ne:singleProduct}}) I.E IN RELATED PRODUCT, SHOULD NOT SHOW ITSELF
  //{ne} = not equals to
  let product = await Product.find({
    category: singleProduct.category,
    _id: { $ne: singleProduct },
  }).populate("category", "category_name");
  //.populate('category','category_name') to show category and category name aswell
  if (!product) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send(product);
};

//TO FIND FILTERED PRODUCTS
exports.filterProduct = async (req, res) => {
  //THIS IS FOR DEFAULT
  //I.E BY DEFAULT, IN ASCENDING ORDER, BY ID AND SEND 20000 DATAS
  let order = req.query.order ? req.query.order : 1; //i.e sort in ascending order, we have order as 1 = ascending, -1 as descending
  //ascending means oldest first, descending means newest first
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id"; //i.e sort by id, we have sortBy id, price, best match, etc
  //THE SORD AND ORDER HERE IS DONE IN BACK END, AND ONLY THEN THE 20000 DATAS ARE PASSED TO FRONT END.
  //THE SORT AND ORDER CAN BE DONE IN FRONT END AFTER PASSING THE DATA TO FRONT END ASWELL.

  let limit = req.query.limit ? parseInt(req.query.limit) : "20000"; //i.e PASS HOW MANY DATA TO FRONT END, AND THEN FRONT END WILL DISPLAY BASED ON ITS OWN LIMIT
  //IF WE HAVE LIMIT, SAY LIMIT = 8, SEND 8 OR ELSE, SEND 20000
  //PARSEINT AS OUR 20000 MIGHT BE SENT AS A STRING, PARSEINT PREVENTS THIS AS IT DECLARES THIS IS NUMBER
  //HERE, it will pass 20000 data to front end and frontend will choose how much to display

  let skip = req.body.skip; //Skip is for Load More //In limit = how many items, Skip = load more
  //In Load More, Skip Old VALUES

  //To get filter
  let Args = {};
  for (let key in req.body.filters) {
    //req.body.filters.foreach(key=>{
    //cannot do foreach here,
    //for each can only be done if it has same filed say array
    //({}{})
    //but in case like we are using here, i.e category[] and price[] where category has different value and property and price has different value and property
    //we have to use for in
    if (req.body.filters[key].length > 0) {
      //Only if this is >0, it will run
      //THIS WILL AVOID THE EMPTY SCENARIO OF THE FOLLOWING
      //This will make sure that category[], product[0,999] will run as separate
      //i.e, it will not find the one whose price is 0-999 along with category empty but take both values as separate
      //IN CASE IT HAS CATEGORY ASWELL, IT WILL SEARCH AS
      //ONE WHICH HAS category[mobile] and price[0-999] and taking which matches this condition
      if (key == "product_price") {
        //this product_price should match the front end aswell as if not, it will show error
        //For Price, done in deals.js in RADIO
        Args[key] = {
          $gte: req.body.filters[key][0], //$gte = greater than
          $lte: req.body.filters[key][1], //$lte = less than
        };
      } else {
        //for category
        Args[key] = req.body.filters[key];
      }
    }
  }

  let filterProduct = await Product.find(Args)
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .skip(skip);

  if (!filterProduct) {
    return res.status(400).json({ error: "something went wrong" });
  } else {
    res.json({
      size: filterProduct.length, //Sending its calculated size here so it'll be easier in frontend
      filterProduct,
    });
  }
};
