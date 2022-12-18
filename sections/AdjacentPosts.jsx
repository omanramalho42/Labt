import React, { useState, useEffect } from 'react'

import { AdjacentPostCard } from '../components'
import { getAdjacentPosts } from '../services'

const AdjacentPosts = ({ createdAt, slug, color }) => {
  const [adjacentPost, setAdjacentPost] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getAdjacentPosts(createdAt, slug).then((result) => {
      setAdjacentPost(result);
      setDataLoaded(true);
    });
  }, [slug]);

  return (
    // <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 mb-8">
    <div className='flex mb-8 items-center justify-center' style={{ justifyContent: 'space-around' }}>
      {dataLoaded && (
        <>
          {adjacentPost.previous && (
            // <div className={`${adjacentPost.next ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
            //   <AdjacentPostCard post={adjacentPost.previous} position="LEFT" color={color} />
            // </div>
            <div className='relative'>
              <AdjacentPostCard post={adjacentPost.previous} position="LEFT" color={color} />
            </div>
          )}
          {adjacentPost.next && (
            // <div className={`${adjacentPost.previous ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
            //   <AdjacentPostCard post={adjacentPost.next} position="RIGHT" color={color}/>
            // </div>
            <div className='relative'>
              <AdjacentPostCard post={adjacentPost.next} position="RIGHT" color={color}/>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdjacentPosts;