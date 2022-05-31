import React from "react";
import { GlobalContext } from "./GlobalContext";
import { useContext } from "react";

const UseGlobalContext = () => {
  const msg = useContext(GlobalContext);
  //Here, ue Context is from react hooks function and GlobalContext is our user defined variable defined in GlobalContext
  return (
    <>
      <h2> This is a {msg}</h2>
    </>
  );
};

export default UseGlobalContext;
