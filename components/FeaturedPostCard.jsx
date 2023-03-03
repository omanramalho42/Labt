import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

const FeaturedPostCard = ({ post, mobile = false }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setLoading(false) 
      }, 500);
    }
  }, []);

  if(!loading) {
    <Skeleton height={200} className='flex-1 w-full mx-10' />
  }

  return (
    <div className="relative h-auto">
      <img src={post.image} className={`${mobile ? 'rotate-[-90deg] h-[450px] md:h-[700px] w-full object-contain' : 'rotate-0 w-full h-full object-contain'}`} />
      <div className="absolute rounded-3xl bg-center w-full h-full" />
    </div>
  )
};

export default FeaturedPostCard;