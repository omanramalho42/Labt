import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { getLastestPostsCategorie } from '../services'

const FeaturedMeet = () => {
  const [latestPostCategories, setLatestPostCategories] = useState();
  const [lastPosts, setLastPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const insertEffect = (idx) => {
    let circle = document.getElementById(`circle${idx}`);
  
    circle.classList.add('scalling');
  }

  const removeEffect = (idx) => {
    let circle = document.getElementById(`circle${idx}`);
    
    circle.classList.remove('scalling');
  }

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

  useEffect(() => {
    if(document.documentElement.clientWidth !== undefined ) {
      setMobile({ innerWidth: 
        document.documentElement.clientWidth
      });
    }
  },[]);

  const [ios, setIos] = useState(false);
  useEffect(() => {
    return () => {
      navigator.userAgent.includes("IOS" || "Safari") && setIos(true);
    }
  },[]);

  if(lastPosts.length > 0) {
    return (
      <div 
        className='meet flex flex-col items-center mx-auto w-full h-full'
      >
        <div
          style={{
            transition: '0.325s',
            backgroundImage: `url(${'/sectionmeet.png'})`,
            backgroundRepeat: 'no-repeat',
            padding: mobile.innerWidth < 1000 ? '0' : '10em',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundPositionY:  mobile.innerWidth < 1000 ? '5%' : '50%'
          }}
        >
          <div 
            className='relative flex flex-col items-center' 
            style={{ top: mobile.innerWidth > 1000  ? '-10em' : '-7em' }}
          >
            <h1 
              className='text-4xl uppercase font-bold text-center'
              style={{ 
                fontFamily: 'Luam-Regular',
                letterSpacing: mobile.innerWidth < 1000 ? '10px' : '40px', 
                zIndex: 21,
                marginBottom: '.6em'
              }}
            >
              ENCONTRO
            </h1>
            <div 
              style={{ 
                borderBottom: '2.5px solid #000', 
                width: mobile.innerWidth < 1000 ? '200px' : '350px',
                marginRight: mobile.innerWidth < 1000 ? '0px' : '30px',
                marginBottom: mobile.innerWidth < 1000 ? '0px' : '2em'
              }}
            />
          </div>
          <div 
            className="grid"
          >
            {lastPosts.map(({ 
              categorieName, 
              slug, 
              excerpt, 
              title 
            }, idx) => categorieName && !loading && (
              <div
                key={`${Math.random() * 100}`} 
                className='relative rounded-full mx-auto' 
                style={{
                  top: '-5em',
                  width: `${
                    mobile.innerWidth < 1000 
                    ? '120px'
                    : mobile.innerWidth < 1200 && mobile.innerWidth > 1000 
                    ? '180px' 
                    : categorieName === 'Estar' || categorieName === 'Bahia' ? '310px' : '250px'
                  }`, 
                  height: `${
                    mobile.innerWidth < 1000 
                    ? '120px' 
                    : mobile.innerWidth < 1200 && mobile.innerWidth > 1000 
                    ? '180px' 
                    : categorieName === 'Estar' || categorieName === 'Bahia' ? '310px' : '250px'
                  }`,
                  boxShadow: '2px 3px 10px 1px rgba(0, 0, 0, 0.1)',
                  transition: '0.325s',
                  padding: '10px',
                  border: `3.5px solid 
                  ${categorieName === 'Salvador'
                      ? '#2563EB'
                      : categorieName === 'Bahia'
                      ? '#DC2626' 
                      : categorieName === 'Ser'
                      ? '#16A34A'
                      : '#EAB308'
                  }`,
                  gridColumnStart: 
                    categorieName === 'Estar' 
                    ? 2 
                    : categorieName === 'Salvador' 
                    ? 3 
                    : categorieName === 'Bahia'
                    ? 2
                    : 1
                }}
              >
                <a
                  href={`/post/${slug}`}
                  onMouseEnter={() => insertEffect(idx)}
                  onMouseLeave={() => removeEffect(idx)}
                  className='w-full h-full tooltip' 
                  style={{
                    borderRadius: '50%',
                    backgroundImage: `url(${lastPosts[idx].featuredImage || ''})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    cursor: 'pointer'
                   }}
                >
                  <a
                    id={`circle${idx}`}
                    href={`/post/${slug}`}
                    className={`box rounded-full tooltip
                      ${categorieName === 'Ser' 
                      ? 'box1' 
                      : categorieName === 'Salvador' 
                      ? 'box2'  
                      : categorieName === 'Bahia'
                      ? 'box3'
                      : 'box4'
                    }`}
                    style={{ 
                      zIndex: 1,
                      backgroundColor: 
                        categorieName === 'Salvador'
                        ? '#2563EB'
                        : categorieName === 'Bahia'
                        ? '#DC2626' 
                        : categorieName === 'Ser'
                        ? '#16A34A'
                        : '#EAB308',
                    }}
                  >
                    {mobile.innerWidth > 1000 && (
                      <span
                        className="tooltiptext rendering" 
                        style={{
                          zIndex: 9,
                          color: 'black',
                          fontWeight: 'bold',
                          left:
                            categorieName === 'Salvador'
                            ? '4em'
                            : categorieName === 'Estar'
                            ? '-12em' 
                            : categorieName === 'Ser'
                            ? '-11em'
                            : categorieName === 'Bahia' 
                            ? '6em'
                            : 0,
                          top:
                            categorieName === 'Salvador'
                            ? '-2em'
                            : categorieName === 'Estar'
                            ? '-2em' 
                            : categorieName === 'Ser'
                            ? '-2em'
                            : categorieName === 'Bahia'
                            ? '0' : 0,
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
                    )}
                  </a>
                </a>
              </div>
            ))}
          </div>
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