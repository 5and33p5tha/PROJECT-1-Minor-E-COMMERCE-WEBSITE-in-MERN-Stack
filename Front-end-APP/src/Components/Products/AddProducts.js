import React, { useState, useEffect, useRef } from "react";
// import Navbar from "../Navbar";
// import Footer from "../Footer";
import AdminSidebar from "../AdminSidebar";
import { getAllCategories } from "../Category/CategoryAPI";
import { addProduct } from "./ProductAPI";

const AddProducts = () => {
  //useRef shows references. THIS HELPS TO SET REFERENCE OF ANYTHING
  //FOR EG:- IMAGE PATH REFERENCE AS NULL WILL ALLOW US TO EMPTY THE VALUE OF IT AS WE CANNOT DO THIS DIRECTLY IF IT IS NOT FIELD
  const file_reference = useRef();
  const select_reference = useRef();
  const [categories, setCategories] = useState([]); // ALTHOUGH CATEGORY IS DIFFERENT FROM PRODUCT, WE DO THIS SO AS WE ONLY NEED CATEGORY ID AND NOT ALL
  //useState([]) as we have to show in array
  //  IF useState("") was used then it signifies we have to show in String

  const [product, setProduct] = useState({
    //Product is Already Object and We Have TO GET ALL THE  OR RATHER FILL ALL THAT IS IN PRODUCT
    //UseState for Object
    category: "",
    product_name: "",
    product_description: "",
    product_price: "",
    product_image: "",
    Count_In_Stock: "",
    formData: "", //since image is in file, we use form data. NOTE, ALL OTHER ARE IN TEXT BUT IMAGE IS IN FILE.
  });

  //De-Structuring
  //can be done in any order
  const {
    product_name,
    product_price,
    product_description,
    product_image,
    Count_In_Stock,
    category,
    formData,
  } = product;

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          //If there is error in loading category, this should not be displayed to user.
        } else {
          setCategories(data);
          //   console.log(data);
          setProduct({ ...product, formData: new FormData() }); //Initializing Form Data
        }
      })
      .catch((err) => console.log(err));
  }, [success]);

  //Commented for better way TO MAKE COMMON HANDLE CHANGE FOR ALL EXCEPT IMAGE
  // const handleChange = (name) => (event) => {
  // event.preventDefault()
  //   setProduct({ ...product, [name]: event.target.value });
  // console.log(product)
  // };

  //BETTER METHOD:-
  const handleChange = (name) => (event) => {
    // event.preventDefault()

    if (name === "product_image") {
      //This Will Choose Only One File i.e FIRST/Initial File EVEN IF MULTIPLE FILES ARE CHOOSEN
      setProduct({ ...product, [name]: event.target.files[0] }); //FOR DISPLAYING
      //[name] to compare similar files
      //[product_image] => send FILE
      // console.log(product)
      formData.set(name, event.target.files[0]); //TO SEND FORM DATA FROM CLICK SUMBIT FOR BACKEND STORAGE
    } else {
      setProduct({ ...product, [name]: event.target.value });
      //set VALUES EXCEPT PRODUCT_IMAGE
      // console.log(product)
      formData.set(name, event.target.value);
    }
    //console.log(product)
  };

  const clickSubmit = (event) => {
    setError("");
    setSuccess(false);
    event.preventDefault();
    // console.log(formData)
    // addProduct(product) //(product) is the usestate product
    addProduct(formData) //Passing Form Data
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setProduct({
            product_name: "",
            product_price: "",
            product_description: "",
            product_image: "",
            Count_In_Stock: "",
            category: "",
          });
          file_reference.current.value = "";
          select_reference.current.value = "";
          setSuccess(true);
          setError("");
        }
      })
      .catch((err) => console.log(err));
  };

  // to show error
  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  };

  // to show success
  const showSuccess = () => {
    if (success) {
      // return <div className='alert alert-success'>{success}.</div>

      //since no success is passed
      return (
        <div className="alert alert-success">
          New Product added successfully.
        </div>
      );
    }
  };

  return (
    <>
      {/* <Navbar /> */}

      <div className="container-fluid custom-row">
        <div className="row ">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h3 className="my-3 text-center">Add Product</h3>
            <hr />
            {/* //hr gives a horizontal line */}

            {showError()}
            {showSuccess()}

            <div className="container p-5">
              <label htmlFor="product_name"> Product Name:</label>
              {/* Try to make label for and id of input same */}
              <input
                className="form-control mb-2"
                type={"text"}
                id="product_name"
                onChange={handleChange("product_name")}
                //Call handle change function everytime there is chang in handle change
                value={product_name} //to display value that is in the field
              />
              <label htmlFor="product_price"> Product Price:</label>
              <input
                className="form-control mb-2"
                type={"number"}
                id="product_price"
                onChange={handleChange("product_price")}
                //Call handle change function everytime there is chang in handle change
                value={product_price} //to display value that is in the field
              />
              <label htmlFor="product_description"> Product Decription:</label>
              <textarea
                rows={7}
                // Since textarea is used, no need to use type
                className="form-control mb-2"
                id="product_description"
                onChange={handleChange("product_description")}
                //Call handle change function everytime there is chang in handle change
                value={product_description} //to display value that is in the field
              />
              <label htmlFor="Count_In_Stock"> Stock Count:</label>
              <input
                className="form-control mb-2"
                type={"number"}
                id="Count_In_Stock"
                onChange={handleChange("Count_In_Stock")}
                //Call handle change function everytime there is chang in handle change
                value={Count_In_Stock} //to display value that is in the field
              />
              <label htmlFor="category"> Belonging Category:</label>
              <select
                id="category"
                className="form-control mb-2"
                ref={select_reference}
                onChange={handleChange("category")}
                //Call handle change function everytime there is chang in handle change
              >
                {/* select is dropdown */}
                <option>Choose Category</option>

                {
                  categories.map((category) => (
                    //Normally we do:-  categories.map((category, i) => ( where I IS KEY
                    // THIS KEY IS TO BE SET IN KEY BELOW
                    <option key={category._id} value={category._id}>
                      {category.category_name}
                    </option>
                    //NO NEED TO DEFINE KEY ABOVE AS CATEGORY._ID IS AUTO GENERATED BY CATEGORY
                  ))
                  //i.e map category which has category id, category name etc and PUT THEM IN ARRAY
                  //from there, only show category name
                  //show those category_name as option and display those mapped array
                }
              </select>

              <label htmlFor="product_image">Product Image</label>
              <input
                type={"file"}
                id="product_image"
                accept="image/*" //To only accept image
                ref={file_reference}
                className="form-control mb-2"
                // Will Work If We Use Separate Handle Change For Image Only Beside Above
                // onChange={(event) => {
                //   setProduct({
                //     ...product,
                //     product_image: event.target.files[0],
                //   });
                // }}

                //Since All Handle Changes Are Defined Above, we do
                onChange={handleChange("product_image")}
              ></input>

              <button
                className="btn btn-warning form-control"
                onClick={clickSubmit}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default AddProducts;
