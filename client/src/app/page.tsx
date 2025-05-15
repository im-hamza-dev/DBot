import Image from "next/image";
import styles from "./page.module.css";
import QueryFlow from "@/components/query-flow/query-flow";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <QueryFlow />
      </main>
    </div>
  );
}
