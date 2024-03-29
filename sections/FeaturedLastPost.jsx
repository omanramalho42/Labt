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
        className='grid lg:grid-cols-2 gap-4 sm:grid-cols-1 mb-8 md:items-top justify-between'
      >
        <div>
          <span 
            className='text-4xl font-light uppercase'
            style={{ 
              fontFamily: 'Luam-Light',
              fontWeight: 300,
              color: `
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
            { lastPost[0].categories[0].name.toString() || <Skeleton count={1} /> }
          </span>
          
          <h1 
            className='text-4xl font-bold mt-2' 
            style={{ fontFamily: 'gotham-bold', fontWeight: 700 }}
          >
            { lastPost[0].title || <Skeleton /> }
          </h1>
          
          <blockquote 
            className='lg:text-left mt-3 mr-3'
          >
            <p 
              className='text-xl font-medium leading-loose tracking-tight hover:tracking-wide'
              style={{ fontWeight: '400' }}
            >
              {lastPost[0].excerpt || <Skeleton count={12} />}
            </p>
          </blockquote>

          <figcaption 
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              marginBottom: '6em'
            }} 
            className='mt-3'
            >
            <Link
              href={`post/${lastPost[0].slug}`} 
              className='text-2xl uppercase mx-auto'
              style={{ position: 'absolute', left: '40px' }}
            >
              <p 
                className='text-black dark:text-white text-3xl'
                style={{ 
                  fontFamily: 'Luam-Light',
                  fontWeight: 300,
                  marginTop: '1em'
                }}
              >
                leia mais
              </p>
              <span
                style={{
                  display: 'flex',
                  borderBottom: '1px solid #a6a6a6',
                  margin: '5px 20px',
                }}
              />
            </Link>
          </figcaption>
        </div>
        
        <div className='d-flex lg:justify-center items-center'>
          <figure className='mt-3'>
            <img
              src={lastPost[0].featuredImage.url || ''} 
              alt="imagem do último post" 
              className='w-full rounded-md'
            />
          </figure>
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