import logo from "./logo.svg";
import "./App.css";
import First from "./Pages/First";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
// import { Provider } from "react-redux";

function App() {
  return (
    //This Runs Like A Live Server. Any Changes Made Will  be displayed after certain duration
    //Everything in return Is JSX- Java Script Executables.
    // In React, Class and Object Concept of OOP is not needed

    //Everything Here IN SRC ARE COMPONENTS or ELEMENTS. Like First.JS Second.JS, ETC

    <div className="App">
      {/* commented as we will devine provider in index as my router is in index */}
      {/* <Provider store = {store}></Provider> , ALSO NEED TO IMPORT STORE*/}
      <Navbar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {/* 
        In React, We Cannot define empty tags. Everything must have a close.
        Example:-
        either 
        <br> </br>
        or 
        <br/>


         */}

        <br />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React This Is A New Custom Line
        </a>
      </header>
      <Footer />
    </div>
    // <div>
    // CANNOT MAKE MULTIPLE DIVISIONS. BUT CAN MAKE MULTIPLE CHILD DIVISIONS IN PARENT DIVS
    // </div>
  );
}

export default App;
