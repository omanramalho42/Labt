import '../styles/globals.scss'
import '../styles/normalize.css'
// import '../styles/reset.css'

import type { AppProps } from 'next/app'

import { Layout } from '../components'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnimatePresence>
  )
}

export default MyApp
