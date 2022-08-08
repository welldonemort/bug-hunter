// styles
import "../styles/globals.scss";

// components
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
