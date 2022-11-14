import React, { useEffect, useState } from 'react'
import { getLastestPostsCategorie } from '../services'

const FeaturedMeet = () => {
  const [latestPostCategories, setLatestPostCategories] = useState();
  const [lastPosts, setLastPosts] = useState([]);
  let categoriesMeet = [];

  useEffect(() => {
    getLastestPostsCategorie()
      .then((res) => { setLatestPostCategories(res) }
    );
  },[]);

  useEffect(() => {
    try {
      if(latestPostCategories) {
        latestPostCategories.map(({ node: { posts, name } }) => { 
          let featuredImage = null;
          let slug = null;
          let categorieName = null;
      
          if(posts[0]) {
            return (
                featuredImage = posts[0].featuredImage.url,
                slug = posts[0].slug,
                categorieName = name,
                categoriesMeet.push({ slug, categorieName, featuredImage })
            );
          }
        })
      };

      console.log({categoriesMeet});
      
      if(categoriesMeet.length > 0) {
        setLastPosts(categoriesMeet);
      }

    } catch (error) {
      throw error;
    }
  },[latestPostCategories]);

  if(lastPosts.length > 0) {
    return (
      <div className=''>
  
        <h1 className='text-4xl uppercase font-bold text-center tracking-widest mb-8'>
          ENCONTRO
        </h1>
  
        <div className='flex flex-col items-center'>
          <div className='flex flex-wrap w-96 h-96 border-2 rounded-full'> 
            <img 
              src={lastPosts[0].featuredImage || ''} 
              alt="" 
              className="max-w-full h-auto rounded-full" 
            />
          </div>

          <div className='flex w-full justify-between items-center'>
            <div className='flex w-96 h-96 border-2 rounded-full'>
              <img 
                src={lastPosts[1].featuredImage || ''}
                alt="" 
                className="max-w-full h-auto rounded-full" 
              />
            </div>
            <div className='flex w-96 h-96 border-2 rounded-full'>
              <img 
                src={lastPosts[2].featuredImage || ''} 
                alt=""
                className="max-w-full h-auto rounded-full" 
              />
            </div>
          </div>
          
          <div className='flex flex-wrap justify-center w-96 h-96 border-2 rounded-full'>
            <img 
              src={lastPosts[3].featuredImage || ''} 
              alt=""
              className="max-w-full h-auto rounded-full" 
            />
          </div>
        </div>

        
      </div>
    )
  } else {
    return (
      <div>
          Loading...
      </div>
    )
  }
}

export default FeaturedMeet