import React from 'react'
import { Header, Footer } from './'

const Layout = ({ children }) => {  
  return (
    <div>
      <Header />
      { children }
      {/* <Footer /> */}
    </div>
  )
}

export default Layout