const express = require("express");
//Now calling respective functions FROM ORDER CONTROLLER
const {
  placeOrder,
  orderList,
  orderDetail,
  userOrder,
  updateOrder,
  deleteOrder,
} = require("../Controller/orderController");
const { requireSignin } = require("../Controller/userController"); //To Import Function requireSignIn from userController.js FOR AUTHORIZATION
const router = express.Router();

//FOR POSTORDER
router.post("/postorder", requireSignin, placeOrder); //Require Sign In Requires POST method and in Fron End, we need to Pass Authorization: Bearer tokek

//FOR ORDER LIST
router.get("/orderlist", orderList);

//FOR ORDER DETAILS
router.post("/orderdetail/:orderid", orderDetail);
module.exports = router;

//For User ORDER
router.post("/userorder/:userid", userOrder);

//FOR UPDATE ORDER
router.put("/updateorder/:orderid", updateOrder); //PUT AS IT NEEDS STATUS INPUT ASWELL

//FOR DELETE ORDER
router.delete("/deleteorder/:orderid", deleteOrder); //PUT AS IT NEEDS STATUS INPUT ASWELL
