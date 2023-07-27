import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ColorSchemeProvider } from '../components/ColorSchemeContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorSchemeProvider>
      <Component {...pageProps} />
    </ColorSchemeProvider>
  )
}
