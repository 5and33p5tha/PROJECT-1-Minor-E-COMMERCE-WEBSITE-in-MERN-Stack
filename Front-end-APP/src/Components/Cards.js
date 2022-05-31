import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ props }) => {
  //{products} as to take it as an  object
  return (
    <>
      {/* {console.log(props)} JUST TO CHECK */}
      <div className="col">
        <div className="card shadow-lg mb-5">
          <div className="card-image px-3">
            <img
              src={`http://localhost:8000/${props.product_image}`}
              className="card-img-top"
              alt="..."
            />
          </div>
          <div className="card-body">
            <div className="text-center">
              <h5 className="card-title text-truncate">{props.product_name}</h5>
              <h5 className="card-title">Rs.{props.product_price}</h5>
              <p
                className="card-title text-truncate"
                style={{ height: "30px" }}
              >
                {props.product_description}
              </p>

              <Link to={`/product/details/${props._id}`}>
                <button className="btn btn-info">View Details</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
