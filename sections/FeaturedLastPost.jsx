import React, { useEffect, useState } from 'react'
import { getLastPost } from '../services'

const FeaturedLastPost = () => {
  
  const [lastPost, setLastPost] = useState([]);
  useEffect(() => {
    getLastPost()
        .then((result) => setLastPost(result));
  },[]);

  if(lastPost[0]) {
    return (
      <section className='lg:flex py-3 mb-8'>
        <div className='d-flex'>
          
          <span className='text-xl font-light uppercase'>
            { lastPost[0].categories[0].name.toString() }
          </span>
          
          <h1 className='text-2xl font-bold mt-1 text-cyan-600'>
            { lastPost[0].title }
          </h1>
          
          <blockquote className='text-left mt-3 mr-3'>
            <p className='text-lg font-medium leading-loose tracking-tight hover:tracking-wide'>
              {lastPost[0].excerpt}
            </p>
          </blockquote>

          <figcaption className='mt-3'>
            <a 
              href={`post/${lastPost[0].slug}`} 
              className='text-xl underline underline-offset-8'
            >
              leia mais
            </a>
          </figcaption>
        </div>
        
        <figure className='mt-3'>
          <img src={lastPost[0].featuredImage.url} alt="" width={2000} height={"600"} />
        </figure>

      </section>
    )
  } else {
    
    return (
      <div>loading...</div>  
    )

  }

}

export default FeaturedLastPost