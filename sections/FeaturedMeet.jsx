import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { getLastestPostsCategorie } from '../services'


const FeaturedMeet = () => {
  const [latestPostCategories, setLatestPostCategories] = useState();
  const [lastPosts, setLastPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  let categoriesMeet = [];

  useEffect(() => {
    getLastestPostsCategorie()
      .then((res) => { setLatestPostCategories(res) }
    );
  },[]);

  useEffect(() => { console.log({loading}, 'loading')},[loading])

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

      console.log({ categoriesMeet });
      
      if(categoriesMeet.length > 0) {
        setLastPosts(categoriesMeet);
      }

    } catch (error) {
      throw error;
    } finally {
      return () => {
        setLoading(true);
      }
    }
  },[latestPostCategories]);


  const [mobile, setMobile] = useState(1960);

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

  if(lastPosts.length > 0) {
    
    return (
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl uppercase font-bold text-center tracking-widest mb-8'>
          ENCONTRO
        </h1>

        <div className="grid">
          {lastPosts.map(({ categorieName, slug }, idx) => categorieName && (
            <div 
                key={idx}
                data-tooltip-target="tooltip-top" data-tooltip-placement="top"
                className={`
                ${categorieName === 'Salvador'
                ? 'col-start-3' 
                : categorieName === 'Estar' 
                ? 'col-start-2' 
                : categorieName === 'Bahia' 
                ? 'col-start-1' 
                : 'col-start-2'
              } border-2 rounded-full mx-auto`} 
              style={{
                width: `${
                  mobile.innerWidth < 1000 
                  ? '120px' 
                  : mobile.innerWidth < 1200 && mobile.innerWidth > 1000 
                  ? '180px' 
                    : '250px'
                  }`, 
                  height: `${
                    mobile.innerWidth < 1000 
                    ? '120px' 
                    : mobile.innerWidth < 1200 && mobile.innerWidth > 1000 
                    ? '180px' 
                    : '250px'
                  }`, 
                  backgroundImage: `url(${lastPosts[idx].featuredImage || ''})`,
                  boxShadow: '2px 3px 10px 1px rgba(0, 0, 0, 0.1)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  transition: '0.325s',
                  cursor: 'pointer'
                }}
              />
          ))}
        
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