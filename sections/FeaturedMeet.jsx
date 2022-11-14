import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { getLastestPostsCategorie } from '../services'


const FeaturedMeet = () => {
  const [latestPostCategories, setLatestPostCategories] = useState();
  const [lastPosts, setLastPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

      console.log({ categoriesMeet });
      
      if(categoriesMeet.length > 0) {
        setLastPosts(categoriesMeet);
      }

    } catch (error) {
      throw error;

    } finally {
      return () => {
        setLoading(false);
      }
    }
  },[latestPostCategories]);


  const [mobile, setMobile] = useState(0);

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
          {lastPosts.map(({ categorieName }, idx) => categorieName && !loading ? (
            <>
              <div 
                className='rounded-full mx-auto' 
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
                  gridColumnStart: 
                    categorieName === 'Bahia' 
                    ? 1 
                    : categorieName === 'Salvador' 
                    ? 3 
                    : categorieName === 'Estar'
                    ? 2
                    : 2
                }}
              >
                <div className='relative z-10 rounded-full'
                style={{ 
                  width: 40,
                  height: 40, 
                  backgroundColor: 'red',
                  left: 
                    categorieName === 'Bahia' 
                    ? '-15px'
                    ? categorieName === 'Salvador'
                    : '110px'
                    ? categorieName === 'Ser'
                    : '220px'
                    : '230px',
                  bottom: 
                    categorieName === 'Bahia' 
                    ? '-230'
                    ? categorieName === 'Salvador'
                    : '-170px'
                    ? categorieName === 'Ser'
                    : '-70px'
                    : '-70px',
                }}
                //left: 100, bottom: -230 (bottom)
                // (bottom-right): left: 220, bottom: -170
                // top-right: left: 220, bottom: -70
                // top-left: left: -15, bottom: -70
              >
                oi
              </div>
              </div>
            </>
          ) : (
            <div
              className='rounded-full mx-auto' 
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
                transition: '0.325s',
                gridColumnStart: 
                  categorieName === 'Bahia' 
                  ? 1 
                  : categorieName === 'Salvador' 
                  ? 3 
                  : categorieName === 'Estar'
                  ? 2
                  : 2
              }}
            >
              <Skeleton style={{ height: '250px', borderRadius: '50%' }}/>
            </div>
          ))}
      </div>
    </div>
    )
  } else {
    return (
      <div>
        <Skeleton />
      </div>
    )
  }
}

export default FeaturedMeet