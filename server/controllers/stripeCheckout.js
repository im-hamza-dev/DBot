import Stripe from "stripe";
import { StripePayment } from "../models/stripePayment.js";
import connectMongo from "../db/mongodb.js";

// dotenv.config();
export const stripeCheckout = async (req, res) => {
  const { email, amount, currency, paymentMethodType } = req.body;

  if (!email || !amount || !currency || !paymentMethodType) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  console.log(process.env.STRIPE_SECRET_KEY);

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    await connectMongo();
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { email },
    });
    console.log("stripe intent:", paymentIntent);

    await StripePayment.create({
      email,
      amount,
      currency,
      paymentMethodType,
      paymentIntentId: paymentIntent.id,
    });

    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
};
