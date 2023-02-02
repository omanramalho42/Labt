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
            objectFit: 'contain',
            backgroundImage: `url(${'/sectionmeet.png'})`,
            backgroundRepeat: 'no-repeat',
            padding: mobile.innerWidth < 1000 ? '0' : '10em',
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
          <div className="grid">
            {lastPosts.map(({ 
              categorieName, 
              slug, 
              excerpt, 
              title 
            }, idx) => categorieName && !loading  && mobile.innerWidth > 1000 ? (
              <div
                key={`${Math.random() * 100}`} 
                className={`relative rounded-full mx-auto`} 
                style={{
                  top: mobile.innerWidth < 1000 ? '-5.5em' : '-5em',
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
                  padding: mobile.innerWidth < 1000 ? '5px' : '10px',
                  transformBox: 'content-box',
                  border: `${mobile.innerWidth < 1000 ? '6' : '3.5'}px solid 
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
                        ? '#2f53a1'
                        : categorieName === 'Bahia'
                        ? '#DC2626' 
                        : categorieName === 'Ser'
                        ? '#3fbb5a'
                        : '#d5b035',
                    }}
                  >
                    <span
                      className={`tooltiptext ${categorieName} rendering ${mobile.innerWidth < 1000 && 'tooltiptext__mobile relative z-10'}`} 
                      style={{
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
                          className={`${mobile.innerWidth < 1000 && 'tooltip_excerpt'}`}
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
                    categorieName === 'Estar' || categorieName === 'Bahia' ? '140px' : '120px'}`,
                  height: `${
                    categorieName === 'Estar' || categorieName === 'Bahia' ? '140px' : '120px'
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
                    onMouseEnter={() => setShow(true)}
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
                        ? '#2f53a1'
                        : categorieName === 'Bahia'
                        ? '#DC2626' 
                        : categorieName === 'Ser'
                        ? '#3fbb5a'
                        : '#d5b035',
                    }}
                  >
                    {show && (
                      <span
                        className={`tooltiptext ${categorieName} ${show && 'visible'} rendering tooltiptext__mobile relative z-10`} 
                        style={{
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
                          <button
                            onClick={() => setShow(false)} 
                            className='effect'
                            style={{ 
                              position: 'absolute', 
                              zIndex: 1,
                              backgroundColor: 'rgba(0,0,0,0.1)',
                              padding: '5px',
                              borderRadius: '15px',
                              right: '10px', 
                              top: '5px', 
                              fontSize: '.9em'
                            }}
                          >
                            x
                          </button>
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
                      </span>
                    )}
                  </a>
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
        <Skeleton />
      </div>
    )
  }
}

export default FeaturedMeet