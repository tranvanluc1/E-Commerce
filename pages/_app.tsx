import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Script from "next/script";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Notify from "../components/Notify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Script
        src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossOrigin="anonymous"
      ></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
        crossOrigin="anonymous"
      ></Script>
      <Notify />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
