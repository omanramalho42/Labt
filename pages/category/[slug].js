import React, { useEffect, useState, useMemo } from 'react'

import { Helmet } from 'react-helmet'

import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { Toaster, toast } from 'react-hot-toast'

import useDarkSide from '../../hooks/useDarkSide'

import { getCategories, getCategoryPost } from '../../services'
import { 
  PostCard, 
  Loader,
  Footer, 
  TagCategorieWidget 
} from '../../components'

import { container, item } from '../../tools/effect'

const CategoryPost = ({ posts }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }

  const [color, setColor] = useState("");
  useEffect(() => {
    if(posts[0].node.categories[0].name === 'Salvador') {
      setColor('#2f53a1');
    } else if (posts[0].node.categories[0].name === 'Bahia') {
      setColor('#DC2626');
    } else if (posts[0].node.categories[0].name === 'Ser') {
      setColor('#3fbb5a')
    } else {
      setColor('#d5b035')
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

  const [categorieName, setCategorieName] = useState("");
  useMemo(() => {
    if(posts) {
      setCategorieName(posts[0].node.categories[0].name);
    }
  },[posts]);

	const [colorTheme] = useDarkSide();

  return (
    <div className='flex-1 dark:bg-black bg-white'>
      <motion.div
        className="mx-auto px-5 border-t-2 dark:border-black border-white"
        style={{ 
          background: mobile.innerWidth < 1000 && `linear-gradient(
            to bottom,
            transparent 0%,
            transparent 27%,
            ${color} 27%,
            ${color} 100%
          )`
        }}
      >
        <Helmet>
          <title>Categorias: {categorieName || ''}</title>
          <meta charSet='utf-8'/>
        </Helmet>

        <div className=''>
          {mobile.innerWidth < 1000 ? (
            <>
              <TagCategorieWidget 
                name={posts[0].node.categories[0].name} 
                color={color}
                // className='tag'
              />
            </>
            ) : (
            <div className='flex row mb-10'>
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
            </div>
          )}
        </div>
      
        <Toaster 
          position='top-center'
          reverseOrder={false}
        />

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-9 gap-12 sm:mx-0 mx-[2.5rem] mb-10"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post, index) => (
            <div 
              className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-3" 
              key={index}
            >
              <motion.a
                href={`/post/${post.node.slug}`}              
                variants={item}
              >
                <PostCard 
                  key={index} 
                  post={post.node} 
                />
              </motion.a>
            </div>
          ))}
        </motion.div>

        <Footer />
      </motion.div>
    </div>
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