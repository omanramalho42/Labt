import React, { useEffect, useState } from 'react'
import moment from 'moment'

import Image from 'next/image'
import Link from 'next/link'

import Skeleton from 'react-loading-skeleton'

const FeaturedPostCard = ({ post }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setLoading(false) 
      }, 500);
    }
  }, []);  

  return (
    <div className="relative h-auto">
      {/* <div 
        className="absolute bg-center lg:rounded-3xl bg-no-repeat bg-cover object-cover shadow-md inline-block w-full h-full" 
        style={{ 
          // backgroundImage: `url('${post.featuredImage.url}')`,
          backgroundImage: `url(${post.image})`,
          backgroundSize: 'cover',
        }} 
      /> */}
      <img src={post.image} className="w-full h-full object-contain" />
      <div className="absolute rounded-3xl bg-center w-full h-full" />
    </div>
  )
};

export default FeaturedPostCard;