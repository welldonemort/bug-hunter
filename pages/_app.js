// styles
import "../styles/globals.scss";

// components
import Header from "../components/common/Header";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
