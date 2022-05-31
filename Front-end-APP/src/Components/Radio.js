//Radio will have prices from PRICE.JS
//Radio.js is a function
import React from "react";
import { prices } from "./Price";

const Radio = ({ passing_handleFilters }) => {
  const handleChange = (e) => {
    passing_handleFilters(e.target.value, "product_price");
  };
  return (
    <>
      {prices.map((price) => {
        //THAT MEANS GET ALL FROM PRICE.JS ONE AT A
        //FOR EXAMPLE:-
        // {
        //     _id: 0,
        //     name: "ALL", //NAME IS PRICE HERE I.E NAME OF PRICE i.e show of all price. THIS IS JUST NAMES FOR DISPLAY
        //     value: [], //i.e show all values
        //   },
        //SO
        //VALUE WILL HAVE value: []
        //NAME WILL HAVE IN LABEL
        //._ID WILL HAVE IN _id: 0
        // Copying radio from bootstrap
        return (
          <div className="form-check" key={price._id}>
            <input
              className="form-check-input mt-1 me-2"
              type="radio"
              value={price._id} //AS COMPARING WITH INDEX. COMPARING HANDLE PRICE WITH ARRAY AND THEN CALLING, SO ID
              onChange={(e) => {
                handleChange(e);
              }}
              // onChange={handleChange} WE CAN ALSO DO LIKE THIS
              id={price._id}
              name="price"
            />
            {/* name can be anything, it just given as it will make only one selectable JUST LIKE IN GENDER*/}
            <label htmlFor={price._id} className="form-check-label">
              {price.name}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default Radio;
