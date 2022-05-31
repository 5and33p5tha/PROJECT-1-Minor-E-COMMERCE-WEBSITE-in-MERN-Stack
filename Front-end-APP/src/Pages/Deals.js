import React, { useState, useEffect } from "react";
import Categories from "../Components/Categories";
// import Products_In_User_Page from "../Components/Products/Products_In_User_Page";
import { prices } from "../Components/Price";
import Radio from "../Components/Radio";
import { getFilteredProducts } from "../Components/Products/ProductAPI";
import DisplayProduct from "../Components/DisplayProduct";

const Deals = () => {
  // const [sortBy, setSortBy] = useState("product_name");
  const [sortBy, setSortBy] = useState("CreatedAt");
  const [order, setOrder] = useState(-1);
  const [limit, setLimit] = useState(8);
  const [skip, setSkip] = useState(0);
  const [filteredResult, setFilteredResult] = useState([]);
  const [size, setSize] = useState(0);

  const [myfilters, setMyfilters] = useState({
    filters: { category: [], product_price: [] },
    //that means, in useState is Object filter which contains category in array and price in array
  });

  //const loadFIlteredResults = () => {}

  useEffect(() => {
    getFilteredProducts(sortBy, order, limit, skip, myfilters)
      //CALLING FUNCTION FROM PRODUCT API
      //NOTE, WHILE CALLING THIS FUNCTION IN DEALS.JS, IT SHOULD BE IN SAME ORDER OF OCCURENCE
      //I.E 1.SORTBY, 2.ORDER, 3.LIMIT, 4.SKIP AS WE HAVE DEFINED IN PRODUCTAPI
      //{filters} is left out HERE BUT IS IN PRODUCTAPI
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          // console.log(data);
          setFilteredResult(data.filterProduct); //to get filtered Product which was kept in data
          setSize(data.size); //easily done due to size defined in backend in ProductConteroller
          setSkip(0);
          // console.log(data)
        }
      })
      .catch((err) => console.log(err));
  }, [myfilters]);

  const handlePrice = (index) => {
    const data = prices;
    let result = []; //initializing

    //METHOD 1
    // for (let key in data) {
    //   if (data[key]._id == parseInt(index)) {
    //     result = data[key].value;
    //   }
    // }
    // return result;

    //OR EASIER METHOD
    // console.log(data,index)
    result = data.find((item) => item._id == index); //Doube == as It item._id is number and index is String
    // result = data.find(item => item.value == index); BUT IN RADIO, value={price._id}
    //data.filter= multiple array i.e ([][][][])
    //data.find = single array ([])
    //if filter gives [a], find will give a
    // console.log(result)
    return result.value;
  };

  const handleFilters = (filters, filterBy) => {
    //filterBy = Category or Price
    const newFilter = { ...myfilters }; //... = rest operator
    newFilter.filters[filterBy] = filters;

    //If we have price, we need to generate array i.e say we have price [0,100] then we have to generate the array from 0 to 100
    //SO
    if (filterBy === "product_price") {
      let priceValue = handlePrice(filters);
      newFilter.filters[filterBy] = priceValue;
    }

    //Explaination:-
    //THESE WILL WORD AS WE CLICK AND UN-CLICK

    //WHEN ONLY MOBILE IS SELECTED

    //filter:{category:[mobile], price:[10000, 99999]}
    //newFilter:{category: [mobile], price: [10000,99999]}

    //WHEN LAPTOP IS ALSO SELECTED

    //filters [category] : [mobile, laptop]
    //newFilter: { category:[mobile, laptop], price:[10000,99999]}

    // console.log(newFilter);
    setMyfilters(newFilter);

    //TELEVISION, MOBILE, LAPTOPS -> FILTERS
    //CATEGORY = FILTERBY
    //0-999 -> FILTERS
    //PRICE = FILTERBY
  };

  const loadmore = () => {
    let toskip = skip + limit;
    getFilteredProducts(sortBy, order, limit, toskip, myfilters) //skip replaced by toskip
      //say skip=0 and limit =4 //so toskip =4 i.e show four more
      // again toskip = 4 via SetSkip
      // again, toskip = 0 + 4  s0 toskip =4 i.e show 4 more
      // again, toskip = 4 viaSetSkip
      //CALLING FUNCTION FROM PRODUCT API
      //NOTE, WHILE CALLING THIS FUNCTION IN DEALS.JS, IT SHOULD BE IN SAME ORDER OF OCCURENCE
      //I.E 1.SORTBY, 2.ORDER, 3.LIMIT, 4.SKIP AS WE HAVE DEFINED IN PRODUCTAPI
      //{filters} is left out HERE BUT IS IN PRODUCTAPI
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          // console.log(data);
          setFilteredResult([...filteredResult, ...data.filterProduct]); //...filteredResult = show old filtered Result and data.filterProduct = will display new filtered data.
          //In array as CANNOT MAP WITHOUT ARRAY
          //if ...filteredResult is not done, EVERYTIME, ONLY NEW ONES WILL LOAD
          //also, we need ...data.filterProduct as if ... is not set, it will show error
          setSize(data.size); //easily done due to size defined in backend in ProductConteroller
          setSkip(toskip); //setSkip(0) = Skip nothing, setSkip(toskip) = skip values that are in toskip
          // console.log(data)
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            Categories
            <Categories
              passing_handleFilters={(filters) =>
                handleFilters(filters, "category")
              }
              //passing the function in Categories
            />
            Price
            <Radio
              passing_handleFilters={(filters) =>
                handleFilters(filters, "product_price")
              }
              //passing the function in Radio
            />
          </div>
          <div className="col-md-9">
            {/* KNOW DIFFERENCE BETWEEN ROWS-COLS-MD AND COL-MD */}
            {/* <Products_In_User_Page />REMOVED AS WE NOW WANT TO SHOW FILTERED PRODUCTS */}
            {/* INSTEAD WE ADD NEW COMPONENT */}
            {/* <Displayproducts products={filteredResult} />
             */}
            <DisplayProduct products={filteredResult} />
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-warning" onClick={loadmore}>
            Load More
          </button>
        </div>
      </div>
    </>
  );
};

export default Deals;
