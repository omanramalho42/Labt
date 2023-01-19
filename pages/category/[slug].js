import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { Toaster, toast } from 'react-hot-toast'

import { getCategories, getCategoryPost } from '../../services'
import { PostCard, Categories, Loader, Footer } from '../../components'

const CategoryPost = ({ posts }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }

  const [color, setColor] = useState("");
  useEffect(() => {
    if(posts[0].node.categories[0].name === 'Salvador') {
      setColor('#2563EB');
    } else if (posts[0].node.categories[0].name === 'Bahia') {
      setColor('#DC2626');
    } else if (posts[0].node.categories[0].name === 'Ser') {
      setColor('#16A34A')
    } else {
      setColor('#EAB308')
    }
  },[posts]);

  useEffect(() => {
    toast.success(`Categoria selecionada: 
      ${posts[0].node.categories[0].name}`
    );
  },[posts]);

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

  return (
    <motion.div
      className="mx-auto px-10"
      style={{ 
        background: mobile.innerWidth < 1000 && `linear-gradient(
          to bottom,
          white 0%,
          white 15%,
          ${color} 15%,
          ${color} 100%
        )`
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 20, marginTop: 20 }} >
        {mobile.innerWidth < 1000 ? (
          <>
            <div 
              className='absolute' 
              style={{ 
                zIndex: 2,
                top: '185px', 
                left: mobile.innerWidth < 580 ? '38%' : '45%', 
                backgroundColor: '#000', 
                width: '100px', 
                padding: '10px', 
                borderRadius: '50%',
                backgroundColor: color,
              }}
            >
              <Link href="/">
                <p style={{ 
                    color: '#000',
                    textTransform: 'lowercase', 
                    textAlign: 'center',
                    fontFamily: 'Arlita',
                    letterSpacing: '1px'
                  }}
                >
                  { posts[0].node.categories[0].name }
                </p>
              </Link>
            </div>
            <span 
              className='relative mx-10' 
              style={{ 
                flex: 1, 
                top: '-20px', 
                borderBottom: `2px solid black` 
              }} 
            />
          </>
        ) : (
        <>
          <span 
            className='text-3xl mr-4 font-medium uppercase'
            style={{
              color: color,
              fontFamily: 'Luam-Regular'       
            }}
          >
            {posts[0].node.categories[0].name}
          </span>

            <div 
              className='flex-1 rounded-md mb-8 p-1'
              style={{
                margin: 'auto',
                backgroundColor: color
              }}
            />
          </>
          )}
      </div>
    
      <Toaster 
        position='top-center'
        reverseOrder={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-12">
        {posts.map((post, index) => (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-3" key={index}>
            <a href={`/post/${post.node.slug}`}>
              <PostCard key={index} post={post.node} />
            </a>
          </div>
        ))}
      </div>

      <Footer />
    </motion.div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}