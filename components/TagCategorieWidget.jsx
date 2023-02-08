import Link from "next/link";
import React from "react"

const TagCategorieWidget= ({ name, color, post = false, className }) => {
  return (
    <div className='w-full mb-6 h-full flex'>
      <div 
        className={
        `dark:bg-white bg-black w-[100px] rounded-[50%] p-[10px] ${className && className} relative
          ${
            name === 'Home' 
            ? 'md:right-[-45%]' 
            : 'md:right-[-43.5%]'
          } 
          transition-all sm:right-[-43%] 
          ${
            name === 'Home' 
            ? 'sm:right-[-42%] right-[-40%]' 
          : name !== 'Home' && !post 
          ? 'sm:right-[-40.5%] right-[-33%]' 
          : post ? 'right-[-41%]' 
          : 'right-[-38.5%]'
          } 
        `}  
        style={{ 
          zIndex: 2, 
          backgroundColor: name!== 'Home' && color,
        }}
      >
        <Link href="/">
          <p
            className={`dark:text-[#000] text-[#fff] lowercase`} 
            style={{
              textAlign: 'center',
              fontFamily: 'Arlita',
              letterSpacing: '1px'
            }}
          >
            { name }
          </p>
        </Link>
      </div>
      <span 
        className='flex-1 relative border-b-2 border-b-black dark:border-b-white' 
        style={{ 
          top: '-20px',
          right: '3.2em',
        }} 
      />
    </div>
  )
}

export default TagCategorieWidget;