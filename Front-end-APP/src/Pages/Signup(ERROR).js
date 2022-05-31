import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import "./signup.css";
// import { Formik, ErrorMessage, Field, Form } from "formik";
import { Formik, ErrorMessage, Form } from "formik";
//Here, Form is the form of FORMIK, so insted of <form>, better to use <Form>
//While using <Form> of formik, change Field to Field
import * as Yup from "yup";

//To Import Signup from Components->Auth
// import {signupforbackend} from "../Components/Auth/index.js"
// OR:-

//To Import Signup from Components->Auth
import { signupforbackend } from "../Components/Auth";

// For Error Message Link, = Formik, This is mostly used just for forms and Put just above where form begins
// For Validation, = Yup
// Note:- Internal CSS IS NOT ALLOWED IN REACT

//Documentation:-https://formik.org/docs/overview

// Formik and Yup enables us to validate the form in REACT.JS

const Signup = () => {
  const [values, setValues] = useState({
    //SINCE IN FORM, NEW VALUE SHOULD BE UPDATED EVERYTIME
    //IN LAMEN TERMS, STATE = VALUES

    //TO STORE VALUES FOR SENDING IN ADD USER
    //first_name cannot be sent directly, initially it should have value say SANDEEP
    //HERE, USESTATE HELPS IN SAVING SANDEEP AS VALUE FOR first_name and SEND IT IN FORM TO SAVE
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  // DE-STRUCTURING
  //if not done, we have to write
  //values.first_name
  //values.last_name, etc
  //so DE-STRUCTURING IS DONE SO WE CAN DIRECTLY WRITE first_name, last_name etc
  const {
    first_name,
    last_name,
    date_of_birth,
    gender,
    email,
    password,
    error,
    success,
  } = values;

  //HANDLECHANGE
  //handlechange function is used to store values in use state

  const handleChange = (name) => (event) => {
    //NAME = ANY FIELD LIKE FIRST_NAME NAME AND (EVENT) = THAT PARTICULAR FIELD
    setValues({ ...values, error: false, [name]: event.target.value });

    //To Show Error In Console
    console.log(name); //To Check Field
    console.log(event.target.value); //To Check Values

    //the value of that (EVENT) event.target.value
    //SAY IF WE HAVE FIRST_NAME THAT THAT FIELD OF FIRST NAME
    //...values as WE ONLY NEED TO CHANGE WHAT WE CHOOSE, THE OTHER VALUES SHOULD HOLD THEIR PREVIOUS VALUES
    // error:false as WE CURRENTLY HAVE SET THE VALUES TO FALSE

    //HANDLE CHANGE IN BELOW:-
    //EX: onchange={handleChange('first_name')} value={first_name}
    // HERE THE FirstName Should Be CHANGED AND
  };

  //To Stop Default Action Of Buttons
  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "false" });
    //HERE ... = rest operator
    signupforbackend(values)
      .then((data) => {
        if (data.error) {
          //DATABASE ENTRY ERROR SAY EMAIL ALREADY EXISTS, ETC

          //For Error Checking only:-
          // console.log(data.error)
          setValues({ ...values, error: data.error, success: false });
          //i.e KEEP PREVIOUS VALUES, PUT DATA.ERROR IN ERROR AND SHOW SUCCESS AS FALSE
        } else {
          //IF NO DATA ERROR I.E SUCCESSFUL
          setValues({
            ...values,
            first_name: "",
            last_name: "",
            date_of_birth: "",
            gender: "",
            email: "",
            password: "",
            success: true,
          }); //AS CONFIRM PASSWORD IS NOT USED IN BACKEND, NO NEED TO DO FO CONFIRM PASSWORD
        }
      })
      //Now IF ERROR IN CONNECTING TO DATABASE
      .catch((error) => console.log(error));
  };

  //NOW TO SHOW ERROR
  const showError = () => {
    // <div className="alert alert-danger" style={{display:error? "":"none"}}>
    // {
    /* {display:error? "":"none"} using ternary operator */
    // }
    // {
    /* INITIALLY, THE DISPLAY OF DIVISION IS BLOCK , THIS WILL FORCE THE DISPLAY TO SHOW ERROR */
    // }
    // {
    /* DISPLAY:BLOCK
    DISPLAY:ERROR?"BLOCK":"NONE" I.E TERNARY OPERATOR
    "":"NONE", THE INITIAL OF'"":NONE' I.E  "" MEANS NO CHANGE
    ERROR? IF THERE IS ERROR;
    IF CONDITION IS TRUE: DISPLAY BLOCK
    IF CONDITION IS TRUE: DISPLAY NONE THAT IS HIDE ENTIRE BLOCK */
    // }
    // </div>

    // OR TO UNDERSTAND BETTER
    if (error) {
      //IF ERROR OCCURS
      // console.log(error)
      return <div className="alert alert-danger">{error}</div>; //alert alert-danger is from bootstrap
      //error = error from the following
      // if (data.error) {
      //DATABASE ENTRY ERROR SAY EMAIL ALREADY EXISTS, ETC
      // setValues({ ...values, error: data.error, success: false });
      //MORE SPECIFICALLY, ERROR FROM error: data.error

      //THE FOLLOWING CODE TO DISPLAY ERROR CAN BE COMMENTED ASWELL
      // } else {
      //IF NOW ERROR
      // return (
      // <div className="alert alert-danger" style={{ display: "none" }}></div>
      // );
      //no error = show nothing
    }
  };

  // NOW TO SHOW THAT ERROR
  // to show success/ user is added
  const showSuccess = () => {
    //If SUCCESSFUL
    if (success) {
      //DEPENDS ON SUCCESS: TRUE, WE HAVE SET SUCCESS AS TRUE OR FALSE IN ABOVE IN USE-STATE

      <div className="alert alert-success">
        New user added. Please verify your account.
      </div>;
    } else {
      //IF NOT SUCCESSFUL
      return;
    }
  };

  return (
    <>
      {/* <div className='container-sm'> THIS WILL CREATE SMALL CONTAINER(NOT CONTAINER IN SMALL SCREEN BUT SMAL CONTAINER) */}
      {/* CHECK BOOTSTRAP DOCUMENTS FOR MORE DETAILS
            BOOTSTRAP DOCUMENTATION:- https://getbootstrap.com/docs/5.1/layout/containers/ */}

      {/* 
            HERE FORM FLOATING FLOATS THE GIVEN LABEL TO SHIFT IT UPWARDS.

            FORM CONTROL DOES NOT LET THE BOX TO BE PRESSED IN OR OUT I.E IT DEFINES A FIXED REQUIRED SPACE. IT IS LIKE BOX-SIZING:BORDER BOX IN CSS, IT PUTS EVERYTHING IN ORDER */}

      {/* FORM CHECK BINDS BOTH LABEL AND Field BUTTON IN SAME. I.E NO NEED TO CLICK SPECIFICALLY ON BUTTON, WILL ASLO WORK WHEN CLICKED ON THE Field TYPE name */}

      <Navbar />

      {showError()}
      {showSuccess()}

      {/* <h1>HELLO, THIS IS LOGIN PAGE</h1> */}

      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          cpassword: "",
          // These are all new defined terms for formik which is not in our form
        }}
        //VALIDATION Via FORMIK & YUP
        validationSchema={Yup.object({
          first_name: Yup.string()
            //This first_name is from Formik and Yup.Object is an object used in Formik
            // This signifies that the first_name must be a string

            .required("First Name is REQUIRED")
            // This signifies that the first_name is required

            .min(2, "First Name Must Be Atleast 2 Characters Long")
            // This signifies that the first_name Should be atleast 2 characters long

            .max(30, "First Name Must Be Less or Equal To 30 Characters Long"),
          // This signifies that the first_name Should Less or Equal To 30 Characters Long

          last_name: Yup.string()
            .required("Last Name is REQUIRED")
            .min(2, "Last Name Must Be Atleast 2 Characters Long")
            .max(30, "Last Name Must Be Less or Equal To 30 Characters Long"),

          email: Yup.string()
            .required("email is required")
            .min(10, "Email must be atleast 10 characters long")
            .max(40, " Email must be no more than 40 characters")
            .email("Email format is invalid"),

          password: Yup.string()
            .required("Password is required")
            .matches(
              /(?=.*[a-zA-Z])(?=.*\d)(?=.*[@!_#$%^&*_-])/,
              "The Password must contail atleast a lower case and upper case letter wih atleast a number and a special character"
            )
            // TRY TO GIVE IT IN SAME ORDER OR ELSE THIS MAY NOT WORK SOMETIMES
            .min(10, "Password must be atleast 10 characters long")
            .max(40, " Password must be no more than 40 characters"),

          cpassword: Yup.string()
            .required("Password is required")
            .oneOf([Yup.ref("password")], "Passwords does not match"),
          //This is to match the values in Formik, IT CHECKS THE YUP REFERENCE AND SEES IF THEY MATCH</>
        })}
      >
        {/* The label for  and id of the form should be same, THIS WILL CREATE AN EFFECT WHEN CLICKED, THE Field WILL GO IN THE BOX */}

        <div className="container w-50 mx-auto mt-5">
          <main className="form-signin">
            {/* <Form>  //THIS Form is of formik and Yup. //WE HAVE COMMENTED */}
            {/* IT HERE AS IT'S HANDLE CHANGE IS COLLIDING WITH OUR DEFINED  I.E WE are unable to put value in database*/}
            {/* HANDLECHANGE */}
            <form>
              {/* REPLACED Form With small f */}
              {/* This is the formik's Form. the small f <form> </form> is of HTML */}
              <div className="text-center">
                <img
                  className="mb-4"
                  src="./logo192.png"
                  alt=""
                  width="72"
                  height="57"
                />
                <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
              </div>
              <div className="form-floating">
                {/* <Field */}
                <input
                  // AS FORMIK'S FORM IS COMMENTED, FIELD SHOWS ERROR SO USE INPUT INSTEAD OF FIELD
                  type="text"
                  className="form-control"
                  id="floatingfirstname"
                  placeholder="firstname"
                  // name="first_name"
                  //THE FOLLOWING ONCHANGE HAS COLLIDED WITH FORMIK`S OWN HANDLECHANGE. HENCE WE HAVE COMMENTED Form AND REPLACED IT WITH form
                  onChange={handleChange("first_name")}
                  value={first_name}
                  //HERE, {handleChange('first_name')} IS THE FIELD AND value={first_name} IS THE VALUE OF USE STATE AS DEFINED ABOVE
                />

                {/* The name is for the whole text-box.
                                For Example:- First Name:=Sandeep
                                Then The first_name gets the value Sandeep.
                                In Short, name is where the value is put. */}

                {/* HERE, THE name="first_name" is from Formik */}
                {/* Instead of <Input type> </Input> We Use <Field type></Field> in FORMIK */}

                {/* SINCE FORM CONTROL PUTS THE LABEL IN PLACE OF PLACEHOLDER I.E INSIDE THE BOX, THE PLACEHOLDER WILL NOT WORK HERE */}

                <label htmlFor="floatingField">Enter First Name Here</label>
                <ErrorMessage name="first_name">
                  {(msg) => <div style={{ color: "maroon" }}>{msg}</div>}
                  {/* Here, Error Message will be displayed in name="first_name" */}
                </ErrorMessage>
              </div>
              <div className="form-floating">
                {/* <Field */}
                <input
                  // AS FORMIK'S FORM IS COMMENTED, FIELD SHOWS ERROR SO USE INPUT INSTEAD OF FIELD

                  type="text"
                  className="form-control"
                  id="floatinglastname"
                  placeholder="lastname"
                  // name="last_name"
                  onChange={handleChange("last_name")}
                  value={last_name}
                />
                {/* HERE, THE name="last_name"is from Formik */}

                {/* SINCE FORM CONTROL PUTS THE LABEL IN PLACE OF PLACEHOLDER I.E INSIDE THE BOX, THE PLACEHOLDER WILL NOT WORK HERE */}

                <label htmlFor="floatingField">Enter Last Name Here</label>
                <ErrorMessage name="last_name">
                  {(msg) => <div style={{ color: "maroon" }}>{msg}</div>}
                  {/* Here, Error Message will be displayed in name="first_name" */}
                </ErrorMessage>
              </div>
              <div className="form-floating">
                {/* <Field */}
                <input
                  // AS FORMIK'S FORM IS COMMENTED, FIELD SHOWS ERROR SO USE INPUT INSTEAD OF FIELD

                  type="date"
                  className="form-control"
                  id="floatingdate"
                  placeholder="dd/mm/yy"
                  onChange={handleChange("date_of_birth")}
                  value={date_of_birth}
                />

                {/* SINCE FORM CONTROL PUTS THE LABEL IN PLACE OF PLACEHOLDER I.E INSIDE THE BOX, THE PLACEHOLDER WILL NOT WORK HERE */}

                <label htmlFor="floatingField">Select Your Date Of Birth</label>
              </div>
              <div className="form-control mb-1">
                <label className="form-floating">
                  {" "}
                  Gender:
                  <div className="d-flex">
                    {/* HERE, DISPLAY FLEX IS DONE HERE SO THAT THE ONLY THE BELOW OPTIONS ARE DISPLAYED AS FLEX AND NOT THE LABEL "GENDER" ITSELF */}

                    <div className="form-check ms-5">
                      {/* <Field */}
                      <input
                        // AS FORMIK'S FORM IS COMMENTED, FIELD SHOWS ERROR SO USE INPUT INSTEAD OF FIELD

                        className="form-check-Field"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        onChange={handleChange("gender")}
                        value="Male"
                        //HERE, VALUE IS NOT IN CURLY BRACKET AS HERE, WE DONT TAKE VALUES FROM FORM BUT DIRECTLY SET IT TO MALE
                      />

                      {/* <Field className="form-check-Field" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/> */}

                      {/* IN REACT, WE REMOVE CHECKED FROM Field TYPE FORM-CHECK-Field At The End as in above*/}

                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Male
                      </label>
                    </div>

                    <div className="form-check">
                      {/* <Field */}
                      <input
                        // AS FORMIK'S FORM IS COMMENTED, FIELD SHOWS ERROR SO USE INPUT INSTEAD OF FIELD

                        className="form-check-Field"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        onChange={handleChange("gender")}
                        value="Female"
                        //HERE, VALUE IS NOT IN CURLY BRACKET AS HERE, WE DONT TAKE VALUES FROM FORM BUT DIRECTLY SET IT TO FEMALE
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Female
                      </label>
                    </div>

                    <div className="form-check">
                      {/* <Field */}
                      <input
                        // AS FORMIK'S FORM IS COMMENTED, FIELD SHOWS ERROR SO USE INPUT INSTEAD OF FIELD

                        className="form-check-Field"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                        onChange={handleChange("gender")}
                        value="Other"
                        //HERE, VALUE IS NOT IN CURLY BRACKET AS HERE, WE DONT TAKE VALUES FROM FORM BUT DIRECTLY SET IT TO OTHER
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault3"
                      >
                        Others
                      </label>
                    </div>
                  </div>
                </label>
              </div>
              <div className="form-floating">
                {/* <Field */}
                <input
                  // AS FORMIK'S FORM IS COMMENTED, FIELD SHOWS ERROR SO USE INPUT INSTEAD OF FIELD

                  type="email"
                  className="form-control"
                  id="floatingField"
                  placeholder="name@example.com"
                  name="email"
                  onChange={handleChange("email")}
                  value={email}
                />

                {/* SINCE FORM CONTROL PUTS THE LABEL IN PLACE OF PLACEHOLDER I.E INSIDE THE BOX, THE PLACEHOLDER WILL NOT WORK HERE */}

                <label htmlFor="floatingField">Email address</label>
                <ErrorMessage name="email">
                  {(msg) => <div style={{ color: "maroon" }}>{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-floating">
                {/* <Field */}
                <input
                  // AS FORMIK'S FORM IS COMMENTED, FIELD SHOWS ERROR SO USE INPUT INSTEAD OF FIELD

                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange("password")}
                  value={password}
                />
                <label htmlFor="floatingPassword">Password</label>
                <ErrorMessage name="password">
                  {(msg) => <div style={{ color: "maroon" }}>{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-floating">
                {/* <Field */}
                <input
                  // AS FORMIK'S FORM IS COMMENTED, FIELD SHOWS ERROR SO USE INPUT INSTEAD OF FIELD

                  type="password"
                  className="form-control"
                  id="floatingCPassword"
                  placeholder="Confirm Password"
                  name="cpassword"
                />
                <label htmlFor="floatingCPassword">Confirm Password</label>
                <ErrorMessage name="cpassword">
                  {(msg) => <div style={{ color: "maroon" }}>{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="checkbox mb-3">
                <label>
                  {/* <Field */}
                  <input
                    // AS FORMIK'S FORM IS COMMENTED, FIELD SHOWS ERROR SO USE INPUT INSTEAD OF FIELD
                    type="checkbox"
                    value="remember-me"
                  />{" "}
                  I accept all the Terms and Conditions
                </label>
              </div>
              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                onClick={handleSubmit}
              >
                Register
              </button>
              <br></br>
              <br />
              Already have an account? <Link to="/Login">Sign In Here</Link>
              <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
              {/* </Form>  //THIS Form is of formik and Yup. //WE HAVE COMMENTED */}
              {/* IT HERE AS IT'S HANDLE CHANGE IS COLLIDING WITH OUR DEFINED */}
              {/* HANDLECHANGE */}
            </form>
            {/* REPLACED Form With small f */}
            {/* This is the formik's Form. the small f <form> </form> is of HTML */}
          </main>
        </div>
      </Formik>
      <Footer />
    </>
  );
};

export default Signup;
