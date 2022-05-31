import React from "react";
import "./products.css";

const Products = () => {
  return (
    <>
      <center>
        <div className="row row-cols-1 row-cols-md-4 mt-5 g-4 product_container">
          {/* <div className="row row-cols-1 row-cols-md-4  product_container mt-5 w-75 g-4 mx-auto"> HERE, W-75 IS WIDTH IS 75%, W HAS VALUE IN TABLE OF 25 I.E, AFTER W-75, WE HAVE W=100 */}

          {/* HERE, CROW-COL-MD-4 TO DISPLAY 4 COLS IN 1 ROW, W75=WIDTH = 75 PERCENT AND MX AUTO = LEFT,RIGHT MARGIN AS AUTO WHICH KEEPS WHOLE DIV IN CENTER */}

          {/* COMMENTED TO MAKE IT DYNAMIC , will do this in cards*/}
          {/* <div className="col">
            <div className="card shadow-lg">
              <div className="card-image px-3">
                <img
                  src="https://photos5.appleinsider.com/price_guide/11-inch-ipad-pro-2020-pp-header.png"
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title">Card title</h5>
                  <button className="btn btn-info">View Details</button>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col">
            <div className="card shadow-lg">
              {/* SHADOW-LG PUTS SHADOW AROUND CARD. WE CAN ALSO DO THIS IN COL INSTEAD OF CARD BUT THEN THE SHADOWS WILL COME A BIT OUTSIDE */}
              {/*Like this:- <div className="col shadow-lg"> */}

              <div className="card-image">
                <img
                  src="https://static.toiimg.com/thumb/msid-83628308,width-1200,height-900,resizemode-4/.jpg"
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title">Card title</h5>
                  <button className="btn btn-info">View Details</button>
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-lg">
              <div className="card-image">
                <img
                  src="https://fdn.gsmarena.com/imgroot/news/21/09/surface-duo-2/-1200/gsmarena_001.jpg"
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title">Card title</h5>
                  <button className="btn btn-info">View Details</button>
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-lg">
              <div className="card-image">
                <img
                  src="https://www.gizmochina.com/wp-content/uploads/2019/02/Huawei-Mate-X-1-600x600.jpg"
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title">Card title</h5>
                  <button className="btn btn-info">View Details</button>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </center>
    </>
  );
};

export default Products;
