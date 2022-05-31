import React from "react";

// import { useState } from 'react'
// import { useEffect } from 'react'

//The use state and useeffect can be merged as follows:-
import { useState, useEffect } from "react";

//React hooks are used to update/change values or state. The following example will show how it works

//Use-State are used to change the state of given data
//Use-effect are used to do actions after use-state

//Axios are used to fetch external data from backend

// Documentation:- https://reactjs.org/docs/hooks-intro.html

// useState:-
// const [data, setData] = useState(100)

//useEffect:-
//useEffect(function, [stateVariable])

const Data = () => {
  const [data, setData] =
    useState(
      100
    ); /* here data and setData can also be written as data and setdata as follows*/
  // const [DATA, setDATA] = useState(initialState)
  //This is how we define hooks.

  //usState Syntax:-
  //const [variable name, setvariable] = useState(initial value)

  //useEffect Syntax:-
  //useEffect(function, [stateVariable])

  //Defined For useState

  const [value, setValue] = useState(777);

  const [result, setResult] = useState(0);

  //Defined For useEffect
  useEffect(() => {
    // window.alert("Value Updated"), [] //As The setVariable is Bank i.e [], this will show window alert every time

    //     window.alert("Value Updated")
    // }, [data])  //This will show the alert in the beginning and every time the data changes

    window.alert("Value Updated");
  }, [data, result]); //This will show the alert in the beginning and every time the data (from const data)and result(from const result) changes

  //This can also be done independently one at a time as follows:-
  //Fot data
  // useEffect(() => {

  //     window.alert("Value Updated")
  // }, [data])

  // //For result
  // useEffect(() => {

  //     window.alert("Value Updated")
  // }, [data])

  return (
    <>
      <div className="text-center">
        <h1>{data}</h1>
        {/* Here, data is variable. so we use Curly Bracket.
            Always put any variable or statement in Curly Brackets */}
        {/* We Will Use This In Backend Definition as Well to Import Data */}
        <button className="btn btn-primary" onClick={() => setData(data + 1)}>
          Click To Increase
        </button>

        {/* HERE, setData is Just manipulating data. This is how useState Works */}
        <button
          className="btn btn-primary ms-3"
          onClick={() => setData(data + 1)}
        >
          Click To Decrease
        </button>
      </div>

      <br />
      <br />

      <div className="text-center">
        <h6>{value}</h6>
        <button
          className="btn btn-secondary me-3"
          onClick={() => setValue(value + 20)}
        >
          Click to increase value by 13
        </button>

        {/* For Multiple Statements */}
        <button
          className="btn btn-secondary"
          onClick={() => {
            /* We Use One More Curly Braces Here */
            setValue(value - 20); //This will decrease Value By 20
            setData(data + 10); //This will increace Value by 10
          }}
        >
          Click to decrease value by 20 and add 10 in above value
        </button>
      </div>

      <br />
      <br />

      <div className="text-center">
        <h1>{result}</h1>
        {/* Here, data is variable. so we use Curly Bracket.
            Always put any variable or statement in Curly Brackets */}
        {/* We Will Use This In Backend Definition as Well to Import Data */}
        {result < 100 && (
          <button
            className="btn btn-primary"
            onClick={() => setResult(result + 25)}
          >
            Click To Increase
          </button>
        )}

        {/* Here, the entire above line is a variable method. Hence Curly Braces is needed.

                {/* This will add If Else Effect Here. */}

        {result > 0 && (
          <button
            className="btn btn-primary ms-3"
            onClick={() => setResult(result - 1)}
          >
            Click To Decrease
          </button>
        )}
        {/* Here, The condition is if result is greater than 0 and  */}
        {/* Here, the entire above line is a variable method. Hence Curly Braces is needed UNLIKE THE ABOVE data, setData.  */}
      </div>
    </>
  );
};

export default Data;
