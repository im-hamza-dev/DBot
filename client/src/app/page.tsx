import ProtectedLayout from "./(protected)/protected-layout";
import styles from "./page.module.css";
import QueryFlow from "@/components/query-flow/query-flow";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ProtectedLayout>
          <QueryFlow />
        </ProtectedLayout>
      </main>
    </div>
  );
}
