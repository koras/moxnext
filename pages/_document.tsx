 
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';



 const counterId = 93101865;
 interface MyDocumentProps {
  metrikaScript?: string;
}
class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
     // замените на ваш идентификатор счетчика
     let metrikaScript = "";

    if(process.env.NEXT_PUBLIC_MODE === "DEV"){
       metrikaScript = `(function (){})`;
    }else{ 
     metrikaScript = `
      (function (m, e, t, r, i, k, a) {
        m[i] =
          m[i] ||
          function () {
            (m[i].a = m[i].a || []).push(arguments);
          };
        m[i].l = 1 * new Date();
        (k = e.createElement(t)),
          (a = e.getElementsByTagName(t)[0]),
          (k.async = 1),
          (k.src = r),
          a.parentNode.insertBefore(k, a);
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(${counterId}, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    `;
    }


    return {
      ...initialProps,
      metrikaScript,
      counterId,
    };
  }

  render() {
    const { metrikaScript } = this.props;
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: metrikaScript ??`` }} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.counterId = ${counterId}`,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;