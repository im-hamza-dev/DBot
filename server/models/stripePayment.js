import mongoose from "mongoose";

const StripePaymentSchema = new mongoose.Schema(
  {
    email: String,
    amount: Number,
    currency: String,
    paymentMethodType: String,
    paymentIntentId: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const StripePayment =
  mongoose.models.StripePayment ||
  mongoose.model("StripePayment", StripePaymentSchema);
