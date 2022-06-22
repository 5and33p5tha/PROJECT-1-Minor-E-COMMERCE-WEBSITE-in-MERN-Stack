//To get order from reducer, we Need UseSelector
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { orderDetails } from "../Reducer/orderActions";

const OrderDetails = () => {
  const params = useParams();
  const orderId = params.order_id;
  const { order, error } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderDetails(orderId));
    console.log("order", order);
  }, [params]);

  return (
    <>
      {order && ( //As Order Comes From Backend. It will take some time. Normally This Will be solved via Async-Await in OrderAction.js But as It Does not as in this case, we use this line.
        //The Above Line Signifies If There is order then display the codes, else do not display
        <>
          <h4>Order Details</h4>
          <hr />
          <h5>No. of Items: {order.OrderItems.length}</h5>
          <h5>Order Items:</h5>
          {order.OrderItems.map((item, i) => {
            return (
              <>
                <img
                  src={`http://localhost:8000/${item.product.product_image}`}
                  height="150px"
                  key={item.product.product_id}
                />
                <h6>
                  {item.product.product_name}-{item.quantity}
                </h6>
              </>
            );
          })}

          <h6>Total Price: {order.totalPrice}</h6>
          <h6>Status : {order.status}</h6>
        </>
      )}
    </>
  );
};

export default OrderDetails;
