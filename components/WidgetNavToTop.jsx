import React, { useState, useEffect } from 'react'
import { HiArrowCircleUp } from 'react-icons/hi'

const WidgetNavToTop = (home = false) => {
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 400) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    })
  },[]);

  const handleGoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className='flex-1 flex justify-center items-center'>
      {showBtn && (
        <HiArrowCircleUp 
          size={52} 
          onClick={handleGoTop} 
          className={`cursor-pointer relative ${home ? 'top-[-120px] md:top-[-100px]' : 'top-[-30px] md:top-[-20px]'} dark:text-white text-black z-10 arrow__top`}
        />
      )}
    </div>
  )
}

export default WidgetNavToTop