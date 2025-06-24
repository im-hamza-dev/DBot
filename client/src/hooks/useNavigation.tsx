"use client";

import { useRouter } from "next/navigation";

export const useCheckoutNavigation = () => {
  const router = useRouter();

  const goToCheckout = () => {
    router.push("/stripe-checkout");
  };

  return { goToCheckout };
};
