import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { getRelatedProducts } from "./Products/ProductAPI";
import { useParams } from "react-router-dom";

const RelatedProducts = () => {
  const [relatedproducts, setRelatedproducts] = useState([]);
  // console.log(id)

  //To Show Limited Related Product
  const [limit, setLimit] = useState(4); //i.e Initially display only 4 items

  const params = useParams();
  const id = params.id;
  useEffect(() => {
    getRelatedProducts(id)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setRelatedproducts(data);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  //The Above COdes are to load

  //the following codes are to display
  return (
    <>
      <div className="container mx-auto p-5 my-5">
        {/* Mapping as in Products in user page */}
        <div className="row row-cols-1 row-cols-md-4 mt-5 g-4 mx-auto">
          {/* {relatedproducts.map((item) => ( */}
          {/* TO DISPLAY WITH LIMIT AND SETLIMIT IN PLACE */}
          {relatedproducts.slice(0, limit).map((item, m) => (
            //Passing Value To Props
            <Cards props={item} key={m} />
          ))}
        </div>
        {limit < relatedproducts.length && (
          //Ternary ooperator signifies only display if conditions match,
          //here, condition is that if limit is <related products
          <button
            className="btn btn-warning"
            onClick={() => {
              setLimit(limit + 4);
            }}
          >
            Show More
          </button>
        )}
      </div>
    </>
  );
};

export default RelatedProducts;
