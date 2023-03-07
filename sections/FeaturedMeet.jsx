import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import Skeleton from 'react-loading-skeleton'

import { getLastestPostsCategorie } from '../services'

import { useSelector } from 'react-redux'
import { item, container } from '../tools/effect'

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

  const [show, setShow] = useState(false);

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

  const { theme } = 
    useSelector((state) => state.theme);


  useEffect(() => {
    if(lastPosts) {
      console.log([lastPosts[1],lastPosts[2],lastPosts[0],lastPosts[3]],'sorted');
      console.log(lastPosts,'not sorted');
    }
  },[lastPosts]);

  if(lastPosts.length > 0) {
    return (
      <div 
        className='flex flex-col items-center mx-auto w-full h-full'
      >
        <div
          className='meet'
          style={{
            transition: '0.325s',
            objectFit: 'contain',
            backgroundImage: theme === 'dark' 
              ? `url(${'/bgmeet.png'})`
              : `url(${'/darkAspiral.png'})`, 
            backgroundRepeat: 'no-repeat',
            padding: mobile.innerWidth < 1000 ? '0' : '5em 0',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundPositionY:  mobile.innerWidth < 1000 ? '20%' : '50%'
          }}
        >
          <div 
            className='relative flex flex-col items-center' 
            style={{ top: mobile.innerWidth > 1000  ? '-10em' : '-7em' }}
          >
            <h1 
              className='text-4xl uppercase font-bold text-center'
              style={{ 
                // fontFamily: 'Luam-Regular',
                letterSpacing: 
                  mobile.innerWidth <= 800 
                  ? '10px' 
                  : mobile.innerWidth > 800 && mobile.innerWidth <= 1200 
                  ? '30px'
                  : '40px', 
                zIndex: 21,
                marginBottom: '.6em'
              }}
            >
              ENCONTRO
            </h1>
            <div 
              style={{ 
                borderBottom: '2.5px solid #000', 
                width: mobile.innerWidth < 1000 ? '285px' : '350px',
                marginRight: mobile.innerWidth < 1000 ? '0px' : '30px',
                marginBottom: mobile.innerWidth < 1000 ? '0px' : '2em'
              }}
            />
          </div>
          <div className="grid">
            {[lastPosts[1],lastPosts[2],lastPosts[0],lastPosts[3]].map(({ 
              categorieName, 
              slug, 
              excerpt,
              title 
            }, idx) => categorieName && !loading  && mobile.innerWidth > 1000 ? (
              <div
                key={`${Math.random() * 100}`} 
                className={`relative rounded-full mx-auto`} 
                style={{
                  top: '-5em',
                  width: `${
                    mobile.innerWidth < 1200 && mobile.innerWidth > 1000 
                    ? '180px' 
                    : categorieName === 'Estar' || categorieName === 'Ser' ? '310px' : '250px'
                  }`,
                  height: `${
                    mobile.innerWidth < 1200 && mobile.innerWidth > 1000 
                    ? '180px' 
                    : categorieName === 'Estar' || categorieName === 'Ser' ? '310px' : '250px'
                  }`,
                  boxShadow: '2px 3px 10px 1px rgba(0, 0, 0, 0.1)',
                  transition: '0.325s',
                  padding: '10px',
                  transformBox: 'content-box',
                  border: `3.5px solid 
                  ${categorieName === 'Salvador'
                    ? '#2f53a1'
                    : categorieName === 'Bahia'
                    ? '#DC2626' 
                    : categorieName === 'Ser'
                    ? '#3fbb5a'
                    : '#d5b035'
                  }`,
                  gridColumnStart: 
                    categorieName === 'Estar' 
                    ? 2 
                    : categorieName === 'Salvador' 
                    ? 1 
                    : categorieName === 'Bahia'
                    ? 3
                    : 2
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
                      ? 'box3' 
                      : categorieName === 'Salvador' 
                      ? 'box2'  
                      : categorieName === 'Bahia'
                      ? 'box1'
                      : 'box4'
                    }`}
                    style={{ 
                      zIndex: 1,
                      backgroundColor: 
                        categorieName === 'Salvador'
                        ? '#2f53a1'
                        : categorieName === 'Bahia'
                        ? '#DC2626' 
                        : categorieName === 'Ser'
                        ? '#3fbb5a'
                        : '#d5b035',
                    }}
                  >
                    <span
                      className={`tooltiptext ${categorieName} rendering ${mobile.innerWidth < 1000 ? 'tooltiptext__mobile relative z-10' : ''}`} 
                      style={{
                        fontWeight: 'bold',
                        left:
                          categorieName === 'Salvador'
                          ? '4em'
                          : categorieName === 'Estar'
                          ? '-12em' 
                          : categorieName === 'Ser'
                          ? '5em'
                          : categorieName === 'Bahia' 
                          ? '2em'
                          : 0,
                        top:
                          categorieName === 'Salvador'
                          ? '-0.5em'
                          : categorieName === 'Estar'
                          ? '-2em' 
                          : categorieName === 'Ser'
                          ? '-2em'
                          : categorieName === 'Bahia'
                          ? '5em' : 0,
                      }}
                      >
                        {/* {mobile.innerWidth < 1000 && ( <span style={{ position: 'absolute', right: '20px', top: '5px', fontSize: '.9em'}}>x</span> ) } */}
                        <p 
                          className={`font-medium ${mobile.innerWidth < 1000 && 'tooltip__title'}`}
                          style={{
                            color: 
                              categorieName === 'Salvador' && mobile.innerWidth > 1000
                              ? '#2f53a1'
                              : categorieName === 'Bahia' && mobile.innerWidth > 1000
                              ? '#DC2626' 
                              : categorieName === 'Ser' && mobile.innerWidth > 1000
                              ? '#3fbb5a'
                              : mobile.innerWidth > 1000 && '#d5b035',    
                          }}
                        > 
                          { categorieName }
                        </p>
                        <p 
                          className={`text-black dark:text-white`}
                        >
                          { title  || 'dont avaliable'}
                        </p>
                    </span>
                  </a>
                </a>
              </div>
            ) : mobile.innerWidth < 1000 && categorieName && !loading ? (
              <div
                key={`${Math.random() * 100}`} 
                className={`relative rounded-full mx-auto`} 
                style={{
                  top: '-5.5em',
                  width: `${
                    categorieName === 'Estar' || categorieName === 'Ser' ? '130px' : '115px'}`,
                  height: `${
                    categorieName === 'Estar' || categorieName === 'Ser' ? '130px' : '115px'
                  }`,
                  boxShadow: '2px 3px 10px 1px rgba(0, 0, 0, 0.1)',
                  transition: '0.325s',
                  padding: '5px',
                  transformBox: 'content-box',
                  border: `6px solid
                  ${categorieName === 'Salvador'
                    ? '#2f53a1'
                    : categorieName === 'Bahia'
                    ? '#DC2626' 
                    : categorieName === 'Ser'
                    ? '#3fbb5a'
                    : '#d5b035'
                  }`,
                  gridColumnStart: 
                    categorieName === 'Estar' 
                    ? 2 
                    : categorieName === 'Salvador' 
                    ? 1 
                    : categorieName === 'Bahia'
                    ? 3
                    : 2
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
                    onMouseEnter={() => setShow(true)}
                    id={`circle${idx}`}
                    className={`box rounded-full tooltip
                      ${categorieName === 'Ser' 
                      ? 'box3' 
                      : categorieName === 'Salvador' 
                      ? 'box2'  
                      : categorieName === 'Bahia'
                      ? 'box1'
                      : 'box4'
                    }`}
                    style={{ 
                      backgroundColor: 
                        categorieName === 'Salvador'
                        ? '#2f53a1'
                        : categorieName === 'Bahia'
                        ? '#DC2626' 
                        : categorieName === 'Ser'
                        ? '#3fbb5a'
                        : '#d5b035',
                    }}
                  />
                  
                  <div>
                    {show && (
                      <a
                        href={`/post/${slug}`}
                        className={`tooltiptext z-10 ${categorieName} ${show && 'visible'} rendering tooltiptext__mobile relative`} 
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          left:
                            categorieName === 'Salvador'
                            ? '4em'
                            : categorieName === 'Estar'
                            ? '6em' 
                            : categorieName === 'Ser'
                            ? '-11em'
                            : categorieName === 'Bahia' 
                            ? '-12em'
                            : 0,
                          top:
                            categorieName === 'Salvador'
                            ? '-2em'
                            : categorieName === 'Estar'
                            ? '-2em' 
                            : categorieName === 'Ser'
                            ? '-2em'
                            : categorieName === 'Bahia'
                            ? '0' : 0
                        }}
                      >
                          <p 
                            className={`font-medium tooltip__title`}
                          > 
                            { categorieName }
                          </p>
                          <p 
                            className={'tooltip_excerpt'}
                          >
                            { title  || 'dont avaliable'}
                          </p>
                      </a>
                    )}
                  </div>

                </a>
              </div>
            ) : (
              <></>
            ))}
          </div>
        </div>
    </div>
    )
  } else {
    return (
      <div>
        <Skeleton height={300} className="my-10 mx-20" />
      </div>
    )
  }
}

export default FeaturedMeet