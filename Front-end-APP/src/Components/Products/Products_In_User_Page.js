import React, { useState, useEffect } from "react";
import { getSortedProducts } from "./ProductAPI";
import Cards from "../Cards";

const Products_In_User_Page = () => {
  const [products, setProducts] = useState([]); //as data comes in array

  //TO MAKE IT DYNAMIC
  //DEFAULT VALUES:-
  const [sortBy, setSortBy] = useState("product_name");
  const [order, setOrder] = useState(-1);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    // getSortedProducts ('CreatedAt', '-1', '8') //from product api BUT THIS WILL MAKE IT STATIC i.e THIS CANNOT CHANGE
    //TO MAKE IT DYNAMIC
    getSortedProducts(sortBy, order, limit)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  }, [limit]);

  return (
    <>
      <div className="row row-cols-1 row-cols-md-4 mt-5 g-4 product_container mx-auto">
        {products.map((item, x) => (
          //Passing Value To Props
          <Cards props={item} key={x} />
        ))}
      </div>
      <div className="text-center">
        <div className="btn-group">
          <button className="btn btn-info" onClick={() => setLimit(limit + 4)}>
            Show More
          </button>

          {/* A PROBLEM ARISES IN SHOWLESS AS WHEN IT IS LESS THAN 4, WHEN CLICKED, IT WILL SHOW ALL PRODUCTS. AS ONCE IT IS LESS, THE CONDITION IS INVALID AND ALL WILL BE DISPLAYED.
          HENCE, TO OVERCOME THIS WE DO THE FOLLOWING, */}
          {limit > 4 && (
            //SHow Button ONLY IF LIMIT IS GREATER THAN 4
            <button
              className="btn btn-danger"
              onClick={() => setLimit(limit - 4)}
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Products_In_User_Page;
