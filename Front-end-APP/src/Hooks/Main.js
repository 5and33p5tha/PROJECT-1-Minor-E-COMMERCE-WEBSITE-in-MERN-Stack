import React, { useContext } from "react";
import GlobalContextProvider from "./GlobalContext";
import Props from "./Props";
import UseGlobalContext from "./UseGlobalContext";

const Main = () => {
  return (
    <>
      <Props text={"hello"} user={"Sandeep"}></Props>

      {/* This sends {text} with value "hello" to and {user} = "Sandeep" are the custom user defined properties */}

      {/* Everytime Context IS Called, These Following Should Be Called */}
      <GlobalContextProvider>
        <UseGlobalContext></UseGlobalContext>
      </GlobalContextProvider>
    </>
  );
};

export default Main;
