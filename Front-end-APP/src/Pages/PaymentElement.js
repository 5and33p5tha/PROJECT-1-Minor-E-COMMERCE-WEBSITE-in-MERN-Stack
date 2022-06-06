import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import { API } from "../config";

const PaymentElement = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    return (
      fetch(`${API}/stripeapikey`, {
        //To Read API Key
        method: "GET",
      })
        .then((res) => res.json()) //Get Response

        //In data of the response, set the stripeApiKey of data to setStripeApiKey
        .then((data) => setStripeApiKey(data.stripeAPIkey)) //data.stripeAPIkey is the key of the stripeAPIkey we get from the backend. the name "stripeAPIkey must match the backend aswell, similar to loginuser issue where we had loginuser inplace of user for user verification"
        .catch((err) => console.log(err)) //Error sent to console
    );
  });

  return (
    stripeApiKey && (
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>
    )
  );
};

export default PaymentElement;
