import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          id="debug-tool"
          strategy="beforeInactive"
          dangerouslySetInnerHTML={{
            __html: `(function () {
            var script = document.createElement('script');
            script.src="https://cdn.jsdelivr.net/npm/eruda";
            document.body.append(script);
            script.onload = function () { eruda.init();
            }
           })();`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
