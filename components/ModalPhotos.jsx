
// import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Carousel from 'react-multi-carousel'

import { IoIosArrowBack } from 'react-icons/io'

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

const CarouselIndicator = ({
  activeIndex, 
  length, 
  maxIndicatorVisible = 5, 
  setActiveIndex
}) => {

  const [maxIndicator, setMaxIndicator] = useState(0);
    useEffect(() => {
      setMaxIndicator(
        length > maxIndicatorVisible 
        ? maxIndicatorVisible 
        : length
      );
    },[length, maxIndicatorVisible, activeIndex]);

  return (
    <div className='absolute left-1/2 bottom-4 flex h-5 w-24 translate-x-1/2 transform items-center justify-center space-x-1 md:bottom-10 z-10'>
      { Array.from(Array(maxIndicator), (_, index) => {
        return (
          <div 
            key={index} 
            className={`rounded-full bg-gray-500 ${activeIndex === index  ? 'w-4 opacity-100 ' : 'bg-gray-400 w-2'} h-2 w-2 opacity-50 transition-all duration-500 hover:w-4 hover:opacity-100`} 
            onClick={setActiveIndex} 
          />
        )
      })}
    </div>
  )
}

const CarouselItem = ({ post, index, activeIndex, handleSetOpenModal }) => {
  const offset = (index - activeIndex) / 4;
  const direction = Math.sign(index - activeIndex);
  const absOffset = Math.abs(offset);

  const cssTransformProperties = `
    rotateY(calc(     ${offset}    * 45deg)) 
    scaleY(calc(1 +   ${absOffset} * -0.5)) 
    translateX(calc(  ${direction} * -3rem))
    translateZ(calc(  ${absOffset} * -25rem))
  `;

  const cssOpacity = `
    ${Math.abs(index - activeIndex) > 3 ? '0' : '1'};
  `;

  const cssDisplay = `
    ${Math.abs(index - activeIndex) > 3 ? 'none' : 'block'};
  `;

  return (
    <div 
      className='absolute text-[#121212] h-full w-full cursor-pointer overflow-hidden rounded-3xl transition-all duration-700'
      style={{
        transform: cssTransformProperties,
        opacity: cssOpacity,
        display: cssDisplay,
        boxShadow: '0 8px 30px rgb(0,0,0,0.5)'
      }}
    >
      <img 
        key={index}
        alt="imagem carousel"
        className="w-full object-contain drop-shadow-lg"
        src={post.url}
        onClick={
          () => handleSetOpenModal({ 
            active: true, 
            url: post.url 
          })
        }  
      />
    </div>
  );
};

const ModalPhotos = ({ post }) => {
  const [openModal ,setOpenModal] = useState(false);
  const [imagesSort, setImageSort] = useState([]);
  
  const ref = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        event.target.contains(ref.current) && setOpenModal((value) => !value);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ imagesSort ]);

  const handleSetOpenModal = async (url) => {
    try {
      let imagesSort = post.filter((i) => i.url !== url.url);
      imagesSort.unshift({ url: url.url });

      setImageSort(imagesSort);
    } catch (error) {
      throw error
    } finally {
      setOpenModal({ active: true, url: url.url });
    }
  }

  return (
    <div className='flex items-center justify-center py-20 overflow-x-hidden'>
      <div 
        className='relative h-32 w-3/6 sm:h-40 md:h-56'
        style={{
          perspective: '450px',
          transformStyle: 'preserve-3d'
        }}
      >
        {activeIndex > 0 && (
          <button
            onClick={() => 
              setActiveIndex((value) => value > 0 ? --value : value )
            } 
            className='absolute top-1/2 right-full z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-[#F9F9F9] bg-[#F9F9F9] text-2xl opacity-75 transition duration-100 hover:opacity-100 md:h-12 md:w-12'>
            <IoIosArrowBack />
          </button>
        )}

        {post.map((i ,idx ) => (
          <CarouselItem 
            index={idx} 
            key={idx}
            handleSetOpenModal={handleSetOpenModal}
            activeIndex={activeIndex}
            post={i} 
          />
        ))}

        {activeIndex < post.length-1 && (
          <button 
            onClick={() => 
              setActiveIndex((value) => value < post.length ? ++value : value )
            }
            className='absolute top-1/2 left-full z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-[#F9F9F9] bg-[#F9F9F9] text-2xl opacity-75 transition duration-100 hover:opacity-100 md:h-12 md:w-12'
            style={{
              transform: 'rotate(180deg)',
            }}
          >
            <IoIosArrowBack />
          </button>
        )}

        <div className='flex items-center justify-center relative right-20'>
          <div className='absolute sm:top-52 top-44 md:top-72 z-20'>
            <CarouselIndicator 
              activeIndex={activeIndex}
              length={post.length}
              setActiveIndex={(index) => {
                setActiveIndex(index)
              }}
            />
          </div>
        </div>

        {openModal && (
          <div
            className='z-20'
            style={{ 
              position: 'fixed',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div className='rendering modal relative w-full h-full'>
              <div className=''>
              <span 
                className='relative text-white text-3xl cursor-pointer px-2 text-center z-30' 
                style={{ top: '1.7em', left: '1em', zIndex: 100000000, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.7)' }}
                onClick={() => {
                  setOpenModal(false), 
                  setImageSort([])
                }}
              >
                x
              </span>
              {post && (
                <Carousel
                  infinite
                  responsive={responsive}
                  autoPlay
                >
                  {imagesSort?.map((i, idx) => (
                    <img
                      ref={ref}
                      key={idx}
                      alt="imagem carousel"
                      className="w-full drop-shadow-lg max-h-[600px]"
                      src={i.url}
                    />
                  ))}
                </Carousel>
              )}
              </div>
            </div>
          </div>
        )}
     </div>
  </div>
  )
}

export default ModalPhotos