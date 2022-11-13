import React, { useState, useEffect } from 'react'

import Link from 'next/link'

import { getCategories } from '../services'


const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories));
  },[]);

  return (
    <div className='container mx-auto px-10 mb-8'>
        
      {categories.map(({ name, slug }, idx) => (
        <div key={idx}>
          <Link href={`/category/${slug}`}>
            <span className={
              `md: float-right mr-2 
              ${name === 'Estar' 
              ? 'bg-yellow-500' 
              : name === 'Banca' 
              ? 'bg-red-500'
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

      <div className="border-b w-full inline-block border-gray-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className='cursor-pointer font-bold text-4xl text-black'>
              <img src='./logo.png' alt="logo labtempo" width="300" height="100" />
            </span>
          </Link>
        </div>

        <div className="hidden md:float-left md:contents">
          {categories.map((i) => (
          <Link key={i.slug} href={`/category/${i.slug}`}>
              <span className="md:float-right mt-2 align-middle text-black ml-4 font-semibold cursor-pointer">
                { i.name }
              </span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Header