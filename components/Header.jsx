import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { getCategories } from '../services'
import Skeleton from 'react-loading-skeleton'

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [load ,setLoad] = useState(true);

  useEffect(() => {
    try {
      getCategories()
        .then((newCategories) => setCategories(newCategories));
    } catch (error) {
       throw error;
    } finally {
      setLoad(false);
    }

  },[]);

  if(load) {
    return (
      <div className="mx-auto mb-12 container dark:bg-black dark:text-white">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton height={100} width={200} style={{ borderRadius: '25%', marginRight: 200 }} />
          <div style={{ display: 'flex' }}>
            <Skeleton height={32} width={22} style={{ marginRight: '1px' }} />
            <Skeleton height={32} width={22} style={{ marginRight: '1px' }} />
            <Skeleton height={32} width={22} style={{ marginRight: '1px' }} />
            <Skeleton height={32} width={22} style={{ marginRight: '1px' }} />
          </div>
        </div>
        <Skeleton count={1} />
      </div>
    )
  }

  return (
    <div className='mx-auto px-10 mb-8 dark:bg-black'>
      {categories.map(({ name, slug }, idx) => (
        <div key={`${slug}-${idx}`}>
          <Link href={`/category/${slug}`}>
            <span className={
              `md: float-right mr-1 rounded-b-sm 
              ${name === 'Estar' 
              ? 'bg-yellow-500'
              : name === 'Salvador'
              ? 'bg-blue-600'
              : name === 'Bahia'
              ?  'bg-red-600'
              : name === 'Labt'
              ?  'bg-black-500'
              : 'bg-green-600'
              } w-6 h-8 p-1`}
            >
            </span>  
          </Link>
        </div>
      ))}

      <div 
        className="grid grid-cols-2 py-8 space-x-10 items-center" 
      >
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
        
        <div className='w-full flex align-middle justify-between items-center'>
          <div className="hidden md:float-right md:contents items-center">
            <a
              href='/' 
              className='md:float-right flex items-center mt-2 text-black dark:text-white font-semibold cursor-pointer lg:text-2xl'
            >
              Labt
            </a>
            <div style={{ borderRight: '2px solid black', height: '20px' }} className="ml-2 mt-2 h-full" />
            {categories.map((i) => (
              <>
                <Link key={i.slug} href={`/category/${i.slug}`}>
                  <span className="flex items-center md:float-right mt-2 align-middle text-black dark:text-white ml-4 font-semibold cursor-pointer lg:text-2xl">
                    { i.name }
                  </span>
                </Link>
                <div style={{ borderRight: '2px solid black', height: '20px' }} className="ml-2 mt-2 h-full" />
              </>
            ))}
            <a 
              href='/banca'
              className='md:float-right mt-2 disabled:opacity-25 text-black dark:text-white ml-4 font-semibold cursor-pointer border-separate lg:text-2xl'
            >
              Banca
            </a>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default Header