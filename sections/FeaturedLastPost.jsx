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

  if(lastPost[0]) {
    return (
      <section className='lg:flex py-3 mb-8 items-center justify-between'>
        <div 
          className='d-flex flex-col'
        >
          <span 
            className='text-xl font-light uppercase'
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
          
          <h1 className='text-2xl font-bold mt-1 text-cyan-600'>
            { lastPost[0].title || <Skeleton /> }
          </h1>
          
          <blockquote 
            className='lg:text-left mt-3 mr-3'
          >
            <p className='text-lg font-medium leading-loose tracking-tight hover:tracking-wide'>
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