import React from "react";
import { Link } from "react-router-dom";
import "./carousel.css";

const Carousel = () => {
  return (
    <>
      <div className="container-fluid carousel_container mx-auto">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              {/* <img src="./Images/Image1.jpeg" className="d-block w-100" alt="..." /> */}
              <center>
                {/* BETTER TO USE D-BLOCK AND MX-AUTO IN IMAGE */}
                <img
                  src="http://techlekh.com/wp-content/uploads/2021/10/Apple_MacBook-Pro_16-inch-Final-Cut-Pro_10182021.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </center>
            </div>
            <div className="carousel-item">
              <img
                src="https://m.media-amazon.com/images/I/61peFqUBjBL._AC_SL1500_.jpg"
                className="d-block w-100 mx-auto"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://i.dell.com/is/image/DellContent//content/dam/global-site-design/product_images/dell_client_products/notebooks/xps_notebooks/xps_13_9310_2n1/media-gallery/black/laptop-xps-13-2-in-1-centenario-tgl-9310-hi-res-imagery-notebook-xps-13-9310-lf-4000x4000-v1.psd?fmt=pjpg&pscan=auto&scl=1&wid=3700&hei=2349&qlt=100,0&resMode=sharp2&size=3700,2349"
                className="d-block w-100 mx-auto"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            {/* 
<span>: The Content Span element

The <span> HTML element is a generic inline container for phrasing content, which does not inherently represent anything. It can be used to group elements for styling purposes (using the class or id attributes), or because they share attribute values, such as lang . */}

            {/* 
The Bootstrap "span" classes are used in the bootstrap grid system. The documentation shows columns labelled with numbers, each number represents the span class used for this container. Offset are shown right in the next section, they define how many empty columns should be to the left of the span. */}

            <span
              className="carousel-control-prev-icon bg-secondary rounded-circle"
              aria-hidden="true"
            ></span>
            {/* THIS IS FOR ACTUAL CAROUSEL BUTTON */}

            <span className="visually-hidden">Previous</span>
            {/* This above line is to make a whole area clickable. IN CAROUSEL, EVEN IF WE CLICK ON SOME SURROUNDING NEAR THE BUTTONS NEXT OR PREVIOUS, IT WILL Work
    IT IS DUE TO THIS AND THIS STAYS HIDDEN */}
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-secondary rounded-circle"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
