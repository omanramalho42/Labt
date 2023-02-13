import React, { useState, useEffect } from 'react'

import 'react-loading-skeleton/dist/skeleton.css'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { FeaturedPostCard } from '../components'
import { getFeaturedPosts } from '../services'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
  }, []);
  
  const customLeftArrow = (
    <div className="absolute text-center w-[12px] py-2 px-2 h-[5px] cursor-pointer rounded-full" style={{ backgroundColor: '#FFF', left: '1.5rem' }}>
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#262626' }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </div>
  );

  const customRightArrow = (
    <div className="absolute right-6 text-center w-[12px] py-2 px-2 h-[5px] cursor-pointer rounded-full" style={{ backgroundColor: '#FFF' }}>
      <div style={{ position: 'relative' }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#262626' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="rounded-3xl" style={{ marginBottom: '8em' }}>
      <Carousel 
        infinite
        autoPlay
        customLeftArrow={customLeftArrow} 
        customRightArrow={customRightArrow} 
        responsive={responsive} 
        itemClass="px-2"
      >
        {dataLoaded && featuredPosts.map((post, index) => (
          <FeaturedPostCard key={index} post={post} />
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;