import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
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
        // console.log({latestPostCategories});
        latestPostCategories.map(({ node: { posts, name } }) => { 
          let featuredImage = null;
          let slug = null;
          let categorieName = null;
          let excerpt = null;
      
          if(posts[0]) {
            return (
                featuredImage = posts[0].featuredImage.url,
                slug = posts[0].slug,
                categorieName = name,
                excerpt = posts[0].excerpt,
                categoriesMeet.push({ slug, categorieName, featuredImage, excerpt })
            );
          }
        })
      };
      
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
      <div 
        className='flex flex-col items-center mx-auto'
      >
        <h1 
          className='text-4xl uppercase font-bold text-center'
          style={{ letterSpacing: '15px', zIndex: 21, marginBottom: '60px' }}
        >
          ENCONTRO
        </h1>
        <div 
          className="grid"
          style={{ 
            backgroundImage: `url(${'/aspiral.png'})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            // backgroundAttachment: 'fixed',
            backgroundPosition: 'center'
          }}
        >
          {lastPosts.map(({ categorieName, slug, excerpt, title }, idx) => categorieName && !loading ? (
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
                  outline: mobile.innerWidth > 800 ?  `4.5px solid 
                  ${categorieName === 'Salvador'
                      ? 'blue'
                      : categorieName === 'Bahia'
                      ? 'red' 
                      : categorieName === 'Ser'
                      ? 'green'
                      : 'yellow'
                  }` : 0,
                  padding: '1px',
                  border: mobile.innerWidth < 800 ? `4.5px solid 
                  ${categorieName === 'Salvador'
                      ? 'blue'
                      : categorieName === 'Bahia'
                      ? 'red' 
                      : categorieName === 'Ser'
                      ? 'green'
                      : 'yellow'
                  }` : 0,
                  outlineOffset: '10px',
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
                <a 
                  href={`/post/${slug}`}
                  className='box relative rounded-full tooltip'
                  style={{ 
                    flex: 1,
                    display: 'flex',
                    zIndex: 1,
                    width: mobile.innerWidth < 1000 ? '40px' : '60px',
                    height: mobile.innerWidth < 1000 ? '40px' : '60px',
                    backgroundColor: 
                      categorieName === 'Salvador'
                      ? 'blue'
                      : categorieName === 'Bahia'
                      ? 'red' 
                      : categorieName === 'Ser'
                      ? 'green'
                      : 'yellow',
                    left: 
                     mobile.innerWidth < 1000 
                      ? -15 
                      : mobile.innerWidth < 1200 
                      ? -20 
                      : -5,
                      // left: categorieName === 'Bahia' || categorieName === 'Ser' ? 140 : -25,
                  }}
                >
                  <span 
                    className="tooltiptext z-50" 
                    style={{
                      zIndex: 9,
                      color: 'black',
                      fontWeight: 'bold',
                      left:
                        categorieName === 'Salvador'
                        ? '-300%'
                        : categorieName === 'Bahia'
                        ? '300%' 
                        : categorieName === 'Ser'
                        ? '200%'
                        : '200%',
                      top:
                        categorieName === 'Salvador'
                        ? '40px'
                        : categorieName === 'Bahia'
                        ? '50px' 
                        : categorieName === 'Ser'
                        ? '50px'
                        : '50px',
                    }}
                    >
                      <p 
                        className='font-medium'
                        style={{
                          color: 
                          categorieName === 'Salvador'
                          ? 'blue'
                          : categorieName === 'Bahia'
                          ? 'red' 
                          : categorieName === 'Ser'
                          ? 'green'
                          : 'yellow',    
                        }}
                      >{ categorieName }</p>
                      { title || 'text dont avaliable' }
                    </span>
                </a>
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