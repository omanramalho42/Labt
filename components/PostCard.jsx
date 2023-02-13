import React from 'react'

const PostCard = ({ post }) => {

  return (
    <div className={`bg-white shadow-lg img p-0 rounded-t-lg lg:rounded-xl`}>
      <div className="content img relative overflow-hidden shadow-md pb-80">
        <img 
          src={post.featuredImage.url} 
          alt={post.title}
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-xl"
        />
        <div className='overlay rounded-xl'>
          <p className='text'>
            { post.title || '' }
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostCard