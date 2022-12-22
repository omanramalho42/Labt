
// import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Carousel from 'react-multi-carousel'

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

const ModalPhotos = ({ post }) => {
  const [openModal ,setOpenModal] = useState(false);
  const [imagesSort, setImageSort] = useState([]);

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
    <div className='flex justify-center'>
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          padding: '10px'
        }}
      >
        {post.map((i ,idx ) => (
          <div key={idx} className='cursor-pointer p-1 h-full w-full'>
            <img
              key={idx}
              unoptimized
              alt="imagem carousel"
              className="w-full drop-shadow-lg"
              src={i.url}
              onClick={
                () => handleSetOpenModal({active: true, url: i.url})
              } 
            />
          </div>
        ))}

        {openModal && (
          <div
            onClick={() => console.log("clcik")}
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
              <>
              <span 
                className='relative text-white text-3xl cursor-pointer px-2 text-center' 
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
                      key={idx}
                      alt="imagem carousel"
                      className="w-full drop-shadow-lg"
                      src={i.url}
                    />
                  ))}
                </Carousel>
              )}
              </>
            </div>
          </div>
        )}
     </div>
  </div>
  )
}

export default ModalPhotos