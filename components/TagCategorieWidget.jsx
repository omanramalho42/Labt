import Link from "next/link";
import React from "react"

const TagCategorieWidget= ({ name, color, textColor = "#000" , post = 'false', className }) => {
  return (
    <div className='w-full mb-6 h-full flex'>
      <div 
        className={
        `dark:bg-white ${className && className} relative tag
          ${name === 'Home' ? 'md:right-[-45%]' : 'md:right-[-43.5%]'} 
          transition-all sm:right-[-43%] 
          ${name === 'Home' ? 'right-[-40%]' : name !== 'Home' && !post ? 'right-[-38.5%]' : post? 'right-[-41%]' : 'right-[-38.5%]'} 
        `}  
        style={{ 
          zIndex: 2, 
          backgroundColor: color,
          width: '100px', 
          padding: '10px',
          borderRadius: '50%',
        }}
      >
        <Link href="/">
          <p
            className={`dark:text-[#000] text-[${textColor}] lowercase`} 
            style={{
              color: textColor,
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