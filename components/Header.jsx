import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { getCategories } from '../services'


const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories));
  },[]);

  return (
    <div className='mx-auto px-10 mb-8'>
        
      {categories.map(({ name, slug }, idx) => (
        <div key={idx}>
          <Link href={`/category/${slug}`}>
            <span className={
              `md: float-right mr-2 
              ${name === 'Estar' 
              ? 'bg-yellow-500'
              : name === 'Salvador'
              ? 'bg-green-900'
              : name === 'Bahia'
              ?  'bg-purple-700'
              : name === 'Labt'
              ?  'bg-black-500'
              : 'bg-pink-600'
              } w-5 h-8 p-1`}
            >
            </span>  
          </Link>
        </div>
      ))}

      <div className="w-full py-8 flex justify-between items-center">
        
          <div className="md:float-left">
            <Link href="/">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  default: {
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01]
                  },
                  scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001
                  }
                }}
              >
                <span className='cursor-pointer font-bold text-4xl text-black'>
                  <img src='/logo.png' alt="logo labtempo" width="300" height="100" />
                </span>
              </motion.div>
            </Link>
          </div>
          
          <div className=''>
            <div className="hidden md:float-right md:contents">
              {categories.map((i) => (
                <Link key={i.slug} href={`/category/${i.slug}`}>
                  <span className="md:float-right mt-2 align-middle text-black ml-4 font-semibold cursor-pointer border-separate">
                    { i.name }
                  </span>
                </Link>
              ))}
            </div>
          </div>
        
      </div>
    </div>
  )
}

export default Header