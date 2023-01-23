import '../styles/globals.scss'
import '../styles/normalize.css'
// import '../styles/reset.css'

import { HelmetProvider } from 'react-helmet-async'

import type { AppProps } from 'next/app'

import { Layout } from '../components'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HelmetProvider>
      <AnimatePresence>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AnimatePresence>
    </HelmetProvider>
  )
}

export default MyApp
