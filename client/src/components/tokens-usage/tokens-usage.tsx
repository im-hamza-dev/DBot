import { get } from "@/api/axiosinstance";
import React, { useEffect, useState } from "react";
import styles from "./tokens-usage.module.scss";
import { TOKENS_LIMIT } from "@/util/constants";
import { CustomModal } from "../custom-modal/custom-modal";
import { useRouter } from "next/router";
import { useCheckoutNavigation } from "@/hooks/useNavigation";

const TokensUsage = () => {
  const [tokensUsageData, setTokensUsageData] = useState<any>(null);
  const [openTokenLimitModal, setOpenTokenLimitModal] = useState(false);
  const { goToCheckout } = useCheckoutNavigation();

  useEffect(() => {
    get("/api/token-usage").then((res) => {
      setTokensUsageData(res);
    });
  }, []);
  console.log(tokensUsageData);
  const totalTokens = tokensUsageData?.reduce(
    (acc: any, curr: any) => acc + (curr.tokensUsed || 0),
    0
  );

  const openModal = () => {
    setOpenTokenLimitModal(true);
  };
  const closeModal = () => {
    setOpenTokenLimitModal(false);
  };

  const tokensAvailable = totalTokens < TOKENS_LIMIT;
  return (
    <>
      <button className={styles.tokenUsage} onClick={openModal}>
        {totalTokens} / {TOKENS_LIMIT}
      </button>
      <CustomModal
        isOpen={openTokenLimitModal}
        onClose={() => setOpenTokenLimitModal(false)}
      >
        <div className={styles.upgradeContent}>
          <h1>Upgrade your Limits</h1>
          <p
            className={`${styles.tokensStatus} ${
              tokensAvailable ? styles.tokensAvailable : ""
            }`}
          >
            <strong>Tokens Used:</strong> {totalTokens} / {TOKENS_LIMIT}
          </p>
          <p>
            Each question you ask consumes tokens depending on its length and
            the response length. For example, a short query may use ~100 tokens,
            while a long one could use 500+.
          </p>
          <div className={styles.buttonsFlex}>
            <button className={styles.closeBtn} onClick={closeModal}>
              Cancel
            </button>
            <button className={styles.upgradeBtn} onClick={goToCheckout}>
              Buy Tokens
            </button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default TokensUsage;

// redux tool kit
// to store logged-in user, tokenUsage details and total tokensUsed

// token usage limit and stripe integration
