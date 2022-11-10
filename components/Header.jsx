import React from 'react'

import Link from 'next/link'

const categories = [
  { name: 'Salvador', slug: 'salvador' },
  { name: 'Bahia', slug: 'bahia' },
  { name: 'LabT', slug: 'labt' },
  { name: 'Estar', slug: 'estar' },
  { name: 'Set', slug: 'set' },
  { name: 'Banca', slug: 'banca' },
]

const Header = () => {
  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="">
            <span className='cursor-pointer font-bold text-4xl text-white'>
              LabT
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((i,idx) => (
            <Link key={i.slug} href={`/category/${i.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
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