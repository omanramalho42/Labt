import Link from "next/link";
import React from "react"

// interface TagCategorieWidgetProps {
//   name: string;
//   color: string;
// }

const TagCategorieWidget= ({ name, color, textColor = "#000" }) => {
  return (
    <div className='w-full h-full flex'>
      <div 
        className={
          `relative 
            ${name === 'Home' ? 'md:right-[-45%]' : 'md:right-[-43.5%]'} 
            transition-all sm:right-[-43%] 
            ${name === 'Home' ? 'right-[-40%]' : 'right-[-38.5%]'} 
          `}  
        style={{ 
          zIndex: 2,
          backgroundColor: '#000', 
          width: '100px', 
          padding: '10px', 
          borderRadius: '50%',
          //@ts-ignore
          backgroundColor: color,
        }}
      >
        <Link href="/">
          <p style={{ 
              color: textColor,
              textTransform: 'lowercase', 
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
        className='relative' 
        style={{ 
          flex: 1, 
          top: '-20px',
          right: '3.2em',
          borderBottom: `2px solid black` 
        }} 
      />
    </div>
  )
}

export default TagCategorieWidget;