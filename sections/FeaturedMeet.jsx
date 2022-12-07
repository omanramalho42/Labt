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
      .then((res) => { 
        setLatestPostCategories(res) 
      }
    );
  },[]);

  useEffect(() => {
    try {
      if(latestPostCategories) {
        latestPostCategories.map(({ node: { posts, name } }) => { 
          let featuredImage = null;
          let slug = null;
          let categorieName = null;
          let excerpt = null;
          let title = null;
      
          if(posts[0]) {
            return (
                featuredImage = posts[0].featuredImage.url,
                title = posts[0].title,
                slug = posts[0].slug,
                categorieName = name,
                excerpt = posts[0].excerpt,
                categoriesMeet.push({ slug, categorieName, featuredImage, excerpt, title })
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

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerHeight, innerWidth };
  }

  const [mobile, setMobile] = useState(0);  

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
        style={{
          height: '-webkit-fill-available',
          width: '-webkit-fill-available'
        }}
      >
        <h1 
          className='text-4xl uppercase font-bold text-center'
          style={{ 
            letterSpacing: mobile.innerWidth < 1000 ? '10px' : '40px', 
            zIndex: 21,
            marginBottom: '30px'
          }}
        >
          ENCONTRO
        </h1>
        <div 
          style={{ 
            borderBottom: '2.5px solid #000', 
            width: mobile.innerWidth < 1000 ? '200px' : '350px',
            marginBottom: '80px',
            marginRight: mobile.innerWidth < 1000 ? '0px' : '30px'
          }}
        />
        <div 
          className="grid"
          style={{ 
            backgroundImage: `url(${'/sectionmeet.png'})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center'
          }}
        >
          {lastPosts.map(({ categorieName, slug, excerpt, title }, idx) => categorieName && !loading ? (
            <>
              <div
                key={`${idx}-${slug}`} 
                className='rounded-full mx-auto' 
                style={{
                  width: `${
                    mobile.innerWidth < 1000 
                    ? '120px'
                    : mobile.innerWidth < 1200 && mobile.innerWidth > 1000 
                    ? '180px' 
                    : categorieName === 'Estar' || categorieName === 'Ser' ? '300px' : '250px'
                  }`, 
                  height: `${
                    mobile.innerWidth < 1000 
                    ? '120px' 
                    : mobile.innerWidth < 1200 && mobile.innerWidth > 1000 
                    ? '180px' 
                    : categorieName === 'Estar' || categorieName === 'Ser' ? '300px' : '250px'
                  }`,
                  backgroundImage: `url(${lastPosts[idx].featuredImage || ''})`,
                  boxShadow: '2px 3px 10px 1px rgba(0, 0, 0, 0.1)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  transition: '0.325s',
                  outline: mobile.innerWidth > 800 ?  `4.5px solid 
                  ${categorieName === 'Salvador'
                    ? '#2563EB'
                    : categorieName === 'Bahia'
                    ? '#DC2626' 
                    : categorieName === 'Ser'
                    ? '#16A34A'
                    : '#EAB308'
                  }` : 0,
                  padding: '1px',
                  border: mobile.innerWidth < 800 ? `4.5px solid 
                  ${categorieName === 'Salvador'
                      ? '#2563EB'
                      : categorieName === 'Bahia'
                      ? '#DC2626' 
                      : categorieName === 'Ser'
                      ? '#16A34A'
                      : '#EAB308'
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
                    width: mobile.innerWidth < 1000 
                      ? '30px' 
                      : '40px',
                    height: mobile.innerWidth < 1000 
                      ? '30px' 
                      : '40px',
                    backgroundColor: 
                      categorieName === 'Salvador'
                      ? '#2563EB'
                      : categorieName === 'Bahia'
                      ? '#DC2626' 
                      : categorieName === 'Ser'
                      ? '#16A34A'
                      : '#EAB308',
                    left: 
                     mobile.innerWidth < 1000 
                      ? -15 
                      : mobile.innerWidth < 1200 
                      ? -20 
                      : 15,
                  }}
                >
                  <span 
                    className="tooltiptext" 
                    style={{
                      zIndex: 9,
                      color: 'black',
                      fontWeight: 'bold',
                      left:
                        categorieName === 'Salvador'
                        ? '-300%'
                        : categorieName === 'Bahia'
                        ? '5em' 
                        : categorieName === 'Ser'
                        ? '150%'
                        : '150%',
                      top:
                        categorieName === 'Salvador'
                        ? '1em'
                        : categorieName === 'Bahia'
                        ? '0.5em' 
                        : categorieName === 'Ser'
                        ? '0.5em'
                        : '0.5em',
                    }}
                    >
                      <p 
                        className='font-medium'
                        style={{
                          color: 
                            categorieName === 'Salvador'
                            ? '#2563EB'
                            : categorieName === 'Bahia'
                            ? '#DC2626' 
                            : categorieName === 'Ser'
                            ? '#16A34A'
                            : '#EAB308',    
                        }}
                      >
                        { categorieName }
                      </p>
                      <p>
                        { title  || 'dont avaliable'}
                      </p>
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