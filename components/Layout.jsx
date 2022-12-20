import React, { useEffect } from 'react'
import { Header } from './'

const Layout = ({ children }) => {
  useEffect(() => {
    return () => {
      console.log("renderizando compoennte");
    }
  }, [])
  
  return (
    <>
      <Header />
      { children }
    </>
  )
}

export default Layout