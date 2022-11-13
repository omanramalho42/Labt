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
      <div className='grid gap-4 grid-cols-2 grid-rows-2'>
  
        <h1 className='text-4xl uppercase font-bold text-center tracking-widest mb-8'>
          ENCONTRO
        </h1>
  
        <div className='flex-1'>
          <div className='flex justify-center'> 
            <img 
              src={lastPosts[0].featuredImage || ''} 
              alt="" 
              width={400}
              height={400}
              className="rounded-full max-w-xs" 
            />
          </div>
          
          <div className='flex justify-between'>
            <div className=''>
              <img 
              src={lastPosts[1].featuredImage || ''}
              alt="" 
              width={400}
              height={400}
              className="rounded-full max-w-xs" 
            />
           </div>
            <div>
              <img 
              src={lastPosts[2].featuredImage || ''} 
              alt="" 
              width={400}
              height={400}
              className="rounded-full max-w-xs" 
            />
            </div>
          </div>
          
          <div className='flex justify-center'>
            <img 
              src={lastPosts[3].featuredImage || ''} 
              alt="" 
              width={400}
              height={400}
              className="rounded-full max-w-xs" 
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