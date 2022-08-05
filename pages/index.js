import { useEffect } from "react";

// components
import Head from "next/head";

// styles
import styles from "../styles/Home.module.css";

// queries
import Api from "../helpers/api";
const api = new Api();

export default function Home() {
  // componentDidMount and componentDidUpdate
  useEffect(() => {
    api
      .getMainPage()
      .then((resp) => {
        console.log(resp, resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>BugHunter</title>
        <meta name="description" content="BugHunter app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Главная страница</h1>
        <p>Тут будет контент</p>
      </main>
    </div>
  );
}
