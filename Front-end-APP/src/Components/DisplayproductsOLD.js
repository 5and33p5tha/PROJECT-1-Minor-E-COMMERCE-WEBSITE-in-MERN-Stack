// import React, { useState } from "react";
// import Cards from "./Cards";

// const Displayproducts = ({ products }) => {
//If WE DO NOT DEFINE IT AS AN OBJECT, WE SHOULD DO product.product in map
// console.log(products)
//Can Also DO:- const Displayproducts = ({filteredResult}) => {
//BUT We have to change the map to:-
// {filteredResult.map((item, q) => (
//   const [limit, setLimit] = useState(8);
//   return (
//     <>
//       <div className="row row-cols-1 row-cols-md-4 mt-5 g-4 product_container mx-auto">
//         {products.map((item) => (
//Passing Value To Props
//           <Cards props={item} key={item._id} />
//         ))}
//       </div>
//       <div className="text-center">
//         <div className="btn-group">
//           <button className="btn btn-info" onClick={() => setLimit(limit + 4)}>
//             Show More
//           </button>
//           <button
//             className="btn btn-danger"
//             onClick={() => setLimit(limit - 4)}
//           >
//             Show Less
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Displayproducts;
