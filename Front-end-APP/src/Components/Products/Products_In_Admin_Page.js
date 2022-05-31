import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { deleteProductFromFrontAPI, getallproducts } from "./ProductAPI";

const Products_In_Admin_Page = () => {
  const [products, setProducts] = useState([]); //As Product is an object

  // const [allproducts,setAllProducts] = useState([])// for getsortedproducts()

  //To SHOW LIMITED NUMBER OF TABLE FROM FRONT END
  const [limit, setLimit] = useState(4);

  //HOW USESTATE AND USEEFFECT IS WORKING IN THIS PAGE (ONLY THIS PAGE)
  //HERE, THE USEEFFECT WILL GET ALL THE DATAS INITIALLY AND THEN USESTATE WILL LOAD BASED ON LIMIT
  //I.E INITIALLY EVEN IF ALL ITEMS ARE LOADED, SHOW ONLY UPTO INITIAL LIMIT I.E 8
  //THEN AFTER CLICKING LIAD MORE, INCREASE LIMIT BY 8

  //NORMALLY, WE USE USE STATE TO REFRESH WHEN IT HITS AND USE EFFECT WILL DISPLAY THAT DATA,
  //HENCE NORMALLY, USESTATE AND THEN USE EFFECT
  //BUT IN THIS CASE, ITS USE EFFECT AND USE STATE

  useEffect(() => {
    getallproducts() //our function in PRODUCT-API
      //TO GRASP UNDERLYING CONCEPT ONLY TRY THIS
      //getSortedProducts(Count_In_Stock, 1, 4) where we can do CreatedAt, product_name, etc, 1 IS ASCENDING AND 4 IS LIMIT
      //THEN ADD THIS IN API:-
      //   export const getSortedProducts =(sortBy,order,limit) => {
      //     return fetch(`${API}/showProducts?sortBy=${sortBy}&order=${order}&limit=${limit}`,{
      //         method:"GET"
      //     })
      //     .then(res=>res.json())
      //     .catch(err=>console.log(err))
      // }
      .then((data) => {
        if (data.error) {
          // console.log(data.error)
        } else {
          setProducts(data);
          // console.log(data)
        }
      })
      .catch((error) => console.log(error));
  }, []);

  //JUST FOR CONCEPT
  //   getSortedProducts(sortBy,order)
  //   .then(data => {
  //       if (data.error) {
  //           console.log(data.error)
  //       }
  //       else {
  //           setAllProducts(data)
  //       }
  //   })
  //   .catch(error => console.log(error))

  // getSortedProducts(sortBy,order,limit)
  //   .then(data => {
  //       if (data.error) {
  //           console.log(data.error)
  //       }
  //       else {
  //           setProducts(data)
  //           console.log(data)
  //       }
  //   })
  //   .catch(error => console.log(error))
  // }, [sortBy,order,limit])

  //keep this in product api and REPLACE THE API FOR GET ALL PRODUCTS
  // export const getSortedProducts =(sortBy,order,limit) => {
  //   return fetch(`${API}/showProducts?sortBy=${sortBy}&order=${order}&limit=${limit}`,{
  //       method:"GET"
  //   })
  //   .then(res=>res.json())
  //   .catch(err=>console.log(err))
  // }

  //ALSO, REPLACE THE TERNARY OPERATOR BELOW
  // {
  //   limit < allproducts.length ?
  //   <td colSpan={5}><button className='btn btn-warning' onClick={()=>setLimit(limit+4)}>Load more</button></td>
  //    :
  //   <td colSpan={5}><h5>All Items Loaded</h5></td>

  // }

  return (
    <>
      {/* <Navbar /> */}

      <div className="container-fluid custom-row">
        <div className="row ">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h3 className="my-3 text-center">Products</h3>

            {/* TO SORT I.E GETSORTEDPRODUCTS() */}
            {/* <select onChange={(e)=>setSortBy(e.target.value)}>
                            <option value='product_name'>Name</option>
                            <option value='product_price'>Price</option>
                        </select>
                        <select onChange={e=>setOrder(e.target.value)}>
                            <option value='1'>Ascending</option>
                            <option value='-1'>Descending</option>
                        </select> */}
            <hr />
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Product Image</th>
                  <th>Product Details</th>
                  <th>Count in Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {products.map((item, i) => { NOTE:- THIS WILL DISOPLAY ENTIRE PRODUCT LIST */}
                {products.slice(0, limit).map((item, i) => {
                  //Initially, limit = 8
                  //SLICE WILL ENABLE TO LOAD ONLY 8 PORODUCTS AT ONCE
                  //mapping from model products
                  //mapping products to the tables i.e S.NO, Product Name, Description, etc
                  return (
                    <tr key={item._id}>
                      {/* key can be i also, but since item._id is also unique, we can give that.
                      The only criteria is that key has to be unique. */}

                      {/* For Serial No:-  */}
                      <td>{i + 1}</td>

                      {/* For Product Image:- */}
                      <td>
                        <img
                          src={`http://localhost:8000/${item.product_image}`}
                          alt={item.product_name}
                          style={{ height: "150px" }} //Inlune CSS
                        />
                      </td>

                      {/* For Product Name, Price and Description; ALL IN ONE:- */}
                      <td>
                        <h3>{item.product_name}</h3>
                        <h4>{item.product_price}</h4>
                        <p>{item.product_description}</p>
                      </td>

                      {/* For Count_In_Stock:- */}
                      <td>{item.Count_In_Stock}</td>
                      <td>
                        <button className="btn btn-warning">
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  {
                    //Ternary Operator:-
                    //If All Loaded, Show All Items Loaded
                    limit < products.length ? (
                      <td colSpan={5}>
                        <button
                          className="btn btn-info"
                          onClick={() => setLimit(limit + 4)}
                        >
                          Load More
                        </button>
                      </td>
                    ) : (
                      // {/* colSpan={5} will merge 5 cols together */}
                      // {/* after load more is clicked i.e onClick, it will add 4 more data in limit */}
                      <td colSpan={5}>ALL ITEMS LOADED</td>
                    )
                  }

                  {/* { FOR GETSORTEDPRODUCTS()
    limit < allproducts.length ?
    <td colSpan={5}><button className='btn btn-warning' onClick={()=>setLimit(limit+4)}>Load more</button></td>
     :
    <td colSpan={5}><h5>All Items Loaded</h5></td>
    
}  */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Products_In_Admin_Page;
