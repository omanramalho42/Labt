import '../styles/globals.scss'
import '../styles/normalize.css'

import { Analytics } from '@vercel/analytics/react'

import { store } from '../app/store'
import { Provider } from 'react-redux'

import { HelmetProvider } from 'react-helmet-async'

import type { AppProps } from 'next/app'

import { Layout } from '../components'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Analytics />
      <HelmetProvider>
        <AnimatePresence>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AnimatePresence>
      </HelmetProvider>
    </Provider>
  )
}

export default MyApp
