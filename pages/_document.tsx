import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="E-commerce website with Next.js" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
            crossOrigin="anonymous"
          ></link>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />

          <Script
            src="https://kit.fontawesome.com/yourcode.js"
            crossOrigin="anonymous"
          ></Script>
          <Script
            type="text/javascript"
            src="https://example.com/fontawesome/v6.2.0/js/conflict-detection.js"
          ></Script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
