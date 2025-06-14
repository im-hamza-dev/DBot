import { get } from "@/api/axiosinstance";
import React, { useEffect, useState } from "react";
import styles from "./tokens-usage.module.scss";

const TokensUsage = () => {
  const [tokensUsageData, setTokensUsageData] = useState<any>(null);
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
  return <div className={styles.tokenUsage}>{totalTokens} / 5000</div>;
};

export default TokensUsage;
