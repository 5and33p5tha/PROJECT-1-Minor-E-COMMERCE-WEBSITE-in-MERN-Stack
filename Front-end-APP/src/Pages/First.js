//Tyoe In rfce to get basic components.
import React from "react";

// import '../First.css'; //This Is To Import CSS named First.Css
//It Is A Good Practice to keep css in the same page So Use.
//  import './First.css';

import { Link } from "react-router-dom";

//This import link the import for below link which is like the anchor tag <a> or <a href> tag in html

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function First() {
  return (
    // <> These Are Called React Fragments. We can use this inplace of div aswell for main div WE DO SO AS IF WE GIVE div {some css}, this will replace in the main div aswell so BETTER TO USE REACT FRAGMENTS
    // </>
    <div>
      <Navbar />
      <h1> This is Hello From First.JS</h1>

      <Link to="/Second">Go To Second Page</Link>
      <Footer />
    </div>
  );
}

export default First;

//This export default First is the one used in  <Route path='/First'

//Atleast on edefault is necessary if incase of multiple export functions

//rafce-This Is same as in rfce but in arrow function
// import React from 'react'

// const First = () => {
//     return (
//         <div>

//         </div>
//     )
// }

// export default First
