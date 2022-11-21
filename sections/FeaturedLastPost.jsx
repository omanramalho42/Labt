import React, { useEffect, useState } from 'react'
import { getLastPost } from '../services'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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

  const [mobile, setMobile] = useState(600);  
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

  useEffect(() => { console.log(mobile,'mobile')},[mobile])

  if(lastPost[0]) {
    return (
      <section className='py-3 mb-8 items-center justify-between' 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: mobile.innerWidth > 1200 ? 'repeat(2,1fr)' : '1fr', 
          gridColumnGap: '10px'
        }}
      >
        <div 
          className='grid col-span-1'
        >
          <span 
            className='text-3xl font-light uppercase'
            style={{ 
              color: `
                ${lastPost[0].categories[0].name.toString() === 'Bahia'
                  ? 'red' 
                  : lastPost[0].categories[0].name.toString() === 'Salvador'
                  ? 'blue'
                  : lastPost[0].categories[0].name.toString() === 'Ser'
                  ? 'green'
                  : 'brown'  
                }
              `
            }}
          >
            { lastPost[0].categories[0].name.toString() || <Skeleton count={1} /> }
          </span>
          
          <h1 className='text-4xl font-bold mt-2 text-cyan-600'>
            { lastPost[0].title || <Skeleton /> }
          </h1>
          
          <blockquote 
            className='lg:text-left mt-3 mr-3'
          >
            <p className='text-xl font-medium leading-loose tracking-tight hover:tracking-wide'>
              {lastPost[0].excerpt || <Skeleton count={12} />}
            </p>
          </blockquote>

          <figcaption className='mt-3'>
            <a 
              href={`post/${lastPost[0].slug}`} 
              className='text-xl underline underline-offset-6 uppercase'
              style={{ textUnderlineOffset: 10, textDecorationThickness: 2 }}
            >
              leia mais
            </a>
          </figcaption>
        </div>
        
        <div className='d-flex lg:justify-center items-center'>
          <figure className='mt-3'>
            <img
              src={lastPost[0].featuredImage.url || ''} 
              alt="imagem do último post" 
              className='rounded-md'
              width={'8000px'}
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