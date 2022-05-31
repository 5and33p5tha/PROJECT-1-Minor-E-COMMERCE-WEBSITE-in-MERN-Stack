//This Page is for using Main.js

//PROPS ARE MOSTLY USED TO GET VALUES (VALUES FROM FORM, VALUES FROM URL)

import React from "react";

const Props = (props) => {
  const { text, user } = props;
  //The method is called a De-structuring Object.

  return (
    <>
      <h1> {text}</h1> Sent By <h2> {user} </h2>
      {/* The {text} and {user} is our custom defined hooks sent by main.js */}
      {/* 
            IF WE WERE NOT USING DE-STRUCTURING, thenTHE ABOVE LINE
                
                const { text, user } = props SHOULD BE COMMENTED AND

                <h1> {props.text}</h1> Sent By <h2> {props.user} </h2> Should be written inplace of {text} and {user} */}
    </>
  );
};

export default Props;
