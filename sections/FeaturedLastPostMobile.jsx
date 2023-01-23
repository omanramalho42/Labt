import React, { useEffect, useState } from 'react'
import { getLastPost } from '../services'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Link from 'next/link'

const FeaturedLastPost = () => {
  const [lastPost, setLastPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLastPost()
        .then((result) => setLastPost(result));

    return () => {
      setLoading(false);
    }    
  },[]);

  const [mobile, setMobile] = useState(0);
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerHeight, innerWidth };
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setMobile(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  },[]);

  if(lastPost[0]) {
    return (
      <section 
        className='grid lg:grid-cols-2 sm:grid-cols-1 mb-8'
      >
         <div className='d-flex items-center'>
          <figure className=''>
            <img
              src={lastPost[0].featuredImage.url || ''} 
              alt="imagem do último post" 
              className='w-full h-full'
            />
          </figure>
        </div>

        <div 
          className='px-4'
          style={{
            backgroundColor: `
                ${lastPost[0].categories[0].name.toString() === 'Bahia'
                  ? '#DC2626' 
                  : lastPost[0].categories[0].name.toString() === 'Salvador'
                  ? '#2f53a1'
                  : lastPost[0].categories[0].name.toString() === 'Ser'
                  ? '#3fbb5a'
                  : '#d5b035'  
                }
              `
          }}
        >
          <span 
            className='relative text-3xl font-light uppercase'
            style={{ 
              top: 13,
              fontFamily: 'Luam-Light',
              fontWeight: 300,
              color: '#fff'
            }}
          >
            { lastPost[0].categories[0].name.toString() || <Skeleton count={1} /> }
          </span>
            
          <div className='flex' style={{ alignItems: 'self-end', justifyContent: 'space-between' }}>
            <h1 
              className='text-2xl font-bold'
              style={{ fontFamily: 'gotham-bold', fontWeight: 700, width: '65%', color: '#FFF' }}
            >
              { lastPost[0].title || <Skeleton /> }
            </h1>
            
            <figcaption 
              className='flex w-75 h-full'
              style={{ justifyContent: 'flex-end' }}
            >
              <Link
                href={`post/${lastPost[0].slug}`}
              >
                <p
                  className='mb-4 text-2xl uppercase'
                  style={{
                    fontFamily: 'Luam-Light', 
                    color: '#FFF',
                  }}
                >
                  leia mais
                </p>
              </Link>
            </figcaption>
          </div>
        </div>

      </section>
    )
  } else {
    
    return (
      <div className=''>
        <Skeleton />
        <Skeleton count={10} />
        <Skeleton height={100} />
      </div>  
    )

  }

}

export default FeaturedLastPost