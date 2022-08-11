// styles
import "../styles/globals.scss";

// components
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

// toasts
import { ToastContainer } from "react-toastify";

function App({ Component, pageProps }) {
  return (
    <div className="app">
      <ToastContainer />
      <Header />
      <div className="container">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
