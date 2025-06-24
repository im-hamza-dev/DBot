"use client";

import React from "react";
import styles from "./page.module.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_PK } from "@/util/constants";
import { StripeCheckoutForm } from "@/components/stripe-checkout-form/stripe-checkout-form";

type Props = {};

const options: any = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const StripeCheckout = (props: Props) => {
  const stripePromise = loadStripe(STRIPE_PK as string);

  return (
    <div className={styles.checkoutWrapper}>
      <div className={styles.checkoutLeft}>
        <Elements stripe={stripePromise} options={options}>
          <StripeCheckoutForm />
        </Elements>
      </div>
      <div className={styles.checkoutRight}>Right Mode</div>
    </div>
  );
};

export default StripeCheckout;
