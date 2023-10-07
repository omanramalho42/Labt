import React, { useEffect, useState } from 'react'

import image from '../public/darkAspiral.png'
import { motion, useScroll } from 'framer-motion'

import Skeleton from 'react-loading-skeleton'
import ModalPhotos from './ModalPhotos'

import { TagCategorieWidget } from '../components'
import Link from 'next/link'


const PostDetail = ({ post }) => {

  const [color,setColor] = useState('');
  const [bg, setBg] = useState('');

  useEffect(() => {
    if(post.categories[0].name === 'Bahia') {
      setColor('#DC2626');
      setBg('/bgred.png');
      return;
    } else if(post.categories[0].name === 'Salvador') {
      setColor('#2f53a1');
      setBg('/bgblue.png');
      return;
    } else if (post.categories[0].name === 'Ser') {
      setColor('#3fbb5a');
      setBg('/bggreen.png');
      return;
    } else  {
      setColor('#d5b035');
      setBg('/bgyellow.png');
      return;
    }
  },[post]);

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

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl dark:text-white font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{ item }</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8 tracking-widest dark:text-white" style={{ lineHeight: '1.6em'}}>{modifiedText.map((item, i) => <React.Fragment key={i}>{ item }</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold dark:text-white mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{ item }</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            className='mx-auto xl:my-5'
            style={{ borderRadius: '33px', maxHeight: '90vh', objectFit: 'cover' }}
            key={index}
            alt={obj.title}
            height={obj.height}
            width={'100%'}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  }

  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-white dark:bg-black rounded-lg pb-12 mt-3">   
    
      <motion.div
        className='progress-bar z-20'
        style={{ 
          scaleX: scrollYProgress, 
          backgroundColor: color,
          transition: 'all' 
        }}
      />

      <div className=''>
        {mobile.innerWidth < 1000 ? (
          <>
            <TagCategorieWidget
              name={ post.categories[0].name } 
              color={color}
            />
          </>
        ) : (
          <div  className='flex row mr-3'>
            <div 
              className='flex-1 mb-8 p-1'
              style={{
                margin: 'auto',
                borderRadius: '0 15px 15px 0',
                backgroundColor: color
              }}
            />
            <span 
                className='text-4xl ml-4 dark:text-white font-medium uppercase'
                style={{
                  color: color,
                  fontFamily: 'Luam-Light',
                  fontWeight: 300
                }}
              >
              { post.categories[0].name || <Skeleton count={1} /> } 
            </span>
          </div>
        )}
      </div>
      <div
        style={{ 
          backgroundImage: mobile.innerWidth < 1000 &&  `url(${bg})`, 
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundPositionY: '-20px'
        }} 
      >
        <div 
          className="px-6 lg:px-0 py-4 dark:bg-black" 
        > 
          <h1 
            className="lg:px-10 mb-2 md:text-5xl text-4xl font-semibold dark:text-white" style={{ fontFamily: 'Arlita' }}> 
            { post.title || <Skeleton />} 
          </h1>
          
          <div className='flex lg:px-10 items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>          
            <p className='inline w-60 text-white md:text-gray-400 text-lg border-t-2 xl:mb-5 dark:text-white font-light' 
              style={{ 
                borderColor: 
                color
              }}
            >
              { post.author.name || <Skeleton count={1} /> } 
            </p>
          </div>

          <div className='lg:px-16'>
            {post.content.raw.children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));

              return getContentFragment(index, children, typeObj, typeObj.type);
            })}

            {post?.carousel.length > 0 && (
              <ModalPhotos 
                post={post.carousel} 
              />
            )}

            <div className='flex flex-col dark:text-white font-bold mt-[50px]'>
              <h5 style={{ fontFamily: 'gotham-bold' }}>
                •Compartilhe
              </h5>     
              <div className='flex row'>
                <Link 
                  href={"https://www.facebook.com/profile.php?id=100088693333749"}
                  passHref
                  target="_blank"
                  type="button" 
                  className="rounded-full cursor-pointer z-10 border-2 text-center dark:border-white dark:hover:border-blue-700 hover:border-blue-700 dark:text-white border-black text-black leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
                >
                  <svg aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="facebook-f"
                    className="w-2 h-full mx-auto hover:scale-90 transition-all"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  ></path>
                  </svg>
                </Link>

                <Link 
                  href="https://www.instagram.com/labtempo" 
                  passHref
                  type="button" 
                  target="_blank"
                  className="cursor-pointer z-10 rounded-full border-2 dark:hover:border-purple-700 hover:border-purple-700 text-center dark:border-white dark:text-white border-black text-black leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
                  <svg aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="instagram"
                    className="w-3 h-full mx-auto hover:scale-90 transition-all"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                    ></path>
                  </svg>
                </Link>

                <Link 
                  href={`https://api.whatsapp.com/send?phone=5571992624841&text=https://www.labtempo.com/${post.slug}`} 
                  type="button"
                  target="_blank" 
                  data-action="share/whatsapp/share"
                  className="rounded-full cursor-pointer z-10 border-2 dark:hover:border-green-700 hover:border-green-700 text-center dark:border-white dark:text-white border-black text-black leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
                  <svg 
                    className="w-4 h-full mx-auto hover:scale-90 transition-all" 
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  > 
                    <path 
                      d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" 
                    ></path> 
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PostDetail