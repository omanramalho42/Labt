
import React from "react"

const TagCategorieWidget= ({ name, color }) => {
  return (
    <div className='mx-10 mb-20'>
      <div className='flex justify-center border-b-2 border-b-black dark:border-b-white'>
        <div 
          className='relative top-6 bg-black dark:bg-white rounded-[50%] px-10 py-2' 
          style={{ backgroundColor: color }}
        >
          <p className={`font-medium text-2xl ${name === 'Home' ? 'text-white' : 'text-black'} dark:text-black`}>
            { name.toLowerCase() }
          </p>
        </div>
      </div>
  </div>
  )
}

export default TagCategorieWidget;