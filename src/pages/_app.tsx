import '@arco-design/web-react/dist/css/arco.css'
import '@/src/styles/globals.css'
// import 'antd/dist/antd.css'

import type { AppProps } from 'next/app'
import { ColorSchemeProvider } from '../components/ColorSchemeContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorSchemeProvider>
      <Component {...pageProps} />
    </ColorSchemeProvider>
  )
}
