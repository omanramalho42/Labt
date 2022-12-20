import React, { useEffect } from 'react'
import { Header } from './'
import { motion } from 'framer-motion'

const Layout = ({ children }) => {
  useEffect(() => {
    return () => {
      console.log("renderizando compoennte");
    }
  }, [])
  
  return (
    <motion.div 
      // initial={{ opacity: 0 }} 
      // animate={{ opacity: 1 }} 
      // transition={{ duration: 0.75, ease: "easeOut" }}
      // className="absolute top-0 left-0 w-full h-full"
    >
      <Header />
      { children }
    </motion.div>
  )
}

export default Layout