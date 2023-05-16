import { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import {resetServerContext} from 'react-beautiful-dnd'

interface DocumentProps {
  locale:string
}

export default function MyDocument({locale}:DocumentProps):JSX.Element {
  resetServerContext()
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// MyDocument.getInitialProps = async (ctx:DocumentContext) => {
//   const initialProps = await Document.getInitialProps(ctx);
//   const locale = ctx.locale || 'en';
//   return {...initialProps, locale};
// }
