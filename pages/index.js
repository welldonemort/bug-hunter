// components
import Head from "next/head";

// // styles
// import styles from "../styles/Home.module.css";

// queries
// import Api from "../helpers/api";
// const api = new Api();

export default function Home() {
  // componentDidMount and componentDidUpdate
  // useEffect(() => {
  //   api
  //     .getMainPage()
  //     .then((resp) => {
  //       console.log(resp, resp.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  return (
    <div className="container--holder">
      <Head>
        <title>BugHunter</title>
        <meta name="description" content="BugHunter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Главная страница</h1>
      <p>Тут будет контент</p>
    </div>
  );
}
