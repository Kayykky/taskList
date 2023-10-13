import styles from "../styles/Home.module.scss";
import Link from "next/link";
import Head from "next/head";
import { canSSRGuest } from "../utils/canSSRGuest";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>taskList</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <p className={styles.text}>
            Conheça o <strong>taskList</strong>
            <br />
            desenvolvido para organizar melhor suas tarefas
          </p>
          <img src="/undrawList.svg" width={600} height={420} />
          <p className={styles.title}>SIMPLES, FÁCIL E PRÁTICO</p>
          <Link href="/login" legacyBehavior>
            <a>Crie sua conta hoje</a>
          </Link>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
