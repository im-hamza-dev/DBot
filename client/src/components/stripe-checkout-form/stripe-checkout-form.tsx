"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { post } from "@/api/axiosinstance";

export const StripeCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null || stripe == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError?.message) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    const price = 14;
    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await post(`/api/stripe-checkout/create-intent`, {
      currency: "usd",
      email: emailInput,
      amount: price * 100,
      paymentMethodType: "card",
    });

    const { client_secret: clientSecret } = res;

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-4">
      <div className="mb-3">
        <label htmlFor="email-input">Email</label>
        <div>
          <input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            type="email"
            id="email-input"
            placeholder="johndoe@gmail.com"
          />
        </div>
      </div>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
